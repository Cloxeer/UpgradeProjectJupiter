"use client";

import { useDepth } from "@/components/jupiter/Depth";
import { tierText, type Depth, type Tiered } from "@/data/depth";
import { Cite, SourceList } from "@/components/Cite";

/**
 * The guide's line at the reader's depth. Expert carries its sources inline; simple and normal keep the line
 * clean and tuck the same sources behind a small "Sources" dropdown, so citations are hidden but never lost.
 */
export function TieredText({ t, className = "", style, dark = false }: { t: Tiered; className?: string; style?: React.CSSProperties; dark?: boolean }) {
  const [depth] = useDepth();
  const text = tierText(depth, t);
  const cites = t.expert.cites;
  return (
    <div className="pj-swap" key={depth}>
      <p className={className} style={{ color: dark ? "rgba(255,255,255,0.9)" : "#1e2a30", ...style }}>
        {text}
        {depth === "expert" && cites.length > 0 && <Cite ids={cites} />}
      </p>
      {depth !== "expert" && cites.length > 0 && (
        <details className="mt-2">
          <summary className="inline-flex min-h-[36px] cursor-pointer items-center text-[13px] font-bold" style={{ color: dark ? "#fdb715" : "#15768c" }}>
            Sources ({cites.length})
          </summary>
          <div style={{ maxWidth: "62ch" }}>
            <SourceList ids={cites} dark={dark} />
          </div>
        </details>
      )}
    </div>
  );
}

/** Render children at every depth except one. */
export function NotAt({ depth: skip, children }: { depth: Depth; children: React.ReactNode }) {
  const [depth] = useDepth();
  return depth === skip ? null : <>{children}</>;
}
