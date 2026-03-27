import { z } from "zod";

function emptyStringToUndefined(value: unknown) {
  if (typeof value === "string" && value.trim().length === 0) {
    return undefined;
  }

  return value;
}

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  HOST: z.string().default("0.0.0.0"),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  DATABASE_URL: z.string().min(1),
  PUBLIC_APP_URL: z.preprocess(emptyStringToUndefined, z.string().url().default("http://localhost:8080")),
  CORS_ALLOWED_ORIGINS: z.preprocess(emptyStringToUndefined, z.string().default("http://localhost:8080")),
  REQUEST_BODY_LIMIT: z.preprocess(emptyStringToUndefined, z.string().default("16kb")),
  CONTACT_RATE_LIMIT_WINDOW_MS: z.preprocess(
    emptyStringToUndefined,
    z.coerce.number().int().positive().default(900000),
  ),
  CONTACT_RATE_LIMIT_MAX: z.preprocess(
    emptyStringToUndefined,
    z.coerce.number().int().positive().default(5),
  ),
  PAYMENTS_RATE_LIMIT_WINDOW_MS: z.preprocess(
    emptyStringToUndefined,
    z.coerce.number().int().positive().default(900000),
  ),
  PAYMENTS_RATE_LIMIT_MAX: z.preprocess(
    emptyStringToUndefined,
    z.coerce.number().int().positive().default(10),
  ),
  SCAN_RATE_LIMIT_WINDOW_MS: z.preprocess(
    emptyStringToUndefined,
    z.coerce.number().int().positive().default(1800000),
  ),
  SCAN_RATE_LIMIT_MAX: z.preprocess(
    emptyStringToUndefined,
    z.coerce.number().int().positive().default(5),
  ),
  ADMIN_API_TOKEN: z.preprocess(emptyStringToUndefined, z.string().default("")),
  SMTP_HOST: z.preprocess(emptyStringToUndefined, z.string().trim().min(1).optional()),
  SMTP_PORT: z.preprocess(
    emptyStringToUndefined,
    z.coerce.number().int().positive().max(65535).default(587),
  ),
  SMTP_SECURE: z.preprocess(
    emptyStringToUndefined,
    z
      .union([z.boolean(), z.string()])
      .transform((value) => {
        if (typeof value === "boolean") {
          return value;
        }

        return value.trim().toLowerCase() === "true";
      })
      .default(false),
  ),
  SMTP_USER: z.preprocess(emptyStringToUndefined, z.string().trim().min(1).optional()),
  SMTP_PASS: z.preprocess(emptyStringToUndefined, z.string().trim().min(1).optional()),
  SMTP_FROM: z.preprocess(emptyStringToUndefined, z.string().trim().min(1).optional()),
  LEAD_NOTIFICATION_TO: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().email().default("charmarke.nourmed@gmail.com"),
  ),
  STRIPE_SECRET_KEY: z.preprocess(emptyStringToUndefined, z.string().default("")),
  STRIPE_CURRENCY: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().min(3).max(8).default("usd"),
  ),
  STRIPE_SUCCESS_URL: z.preprocess(emptyStringToUndefined, z.string().url().optional()),
  STRIPE_CANCEL_URL: z.preprocess(emptyStringToUndefined, z.string().url().optional()),
  SCAN_HTTP_TIMEOUT_MS: z.preprocess(
    emptyStringToUndefined,
    z.coerce.number().int().positive().default(10000),
  ),
  SCAN_MAX_RESPONSE_BYTES: z.preprocess(
    emptyStringToUndefined,
    z.coerce.number().int().positive().default(262144),
  ),
  SCAN_ALLOW_PRIVATE_TARGETS: z.preprocess(
    emptyStringToUndefined,
    z
      .union([z.boolean(), z.string()])
      .transform((value) => {
        if (typeof value === "boolean") {
          return value;
        }

        return value.trim().toLowerCase() === "true";
      })
      .default(false),
  ),
  SCAN_USER_AGENT: z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .trim()
      .min(1)
      .default("NourmedAuthorizedSecurityReview/1.0 (+https://www.nourmed.org)"),
  ),
  TRUST_PROXY: z.string().default("1"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),
  SHUTDOWN_TIMEOUT_MS: z.coerce.number().int().positive().default(10000),
});

function parseTrustProxy(value: string): boolean | number | string {
  const normalized = value.trim().toLowerCase();

  if (normalized === "true") {
    return true;
  }

  if (normalized === "false") {
    return false;
  }

  const numericValue = Number(value);

  if (!Number.isNaN(numericValue)) {
    return numericValue;
  }

  return value;
}

const parsed = envSchema.parse(process.env);

export const env = {
  ...parsed,
  corsAllowedOrigins: parsed.CORS_ALLOWED_ORIGINS.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  trustProxy: parseTrustProxy(parsed.TRUST_PROXY),
} as const;
