"use client";

import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { TheySay } from "./TheySay";
import { highlights as theirHighlights } from "@/data/jupiter";
import { highlightPairs } from "@/data/highlights";
import { statIcons } from "./icons";
import { SourceList } from "@/components/Cite";
import { useAudience } from "./Audience";
import { audiencePanels } from "@/data/audience";
import { useCopy } from "./AudienceText";

function TheirGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {theirHighlights.map((h) => {
        const Icon = statIcons[h.icon];
        return (
          <div key={h.label} className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center rounded-full text-white" style={{ width: 64, height: 64, backgroundColor: "#15768c" }}>
              <Icon style={{ width: 34, height: 34 }} />
            </div>
            <div className="mt-3 font-black" style={{ fontSize: 30, lineHeight: 1.2, color: "#15768c" }}>{h.num}</div>
            <div className="mt-1 font-bold uppercase" style={{ fontSize: 15, lineHeight: 1.15, color: "#3c3c3c", maxWidth: 240 }}>{h.label}</div>
          </div>
        );
      })}
    </div>
  );
}

export function HighlightsSection() {
  const [open, setOpen] = useState<number | null>(null);
  const [audience] = useAudience();
  const order = audiencePanels[audience].highlightsOrder;
  const copy = useCopy();

  return (
    <section id="highlights">
      <SectionHeading stamp="force">PROJECT JUPITER HIGHLIGHTS</SectionHeading>
      <div className="pj-container pb-16">
        <p className="mx-auto mb-8 max-w-[860px] text-center" style={{ fontSize: 16, lineHeight: 1.6, color: "#3c3c3c" }}>
          {copy.highlightsIntro}
        </p>
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {order.map((i) => {
            const base = highlightPairs[i];
            const v = audience === "legislator" || audience === "business" || audience === "kid" ? base.voices?.[audience] : undefined;
            const h = v ? { ...base, ours: { ...base.ours, label: v.label }, explain: v.explain ?? base.explain } : base;
            const Icon = statIcons[h.icon];
            const on = open === i;
            return (
              <div key={h.theirs.label} className={`flex flex-col rounded ${on ? "sm:col-span-2 lg:col-span-4" : ""}`} style={{ backgroundColor: on ? "#fff8f6" : "transparent", outline: on ? `2px solid ${h.color}` : "none", transition: "outline-color .2s" }}>
                <button type="button" onClick={() => setOpen(on ? null : i)} aria-expanded={on} className="flex w-full flex-col items-center p-3 text-center">
                  <div className="flex items-center justify-center rounded-full text-white" style={{ width: 96, height: 96, backgroundColor: h.color }}>
                    <Icon style={{ width: 52, height: 52 }} />
                  </div>
                  <div className="mt-4 font-black" style={{ fontSize: h.ours.num.length > 8 ? 30 : 44, lineHeight: 1.15, fontWeight: 900, color: h.color }}>
                    {h.ours.num}
                  </div>
                  <div className="mt-1 font-bold uppercase" style={{ fontSize: 16, lineHeight: 1.15, color: "#3c3c3c", maxWidth: 260 }}>
                    {h.ours.label}
                  </div>
                  <div className="mt-3 w-full max-w-[280px] rounded px-2 py-2" style={{ backgroundColor: "#fff0ed", border: "1px dashed #c0392b" }}>
                    <div className="text-[12px] font-bold uppercase" style={{ color: "#c0392b" }}>{audience === "kid" ? "What the company says" : "What they say"}</div>
                    <div className="font-black" style={{ fontSize: 20, lineHeight: 1.1, color: "#c0392b" }}>&ldquo;{h.theirs.num}&rdquo;</div>
                    <div className="text-[13px] font-semibold uppercase" style={{ lineHeight: 1.2, color: "#8e3b2f" }}>&ldquo;{h.theirs.label}&rdquo;</div>
                  </div>
                  <div className="mt-2 text-[14px] font-bold" style={{ color: h.color }}>{on ? "Hide the math ▲" : audience === "kid" ? "How do we know? ▼" : "Why? Tap for the math ▼"}</div>
                </button>

                {on && (
                  <div className="mx-3 mb-3 rounded bg-white p-4 shadow-sm" style={{ borderLeft: `6px solid ${h.color}` }} role="region">
                    <h3 className="font-bold" style={{ fontSize: 18, color: "#003047" }}>
                      {h.ours.num} <span style={{ color: "#6b6b6b", fontWeight: 500 }}>vs. their</span> &ldquo;{h.theirs.num}&rdquo;
                    </h3>
                    <p className="mt-2" style={{ fontSize: 17, lineHeight: 1.65, color: "#3c3c3c" }}>{h.explain}</p>
                    {h.math && audience !== "kid" && (
                      <p className="mt-3 rounded p-3 font-mono" style={{ fontSize: 15, backgroundColor: "#f4f4f4", color: "#003047", overflowWrap: "anywhere" }}>
                        {h.math}
                      </p>
                    )}
                    {audience !== "kid" && <SourceList ids={h.sources} />}
                    <button type="button" onClick={() => setOpen(null)} className="mt-3 text-[14px] font-bold underline" style={{ color: "#6b6b6b" }}>
                      close
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <TheySay label="Their original highlights, exactly as published">
          <TheirGrid />
        </TheySay>
      </div>
    </section>
  );
}
