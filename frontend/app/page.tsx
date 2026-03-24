import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { processSteps, serviceOfferings } from "@/lib/marketing";

const valueProps = [
  {
    label: "Compliance clarity",
    title: "Understand security expectations before they become blockers.",
    description:
      "We translate vendor questions, customer trust requirements, and security expectations into a roadmap a small business can actually act on.",
  },
  {
    label: "Secure websites",
    title: "Protect the public-facing systems your business depends on.",
    description:
      "Our website work is built around HTTPS, hardened hosting, protected forms, and deployment discipline instead of surface-level design alone.",
  },
  {
    label: "Ongoing protection",
    title: "Stay ahead of easy-to-miss gaps as your business grows.",
    description:
      "Recurring packages give small businesses vulnerability scanning, guidance, and practical risk reduction without enterprise overhead.",
  },
];

const outcomes = [
  {
    title: "Protect trust before it gets tested",
    description:
      "Customers and vendors expect secure handling of information long before they ask for a formal audit. Nourmed helps you prepare before weak systems cost credibility.",
  },
  {
    title: "Reduce avoidable downtime and exposure",
    description:
      "We focus on real-world issues that interrupt growth: weak intake paths, public-facing gaps, inconsistent deployments, and underprotected business websites.",
  },
  {
    title: "Make security understandable for owners",
    description:
      "The goal is not jargon. It is helping small businesses understand what matters, what needs fixing first, and what protection looks like in practical terms.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-24 pb-10 pt-6">
      <section className="overflow-hidden rounded-[2.5rem] border border-border bg-[#12242b] px-6 py-8 text-[#eff2eb] shadow-[0_28px_80px_rgba(16,33,42,0.16)] sm:px-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.95fr] lg:items-end">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#7dc2be]">
                Cybersecurity for small businesses
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Protect your business with secure websites, compliance readiness, and practical cybersecurity support.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[#cbd5d6] sm:text-lg">
                Nourmed helps growing companies reduce vulnerabilities, strengthen public-facing systems, and prepare for
                the security expectations that come with real customers, vendors, and day-to-day operations.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition hover:bg-[#184a52]"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.06)] px-6 py-3 text-sm font-semibold text-[#eff2eb] transition hover:border-[#7dc2be] hover:text-[#7dc2be]"
              >
                Explore Services
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {valueProps.map((tile) => (
              <article
                key={tile.title}
                className="rounded-[1.75rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] p-5 backdrop-blur"
              >
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#7dc2be]">{tile.label}</p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight">{tile.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#cbd5d6]">{tile.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Nourmed helps small businesses tighten security without drowning in enterprise complexity"
          description="We focus on the practical problems that affect trust, uptime, and readiness: exposed websites, weak intake paths, unclear compliance expectations, and missing operational safeguards."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {outcomes.map((area) => (
            <article
              key={area.title}
              className="rounded-[1.75rem] border border-border bg-panel p-6 shadow-[0_18px_36px_rgba(16,33,42,0.05)]"
            >
              <h2 className="text-xl font-semibold tracking-tight text-foreground">{area.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{area.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-border bg-[#12242b] px-6 py-8 text-[#eff2eb] shadow-[0_26px_80px_rgba(16,33,42,0.16)] sm:px-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="How We Do It"
            title="A straightforward process for reducing risk and improving readiness"
            description="We keep the process business-friendly: understand the exposure, prioritize the gaps, harden the environment, and support ongoing improvement where it matters."
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
          eyebrow="Featured Services"
          title="Premium services built for trust, resilience, and small-business growth"
          description="Nourmed leads with clear scopes, premium positioning, and practical security work instead of vague promises."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {serviceOfferings.map((service) => (
            <article
              key={service.slug}
              className="rounded-[1.75rem] border border-border bg-panel p-6 shadow-[0_18px_36px_rgba(16,33,42,0.05)]"
            >
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-accent">{service.price}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{service.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{service.summary}</p>
              <Link
                href={`/services#${service.slug}`}
                className="mt-6 inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
              >
                View service details
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-[2.25rem] border border-border bg-panel px-6 py-8 shadow-[0_18px_36px_rgba(16,33,42,0.05)] sm:px-10 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Free Vulnerability Scan</p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Start with a free scan or quote request and get a clearer picture of where your business stands.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-muted">
            We use the first conversation to understand your website, visible risk surface, and the service level that
            makes sense for your business. If you need broader work, we turn that into a scoped quote instead of
            guesswork.
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-border bg-panel-strong p-6">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-accent">Next step</p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Tell us what you need, what systems are public-facing, and where you want better security. We will guide the
            next step without bloated jargon.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-contrast transition hover:bg-[#184a52]"
            >
              Book a Free Scan
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
            >
              Review all services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
