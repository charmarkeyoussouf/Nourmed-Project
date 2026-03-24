import type { NextFunction, Request, Response } from "express";

import { ApiError } from "../lib/api-error";
import { sendSuccess } from "../lib/response";
import { listContactSubmissions } from "../services/contact-service";
import { listPaymentSessions } from "../services/payment-service";
import { getScanJobById, listScanJobs } from "../services/scan-service";
import { listAdminRecordsQuerySchema } from "../validators/admin";
import { scanJobPathSchema } from "../validators/scan";

function parseLimit(req: Request) {
  const parsedQuery = listAdminRecordsQuerySchema.safeParse(req.query);

  if (!parsedQuery.success) {
    throw new ApiError(400, "VALIDATION_ERROR", "Invalid admin query parameters.");
  }

  return parsedQuery.data.limit;
}

export async function listLeadsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const leads = await listContactSubmissions(parseLimit(req));
    return sendSuccess(res, 200, leads);
  } catch (error) {
    return next(error);
  }
}

export async function listPaymentSessionsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const sessions = await listPaymentSessions(parseLimit(req));
    return sendSuccess(res, 200, sessions);
  } catch (error) {
    return next(error);
  }
}

export async function listScanJobsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const jobs = await listScanJobs(parseLimit(req));
    return sendSuccess(res, 200, jobs);
  } catch (error) {
    return next(error);
  }
}

export async function getScanJobHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedPath = scanJobPathSchema.safeParse(req.params);

    if (!parsedPath.success) {
      return next(new ApiError(400, "VALIDATION_ERROR", "Scan job path is invalid."));
    }

    const job = await getScanJobById(parsedPath.data.jobId);
    return sendSuccess(res, 200, job);
  } catch (error) {
    return next(error);
  }
}
