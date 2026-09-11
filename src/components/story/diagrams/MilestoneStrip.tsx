import { years } from "@/data/story";

/** The eight milestone years from KNOWLEDGE.md §6, drawn once, static. The two turning years are marked. */
export function MilestoneStrip({ dark = false }: { dark?: boolean }) {
  const ink = dark ? "#ffffff" : "#003047";
  const muted = dark ? "rgba(255,255,255,0.7)" : "#5d6a70";
  const line = dark ? "rgba(255,255,255,0.35)" : "#b9c0c2";
  return (
    <ol className="grid grid-cols-4 gap-x-2 gap-y-6 sm:grid-cols-8" aria-label="Milestone years">
      {years.strip.map((s) => (
        <li key={s.year} className="min-w-0" style={{ borderTop: `3px solid ${s.on ? "#2e8b57" : line}`, paddingTop: 8 }}>
          <div className="text-[20px] font-black leading-none" style={{ color: s.on ? "#2e8b57" : ink, fontVariantNumeric: "tabular-nums" }}>{s.year}</div>
          <div className="mt-1 text-[13px] font-bold" style={{ color: muted, fontVariantNumeric: "tabular-nums" }}>{s.cal}</div>
          <div className="mt-2 text-[14px]" style={{ color: dark ? "rgba(255,255,255,0.88)" : "#3c3c3c", lineHeight: 1.35 }}>{s.caption}</div>
        </li>
      ))}
    </ol>
  );
}
