"use client";

import { type FormEvent, useMemo, useRef, useState } from "react";

import Link from "next/link";

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

type CheckoutResponse = {
  data?: {
    checkoutUrl?: string;
  };
  error?: {
    message?: string;
  };
};

const initialFormState: FormState = {
  customerName: "",
  businessName: "",
  customerEmail: "",
  notes: "",
};

const checkoutCopy: Record<
  Locale,
  {
    selected: string;
    chooseDeposit: string;
    selectedDeposit: string;
    selectToContinue: string;
  }
> = {
  en: {
    selected: "Selected",
    chooseDeposit: "Choose a deposit",
    selectedDeposit: "Selected deposit",
    selectToContinue: "Choose one of the fixed deposit options below, then complete the form to continue to Stripe Checkout.",
  },
  fr: {
    selected: "Sélectionné",
    chooseDeposit: "Choisissez un acompte",
    selectedDeposit: "Acompte sélectionné",
    selectToContinue: "Choisissez l’un des acomptes fixes ci-dessous puis complétez le formulaire pour continuer vers Stripe Checkout.",
  },
  es: {
    selected: "Seleccionado",
    chooseDeposit: "Elija un depósito",
    selectedDeposit: "Depósito seleccionado",
    selectToContinue: "Elija uno de los depósitos fijos y complete el formulario para continuar a Stripe Checkout.",
  },
  ar: {
    selected: "محدد",
    chooseDeposit: "اختر عربونًا",
    selectedDeposit: "العربون المحدد",
    selectToContinue: "اختر أحد العربونات الثابتة أدناه ثم أكمل النموذج للمتابعة إلى Stripe Checkout.",
  },
};

function getErrorMessage(payload: CheckoutResponse | null, fallbackMessage: string) {
  const apiMessage = payload?.error?.message?.trim();
  return apiMessage && apiMessage.length > 0 ? apiMessage : fallbackMessage;
}

export function PaymentCheckoutForm({ locale }: PaymentCheckoutFormProps) {
  const copy = getProductCopy(locale);
  const pageCopy = copy.paymentsPage;
  const formCopy = copy.paymentsForm;
  const localCopy = checkoutCopy[locale];
  const formSectionRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const allOptions = pageCopy.options;
  const checkoutOptions = useMemo(
    () => allOptions.filter((option) => option.mode === "checkout"),
    [allOptions],
  );

  const [selectedOptionKey, setSelectedOptionKey] = useState<string | null>(checkoutOptions[0]?.key ?? null);
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    status: "idle",
    message: "",
  });

  const selectedOption = checkoutOptions.find((option) => option.key === selectedOptionKey) ?? null;
  const isSubmitting = submissionState.status === "submitting";

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function focusCheckoutForm() {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      firstInputRef.current?.focus();
    }, 150);
  }

  function selectOption(optionKey: string) {
    setSelectedOptionKey(optionKey);
    setSubmissionState({
      status: "idle",
      message: "",
    });
    focusCheckoutForm();
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

      const payload = ((await response.json().catch(() => null)) as CheckoutResponse | null) ?? null;

      if (!response.ok) {
        setSubmissionState({
          status: "error",
          message: getErrorMessage(payload, formCopy.messages.error),
        });
        return;
      }

      if (!payload?.data?.checkoutUrl) {
        setSubmissionState({
          status: "error",
          message: formCopy.messages.error,
        });
        return;
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
    <div className="space-y-10">
      <div className="grid gap-6 lg:grid-cols-5">
        {allOptions.map((option) => {
          const isCheckoutOption = option.mode === "checkout";
          const isSelected = selectedOption?.key === option.key;

          return (
            <article
              key={option.key}
              className={`flex h-full flex-col rounded-[2rem] border px-6 py-6 shadow-[0_18px_36px_rgba(16,33,42,0.05)] transition ${
                isSelected
                  ? "border-accent bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(222,243,241,0.92))]"
                  : "border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(239,248,247,0.9))]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-accent">{option.price}</p>
                {isSelected ? (
                  <span className="rounded-full bg-accent px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-accent-contrast">
                    {localCopy.selected}
                  </span>
                ) : null}
              </div>

              <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{option.label}</h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted">{option.description}</p>

              {isCheckoutOption ? (
                <button
                  type="button"
                  onClick={() => selectOption(option.key)}
                  disabled={isSubmitting}
                  className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${
                    isSelected
                      ? "bg-[linear-gradient(135deg,#2a8f95,#3ba8a5)] text-accent-contrast shadow-[0_14px_30px_rgba(42,143,149,0.22)] hover:brightness-95"
                      : "border border-border bg-[rgba(255,255,255,0.85)] text-foreground hover:border-accent hover:text-accent"
                  }`}
                >
                  {option.cta}
                </button>
              ) : option.href ? (
                <Link
                  href={option.href}
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-border bg-[rgba(255,255,255,0.85)] px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
                >
                  {option.cta}
                </Link>
              ) : null}
            </article>
          );
        })}
      </div>

      <p className="text-sm leading-7 text-muted">{pageCopy.pricingNote}</p>

      <div
        id="checkout-form"
        ref={formSectionRef}
        className="grid gap-8 rounded-[2.4rem] border border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(247,251,248,0.96))] p-7 shadow-[0_18px_36px_rgba(16,33,42,0.08)] lg:grid-cols-[0.82fr_1.18fr]"
      >
        <div className="space-y-5">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">{pageCopy.formEyebrow}</p>
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{pageCopy.formTitle}</h2>
            <p className="text-sm leading-7 text-muted">{pageCopy.formDescription}</p>
          </div>

          {selectedOption ? (
            <div className="rounded-[1.6rem] border border-accent/20 bg-accent-soft/70 px-5 py-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-accent">{localCopy.selectedDeposit}</p>
              <h3 className="mt-3 text-xl font-semibold text-foreground">{selectedOption.label}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{selectedOption.description}</p>
              <p className="mt-4 font-mono text-[0.72rem] uppercase tracking-[0.24em] text-accent">{selectedOption.price}</p>
            </div>
          ) : (
            <div className="rounded-[1.6rem] border border-dashed border-border bg-[rgba(255,255,255,0.76)] px-5 py-5">
              <h3 className="text-lg font-semibold text-foreground">{localCopy.chooseDeposit}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{localCopy.selectToContinue}</p>
            </div>
          )}

          <p className="text-sm leading-7 text-muted">{formCopy.secureNote}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">{formCopy.customerName}</span>
              <input
                ref={firstInputRef}
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
            disabled={isSubmitting || !selectedOption}
            className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#2a8f95,#3ba8a5)] px-6 py-3.5 text-sm font-semibold text-accent-contrast shadow-[0_14px_30px_rgba(42,143,149,0.22)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? formCopy.submittingLabel : formCopy.submitLabel}
          </button>

          {submissionState.status !== "idle" ? (
            <div
              aria-live="polite"
              className={`rounded-[1.3rem] border px-4 py-3 text-sm ${
                submissionState.status === "error"
                  ? "border-rose-200 bg-rose-50 text-rose-800"
                  : "border-border bg-panel-strong text-muted"
              }`}
            >
              {submissionState.message}
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
