"use client";

import { useState, useSyncExternalStore } from "react";

export type Audience = "overall" | "homeowner" | "legislator" | "business" | "kid" | "expert";
export const AUDIENCES: Audience[] = ["overall", "homeowner", "legislator", "business", "kid", "expert"];

export const audienceMeta: Record<Audience, { label: string; icon: string; short: string }> = {
  overall: { label: "Earth", icon: "🌍", short: "our air, water, land and people" },
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

/** Site-wide audience choice, persisted per browser. "overall" is the Earth voice, the default every first-time reader sees; the client switches after hydration. */
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
            <div style={{ fontSize: compact ? 40 : 56 }} aria-hidden>{m.icon}</div>
            <div className="mt-1 font-black" style={{ fontSize: compact ? 15 : 17, lineHeight: 1.15 }}>{m.label}</div>
            {!compact && <div className="mt-1 text-[13px]" style={{ opacity: 0.85 }}>{m.short}</div>}
          </button>
        );
      })}
    </div>
  );
}

/**
 * One small control instead of six tiles: "Explain this for: Earth". Opens the compact picker underneath.
 * Hick's law: one choice on screen, six behind it.
 */
export function AudienceChip({ align = "center" }: { align?: "center" | "start" }) {
  const [audience] = useAudience();
  const [open, setOpen] = useState(false);
  const m = audienceMeta[audience];
  return (
    <div className={`flex flex-col ${align === "center" ? "items-center" : "items-start"}`}>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-full px-4 text-[15px] font-bold" style={{ backgroundColor: "#fff", color: "#003047", border: "2px solid #2e8b57" }}>
        <span style={{ color: "#6b6b6b", fontWeight: 600 }}>Explain this for:</span>
        <span aria-hidden style={{ fontSize: 20 }}>{m.icon}</span>
        <span>{m.label}</span>
        <span aria-hidden style={{ color: "#2e8b57" }}>{open ? "▲" : "▾"}</span>
      </button>
      {open && (
        <div className="pj-reveal mt-2 w-full max-w-[720px] rounded bg-white p-3 shadow-md" style={{ border: "1px solid #e0e0e0" }} role="region" aria-label="Choose who this is explained for">
          <AudiencePicker compact />
          <p className="mt-2 text-center text-[13px]" style={{ color: "#6b6b6b" }}>Same facts and sources; only the words change. Your choice follows you to every page.</p>
        </div>
      )}
    </div>
  );
}
