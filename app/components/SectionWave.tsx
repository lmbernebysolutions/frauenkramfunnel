type SectionCurveProps = {
  /** Farbe der folgenden Sektion (Füllung der Kurve) */
  fill: string;
};

/** Kurve am unteren Rand – ohne sichtbare Kante unten (Fill läuft über ViewBox hinaus). */
export function SectionCurveBottom({ fill }: SectionCurveProps) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden leading-[0]"
      aria-hidden="true"
    >
      <svg
        className="block h-10 w-full md:h-14"
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={fill}
          d="M0,32 C240,56 480,8 720,32 C960,56 1200,8 1440,32 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}

/** Kurve am oberen Rand – ohne sichtbare Kante oben. */
export function SectionCurveTop({ fill }: SectionCurveProps) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-10 overflow-hidden leading-[0]"
      aria-hidden="true"
    >
      <svg
        className="block h-10 w-full md:h-14"
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={fill}
          d="M0,24 C240,0 480,48 720,24 C960,0 1200,48 1440,24 L1440,-80 L0,-80 Z"
        />
      </svg>
    </div>
  );
}
