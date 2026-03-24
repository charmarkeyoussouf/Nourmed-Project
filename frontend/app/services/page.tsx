import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { getMarketingCopy } from "@/lib/marketing";
import { getRequestLocale } from "@/lib/request-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = getMarketingCopy(locale);

  return {
    title: copy.meta.services.title,
    description: copy.meta.services.description,
    keywords: [...copy.meta.services.keywords],
    openGraph: {
      title: `${copy.meta.services.title} | Nourmed`,
      description: copy.meta.services.description,
      url: "/services",
    },
  };
}

export default async function ServicesPage() {
  const locale = await getRequestLocale();
  const copy = getMarketingCopy(locale);
  const page = copy.servicesPage;
  const shared = copy.shared;

  return (
    <div className="space-y-20 pb-10 pt-6">
      <section className="overflow-hidden rounded-[2.75rem] border border-border bg-[#12242b] px-6 py-8 text-[#eff2eb] shadow-[0_28px_80px_rgba(16,33,42,0.16)] sm:px-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#7dc2be]">{page.heroEyebrow}</p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{page.heroTitle}</h1>
              <p className="max-w-3xl text-base leading-8 text-[#cbd5d6] sm:text-lg">{page.heroDescription}</p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="#free-scan"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition hover:bg-[#184a52]"
              >
                {page.primaryCta}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.06)] px-6 py-3 text-sm font-semibold text-[#eff2eb] transition hover:border-[#7dc2be] hover:text-[#7dc2be]"
              >
                {page.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {shared.serviceOfferings.map((service) => (
              <article
                key={service.slug}
                className="rounded-[1.75rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] p-5 backdrop-blur"
              >
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[#7dc2be]">{service.price}</p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight">{service.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#cbd5d6]">{service.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow={page.principles.eyebrow}
          title={page.principles.title}
          description={page.principles.description}
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {page.principles.items.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-border bg-panel px-6 py-6 shadow-[0_18px_36px_rgba(16,33,42,0.05)]"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-border bg-panel px-6 py-8 shadow-[0_18px_36px_rgba(16,33,42,0.05)] sm:px-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow={page.process.eyebrow}
            title={page.process.title}
            description={page.process.description}
          />
          <div className="grid gap-4">
            {shared.processSteps.map((item) => (
              <article
                key={item.step}
                className="rounded-[1.5rem] border border-border bg-panel-strong p-5 shadow-[0_14px_26px_rgba(16,33,42,0.05)]"
              >
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-accent">{item.step}</p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-8" id="service-pricing">
        <SectionHeading eyebrow={page.pricing.eyebrow} title={page.pricing.title} description={page.pricing.description} />
        <div className="grid gap-6">
          {shared.serviceOfferings.map((service) => (
            <article
              key={service.slug}
              id={service.slug}
              className="grid gap-6 rounded-[2rem] border border-border bg-panel px-6 py-6 shadow-[0_18px_36px_rgba(16,33,42,0.05)] sm:px-8 sm:py-8 lg:grid-cols-[1.2fr_0.8fr]"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-accent">{service.price}</p>
                  <h2 className="text-3xl font-semibold tracking-tight text-foreground">{service.title}</h2>
                </div>
                <p className="text-base leading-8 text-muted">{service.description}</p>
                <ul className="grid gap-3 text-sm leading-7 text-muted">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="rounded-[1.25rem] border border-border bg-panel-strong px-4 py-3">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.75rem] border border-border bg-panel-strong p-6">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-accent">{page.pricing.boxEyebrow}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{service.price}</p>
                <p className="mt-4 text-sm leading-7 text-muted">{shared.pricingDisclaimer}</p>
                <Link
                  href="#free-scan"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-contrast transition hover:bg-[#184a52]"
                >
                  {page.pricing.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="text-sm leading-7 text-muted">{shared.pricingDisclaimer}</p>
      </section>

      <section
        id="free-scan"
        className="grid gap-6 rounded-[2.5rem] border border-border bg-[#12242b] px-6 py-8 text-[#eff2eb] shadow-[0_26px_80px_rgba(16,33,42,0.16)] sm:px-10 sm:py-12 lg:grid-cols-[0.85fr_1.15fr]"
      >
        <div className="space-y-6">
          <SectionHeading
            eyebrow={page.freeScan.eyebrow}
            title={page.freeScan.title}
            description={page.freeScan.description}
            tone="inverse"
          />
          <div className="grid gap-4">
            {page.freeScan.benefits.map((benefit) => (
              <article
                key={benefit}
                className="rounded-[1.5rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] px-5 py-4 text-sm leading-7 text-[#cbd5d6]"
              >
                {benefit}
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[rgba(255,255,255,0.12)] bg-[#eff2eb] px-6 py-6 text-foreground shadow-[0_22px_45px_rgba(0,0,0,0.18)] sm:px-8 sm:py-8">
          <ContactForm
            locale={locale}
            eyebrow={page.freeScan.formEyebrow}
            title={page.freeScan.formTitle}
            description={page.freeScan.formDescription}
          />
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading eyebrow={page.trust.eyebrow} title={page.trust.title} description={page.trust.description} />
        <div className="grid gap-5 lg:grid-cols-3">
          {page.trust.items.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-border bg-panel px-6 py-6 shadow-[0_18px_36px_rgba(16,33,42,0.05)]"
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
