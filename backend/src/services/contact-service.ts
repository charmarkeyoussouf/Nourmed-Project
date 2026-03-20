import { prisma } from "../lib/prisma";
import { logger } from "../lib/logger";
import type { ContactSubmissionInput } from "../validators/contact";

type PersistedContactSubmission = Omit<ContactSubmissionInput, "website">;

export async function createContactSubmission(input: PersistedContactSubmission) {
  const submission = await prisma.contactSubmission.create({
    data: {
      name: input.name,
      email: input.email,
      message: input.message,
      source: "website_contact_form",
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
