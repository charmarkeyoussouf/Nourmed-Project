import rateLimit from "express-rate-limit";

import { env } from "../config/env";
import { sendError } from "../lib/response";

export const contactRateLimiter = rateLimit({
  windowMs: env.CONTACT_RATE_LIMIT_WINDOW_MS,
  limit: env.CONTACT_RATE_LIMIT_MAX,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: (_req, res) =>
    sendError(res, 429, {
      code: "RATE_LIMITED",
      message: "Too many contact requests. Please try again later.",
    }),
});
