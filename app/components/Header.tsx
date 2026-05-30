"use client";

import Link from "next/link";

const navLinks = [
  { href: "#angebote", label: "Angebote" },
  { href: "#faq", label: "FAQ" },
] as const;

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-coverSand/80 bg-coverCanvas/95 shadow-[0_1px_0_rgba(43,19,7,0.04)] backdrop-blur-md">
      <div className="mx-auto flex h-[68px] w-full max-w-6xl items-center justify-between gap-4 px-4 md:h-[76px] md:px-6">
        <Link
          href="/"
          className="group inline-flex min-h-[48px] flex-col justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coverKhaki focus-visible:ring-offset-2 focus-visible:ring-offset-coverCanvas"
        >
          <span className="font-heading text-lg font-bold leading-none tracking-wide text-erdton900 transition-colors duration-300 group-hover:text-coverSalbei md:text-xl">
            Frauenkram
          </span>
          <span className="font-body mt-1 text-[11px] tracking-[0.18em] text-erdton900/55 uppercase md:text-xs">
            Haut &amp; Wechseljahre
          </span>
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
          className="inline-flex min-h-[48px] shrink-0 items-center rounded-full border border-coverRosa/30 bg-coverRosa px-5 font-heading text-sm font-bold text-white shadow-sm transition-colors duration-300 hover:border-coverKhaki hover:bg-coverKhaki focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coverKhaki focus-visible:ring-offset-2 focus-visible:ring-offset-coverCanvas md:min-h-[52px] md:px-6"
        >
          Paket wählen
        </a>
      </div>
    </header>
  );
}
