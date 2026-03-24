import type { NextFunction, Request, Response } from "express";

import { ApiError } from "../lib/api-error";
import { logger } from "../lib/logger";
import { sendSuccess } from "../lib/response";
import { createContactSubmission } from "../services/contact-service";
import { contactSubmissionSchema } from "../validators/contact";

export async function createContactSubmissionHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsedPayload = contactSubmissionSchema.safeParse(req.body);

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

    const { website, ...submissionPayload } = parsedPayload.data;

    if (website && website.length > 0) {
      logger.warn(
        {
          requestId: res.locals.requestId,
          remoteAddress: req.ip,
        },
        "Contact honeypot triggered",
      );

      return sendSuccess(res, 202, {
        message: "Your request has been received.",
      });
    }

    await createContactSubmission(submissionPayload);

    return sendSuccess(res, 201, {
      message: "Your request has been received.",
    });
  } catch (error) {
    return next(error);
  }
}
