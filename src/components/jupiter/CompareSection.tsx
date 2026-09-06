"use client";

import { compareRows } from "@/data/compare";
import { highlights as theirHighlights, whatIsParagraphs as theirParagraphs } from "@/data/jupiter";
import { useAudience, AudienceChip } from "./Audience";
import { useOpenOne } from "./OpenOne";
import { SourceList } from "@/components/Cite";
import { TheySay } from "./TheySay";
import { statIcons } from "./icons";
import { Linked } from "./Rich";

const G = "#2e8b57";
const R = "#c0392b";

function Row({ i }: { i: number }) {
  const r = compareRows[i];
  const [audience] = useAudience();
  const kid = audience === "kid";
  const [open, set, ref] = useOpenOne<HTMLDivElement>(`cmp-${r.id}`);
  const why = kid ? r.kidWhy : (r.voices?.[audience] ?? r.why);
  return (
    <div ref={ref} className="scroll-mt-32 rounded bg-white shadow-sm" style={{ border: `1px solid ${open ? G : "#e6e6e6"}` }}>
      <button type="button" onClick={() => set(!open)} aria-expanded={open} className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2 p-3 text-left sm:gap-4 sm:p-4">
        <div className="rounded px-2 py-2 text-center sm:px-3" style={{ backgroundColor: "#fff0ed" }}>
          <div className="font-black" style={{ fontSize: "clamp(20px,3vw,32px)", lineHeight: 1.05, color: R }}>{r.theirs.num}</div>
          <div className="mt-1 font-semibold" style={{ fontSize: "clamp(12px,1.2vw,15px)", lineHeight: 1.25, color: "#8e3b2f" }}>{r.theirs.tail}</div>
        </div>
        <div className="flex min-w-[84px] flex-col items-center text-center sm:min-w-[150px]">
          <div className="font-black" style={{ fontSize: "clamp(14px,1.4vw,17px)", lineHeight: 1.2, color: "#003047" }}>{kid ? r.kidLabel : r.label}</div>
          <div className="mt-1 text-[13px] font-bold" style={{ color: G }}>{open ? "hide ▲" : kid ? "how do we know? ▼" : "why ▼"}</div>
        </div>
        <div className="rounded px-2 py-2 text-center sm:px-3" style={{ backgroundColor: "#eaf6ee" }}>
          <div className="font-black" style={{ fontSize: "clamp(20px,3vw,32px)", lineHeight: 1.05, color: G }}>{r.ours.num}</div>
          <div className="mt-1 font-semibold" style={{ fontSize: "clamp(12px,1.2vw,15px)", lineHeight: 1.25, color: "#1f5f3a" }}>{r.ours.tail}</div>
        </div>
      </button>
      {open && (
        <div className="pj-reveal border-t px-4 pb-4 pt-3" style={{ borderColor: "#f0f0f0" }}>
          <p style={{ fontSize: kid ? 18 : 16, lineHeight: 1.6, color: "#3c3c3c" }}><Linked text={why} /></p>
          {!kid && <SourceList ids={r.sources} />}
        </div>
      )}
    </div>
  );
}

function TheirGrid() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
      {theirHighlights.map((h) => {
        const Icon = statIcons[h.icon];
        return (
          <div key={h.label} className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center rounded-full text-white" style={{ width: 56, height: 56, backgroundColor: "#15768c" }}>
              <Icon style={{ width: 30, height: 30 }} />
            </div>
            <div className="mt-2 font-black" style={{ fontSize: 26, lineHeight: 1.2, color: "#15768c" }}>{h.num}</div>
            <div className="mt-1 font-bold uppercase" style={{ fontSize: 14, lineHeight: 1.15, color: "#3c3c3c", maxWidth: 240 }}>{h.label}</div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Their number beside ours, six rows, no commentary in the row. The reason and the documents open on tap.
 * Replaces the What-is paragraphs, the eight highlight cards and the persona panel on the home page.
 */
export function CompareSection() {
  const [audience] = useAudience();
  const kid = audience === "kid";
  return (
    <section id="compare" className="scroll-mt-32" style={{ backgroundColor: "#fafafa" }}>
      <div className="pj-container py-10">
        <div className="mx-auto max-w-[1000px]">
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
            <h2 className="font-black" style={{ fontSize: "clamp(24px,3vw,34px)", lineHeight: 1.1, color: "#003047" }}>
              {kid ? "Their plan, our plan" : "What their plan says. What ours does."}
            </h2>
            <AudienceChip />
          </div>
          <div className="mt-4 grid grid-cols-[1fr_auto_1fr] gap-2 px-3 sm:gap-4 sm:px-4">
            <div className="text-center text-[13px] font-black uppercase" style={{ color: R }}>{kid ? "Their plan" : "As filed"}</div>
            <div className="min-w-[84px] sm:min-w-[150px]" />
            <div className="text-center text-[13px] font-black uppercase" style={{ color: G }}>{kid ? "Our plan" : "Upgraded"}</div>
          </div>
          <div className="mt-2 space-y-2">
            {compareRows.map((_, i) => (
              <Row key={compareRows[i].id} i={i} />
            ))}
          </div>
          <p className="mt-3 text-center text-[14px]" style={{ color: "#6b6b6b" }}>
            Same buildings, same fence, same schedule. Tap any row for the reason and the document behind it.
          </p>
          <TheySay label="Their website, in their own words">
            <TheirGrid />
            <div className="mt-6 space-y-4" style={{ fontSize: 16, lineHeight: 1.6 }}>
              {theirParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </TheySay>
        </div>
      </div>
    </section>
  );
}
