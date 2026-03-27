import nodemailer from "nodemailer";

import { env } from "../config/env";

let transporter: nodemailer.Transporter | null | undefined;

type MailerConfigurationStatus = {
  configured: boolean;
  missingKeys: string[];
  mode: "authenticated" | "unauthenticated";
};

export function getMailerConfigurationStatus(): MailerConfigurationStatus {
  const missingKeys: string[] = [];

  if (!env.SMTP_HOST) {
    missingKeys.push("SMTP_HOST");
  }

  if (!env.SMTP_FROM) {
    missingKeys.push("SMTP_FROM");
  }

  if ((env.SMTP_USER && !env.SMTP_PASS) || (!env.SMTP_USER && env.SMTP_PASS)) {
    if (!env.SMTP_USER) {
      missingKeys.push("SMTP_USER");
    }

    if (!env.SMTP_PASS) {
      missingKeys.push("SMTP_PASS");
    }
  }

  return {
    configured: missingKeys.length === 0,
    missingKeys,
    mode: env.SMTP_USER && env.SMTP_PASS ? "authenticated" : "unauthenticated",
  };
}

export function getMailTransporter() {
  if (transporter !== undefined) {
    return transporter;
  }

  const status = getMailerConfigurationStatus();

  if (!status.configured) {
    transporter = null;
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth:
      env.SMTP_USER && env.SMTP_PASS
        ? {
            user: env.SMTP_USER,
            pass: env.SMTP_PASS,
          }
        : undefined,
  });

  return transporter;
}
