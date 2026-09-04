"use client";

import { LevelSwitch, useLevel, levelMeta } from "./Level";
import { topics } from "@/data/science-levels";
import { Cite, SourceList } from "@/components/Cite";
import { TheySay } from "./TheySay";
import { Tabs } from "./Tabs";
import { keyComponentTabs as theirComponents, impactTabs as theirImpact } from "@/data/jupiter";

/** Wraps the adult sections; renders the simple or expert view instead when the reader picks that level. */
export function ScienceLevels({ children }: { children: React.ReactNode }) {
  const [level] = useLevel();
  return (
    <>
      <div className="pj-container py-8">
        <div className="mb-3 text-center text-[14px] font-black uppercase tracking-wide" style={{ color: "#2e8b57" }}>How should we explain it?</div>
        <LevelSwitch />
        <p className="mt-3 text-center" style={{ fontSize: 15, color: "#6b6b6b" }}>
          Now showing: <strong>{levelMeta[level].label}</strong> · {levelMeta[level].short}. Their original sections stay one click below ours at every level.
        </p>
      </div>
      {level === "adult" && children}
      {(level === "little" || level === "kid") && <Simple level={level} />}
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
          <a key={t.id} href={t.blueprint} className="flex gap-4 rounded bg-white p-5 shadow-sm hover:shadow-md" style={{ borderLeft: "6px solid #2e8b57" }}>
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
