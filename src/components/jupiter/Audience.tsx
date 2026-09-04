"use client";

import { useSyncExternalStore } from "react";

export type Audience = "overall" | "homeowner" | "legislator" | "business" | "kid" | "expert";
export const AUDIENCES: Audience[] = ["overall", "homeowner", "legislator", "business", "kid", "expert"];

export const audienceMeta: Record<Audience, { label: string; icon: string; short: string }> = {
  overall: { label: "Everyone", icon: "🌐", short: "the plain version" },
  homeowner: { label: "Homeowner or neighbor", icon: "🏠", short: "water, air, traffic, food" },
  legislator: { label: "Legislator or official", icon: "🏛️", short: "jobs, revenue, the record" },
  business: { label: "Business owner or investor", icon: "💼", short: "leases, water, heat, workforce" },
  kid: { label: "Little kid", icon: "🧒", short: "pictures and a few words" },
  expert: { label: "Expert", icon: "🔬", short: "every number, unit and source" },
};

const KEY = "pj-audience";
const LEVEL_KEY = "pj-level";
let current: Audience | null = null;
const listeners = new Set<() => void>();

function read(): Audience {
  if (current === null) {
    try {
      const v = localStorage.getItem(KEY) as Audience | null;
      current = v && AUDIENCES.includes(v) ? v : "overall";
    } catch {
      current = "overall";
    }
  }
  return current;
}
function write(v: Audience) {
  current = v;
  try {
    localStorage.setItem(KEY, v);
    // keep the Science reading level in step: kids read at kid level, experts at expert level
    localStorage.setItem(LEVEL_KEY, v === "kid" ? "kid" : v === "expert" ? "expert" : "adult");
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((l) => l());
}
function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

/** Site-wide audience choice, persisted per browser. Server renders "overall"; the client switches after hydration. */
export function useAudience(): [Audience, (a: Audience) => void] {
  const a = useSyncExternalStore(subscribe, read, () => "overall" as Audience);
  return [a, write];
}

/** Choose a variant for the current audience, falling back to `overall`. */
export function pick<T>(a: Audience, v: { overall: T } & Partial<Record<Audience, T>>): T {
  return (v[a] ?? v.overall) as T;
}

/** The row of audience squares, reused on the home page and the Blueprint. */
export function AudiencePicker({ compact = false, revealSelector }: { compact?: boolean; revealSelector?: string }) {
  const [audience, setAudience] = useAudience();
  const pickIt = (a: Audience) => {
    setAudience(a);
    if (revealSelector && typeof window !== "undefined" && window.innerWidth < 768) {
      const el = document.querySelector(revealSelector);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  };
  return (
    <div className={`grid grid-cols-3 gap-2 ${compact ? "xl:grid-cols-6" : "sm:grid-cols-3 lg:grid-cols-6 gap-3"}`} role="tablist" aria-label="Who are you viewing as">
      {AUDIENCES.map((a) => {
        const on = audience === a;
        const m = audienceMeta[a];
        return (
          <button key={a} type="button" role="tab" aria-selected={on} onClick={() => pickIt(a)} className={`flex flex-col items-center justify-center rounded text-center shadow-sm transition-transform hover:-translate-y-0.5 ${compact ? "p-2" : "aspect-square p-3"}`} style={{ backgroundColor: on ? "#2e8b57" : "#fff", color: on ? "#fff" : "#003047", border: `2px solid ${on ? "#003047" : "#e0e0e0"}` }}>
            <div style={{ fontSize: compact ? 24 : 34 }} aria-hidden>{m.icon}</div>
            <div className="mt-1 font-black" style={{ fontSize: compact ? 13 : 15, lineHeight: 1.15 }}>{m.label}</div>
            {!compact && <div className="mt-1 text-[13px]" style={{ opacity: 0.85 }}>{m.short}</div>}
          </button>
        );
      })}
    </div>
  );
}
