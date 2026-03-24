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
    <div className="space-y-20 pb-12 pt-8">
      <section className="rounded-[3rem] border border-[rgba(206,223,217,0.96)] bg-[linear-gradient(135deg,rgba(228,247,244,0.92),rgba(255,246,232,0.94),rgba(255,255,255,0.98))] px-7 py-10 shadow-[0_28px_80px_rgba(16,33,42,0.08)] sm:px-12 sm:py-14">
        <SectionHeading eyebrow={page.heroEyebrow} title={page.heroTitle} description={page.heroDescription} />
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <article className="rounded-[2rem] border border-[rgba(206,223,217,0.96)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,245,228,0.9))] px-7 py-7 shadow-[0_18px_36px_rgba(16,33,42,0.05)]">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">{page.expectationEyebrow}</p>
            <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
              {page.expectationBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <div className="grid gap-5">
            {page.assurances.map((assurance, index) => (
              <article
                key={assurance.title}
                className={`rounded-[1.8rem] border border-[rgba(206,223,217,0.96)] p-6 shadow-[0_14px_26px_rgba(16,33,42,0.05)] ${
                  index === 1
                    ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(226,247,244,0.88))]"
                    : "bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(239,248,247,0.92))]"
                }`}
              >
                <h2 className="text-lg font-semibold tracking-tight text-foreground">{assurance.title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted">{assurance.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[2.35rem] border border-[rgba(206,223,217,0.96)] bg-[rgba(255,255,255,0.92)] px-7 py-7 shadow-[0_18px_36px_rgba(16,33,42,0.08)] sm:px-9 sm:py-9">
          <ContactForm locale={locale} source="contact_page" />
        </div>
      </section>
    </div>
  );
}
