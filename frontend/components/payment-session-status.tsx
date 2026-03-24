"use client";

import { useEffect, useState } from "react";

import { getProductCopy } from "@/lib/product-copy";
import type { Locale } from "@/lib/locale";

type PaymentSessionStatusProps = {
  locale: Locale;
  sessionId?: string;
};

type PaymentSession = {
  optionLabel: string;
  amountCents: number;
  currency: string;
  status: "CREATED" | "OPEN" | "COMPLETE" | "EXPIRED" | "FAILED";
  customerEmail: string | null;
};

const labels: Record<Locale, { service: string; amount: string; status: string }> = {
  en: { service: "Service", amount: "Amount", status: "Status" },
  fr: { service: "Service", amount: "Montant", status: "Statut" },
  es: { service: "Servicio", amount: "Importe", status: "Estado" },
  ar: { service: "الخدمة", amount: "المبلغ", status: "الحالة" },
};

export function PaymentSessionStatus({ locale, sessionId }: PaymentSessionStatusProps) {
  const copy = getProductCopy(locale);
  const localizedLabels = labels[locale];
  const [session, setSession] = useState<PaymentSession | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    let cancelled = false;

    async function loadSession() {
      try {
        const response = await fetch(`/api/payments/session/${sessionId}`);

        if (!response.ok) {
          throw new Error("Session fetch failed.");
        }

        const payload = (await response.json()) as { data: PaymentSession };

        if (!cancelled) {
          setSession(payload.data);
        }
      } catch {
        if (!cancelled) {
          setError(true);
        }
      }
    }

    void loadSession();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  if (!sessionId || error || !session) {
    return <p className="text-sm leading-7 text-muted">{copy.paymentsPage.successDescription}</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-[1.4rem] border border-border bg-panel-strong px-4 py-4">
        <p className="text-xs uppercase tracking-[0.24em] text-muted">{localizedLabels.service}</p>
        <p className="mt-2 text-sm font-medium text-foreground">{session.optionLabel}</p>
      </div>
      <div className="rounded-[1.4rem] border border-border bg-panel-strong px-4 py-4">
        <p className="text-xs uppercase tracking-[0.24em] text-muted">{localizedLabels.amount}</p>
        <p className="mt-2 text-sm font-medium text-foreground">
          {(session.amountCents / 100).toLocaleString(locale, {
            style: "currency",
            currency: session.currency.toUpperCase(),
          })}
        </p>
      </div>
      <div className="rounded-[1.4rem] border border-border bg-panel-strong px-4 py-4">
        <p className="text-xs uppercase tracking-[0.24em] text-muted">{localizedLabels.status}</p>
        <p className="mt-2 text-sm font-medium text-foreground">{session.status}</p>
      </div>
    </div>
  );
}
