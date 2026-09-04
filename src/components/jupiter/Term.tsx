"use client";

import { useState } from "react";
import { glossary, type GlossaryKey } from "@/data/glossary";
import { useAudience } from "./Audience";
import { Cite } from "@/components/Cite";

/**
 * A technical word with a tap-to-explain definition. In kid mode the plain phrase replaces the term.
 * Usage: <Term k="MW" /> or <Term k="MW">2,462 MW</Term>
 */
export function Term({ k, children }: { k: GlossaryKey; children?: React.ReactNode }) {
  const g = glossary[k];
  const [open, setOpen] = useState(false);
  const [audience] = useAudience();
  if (audience === "kid") {
    return (
      <span>
        {children ?? g.term} <span style={{ color: "#1f5f3a" }}>({g.kid})</span>
      </span>
    );
  }
  return (
    <span>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} title={g.short} className="cursor-help font-semibold" style={{ borderBottom: "1px dotted #2e8b57", color: "inherit", background: "none", padding: 0 }}>
        {children ?? g.term}
      </button>
      {open && (
        <span className="mx-1 inline-block rounded px-2 py-1 align-middle" style={{ backgroundColor: "#eaf6ee", color: "#1f5f3a", fontSize: 14, lineHeight: 1.4, maxWidth: 420 }}>
          <strong>{g.term}:</strong> {g.long}
          {g.sources && <Cite ids={g.sources} />}
          <button type="button" onClick={() => setOpen(false)} className="ml-2 font-bold underline" style={{ fontSize: 13 }}>
            close
          </button>
        </span>
      )}
    </span>
  );
}

/** "Words used on this page" box. */
export function Glossary({ keys, title = "Words used on this page" }: { keys: GlossaryKey[]; title?: string }) {
  return (
    <details className="mx-auto max-w-[900px] rounded border bg-white px-4 py-3" style={{ borderColor: "#cfe6d8" }}>
      <summary className="cursor-pointer text-[15px] font-bold uppercase" style={{ color: "#1f5f3a" }}>{title} · tap to open</summary>
      <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2" style={{ fontSize: 15, lineHeight: 1.5, color: "#3c3c3c" }}>
        {keys.map((k) => (
          <div key={k}>
            <dt className="font-black" style={{ color: "#003047" }}>{glossary[k].term}</dt>
            <dd>
              {glossary[k].long}
              {glossary[k].sources && <Cite ids={glossary[k].sources!} />}
            </dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
