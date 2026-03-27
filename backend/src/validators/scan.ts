import { z } from "zod";

export const scanJobTargetTypeValues = ["WEB_APPLICATION", "DOMAIN", "HOST_SERVICE"] as const;

export const createScanJobSchema = z
  .object({
    target: z.string().trim().min(3).max(512),
    targetType: z.enum(scanJobTargetTypeValues, {
      error: "Select a valid target type.",
    }),
    organization: z.string().trim().min(2).max(120),
    requesterName: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(120, "Name must be 120 characters or fewer."),
    requesterEmail: z
      .string()
      .trim()
      .email("Email must be a valid email address.")
      .transform((value) => value.toLowerCase()),
    notes: z
      .string()
      .trim()
      .max(2000)
      .optional()
      .transform((value) => (value && value.length > 0 ? value : undefined)),
    authorizedConfirmation: z.literal(true, {
      error: "You must confirm that you are authorized to test this asset.",
    }),
  })
  .strict();

export const scanJobPathSchema = z
  .object({
    jobId: z.string().trim().min(1).max(255),
  })
  .strict();

export type CreateScanJobInput = z.infer<typeof createScanJobSchema>;
