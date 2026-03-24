import { arProductCopy } from "@/lib/product-copy/ar";
import { enProductCopy } from "@/lib/product-copy/en";
import { esProductCopy } from "@/lib/product-copy/es";
import { frProductCopy } from "@/lib/product-copy/fr";
import type { ProductCopy } from "@/lib/product-copy/types";
import { defaultLocale, type Locale } from "@/lib/locale";

const productCopy: Record<Locale, ProductCopy> = {
  en: enProductCopy,
  fr: frProductCopy,
  es: esProductCopy,
  ar: arProductCopy,
};

export function getProductCopy(locale: Locale = defaultLocale) {
  return productCopy[locale] ?? productCopy[defaultLocale];
}
