"use client";

import { useSyncExternalStore } from "react";

export type Level = "little" | "kid" | "adult" | "expert";
export const LEVELS: Level[] = ["little", "kid", "adult", "expert"];
export const levelMeta: Record<Level, { label: string; icon: string; short: string }> = {
  little: { label: "Little kid", icon: "🧸", short: "one picture, one sentence" },
  kid: { label: "Kid", icon: "🧒", short: "like you are ten" },
  adult: { label: "Adult", icon: "🧑", short: "the full sections" },
  expert: { label: "Expert", icon: "🔬", short: "numbers, units and sources" },
};

const KEY = "pj-level";
let current: Level | null = null;
const listeners = new Set<() => void>();
function read(): Level {
  if (current === null) {
    try {
      const v = localStorage.getItem(KEY) as Level | null;
      current = v && LEVELS.includes(v) ? v : "adult";
    } catch {
      current = "adult";
    }
  }
  return current;
}
function write(v: Level) {
  current = v;
  try {
    localStorage.setItem(KEY, v);
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

export function useLevel(): [Level, (l: Level) => void] {
  const l = useSyncExternalStore(subscribe, read, () => "adult" as Level);
  return [l, write];
}

export function LevelSwitch() {
  const [level, setLevel] = useLevel();
  return (
    <div className="mx-auto grid max-w-[760px] grid-cols-2 gap-3 sm:grid-cols-4" role="tablist" aria-label="Reading level">
      {LEVELS.map((l) => {
        const on = level === l;
        const m = levelMeta[l];
        return (
          <button key={l} type="button" role="tab" aria-selected={on} onClick={() => setLevel(l)} className="flex flex-col items-center rounded p-3 text-center shadow-sm transition-transform hover:-translate-y-0.5" style={{ backgroundColor: on ? "#2e8b57" : "#fff", color: on ? "#fff" : "#003047", border: `2px solid ${on ? "#1f5f3a" : "#e0e0e0"}` }}>
            <div style={{ fontSize: 30 }} aria-hidden>{m.icon}</div>
            <div className="mt-1 font-black" style={{ fontSize: 17 }}>{m.label}</div>
            <div className="text-[13px]" style={{ opacity: 0.85 }}>{m.short}</div>
          </button>
        );
      })}
    </div>
  );
}
