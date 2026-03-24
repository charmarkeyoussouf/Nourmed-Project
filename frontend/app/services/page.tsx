import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { pricingDisclaimer, processSteps, serviceOfferings } from "@/lib/marketing";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Cybersecurity consulting for small businesses, including compliance consulting, secure website development, small business cybersecurity packages, and free security scans.",
  keywords: [
    "compliance consulting for small businesses",
    "secure website development",
    "small business cybersecurity packages",
    "vulnerability scan",
    "website security consulting",
  ],
  openGraph: {
    title: "Nourmed Services | Cybersecurity Consulting for Small Businesses",
    description:
      "Explore compliance consulting, secure website development, and ongoing small business cybersecurity packages with realistic starting prices.",
    url: "/services",
  },
};

const servicePrinciples = [
  {
    title: "Clear scopes and practical outcomes",
    description:
      "Nourmed structures each engagement around visible business needs, real risks, and work that can be understood by owners and operators.",
  },
  {
    title: "Security work that supports trust",
    description:
      "The goal is to improve the systems customers, vendors, and partners rely on, not to bury your team in unnecessary complexity.",
  },
  {
    title: "Support that fits smaller organizations",
    description:
      "Everything is designed for growing businesses that need serious protection without enterprise-sized overhead.",
  },
] as const;

const reassuranceItems = [
  {
    title: "Business-friendly guidance",
    description:
      "We explain what matters, why it matters, and what should happen next in terms a non-technical owner can use.",
  },
  {
    title: "Readiness support without legal overreach",
    description:
      "Nourmed helps businesses prepare for security and compliance expectations, but does not provide legal advice or issue certifications.",
  },
  {
    title: "Security work that remains practical",
    description:
      "The focus stays on websites, vulnerabilities, trust, access, backups, and recurring risk reduction that supports real operations.",
  },
] as const;

const scanBenefits = [
  "A practical review of your website and visible attack surface",
  "A clearer understanding of which service is the right fit",
  "A faster and more informed quote when deeper work is needed",
] as const;

export default function ServicesPage() {
  return (
    <div className="space-y-20 pb-10 pt-6">
      <section className="overflow-hidden rounded-[2.75rem] border border-border bg-[#12242b] px-6 py-8 text-[#eff2eb] shadow-[0_28px_80px_rgba(16,33,42,0.16)] sm:px-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#7dc2be]">
                Cybersecurity consulting services
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Services designed to help small businesses strengthen security and operate with more confidence.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-[#cbd5d6] sm:text-lg">
                Nourmed helps businesses secure public-facing systems, prepare for compliance expectations, and reduce
                avoidable risk through clear consulting, practical implementation, and ongoing support.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="#free-scan"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition hover:bg-[#184a52]"
              >
                Get a Free Security Scan
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.06)] px-6 py-3 text-sm font-semibold text-[#eff2eb] transition hover:border-[#7dc2be] hover:text-[#7dc2be]"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {serviceOfferings.map((service) => (
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
          eyebrow="What We Do"
          title="Security services built around real business needs"
          description="Nourmed helps small businesses improve trust, reduce vulnerabilities, and make better security decisions with service lines that stay practical and easy to understand."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {servicePrinciples.map((item) => (
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
            eyebrow="How We Do It"
            title="A straightforward process from assessment to ongoing support"
            description="The work begins with clarity, moves into practical remediation, and grows into recurring support only where it adds value."
          />
          <div className="grid gap-4">
            {processSteps.map((item) => (
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
        <SectionHeading
          eyebrow="Services"
          title="Three service lines with realistic starting prices for small businesses"
          description="These starting prices are designed to be credible for small-business engagements while leaving room to scale with scope, systems, and business complexity."
        />
        <div className="grid gap-6">
          {serviceOfferings.map((service) => (
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
                    <li
                      key={bullet}
                      className="rounded-[1.25rem] border border-border bg-panel-strong px-4 py-3"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.75rem] border border-border bg-panel-strong p-6">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-accent">Average starting price</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{service.price}</p>
                <p className="mt-4 text-sm leading-7 text-muted">{service.priceNote}</p>
                <Link
                  href="#free-scan"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-contrast transition hover:bg-[#184a52]"
                >
                  Get a Free Quote
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="text-sm leading-7 text-muted">{pricingDisclaimer}</p>
      </section>

      <section
        id="free-scan"
        className="grid gap-6 rounded-[2.5rem] border border-border bg-[#12242b] px-6 py-8 text-[#eff2eb] shadow-[0_26px_80px_rgba(16,33,42,0.16)] sm:px-10 sm:py-12 lg:grid-cols-[0.85fr_1.15fr]"
      >
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Free Security Scan"
            title="Use the free scan to understand your next security move"
            description="Tell Nourmed what you are concerned about, share the website or system in question, and we will review the visible risk surface before recommending a practical next step."
            tone="inverse"
          />
          <div className="grid gap-4">
            {scanBenefits.map((benefit) => (
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
            eyebrow="Request your scan"
            title="Request a free security scan or quote"
            description="Use this form for a free scan, a service quote, or a practical first conversation about your security priorities."
          />
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Trust & Reassurance"
          title="Security guidance that stays practical and business-relevant"
          description="Nourmed is built for owners and operators who need serious help protecting public-facing systems, improving readiness, and reducing avoidable risk."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {reassuranceItems.map((item) => (
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
