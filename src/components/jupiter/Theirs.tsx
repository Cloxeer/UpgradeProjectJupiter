"use client";

import { useSyncExternalStore } from "react";

/** One site-wide switch: show or hide every "what they actually say" panel. Off by default to keep pages short. */
const KEY = "pj-theirs";
let current: boolean | null = null;
const listeners = new Set<() => void>();
function read(): boolean {
  if (current === null) {
    try {
      current = localStorage.getItem(KEY) === "1";
    } catch {
      current = false;
    }
  }
  return current;
}
function write(v: boolean) {
  current = v;
  try {
    localStorage.setItem(KEY, v ? "1" : "0");
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
export function useTheirs(): [boolean, (v: boolean) => void] {
  const v = useSyncExternalStore(subscribe, read, () => false);
  return [v, write];
}

/** The switch itself, styled to sit inside the red top banner. */
export function TheirsToggle() {
  const [on, set] = useTheirs();
  return (
    <button type="button" onClick={() => set(!on)} aria-pressed={on} className="ml-2 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-bold" style={{ fontSize: 13, backgroundColor: on ? "#ffffff" : "rgba(255,255,255,0.18)", color: on ? "#c0392b" : "#ffffff", border: "1px solid rgba(255,255,255,0.7)", whiteSpace: "nowrap" }}>
      <span aria-hidden>{on ? "●" : "○"}</span> {on ? "Their original text: shown" : "Show their original text"}
    </button>
  );
}
