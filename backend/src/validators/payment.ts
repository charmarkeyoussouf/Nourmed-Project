import { z } from "zod";

import { getPaymentOption } from "../lib/payment-catalog";

export const createPaymentCheckoutSessionSchema = z
  .object({
    optionKey: z
      .string()
      .trim()
      .min(1)
      .refine((value) => Boolean(getPaymentOption(value)), "Select a valid payment option."),
    customerName: z.string().trim().min(2).max(120),
    businessName: z
      .string()
      .trim()
      .max(120)
      .optional()
      .transform((value) => (value && value.length > 0 ? value : undefined)),
    customerEmail: z.string().trim().email().transform((value) => value.toLowerCase()),
    notes: z
      .string()
      .trim()
      .max(1200)
      .optional()
      .transform((value) => (value && value.length > 0 ? value : undefined)),
  })
  .strict();

export const paymentSessionPathSchema = z
  .object({
    sessionId: z.string().trim().min(1).max(255),
  })
  .strict();

export type CreatePaymentCheckoutSessionInput = z.infer<typeof createPaymentCheckoutSessionSchema>;
