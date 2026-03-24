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
      <div className="rounded-[2.4rem] border border-[rgba(206,223,217,0.92)] bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(227,247,244,0.9),rgba(255,247,234,0.92))] px-5 py-5 shadow-[0_24px_70px_rgba(18,34,43,0.08)]">
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
              className="flex flex-wrap items-center gap-1 rounded-full border border-[rgba(206,223,217,0.92)] bg-[rgba(255,255,255,0.84)] px-2 py-2 shadow-[0_10px_20px_rgba(16,33,42,0.03)]"
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
                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#2a8f95,#3ba8a5)] px-6 py-3 text-sm font-semibold text-accent-contrast shadow-[0_14px_30px_rgba(42,143,149,0.28)] transition hover:brightness-95"
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
