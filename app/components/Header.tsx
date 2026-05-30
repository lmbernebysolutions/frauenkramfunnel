"use client";

import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#angebote", label: "Angebote" },
  { href: "#faq", label: "FAQ" },
] as const;

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-coverSand/80 bg-coverCanvas/95 shadow-[0_1px_0_rgba(43,19,7,0.04)] backdrop-blur-md">
      <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between gap-4 px-6 md:h-[84px] md:px-10">
        <Link
          href="/"
          className="inline-flex min-h-[48px] shrink-0 items-center py-1 pl-1 pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coverKhaki focus-visible:ring-offset-2 focus-visible:ring-offset-coverCanvas md:pl-2 md:pr-3"
        >
          <Image
            src="/images/balance-institut-logo.webp"
            alt="Balance Institut – Carsta Pröstler, Expertin für Haut und Wechseljahre"
            width={220}
            height={155}
            priority
            className="h-auto w-[118px] md:w-[140px]"
          />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-[48px] items-center rounded-full px-4 font-body text-sm text-erdton900/75 transition-colors duration-300 hover:bg-coverSand/50 hover:text-erdton900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coverKhaki focus-visible:ring-offset-2 focus-visible:ring-offset-coverCanvas"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#angebote"
          className="inline-flex min-h-[48px] shrink-0 items-center rounded-full border border-coverRosa/30 bg-coverRosa px-5 py-1 font-heading text-sm font-bold text-white shadow-sm transition-colors duration-300 hover:border-coverKhaki hover:bg-coverKhaki focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coverKhaki focus-visible:ring-offset-2 focus-visible:ring-offset-coverCanvas md:min-h-[52px] md:px-6 md:py-1.5"
        >
          Paket wählen
        </a>
      </div>
    </header>
  );
}
