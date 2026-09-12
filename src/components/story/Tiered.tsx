"use client";

import { useDepth } from "@/components/jupiter/Depth";
import { tierText, type Depth, type Tiered } from "@/data/depth";
import { Cite } from "@/components/Cite";

/** The guide's line at the reader's depth. Expert carries its sources inline. */
export function TieredText({ t, className = "", style, dark = false }: { t: Tiered; className?: string; style?: React.CSSProperties; dark?: boolean }) {
  const [depth] = useDepth();
  const text = tierText(depth, t);
  return (
    <p key={depth} className={`pj-swap ${className}`} style={{ color: dark ? "rgba(255,255,255,0.9)" : "#1e2a30", ...style }}>
      {text}
      {depth === "expert" && t.expert.cites.length > 0 && <Cite ids={t.expert.cites} />}
    </p>
  );
}

/** Render children at every depth except one. */
export function NotAt({ depth: skip, children }: { depth: Depth; children: React.ReactNode }) {
  const [depth] = useDepth();
  return depth === skip ? null : <>{children}</>;
}
