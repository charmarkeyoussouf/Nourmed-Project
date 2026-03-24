import { logger } from "../lib/logger";
import { prisma } from "../lib/prisma";
import type { ContactSubmissionInput } from "../validators/contact";

type PersistedContactSubmission = Omit<ContactSubmissionInput, "website">;

export async function createContactSubmission(input: PersistedContactSubmission) {
  const submission = await prisma.contactSubmission.create({
    data: {
      name: input.name,
      email: input.email,
      company: input.company,
      websiteUrl: input.websiteUrl,
      serviceInterest: input.serviceInterest,
      message: input.message ?? null,
      source: "website_free_scan_form",
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
