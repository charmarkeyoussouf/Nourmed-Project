import type { Response } from "express";

type ErrorPayload = {
  code: string;
  message: string;
  details?: unknown;
};

function getTimestamp() {
  return new Date().toISOString();
}

function getRequestId(res: Response) {
  return res.locals.requestId as string | undefined;
}

export function sendSuccess<T>(res: Response, statusCode: number, data: T) {
  return res.status(statusCode).json({
    success: true,
    data,
    requestId: getRequestId(res),
    timestamp: getTimestamp(),
  });
}

export function sendError(res: Response, statusCode: number, error: ErrorPayload) {
  const responseBody: {
    success: false;
    error: ErrorPayload;
    requestId?: string;
    timestamp: string;
  } = {
    success: false,
    error,
    requestId: getRequestId(res),
    timestamp: getTimestamp(),
  };

  return res.status(statusCode).json(responseBody);
}
