"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { DEPTHS, depthMeta, type Depth } from "@/data/depth";

// One store for the whole site, persisted per browser. Replaces the six-persona audience store
// and the Science reading-level store. Same module-store pattern as before.

const KEY = "pj-depth";
const OLD_AUDIENCE_KEY = "pj-audience";
const OLD_LEVEL_KEY = "pj-level";
let current: Depth | null = null;
const listeners = new Set<() => void>();

function fromOld(v: string | null): Depth | null {
  if (!v) return null;
  if (v === "kid" || v === "little") return "simple";
  if (v === "expert") return "expert";
  if (["overall", "homeowner", "legislator", "business", "adult"].includes(v)) return "normal";
  return null;
}

function read(): Depth {
  if (current === null) {
    try {
      const v = localStorage.getItem(KEY) as Depth | null;
      if (v && DEPTHS.includes(v)) current = v;
      else current = fromOld(localStorage.getItem(OLD_AUDIENCE_KEY)) ?? fromOld(localStorage.getItem(OLD_LEVEL_KEY)) ?? "normal";
    } catch {
      current = "normal";
    }
  }
  return current;
}
function write(v: Depth) {
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

/** The reader's chosen depth. The server renders "normal"; the client switches after hydration. */
export function useDepth(): [Depth, (d: Depth) => void] {
  const d = useSyncExternalStore(subscribe, read, () => "normal" as Depth);
  return [d, write];
}

/** The fork: the one choice on the story. Three large targets, the current one filled. */
export function DepthFork() {
  const [depth, setDepth] = useDepth();
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3" role="radiogroup" aria-label="How much do you want">
      {DEPTHS.map((d) => {
        const on = depth === d;
        const m = depthMeta[d];
        return (
          <button
            key={d}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => setDepth(d)}
            className="pj-press flex min-h-[64px] flex-col items-start justify-center rounded px-4 py-3 text-left"
            style={{ backgroundColor: on ? "#2e8b57" : "#ffffff", color: on ? "#ffffff" : "#003047", border: `2px solid ${on ? "#2e8b57" : "#d9d9d9"}` }}
          >
            <span className="text-[18px] font-black leading-tight">{m.label}</span>
            <span className="mt-0.5 text-[15px]" style={{ opacity: on ? 0.92 : 0.75 }}>{m.blurb}</span>
          </button>
        );
      })}
    </div>
  );
}

/** The small persistent switcher in the header. One control on screen, three behind it. */
export function DepthChip() {
  const [depth, setDepth] = useDepth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="pj-press inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-full px-4 text-[15px] font-bold"
        style={{ backgroundColor: "#ffffff", color: "#003047", border: "2px solid #2e8b57" }}
      >
        {depthMeta[depth].label}
        <span aria-hidden style={{ color: "#2e8b57" }}>{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <div className="pj-pop absolute right-0 z-[60] mt-2 w-[240px] rounded bg-white p-2 shadow-lg" style={{ border: "1px solid #d9d9d9" }} role="listbox" aria-label="Reading depth">
          {DEPTHS.map((d) => {
            const on = depth === d;
            return (
              <button
                key={d}
                type="button"
                role="option"
                aria-selected={on}
                onClick={() => {
                  setDepth(d);
                  setOpen(false);
                }}
                className="flex min-h-[44px] w-full flex-col items-start justify-center rounded px-3 text-left"
                style={{ backgroundColor: on ? "#eaf6ee" : "transparent", color: "#003047" }}
              >
                <span className="text-[15px] font-bold">{depthMeta[d].label}</span>
                <span className="text-[13px]" style={{ color: "#6b6b6b" }}>{depthMeta[d].blurb}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
