"use client";

import { type FormEvent, useMemo, useState } from "react";

import { getProductCopy } from "@/lib/product-copy";
import type { Locale } from "@/lib/locale";

type PaymentCheckoutFormProps = {
  locale: Locale;
};

type SubmissionState = {
  status: "idle" | "submitting" | "error";
  message: string;
};

type FormState = {
  customerName: string;
  businessName: string;
  customerEmail: string;
  notes: string;
};

const initialFormState: FormState = {
  customerName: "",
  businessName: "",
  customerEmail: "",
  notes: "",
};

export function PaymentCheckoutForm({ locale }: PaymentCheckoutFormProps) {
  const copy = getProductCopy(locale);
  const formCopy = copy.paymentsForm;
  const checkoutOptions = useMemo(
    () => copy.paymentsPage.options.filter((option) => option.mode === "checkout"),
    [copy.paymentsPage.options],
  );
  const [selectedOptionKey, setSelectedOptionKey] = useState<string | null>(checkoutOptions[0]?.key ?? null);
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [submissionState, setSubmissionState] = useState<SubmissionState>({ status: "idle", message: "" });

  const selectedOption = checkoutOptions.find((option) => option.key === selectedOptionKey) ?? null;
  const isSubmitting = submissionState.status === "submitting";

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedOption) {
      setSubmissionState({
        status: "error",
        message: formCopy.emptyState,
      });
      return;
    }

    setSubmissionState({
      status: "submitting",
      message: formCopy.messages.redirecting,
    });

    try {
      const response = await fetch("/api/payments/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({
          optionKey: selectedOption.key,
          customerName: formState.customerName,
          businessName: formState.businessName,
          customerEmail: formState.customerEmail,
          notes: formState.notes,
        }),
      });

      if (!response.ok) {
        throw new Error("Checkout creation failed.");
      }

      const payload = (await response.json()) as {
        data?: {
          checkoutUrl?: string;
        };
      };

      if (!payload.data?.checkoutUrl) {
        throw new Error("Missing checkout URL.");
      }

      window.location.assign(payload.data.checkoutUrl);
    } catch {
      setSubmissionState({
        status: "error",
        message: formCopy.messages.error,
      });
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-4">
        {checkoutOptions.map((option) => {
          const isSelected = option.key === selectedOptionKey;

          return (
            <button
              key={option.key}
              type="button"
              onClick={() => setSelectedOptionKey(option.key)}
              className={`flex w-full flex-col rounded-[1.8rem] border px-5 py-5 text-left transition ${
                isSelected
                  ? "border-accent bg-[rgba(42,143,149,0.1)] shadow-[0_16px_30px_rgba(42,143,149,0.12)]"
                  : "border-border bg-[rgba(255,255,255,0.8)] hover:border-accent/60"
              }`}
            >
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-accent">{option.price}</span>
              <span className="mt-2 text-lg font-semibold text-foreground">{option.label}</span>
              <span className="mt-2 text-sm leading-7 text-muted">{option.description}</span>
            </button>
          );
        })}
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-[2rem] border border-border bg-[rgba(255,255,255,0.9)] p-7 shadow-[0_18px_36px_rgba(16,33,42,0.08)]"
      >
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">{copy.paymentsPage.formEyebrow}</p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">{copy.paymentsPage.formTitle}</h2>
          <p className="text-sm leading-7 text-muted">{copy.paymentsPage.formDescription}</p>
          {selectedOption ? (
            <div className="rounded-[1.4rem] border border-border bg-accent-soft/70 px-4 py-4 text-sm text-foreground">
              <span className="font-semibold">{selectedOption.label}</span>
              <span className="ml-2 text-muted">{selectedOption.price}</span>
            </div>
          ) : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">{formCopy.customerName}</span>
            <input
              type="text"
              required
              maxLength={120}
              value={formState.customerName}
              onChange={(event) => updateField("customerName", event.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-[1.2rem] border border-border bg-panel-strong px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">{formCopy.businessName}</span>
            <input
              type="text"
              maxLength={120}
              value={formState.businessName}
              onChange={(event) => updateField("businessName", event.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-[1.2rem] border border-border bg-panel-strong px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
            />
          </label>
        </div>

        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">{formCopy.customerEmail}</span>
          <input
            type="email"
            required
            maxLength={254}
            value={formState.customerEmail}
            onChange={(event) => updateField("customerEmail", event.target.value)}
            disabled={isSubmitting}
            className="w-full rounded-[1.2rem] border border-border bg-panel-strong px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">{formCopy.notes}</span>
          <textarea
            rows={5}
            maxLength={1200}
            value={formState.notes}
            onChange={(event) => updateField("notes", event.target.value)}
            disabled={isSubmitting}
            className="w-full rounded-[1.4rem] border border-border bg-panel-strong px-4 py-3 text-sm leading-7 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#2a8f95,#3ba8a5)] px-6 py-3.5 text-sm font-semibold text-accent-contrast shadow-[0_14px_30px_rgba(42,143,149,0.22)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? formCopy.submittingLabel : formCopy.submitLabel}
        </button>

        <p className="text-sm leading-7 text-muted">{formCopy.secureNote}</p>

        {submissionState.status !== "idle" ? (
          <div className="rounded-[1.3rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
            {submissionState.message}
          </div>
        ) : null}
      </form>
    </div>
  );
}
