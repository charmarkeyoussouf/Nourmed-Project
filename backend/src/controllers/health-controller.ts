import type { NextFunction, Request, Response } from "express";

import { ApiError } from "../lib/api-error";
import { prisma } from "../lib/prisma";
import { sendSuccess } from "../lib/response";

export async function getHealthHandler(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return sendSuccess(res, 200, {
      status: "ok",
      service: "nourmed-backend",
      database: "reachable",
    });
  } catch (error) {
    return next(
      new ApiError(503, "SERVICE_UNAVAILABLE", "Database connection unavailable."),
    );
  }
}
