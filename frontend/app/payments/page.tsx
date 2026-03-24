import type { Metadata } from "next";
import Link from "next/link";

import { PaymentCheckoutForm } from "@/components/payment-checkout-form";
import { SectionHeading } from "@/components/section-heading";
import { getProductCopy } from "@/lib/product-copy";
import { getRequestLocale } from "@/lib/request-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = getProductCopy(locale);

  return {
    title: copy.paymentsMeta.title,
    description: copy.paymentsMeta.description,
    keywords: [...copy.paymentsMeta.keywords],
    openGraph: {
      title: `${copy.paymentsMeta.title} | Nourmed`,
      description: copy.paymentsMeta.description,
      url: "/payments",
    },
  };
}

export default async function PaymentsPage() {
  const locale = await getRequestLocale();
  const copy = getProductCopy(locale);
  const page = copy.paymentsPage;

  return (
    <div className="space-y-24 pb-12 pt-8">
      <section className="rounded-[3rem] border border-[rgba(206,223,217,0.96)] bg-[linear-gradient(135deg,rgba(229,247,244,0.9),rgba(255,247,236,0.94),rgba(255,255,255,0.98))] px-7 py-10 shadow-[0_28px_80px_rgba(16,33,42,0.08)] sm:px-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <SectionHeading eyebrow={page.heroEyebrow} title={page.heroTitle} description={page.heroDescription} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="#payment-options"
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#2a8f95,#3ba8a5)] px-6 py-3.5 text-sm font-semibold text-accent-contrast shadow-[0_14px_30px_rgba(42,143,149,0.22)] transition hover:brightness-95"
            >
              {page.primaryCta}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-border bg-[rgba(255,255,255,0.85)] px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
            >
              {page.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeading
          eyebrow={page.useCasesEyebrow}
          title={page.useCasesTitle}
          description={page.useCasesDescription}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {page.useCases.map((item, index) => (
            <article
              key={item.title}
              className={`rounded-[2rem] border border-border p-7 shadow-[0_18px_36px_rgba(16,33,42,0.05)] ${
                index === 1
                  ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,245,228,0.9))]"
                  : "bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(239,248,247,0.92))]"
              }`}
            >
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="payment-options" className="space-y-10">
        <SectionHeading eyebrow={page.optionsEyebrow} title={page.optionsTitle} description={page.optionsDescription} />
        <PaymentCheckoutForm locale={locale} />
      </section>

      <section className="grid gap-8 rounded-[3rem] border border-border bg-[linear-gradient(140deg,rgba(255,255,255,0.96),rgba(228,247,244,0.86),rgba(255,246,230,0.9))] px-7 py-10 shadow-[0_24px_70px_rgba(16,33,42,0.08)] sm:px-12 sm:py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading eyebrow={page.faqEyebrow} title={page.faqTitle} description={page.faqDescription} />
        <div className="grid gap-5">
          {page.faq.map((item) => (
            <article key={item.question} className="rounded-[1.7rem] border border-border bg-[rgba(255,255,255,0.86)] p-6">
              <h2 className="text-lg font-semibold text-foreground">{item.question}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{item.answer}</p>
            </article>
          ))}
        </div>
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
