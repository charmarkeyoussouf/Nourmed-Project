"use client";

import { type FormEvent, useState } from "react";

import { getMarketingCopy } from "@/lib/marketing";
import type { Locale } from "@/lib/locale";

type FormState = {
  name: string;
  company: string;
  email: string;
  websiteUrl: string;
  serviceInterest: string;
  message: string;
  website: string;
};

type SubmissionState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
};

const initialFormState: FormState = {
  name: "",
  company: "",
  email: "",
  websiteUrl: "",
  serviceInterest: "",
  message: "",
  website: "",
};

const initialSubmissionState: SubmissionState = {
  status: "idle",
  message: "",
};

type ContactFormProps = {
  locale: Locale;
  eyebrow?: string;
  title?: string;
  description?: string;
  submitLabel?: string;
};

export function ContactForm({
  locale,
  eyebrow,
  title,
  description,
  submitLabel,
}: ContactFormProps) {
  const copy = getMarketingCopy(locale);
  const formCopy = copy.form;
  const resolvedEyebrow = eyebrow ?? formCopy.eyebrow;
  const resolvedTitle = title ?? formCopy.title;
  const resolvedDescription = description ?? formCopy.description;
  const resolvedSubmitLabel = submitLabel ?? formCopy.submitLabel;

  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [submissionState, setSubmissionState] = useState<SubmissionState>(initialSubmissionState);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState({
      status: "submitting",
      message: formCopy.messages.submitting,
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        setSubmissionState({
          status: "error",
          message: formCopy.messages.error,
        });
        return;
      }

      setFormState(initialFormState);
      setSubmissionState({
        status: "success",
        message: formCopy.messages.success,
      });
    } catch {
      setSubmissionState({
        status: "error",
        message: formCopy.messages.error,
      });
    }
  }

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
  }

  const isSubmitting = submissionState.status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">{resolvedEyebrow}</p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">{resolvedTitle}</h2>
        <p className="max-w-2xl text-base leading-7 text-muted">{resolvedDescription}</p>
      </div>

      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">{formCopy.hiddenWebsiteLabel}</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formState.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">{formCopy.fields.name}</span>
          <input
            type="text"
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            disabled={isSubmitting}
            value={formState.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="w-full rounded-2xl border border-border bg-panel-strong px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">{formCopy.fields.businessName}</span>
          <input
            type="text"
            name="company"
            required
            maxLength={120}
            autoComplete="organization"
            disabled={isSubmitting}
            value={formState.company}
            onChange={(event) => updateField("company", event.target.value)}
            className="w-full rounded-2xl border border-border bg-panel-strong px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">{formCopy.fields.email}</span>
          <input
            type="email"
            name="email"
            required
            maxLength={254}
            autoComplete="email"
            disabled={isSubmitting}
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="w-full rounded-2xl border border-border bg-panel-strong px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">{formCopy.fields.websiteUrl}</span>
          <input
            type="text"
            name="websiteUrl"
            required
            maxLength={255}
            autoComplete="url"
            placeholder={formCopy.fields.websiteUrlPlaceholder}
            disabled={isSubmitting}
            value={formState.websiteUrl}
            onChange={(event) => updateField("websiteUrl", event.target.value)}
            className="w-full rounded-2xl border border-border bg-panel-strong px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-medium text-foreground">{formCopy.fields.serviceOfInterest}</span>
        <select
          name="serviceInterest"
          required
          disabled={isSubmitting}
          value={formState.serviceInterest}
          onChange={(event) => updateField("serviceInterest", event.target.value)}
          className="w-full rounded-2xl border border-border bg-panel-strong px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
        >
          <option value="" disabled>
            {formCopy.fields.servicePlaceholder}
          </option>
          {copy.shared.serviceInterestOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-foreground">{formCopy.fields.optionalMessage}</span>
        <textarea
          name="message"
          maxLength={2000}
          rows={6}
          disabled={isSubmitting}
          value={formState.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="w-full rounded-[1.5rem] border border-border bg-panel-strong px-4 py-3 text-sm leading-7 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
        />
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition hover:bg-[#184a52] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? formCopy.messages.submitting : resolvedSubmitLabel}
        </button>
        <p className="text-sm leading-6 text-muted">{formCopy.secureNote}</p>
      </div>

      {submissionState.status !== "idle" ? (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${
            submissionState.status === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : submissionState.status === "error"
                ? "border-rose-200 bg-rose-50 text-rose-800"
                : "border-border bg-panel-strong text-muted"
          }`}
        >
          {submissionState.message}
        </div>
      ) : null}
    </form>
  );
}
