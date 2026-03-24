import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { getProductCopy } from "@/lib/product-copy";
import { getRequestLocale } from "@/lib/request-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = getProductCopy(locale);

  return {
    title: copy.paymentsPage.cancelTitle,
    description: copy.paymentsPage.cancelDescription,
  };
}

export default async function PaymentsCancelPage() {
  const locale = await getRequestLocale();
  const copy = getProductCopy(locale);

  return (
    <div className="space-y-12 pb-12 pt-8">
      <section className="rounded-[3rem] border border-border bg-[linear-gradient(135deg,rgba(229,247,244,0.9),rgba(255,247,236,0.94),rgba(255,255,255,0.98))] px-7 py-10 shadow-[0_28px_80px_rgba(16,33,42,0.08)] sm:px-12 sm:py-16">
        <SectionHeading
          eyebrow={copy.paymentsPage.heroEyebrow}
          title={copy.paymentsPage.cancelTitle}
          description={copy.paymentsPage.cancelDescription}
        />
      </section>
      <div className="flex flex-wrap gap-4">
        <Link
          href="/payments"
          className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#2a8f95,#3ba8a5)] px-6 py-3.5 text-sm font-semibold text-accent-contrast shadow-[0_14px_30px_rgba(42,143,149,0.22)] transition hover:brightness-95"
        >
          {copy.paymentsPage.primaryCta}
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full border border-border bg-[rgba(255,255,255,0.86)] px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
        >
          {copy.paymentsPage.secondaryCta}
        </Link>
      </div>
    </div>
  );
}
