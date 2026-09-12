"use client";

import { useDepth } from "@/components/jupiter/Depth";
import { costTotals } from "@/data/blueprint";

// The three cost figures under the table. The technical lines for the expert reader; one plain sentence otherwise.
export function CostTotals() {
  const [depth] = useDepth();
  const tiles =
    depth === "expert"
      ? [
          { label: "Developer's share", value: costTotals.developer, sub: "against the $50B first-phase commitment ($165B is the bond ceiling)" },
          { label: "Growers' share", value: costTotals.growers, sub: "private, off the developer's books" },
          { label: "Added to the project", value: costTotals.share, sub: "for capture, water, food, and about 1,500 more jobs" },
        ]
      : [
          { label: "Developer's share", value: "$3.4-3.9B", sub: "plus $640M more in payments over 30 years; the $165B bond cap is a ceiling, not cash" },
          { label: "Growers' share", value: "$0.47B", sub: "the greenhouse builders pay this themselves" },
          { label: "Added to the project", value: "about 8%", sub: "of the $50 billion promised for the first five years, most of it repaid by the federal capture credit" },
        ];
  return (
    <dl className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
      {tiles.map((s) => (
        <div key={s.label} style={{ borderTop: "3px solid #003047", paddingTop: 12 }}>
          <dt className="text-[15px] font-bold" style={{ color: "#5d6a70" }}>{s.label}</dt>
          <dd className="mt-1 text-[26px] font-black" style={{ color: "#003047", lineHeight: 1.15, fontVariantNumeric: "tabular-nums" }}>{s.value}</dd>
          <dd className="mt-1 text-[15px]" style={{ color: "#3c3c3c", lineHeight: 1.5 }}>{s.sub}</dd>
        </div>
      ))}
    </dl>
  );
}
