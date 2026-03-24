import Image from "next/image";
import Link from "next/link";

import { LanguageSwitcher } from "@/components/language-switcher";
import { getMarketingCopy } from "@/lib/marketing";
import type { Locale } from "@/lib/locale";

type NavigationProps = {
  locale: Locale;
};

export function Navigation({ locale }: NavigationProps) {
  const copy = getMarketingCopy(locale);

  return (
    <header className="sticky top-0 z-20 py-6 backdrop-blur-xl">
      <div className="rounded-[2.4rem] border border-[rgba(202,210,206,0.82)] bg-[rgba(247,241,232,0.88)] px-5 py-5 shadow-[0_24px_70px_rgba(18,34,43,0.08)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/nourmed-logo.png"
              alt="Nourmed"
              width={190}
              height={56}
              priority
              className="h-12 w-auto object-contain sm:h-[3.25rem]"
            />
            <div className="space-y-1">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-muted">{copy.brand.descriptor}</p>
            </div>
          </Link>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-5">
            <nav
              aria-label="Primary navigation"
              className="flex flex-wrap items-center gap-1 rounded-full border border-border bg-panel-strong px-2 py-2 shadow-[0_10px_20px_rgba(16,33,42,0.03)]"
            >
              {copy.nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-4 py-2.5 text-sm font-medium text-muted transition hover:bg-accent-soft hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <LanguageSwitcher locale={locale} label={copy.nav.languageLabel} />
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast shadow-[0_14px_30px_rgba(30,90,96,0.24)] transition hover:bg-[#184a52]"
              >
                {copy.nav.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
