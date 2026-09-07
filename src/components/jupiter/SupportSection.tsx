"use client";

import { Stamp } from "./Stamp";
import { FeasibilityList } from "./Feasibility";
import { WhatCanIDo } from "./WhatCanIDo";
import { useAudience } from "./Audience";

/** The six demands, each with a feasibility verdict, then the one thing a reader can do. */
export function SupportSection() {
  const [audience] = useAudience();
  const kid = audience === "kid";
  return (
    <section id="support" style={{ backgroundColor: "#ffffff" }}>
      <div className="pj-container py-12">
        <div className="mx-auto max-w-[900px]">
          <h2 className="text-center font-black" style={{ fontSize: "clamp(24px,3vw,32px)", lineHeight: 1.15, color: "#003047" }}>
            <Stamp kind="force">{kid ? "THE SIX IDEAS" : "THE SIX DEMANDS"}</Stamp>
          </h2>
          <p className="mt-2 text-center text-[15px]" style={{ color: "#6b6b6b" }}>
            {kid ? "Tap one. A green check means grown-ups already know how to do it." : "Tap one for the five checks: sold today, done at scale, cost, schedule, legal lever."}
          </p>
          <FeasibilityList />
          <div id="help-now" className="mt-10 scroll-mt-32">
            <h3 className="text-center font-black" style={{ fontSize: 22, color: "#003047" }}>{kid ? "What can you do?" : "What can I do?"}</h3>
            <div className="mt-4">
              <WhatCanIDo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
