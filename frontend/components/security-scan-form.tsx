"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { getProductCopy } from "@/lib/product-copy";
import type { Locale } from "@/lib/locale";

type ScanReport = {
  id: string;
  status: "QUEUED" | "RUNNING" | "COMPLETED" | "FAILED";
  target: string;
  normalizedTarget: string;
  targetType: "WEB_APPLICATION" | "DOMAIN" | "HOST_SERVICE";
  organization: string;
  riskScore: number | null;
  riskLevel: "LOW" | "MODERATE" | "ELEVATED" | "HIGH" | "CRITICAL" | null;
  summary: string | null;
  errorMessage: string | null;
  details: Record<string, unknown> | null;
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
  findings: Array<{
    id: string;
    severity: "INFO" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    category: string;
    title: string;
    description: string;
    recommendation: string;
    evidence: Record<string, unknown> | null;
  }>;
};

type FormState = {
  target: string;
  targetType: "WEB_APPLICATION" | "DOMAIN" | "HOST_SERVICE";
  organization: string;
  requesterName: string;
  requesterEmail: string;
  notes: string;
  authorizedConfirmation: boolean;
};

type SubmissionState = {
  status: "idle" | "submitting" | "error";
  message: string;
};

const initialFormState: FormState = {
  target: "",
  targetType: "WEB_APPLICATION",
  organization: "",
  requesterName: "",
  requesterEmail: "",
  notes: "",
  authorizedConfirmation: false,
};

const reportLabels: Record<
  Locale,
  { status: string; risk: string; noFindings: string }
> = {
  en: { status: "Status", risk: "Risk", noFindings: "No findings recorded yet." },
  fr: { status: "Statut", risk: "Risque", noFindings: "Aucun finding n’a encore été enregistré." },
  es: { status: "Estado", risk: "Riesgo", noFindings: "Aún no se han registrado hallazgos." },
  ar: { status: "الحالة", risk: "المخاطر", noFindings: "لا توجد نتائج مسجلة حتى الآن." },
};

function getStorageKey(jobId: string) {
  return `nourmed-scan-access:${jobId}`;
}

function formatValue(value: unknown) {
  if (value === null || value === undefined) {
    return "—";
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return JSON.stringify(value, null, 2);
}

export function SecurityScanForm({ locale }: { locale: Locale }) {
  const copy = getProductCopy(locale);
  const page = copy.scanPage;
  const router = useRouter();
  const searchParams = useSearchParams();
  const localizedReportLabels = reportLabels[locale];
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [submissionState, setSubmissionState] = useState<SubmissionState>({ status: "idle", message: "" });
  const [report, setReport] = useState<ScanReport | null>(null);
  const [activeJobId, setActiveJobId] = useState<string | null>(searchParams.get("job"));

  const isSubmitting = submissionState.status === "submitting";
  const hasActiveJob = Boolean(activeJobId);

  const riskLabel = useMemo(() => {
    if (!report?.riskLevel) {
      return null;
    }

    return page.riskLabels[report.riskLevel];
  }, [page.riskLabels, report?.riskLevel]);

  useEffect(() => {
    const jobId = searchParams.get("job");
    setActiveJobId(jobId);
  }, [searchParams]);

  useEffect(() => {
    if (!activeJobId) {
      return;
    }

    const accessToken = window.localStorage.getItem(getStorageKey(activeJobId));

    if (!accessToken) {
      setSubmissionState({
        status: "error",
        message: page.messages.error,
      });
      return;
    }

    const resolvedAccessToken = accessToken;

    let cancelled = false;
    let timeoutId: number | null = null;

    async function loadReport() {
      try {
        const response = await fetch(`/api/scan-jobs/${activeJobId}`, {
          headers: {
            "X-Scan-Access-Token": resolvedAccessToken,
          },
        });

        if (!response.ok) {
          throw new Error("Scan report fetch failed.");
        }

        const payload = (await response.json()) as { data: ScanReport };

        if (cancelled) {
          return;
        }

        setReport(payload.data);
        setSubmissionState({ status: "idle", message: "" });

        if (payload.data.status === "QUEUED" || payload.data.status === "RUNNING") {
          timeoutId = window.setTimeout(() => {
            void loadReport();
          }, 5000);
        }
      } catch {
        if (!cancelled) {
          setSubmissionState({
            status: "error",
            message: page.messages.error,
          });
        }
      }
    }

    void loadReport();

    return () => {
      cancelled = true;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [activeJobId, page.messages.error]);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState({
      status: "submitting",
      message: page.messages.loading,
    });

    try {
      const response = await fetch("/api/scan-jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error("Scan creation failed.");
      }

      const payload = (await response.json()) as {
        data: {
          jobId: string;
          accessToken: string;
        };
      };

      window.localStorage.setItem(getStorageKey(payload.data.jobId), payload.data.accessToken);
      setSubmissionState({
        status: "idle",
        message: page.messages.success,
      });
      setReport(null);
      setActiveJobId(payload.data.jobId);
      router.replace(`/security-scan?job=${payload.data.jobId}`, { scroll: false });
    } catch {
      setSubmissionState({
        status: "error",
        message: page.messages.error,
      });
    }
  }

  const detailEntries = report?.details ? Object.entries(report.details) : [];

  return (
    <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-[2rem] border border-border bg-[rgba(255,255,255,0.92)] p-7 shadow-[0_18px_36px_rgba(16,33,42,0.08)]"
      >
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">{page.formEyebrow}</p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">{page.formTitle}</h2>
          <p className="text-sm leading-7 text-muted">{page.formDescription}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">{page.requesterNameLabel}</span>
            <input
              type="text"
              maxLength={120}
              value={formState.requesterName}
              onChange={(event) => updateField("requesterName", event.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-[1.2rem] border border-border bg-panel-strong px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">{page.requesterEmailLabel}</span>
            <input
              type="email"
              maxLength={254}
              value={formState.requesterEmail}
              onChange={(event) => updateField("requesterEmail", event.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-[1.2rem] border border-border bg-panel-strong px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">{page.organizationLabel}</span>
            <input
              type="text"
              required
              maxLength={120}
              value={formState.organization}
              onChange={(event) => updateField("organization", event.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-[1.2rem] border border-border bg-panel-strong px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">{page.targetTypeLabel}</span>
            <select
              value={formState.targetType}
              onChange={(event) =>
                updateField("targetType", event.target.value as FormState["targetType"])
              }
              disabled={isSubmitting}
              className="w-full rounded-[1.2rem] border border-border bg-panel-strong px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
            >
              {page.targetTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">{page.targetLabel}</span>
          <input
            type="text"
            required
            maxLength={512}
            value={formState.target}
            placeholder={page.targetPlaceholder}
            onChange={(event) => updateField("target", event.target.value)}
            disabled={isSubmitting}
            className="w-full rounded-[1.2rem] border border-border bg-panel-strong px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">{page.notesLabel}</span>
          <textarea
            rows={5}
            maxLength={2000}
            value={formState.notes}
            onChange={(event) => updateField("notes", event.target.value)}
            disabled={isSubmitting}
            className="w-full rounded-[1.4rem] border border-border bg-panel-strong px-4 py-3 text-sm leading-7 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
          />
        </label>

        <label className="flex items-start gap-3 rounded-[1.4rem] border border-border bg-[rgba(255,255,255,0.78)] px-4 py-4">
          <input
            type="checkbox"
            checked={formState.authorizedConfirmation}
            onChange={(event) => updateField("authorizedConfirmation", event.target.checked)}
            disabled={isSubmitting}
            className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-accent"
          />
          <span className="space-y-2 text-sm leading-7 text-muted">
            <span className="block font-medium text-foreground">{page.authorizationLabel}</span>
            <span className="block">{page.authorizationHint}</span>
          </span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#2a8f95,#3ba8a5)] px-6 py-3.5 text-sm font-semibold text-accent-contrast shadow-[0_14px_30px_rgba(42,143,149,0.22)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? page.submittingLabel : page.submitLabel}
        </button>

        {submissionState.message ? (
          <div
            className={`rounded-[1.3rem] border px-4 py-3 text-sm ${
              submissionState.status === "error"
                ? "border-rose-200 bg-rose-50 text-rose-800"
                : submissionState.status === "submitting"
                  ? "border-border bg-panel-strong text-muted"
                  : "border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}
          >
            {submissionState.message}
          </div>
        ) : null}
      </form>

      <div className="space-y-6 rounded-[2rem] border border-border bg-[rgba(255,255,255,0.92)] p-7 shadow-[0_18px_36px_rgba(16,33,42,0.08)]">
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">{page.reportTitle}</p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">{page.reportDescription}</h2>
        </div>

        {!hasActiveJob && !report ? <p className="text-sm leading-7 text-muted">{page.reportEmpty}</p> : null}

        {report ? (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-border bg-panel-strong px-4 py-4">
                <p className="text-xs uppercase tracking-[0.24em] text-muted">{page.targetLabel}</p>
                <p className="mt-2 text-sm font-medium text-foreground">{report.normalizedTarget}</p>
              </div>
              <div className="rounded-[1.4rem] border border-border bg-panel-strong px-4 py-4">
                <p className="text-xs uppercase tracking-[0.24em] text-muted">{localizedReportLabels.status}</p>
                <p className="mt-2 text-sm font-medium text-foreground">
                  {report.status === "QUEUED"
                    ? page.statusQueued
                    : report.status === "RUNNING"
                      ? page.statusRunning
                      : report.status === "COMPLETED"
                        ? page.statusCompleted
                        : page.statusFailed}
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-border bg-panel-strong px-4 py-4">
                <p className="text-xs uppercase tracking-[0.24em] text-muted">{localizedReportLabels.risk}</p>
                <p className="mt-2 text-sm font-medium text-foreground">
                  {riskLabel ?? "—"}
                  {typeof report.riskScore === "number" ? ` • ${report.riskScore}/100` : ""}
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-border bg-panel-strong px-4 py-4">
                <p className="text-xs uppercase tracking-[0.24em] text-muted">{page.organizationLabel}</p>
                <p className="mt-2 text-sm font-medium text-foreground">{report.organization}</p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-border bg-[rgba(255,255,255,0.82)] px-5 py-5">
              <p className="text-sm leading-7 text-muted">{report.summary ?? report.errorMessage ?? page.reportEmpty}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">{page.findingsTitle}</h3>
              {report.findings.length === 0 ? (
                <p className="text-sm leading-7 text-muted">{localizedReportLabels.noFindings}</p>
              ) : (
                <div className="grid gap-4">
                  {report.findings.map((finding) => (
                    <article key={finding.id} className="rounded-[1.5rem] border border-border bg-panel-strong px-5 py-5">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <h4 className="text-base font-semibold text-foreground">{finding.title}</h4>
                        <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                          {finding.severity}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-muted">{finding.description}</p>
                      <p className="mt-3 text-sm leading-7 text-foreground">{finding.recommendation}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">{page.technicalSummaryTitle}</h3>
              <div className="grid gap-4">
                {detailEntries.map(([key, value]) => (
                  <article key={key} className="rounded-[1.5rem] border border-border bg-panel-strong px-5 py-5">
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-accent">{key}</p>
                    <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-sm leading-7 text-muted">
                      {formatValue(value)}
                    </pre>
                  </article>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
