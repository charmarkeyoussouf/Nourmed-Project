import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { getMarketingCopy } from "@/lib/marketing";
import { isRtlLocale } from "@/lib/locale";
import { getRequestLocale } from "@/lib/request-locale";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8080";

const bodyFont = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["300", "400", "500", "700"],
});

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"],
});

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
    <html lang={locale} dir={direction} className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="relative isolate overflow-hidden">
          <div className="mx-auto flex min-h-screen max-w-[90rem] flex-col px-5 sm:px-7 lg:px-10">
            <Navigation locale={locale} />
            <main className="flex-1 pb-24">{children}</main>
            <Footer locale={locale} />
          </div>
        </div>
      </body>
    </html>
  );
}
