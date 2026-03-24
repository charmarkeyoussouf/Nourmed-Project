import net from "node:net";

import { env } from "../config/env";
import { ApiError } from "./api-error";

const privateIpv4Ranges = [
  /^10\./,
  /^127\./,
  /^169\.254\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
  /^192\.168\./,
] as const;

type NormalizedWebTarget = {
  host: string;
  normalizedTarget: string;
  url: URL;
};

type NormalizedHostServiceTarget = {
  host: string;
  normalizedTarget: string;
  port: number;
};

function isPrivateIpv4(value: string) {
  return privateIpv4Ranges.some((pattern) => pattern.test(value));
}

function isPrivateHost(host: string) {
  const normalized = host.trim().toLowerCase();

  if (normalized === "localhost" || normalized.endsWith(".local")) {
    return true;
  }

  if (net.isIP(normalized) === 4) {
    return isPrivateIpv4(normalized);
  }

  return false;
}

function assertAllowedTargetHost(host: string) {
  if (!env.SCAN_ALLOW_PRIVATE_TARGETS && isPrivateHost(host)) {
    throw new ApiError(
      400,
      "PRIVATE_TARGET_NOT_ALLOWED",
      "Private or local targets require SCAN_ALLOW_PRIVATE_TARGETS=true on the backend.",
    );
  }
}

export function normalizeWebTarget(target: string, requireScheme = false): NormalizedWebTarget {
  const trimmed = target.trim();
  const candidate = requireScheme || /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  let url: URL;

  try {
    url = new URL(candidate);
  } catch {
    throw new ApiError(400, "INVALID_TARGET", "Target must be a valid URL or domain.");
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new ApiError(400, "INVALID_TARGET", "Only HTTP and HTTPS targets are supported for web scans.");
  }

  assertAllowedTargetHost(url.hostname);

  return {
    host: url.hostname,
    normalizedTarget: url.toString(),
    url,
  };
}

export function normalizeDomainTarget(target: string) {
  const trimmed = target.trim().toLowerCase();

  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(trimmed)) {
    throw new ApiError(400, "INVALID_TARGET", "Target must be a valid domain or subdomain.");
  }

  assertAllowedTargetHost(trimmed);

  return {
    host: trimmed,
    normalizedTarget: trimmed,
  };
}

export function normalizeHostServiceTarget(target: string): NormalizedHostServiceTarget {
  const trimmed = target.trim();

  if (trimmed.length === 0) {
    throw new ApiError(400, "INVALID_TARGET", "Target must include a host and port.");
  }

  const lastColonIndex = trimmed.lastIndexOf(":");

  if (lastColonIndex <= 0 || lastColonIndex === trimmed.length - 1) {
    throw new ApiError(400, "INVALID_TARGET", "Service targets must use the format host:port.");
  }

  const host = trimmed.slice(0, lastColonIndex).trim().replace(/^\[|\]$/g, "");
  const port = Number.parseInt(trimmed.slice(lastColonIndex + 1), 10);

  if (!host || Number.isNaN(port) || port < 1 || port > 65535) {
    throw new ApiError(400, "INVALID_TARGET", "Service targets must use a valid host and port.");
  }

  if (net.isIP(host) === 0 && !/^[a-z0-9.-]+$/i.test(host)) {
    throw new ApiError(400, "INVALID_TARGET", "Service host must be a valid hostname or IP address.");
  }

  assertAllowedTargetHost(host);

  return {
    host,
    normalizedTarget: `${host}:${port}`,
    port,
  };
}
