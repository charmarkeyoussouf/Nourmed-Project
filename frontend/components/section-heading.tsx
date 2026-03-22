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
  const eyebrowClass = tone === "inverse" ? "text-[#7dc2be]" : "text-accent";
  const titleClass = tone === "inverse" ? "text-[#eff2eb]" : "text-foreground";
  const descriptionClass = tone === "inverse" ? "text-[#cbd5d6]" : "text-muted";

  return (
    <div className="max-w-3xl space-y-3">
      <p className={`font-mono text-xs uppercase tracking-[0.32em] ${eyebrowClass}`}>{eyebrow}</p>
      <h2 className={`text-3xl font-semibold tracking-tight sm:text-4xl ${titleClass}`}>{title}</h2>
      <p className={`text-base leading-8 ${descriptionClass}`}>{description}</p>
    </div>
  );
}
