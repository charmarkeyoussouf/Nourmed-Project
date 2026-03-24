import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";

const assurances = [
  {
    title: "Useful information first",
    description: "The form collects the details needed to scope a free security scan or a practical service quote.",
  },
  {
    title: "Protected intake path",
    description: "Requests are validated on the backend and protected by anti-spam controls before they reach storage.",
  },
  {
    title: "A clearer next step",
    description: "Nourmed uses the request to understand visible risk, business needs, and the right service path.",
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-16 pb-10 pt-6">
      <section className="rounded-[2.5rem] border border-border bg-panel px-6 py-8 shadow-[0_28px_80px_rgba(16,33,42,0.08)] sm:px-10 sm:py-12">
        <SectionHeading
          eyebrow="Free Security Scan"
          title="Request a free security scan or a scoped quote"
          description="Use the secure intake form to tell Nourmed about your business, your website, and the kind of support you need. We will review the request and recommend a practical next step."
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <article className="rounded-[2rem] border border-border bg-panel px-6 py-6 shadow-[0_18px_36px_rgba(16,33,42,0.05)]">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">What to expect</p>
            <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
              <p>Use this form for compliance consulting, secure website development, or recurring security support.</p>
              <p>The goal is to understand your business, your visible risk surface, and whether a free scan or a deeper engagement makes the most sense.</p>
              <p>Nourmed focuses on practical cybersecurity and readiness guidance, not legal claims, fake guarantees, or inflated jargon.</p>
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
