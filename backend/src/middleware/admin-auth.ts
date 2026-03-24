import type { NextFunction, Request, Response } from "express";

import { env } from "../config/env";
import { ApiError } from "../lib/api-error";

function getAdminToken(req: Request) {
  const authHeader = req.get("authorization");

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length).trim();
  }

  return req.get("x-admin-token")?.trim();
}

export function requireAdminAuth(req: Request, _res: Response, next: NextFunction) {
  if (!env.ADMIN_API_TOKEN) {
    return next(
      new ApiError(503, "ADMIN_DISABLED", "Admin endpoints are disabled until ADMIN_API_TOKEN is configured."),
    );
  }

  const token = getAdminToken(req);

  if (!token || token !== env.ADMIN_API_TOKEN) {
    return next(new ApiError(401, "UNAUTHORIZED", "A valid admin token is required."));
  }

  return next();
}
