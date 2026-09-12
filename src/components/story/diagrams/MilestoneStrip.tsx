"use client";

import { useState } from "react";
import { years } from "@/data/story";

/**
 * The eight milestone years from KNOWLEDGE.md §6. Every caption is always visible; tapping a year traces the
 * line up to it (the rail fills) and lifts that year's card. Nothing is hidden behind the interaction, so a
 * reader who never taps still reads the whole timeline.
 */
export function MilestoneStrip({ dark = false }: { dark?: boolean }) {
  const strip = years.strip;
  const [sel, setSel] = useState<number | null>(null);

  const ink = dark ? "#ffffff" : "#003047";
  const muted = dark ? "rgba(255,255,255,0.7)" : "#5d6a70";
  const rail = dark ? "rgba(255,255,255,0.28)" : "#c9d2d4";
  const body = dark ? "rgba(255,255,255,0.88)" : "#3c3c3c";

  return (
    <div>
      <ol className="grid grid-cols-4 gap-x-2 gap-y-8 sm:grid-cols-8" aria-label="Milestone years, tap one to trace the timeline">
        {strip.map((s, i) => {
          const filled = sel === null ? s.on : i <= sel;
          const active = i === sel;
          return (
            <li key={s.year} className="min-w-0">
              <button
                type="button"
                onClick={() => setSel(active ? null : i)}
                aria-pressed={active}
                className="pj-mile group block w-full text-left"
                style={{ cursor: "pointer" }}
              >
                {/* The rail segment for this year: green once the line has reached it. */}
                <span className="block h-[3px] w-full origin-left rounded-full" style={{ backgroundColor: filled ? "#2e8b57" : rail, transition: "background-color var(--dur-base) var(--ease-out)" }} />
                <span className="mt-2 flex items-center gap-1.5">
                  <span className="inline-block rounded-full" style={{ width: active ? 11 : 8, height: active ? 11 : 8, backgroundColor: filled ? "#2e8b57" : rail, transition: "all var(--dur-fast) var(--ease-out)" }} />
                  <span className="text-[20px] font-black leading-none" style={{ color: filled ? "#2e8b57" : ink, fontVariantNumeric: "tabular-nums" }}>{s.year}</span>
                </span>
                <span className="mt-1 block text-[13px] font-bold" style={{ color: muted, fontVariantNumeric: "tabular-nums" }}>{s.cal}</span>
                <span className="mt-2 block text-[14px]" style={{ color: body, lineHeight: 1.35, fontWeight: active ? 700 : 400 }}>{s.caption}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="mt-6 text-[13px]" style={{ color: muted }}>
        Tap a year to trace the line up to it. {sel !== null && (
          <button type="button" onClick={() => setSel(null)} className="pj-press font-bold underline" style={{ color: dark ? "#fdb715" : "#15768c" }}>
            Show the whole timeline
          </button>
        )}
      </p>
    </div>
  );
}
