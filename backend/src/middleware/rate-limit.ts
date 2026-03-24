import rateLimit from "express-rate-limit";

import { env } from "../config/env";
import { sendError } from "../lib/response";

function createLimiter(windowMs: number, limit: number, message: string) {
  return rateLimit({
    windowMs,
    limit,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handler: (_req, res) =>
      sendError(res, 429, {
        code: "RATE_LIMITED",
        message,
      }),
  });
}

export const contactRateLimiter = createLimiter(
  env.CONTACT_RATE_LIMIT_WINDOW_MS,
  env.CONTACT_RATE_LIMIT_MAX,
  "Too many contact requests. Please try again later.",
);

export const paymentRateLimiter = createLimiter(
  env.PAYMENTS_RATE_LIMIT_WINDOW_MS,
  env.PAYMENTS_RATE_LIMIT_MAX,
  "Too many payment requests. Please try again later.",
);

export const scanRateLimiter = createLimiter(
  env.SCAN_RATE_LIMIT_WINDOW_MS,
  env.SCAN_RATE_LIMIT_MAX,
  "Too many scan requests. Please try again later.",
);
