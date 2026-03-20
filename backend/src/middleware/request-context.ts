import { randomUUID } from "node:crypto";

import type { NextFunction, Request, Response } from "express";

import { logger } from "../lib/logger";

function extractRequestId(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function shouldSkipRequestLog(path: string) {
  return path === "/health";
}

export function requestContextMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const requestId = extractRequestId(req.headers["x-request-id"]) ?? randomUUID();
  const startedAt = process.hrtime.bigint();

  res.locals.requestId = requestId;
  res.setHeader("x-request-id", requestId);

  res.on("finish", () => {
    if (shouldSkipRequestLog(req.originalUrl)) {
      return;
    }

    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;

    logger.info(
      {
        requestId,
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        remoteAddress: req.ip,
        durationMs: Number(durationMs.toFixed(2)),
      },
      "Request completed",
    );
  });

  next();
}
