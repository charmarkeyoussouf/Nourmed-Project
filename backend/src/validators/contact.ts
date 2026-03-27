import { z } from "zod";

import { serviceInterestValues } from "../lib/service-interest";

function emptyStringToUndefined(value: unknown) {
  if (typeof value === "string" && value.trim().length === 0) {
    return undefined;
  }

  return value;
}

const websiteUrlSchema = z
  .string()
  .trim()
  .min(3, "Website URL is required.")
  .max(255, "Website URL must be 255 characters or fewer.")
  .transform((value) => (value.match(/^https?:\/\//i) ? value : `https://${value}`))
  .refine((value) => {
    try {
      const parsedUrl = new URL(value);

      return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch {
      return false;
    }
  }, "Website URL must be a valid URL.");

export const contactSubmissionSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(120, "Name must be 120 characters or fewer."),
    company: z
      .string()
      .trim()
      .min(2, "Business name must be at least 2 characters.")
      .max(120, "Business name must be 120 characters or fewer."),
    email: z
      .string()
      .trim()
      .email("Email must be a valid email address.")
      .transform((value) => value.toLowerCase()),
    phone: z.preprocess(
      emptyStringToUndefined,
      z
        .string()
        .trim()
        .min(7, "Phone number must be at least 7 characters.")
        .max(32, "Phone number must be 32 characters or fewer.")
        .optional(),
    ),
    websiteUrl: websiteUrlSchema,
    serviceInterest: z.enum(serviceInterestValues, {
      error: "Select a valid service of interest.",
    }),
    source: z
      .string()
      .trim()
      .max(64, "Source must be 64 characters or fewer.")
      .optional()
      .transform((value) => (value && value.length > 0 ? value : undefined)),
    message: z
      .string()
      .trim()
      .max(2000, "Message must be 2000 characters or fewer.")
      .optional()
      .transform((value) => (value && value.length > 0 ? value : undefined)),
    website: z.string().trim().max(120).optional(),
  })
  .strict();

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
