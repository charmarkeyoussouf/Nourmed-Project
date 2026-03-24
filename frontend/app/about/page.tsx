import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";

const principles = [
  {
    title: "Business-first communication",
    description:
      "Nourmed explains what matters in plain English so owners and operators can make security decisions without getting buried under buzzwords.",
  },
  {
    title: "Practical protection",
    description:
      "We focus on reducing real risk for growing businesses: secure websites, stronger intake paths, better readiness, and operational follow-through.",
  },
  {
    title: "Readiness without overclaiming",
    description:
      "Nourmed supports compliance readiness and security preparation, but does not pretend to be a law firm or a certifying authority.",
  },
  {
    title: "Long-term improvement",
    description:
      "The goal is not a one-time checklist. It is helping small businesses build stronger systems that can hold up as expectations grow.",
  },
];

const blueprint = [
  {
    label: "Who we serve",
    detail: "Small businesses that need clearer security posture, stronger websites, and better preparation for customer or vendor expectations.",
  },
  {
    label: "What we focus on",
    detail: "Compliance readiness, secure website development, and recurring security support sized for growing operations.",
  },
  {
    label: "How we work",
    detail: "We assess what is exposed, prioritize what matters most, harden what is weak, and support ongoing improvement where needed.",
  },
  {
    label: "What clients get",
    detail: "Clearer risk visibility, more trustworthy public systems, and security guidance that is practical enough to implement.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-20 pb-10 pt-6">
      <section className="grid gap-8 rounded-[2.5rem] border border-border bg-panel px-6 py-8 shadow-[0_28px_80px_rgba(16,33,42,0.08)] sm:px-10 sm:py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <SectionHeading
          eyebrow="About Nourmed"
          title="A security and compliance readiness partner for small businesses that need practical protection"
          description="Nourmed was built to help growing businesses strengthen public-facing systems, prepare for real-world security expectations, and make better decisions before small issues turn into bigger problems."
        />
        <div className="rounded-[1.75rem] border border-border bg-panel-strong p-6">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-accent">What this means</p>
          <p className="mt-3 text-sm leading-7 text-muted">
            We help businesses understand the security expectations attached to customer trust, vendor requirements,
            public-facing websites, and everyday operational risk.
          </p>
          <p className="mt-4 text-sm leading-7 text-muted">
            The goal is a stronger security posture, not confusion. Nourmed focuses on guidance and implementation
            support that makes sense for small teams.
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Operating Principles"
          title="How Nourmed approaches security work"
          description="The business is designed around clarity, trust, and steady risk reduction rather than generic technical theater."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {principles.map((principle) => (
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
          eyebrow="What Clients Can Expect"
          title="A simple model for practical security improvement"
          description="Nourmed helps businesses understand where they are exposed, what matters most, and how to improve without overspending on the wrong priorities."
          tone="inverse"
        />
        <div className="grid gap-4">
          {blueprint.map((item) => (
            <article
              key={item.label}
              className="rounded-[1.5rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] p-5 backdrop-blur"
            >
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[#7dc2be]">
                {item.label}
              </p>
              <p className="mt-3 text-sm leading-7 text-[#cbd5d6]">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2.25rem] border border-border bg-panel px-6 py-8 shadow-[0_18px_36px_rgba(16,33,42,0.05)] sm:px-10 sm:py-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Next step</p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              If you need a secure website, clearer compliance readiness, or ongoing protection, start with a free scan
              or quote request.
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition hover:bg-[#184a52]"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
