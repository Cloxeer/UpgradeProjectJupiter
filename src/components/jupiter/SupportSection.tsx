"use client";

import { Stamp } from "./Stamp";
import { FeasibilityList } from "./Feasibility";
import { WhatCanIDo } from "./WhatCanIDo";
import { steps } from "@/data/upgrade";
import { TheySay } from "./TheySay";
import { useCopy } from "./AudienceText";
import { useAudience } from "./Audience";

export function SupportSection() {
  const copy = useCopy();
  const [audience] = useAudience();
  const kid = audience === "kid";
  return (
    <section id="support" style={{ backgroundColor: "#fafafa" }}>
      <div className="pj-container py-16">
        <div className="mx-auto max-w-[900px]">
          <div className="rounded bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-center font-black" style={{ fontSize: 28, lineHeight: 1.2, color: "#003047" }}>
              <Stamp kind="force">THE FIVE DEMANDS</Stamp>
            </h2>
            <p className="mt-4 text-center" style={{ fontSize: 17, lineHeight: 1.6, color: "#3c3c3c" }}>
              {copy.supportLead}
            </p>
            <div className="mt-6">
              {!kid && (
                <p className="mt-3 text-center text-[14px]" style={{ lineHeight: 1.5, color: "#6b6b6b" }}>
                  How it happens: {steps.map((s, i) => (
                    <span key={s.n}>
                      <strong style={{ color: "#003047" }}>{s.n}.</strong> {s.who} {s.what.replace(/\.$/, "")}
                      {i < steps.length - 1 ? " · " : "."}
                    </span>
                  ))}
                </p>
              )}
            </div>
            <div className="mt-6">
              <div className="text-center text-[13px] font-black uppercase tracking-wide" style={{ color: "#2e8b57" }}>{kid ? "The five ideas, and whether grown-ups can do them" : "The five demands, and whether each one is doable"}</div>
              <p className="mt-1 text-center text-[14px]" style={{ color: "#6b6b6b" }}>{kid ? "Tap one. A green check means people already know how to do it." : "Tap a demand for the five checks: sold today, done at scale, cost, schedule, legal lever."}</p>
              <FeasibilityList />
            </div>
            <div className="mt-8">
              <h3 className="text-center font-black" style={{ fontSize: 22, color: "#003047" }}>{kid ? "What can you do to help?" : "What can I do to help?"}</h3>
              <div className="mt-3">
                <WhatCanIDo />
              </div>
            </div>
          </div>

          <TheySay label="Their support form — click to see it">
            <p className="mb-4" style={{ fontSize: 15 }}>
              This is the Oracle-funded Quorum advocacy widget embedded on the original site.
            </p>
            <div className="relative w-full overflow-hidden rounded bg-white shadow-sm">
              <iframe
                title="Show your support for Project Jupiter"
                src="https://projectjupiter.quorum.us/campaign/163224?embedded=true&widget_version=v2"
                className="w-full"
                style={{ minHeight: 640, border: "none" }}
                scrolling="no"
                loading="lazy"
              />
            </div>
          </TheySay>
        </div>
      </div>
    </section>
  );
}
