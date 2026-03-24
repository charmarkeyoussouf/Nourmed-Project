import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";

const assurances = [
  {
    title: "Useful information first",
    description: "The form captures the business details needed to scope a free vulnerability scan or premium service quote.",
  },
  {
    title: "Protected intake path",
    description: "Requests still pass through the same validated backend path with anti-spam controls and rate limiting.",
  },
  {
    title: "Built for follow-through",
    description: "Nourmed uses the request to understand visible risks, needed services, and where the first security improvements should start.",
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-16 pb-10 pt-6">
      <section className="rounded-[2.5rem] border border-border bg-panel px-6 py-8 shadow-[0_28px_80px_rgba(16,33,42,0.08)] sm:px-10 sm:py-12">
        <SectionHeading
          eyebrow="Free Quote & Scan Request"
          title="Request a free vulnerability scan or a scoped security quote"
          description="Use the secure intake path to tell Nourmed about your business, your website, and the service you need. We will review the request and recommend the next practical step."
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <article className="rounded-[2rem] border border-border bg-panel px-6 py-6 shadow-[0_18px_36px_rgba(16,33,42,0.05)]">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">What to expect</p>
            <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
              <p>Use this form to request compliance consulting, secure website work, or ongoing small business protection.</p>
              <p>We use the information to understand your visible risk surface, the kind of support you need, and whether a free scan or a scoped quote is the right next move.</p>
              <p>Nourmed focuses on practical security and readiness support, not legal certification claims or fake guarantees.</p>
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
