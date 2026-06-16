"use client";

import { type FormEvent, useState } from "react";

import { getMarketingCopy } from "@/lib/marketing";
import type { Locale } from "@/lib/locale";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  websiteUrl: string;
  serviceInterest: string;
  message: string;
  website: string;
  source: string;
};

type SubmissionState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
};

type ContactResponse =
  | {
      success: true;
      data?: {
        message?: string;
      };
    }
  | {
      success: false;
      error?: {
        message?: string;
        details?: Record<string, string[] | undefined>;
      };
    };

const initialFormState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  websiteUrl: "",
  serviceInterest: "",
  message: "",
  website: "",
  source: "",
};

const initialSubmissionState: SubmissionState = {
  status: "idle",
  message: "",
};

function getResponseMessage(payload: ContactResponse | null, fallbackMessage: string) {
  if (payload && "error" in payload && payload.error?.details) {
    const firstFieldError = Object.values(payload.error.details)
      .flat()
      .find((value): value is string => Boolean(value));

    if (firstFieldError) {
      return firstFieldError;
    }
  }

  if (payload && "error" in payload && payload.error?.message) {
    return payload.error.message;
  }

  if (payload && "data" in payload && payload.data?.message) {
    return payload.data.message;
  }

  return fallbackMessage;
}

type ContactFormProps = {
  locale: Locale;
  eyebrow?: string;
  title?: string;
  description?: string;
  submitLabel?: string;
  source?: string;
};

const phoneLabels: Record<Locale, string> = {
  en: "Phone (optional)",
  fr: "TÃ©lÃ©phone (facultatif)",
  es: "TelÃ©fono (opcional)",
  ar: "Ø§Ù„Ù‡Ø§ØªÙ (Ø§Ø®ØªÙŠØ§Ø±ÙŠ)",
};

export function ContactForm({
  locale,
  eyebrow,
  title,
  description,
  submitLabel,
  source = "website_free_scan_form",
}: ContactFormProps) {
  const copy = getMarketingCopy(locale);
  const formCopy = copy.form;
  const resolvedEyebrow = eyebrow ?? formCopy.eyebrow;
  const resolvedTitle = title ?? formCopy.title;
  const resolvedDescription = description ?? formCopy.description;
  const resolvedSubmitLabel = submitLabel ?? formCopy.submitLabel;

  const [formState, setFormState] = useState<FormState>({
    ...initialFormState,
    source,
  });
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

      const payload = ((await response.json().catch(() => null)) as ContactResponse | null) ?? null;

      if (!response.ok) {
        setSubmissionState({
          status: "error",
          message: getResponseMessage(payload, formCopy.messages.error),
        });
        return;
      }

      setFormState({
        ...initialFormState,
        source,
      });
      setSubmissionState({
        status: "success",
        message: getResponseMessage(payload, formCopy.messages.success),
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
  const fieldClassName =
    "w-full rounded-[3px] border border-[rgba(61,110,82,0.18)] bg-panel-strong px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#3d6e52]";
  const labelClassName = "text-[0.72rem] font-medium uppercase tracking-[0.08em] text-foreground/60";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-gold)]">{resolvedEyebrow}</p>
        <h2 className="font-display text-4xl font-semibold leading-[1.05] text-accent sm:text-[2.5rem]">{resolvedTitle}</h2>
        <p className="max-w-2xl text-sm leading-8 text-muted sm:text-[0.98rem]">{resolvedDescription}</p>
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

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className={labelClassName}>{formCopy.fields.name}</span>
          <input
            type="text"
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            disabled={isSubmitting}
            value={formState.name}
            onChange={(event) => updateField("name", event.target.value)}
            className={fieldClassName}
          />
        </label>
        <label className="space-y-2">
          <span className={labelClassName}>{formCopy.fields.businessName}</span>
          <input
            type="text"
            name="company"
            required
            maxLength={120}
            autoComplete="organization"
            disabled={isSubmitting}
            value={formState.company}
            onChange={(event) => updateField("company", event.target.value)}
            className={fieldClassName}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className={labelClassName}>{formCopy.fields.email}</span>
          <input
            type="email"
            name="email"
            required
            maxLength={254}
            autoComplete="email"
            disabled={isSubmitting}
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
            className={fieldClassName}
          />
        </label>
        <label className="space-y-2">
          <span className={labelClassName}>{phoneLabels[locale]}</span>
          <input
            type="tel"
            name="phone"
            maxLength={32}
            autoComplete="tel"
            disabled={isSubmitting}
            value={formState.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className={fieldClassName}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className={labelClassName}>{formCopy.fields.websiteUrl}</span>
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
            className={fieldClassName}
          />
        </label>
        <label className="space-y-2">
          <span className={labelClassName}>{formCopy.fields.serviceOfInterest}</span>
          <select
            name="serviceInterest"
            required
            disabled={isSubmitting}
            value={formState.serviceInterest}
            onChange={(event) => updateField("serviceInterest", event.target.value)}
            className={fieldClassName}
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
      </div>

      <label className="space-y-2">
        <span className={labelClassName}>{formCopy.fields.optionalMessage}</span>
        <textarea
          name="message"
          maxLength={2000}
          rows={6}
          disabled={isSubmitting}
          value={formState.message}
          onChange={(event) => updateField("message", event.target.value)}
          className={fieldClassName}
        />
      </label>

      <div className="flex flex-col gap-5">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-[3px] bg-accent px-6 py-3.5 text-[0.8rem] font-medium uppercase tracking-[0.1em] text-accent-contrast transition hover:bg-[#2a5238] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? formCopy.messages.submitting : resolvedSubmitLabel}
        </button>
        <p className="max-w-xl text-sm leading-7 text-muted">{formCopy.secureNote}</p>
      </div>

      {submissionState.status !== "idle" ? (
        <div
          className={`rounded-[3px] border px-4 py-3 text-sm leading-6 ${
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
