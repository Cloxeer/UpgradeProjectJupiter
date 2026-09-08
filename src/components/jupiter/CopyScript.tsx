"use client";

import { useState } from "react";
import { scriptText } from "@/lib/script";

/** Copies any text to the clipboard and says so. */
export function CopyTextButton({ text, label = "Copy", dark = false, small = false }: { text: string; label?: string; dark?: boolean; small?: boolean }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
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
      className={`inline-flex items-center gap-2 rounded font-black uppercase tracking-wide ${small ? "min-h-[36px] px-3 py-1 text-[12px]" : "min-h-[44px] px-5 py-2 text-[14px]"}`}
      style={{ backgroundColor: done ? "#2e8b57" : dark ? "#fdb715" : "#003047", color: done ? "#fff" : dark ? "#003047" : "#fff" }}
      aria-live="polite"
    >
      {done ? "Copied ✓" : label}
    </button>
  );
}

/** Copies the script to the clipboard and says so. */
export function CopyScriptButton({ dark = false }: { dark?: boolean }) {
  return <CopyTextButton text={scriptText()} label="Copy the script" dark={dark} />;
}
