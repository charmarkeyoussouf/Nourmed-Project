import "server-only";

import { cookies } from "next/headers";
import { headers } from "next/headers";

import { localeCookieName, resolveLocale } from "@/lib/locale";

export async function getRequestLocale() {
  const cookieStore = await cookies();
  const cookieLocale = resolveLocale(cookieStore.get(localeCookieName)?.value);

  if (cookieStore.has(localeCookieName)) {
    return cookieLocale;
  }

  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language") ?? "";
  const preferredLocale = acceptLanguage
    .split(",")
    .map((entry) => entry.trim().split(";")[0]?.toLowerCase())
    .find((value) => value?.startsWith("fr") || value?.startsWith("es") || value?.startsWith("ar"));

  return resolveLocale(preferredLocale?.slice(0, 2));
}
