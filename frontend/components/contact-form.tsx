"use client";

import { type FormEvent, useState } from "react";

import { serviceInterestOptions } from "@/lib/marketing";

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
  eyebrow?: string;
  title?: string;
  description?: string;
  submitLabel?: string;
};

export function ContactForm({
  eyebrow = "Free security scan",
  title = "Request a free security scan or quote",
  description = "Tell Nourmed a little about your business, your website, and the type of support you need. We will review the request and recommend the right next step.",
  submitLabel = "Request My Free Scan",
}: ContactFormProps) {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [submissionState, setSubmissionState] = useState<SubmissionState>(initialSubmissionState);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState({
      status: "submitting",
      message: "Sending your request...",
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

      const payload = (await response.json().catch(() => null)) as
        | { data?: { message?: string }; error?: { message?: string } }
        | null;

      if (!response.ok) {
        setSubmissionState({
          status: "error",
          message: payload?.error?.message ?? "The request could not be sent. Please try again shortly.",
        });
        return;
      }

      setFormState(initialFormState);
      setSubmissionState({
        status: "success",
        message: payload?.data?.message ?? "Your request has been received.",
      });
    } catch {
      setSubmissionState({
        status: "error",
        message: "The request could not be sent. Please check your connection and try again.",
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
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
        <p className="max-w-2xl text-base leading-7 text-muted">{description}</p>
      </div>

      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
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
          <span className="text-sm font-medium text-foreground">Name</span>
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
          <span className="text-sm font-medium text-foreground">Business Name</span>
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
          <span className="text-sm font-medium text-foreground">Email</span>
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
          <span className="text-sm font-medium text-foreground">Website URL</span>
          <input
            type="text"
            name="websiteUrl"
            required
            maxLength={255}
            autoComplete="url"
            placeholder="https://yourbusiness.com"
            disabled={isSubmitting}
            value={formState.websiteUrl}
            onChange={(event) => updateField("websiteUrl", event.target.value)}
            className="w-full rounded-2xl border border-border bg-panel-strong px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-medium text-foreground">Service of Interest</span>
        <select
          name="serviceInterest"
          required
          disabled={isSubmitting}
          value={formState.serviceInterest}
          onChange={(event) => updateField("serviceInterest", event.target.value)}
          className="w-full rounded-2xl border border-border bg-panel-strong px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
        >
          <option value="" disabled>
            Select a service
          </option>
          {serviceInterestOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-foreground">Optional Message</span>
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
          {isSubmitting ? "Submitting..." : submitLabel}
        </button>
        <p className="text-sm leading-6 text-muted">
          Secure intake, server-side validation, and anti-spam controls are enabled on the backend.
        </p>
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
