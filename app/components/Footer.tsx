import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-coverSand bg-coverCanvas px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <Link
          href="/"
          className="inline-flex min-h-[48px] items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coverKhaki focus-visible:ring-offset-2 focus-visible:ring-offset-coverCanvas"
        >
          <Image
            src="/images/balance-institut-logo.webp"
            alt="Balance Institut – Carsta Pröstler"
            width={220}
            height={155}
            className="h-auto w-[140px] md:w-[160px]"
          />
        </Link>
        <nav aria-label="Rechtliches" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link
            href="/impressum"
            className="inline-flex min-h-[48px] items-center font-body text-sm text-erdton900/80 underline-offset-4 transition-colors duration-300 hover:text-erdton900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coverKhaki focus-visible:ring-offset-2 focus-visible:ring-offset-coverCanvas"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="inline-flex min-h-[48px] items-center font-body text-sm text-erdton900/80 underline-offset-4 transition-colors duration-300 hover:text-erdton900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coverKhaki focus-visible:ring-offset-2 focus-visible:ring-offset-coverCanvas"
          >
            Datenschutzerklärung
          </Link>
        </nav>
        <p className="font-body text-xs text-erdton900/60">© {year} Carsta Pröstler. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
}
