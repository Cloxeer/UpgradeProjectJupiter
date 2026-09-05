"use client";

import { useState } from "react";
import { scriptText } from "@/lib/script";

/** Copies the script to the clipboard and says so. */
export function CopyScriptButton({ dark = false }: { dark?: boolean }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(scriptText());
      setDone(true);
      setTimeout(() => setDone(false), 2500);
    } catch {
      /* clipboard unavailable: the text is on screen to select */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-[44px] items-center gap-2 rounded px-5 py-2 text-[14px] font-black uppercase tracking-wide"
      style={{ backgroundColor: done ? "#2e8b57" : dark ? "#fdb715" : "#003047", color: done ? "#fff" : dark ? "#003047" : "#fff" }}
      aria-live="polite"
    >
      {done ? "Copied ✓" : "Copy the script"}
    </button>
  );
}
