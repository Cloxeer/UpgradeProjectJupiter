"use client";

import { useAudience } from "@/components/jupiter/Audience";
import { costTotals } from "@/data/blueprint";

// The three cost tiles under the table. The full technical lines stay for the expert reader;
// everyone else gets one plain sentence per tile (the numbers do not change, only the words).
export function CostTotals() {
  const [audience] = useAudience();
  const expert = audience === "expert";
  const kid = audience === "kid";
  const tiles = expert
    ? [
        { label: "Developer's share", value: costTotals.developer, sub: "against the $50B first-phase commitment ($165B is the bond ceiling)", color: "#c0392b" },
        { label: "Growers' share", value: costTotals.growers, sub: "private, off the developer's books", color: "#2e8b57" },
        { label: "Added to the project", value: costTotals.share, sub: "for capture, water, food, and 1,500 more jobs", color: "#003047" },
      ]
    : kid
      ? [
          { label: "What the company pays", value: "$3.4–3.9B", sub: "a small slice of the money they already promised to spend", color: "#c0392b" },
          { label: "What the farmers pay", value: "$0.47B", sub: "the greenhouse builders pay for their own greenhouses", color: "#2e8b57" },
          { label: "How big a slice", value: "~8 cents", sub: "of every dollar they promised for the first five years", color: "#003047" },
        ]
      : [
          { label: "Developer's share", value: "$3.4–3.9B", sub: "plus $640M more in payments over 30 years; the $165B bond cap is a ceiling, not cash in a bank", color: "#c0392b" },
          { label: "Growers' share", value: "$0.47B", sub: "the greenhouse builders pay this themselves, off the developer's books", color: "#2e8b57" },
          { label: "Added to the project", value: "~8%", sub: "of the $50 billion they promised for the first five years, about 8 cents per dollar, most of it repaid by the federal capture credit", color: "#003047" },
        ];
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {tiles.map((s) => (
        <div key={s.label} className="rounded bg-white p-5 text-center shadow-sm">
          <div className="text-[13px] font-bold uppercase tracking-wide" style={{ color: "#6b6b6b" }}>{s.label}</div>
          <div className="font-black" style={{ fontSize: 34, color: s.color }}>{s.value}</div>
          <div className="text-[15px]" style={{ color: "#3c3c3c" }}>{s.sub}</div>
        </div>
      ))}
    </div>
  );
}
