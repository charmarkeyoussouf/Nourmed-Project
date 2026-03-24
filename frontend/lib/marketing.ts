import { defaultLocale, type Locale } from "@/lib/locale";
import { arMarketingCopy } from "@/lib/marketing-copy/ar";
import { enMarketingCopy } from "@/lib/marketing-copy/en";
import { esMarketingCopy } from "@/lib/marketing-copy/es";
import { frMarketingCopy } from "@/lib/marketing-copy/fr";
import type { MarketingCopy } from "@/lib/marketing-copy/types";

const marketingCopy: Record<Locale, MarketingCopy> = {
  en: enMarketingCopy,
  fr: frMarketingCopy,
  es: esMarketingCopy,
  ar: arMarketingCopy,
};

export function getMarketingCopy(locale: Locale = defaultLocale) {
  return marketingCopy[locale] ?? marketingCopy[defaultLocale];
}
