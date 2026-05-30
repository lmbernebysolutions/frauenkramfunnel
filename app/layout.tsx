import type { Metadata } from "next";
import { Assistant, Inter } from "next/font/google";
import "./globals.css";

const headingFont = Assistant({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Frauenkram Funnel",
  description: "High-converting Funnel für Frauenkram.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen bg-coverCanvas text-erdton900 antialiased">{children}</body>
    </html>
  );
}
