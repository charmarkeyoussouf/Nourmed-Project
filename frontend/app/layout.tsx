import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { getMarketingCopy } from "@/lib/marketing";
import { isRtlLocale } from "@/lib/locale";
import { getRequestLocale } from "@/lib/request-locale";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8080";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = getMarketingCopy(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: copy.meta.siteTitle,
      template: "%s | Nourmed",
    },
    description: copy.meta.siteDescription,
    openGraph: {
      title: copy.meta.siteTitle,
      description: copy.meta.siteOpenGraphDescription,
      url: siteUrl,
      siteName: "Nourmed",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const direction = isRtlLocale(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="relative isolate overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-[-12rem] h-[24rem] bg-[radial-gradient(circle_at_top,rgba(31,90,96,0.2),transparent_58%)]" />
          <div className="pointer-events-none absolute right-[-8rem] top-[16rem] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(224,171,102,0.16),transparent_65%)]" />
          <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
            <Navigation locale={locale} />
            <main className="flex-1 pb-16">{children}</main>
            <Footer locale={locale} />
          </div>
        </div>
      </body>
    </html>
  );
}
