ALTER TABLE "contact_submissions"
ADD COLUMN "ipAddress" VARCHAR(64),
ADD COLUMN "userAgent" VARCHAR(512);

CREATE TYPE "PaymentSessionStatus" AS ENUM ('CREATED', 'OPEN', 'COMPLETE', 'EXPIRED', 'FAILED');
CREATE TYPE "ScanJobStatus" AS ENUM ('QUEUED', 'RUNNING', 'COMPLETED', 'FAILED');
CREATE TYPE "ScanTargetType" AS ENUM ('WEB_APPLICATION', 'DOMAIN', 'HOST_SERVICE');
CREATE TYPE "ScanSeverity" AS ENUM ('INFO', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
CREATE TYPE "ScanRiskLevel" AS ENUM ('LOW', 'MODERATE', 'ELEVATED', 'HIGH', 'CRITICAL');

CREATE TABLE "payment_sessions" (
    "id" TEXT NOT NULL,
    "optionKey" VARCHAR(64) NOT NULL,
    "optionLabel" VARCHAR(120) NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "currency" VARCHAR(16) NOT NULL,
    "status" "PaymentSessionStatus" NOT NULL DEFAULT 'CREATED',
    "stripeCheckoutSessionId" VARCHAR(255),
    "stripePaymentIntentId" VARCHAR(255),
    "stripeCustomerEmail" VARCHAR(254),
    "customerName" VARCHAR(120),
    "customerEmail" VARCHAR(254),
    "businessName" VARCHAR(120),
    "notes" TEXT,
    "checkoutUrl" VARCHAR(2048),
    "metadata" JSONB,
    "leadId" TEXT,
    "completedAt" TIMESTAMP(3),
    "expiredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "payment_sessions_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "scan_jobs" (
    "id" TEXT NOT NULL,
    "target" VARCHAR(512) NOT NULL,
    "normalizedTarget" VARCHAR(512) NOT NULL,
    "targetType" "ScanTargetType" NOT NULL,
    "organization" VARCHAR(120) NOT NULL,
    "requesterName" VARCHAR(120),
    "requesterEmail" VARCHAR(254),
    "notes" TEXT,
    "source" VARCHAR(64),
    "authorizedConfirmed" BOOLEAN NOT NULL,
    "publicTokenHash" VARCHAR(64) NOT NULL,
    "status" "ScanJobStatus" NOT NULL DEFAULT 'QUEUED',
    "riskScore" INTEGER,
    "riskLevel" "ScanRiskLevel",
    "summary" TEXT,
    "errorMessage" TEXT,
    "details" JSONB,
    "leadId" TEXT,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "scan_jobs_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "scan_findings" (
    "id" TEXT NOT NULL,
    "scanJobId" TEXT NOT NULL,
    "severity" "ScanSeverity" NOT NULL,
    "category" VARCHAR(64) NOT NULL,
    "title" VARCHAR(160) NOT NULL,
    "description" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    "evidence" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "scan_findings_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "payment_sessions_stripeCheckoutSessionId_key" ON "payment_sessions"("stripeCheckoutSessionId");
CREATE UNIQUE INDEX "scan_jobs_publicTokenHash_key" ON "scan_jobs"("publicTokenHash");

CREATE INDEX "payment_sessions_createdAt_idx" ON "payment_sessions"("createdAt");
CREATE INDEX "payment_sessions_status_createdAt_idx" ON "payment_sessions"("status", "createdAt");
CREATE INDEX "payment_sessions_leadId_idx" ON "payment_sessions"("leadId");

CREATE INDEX "scan_jobs_createdAt_idx" ON "scan_jobs"("createdAt");
CREATE INDEX "scan_jobs_status_createdAt_idx" ON "scan_jobs"("status", "createdAt");
CREATE INDEX "scan_jobs_leadId_idx" ON "scan_jobs"("leadId");
CREATE INDEX "scan_findings_scanJobId_severity_idx" ON "scan_findings"("scanJobId", "severity");

ALTER TABLE "payment_sessions"
ADD CONSTRAINT "payment_sessions_leadId_fkey"
FOREIGN KEY ("leadId") REFERENCES "contact_submissions"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "scan_jobs"
ADD CONSTRAINT "scan_jobs_leadId_fkey"
FOREIGN KEY ("leadId") REFERENCES "contact_submissions"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "scan_findings"
ADD CONSTRAINT "scan_findings_scanJobId_fkey"
FOREIGN KEY ("scanJobId") REFERENCES "scan_jobs"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
