export const defaultLocale = "en" as const;

export const localeOptions = [
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
  { value: "es", label: "Español" },
  { value: "ar", label: "العربية" },
] as const;

export const localeCookieName = "nourmed-locale";
export const localeCookieMaxAge = 60 * 60 * 24 * 365;

export type Locale = (typeof localeOptions)[number]["value"];

export function resolveLocale(value?: string | null): Locale {
  if (localeOptions.some((option) => option.value === value)) {
    return value as Locale;
  }

  return defaultLocale;
}

export function isRtlLocale(locale: Locale) {
  return locale === "ar";
}
