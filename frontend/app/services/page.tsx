import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { processSteps, serviceOfferings } from "@/lib/marketing";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Cybersecurity and compliance consulting for small businesses, including compliance readiness, secure website development, recurring security packages, and free vulnerability scans.",
  keywords: [
    "compliance consulting for small businesses",
    "secure website development",
    "small business cybersecurity packages",
    "vulnerability scanning",
    "website security consulting",
  ],
  openGraph: {
    title: "Nourmed Services | Cybersecurity & Compliance Consulting",
    description:
      "Explore compliance consulting, secure website development, and ongoing small business cybersecurity packages with premium market-informed pricing.",
    url: "/services",
  },
};

const whatWeDo = [
  {
    title: "Protect trust before it erodes",
    description:
      "Nourmed helps small businesses reduce the gaps that make customers, vendors, and partners hesitate to trust what sits behind a public website or intake flow.",
  },
  {
    title: "Strengthen systems that face the public",
    description:
      "We focus on websites, forms, infrastructure choices, and the operational weak points that can create downtime, exposure, or unnecessary friction.",
  },
  {
    title: "Make security expectations manageable",
    description:
      "The goal is not to bury owners in jargon. It is to give growing businesses a practical plan for stronger security and better readiness.",
  },
];

const scanBenefits = [
  "A review of your website, intake surface, and visible exposure patterns",
  "A practical recommendation on which service level fits your business best",
  "A cleaner quote process for secure website work, compliance readiness, or recurring protection",
];

const reassuranceItems = [
  {
    title: "Practical, real-world protection",
    description:
      "Nourmed focuses on the systems small businesses actually rely on: websites, intake paths, user access, backups guidance, and security readiness that supports operations.",
  },
  {
    title: "Compliance readiness, not legal overreach",
    description:
      "We help businesses prepare for security and compliance expectations, but we do not claim legal authority, issue certifications, or act as a law firm.",
  },
  {
    title: "Built for growing businesses",
    description:
      "Our work is designed for companies that need serious protection and premium execution without getting pushed into enterprise-sized confusion.",
  },
];

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
                Cybersecurity and compliance consulting for small businesses that need stronger systems and clearer next
                steps.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-[#cbd5d6] sm:text-lg">
                Nourmed helps growing businesses understand risk, secure their public-facing systems, and prepare for
                customer, vendor, and operational security expectations with practical services that are premium,
                trustworthy, and built to move work forward.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="#free-scan"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition hover:bg-[#184a52]"
              >
                Book a Free Scan
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
          title="We help small businesses reduce vulnerabilities, strengthen trust, and make security expectations manageable"
          description="Nourmed is built for business owners who need clear guidance on what needs to be protected, why it matters, and what to do next without pretending security has to sound impossible."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {whatWeDo.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-border bg-panel p-6 shadow-[0_18px_36px_rgba(16,33,42,0.05)]"
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
            title="A simple process that turns security concerns into practical action"
            description="We lead with assessment, clarity, and prioritization so small businesses can improve the right things first."
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
          title="Three service lines built for security, readiness, and business continuity"
          description="Pricing is positioned at the premium end of the small-business market and is designed to reflect strategic work, secure implementation, and ongoing protection rather than commodity labor."
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
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-accent">Pricing</p>
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
        <p className="text-sm leading-7 text-muted">
          Premium anchors are based on current public cybersecurity and secure website market pricing. Larger
          environments, deeper remediation scopes, and multi-location programs are custom quoted.
        </p>
      </section>

      <section
        id="free-scan"
        className="grid gap-6 rounded-[2.5rem] border border-border bg-[#12242b] px-6 py-8 text-[#eff2eb] shadow-[0_26px_80px_rgba(16,33,42,0.16)] sm:px-10 sm:py-12 lg:grid-cols-[0.85fr_1.15fr]"
      >
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Free Vulnerability Scan"
            title="Request a free scan or quote and get a clearer view of your next security move"
            description="This first step is designed to be useful, not vague. Tell us what you need, share the business details that matter, and we will review the visible risk surface before recommending the right scope."
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
            title="Tell Nourmed what you need"
            description="Use this form for a free vulnerability scan, a secure website quote, or a compliance readiness conversation."
          />
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Trust & Reassurance"
          title="Serious protection for growing businesses, without fake claims"
          description="Nourmed is a practical security and compliance readiness partner for businesses that need secure websites, clearer preparation, and ongoing protection grounded in real operations."
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
