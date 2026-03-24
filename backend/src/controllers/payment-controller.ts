import type { NextFunction, Request, Response } from "express";

import { ApiError } from "../lib/api-error";
import { sendSuccess } from "../lib/response";
import { createPaymentCheckoutSession, syncPaymentSession } from "../services/payment-service";
import { createPaymentCheckoutSessionSchema, paymentSessionPathSchema } from "../validators/payment";

export async function createPaymentCheckoutSessionHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsedPayload = createPaymentCheckoutSessionSchema.safeParse(req.body);

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

    const session = await createPaymentCheckoutSession(parsedPayload.data, {
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
    });

    return sendSuccess(res, 201, session);
  } catch (error) {
    return next(error);
  }
}

export async function getPaymentSessionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedPath = paymentSessionPathSchema.safeParse(req.params);

    if (!parsedPath.success) {
      return next(new ApiError(400, "VALIDATION_ERROR", "Payment session path is invalid."));
    }

    const paymentSession = await syncPaymentSession(parsedPath.data.sessionId);
    return sendSuccess(res, 200, paymentSession);
  } catch (error) {
    return next(error);
  }
}
