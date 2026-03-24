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
    <div className="space-y-28 pb-12 pt-8">
      <section className="overflow-hidden rounded-[3rem] border border-border bg-[#12242b] px-7 py-10 text-[#eff2eb] shadow-[0_30px_88px_rgba(16,33,42,0.18)] sm:px-12 sm:py-16">
        <div className="grid gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
          <div className="space-y-10">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#7dc2be]">{page.heroEyebrow}</p>
              <h1 className="max-w-5xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-[4.2rem]">{page.heroTitle}</h1>
              <p className="max-w-3xl text-base leading-8 text-[#cbd5d6] sm:text-lg sm:leading-9">{page.heroDescription}</p>
            </div>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:flex-wrap">
              <Link
                href="#free-scan"
                className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-contrast shadow-[0_18px_40px_rgba(30,90,96,0.28)] transition hover:bg-[#184a52]"
              >
                {page.primaryCta}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.06)] px-7 py-3.5 text-sm font-semibold text-[#eff2eb] transition hover:border-[#7dc2be] hover:text-[#7dc2be]"
              >
                {page.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="grid gap-5">
            {shared.serviceOfferings.map((service) => (
              <article
                key={service.slug}
                className="rounded-[1.9rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] p-6 backdrop-blur"
              >
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[#7dc2be]">{service.price}</p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight">{service.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#cbd5d6]">{service.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeading
          eyebrow={page.principles.eyebrow}
          title={page.principles.title}
          description={page.principles.description}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {page.principles.items.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-border bg-panel px-7 py-7 shadow-[0_18px_36px_rgba(16,33,42,0.05)]"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[3rem] border border-border bg-panel px-7 py-10 shadow-[0_18px_36px_rgba(16,33,42,0.05)] sm:px-12 sm:py-14">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <SectionHeading
            eyebrow={page.process.eyebrow}
            title={page.process.title}
            description={page.process.description}
          />
          <div className="grid gap-5">
            {shared.processSteps.map((item) => (
              <article
                key={item.step}
                className="rounded-[1.85rem] border border-border bg-panel-strong p-6 shadow-[0_14px_26px_rgba(16,33,42,0.05)]"
              >
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-accent">{item.step}</p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-10" id="service-pricing">
        <SectionHeading eyebrow={page.pricing.eyebrow} title={page.pricing.title} description={page.pricing.description} />
        <div className="grid gap-7">
          {shared.serviceOfferings.map((service) => (
            <article
              key={service.slug}
              id={service.slug}
              className="grid gap-7 rounded-[2.25rem] border border-border bg-panel px-7 py-7 shadow-[0_18px_36px_rgba(16,33,42,0.05)] sm:px-9 sm:py-9 lg:grid-cols-[1.18fr_0.82fr]"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-accent">{service.price}</p>
                  <h2 className="text-3xl font-semibold tracking-tight text-foreground">{service.title}</h2>
                </div>
                <p className="text-base leading-8 text-muted">{service.description}</p>
                <ul className="grid gap-4 text-sm leading-7 text-muted">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="rounded-[1.4rem] border border-border bg-panel-strong px-5 py-4">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.9rem] border border-border bg-panel-strong p-7">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-accent">{page.pricing.boxEyebrow}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{service.price}</p>
                <p className="mt-4 text-sm leading-7 text-muted">{shared.pricingDisclaimer}</p>
                <Link
                  href="#free-scan"
                  className="mt-7 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-contrast shadow-[0_14px_30px_rgba(30,90,96,0.22)] transition hover:bg-[#184a52]"
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
        className="grid gap-8 rounded-[3rem] border border-border bg-[#12242b] px-7 py-10 text-[#eff2eb] shadow-[0_26px_80px_rgba(16,33,42,0.16)] sm:px-12 sm:py-14 lg:grid-cols-[0.82fr_1.18fr]"
      >
        <div className="space-y-6">
          <SectionHeading
            eyebrow={page.freeScan.eyebrow}
            title={page.freeScan.title}
            description={page.freeScan.description}
            tone="inverse"
          />
          <div className="grid gap-5">
            {page.freeScan.benefits.map((benefit) => (
              <article
                key={benefit}
                className="rounded-[1.7rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] px-5 py-5 text-sm leading-7 text-[#cbd5d6]"
              >
                {benefit}
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[2.35rem] border border-[rgba(255,255,255,0.12)] bg-[#eff2eb] px-7 py-7 text-foreground shadow-[0_22px_45px_rgba(0,0,0,0.18)] sm:px-9 sm:py-9">
          <ContactForm
            locale={locale}
            eyebrow={page.freeScan.formEyebrow}
            title={page.freeScan.formTitle}
            description={page.freeScan.formDescription}
          />
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeading eyebrow={page.trust.eyebrow} title={page.trust.title} description={page.trust.description} />
        <div className="grid gap-6 lg:grid-cols-3">
          {page.trust.items.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-border bg-panel px-7 py-7 shadow-[0_18px_36px_rgba(16,33,42,0.05)]"
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
