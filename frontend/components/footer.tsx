import Image from "next/image";
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
    <footer className="py-10">
      <div className="rounded-[2.6rem] border border-[rgba(206,223,217,0.96)] bg-[linear-gradient(140deg,rgba(255,255,255,0.96),rgba(230,247,244,0.88),rgba(255,248,238,0.92))] px-7 py-8 shadow-[0_22px_55px_rgba(16,33,42,0.06)] sm:px-10 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <div className="max-w-2xl space-y-4">
            <Image
              src="/nourmed-logo.png"
              alt="Nourmed"
              width={190}
              height={56}
              className="h-11 w-auto object-contain sm:h-12"
            />
            <p className="text-sm leading-8 text-muted">{copy.footer.description}</p>
          </div>
          <div className="flex flex-col gap-5 lg:items-end">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <LanguageSwitcher locale={locale} label={copy.nav.languageLabel} />
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[rgba(206,223,217,0.96)] bg-[rgba(255,255,255,0.86)] px-6 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
              >
                {copy.footer.cta}
              </Link>
            </div>
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted lg:justify-end"
            >
              {copy.nav.links.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-accent">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Nourmed. {copy.footer.closing}
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">{copy.footer.ribbon}</p>
        </div>
      </div>
    </footer>
  );
}
