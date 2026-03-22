import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";

const principles = [
  {
    title: "Security boundaries first",
    description:
      "Nourmed treats the edge, API boundary, and database network as separate concerns so a public site does not imply public infrastructure.",
  },
  {
    title: "Small surface area",
    description:
      "The MVP stays focused on pages, contact intake, and persistence so the deployment path is understandable before larger workflows are introduced.",
  },
  {
    title: "Operational clarity",
    description:
      "Health checks, structured logging, migrations, and environment-driven config are baked in early to keep production behavior observable.",
  },
  {
    title: "Room to extend",
    description:
      "The schema and service boundaries leave space for future admin workflows, webhook forwarding, and role-based internal tooling.",
  },
];

const blueprint = [
  {
    label: "Browser",
    detail: "Public visitors interact with the marketing site and contact form.",
  },
  {
    label: "Nginx",
    detail: "The edge handles routing, request headers, and production TLS termination.",
  },
  {
    label: "Frontend + Backend",
    detail: "Next.js serves the public experience while Express handles health and contact APIs.",
  },
  {
    label: "PostgreSQL",
    detail: "Validated submissions are stored privately with Prisma-managed schema changes.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-20 pb-10 pt-6">
      <section className="grid gap-8 rounded-[2.5rem] border border-border bg-panel px-6 py-8 shadow-[0_28px_80px_rgba(16,33,42,0.08)] sm:px-10 sm:py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <SectionHeading
          eyebrow="About Nourmed"
          title="Built as a secure website foundation, not a demo that ignores deployment reality"
          description="This repo is intended to become the public face of Nourmed while preserving clear service boundaries for the backend and database."
        />
        <div className="rounded-[1.75rem] border border-border bg-panel-strong p-6">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-accent">Current scope</p>
          <p className="mt-3 text-sm leading-7 text-muted">
            The project covers a public marketing site, secure contact intake, containerized local startup, and an HTTPS
            production path for `nourmed.org` and `www.nourmed.org`.
          </p>
          <p className="mt-4 text-sm leading-7 text-muted">
            It is deliberately not trying to solve authentication, internal dashboards, or workflow automation yet. The
            goal is to establish a credible and deployable base first.
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Operating Principles"
          title="What drives the shape of the repo"
          description="The structure is biased toward a VPS deployment that remains understandable after the first release instead of becoming an opaque all-in-one container."
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
          eyebrow="Platform Blueprint"
          title="A simple chain of trust from edge to persistence"
          description="Each layer exists for a specific reason, and each one can be evolved independently without breaking the rest of the deployment model."
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
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Next build stage</p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              After the public site is stable, the next logical layers are forwarding, admin tooling, and controlled
              internal workflows.
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition hover:bg-[#184a52]"
          >
            Discuss the deployment path
          </Link>
        </div>
      </section>
    </div>
  );
}
