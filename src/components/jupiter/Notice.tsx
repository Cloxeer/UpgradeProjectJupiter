"use client";

import { useSyncExternalStore } from "react";
import { banner, LAST_UPDATED } from "@/data/upgrade";

const BANNER_KEY = "pj-banner-hidden";
const listeners = new Set<() => void>();
function readHidden(): boolean {
  try {
    return sessionStorage.getItem(BANNER_KEY) === "1";
  } catch {
    return false;
  }
}
function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}
function hide() {
  try {
    sessionStorage.setItem(BANNER_KEY, "1");
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((l) => l());
}

/** The not-affiliated notice: one quiet line, dismissable for the visit. Lives under the hero, not in the sticky header. */
export function Notice({ dark = false }: { dark?: boolean }) {
  const hidden = useSyncExternalStore(subscribe, readHidden, () => false);
  if (hidden) return null;
  return (
    <div className="pj-container flex items-start justify-center gap-2 py-2 text-center text-[13px] leading-[1.4]" style={{ color: dark ? "rgba(255,255,255,0.75)" : "#6b6b6b" }}>
      <p className="m-0">
        {banner} <span style={{ whiteSpace: "nowrap", fontWeight: 700 }}>Updated {LAST_UPDATED}.</span>
      </p>
      <button type="button" onClick={hide} aria-label="Dismiss this notice" className="pj-inline -my-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full" style={{ fontSize: 18, lineHeight: 1, color: "inherit" }}>
        ×
      </button>
    </div>
  );
}
