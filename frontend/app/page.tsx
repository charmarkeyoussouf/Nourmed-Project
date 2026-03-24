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
    title: copy.meta.home.title,
    description: copy.meta.home.description,
    keywords: [...copy.meta.home.keywords],
    openGraph: {
      title: `${copy.meta.home.title} | Nourmed`,
      description: copy.meta.home.description,
      url: "/",
    },
  };
}

export default async function HomePage() {
  const locale = await getRequestLocale();
  const copy = getMarketingCopy(locale);
  const home = copy.home;
  const shared = copy.shared;

  return (
    <div className="space-y-32 pb-12 pt-8">
      <section className="overflow-hidden rounded-[3rem] border border-border bg-[#12242b] px-7 py-10 text-[#eff2eb] shadow-[0_32px_90px_rgba(16,33,42,0.18)] sm:px-12 sm:py-16">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-10">
            <div className="space-y-5">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#7dc2be]">{home.heroEyebrow}</p>
              <h1 className="max-w-5xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-[4.35rem]">
                {home.heroTitle}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[#cbd5d6] sm:text-lg sm:leading-9">{home.heroDescription}</p>
            </div>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:flex-wrap">
              <Link
                href="#free-scan"
                className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-contrast shadow-[0_18px_40px_rgba(30,90,96,0.28)] transition hover:bg-[#184a52]"
              >
                {home.primaryCta}
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.06)] px-7 py-3.5 text-sm font-semibold text-[#eff2eb] transition hover:border-[#7dc2be] hover:text-[#7dc2be]"
              >
                {home.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="rounded-[2.35rem] border border-[rgba(255,255,255,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.2)]">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[#7dc2be]">{home.heroPanelEyebrow}</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">{home.heroPanelTitle}</h2>
            <div className="mt-7 grid gap-4">
              {home.heroHighlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-[1.35rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] px-5 py-4 text-sm leading-7 text-[#d3dada]"
                >
                  {highlight}
                </div>
              ))}
            </div>
            <div className="mt-7 rounded-[1.35rem] border border-[rgba(125,194,190,0.28)] bg-[rgba(125,194,190,0.08)] px-5 py-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#7dc2be]">{home.heroScanEyebrow}</p>
              <p className="mt-2 text-sm leading-7 text-[#d3dada]">{home.heroScanDescription}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeading
          eyebrow={home.whatWeDo.eyebrow}
          title={home.whatWeDo.title}
          description={home.whatWeDo.description}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {home.whatWeDo.items.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-border bg-panel px-7 py-7 shadow-[0_18px_36px_rgba(16,33,42,0.05)]"
            >
              <h2 className="text-xl font-semibold tracking-tight text-foreground">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[3rem] border border-border bg-[#12242b] px-7 py-10 text-[#eff2eb] shadow-[0_28px_80px_rgba(16,33,42,0.16)] sm:px-12 sm:py-14">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <SectionHeading
            eyebrow={home.howWeDoIt.eyebrow}
            title={home.howWeDoIt.title}
            description={home.howWeDoIt.description}
            tone="inverse"
          />
          <div className="grid gap-5">
            {shared.processSteps.map((item) => (
              <article
                key={item.step}
                className="rounded-[1.85rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] p-6 backdrop-blur"
              >
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[#7dc2be]">{item.step}</p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#cbd5d6]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeading
          eyebrow={home.services.eyebrow}
          title={home.services.title}
          description={home.services.description}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {shared.serviceOfferings.map((service) => (
            <article
              key={service.slug}
              className="flex h-full flex-col rounded-[2rem] border border-border bg-panel px-7 py-7 shadow-[0_18px_36px_rgba(16,33,42,0.05)]"
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-accent">{service.price}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{service.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{service.summary}</p>
              <p className="mt-4 text-xs leading-6 text-muted">{shared.pricingDisclaimer}</p>
              <Link
                href={`/services#${service.slug}`}
                className="mt-6 inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
              >
                {home.services.cardCta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        id="free-scan"
        className="grid gap-8 rounded-[3rem] border border-border bg-panel px-7 py-10 shadow-[0_18px_36px_rgba(16,33,42,0.05)] sm:px-12 sm:py-14 lg:grid-cols-[0.82fr_1.18fr]"
      >
        <div className="space-y-6">
          <SectionHeading
            eyebrow={home.freeScan.eyebrow}
            title={home.freeScan.title}
            description={home.freeScan.description}
          />
          <div className="grid gap-5">
            {home.freeScan.benefits.map((benefit) => (
              <article
                key={benefit}
                className="rounded-[1.7rem] border border-border bg-panel-strong px-5 py-5 text-sm leading-7 text-muted"
              >
                {benefit}
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[2.35rem] border border-border bg-panel-strong px-7 py-7 shadow-[0_18px_36px_rgba(16,33,42,0.05)] sm:px-9 sm:py-9">
          <ContactForm
            locale={locale}
            eyebrow={home.freeScan.formEyebrow}
            title={home.freeScan.formTitle}
            description={home.freeScan.formDescription}
          />
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeading eyebrow={home.trust.eyebrow} title={home.trust.title} description={home.trust.description} />
        <div className="grid gap-6 lg:grid-cols-3">
          {home.trust.items.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-border bg-panel px-7 py-7 shadow-[0_18px_36px_rgba(16,33,42,0.05)]"
            >
              <h2 className="text-xl font-semibold tracking-tight text-foreground">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
