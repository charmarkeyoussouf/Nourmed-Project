import type { NextFunction, Request, Response } from "express";

import { ApiError } from "../lib/api-error";

export function notFoundHandler(
  _req: Request,
  _res: Response,
  next: NextFunction,
) {
  next(new ApiError(404, "NOT_FOUND", "Resource not found."));
}
