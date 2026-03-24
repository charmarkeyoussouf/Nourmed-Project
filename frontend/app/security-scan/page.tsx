import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { SecurityScanForm } from "@/components/security-scan-form";
import { getProductCopy } from "@/lib/product-copy";
import { getRequestLocale } from "@/lib/request-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = getProductCopy(locale);

  return {
    title: copy.scanMeta.title,
    description: copy.scanMeta.description,
    keywords: [...copy.scanMeta.keywords],
    openGraph: {
      title: `${copy.scanMeta.title} | Nourmed`,
      description: copy.scanMeta.description,
      url: "/security-scan",
    },
  };
}

export default async function SecurityScanPage() {
  const locale = await getRequestLocale();
  const copy = getProductCopy(locale);
  const page = copy.scanPage;

  return (
    <div className="space-y-24 pb-12 pt-8">
      <section className="rounded-[3rem] border border-border bg-[linear-gradient(135deg,rgba(229,247,244,0.9),rgba(255,247,236,0.94),rgba(255,255,255,0.98))] px-7 py-10 shadow-[0_28px_80px_rgba(16,33,42,0.08)] sm:px-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <SectionHeading eyebrow={page.heroEyebrow} title={page.heroTitle} description={page.heroDescription} />
          <div className="rounded-[2rem] border border-[rgba(215,161,88,0.35)] bg-[rgba(255,248,236,0.86)] p-6 shadow-[0_14px_30px_rgba(16,33,42,0.06)]">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-accent">{page.guardrailTitle}</p>
            <p className="mt-3 text-sm leading-7 text-muted">{page.guardrailBody}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="#scan-console"
                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#2a8f95,#3ba8a5)] px-5 py-3 text-sm font-semibold text-accent-contrast shadow-[0_14px_30px_rgba(42,143,149,0.22)] transition hover:brightness-95"
              >
                {page.primaryCta}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-border bg-[rgba(255,255,255,0.86)] px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
              >
                {page.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeading
          eyebrow={page.capabilitiesEyebrow}
          title={page.capabilitiesTitle}
          description={page.capabilitiesDescription}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {page.capabilities.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(239,248,247,0.92))] px-7 py-7 shadow-[0_18px_36px_rgba(16,33,42,0.05)]"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[3rem] border border-border bg-[linear-gradient(140deg,rgba(255,255,255,0.96),rgba(228,247,244,0.88),rgba(255,246,230,0.9))] px-7 py-10 shadow-[0_24px_70px_rgba(16,33,42,0.08)] sm:px-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow={page.processEyebrow} title={page.processTitle} description={page.processDescription} />
          <div className="grid gap-5">
            {page.processSteps.map((step) => (
              <article key={step.step} className="rounded-[1.7rem] border border-border bg-[rgba(255,255,255,0.86)] p-6">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-accent">{step.step}</p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{step.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="scan-console" className="space-y-10">
        <SecurityScanForm locale={locale} />
      </section>

      <section className="space-y-10">
        <SectionHeading eyebrow={page.trustEyebrow} title={page.trustTitle} description={page.trustDescription} />
        <div className="grid gap-6 lg:grid-cols-3">
          {page.trustItems.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(239,248,247,0.92))] px-7 py-7 shadow-[0_18px_36px_rgba(16,33,42,0.05)]"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
