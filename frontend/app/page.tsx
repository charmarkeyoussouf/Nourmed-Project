import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";

import { ContactForm } from "@/components/contact-form";
import { getMarketingCopy } from "@/lib/marketing";
import { getRequestLocale } from "@/lib/request-locale";

const stats = [
  { value: "30%", label: "Average Cost Reduction" },
  { value: "2x", label: "Faster Vendor Onboarding" },
  { value: "100+", label: "Clients Supported" },
  { value: "15+", label: "Industries Served" },
] as const;

const heroNodes: ReadonlyArray<{ label: string; position: CSSProperties }> = [
  { label: "Procurement", position: { top: "6%", left: "8%" } },
  { label: "Inventory", position: { top: "6%", right: "7%" } },
  { label: "Vendors", position: { top: "41%", left: "1%" } },
  { label: "Logistics", position: { top: "41%", right: "1%" } },
  { label: "Compliance", position: { bottom: "8%", left: "8%" } },
  { label: "Risk", position: { bottom: "8%", right: "7%" } },
];

const trustAccents = ["Operational", "Right-sized", "Clear"] as const;

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
    <div className="space-y-0 pb-16 pt-6 sm:pt-8">
      <section className="relative grid min-h-[42rem] items-center gap-14 py-12 lg:min-h-[48rem] lg:grid-cols-[1fr_0.96fr] lg:gap-20 lg:py-20">
        <div className="pointer-events-none absolute inset-y-0 right-[-6%] hidden w-[48vw] bg-[radial-gradient(ellipse_at_center,rgba(106,158,122,0.12),rgba(214,232,220,0.24)_42%,transparent_74%)] lg:block" />

        <div className="relative max-w-2xl space-y-8">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[color:var(--color-gold)]" />
              <p className="font-mono text-[0.74rem] uppercase tracking-[0.22em] text-[color:var(--color-gold)]">{home.heroEyebrow}</p>
            </div>
            <h1
              className="max-w-4xl font-display text-[clamp(3.35rem,8vw,5.65rem)] font-light leading-[0.96] text-accent"
              dangerouslySetInnerHTML={{ __html: home.heroTitle }}
            />
            <p className="max-w-xl text-base leading-8 text-muted sm:text-[1.04rem] sm:leading-9">{home.heroDescription}</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-[2px] bg-accent px-7 py-3.5 text-[0.82rem] font-medium uppercase tracking-[0.1em] text-accent-contrast transition hover:bg-[#2a5238]"
            >
              {home.primaryCta}
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center justify-center rounded-[2px] border border-accent px-7 py-3.5 text-[0.82rem] font-medium uppercase tracking-[0.1em] text-accent transition hover:bg-accent hover:text-accent-contrast"
            >
              {home.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="relative hidden lg:flex lg:items-center lg:justify-center">
          <div className="relative aspect-square w-full max-w-[31rem]">
            <svg
              className="absolute inset-0 h-full w-full text-[rgba(61,110,82,0.22)]"
              viewBox="0 0 480 480"
              aria-hidden="true"
            >
              <line x1="115" y1="60" x2="240" y2="240" stroke="currentColor" strokeDasharray="4 4" />
              <line x1="370" y1="60" x2="240" y2="240" stroke="currentColor" strokeDasharray="4 4" />
              <line x1="40" y1="230" x2="240" y2="240" stroke="currentColor" strokeDasharray="4 4" />
              <line x1="440" y1="230" x2="240" y2="240" stroke="currentColor" strokeDasharray="4 4" />
              <line x1="115" y1="420" x2="240" y2="240" stroke="currentColor" strokeDasharray="4 4" />
              <line x1="370" y1="420" x2="240" y2="240" stroke="currentColor" strokeDasharray="4 4" />
            </svg>

            <div className="absolute left-1/2 top-1/2 rounded-[6px] bg-accent px-8 py-5 font-display text-xl font-semibold tracking-[0.04em] text-accent-contrast shadow-[0_12px_36px_rgba(28,58,40,0.24)] [transform:translate(-50%,-50%)]">
              Nourmed
            </div>

            {heroNodes.map((node) => (
              <div
                key={node.label}
                className="absolute rounded-[6px] border border-[rgba(61,110,82,0.28)] bg-[rgba(255,255,255,0.94)] px-5 py-4 text-[0.8rem] font-medium text-accent shadow-[0_8px_24px_rgba(28,58,40,0.08)]"
                style={node.position}
              >
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-gold)] align-middle" />
                {node.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent px-6 py-8 text-accent-contrast sm:px-8 lg:px-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className="text-center lg:border-r lg:border-white/12 last:lg:border-r-0">
              <p className="font-display text-5xl font-semibold leading-none text-white">{stat.value}</p>
              <p className="mt-3 text-[0.76rem] uppercase tracking-[0.16em] text-white/55">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="bg-panel px-6 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <div className="max-w-xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[color:var(--color-gold)]" />
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-gold)]">{home.whatWeDo.eyebrow}</p>
            </div>
            <h2 className="font-display text-4xl font-normal leading-[1.08] text-accent sm:text-5xl">{home.whatWeDo.title}</h2>
            <p className="text-base leading-8 text-muted">{home.whatWeDo.description}</p>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-[2px] bg-accent px-7 py-3.5 text-[0.82rem] font-medium uppercase tracking-[0.1em] text-accent-contrast transition hover:bg-[#2a5238]"
            >
              {home.primaryCta}
            </Link>
          </div>

          <div className="space-y-5">
            {home.whatWeDo.items.map((item) => (
              <article
                key={item.title}
                className="rounded-r-[4px] rounded-tl-[2px] rounded-bl-[2px] border-l-[3px] border-[#6a9e7a] bg-[rgba(255,255,255,0.9)] px-6 py-6 shadow-[0_4px_20px_rgba(28,58,40,0.06)] transition hover:border-[color:var(--color-gold)]"
              >
                <h3 className="font-display text-[1.45rem] font-semibold leading-tight text-accent">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="px-6 py-20 sm:px-8 lg:px-10">
        <div className="max-w-4xl space-y-5">
          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-[color:var(--color-gold)]" />
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-gold)]">{home.howWeDoIt.eyebrow}</p>
          </div>
          <h2 className="font-display text-4xl font-normal leading-[1.08] text-accent sm:text-5xl">{home.howWeDoIt.title}</h2>
          <p className="max-w-3xl text-base leading-8 text-muted">{home.howWeDoIt.description}</p>
        </div>

        <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-12 right-12 top-6 hidden h-px bg-[linear-gradient(to_right,#6a9e7a,transparent)] lg:block" />
          {shared.processSteps.map((item) => (
            <article key={item.step} className="relative">
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-accent font-display text-lg font-semibold text-accent-contrast">
                {item.step}
              </div>
              <h3 className="mt-5 font-display text-[1.45rem] font-semibold text-accent">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="bg-[#d6e8dc] px-6 py-20 sm:px-8 lg:px-10">
        <div className="max-w-4xl space-y-5">
          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-[color:var(--color-gold)]" />
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-gold)]">{home.services.eyebrow}</p>
          </div>
          <h2 className="font-display text-4xl font-normal leading-[1.08] text-accent sm:text-5xl">{home.services.title}</h2>
          <p className="max-w-3xl text-base leading-8 text-muted">{home.services.description}</p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {shared.serviceOfferings.map((service) => (
            <article
              key={service.slug}
              className="group flex h-full flex-col rounded-[4px] bg-[rgba(255,255,255,0.96)] px-8 py-8 shadow-[0_6px_24px_rgba(28,58,40,0.08)] transition hover:-translate-y-1.5 hover:shadow-[0_14px_36px_rgba(28,58,40,0.12)]"
            >
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[color:var(--color-gold)]">{service.price}</p>
              <h3 className="mt-4 font-display text-[1.95rem] font-semibold leading-tight text-accent">{service.title}</h3>
              <p className="mt-4 flex-1 text-sm leading-7 text-muted">{service.summary}</p>
              <Link
                href={`/services#${service.slug}`}
                className="mt-8 inline-flex items-center gap-2 text-[0.82rem] font-medium uppercase tracking-[0.12em] text-accent transition group-hover:text-[color:var(--color-gold)]"
              >
                {home.services.cardCta}
                <span aria-hidden="true" className="transition group-hover:translate-x-1">
                  -&gt;
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#e8e0d0] px-6 py-20 sm:px-8 lg:px-10">
        <div className="max-w-4xl space-y-5">
          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-[color:var(--color-gold)]" />
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-gold)]">{home.trust.eyebrow}</p>
          </div>
          <h2 className="font-display text-4xl font-normal leading-[1.08] text-accent sm:text-5xl">{home.trust.title}</h2>
          <p className="max-w-3xl text-base leading-8 text-muted">{home.trust.description}</p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          {home.trust.items.map((item, index) => (
            <article key={item.title}>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--color-gold)]">{trustAccents[index]}</p>
              <h3 className="mt-4 font-display text-[1.5rem] font-semibold text-accent">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-accent px-6 py-20 text-accent-contrast sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[color:var(--color-gold-soft)]" />
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-gold-soft)]">{home.freeScan.eyebrow}</p>
            </div>
            <h2 className="font-display text-4xl font-normal leading-[1.08] text-[#f7f2e9] sm:text-5xl">{home.freeScan.title}</h2>
            <p className="max-w-xl text-base leading-8 text-[#d7ddd5]">{home.freeScan.description}</p>
            <ul className="space-y-4 pt-3">
              {home.freeScan.benefits.map((benefit) => (
                <li key={benefit} className="flex gap-3 text-sm leading-7 text-[#d7ddd5]">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--color-gold-soft)]" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[6px] bg-[rgba(255,255,255,0.98)] px-7 py-8 text-foreground shadow-[0_16px_40px_rgba(15,26,20,0.18)] sm:px-9 sm:py-10">
            <ContactForm
              locale={locale}
              eyebrow={home.freeScan.formEyebrow}
              title={home.freeScan.formTitle}
              description={home.freeScan.formDescription}
              source="homepage_assessment"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
