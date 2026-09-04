"use client";

import { useId } from "react";
import { useOpenOne } from "./OpenOne";

/**
 * Panel holding Project Jupiter Together's original, verbatim content so readers can compare their claim
 * with the upgraded one directly above it. Closed by default; only one panel on the page is open at a time,
 * and opening one glides the page to it.
 */
export function TheySay({
  children,
  dark = false,
  label = "What Project Jupiter Together actually says",
  className = "",
}: {
  children: React.ReactNode;
  dark?: boolean;
  label?: string;
  className?: string;
}) {
  const id = useId();
  const [on, set, ref] = useOpenOne<HTMLDetailsElement>(`theysay-${id}`);
  if (!on) {
    return (
      <p className={`mt-4 text-center ${className}`} style={{ fontSize: 13, color: dark ? "rgba(255,255,255,0.55)" : "#9a9a9a" }}>
        Their original text for this section is hidden ·{" "}
        <button type="button" onClick={() => set(true)} className="inline px-1 py-2.5 font-bold underline" style={{ color: dark ? "#fdb715" : "#15768c" }}>
          show it
        </button>
      </p>
    );
  }
  return (
    <details ref={ref} open className={`pj-theysay pj-reveal scroll-mt-32 ${dark ? "pj-theysay--dark" : ""} ${className}`}>
      <summary
        onClick={(e) => {
          e.preventDefault();
          set(false);
        }}
      >
        {label}
        <span className="ml-auto text-[12px] font-bold normal-case tracking-normal opacity-80">hide ▲</span>
      </summary>
      <div className="pj-theysay__body">{children}</div>
    </details>
  );
}
