import { env } from "../config/env";
import { ApiError } from "../lib/api-error";
import { getMailerConfigurationStatus, getMailTransporter } from "../lib/mailer";
import { logger } from "../lib/logger";

export type LeadNotificationField = {
  label: string;
  value?: string | null;
};

type LeadNotificationInput = {
  subject?: string;
  name?: string | null;
  businessName?: string | null;
  email?: string | null;
  phone?: string | null;
  websiteUrl?: string | null;
  serviceInterest?: string | null;
  message?: string | null;
  source?: string | null;
  submittedAt?: Date;
  extraFields?: readonly LeadNotificationField[];
};

function resolveSubject(input: LeadNotificationInput) {
  if (input.subject) {
    return input.subject;
  }

  const normalizedSource = input.source?.toLowerCase() ?? "";

  if (normalizedSource.includes("scan")) {
    return "New Free Scan Request";
  }

  if (normalizedSource.includes("contact") || normalizedSource.includes("service")) {
    return "New Services Inquiry";
  }

  return "New Nourmed Lead Submission";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatTextValue(value?: string | null) {
  return value && value.length > 0 ? value : "Not provided";
}

function formatHtmlValue(value?: string | null) {
  return escapeHtml(formatTextValue(value)).replace(/\n/g, "<br />");
}

function buildFields(input: LeadNotificationInput): LeadNotificationField[] {
  return [
    { label: "Name", value: input.name },
    { label: "Business Name", value: input.businessName },
    { label: "Email", value: input.email },
    { label: "Phone", value: input.phone },
    { label: "Website URL", value: input.websiteUrl },
    { label: "Service Interest", value: input.serviceInterest },
    { label: "Message", value: input.message },
    { label: "Page Source", value: input.source },
    { label: "Submitted At", value: input.submittedAt?.toISOString() ?? new Date().toISOString() },
    ...(input.extraFields ?? []),
  ];
}

export async function sendLeadNotificationEmail(input: LeadNotificationInput) {
  const transporter = getMailTransporter();

  if (!transporter) {
    const status = getMailerConfigurationStatus();

    logger.warn(
      {
        recipient: env.LEAD_NOTIFICATION_TO,
        missingKeys: status.missingKeys,
      },
      "Lead notification email is disabled because SMTP is not fully configured",
    );

    throw new ApiError(
      503,
      "EMAIL_NOT_CONFIGURED",
      "We could not submit your request at this time. Please try again shortly or contact Nourmed directly at charmarke.nourmed@gmail.com.",
    );
  }

  const subject = resolveSubject(input);
  const fields = buildFields(input);
  const textBody = [
    "A new submission was received from the Nourmed website.",
    "",
    ...fields.map((field) => `${field.label}: ${formatTextValue(field.value)}`),
  ].join("\n");
  const htmlRows = fields
    .map(
      (field) =>
        `<tr><td style="padding:10px 14px;border:1px solid #d6e3df;font-weight:600;color:#12303a;vertical-align:top;">${escapeHtml(field.label)}</td><td style="padding:10px 14px;border:1px solid #d6e3df;color:#2c4951;">${formatHtmlValue(field.value)}</td></tr>`,
    )
    .join("");

  try {
    await transporter.sendMail({
      from: env.SMTP_FROM,
      to: env.LEAD_NOTIFICATION_TO,
      replyTo: input.email ?? undefined,
      subject,
      text: textBody,
      html: [
        '<div style="font-family:Arial,sans-serif;background:#f5fbf9;padding:24px;color:#163746;">',
        '<div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #d6e3df;border-radius:18px;overflow:hidden;">',
        '<div style="padding:24px 28px;background:linear-gradient(135deg,#e3f5f1,#fff6e8);">',
        '<p style="margin:0;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#2a8f95;">Nourmed Website Lead</p>',
        `<h1 style="margin:12px 0 0;font-size:24px;line-height:1.3;">${escapeHtml(subject)}</h1>`,
        "</div>",
        '<div style="padding:24px 28px;">',
        '<p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#47606a;">A new submission was received from the Nourmed website.</p>',
        '<table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6;">',
        htmlRows,
        "</table>",
        "</div>",
        "</div>",
        "</div>",
      ].join(""),
    });

    logger.info(
      {
        recipient: env.LEAD_NOTIFICATION_TO,
        subject,
      },
      "Lead notification email sent",
    );
  } catch (error) {
    logger.error(
      {
        recipient: env.LEAD_NOTIFICATION_TO,
        subject,
        error,
      },
      "Lead notification email failed",
    );

    throw new ApiError(
      502,
      "EMAIL_DELIVERY_FAILED",
      "We could not submit your request at this time. Please try again shortly or contact Nourmed directly at charmarke.nourmed@gmail.com.",
    );
  }
}
