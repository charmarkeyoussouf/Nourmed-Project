import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { pricingDisclaimer, processSteps, serviceOfferings } from "@/lib/marketing";

const heroHighlights = [
  "Secure public-facing websites and forms",
  "Compliance readiness guidance for growing businesses",
  "Ongoing security support sized for small teams",
] as const;

const whatWeDo = [
  {
    title: "Secure the systems people actually see",
    description:
      "Nourmed helps small businesses improve the websites, forms, hosting decisions, and public-facing systems that shape trust from the first visit.",
  },
  {
    title: "Reduce avoidable risk before it grows",
    description:
      "We look for vulnerabilities, weak processes, and security gaps that can lead to downtime, poor customer confidence, or hard questions from vendors and partners.",
  },
  {
    title: "Make security easier to act on",
    description:
      "The focus is practical guidance. Business owners get clear priorities, sensible recommendations, and implementation support without enterprise-heavy jargon.",
  },
] as const;

const trustStatements = [
  {
    title: "Practical guidance, not noise",
    description:
      "Nourmed explains risks and next steps in plain English so business owners can make decisions quickly and confidently.",
  },
  {
    title: "Security-minded execution",
    description:
      "From secure websites to recurring protection, the work is shaped around real operational risk rather than generic agency deliverables.",
  },
  {
    title: "Readiness without overclaiming",
    description:
      "Nourmed supports compliance readiness and implementation guidance, but does not present itself as a law firm or certifying body.",
  },
] as const;

const scanBenefits = [
  "A clear first look at website risk, intake paths, and visible exposure",
  "Guidance on the right service path for your business",
  "A more informed quote when deeper work is needed",
] as const;

export default function HomePage() {
  return (
    <div className="space-y-24 pb-10 pt-6">
      <section className="overflow-hidden rounded-[2.75rem] border border-border bg-[#12242b] px-6 py-8 text-[#eff2eb] shadow-[0_28px_80px_rgba(16,33,42,0.16)] sm:px-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#7dc2be]">
                Cybersecurity for small businesses
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Protect your business from cyber risk, downtime, and weak systems.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[#cbd5d6] sm:text-lg">
                Nourmed helps small businesses secure their websites, reduce vulnerabilities, improve compliance
                readiness, and build more confidence into the systems customers and partners rely on.
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
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.06)] px-6 py-3 text-sm font-semibold text-[#eff2eb] transition hover:border-[#7dc2be] hover:text-[#7dc2be]"
              >
                View Services
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[rgba(255,255,255,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[#7dc2be]">
              What Nourmed helps with
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
              Clear security support for businesses that need stronger public-facing systems.
            </h2>
            <div className="mt-6 grid gap-3">
              {heroHighlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-[1.25rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] px-4 py-3 text-sm leading-7 text-[#d3dada]"
                >
                  {highlight}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[1.25rem] border border-[rgba(125,194,190,0.28)] bg-[rgba(125,194,190,0.08)] px-4 py-4">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#7dc2be]">Free scan</p>
              <p className="mt-2 text-sm leading-7 text-[#d3dada]">
                Start with a free security scan to understand visible gaps before committing to a larger engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Nourmed helps small businesses secure websites, reduce vulnerabilities, and strengthen readiness"
          description="We focus on the parts of the business that affect trust most: public-facing systems, security gaps that interrupt operations, and the readiness work needed to answer customer or vendor expectations with confidence."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {whatWeDo.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-border bg-panel px-6 py-6 shadow-[0_18px_36px_rgba(16,33,42,0.05)]"
            >
              <h2 className="text-xl font-semibold tracking-tight text-foreground">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-border bg-[#12242b] px-6 py-8 text-[#eff2eb] shadow-[0_26px_80px_rgba(16,33,42,0.16)] sm:px-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="How We Do It"
            title="A simple process built around clarity, action, and steady improvement"
            description="Nourmed keeps the process straightforward so business owners can see what matters, what needs to happen next, and where ongoing support makes sense."
            tone="inverse"
          />
          <div className="grid gap-4">
            {processSteps.map((item) => (
              <article
                key={item.step}
                className="rounded-[1.5rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] p-5 backdrop-blur"
              >
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[#7dc2be]">
                  {item.step}
                </p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#cbd5d6]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Services"
          title="Three ways Nourmed supports small-business security and readiness"
          description="Each service is structured to be clear, practical, and useful for real businesses rather than overloaded with unnecessary complexity."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {serviceOfferings.map((service) => (
            <article
              key={service.slug}
              className="flex h-full flex-col rounded-[1.9rem] border border-border bg-panel px-6 py-6 shadow-[0_18px_36px_rgba(16,33,42,0.05)]"
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-accent">{service.price}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{service.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{service.summary}</p>
              <p className="mt-4 text-xs leading-6 text-muted">{pricingDisclaimer}</p>
              <Link
                href={`/services#${service.slug}`}
                className="mt-6 inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
              >
                View Service Details
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        id="free-scan"
        className="grid gap-6 rounded-[2.5rem] border border-border bg-panel px-6 py-8 shadow-[0_18px_36px_rgba(16,33,42,0.05)] sm:px-10 sm:py-12 lg:grid-cols-[0.85fr_1.15fr]"
      >
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Free Security Scan"
            title="Start with a clear first step instead of guessing what needs attention"
            description="A free scan helps you understand visible website risk, likely weak points, and which Nourmed service is the best fit before you commit to a larger scope."
          />
          <div className="grid gap-4">
            {scanBenefits.map((benefit) => (
              <article
                key={benefit}
                className="rounded-[1.5rem] border border-border bg-panel-strong px-5 py-4 text-sm leading-7 text-muted"
              >
                {benefit}
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-panel-strong px-6 py-6 shadow-[0_18px_36px_rgba(16,33,42,0.05)] sm:px-8 sm:py-8">
          <ContactForm
            eyebrow="Request your scan"
            title="Request a free security scan or quote"
            description="Tell Nourmed about your business, your website, and the type of help you need. We will review the request and recommend the right next step."
          />
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Trust & Reassurance"
          title="Practical protection for growing businesses that need clear guidance"
          description="Nourmed is built around business-relevant security work: secure websites, stronger readiness, and support that helps owners move forward with more confidence."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {trustStatements.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-border bg-panel px-6 py-6 shadow-[0_18px_36px_rgba(16,33,42,0.05)]"
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
