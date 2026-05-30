import { colors } from "@/lib/design-tokens";

export function HexagonIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <polygon
        points="12,2 20,7 20,17 12,22 4,17 4,7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function ChevronIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M6 9L12 15L18 9"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function CircleBackdrop({
  className,
  color,
  opacity = 0.1,
}: {
  className?: string;
  color: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-full ${className ?? ""}`}
      style={{ backgroundColor: color, opacity }}
    />
  );
}

/** Zwei überlappende Kreise wie auf dem Buchcover. */
export function CoverCircleDuo({
  className,
  variant = "salbei",
  placement = "top-left",
}: {
  className?: string;
  variant?: "salbei" | "canvas";
  placement?: "top-left" | "bottom-right";
}) {
  const isSalbei = variant === "salbei";
  const greenColor = isSalbei ? colors.coverSalbeiDark : colors.coverSalbei;
  const greenOpacity = isSalbei ? 0.72 : 0.38;
  const rosaOpacity = isSalbei ? 0.78 : 0.52;

  if (placement === "bottom-right") {
    return (
      <div className={`pointer-events-none ${className ?? ""}`} aria-hidden="true">
        <div
          className="absolute bottom-0 right-0 h-[min(52vw,500px)] w-[min(52vw,500px)] max-h-[500px] max-w-[500px] translate-x-[22%] translate-y-[28%] rounded-full"
          style={{ backgroundColor: greenColor, opacity: greenOpacity }}
        />
        <div
          className="absolute bottom-0 right-[min(26vw,240px)] h-[min(46vw,440px)] w-[min(46vw,440px)] max-h-[440px] max-w-[440px] translate-y-[18%] rounded-full"
          style={{ backgroundColor: colors.coverRosa, opacity: rosaOpacity }}
        />
      </div>
    );
  }

  return (
    <div className={`pointer-events-none ${className ?? ""}`} aria-hidden="true">
      <div
        className="absolute left-0 top-0 h-[min(52vw,500px)] w-[min(52vw,500px)] max-h-[500px] max-w-[500px] -translate-x-[22%] -translate-y-[28%] rounded-full"
        style={{ backgroundColor: greenColor, opacity: greenOpacity }}
      />
      <div
        className="absolute left-[min(26vw,240px)] top-0 h-[min(46vw,440px)] w-[min(46vw,440px)] max-h-[440px] max-w-[440px] -translate-y-[18%] rounded-full"
        style={{ backgroundColor: colors.coverRosa, opacity: rosaOpacity }}
      />
    </div>
  );
}

/** Einzelner Salbei-Kreis – z. B. hinter Carstas Porträt. */
export function CoverGreenCircle({
  className,
  variant = "canvas",
}: {
  className?: string;
  variant?: "salbei" | "canvas";
}) {
  const isSalbei = variant === "salbei";

  return (
    <div className={`pointer-events-none ${className ?? ""}`} aria-hidden="true">
      <div
        className="absolute left-0 top-0 h-[min(48vw,420px)] w-[min(48vw,420px)] max-h-[420px] max-w-[420px] -translate-x-[18%] -translate-y-[22%] rounded-full"
        style={{
          backgroundColor: isSalbei ? colors.coverSalbeiDark : colors.coverSalbei,
          opacity: isSalbei ? 0.72 : 0.38,
        }}
      />
    </div>
  );
}

export function HexagonCluster({
  className,
  variant,
}: {
  className?: string;
  variant: "hero" | "pricing";
}) {
  if (variant === "hero") {
    return (
      <svg viewBox="0 0 280 220" className={className} aria-hidden="true">
        <polygon points="85,30 125,53 125,99 85,122 45,99 45,53" fill={colors.coverSand} />
        <polygon
          points="145,65 185,88 185,134 145,157 105,134 105,88"
          fill={colors.coverKhaki}
          className="hidden md:block"
        />
        <polygon
          points="205,30 245,53 245,99 205,122 165,99 165,53"
          fill={colors.coverSalbei}
          className="hidden md:block"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 240" className={className} aria-hidden="true">
      <polygon points="95,40 145,69 145,127 95,156 45,127 45,69" fill={colors.coverKhaki} opacity="0.8" />
      <polygon points="190,84 240,113 240,171 190,200 140,171 140,113" fill={colors.coverSand} opacity="0.65" />
      <polygon
        points="230,24 280,53 280,111 230,140 180,111 180,53"
        fill="none"
        stroke={colors.coverKhaki}
        strokeWidth="3"
      />
    </svg>
  );
}
