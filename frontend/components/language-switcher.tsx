"use client";

import { useEffect, useRef, useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import { isRtlLocale, localeCookieMaxAge, localeCookieName, localeOptions, type Locale } from "@/lib/locale";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
};

function persistLocale(nextLocale: Locale) {
  window.document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=${localeCookieMaxAge}; samesite=lax`;
  window.document.documentElement.lang = nextLocale;
  window.document.documentElement.dir = isRtlLocale(nextLocale) ? "rtl" : "ltr";
}

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const currentLocale = localeOptions.find((option) => option.value === locale) ?? localeOptions[0];

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleChange(nextLocale: Locale) {
    setIsOpen(false);
    persistLocale(nextLocale);

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={isPending}
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-panel-strong px-4 py-3 text-sm font-medium text-foreground shadow-[0_10px_20px_rgba(16,33,42,0.05)] transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span>{currentLocale.label}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className={`h-3 w-3 transition ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.25 4.5 6 8.25 9.75 4.5" />
        </svg>
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-[calc(100%+0.75rem)] z-30 min-w-[11rem] rounded-[1.35rem] border border-border bg-panel-strong p-2 shadow-[0_24px_50px_rgba(16,33,42,0.12)]">
          <ul role="listbox" aria-label={label} className="grid gap-1">
            {localeOptions.map((option) => {
              const isSelected = option.value === locale;

              return (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleChange(option.value)}
                    className={`flex w-full items-center justify-between rounded-[1rem] px-3 py-2.5 text-left text-sm transition ${
                      isSelected
                        ? "bg-accent text-accent-contrast"
                        : "text-foreground hover:bg-accent-soft hover:text-accent"
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected ? <span className="h-2 w-2 rounded-full bg-current" /> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
