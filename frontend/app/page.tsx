import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";

const stackTiles = [
  {
    label: "Edge proxy",
    title: "Nginx is the only public entrypoint.",
    description:
      "Traffic is terminated at the edge, API requests stay behind the proxy, and health checks stay explicit.",
  },
  {
    label: "Validated intake",
    title: "Every contact request is filtered before storage.",
    description:
      "Server-side validation, rate limiting, and a honeypot field reduce low-effort spam before it touches persistence.",
  },
  {
    label: "Private persistence",
    title: "PostgreSQL stays off the public network.",
    description:
      "The database lives on an internal Docker network and is only reachable by the backend service.",
  },
];

const deliveryAreas = [
  {
    title: "Public website",
    description:
      "A compact marketing surface with a consistent visual system, clear navigation, and deployment-ready metadata.",
  },
  {
    title: "Secure contact flow",
    description:
      "Browser submissions route through Nginx to the backend API, then into PostgreSQL with audit-friendly timestamps.",
  },
  {
    title: "Deployable stack",
    description:
      "The repo is organized as containers first so a VPS deploy mirrors local composition instead of diverging from it.",
  },
];

const deliverySteps = [
  {
    step: "01",
    title: "Ship the public face",
    description:
      "The frontend handles the marketing site, messaging, and contact capture without exposing internal services directly.",
  },
  {
    step: "02",
    title: "Validate at the API boundary",
    description:
      "The backend enforces schema validation, request limits, and structured responses before persisting anything.",
  },
  {
    step: "03",
    title: "Operate behind the edge",
    description:
      "Nginx fronts the stack, certificates terminate at the edge, and the database stays private on an internal network.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-24 pb-10 pt-6">
      <section className="overflow-hidden rounded-[2.5rem] border border-border bg-panel px-6 py-8 shadow-[0_28px_80px_rgba(16,33,42,0.08)] sm:px-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.95fr] lg:items-end">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
                Deployment-ready foundation
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Secure systems for teams that need a public website without exposing the rest of their operations.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
                Nourmed combines a polished public front end, protected contact intake, and production-minded
                container architecture so the same stack can move from local build to VPS deployment with fewer
                surprises.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition hover:bg-[#184a52]"
              >
                Start a deployment conversation
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-border bg-panel-strong px-6 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
              >
                Review the platform approach
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {stackTiles.map((tile) => (
              <article
                key={tile.title}
                className="rounded-[1.75rem] border border-border bg-panel-strong p-5 shadow-[0_16px_32px_rgba(16,33,42,0.06)]"
              >
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-accent">{tile.label}</p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{tile.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{tile.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="What This Ships"
          title="A lean website stack with security boundaries already in place"
          description="The repo is intentionally narrow: a marketing site, a validated contact pipeline, and infrastructure choices that stay reasonable on a VPS."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {deliveryAreas.map((area) => (
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
            eyebrow="How It Works"
            title="From browser request to stored contact submission"
            description="The architecture stays simple on purpose so the frontend, backend, and deployment path can evolve independently without collapsing into a single container."
            tone="inverse"
          />
          <div className="grid gap-4">
            {deliverySteps.map((item) => (
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

      <section className="grid gap-6 rounded-[2.25rem] border border-border bg-panel px-6 py-8 shadow-[0_18px_36px_rgba(16,33,42,0.05)] sm:px-10 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Production Path</p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Ready the domain, issue certificates, then deploy the same service boundaries you build against locally.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-muted">
            The final production pass still depends on real DNS, open ports 80 and 443, and Let&apos;s Encrypt issuance
            on the target VPS. Once that is in place, the repo is designed to keep the database private and the edge
            public.
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-border bg-panel-strong p-6">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-accent">Next step</p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Finish certificate issuance on the VPS, deploy the production Compose stack, and wire any downstream
            forwarding for contact submissions after the intake path is stable.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
          >
            Open the contact flow
          </Link>
        </div>
      </section>
    </div>
  );
}
