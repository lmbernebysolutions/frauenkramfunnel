import type { Metadata } from "next";
import { Assistant, Tenor_Sans } from "next/font/google";
import AnalyticsGate from "@/app/components/AnalyticsGate";
import ConsentBanner from "@/app/components/ConsentBanner";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const headingFont = Assistant({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Tenor_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.legalName}`,
  },
  description:
    "Der ganzheitliche dermazeutische Ratgeber für ein gesundes Hautbild und hormonelle Balance in den Wechseljahren.",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen bg-coverCanvas text-erdton900 antialiased">
        <AnalyticsGate />
        {children}
        <ConsentBanner />
      </body>
    </html>
  );
}
