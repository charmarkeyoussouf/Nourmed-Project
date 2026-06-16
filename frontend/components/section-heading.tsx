type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "default" | "inverse";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "default",
}: SectionHeadingProps) {
  const eyebrowClass = tone === "inverse" ? "text-[color:var(--color-gold-soft)]" : "text-[color:var(--color-gold)]";
  const titleClass = tone === "inverse" ? "text-[#f6f2ea]" : "text-accent";
  const descriptionClass = tone === "inverse" ? "text-[#d4dbd1]" : "text-muted";

  return (
    <div className="max-w-4xl space-y-5">
      <p className={`font-mono text-[0.72rem] uppercase tracking-[0.22em] ${eyebrowClass}`}>{eyebrow}</p>
      <h2 className={`max-w-5xl font-display text-4xl font-normal leading-[1.08] sm:text-5xl lg:text-[3.35rem] ${titleClass}`}>
        {title}
      </h2>
      <p className={`max-w-3xl text-base leading-8 sm:text-[1.02rem] ${descriptionClass}`}>{description}</p>
    </div>
  );
}
