import { GUIDE } from "@/data/story";
import { TieredText } from "./Tiered";
import type { Tiered } from "@/data/depth";

/**
 * The guide's aside: a small portrait and the tiered line. The portrait is a placeholder slot until
 * a real photo of the author is added at public/images/jupiter/guide.jpg.
 */
export function Guide({ t, dark = false, size = "base" }: { t: Tiered; dark?: boolean; size?: "base" | "lg" }) {
  return (
    <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-4">
      <GuideMark dark={dark} />
      <TieredText t={t} dark={dark} style={{ fontSize: size === "lg" ? 20 : 18, lineHeight: 1.6, maxWidth: "62ch" }} />
    </div>
  );
}

export function GuideMark({ dark = false }: { dark?: boolean }) {
  return (
    <div
      aria-label={`${GUIDE.name}, ${GUIDE.role}`}
      role="img"
      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-[16px] font-black"
      style={{ backgroundColor: dark ? "rgba(255,255,255,0.14)" : "#003047", color: "#ffffff", border: dark ? "1px solid rgba(255,255,255,0.35)" : "none" }}
    >
      {GUIDE.name.charAt(0)}
    </div>
  );
}
