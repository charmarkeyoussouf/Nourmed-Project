import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8080";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nourmed | Cybersecurity Consulting for Small Businesses",
    template: "%s | Nourmed",
  },
  description:
    "Nourmed helps small businesses improve website security, compliance readiness, and recurring protection with practical cybersecurity consulting.",
  openGraph: {
    title: "Nourmed | Cybersecurity Consulting for Small Businesses",
    description:
      "Cybersecurity consulting for small businesses focused on secure websites, compliance readiness, vulnerability scanning, and practical ongoing protection.",
    url: siteUrl,
    siteName: "Nourmed",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="relative isolate overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-[-12rem] h-[24rem] bg-[radial-gradient(circle_at_top,rgba(31,90,96,0.2),transparent_58%)]" />
          <div className="pointer-events-none absolute right-[-8rem] top-[16rem] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(224,171,102,0.16),transparent_65%)]" />
          <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
            <Navigation />
            <main className="flex-1 pb-16">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
