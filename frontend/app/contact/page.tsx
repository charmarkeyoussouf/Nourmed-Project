import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";

const assurances = [
  {
    title: "Validated on the server",
    description: "Name, email, and message are validated by the backend before anything is written to storage.",
  },
  {
    title: "Protected against noise",
    description: "The endpoint includes rate limiting and a honeypot field to cut down on low-effort spam.",
  },
  {
    title: "Persisted privately",
    description: "Successful submissions land in PostgreSQL on a private Docker network behind the API layer.",
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-16 pb-10 pt-6">
      <section className="rounded-[2.5rem] border border-border bg-panel px-6 py-8 shadow-[0_28px_80px_rgba(16,33,42,0.08)] sm:px-10 sm:py-12">
        <SectionHeading
          eyebrow="Contact Nourmed"
          title="Use the secure intake path to start the conversation"
          description="This form is wired to the backend API through Nginx, validated server-side, and designed to match the same route that production traffic will use."
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <article className="rounded-[2rem] border border-border bg-panel px-6 py-6 shadow-[0_18px_36px_rgba(16,33,42,0.05)]">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">What to expect</p>
            <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
              <p>Use this channel for deployment planning, website work, infrastructure questions, or integration scoping.</p>
              <p>The current schema stores the essentials first: name, email, message, timestamps, and processing status.</p>
              <p>Once forwarding targets are finalized, this same intake path can hand off to downstream automations without changing the public form.</p>
            </div>
          </article>

          <div className="grid gap-4">
            {assurances.map((assurance) => (
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
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
