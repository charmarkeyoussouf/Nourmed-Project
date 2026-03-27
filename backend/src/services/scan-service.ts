import { ScanJobStatus, ScanSeverity, type Prisma } from "@prisma/client";

import { ApiError } from "../lib/api-error";
import { createPublicToken, hashPublicToken } from "../lib/hash";
import { prisma } from "../lib/prisma";
import { sanitizeMultilineText, sanitizeOptionalText, sanitizeText } from "../lib/sanitize";
import { normalizeDomainTarget, normalizeHostServiceTarget, normalizeWebTarget } from "../lib/scan-target";
import { createLeadRecord } from "./contact-service";
import { runAuthorizedScan } from "./scan-engine";
import type { CreateScanJobInput } from "../validators/scan";

type ScanRequestContext = {
  ipAddress?: string;
  userAgent?: string;
};

function getNormalizedTarget(target: string, targetType: CreateScanJobInput["targetType"]) {
  if (targetType === "WEB_APPLICATION") {
    return normalizeWebTarget(target, true).normalizedTarget;
  }

  if (targetType === "DOMAIN") {
    return normalizeDomainTarget(target).normalizedTarget;
  }

  return normalizeHostServiceTarget(target).normalizedTarget;
}

function sortFindingsBySeverity<T extends { severity: ScanSeverity }>(findings: T[]) {
  const order: Record<ScanSeverity, number> = {
    CRITICAL: 0,
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3,
    INFO: 4,
  };

  return [...findings].sort((left, right) => order[left.severity] - order[right.severity]);
}

async function executeScanJob(scanJobId: string) {
  try {
    const job = await prisma.scanJob.findUnique({
      where: {
        id: scanJobId,
      },
    });

    if (!job) {
      return;
    }

    await prisma.scanJob.update({
      where: {
        id: scanJobId,
      },
      data: {
        status: "RUNNING",
        startedAt: new Date(),
        errorMessage: null,
      },
    });

    const result = await runAuthorizedScan({
      target: job.target,
      targetType: job.targetType,
    });

    const findingsData: Prisma.ScanFindingCreateManyInput[] = result.findings.map((finding) => ({
      scanJobId,
      severity: finding.severity,
      category: finding.category,
      title: finding.title,
      description: finding.description,
      recommendation: finding.recommendation,
      evidence: (finding.evidence as Prisma.InputJsonValue | undefined) ?? undefined,
    }));

    const operations: Prisma.PrismaPromise<unknown>[] = [
      prisma.scanFinding.deleteMany({
        where: {
          scanJobId,
        },
      }),
      prisma.scanJob.update({
        where: {
          id: scanJobId,
        },
        data: {
          normalizedTarget: result.normalizedTarget,
          status: "COMPLETED",
          riskScore: result.riskScore,
          riskLevel: result.riskLevel,
          summary: result.summary,
          details: result.details as Prisma.InputJsonValue,
          completedAt: new Date(),
          errorMessage: null,
        },
      }),
    ];

    if (findingsData.length > 0) {
      operations.push(
        prisma.scanFinding.createMany({
          data: findingsData,
        }),
      );
    }

    await prisma.$transaction(operations);
  } catch (error) {
    await prisma.scanJob.update({
      where: {
        id: scanJobId,
      },
      data: {
        status: "FAILED",
        completedAt: new Date(),
        errorMessage: error instanceof Error ? error.message : "Scan execution failed unexpectedly.",
      },
    });
  }
}

export async function createScanJob(input: CreateScanJobInput, context: ScanRequestContext) {
  const normalizedTarget = getNormalizedTarget(input.target, input.targetType);
  const publicToken = createPublicToken();
  const publicTokenHash = hashPublicToken(publicToken);

  const lead =
    input.requesterName && input.requesterEmail
      ? await createLeadRecord({
          name: input.requesterName,
          email: input.requesterEmail,
          company: input.organization,
          message: input.notes,
          source: "security_scan_page",
          serviceInterest: "Authorized Security Scan",
          ipAddress: context.ipAddress,
          userAgent: context.userAgent,
          notificationSubject: "New Free Scan Request",
          extraNotificationFields: [
            { label: "Scan Target", value: normalizedTarget },
            { label: "Target Type", value: input.targetType },
            { label: "Authorized Confirmation", value: "Confirmed" },
          ],
        })
      : null;

  const job = await prisma.scanJob.create({
    data: {
      target: sanitizeText(input.target),
      normalizedTarget,
      targetType: input.targetType,
      organization: sanitizeText(input.organization),
      requesterName: sanitizeOptionalText(input.requesterName) ?? null,
      requesterEmail: input.requesterEmail ?? null,
      notes: input.notes ? sanitizeMultilineText(input.notes) : null,
      source: "security_scan_page",
      authorizedConfirmed: true,
      publicTokenHash,
      status: "QUEUED",
      leadId: lead?.id ?? null,
    },
  });

  setTimeout(() => {
    void executeScanJob(job.id);
  }, 0);

  return {
    jobId: job.id,
    accessToken: publicToken,
    status: job.status,
  };
}

export async function getPublicScanReport(scanJobId: string, accessToken: string) {
  const tokenHash = hashPublicToken(accessToken);

  const job = await prisma.scanJob.findFirst({
    where: {
      id: scanJobId,
      publicTokenHash: tokenHash,
    },
    include: {
      findings: true,
    },
  });

  if (!job) {
    throw new ApiError(403, "SCAN_ACCESS_DENIED", "A valid scan access token is required.");
  }

  return {
    id: job.id,
    status: job.status,
    target: job.target,
    normalizedTarget: job.normalizedTarget,
    targetType: job.targetType,
    organization: job.organization,
    riskScore: job.riskScore,
    riskLevel: job.riskLevel,
    summary: job.summary,
    errorMessage: job.errorMessage,
    details: job.details,
    createdAt: job.createdAt,
    startedAt: job.startedAt,
    completedAt: job.completedAt,
    findings: sortFindingsBySeverity(job.findings),
  };
}

export async function listScanJobs(limit: number) {
  const jobs = await prisma.scanJob.findMany({
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      findings: true,
      lead: true,
    },
  });

  return jobs.map((job) => ({
    ...job,
    findings: sortFindingsBySeverity(job.findings),
  }));
}

export async function getScanJobById(scanJobId: string) {
  const job = await prisma.scanJob.findUnique({
    where: {
      id: scanJobId,
    },
    include: {
      findings: true,
      lead: true,
    },
  });

  if (!job) {
    throw new ApiError(404, "SCAN_JOB_NOT_FOUND", "Scan job not found.");
  }

  return {
    ...job,
    findings: sortFindingsBySeverity(job.findings),
  };
}

export function isCompletedScanStatus(status: ScanJobStatus) {
  return status === "COMPLETED" || status === "FAILED";
}
