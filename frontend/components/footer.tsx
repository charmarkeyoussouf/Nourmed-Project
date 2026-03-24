import Link from "next/link";

import { LanguageSwitcher } from "@/components/language-switcher";
import { getMarketingCopy } from "@/lib/marketing";
import type { Locale } from "@/lib/locale";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const copy = getMarketingCopy(locale);

  return (
    <footer className="py-8">
      <div className="rounded-[2rem] border border-border bg-panel px-6 py-6 shadow-[0_18px_36px_rgba(16,33,42,0.05)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl space-y-3">
            <p className="text-lg font-semibold tracking-tight text-foreground">Nourmed</p>
            <p className="text-sm leading-7 text-muted">{copy.footer.description}</p>
          </div>
          <div className="flex flex-col gap-4 lg:items-end">
            <LanguageSwitcher locale={locale} label={copy.nav.languageLabel} />
            <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-3 text-sm text-muted">
              {copy.nav.links.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-accent">
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-border bg-panel-strong px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
            >
              {copy.footer.cta}
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-border pt-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Nourmed. {copy.footer.closing}
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">{copy.footer.ribbon}</p>
        </div>
      </div>
    </footer>
  );
}
