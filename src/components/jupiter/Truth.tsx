"use client";

import { CLAIM, type ClaimLabel } from "@/data/claims";
import { useDepth } from "./Depth";

/** One small pill naming what kind of claim a number is. Inline, so nothing gets taller. Hidden on the simple tier. */
export function Truth({ label, dark = false }: { label?: ClaimLabel; dark?: boolean }) {
  const [depth] = useDepth();
  if (!label || depth === "simple") return null;
  const c = CLAIM[label];
  return (
    <span
      title={c.title}
      className="inline-block rounded px-1.5 align-middle text-[11px] font-black uppercase tracking-wide"
      style={{ backgroundColor: c.bg, color: c.fg, lineHeight: "16px", outline: dark && label === "fact" ? "1px solid rgba(255,255,255,0.5)" : undefined }}
    >
      {c.word}
    </span>
  );
}
