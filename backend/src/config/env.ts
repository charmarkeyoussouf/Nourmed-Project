import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  HOST: z.string().default("0.0.0.0"),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  DATABASE_URL: z.string().min(1),
  CORS_ALLOWED_ORIGINS: z.string().default("http://localhost:8080"),
  REQUEST_BODY_LIMIT: z.string().default("16kb"),
  CONTACT_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(900000),
  CONTACT_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(5),
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
