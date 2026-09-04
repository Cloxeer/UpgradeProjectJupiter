"use client";

import { useId } from "react";
import { useAudience, type Audience } from "./Audience";
import { useOpenOne } from "./OpenOne";

/**
 * Sections folded behind a "More" button for the audiences listed; shown in full for everyone else.
 * The button stays put and toggles; the content glides in below it, and only one fold on the page is open at a time.
 */
export function MoreForAudience({ foldFor, label, children }: { foldFor: Audience[]; label: string; children: React.ReactNode }) {
  const [a] = useAudience();
  const id = useId();
  const [open, set, ref] = useOpenOne<HTMLDivElement>(`more-${id}`);
  if (!foldFor.includes(a)) return <>{children}</>;
  return (
    <div style={{ backgroundColor: "#fafafa" }}>
      <div ref={ref} className="pj-container scroll-mt-32 py-8 text-center">
        <button
          type="button"
          onClick={() => set(!open)}
          aria-expanded={open}
          className="min-h-[44px] rounded px-6 py-3 text-[14px] font-black uppercase tracking-wide transition-colors"
          style={{ backgroundColor: open ? "#2e8b57" : "#fff", color: open ? "#fff" : "#003047", border: "2px solid #2e8b57" }}
        >
          {open ? "Less" : "More"}: {label} {open ? "▲" : "▼"}
        </button>
        {!open && (
          <p className="mt-2" style={{ fontSize: 14, color: "#6b6b6b" }}>
            Folded to keep this page short. Pick &ldquo;Expert&rdquo; above to see everything at once.
          </p>
        )}
      </div>
      {open && <div className="pj-reveal">{children}</div>}
    </div>
  );
}
