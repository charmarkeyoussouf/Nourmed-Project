import { logger } from "../lib/logger";
import { prisma } from "../lib/prisma";
import { sanitizeMultilineText, sanitizeOptionalText, sanitizeText } from "../lib/sanitize";
import type { ContactSubmissionInput } from "../validators/contact";
import type { LeadNotificationField } from "./lead-notification-service";
import { sendLeadNotificationEmail } from "./lead-notification-service";

type PersistedContactSubmission = Omit<ContactSubmissionInput, "website">;

type CreateContactSubmissionOptions = {
  input: PersistedContactSubmission;
  ipAddress?: string;
  userAgent?: string;
};

export async function createContactSubmission({
  input,
  ipAddress,
  userAgent,
}: CreateContactSubmissionOptions) {
  const submission = await prisma.contactSubmission.create({
    data: {
      name: sanitizeText(input.name),
      email: input.email,
      company: sanitizeText(input.company),
      phone: sanitizeOptionalText(input.phone) ?? null,
      websiteUrl: sanitizeText(input.websiteUrl),
      serviceInterest: input.serviceInterest,
      message: input.message ? sanitizeMultilineText(input.message) : null,
      source: sanitizeOptionalText(input.source) ?? "website_free_scan_form",
      ipAddress: sanitizeOptionalText(ipAddress) ?? null,
      userAgent: sanitizeOptionalText(userAgent)?.slice(0, 512) ?? null,
      status: "PENDING",
    },
  });

  logger.info(
    {
      submissionId: submission.id,
      createdAt: submission.createdAt,
    },
    "Contact submission stored",
  );

  await sendLeadNotificationEmail({
    name: submission.name,
    businessName: submission.company,
    email: submission.email,
    phone: submission.phone,
    websiteUrl: submission.websiteUrl,
    serviceInterest: submission.serviceInterest,
    message: submission.message,
    source: submission.source,
    submittedAt: submission.createdAt,
  });

  return submission;
}

type CreateLeadRecordInput = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  websiteUrl?: string;
  serviceInterest?: string;
  message?: string;
  source?: string;
  ipAddress?: string;
  userAgent?: string;
  notificationSubject?: string;
  extraNotificationFields?: readonly LeadNotificationField[];
};

export async function createLeadRecord(input: CreateLeadRecordInput) {
  const submission = await prisma.contactSubmission.create({
    data: {
      name: sanitizeText(input.name),
      email: input.email.trim().toLowerCase(),
      company: sanitizeOptionalText(input.company) ?? null,
      phone: sanitizeOptionalText(input.phone) ?? null,
      websiteUrl: sanitizeOptionalText(input.websiteUrl) ?? null,
      serviceInterest: sanitizeOptionalText(input.serviceInterest) ?? null,
      message: input.message ? sanitizeMultilineText(input.message) : null,
      source: sanitizeOptionalText(input.source) ?? null,
      ipAddress: sanitizeOptionalText(input.ipAddress) ?? null,
      userAgent: sanitizeOptionalText(input.userAgent)?.slice(0, 512) ?? null,
      status: "PENDING",
    },
  });

  await sendLeadNotificationEmail({
    subject: input.notificationSubject,
    name: submission.name,
    businessName: submission.company,
    email: submission.email,
    phone: submission.phone,
    websiteUrl: submission.websiteUrl,
    serviceInterest: submission.serviceInterest,
    message: submission.message,
    source: submission.source,
    submittedAt: submission.createdAt,
    extraFields: input.extraNotificationFields,
  });

  return submission;
}

export async function listContactSubmissions(limit: number) {
  return prisma.contactSubmission.findMany({
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      paymentSessions: {
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      },
      scanJobs: {
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      },
    },
  });
}
