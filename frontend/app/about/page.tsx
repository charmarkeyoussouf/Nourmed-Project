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
    <div className="space-y-20 pb-10 pt-6">
      <section className="grid gap-8 rounded-[2.5rem] border border-border bg-panel px-6 py-8 shadow-[0_28px_80px_rgba(16,33,42,0.08)] sm:px-10 sm:py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <SectionHeading eyebrow={page.heroEyebrow} title={page.heroTitle} description={page.heroDescription} />
        <div className="rounded-[1.75rem] border border-border bg-panel-strong p-6">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-accent">{page.panelEyebrow}</p>
          {page.panelBody.map((paragraph) => (
            <p key={paragraph} className="mt-3 text-sm leading-7 text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow={page.principles.eyebrow}
          title={page.principles.title}
          description={page.principles.description}
        />
        <div className="grid gap-5 md:grid-cols-2">
          {page.principles.items.map((principle) => (
            <article
              key={principle.title}
              className="rounded-[1.75rem] border border-border bg-panel p-6 shadow-[0_18px_36px_rgba(16,33,42,0.05)]"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">{principle.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 rounded-[2.5rem] border border-border bg-[#12242b] px-6 py-8 text-[#eff2eb] shadow-[0_26px_80px_rgba(16,33,42,0.16)] sm:px-10 sm:py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow={page.expectations.eyebrow}
          title={page.expectations.title}
          description={page.expectations.description}
          tone="inverse"
        />
        <div className="grid gap-4">
          {page.expectations.items.map((item) => (
            <article
              key={item.label}
              className="rounded-[1.5rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] p-5 backdrop-blur"
            >
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[#7dc2be]">{item.label}</p>
              <p className="mt-3 text-sm leading-7 text-[#cbd5d6]">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2.25rem] border border-border bg-panel px-6 py-8 shadow-[0_18px_36px_rgba(16,33,42,0.05)] sm:px-10 sm:py-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">{page.cta.eyebrow}</p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">{page.cta.title}</h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition hover:bg-[#184a52]"
          >
            {page.cta.label}
          </Link>
        </div>
      </section>
    </div>
  );
}
