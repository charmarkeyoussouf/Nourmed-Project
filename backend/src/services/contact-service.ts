import { logger } from "../lib/logger";
import { prisma } from "../lib/prisma";
import { sanitizeMultilineText, sanitizeOptionalText, sanitizeText } from "../lib/sanitize";
import type { ContactSubmissionInput } from "../validators/contact";

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
};

export async function createLeadRecord(input: CreateLeadRecordInput) {
  return prisma.contactSubmission.create({
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
