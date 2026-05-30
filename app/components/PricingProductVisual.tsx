import Image from "next/image";

type PricingProductVisualProps = {
  variant: "guide" | "bundle";
};

const productAssets = {
  guide: {
    src: "/images/ratgeber-paket.webp",
    alt: "Frauenkram Ratgeber – Buchcover Haut und Wechseljahre",
    width: 1170,
    height: 1634,
    className: "h-auto w-[88px] md:w-[100px]",
  },
  bundle: {
    src: "/images/bundle-paket.webp",
    alt: "Regenerations-Bundle – Frauenkram Buch und Lovely Body Oil",
    width: 1024,
    height: 1024,
    className: "h-auto w-[120px] md:w-[140px]",
  },
} as const;

/** Produktvorschau in den Paket-Karten mit optimierten WebP-Mockups. */
export function PricingProductVisual({ variant }: PricingProductVisualProps) {
  const asset = productAssets[variant];

  return (
    <div className="mb-5 flex justify-center">
      <Image
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        className={`${asset.className} object-contain drop-shadow-md`}
      />
    </div>
  );
}
