"use client";

import { createContext, useContext, useState, useSyncExternalStore } from "react";

export type PlanMode = "theirs" | "ours";

const Ctx = createContext<[PlanMode, (m: PlanMode) => void] | null>(null);

/** One switch for the whole Blueprint page: their plan or the force-upgraded plan. */
export function PlanModeProvider({ children, initial = "ours" }: { children: React.ReactNode; initial?: PlanMode }) {
  const state = useState<PlanMode>(initial);
  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
}

export function usePlanMode(): [PlanMode, (m: PlanMode) => void] {
  const v = useContext(Ctx);
  // Outside a provider (e.g. a diagram embedded elsewhere) fall back to local state.
  const local = useState<PlanMode>("ours");
  return v ?? local;
}

export const OURS = "#2e8b57"; // our color: green, for the community and the environment
export const OURS_DARK = "#1f5f3a";
export const THEIRS = "#c0392b"; // their plan: red

// Remember whether the reader has ever used a plan switch, so the "click here" hint can retire itself.
const SW_KEY = "pj-switched";
let switched: boolean | null = null;
const swListeners = new Set<() => void>();
function readSwitched() {
  if (switched === null) {
    try {
      switched = localStorage.getItem(SW_KEY) === "1";
    } catch {
      switched = false;
    }
  }
  return switched;
}
export function markSwitched() {
  switched = true;
  try {
    localStorage.setItem(SW_KEY, "1");
  } catch {
    /* ignore */
  }
  swListeners.forEach((l) => l());
}
export function useSwitched() {
  return useSyncExternalStore((l) => { swListeners.add(l); return () => { swListeners.delete(l); }; }, readSwitched, () => true);
}

/** Bobbing "click here to switch" pointer that faces the toggle, until the reader has switched once. */
export function SwitchHint({ text = "Click here to switch", dir = "down" }: { text?: string; dir?: "down" | "up" }) {
  const done = useSwitched();
  if (done) return null;
  const cls = dir === "up" ? "pj-hint--up" : "pj-hint--down";
  return (
    <span className={`${cls} inline-flex flex-col items-center leading-none`} style={{ color: "#c0392b" }} aria-hidden>
      {dir === "up" && <span className="text-[15px]">▲</span>}
      <span className="text-[14px] font-black">{text}</span>
      {dir === "down" && <span className="text-[15px]">▼</span>}
    </span>
  );
}

/** Smooth-scroll a target into view on small screens, so a change made at the top is seen. */
export function revealOnMobile(selector: string) {
  if (typeof window === "undefined" || window.innerWidth >= 768) return;
  const el = document.querySelector(selector);
  if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
}

export function PlanSwitch({ labelTheirs = "Their plan", labelOurs = "Force-upgraded", big = false, scrollTo, hint = false }: { labelTheirs?: string; labelOurs?: string; big?: boolean; scrollTo?: string; hint?: boolean }) {
  const [mode, setMode] = usePlanMode();
  return (
    <span className="inline-flex flex-col items-center gap-1">
    {hint && <SwitchHint />}
    <div className={`inline-flex overflow-hidden rounded border ${big ? "border-2" : ""}`} style={{ borderColor: "#003047" }} role="tablist" aria-label="Their plan or force-upgraded plan (applies to the whole page)">
      {(["theirs", "ours"] as PlanMode[]).map((m) => (
        <button key={m} type="button" role="tab" aria-selected={mode === m} onClick={() => { setMode(m); markSwitched(); if (scrollTo) revealOnMobile(scrollTo); }} className={big ? "min-h-[48px] px-6 py-3 text-[15px] font-black uppercase" : "min-h-[40px] px-3 text-[13px] font-bold uppercase"} style={{ backgroundColor: mode === m ? (m === "ours" ? OURS : THEIRS) : "#fff", color: mode === m ? "#fff" : "#003047" }}>
          {m === "theirs" ? labelTheirs : labelOurs}
        </button>
      ))}
    </div>
    </span>
  );
}
