import nodemailer from "nodemailer";

import { env } from "../config/env";

let transporter: nodemailer.Transporter | null | undefined;

function hasMailerConfiguration() {
  const hasAuthentication =
    (!env.SMTP_USER && !env.SMTP_PASS) || (Boolean(env.SMTP_USER) && Boolean(env.SMTP_PASS));

  return Boolean(env.SMTP_HOST && env.SMTP_FROM && hasAuthentication);
}

export function getMailTransporter() {
  if (transporter !== undefined) {
    return transporter;
  }

  if (!hasMailerConfiguration()) {
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
