import { z } from "zod";

export const contactSubmissionSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(120, "Name must be 120 characters or fewer."),
    email: z
      .string()
      .trim()
      .email("Email must be a valid email address.")
      .transform((value) => value.toLowerCase()),
    message: z
      .string()
      .trim()
      .min(10, "Message must be at least 10 characters.")
      .max(2000, "Message must be 2000 characters or fewer."),
    website: z.string().trim().max(120).optional(),
  })
  .strict();

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
