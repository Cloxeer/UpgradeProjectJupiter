"use client";

import { useState } from "react";
import { timelineYears } from "@/data/blueprint";
import { SourceList } from "@/components/Cite";
import { useAudience } from "@/components/jupiter/Audience";
import { timelineKid } from "@/data/blueprintVoices";

const YEARS = timelineYears.map((t) => t.year);

export function YearTimeline() {
  const [year, setYear] = useState(0);
  const t = timelineYears.find((x) => x.year === year) ?? timelineYears[0];
  const idx = YEARS.indexOf(year);
  const [audience] = useAudience();
  const isKid = audience === "kid";

  return (
    <div className="mx-auto max-w-[1000px]">
      <p className="mb-4 text-center" style={{ fontSize: isKid ? 19 : 16, lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>
        {isKid ? "Tap a year and see what your town is like by then." : "The same year marks as the net-gain section on the home page. Tap a year to see what is built, what is running, and what the county has in hand by then under the upgraded plan."}
      </p>
      <div className="mb-2 text-center text-[14px] font-bold uppercase" style={{ color: "#fdb715" }}>Year</div>
      <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
        {YEARS.map((y) => (
          <button key={y} type="button" onClick={() => setYear(y)} aria-pressed={year === y} className="rounded px-3 py-2 text-[14px] font-black sm:px-4" style={{ minWidth: 52, backgroundColor: year === y ? "#2e8b57" : "rgba(255,255,255,0.06)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)" }}>
            {y}
          </button>
        ))}
      </div>
      {/* progress rail */}
      <div className="mb-6 h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${((idx + 1) / YEARS.length) * 100}%`, backgroundColor: "#2e8b57" }} />
      </div>

      <div className="rounded p-5" style={{ backgroundColor: "rgba(255,255,255,0.06)", borderTop: "4px solid #2e8b57" }}>
        <div className="text-[14px] font-bold uppercase tracking-wide text-gold">
          Year {t.year} · {t.when}
        </div>
        {isKid ? (
          <p className="pj-fade mt-3" key={year} style={{ fontSize: 20, lineHeight: 1.55, color: "#ffffff" }}>{timelineKid[t.year]}</p>
        ) : (
        <>
        <div className="mt-3 rounded p-4" style={{ backgroundColor: "rgba(192,57,43,0.14)", borderLeft: "4px solid #c0392b" }}>
          <h3 className="font-bold" style={{ fontSize: 18, color: "#ff8f82" }}>Their plan, as filed, and the record</h3>
          <div className="mt-2 flex flex-wrap gap-1.5" role="tablist" aria-label="Their timeline">
            {YEARS.map((y) => (
              <button key={y} type="button" role="tab" aria-selected={year === y} onClick={() => setYear(y)} className="rounded px-2.5 py-1 text-[14px] font-black" style={{ backgroundColor: year === y ? "#c0392b" : "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,143,130,0.5)" }}>
                {y}
              </button>
            ))}
          </div>
          <p className="mt-2" style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.9)" }}>{t.facts}</p>
        </div>
        <h3 className="mt-5 font-bold" style={{ fontSize: 18, color: "#7fd19a" }}>Under the force-upgraded plan</h3>
        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { h: "Built", body: t.built },
            { h: "Running", body: t.running },
            { h: "In the county's hands", body: t.delivered },
          ].map((c) => (
            <div key={c.h}>
              <h3 className="font-bold text-white" style={{ fontSize: 18 }}>{c.h}</h3>
              <p className="mt-1" style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>{c.body}</p>
            </div>
          ))}
        </div>
        </>
        )}
        {!isKid && (
        <details className="mt-4 rounded border px-3 py-2" style={{ borderColor: "rgba(255,255,255,0.25)" }}>
          <summary className="cursor-pointer text-[14px] font-bold uppercase" style={{ color: "#fdb715" }}>Sources for the timeline</summary>
          <SourceList ids={["cba", "bocc", "sob", "cbd-well", "slo", "sourcenm-moratorium", "dailylobo", "nmpr-stay", "abq-stay", "abq-reports", "nmsu", "bloom-fuels"]} dark />
        </details>
        )}
      </div>
      <div className="mt-6 rounded p-4" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.18)" }}>
        <div className="text-[13px] font-black uppercase tracking-wide" style={{ color: "#fdb715" }}>See these same years elsewhere</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            { label: "Year-by-year cost on the home page ↗", href: "/#netloss" },
            { label: "Their plan vs. ours, side by side ↓", href: "#jupiter" },
            { label: "The upgrade, same schedule ↗", href: "/#speed" },
          ].map((l) => (
            <a key={l.href} href={l.href} className="rounded px-3 py-1.5 text-[14px] font-bold" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.35)" }}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <p className="pj-adult mt-3 text-center text-[14px]" style={{ color: "rgba(255,255,255,0.6)" }}>
        Cumulative water and payment figures are the plan&apos;s own targets multiplied by years, labeled &ldquo;about&rdquo;. Their dates (Q4 2026 first
        operations, Q3 2028 first phase, 2031 matching, 2045 HB93 net-zero) are from their filings.
      </p>
    </div>
  );
}
