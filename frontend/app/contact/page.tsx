import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { getMarketingCopy } from "@/lib/marketing";
import { getRequestLocale } from "@/lib/request-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = getMarketingCopy(locale);

  return {
    title: copy.meta.contact.title,
    description: copy.meta.contact.description,
    keywords: [...copy.meta.contact.keywords],
    openGraph: {
      title: `${copy.meta.contact.title} | Nourmed`,
      description: copy.meta.contact.description,
      url: "/contact",
    },
  };
}

export default async function ContactPage() {
  const locale = await getRequestLocale();
  const copy = getMarketingCopy(locale);
  const page = copy.contactPage;

  return (
    <div className="space-y-16 pb-10 pt-6">
      <section className="rounded-[2.5rem] border border-border bg-panel px-6 py-8 shadow-[0_28px_80px_rgba(16,33,42,0.08)] sm:px-10 sm:py-12">
        <SectionHeading eyebrow={page.heroEyebrow} title={page.heroTitle} description={page.heroDescription} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <article className="rounded-[2rem] border border-border bg-panel px-6 py-6 shadow-[0_18px_36px_rgba(16,33,42,0.05)]">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">{page.expectationEyebrow}</p>
            <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
              {page.expectationBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <div className="grid gap-4">
            {page.assurances.map((assurance) => (
              <article
                key={assurance.title}
                className="rounded-[1.6rem] border border-border bg-panel-strong p-5 shadow-[0_14px_26px_rgba(16,33,42,0.05)]"
              >
                <h2 className="text-lg font-semibold tracking-tight text-foreground">{assurance.title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted">{assurance.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-panel px-6 py-6 shadow-[0_18px_36px_rgba(16,33,42,0.05)] sm:px-8 sm:py-8">
          <ContactForm locale={locale} />
        </div>
      </section>
    </div>
  );
}
