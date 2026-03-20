import type { NextFunction, Request, Response } from "express";

import { ApiError } from "../lib/api-error";
import { logger } from "../lib/logger";
import { sendError } from "../lib/response";

function isBodyParserSyntaxError(error: unknown): error is SyntaxError & {
  status: number;
} {
  return (
    error instanceof SyntaxError &&
    typeof (error as { status?: unknown }).status === "number"
  );
}

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (isBodyParserSyntaxError(error)) {
    return sendError(res, 400, {
      code: "MALFORMED_JSON",
      message: "Request body contains invalid JSON.",
    });
  }

  if (error instanceof ApiError) {
    if (error.statusCode >= 500) {
      logger.error(
        {
          err: error,
          requestId: res.locals.requestId,
          code: error.code,
        },
        "Request failed",
      );
    } else {
      logger.warn(
        {
          requestId: res.locals.requestId,
          code: error.code,
          details: error.details,
        },
        "Client request rejected",
      );
    }

    return sendError(res, error.statusCode, {
      code: error.code,
      message: error.message,
      details: error.statusCode < 500 ? error.details : undefined,
    });
  }

  logger.error(
    {
      err: error,
      requestId: res.locals.requestId,
    },
    "Unhandled application error",
  );

  return sendError(res, 500, {
    code: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred.",
  });
}
