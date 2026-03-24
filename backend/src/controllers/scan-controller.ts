import type { NextFunction, Request, Response } from "express";

import { ApiError } from "../lib/api-error";
import { sendSuccess } from "../lib/response";
import { createScanJob, getPublicScanReport } from "../services/scan-service";
import { createScanJobSchema, scanJobPathSchema } from "../validators/scan";

export async function createScanJobHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedPayload = createScanJobSchema.safeParse(req.body);

    if (!parsedPayload.success) {
      return next(
        new ApiError(
          400,
          "VALIDATION_ERROR",
          "Request body failed validation.",
          parsedPayload.error.flatten().fieldErrors,
        ),
      );
    }

    const job = await createScanJob(parsedPayload.data, {
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
    });

    return sendSuccess(res, 202, job);
  } catch (error) {
    return next(error);
  }
}

export async function getPublicScanReportHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedPath = scanJobPathSchema.safeParse(req.params);

    if (!parsedPath.success) {
      return next(new ApiError(400, "VALIDATION_ERROR", "Scan job path is invalid."));
    }

    const accessToken = req.get("x-scan-access-token")?.trim() ?? req.query.token?.toString().trim();

    if (!accessToken) {
      return next(new ApiError(401, "SCAN_ACCESS_DENIED", "A scan access token is required."));
    }

    const report = await getPublicScanReport(parsedPath.data.jobId, accessToken);
    return sendSuccess(res, 200, report);
  } catch (error) {
    return next(error);
  }
}
