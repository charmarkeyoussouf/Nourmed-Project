import Link from "next/link";

import { getMarketingCopy } from "@/lib/marketing";
import type { Locale } from "@/lib/locale";

type NavigationProps = {
  locale: Locale;
};

export function Navigation({ locale }: NavigationProps) {
  const copy = getMarketingCopy(locale);
  const navigationLinks = copy.nav.links;

  return (
    <header className="sticky top-0 z-30 py-6">
      <div className="rounded-[2rem] border border-[rgba(61,110,82,0.12)] bg-[rgba(253,250,245,0.92)] px-5 py-4 shadow-[0_18px_48px_rgba(15,26,20,0.08)] backdrop-blur-xl sm:px-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="inline-flex flex-col">
            <span className="font-display text-[1.95rem] font-semibold leading-none text-accent">
              Nour<span className="text-[color:var(--color-gold)]">med</span>
            </span>
            <span className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.26em] text-muted">{copy.brand.descriptor}</span>
          </Link>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
            <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[0.82rem] font-medium uppercase tracking-[0.12em] text-foreground/70 transition hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <nav aria-label="Mobile navigation" className="flex flex-wrap items-center gap-4 md:hidden">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-foreground/70 transition hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-[2px] bg-accent px-5 py-3 text-[0.8rem] font-medium uppercase tracking-[0.12em] text-accent-contrast transition hover:bg-[#2a5238]"
            >
              {copy.nav.cta}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
