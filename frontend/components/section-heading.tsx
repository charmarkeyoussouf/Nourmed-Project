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
    <div className="max-w-4xl space-y-5">
      <p className={`font-mono text-xs uppercase tracking-[0.32em] ${eyebrowClass}`}>{eyebrow}</p>
      <h2 className={`max-w-5xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[3.2rem] ${titleClass}`}>
        {title}
      </h2>
      <p className={`max-w-3xl text-base leading-8 sm:text-[1.05rem] ${descriptionClass}`}>{description}</p>
    </div>
  );
}
