import dns from "node:dns/promises";
import net from "node:net";
import tls from "node:tls";

import { ScanRiskLevel, ScanSeverity, ScanTargetType } from "@prisma/client";

import { env } from "../config/env";
import { normalizeDomainTarget, normalizeHostServiceTarget, normalizeWebTarget } from "../lib/scan-target";

type FindingInput = {
  severity: ScanSeverity;
  category: string;
  title: string;
  description: string;
  recommendation: string;
  evidence?: Record<string, unknown>;
};

type ScanExecutionResult = {
  normalizedTarget: string;
  riskScore: number;
  riskLevel: ScanRiskLevel;
  summary: string;
  details: Record<string, unknown>;
  findings: FindingInput[];
};

const severityWeights: Record<ScanSeverity, number> = {
  INFO: 3,
  LOW: 10,
  MEDIUM: 22,
  HIGH: 38,
  CRITICAL: 55,
};

const httpPortNumbers = new Set([80, 81, 3000, 4000, 5000, 8000, 8080, 8081]);
const httpsPortNumbers = new Set([443, 8443, 9443]);

async function fetchWithTimeout(input: string, redirect: "follow" | "manual" | "error" = "follow") {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), env.SCAN_HTTP_TIMEOUT_MS);

  try {
    return await fetch(input, {
      headers: {
        "User-Agent": env.SCAN_USER_AGENT,
        Accept: "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8",
      },
      redirect,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function resolveDns(host: string) {
  try {
    return await dns.lookup(host, { all: true });
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "DNS lookup failed",
    };
  }
}

async function inspectTls(host: string, port: number) {
  return new Promise<Record<string, unknown>>((resolve) => {
    const socket = tls.connect(
      {
        host,
        port,
        servername: host,
        rejectUnauthorized: false,
      },
      () => {
        const certificate = socket.getPeerCertificate();
        const validTo = certificate.valid_to ? new Date(certificate.valid_to) : null;
        const daysRemaining = validTo
          ? Math.round((validTo.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
          : null;

        resolve({
          supported: true,
          protocol: socket.getProtocol(),
          issuer: certificate.issuer?.O ?? certificate.issuer?.CN ?? null,
          subject: certificate.subject?.CN ?? null,
          validTo: validTo?.toISOString() ?? null,
          daysRemaining,
        });

        socket.end();
      },
    );

    socket.setTimeout(env.SCAN_HTTP_TIMEOUT_MS, () => {
      socket.destroy();
      resolve({
        supported: false,
        error: "TLS connection timed out",
      });
    });

    socket.on("error", (error) => {
      resolve({
        supported: false,
        error: error.message,
      });
    });
  });
}

async function inspectTcpPort(host: string, port: number) {
  return new Promise<Record<string, unknown>>((resolve) => {
    const socket = net.createConnection({ host, port });

    socket.setTimeout(env.SCAN_HTTP_TIMEOUT_MS, () => {
      socket.destroy();
      resolve({
        reachable: false,
        error: "TCP connection timed out",
      });
    });

    socket.once("connect", () => {
      resolve({
        reachable: true,
      });
      socket.end();
    });

    socket.once("error", (error) => {
      resolve({
        reachable: false,
        error: error.message,
      });
    });
  });
}

function pushFinding(findings: FindingInput[], finding: FindingInput) {
  findings.push(finding);
}

function analyzeSecurityHeaders(url: string, response: Response, findings: FindingInput[]) {
  const isHttps = url.startsWith("https://");
  const headerChecks = [
    {
      name: "content-security-policy",
      severity: "MEDIUM" as const,
      title: "Content Security Policy is missing",
      recommendation:
        "Add a Content-Security-Policy header that defines trusted script, style, image, and connection sources.",
    },
    {
      name: "x-frame-options",
      severity: "LOW" as const,
      title: "Clickjacking protection header is missing",
      recommendation: "Add X-Frame-Options or an equivalent frame-ancestors Content-Security-Policy directive.",
    },
    {
      name: "x-content-type-options",
      severity: "LOW" as const,
      title: "MIME sniffing protection header is missing",
      recommendation: "Add X-Content-Type-Options: nosniff on public-facing responses.",
    },
    {
      name: "referrer-policy",
      severity: "LOW" as const,
      title: "Referrer Policy is missing",
      recommendation: "Add a Referrer-Policy header that limits unnecessary leakage of browsing context.",
    },
    {
      name: "permissions-policy",
      severity: "LOW" as const,
      title: "Permissions Policy is missing",
      recommendation: "Add a Permissions-Policy header to restrict browser features not required by the application.",
    },
  ];

  if (isHttps && !response.headers.get("strict-transport-security")) {
    pushFinding(findings, {
      severity: "MEDIUM",
      category: "transport",
      title: "HSTS is missing on the HTTPS response",
      description: "The application responds over HTTPS but does not advertise Strict-Transport-Security.",
      recommendation: "Add a Strict-Transport-Security header after confirming the site is ready for HTTPS-only access.",
    });
  }

  for (const headerCheck of headerChecks) {
    if (!response.headers.get(headerCheck.name)) {
      pushFinding(findings, {
        severity: headerCheck.severity,
        category: "headers",
        title: headerCheck.title,
        description: `The ${headerCheck.name} header was not present on the analyzed response.`,
        recommendation: headerCheck.recommendation,
      });
    }
  }
}

function analyzeCookies(response: Response, findings: FindingInput[]) {
  const cookies = response.headers.getSetCookie?.() ?? [];

  for (const cookie of cookies) {
    const lowerCookie = cookie.toLowerCase();
    const cookieName = cookie.split("=")[0] ?? "Cookie";

    if (!lowerCookie.includes("secure")) {
      pushFinding(findings, {
        severity: "MEDIUM",
        category: "cookies",
        title: `${cookieName} is missing the Secure attribute`,
        description: "A Set-Cookie header was observed without the Secure flag.",
        recommendation: "Set Secure on cookies that should only travel over HTTPS.",
      });
    }

    if (!lowerCookie.includes("httponly")) {
      pushFinding(findings, {
        severity: "LOW",
        category: "cookies",
        title: `${cookieName} is missing the HttpOnly attribute`,
        description: "A Set-Cookie header was observed without the HttpOnly flag.",
        recommendation: "Add HttpOnly to cookies that do not need JavaScript access.",
      });
    }

    if (!lowerCookie.includes("samesite")) {
      pushFinding(findings, {
        severity: "LOW",
        category: "cookies",
        title: `${cookieName} is missing the SameSite attribute`,
        description: "A Set-Cookie header was observed without a SameSite policy.",
        recommendation: "Set SameSite=Lax or SameSite=Strict unless a cross-site requirement exists.",
      });
    }
  }
}

function analyzeHtmlSignals(finalUrl: string, html: string, findings: FindingInput[]) {
  const isHttps = finalUrl.startsWith("https://");
  const formMatches = html.match(/<form\b/gi) ?? [];
  const insecureFormActions = [...html.matchAll(/<form[^>]*action=["'](http:\/\/[^"']+)["']/gi)];
  const mixedContentReferences = isHttps
    ? [...html.matchAll(/\b(?:src|href)=["'](http:\/\/[^"']+)["']/gi)]
    : [];

  if (formMatches.length > 0 && insecureFormActions.length > 0) {
    pushFinding(findings, {
      severity: "HIGH",
      category: "forms",
      title: "One or more HTML forms submit over plaintext HTTP",
      description: "The analyzed page contains form actions that point to HTTP endpoints.",
      recommendation: "Move all form submissions to HTTPS endpoints and review any plaintext dependencies.",
      evidence: {
        actions: insecureFormActions.map((match) => match[1]).slice(0, 5),
      },
    });
  }

  if (mixedContentReferences.length > 0) {
    pushFinding(findings, {
      severity: "MEDIUM",
      category: "content",
      title: "Potential mixed-content references were detected",
      description: "The analyzed HTML contains HTTP resource references on an HTTPS page.",
      recommendation: "Replace plaintext HTTP assets with HTTPS equivalents or self-hosted secure assets.",
      evidence: {
        resources: mixedContentReferences.map((match) => match[1]).slice(0, 5),
      },
    });
  }
}

function summarizeFindings(findings: FindingInput[]) {
  if (findings.length === 0) {
    return "No immediate high-signal misconfigurations were detected in the limited read-only review.";
  }

  const counts = findings.reduce<Record<ScanSeverity, number>>(
    (accumulator, finding) => ({
      ...accumulator,
      [finding.severity]: accumulator[finding.severity] + 1,
    }),
    {
      INFO: 0,
      LOW: 0,
      MEDIUM: 0,
      HIGH: 0,
      CRITICAL: 0,
    },
  );

  return `The scan identified ${findings.length} findings including ${counts.HIGH + counts.CRITICAL} high-priority items, ${counts.MEDIUM} medium items, and ${counts.LOW} low-severity observations.`;
}

function calculateRisk(findings: FindingInput[]) {
  if (findings.length === 0) {
    return {
      riskScore: 8,
      riskLevel: "LOW" as const,
    };
  }

  const rawScore = findings.reduce((total, finding) => total + severityWeights[finding.severity], 0);
  const riskScore = Math.min(100, rawScore);

  if (riskScore >= 85) {
    return { riskScore, riskLevel: "CRITICAL" as const };
  }

  if (riskScore >= 60) {
    return { riskScore, riskLevel: "HIGH" as const };
  }

  if (riskScore >= 35) {
    return { riskScore, riskLevel: "ELEVATED" as const };
  }

  if (riskScore >= 15) {
    return { riskScore, riskLevel: "MODERATE" as const };
  }

  return { riskScore, riskLevel: "LOW" as const };
}

async function inspectWebSurface(url: URL, host: string) {
  const findings: FindingInput[] = [];
  const details: Record<string, unknown> = {
    targetUrl: url.toString(),
    host,
  };

  details.dns = await resolveDns(host);

  const tlsPort = url.port ? Number.parseInt(url.port, 10) : 443;
  if (url.protocol === "https:") {
    details.tls = await inspectTls(host, tlsPort);

    const tlsDetails = details.tls as Record<string, unknown>;
    if (!tlsDetails.supported) {
      pushFinding(findings, {
        severity: "HIGH",
        category: "transport",
        title: "TLS negotiation failed for the HTTPS target",
        description: "The target was expected to support HTTPS but the TLS handshake did not complete.",
        recommendation: "Review TLS listener configuration, certificate deployment, and supported protocol settings.",
        evidence: tlsDetails,
      });
    } else if (typeof tlsDetails.daysRemaining === "number" && tlsDetails.daysRemaining <= 30) {
      pushFinding(findings, {
        severity: "HIGH",
        category: "transport",
        title: "TLS certificate expiry is approaching",
        description: `The presented TLS certificate expires in ${tlsDetails.daysRemaining} days or fewer.`,
        recommendation: "Renew or rotate the certificate before expiry and verify the renewal path is automated.",
        evidence: tlsDetails,
      });
    } else if (typeof tlsDetails.daysRemaining === "number" && tlsDetails.daysRemaining <= 60) {
      pushFinding(findings, {
        severity: "MEDIUM",
        category: "transport",
        title: "TLS certificate should be reviewed soon",
        description: `The presented TLS certificate expires within ${tlsDetails.daysRemaining} days.`,
        recommendation: "Schedule certificate renewal before the validity window becomes urgent.",
        evidence: tlsDetails,
      });
    }
  }

  if (!url.port || (!httpPortNumbers.has(Number.parseInt(url.port, 10)) && !httpsPortNumbers.has(Number.parseInt(url.port, 10)))) {
    try {
      const httpResponse = await fetchWithTimeout(`http://${host}/`, "manual");
      details.httpRedirect = {
        status: httpResponse.status,
        location: httpResponse.headers.get("location"),
      };

      if (
        httpResponse.status < 300 ||
        httpResponse.status >= 400 ||
        !httpResponse.headers.get("location")?.startsWith("https://")
      ) {
        pushFinding(findings, {
          severity: "MEDIUM",
          category: "transport",
          title: "HTTP does not clearly redirect to HTTPS",
          description: "The plain HTTP endpoint did not respond with a clear redirect to HTTPS.",
          recommendation: "Redirect HTTP requests to HTTPS and avoid serving business traffic over plaintext transport.",
        });
      }
    } catch (error) {
      details.httpRedirect = {
        error: error instanceof Error ? error.message : "HTTP redirect check failed",
      };
    }
  }

  try {
    const response = await fetchWithTimeout(url.toString());
    const contentType = response.headers.get("content-type") ?? "";
    const html = contentType.includes("text/html") ? (await response.text()).slice(0, env.SCAN_MAX_RESPONSE_BYTES) : "";

    details.http = {
      finalUrl: response.url,
      status: response.status,
      contentType,
      headers: {
        server: response.headers.get("server"),
        strictTransportSecurity: response.headers.get("strict-transport-security"),
        contentSecurityPolicy: response.headers.get("content-security-policy"),
        xFrameOptions: response.headers.get("x-frame-options"),
        xContentTypeOptions: response.headers.get("x-content-type-options"),
        referrerPolicy: response.headers.get("referrer-policy"),
        permissionsPolicy: response.headers.get("permissions-policy"),
      },
    };

    if (response.status >= 500) {
      pushFinding(findings, {
        severity: "MEDIUM",
        category: "availability",
        title: "The target returned a server error during the review",
        description: `The application responded with HTTP ${response.status}.`,
        recommendation: "Investigate the upstream service, error handling, and availability posture for the reviewed route.",
      });
    }

    analyzeSecurityHeaders(response.url, response, findings);
    analyzeCookies(response, findings);

    if (html) {
      analyzeHtmlSignals(response.url, html, findings);
    }
  } catch (error) {
    pushFinding(findings, {
      severity: "HIGH",
      category: "availability",
      title: "The target could not be fetched during the review",
      description: error instanceof Error ? error.message : "The HTTP fetch failed.",
      recommendation: "Confirm that the target is reachable from the scanner environment and that the reviewed route is available.",
    });
  }

  const { riskScore, riskLevel } = calculateRisk(findings);

  return {
    normalizedTarget: url.toString(),
    riskScore,
    riskLevel,
    summary: summarizeFindings(findings),
    details,
    findings,
  };
}

async function inspectDomainSurface(domain: string): Promise<ScanExecutionResult> {
  const httpsUrl = new URL(`https://${domain}/`);
  return inspectWebSurface(httpsUrl, domain);
}

async function inspectHostServiceSurface(target: string): Promise<ScanExecutionResult> {
  const { host, normalizedTarget, port } = normalizeHostServiceTarget(target);
  const findings: FindingInput[] = [];
  const details: Record<string, unknown> = {
    host,
    port,
  };

  details.tcp = await inspectTcpPort(host, port);

  if (!(details.tcp as Record<string, unknown>).reachable) {
    pushFinding(findings, {
      severity: "HIGH",
      category: "reachability",
      title: "The specified service was not reachable",
      description: "The scanner could not establish a TCP connection to the declared host and port.",
      recommendation: "Verify routing, firewall rules, host status, and whether the service should be exposed to the scanner environment.",
      evidence: details.tcp as Record<string, unknown>,
    });
  }

  if (httpsPortNumbers.has(port)) {
    const httpsUrl = new URL(`https://${host}:${port}/`);
    const httpsResult = await inspectWebSurface(httpsUrl, host);
    return {
      normalizedTarget,
      riskScore: httpsResult.riskScore,
      riskLevel: httpsResult.riskLevel,
      summary: httpsResult.summary,
      details: {
        ...details,
        ...httpsResult.details,
      },
      findings: [...findings, ...httpsResult.findings],
    };
  }

  if (httpPortNumbers.has(port)) {
    const httpUrl = new URL(`http://${host}:${port}/`);
    const httpResult = await inspectWebSurface(httpUrl, host);
    return {
      normalizedTarget,
      riskScore: httpResult.riskScore,
      riskLevel: httpResult.riskLevel,
      summary: httpResult.summary,
      details: {
        ...details,
        ...httpResult.details,
      },
      findings: [...findings, ...httpResult.findings],
    };
  }

  details.tls = await inspectTls(host, port);

  if ((details.tls as Record<string, unknown>).supported) {
    pushFinding(findings, {
      severity: "INFO",
      category: "service",
      title: "A TLS-speaking service is exposed on the declared port",
      description: "The port accepted a TLS handshake, but deeper protocol-specific validation is outside this MVP scope.",
      recommendation: "Review the service with a protocol-specific assessment if the port is business-critical.",
      evidence: details.tls as Record<string, unknown>,
    });
  } else {
    pushFinding(findings, {
      severity: "INFO",
      category: "service",
      title: "The service port is reachable but not profiled deeply by this MVP",
      description: "The current scanner confirms reachability and captures basic transport signals for explicitly declared services only.",
      recommendation: "Use a scoped follow-up review for protocol-specific hardening and authentication checks.",
      evidence: {
        tcp: details.tcp,
        tls: details.tls,
      },
    });
  }

  const { riskScore, riskLevel } = calculateRisk(findings);

  return {
    normalizedTarget,
    riskScore,
    riskLevel,
    summary: summarizeFindings(findings),
    details,
    findings,
  };
}

export async function runAuthorizedScan(input: { target: string; targetType: ScanTargetType }) {
  if (input.targetType === "WEB_APPLICATION") {
    const { host, url } = normalizeWebTarget(input.target, true);
    return inspectWebSurface(url, host);
  }

  if (input.targetType === "DOMAIN") {
    const { host } = normalizeDomainTarget(input.target);
    return inspectDomainSurface(host);
  }

  return inspectHostServiceSurface(input.target);
}
