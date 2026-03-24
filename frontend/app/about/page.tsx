import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { getMarketingCopy } from "@/lib/marketing";
import { getRequestLocale } from "@/lib/request-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = getMarketingCopy(locale);

  return {
    title: copy.meta.about.title,
    description: copy.meta.about.description,
    keywords: [...copy.meta.about.keywords],
    openGraph: {
      title: `${copy.meta.about.title} | Nourmed`,
      description: copy.meta.about.description,
      url: "/about",
    },
  };
}

export default async function AboutPage() {
  const locale = await getRequestLocale();
  const copy = getMarketingCopy(locale);
  const page = copy.aboutPage;

  return (
    <div className="space-y-24 pb-12 pt-8">
      <section className="grid gap-8 rounded-[3rem] border border-[rgba(206,223,217,0.96)] bg-[linear-gradient(135deg,rgba(229,247,244,0.92),rgba(255,246,231,0.94),rgba(255,255,255,0.98))] px-7 py-10 shadow-[0_28px_80px_rgba(16,33,42,0.08)] sm:px-12 sm:py-14 lg:grid-cols-[1.05fr_0.95fr]">
        <SectionHeading eyebrow={page.heroEyebrow} title={page.heroTitle} description={page.heroDescription} />
        <div className="rounded-[2rem] border border-[rgba(206,223,217,0.96)] bg-[rgba(255,255,255,0.84)] p-7 shadow-[0_16px_30px_rgba(16,33,42,0.05)]">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-accent">{page.panelEyebrow}</p>
          {page.panelBody.map((paragraph) => (
            <p key={paragraph} className="mt-3 text-sm leading-7 text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeading
          eyebrow={page.principles.eyebrow}
          title={page.principles.title}
          description={page.principles.description}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {page.principles.items.map((principle, index) => (
            <article
              key={principle.title}
              className={`rounded-[2rem] border border-[rgba(206,223,217,0.96)] p-7 shadow-[0_18px_36px_rgba(16,33,42,0.05)] ${
                index % 2 === 0
                  ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(226,247,244,0.84))]"
                  : "bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,245,228,0.88))]"
              }`}
            >
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">{principle.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 rounded-[3rem] border border-[rgba(206,223,217,0.96)] bg-[linear-gradient(140deg,rgba(255,255,255,0.96),rgba(227,247,244,0.88),rgba(255,246,232,0.9))] px-7 py-10 shadow-[0_26px_80px_rgba(16,33,42,0.08)] sm:px-12 sm:py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow={page.expectations.eyebrow}
          title={page.expectations.title}
          description={page.expectations.description}
        />
        <div className="grid gap-5">
          {page.expectations.items.map((item) => (
            <article
              key={item.label}
              className="rounded-[1.7rem] border border-[rgba(206,223,217,0.96)] bg-[rgba(255,255,255,0.84)] p-6 shadow-[0_14px_30px_rgba(16,33,42,0.05)]"
            >
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-accent">{item.label}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2.6rem] border border-[rgba(206,223,217,0.96)] bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(226,247,244,0.82),rgba(255,245,228,0.82))] px-7 py-8 shadow-[0_18px_36px_rgba(16,33,42,0.05)] sm:px-12 sm:py-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">{page.cta.eyebrow}</p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">{page.cta.title}</h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#2a8f95,#3ba8a5)] px-6 py-3.5 text-sm font-semibold text-accent-contrast shadow-[0_14px_30px_rgba(42,143,149,0.22)] transition hover:brightness-95"
          >
            {page.cta.label}
          </Link>
        </div>
      </section>
    </div>
  );
}
