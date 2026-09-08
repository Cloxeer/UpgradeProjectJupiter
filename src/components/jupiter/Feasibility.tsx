"use client";

import { useOpenOne } from "./OpenOne";
import { demands, demandById, verdict, yesCount, CLAUSE_NOTE, type Demand } from "@/data/feasibility";
import { Cite, SourceList } from "@/components/Cite";
import { CopyTextButton } from "./CopyScript";
import { Truth } from "./Truth";
import { useAudience } from "./Audience";

const G = "#2e8b57";
const Y = "#d99a00";

/** Five dots, one per check: green for yes, yellow for partial. */
function Dots({ d, size = 10 }: { d: Demand; size?: number }) {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden>
      {d.checks.map((c) => (
        <span key={c.label} className="inline-block rounded-full" style={{ width: size, height: size, backgroundColor: c.status === "yes" ? G : Y }} />
      ))}
    </span>
  );
}

/** The open checklist: five rows, each with the reason and the document. */
function Checklist({ d, dark = false }: { d: Demand; dark?: boolean }) {
  const text = dark ? "rgba(255,255,255,0.9)" : "#3c3c3c";
  return (
    <div className="mt-2 rounded p-3" style={{ backgroundColor: dark ? "rgba(255,255,255,0.08)" : "#f7faf8", border: `1px solid ${dark ? "rgba(255,255,255,0.2)" : "#cfe6d8"}` }} role="region" aria-live="polite">
      {/* The gate first: what is verified, by whom, when, and what the lease does if it is missed. */}
      <p className="mb-2 rounded px-2 py-1.5" style={{ fontSize: 14, lineHeight: 1.5, color: text, backgroundColor: dark ? "rgba(0,0,0,0.2)" : "#fff" }}>
        <strong style={{ color: dark ? "#fff" : "#003047" }}>Gate: </strong>
        {d.gate.test} <span style={{ color: dark ? "rgba(255,255,255,0.7)" : "#6b6b6b" }}>· verified by</span> {d.gate.verifier} <span style={{ color: dark ? "rgba(255,255,255,0.7)" : "#6b6b6b" }}>· by</span> {d.gate.by}{" "}
        <span style={{ color: dark ? "rgba(255,255,255,0.7)" : "#6b6b6b" }}>· if missed:</span> {d.gate.ifMissed}
        <Cite ids={d.gate.sources} />
      </p>
      <ul className="space-y-2">
        {d.checks.map((c) => (
          <li key={c.label} className="flex gap-2" style={{ fontSize: 15, lineHeight: 1.5, color: text }}>
            <span className="mt-1 inline-block flex-shrink-0 rounded-full" style={{ width: 12, height: 12, backgroundColor: c.status === "yes" ? G : Y }} aria-hidden />
            <span>
              <strong style={{ color: dark ? "#fff" : "#003047" }}>{c.label}: </strong>
              <span className="font-bold" style={{ color: c.status === "yes" ? (dark ? "#9be3b6" : "#1f5f3a") : (dark ? "#ffd25e" : "#8a6200") }}>{c.status === "yes" ? "yes" : "partly"}. </span>
              <Truth label={c.claim} dark={dark} /> {c.note}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[13px]" style={{ color: dark ? "rgba(255,255,255,0.7)" : "#6b6b6b" }}>
        Green = yes. Yellow = partly, with the reason. Our assessment, from the documents listed.
      </p>
      <details className="mt-2 rounded px-2 py-1" style={{ backgroundColor: dark ? "rgba(0,0,0,0.2)" : "#fff", border: `1px solid ${dark ? "rgba(255,255,255,0.2)" : "#cfe6d8"}` }}>
        <summary className="cursor-pointer text-[14px] font-bold" style={{ color: dark ? "#fff" : "#1f5f3a" }}>Draft lease language (model text for counsel, not legal advice) ▾</summary>
        <p className="pt-2" style={{ fontSize: 14, lineHeight: 1.55, color: text }}>{d.clause}</p>
        <p className="pt-1 text-[12px]" style={{ color: dark ? "rgba(255,255,255,0.7)" : "#6b6b6b" }}>{CLAUSE_NOTE}</p>
        <div className="pb-1 pt-2">
          <CopyTextButton text={d.clause} label="Copy this clause" dark={dark} small />
        </div>
      </details>
      <SourceList ids={[...d.gate.sources, ...d.checks.flatMap((c) => c.sources)]} dark={dark} />
    </div>
  );
}

/**
 * The six demands with a feasibility verdict on each. Replaces a plain numbered list of demands:
 * the same five lines, each with a tap-to-open checklist. One open at a time.
 */
export function FeasibilityList({ dark = false }: { dark?: boolean }) {
  const [audience] = useAudience();
  const kid = audience === "kid";
  return (
    <ol className="mt-5 space-y-2">
      {demands.map((d, i) => (
        <Row key={d.id} d={d} i={i} dark={dark} kid={kid} />
      ))}
    </ol>
  );
}

function Row({ d, i, dark, kid }: { d: Demand; i: number; dark: boolean; kid: boolean }) {
  const [open, set, ref] = useOpenOne<HTMLLIElement>(`feas-${d.id}`);
  const n = yesCount(d);
  const v = verdict(d);
  const fg = dark ? "#fff" : "#003047";
  return (
    <li ref={ref} className="scroll-mt-32 rounded" style={{ border: `1px solid ${dark ? "rgba(255,255,255,0.2)" : "#e0e0e0"}`, backgroundColor: dark ? "transparent" : "#fff" }}>
      <button type="button" onClick={() => set(!open)} aria-expanded={open} className="flex min-h-[48px] w-full items-center gap-3 px-3 py-2 text-left">
        <span className="font-black" style={{ fontSize: 18, color: G, minWidth: 22 }}>{i + 1}</span>
        <span className="flex-1" style={{ fontSize: kid ? 17 : 16, lineHeight: 1.4, color: fg, fontWeight: 600 }}>{kid ? d.kidShort : d.short}</span>
        {!kid && (
          <span className="flex flex-shrink-0 flex-col items-end gap-0.5">
            <span className="rounded px-2 py-0.5 text-[12px] font-black uppercase tracking-wide" style={{ backgroundColor: n === 5 ? G : Y, color: n === 5 ? "#fff" : "#003047" }}>
              {v}
            </span>
            <span className="text-[12px] font-bold" style={{ color: dark ? "rgba(255,255,255,0.75)" : "#6b6b6b" }}>
              <Dots d={d} size={8} /> {n}/5 {open ? "▲" : "▼"}
            </span>
          </span>
        )}
        {kid && <span className="text-[18px]" aria-hidden>{n === 5 ? "✅" : "🟡"}</span>}
      </button>
      {open && !kid && (
        <div className="px-3 pb-3">
          <Checklist d={d} dark={dark} />
        </div>
      )}
      {open && kid && (
        <p className="px-3 pb-3" style={{ fontSize: 17, lineHeight: 1.5, color: fg }}>
          {n === 5 ? "Grown-ups already know how to do this, and it fits the plan." : "Grown-ups know how to do this. One part has not been done at this size before, so it needs care."}
        </p>
      )}
    </li>
  );
}

/**
 * One compact line for a Blueprint process card: verdict chip, dots, and a fold with the checklist.
 * Hidden for kids; the card already carries their one line.
 */
export function FeasibilityChip({ process }: { process: string }) {
  const [audience] = useAudience();
  const list = demands.filter((d) => d.process === process);
  if (audience === "kid" || list.length === 0) return null;
  return (
    <div className="mb-3 space-y-1">
      {list.map((d) => (
        <ChipRow key={d.id} d={d} />
      ))}
    </div>
  );
}

function ChipRow({ d }: { d: Demand }) {
  const [open, set, ref] = useOpenOne<HTMLDivElement>(`feaschip-${d.id}`);
  const n = yesCount(d);
  return (
    <div ref={ref} className="scroll-mt-32">
      <button type="button" onClick={() => set(!open)} aria-expanded={open} className="flex min-h-[40px] w-full flex-wrap items-center gap-2 rounded px-3 py-1.5 text-left" style={{ backgroundColor: "#f7faf8", border: "1px solid #cfe6d8" }}>
        <span className="text-[12px] font-black uppercase tracking-wide" style={{ color: "#1f5f3a" }}>Feasibility</span>
        <span className="rounded px-2 py-0.5 text-[12px] font-black uppercase tracking-wide" style={{ backgroundColor: n === 5 ? G : Y, color: n === 5 ? "#fff" : "#003047" }}>{verdict(d)}</span>
        <Dots d={d} />
        <span className="text-[13px]" style={{ color: "#3c3c3c" }}>
          {n} of 5 checks · <strong style={{ color: "#003047" }}>{d.short}</strong>
        </span>
        <span className="ml-auto text-[13px] font-bold" style={{ color: "#1f5f3a" }}>{open ? "hide ▲" : "see the checks ▼"}</span>
      </button>
      {open && <Checklist d={d} />}
    </div>
  );
}

export { demandById };
