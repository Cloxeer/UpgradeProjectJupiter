"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

/*
  One thing open at a time, page-wide.
  Every fold, "show it" panel and "More" section registers with an id. Opening one closes whatever
  else is open and smoothly brings the opened thing into view under the sticky header.
*/
let current: string | null = null;
const listeners = new Set<() => void>();
function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

export function useOpenOne<T extends HTMLElement>(id: string): [boolean, (v: boolean) => void, React.RefObject<T | null>] {
  const open = useSyncExternalStore(subscribe, () => current === id, () => false);
  const ref = useRef<T | null>(null);
  const set = useCallback(
    (v: boolean) => {
      if (v) current = id;
      else if (current === id) current = null;
      listeners.forEach((l) => l());
      if (v) {
        // Only move the page if the opened thing is not already on screen; then glide, never jump.
        setTimeout(() => {
          const el = ref.current;
          if (!el) return;
          const r = el.getBoundingClientRect();
          const headerH = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
          const visible = r.top >= headerH && r.top <= window.innerHeight * 0.7;
          if (!visible) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 40);
      }
    },
    [id],
  );
  return [open, set, ref];
}
