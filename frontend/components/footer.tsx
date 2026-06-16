import Link from "next/link";

import { getMarketingCopy } from "@/lib/marketing";
import type { Locale } from "@/lib/locale";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const copy = getMarketingCopy(locale);
  const navigationLinks = copy.nav.links;

  return (
    <footer className="pb-10">
      <div className="overflow-hidden rounded-[2.5rem] bg-foreground text-[rgba(255,255,255,0.62)] shadow-[0_30px_80px_rgba(15,26,20,0.16)]">
        <div className="grid gap-10 px-7 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-2xl">
            <Link href="/" className="inline-block">
              <span className="font-display text-[2rem] font-semibold leading-none text-white">
                Nour<span className="text-[color:var(--color-gold-soft)]">med</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xl text-sm leading-8 text-[rgba(255,255,255,0.62)]">{copy.footer.description}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[0.78rem] font-medium uppercase tracking-[0.16em] text-white">Services</h2>
            <nav aria-label="Footer services" className="flex flex-col gap-3 text-sm">
              {copy.shared.serviceOfferings.map((service) => (
                <Link key={service.slug} href={`/services#${service.slug}`} className="transition hover:text-white">
                  {service.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h2 className="text-[0.78rem] font-medium uppercase tracking-[0.16em] text-white">Company</h2>
            <nav aria-label="Footer navigation" className="flex flex-col gap-3 text-sm">
              {navigationLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" className="transition hover:text-white">
                {copy.footer.cta}
              </Link>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/8 px-7 py-5 text-sm text-[rgba(255,255,255,0.42)] sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p>
            &copy; {new Date().getFullYear()} Nourmed. {copy.footer.closing}
          </p>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[rgba(255,255,255,0.5)]">{copy.footer.ribbon}</p>
        </div>
      </div>
    </footer>
  );
}
