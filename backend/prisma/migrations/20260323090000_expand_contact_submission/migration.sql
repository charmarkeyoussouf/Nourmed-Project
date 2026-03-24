ALTER TABLE "contact_submissions"
ALTER COLUMN "message" DROP NOT NULL;

ALTER TABLE "contact_submissions"
ADD COLUMN "websiteUrl" VARCHAR(255),
ADD COLUMN "serviceInterest" VARCHAR(120);
