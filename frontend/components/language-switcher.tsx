"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { isRtlLocale, localeCookieMaxAge, localeCookieName, localeOptions, type Locale } from "@/lib/locale";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
};

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleChange(nextLocale: Locale) {
    document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=${localeCookieMaxAge}; samesite=lax`;
    document.documentElement.lang = nextLocale;
    document.documentElement.dir = isRtlLocale(nextLocale) ? "rtl" : "ltr";

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <label className="flex items-center gap-2 rounded-full border border-border bg-panel-strong px-3 py-2 text-sm text-muted">
      <span className="font-medium text-foreground">{label}</span>
      <select
        aria-label={label}
        value={locale}
        disabled={isPending}
        onChange={(event) => handleChange(event.target.value as Locale)}
        className="bg-transparent text-sm font-medium text-foreground outline-none"
      >
        {localeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
