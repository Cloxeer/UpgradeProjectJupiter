"use client";

import { AudiencePicker, useAudience, audienceMeta } from "./Audience";
import { topics } from "@/data/science-levels";
import { Cite, SourceList } from "@/components/Cite";
import { TheySay } from "./TheySay";
import { Tabs } from "./Tabs";
import { keyComponentTabs as theirComponents, impactTabs as theirImpact } from "@/data/jupiter";
import { Glossary } from "./Term";

/** The problem and the fix for each topic, two lines each. Read first; the full sections follow. */
function ExecutiveCards() {
  return (
    <div className="pj-container pb-4">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t) => (
          <a key={t.id} href={t.blueprint} className="rounded bg-white p-4 shadow-sm hover:shadow-md" style={{ borderTop: "4px solid #2e8b57" }}>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 22 }} aria-hidden>{t.icon}</span>
              <h3 className="font-black" style={{ fontSize: 17, color: "#003047" }}>{t.title}</h3>
            </div>
            <p className="mt-2" style={{ fontSize: 14, lineHeight: 1.5, color: "#3c3c3c" }}>
              <strong style={{ color: "#c0392b" }}>As filed: </strong>{t.problem}
            </p>
            <p className="mt-1.5" style={{ fontSize: 14, lineHeight: 1.5, color: "#3c3c3c" }}>
              <strong style={{ color: "#1f5f3a" }}>The fix: </strong>{t.fix}
            </p>
            <span className="mt-2 inline-block text-[13px] font-bold underline" style={{ color: "#15768c" }}>See it drawn →</span>
          </a>
        ))}
      </div>
      <div className="mx-auto mt-4 max-w-[1100px]">
        <Glossary keys={["MW", "MGD", "tpy", "CO2e", "captureEfficiency", "brackish", "PSD", "TitleV", "nonattainment", "IRB", "CBA"]} />
      </div>
    </div>
  );
}

/** Wraps the adult sections; renders the simple or expert view instead when the reader picks that level. */
export function ScienceLevels({ children }: { children: React.ReactNode }) {
  // One site-wide choice, the same six readers as the Blueprint. Little kid gets pictures and one sentence; Expert gets the numbers.
  const [audience] = useAudience();
  const level: "little" | "adult" | "expert" = audience === "kid" ? "little" : audience === "expert" ? "expert" : "adult";
  return (
    <>
      <div className="pj-container py-8" id="science-who">
        <div className="mb-3 text-center text-[14px] font-black uppercase tracking-wide" style={{ color: "#2e8b57" }}>Who are you viewing as?</div>
        <div className="mx-auto max-w-[1000px]">
          <AudiencePicker compact revealSelector="#science-body" />
        </div>
        <p className="mt-3 text-center" style={{ fontSize: 15, color: "#6b6b6b" }}>
          Now showing: <strong>{audienceMeta[audience].label}</strong> · {audienceMeta[audience].short}. Their original sections stay one click below ours for every reader.
        </p>
      </div>
      <div id="science-body" className="scroll-mt-32" />
      {level !== "little" && <ExecutiveCards />}
      {level === "adult" && children}
      {level === "little" && <Simple level="little" />}
      {level === "expert" && (
        <>
          <Expert />
          {children}
        </>
      )}
    </>
  );
}

function Simple({ level }: { level: "little" | "kid" }) {
  return (
    <div className="pj-container pb-16">
      <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-4 sm:grid-cols-2">
        {topics.map((t) => (
          <a key={t.id} href={`/blueprint?spot=${t.id}&next=${encodeURIComponent(t.blueprint)}#site`} className="flex gap-4 rounded bg-white p-5 shadow-sm hover:shadow-md" style={{ borderLeft: "6px solid #2e8b57" }}>
            <div style={{ fontSize: level === "little" ? 56 : 40, lineHeight: 1 }} aria-hidden>{t.icon}</div>
            <div>
              <h3 className="font-black" style={{ fontSize: level === "little" ? 24 : 20, color: "#003047" }}>{t.title}</h3>
              <p className="mt-1" style={{ fontSize: level === "little" ? 20 : 16, lineHeight: 1.5, color: "#3c3c3c" }}>{level === "little" ? t.little : t.kid}</p>
              <span className="mt-2 inline-block text-[15px] font-bold underline" style={{ color: "#1f5f3a" }}>See the drawing →</span>
            </div>
          </a>
        ))}
      </div>
      <div className="mx-auto max-w-[1000px]">
        <TheySay label="What the company's website says, in their own words">
          <Tabs panels={theirImpact} />
          <div className="mt-6">
            <Tabs panels={theirComponents} />
          </div>
        </TheySay>
      </div>
    </div>
  );
}

function Expert() {
  return (
    <div className="pj-container pb-8">
      <div className="mx-auto max-w-[1000px] rounded bg-white p-5 shadow-sm" style={{ borderTop: "6px solid #003047" }}>
        <h3 className="font-black" style={{ fontSize: 20, color: "#003047" }}>The numbers, with units and sources</h3>
        <p className="mt-1" style={{ fontSize: 15, color: "#6b6b6b" }}>Every figure below is either from the cited document or labeled an estimate. The full sections follow.</p>
        <div className="mt-4 space-y-4">
          {topics.map((t) => (
            <div key={t.id}>
              <h4 className="font-bold" style={{ fontSize: 17, color: "#1f5f3a" }}>
                {t.icon} {t.title} <a href={t.blueprint} className="ml-2 text-[14px] font-bold underline" style={{ color: "#15768c" }}>drawing →</a>
              </h4>
              <ul className="mt-1 list-disc space-y-1 pl-5" style={{ fontSize: 15, lineHeight: 1.55, color: "#3c3c3c" }}>
                {t.expert.map((e) => (
                  <li key={e.line.slice(0, 30)}>
                    {e.line}
                    <Cite ids={e.sources} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <SourceList ids={Array.from(new Set(topics.flatMap((t) => t.expert.flatMap((e) => e.sources))))} />
      </div>
    </div>
  );
}
