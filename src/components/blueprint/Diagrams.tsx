"use client";

import { useEffect, useRef, useState } from "react";
import {
  FENCE_OURS,
  HEAT_MW,
  IT_LOAD_MW,
  GH_PEAK_MW_PER_ACRE,
  DESAL_PREHEAT_MW,
  BRINE_CONCENTRATOR_MW,
  ABQ_LC_MT,
  CAPTURE_MAX_PENALTY,
  NMSU_COST_POINTS,
  NMSU_SYSTEM_MULTIPLIER,
  NMSU_RECOVERY,
  CRRUA_2027_MGD,
  SOLAR_CAPACITY_FACTOR,
  GH_JOBS_PER_ACRE,
  GH_LBS_PER_ACRE,
  GH_WATER_SAVED_GAL_PER_LB,
  GH_CO2_TONS_PER_ACRE,
  GH_LEASE_PER_ACRE_M,
  features,
  FENCE_THEIRS,
  CANVAS,
} from "@/data/blueprint";
import { Cite, SourceList } from "@/components/Cite";
import { Clickable, PartInfo, NewMarker, Cloud, Neighborhood } from "@/components/blueprint/Parts";
import { usePlanMode, PlanSwitch, OURS } from "@/components/blueprint/PlanMode";
import { Term } from "@/components/jupiter/Term";
import { useAudience, type Audience } from "@/components/jupiter/Audience";
import { kidSteps, takeaways, takeawayNotes } from "@/data/blueprintVoices";
import { GH_ACRES_PHASE1 } from "@/data/blueprint";
import { FeasibilityChip } from "@/components/jupiter/Feasibility";
import { processTM } from "@/data/tobyMoby";
import { TobyMoby } from "@/components/blueprint/TobyMoby";
import { humanHeat, tempRange, temp, pctOfBond, GAL_PER_HOME_DAY } from "@/lib/units";
import { useOpenOne } from "@/components/jupiter/OpenOne";

/*
  Performance notes
  - Every moving "particle" is ONE dashed path animated with stroke-dashoffset (CSS), not N moving elements.
  - Every fan is a static disc plus one blade group spun by a CSS transform (compositor-friendly, no per-frame JS).
  - A card only animates while it is on screen (IntersectionObserver adds/removes `pj-paused`).
  - Animation CSS lives with the component so a stale global stylesheet cannot disable it.
  - No canvas, no libraries, no timers, no per-frame JavaScript.
*/

type Mode = "theirs" | "ours";
const G = OURS;

const DIAGRAM_CSS = `
@keyframes pj-dots { to { stroke-dashoffset: -120px; } }
@keyframes pj-spin { to { transform: rotate(360deg); } }
@keyframes pj-blink { 0%,100% { opacity: 1; } 50% { opacity: .45; } }
.pj-anim .pj-dots { animation: pj-dots 3s linear infinite; }
.pj-anim .pj-fan { transform-box: view-box; animation: pj-spin 1s linear infinite; }
.pj-anim .pj-blink { animation: pj-blink 1.6s ease-in-out infinite; }
.pj-anim.pj-paused * { animation-play-state: paused !important; }
.pj-kid .pj-stats, .pj-kid .pj-cost, .pj-kid .pj-more, .pj-kid .pj-units, .pj-kid .pj-src, .pj-kid .pj-list, .pj-kid .pj-fine, .pj-lite .pj-fine { display: none !important; }
.pj-kid .pj-num { display: none !important; }
.pj-anim .pj-part:hover > * { filter: brightness(1.08); }
.pj-anim .pj-part-on > rect, .pj-anim .pj-part-on > path:first-child { stroke: #2e8b57; stroke-width: 3px; }
`;

function DiagramStyles() {
  return <style dangerouslySetInnerHTML={{ __html: DIAGRAM_CSS }} />;
}

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useInView<T extends HTMLElement>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "120px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

// ─── Shared UI ───────────────────────────────────────────────────────────────

function Slider({ label, value, min, max, step = 1, unit, onChange, disabled = false }: { label: string; value: number; min: number; max: number; step?: number; unit: string; onChange: (v: number) => void; disabled?: boolean }) {
  return (
    <label className="block" style={{ opacity: disabled ? 0.45 : 1 }}>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-[14px] font-bold uppercase tracking-wide" style={{ color: "#3c3c3c", lineHeight: 1.3 }}>{label}</span>
        <span className="ml-3 flex-shrink-0 font-black" style={{ fontSize: 18, color: "#003047" }}>
          {value.toLocaleString()} {unit}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} disabled={disabled} onChange={(e) => onChange(Number(e.target.value))} className="w-full" style={{ accentColor: G }} />
    </label>
  );
}

function Stat({ label, value, sub, color = "#003047" }: { label: string; value: string; sub?: React.ReactNode; color?: string }) {
  return (
    <div className="rounded bg-white p-3 shadow-sm">
      <div className="text-[13px] font-bold uppercase tracking-wide" style={{ color: "#6b6b6b" }}>{label}</div>
      <div className="font-black" style={{ fontSize: 22, lineHeight: 1.1, color }}>{value}</div>
      {sub && <div className="mt-0.5 text-[14px]" style={{ color: "#3c3c3c" }}>{sub}</div>}
    </div>
  );
}

function PlanToggle({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  void mode;
  void onChange;
  return <PlanSwitch hint />;
}

/** Winter / Summer pills, sized like the plan toggle so they sit in the same control row. */
function SeasonToggle({ season, onChange, labels = ["Winter night", "Summer day"] }: { season: "winter" | "summer"; onChange: (s: "winter" | "summer") => void; labels?: [string, string] }) {
  return (
    <div className="inline-flex overflow-hidden rounded border" style={{ borderColor: "#003047" }} role="tablist" aria-label="Season">
      {(["winter", "summer"] as const).map((s, i) => (
        <button key={s} type="button" role="tab" aria-selected={season === s} onClick={() => onChange(s)} className="min-h-[40px] px-3 text-[13px] font-bold uppercase" style={{ backgroundColor: season === s ? "#003047" : "#fff", color: season === s ? "#fff" : "#003047" }}>
          {labels[i]}
        </button>
      ))}
    </div>
  );
}

function CostStrip({ millions, label, who }: { millions: number; label: string; who: string }) {
  const dollars = millions >= 1000 ? `$${(millions / 1000).toFixed(1)}B` : `$${Math.round(millions)}M`;
  return (
    <div className="pj-cost mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 rounded px-3 py-2" style={{ backgroundColor: "#f4f4f4", fontSize: 15, color: "#3c3c3c" }}>
      <span className="font-bold uppercase text-[13px]" style={{ color: "#6b6b6b" }}>What this adds</span>
      <span><strong style={{ color: G }}>{dollars}</strong> {label}</span>
      <span>= <strong style={{ color: G }}>{pctOfBond(millions)}</strong> of the $165B bond<Cite ids={["cba"]} /></span>
      <span style={{ color: "#6b6b6b" }}>paid by {who}</span>
    </div>
  );
}

type Voices = Partial<Record<Audience, string>>;

function Card({ title, kicker, children, intro, kid, sources, mode, onMode, voices, tools }: { title: string; kicker: string; children: React.ReactNode; intro: React.ReactNode; kid: string; sources: string[]; mode: Mode; onMode: (m: Mode) => void; voices?: Voices; tools?: React.ReactNode }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [audience] = useAudience();
  const isKid = audience === "kid";
  const voice = voices?.[audience];
  const [more, setMore, moreRef] = useOpenOne<HTMLDivElement>(`read-${kicker}`);
  const showFine = audience === "expert";
  const [big, setBig] = useState(false);
  useEffect(() => {
    if (!big) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBig(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [big]);
  // The label already says "Net gain for humanity", so drop that prefix from the sentence itself (text is otherwise verbatim).
  const point = (takeaways[kicker]?.[audience] ?? kid).replace(/^Net gain for humanity:\s*/i, "").replace(/^Your takeaway:\s*/i, "");
  const pointLabel = audience === "overall" || audience === "expert" ? "Net gain for humanity" : audience === "kid" ? "The big idea" : "Why it matters to you";
  const header = (
    <div className="md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-6">
    <div className="min-w-0">
      <div className="text-[13px] font-bold uppercase tracking-wide" style={{ color: G }}>{kicker}</div>
      <h3 className="mt-1 font-bold" style={{ fontSize: 24, lineHeight: 1.15, color: "#003047" }}>{title}</h3>
      {/* The one line this reader wants, right under the title. It replaces the old "key takeaway" box. */}
      <p key={audience} className="pj-fade mt-2 mb-3 rounded px-3 py-2" style={{ backgroundColor: "#eaf6ee", borderLeft: "5px solid #2e8b57", fontSize: isKid ? 18 : 16, lineHeight: 1.5, color: "#003047" }}>
        <span className="mr-1 text-[12px] font-black uppercase tracking-wide" style={{ color: "#1f5f3a" }}>{pointLabel} ·</span>
        <strong>{point}</strong>
      </p>
      <FeasibilityChip process={kicker} />
      {!isKid && takeawayNotes[kicker] && (
        <details name="pj-one" className="-mt-2 mb-3 rounded px-3 py-1" style={{ backgroundColor: "#eaf6ee" }}>
          <summary className="cursor-pointer text-[14px] font-bold" style={{ color: "#1f5f3a" }}>How can heat make cooling? And is there a winter here? ▾</summary>
          <p className="pb-2 pt-1" style={{ fontSize: 15, lineHeight: 1.5, color: "#1f5f3a" }}>{takeawayNotes[kicker]}</p>
        </details>
      )}
    </div>
      {/* Toolbar: every control for this card in one place, beside the title on wide screens, under it on phones. */}
      <div className="mb-3 flex flex-wrap items-end gap-2 md:mb-0 md:flex-col md:items-end md:pt-1">
        <div className="flex flex-wrap items-end gap-2">
          {tools}
          <PlanToggle mode={mode} onChange={onMode} />
        </div>
        <button type="button" onClick={() => setBig((v) => !v)} className="min-h-[40px] min-w-[40px] rounded border px-3 text-[13px] font-bold uppercase" style={{ borderColor: "#003047", color: big ? "#fff" : "#003047", backgroundColor: big ? "#003047" : "#fff" }} aria-pressed={big} aria-label={big ? "Close enlarged view" : "Make bigger"}>
          {big ? "✕" : "⤢"} <span className={big ? "" : "hidden sm:inline"}>{big ? "Close" : "Make bigger"}</span>
        </button>
      </div>
    </div>
  );
  // The fold lives inside the same flex column as the drawing; CSS `order` sends the numbers, costs and
  // fine print below the "Read more" button, so opening it never shifts what is already on screen.
  // The anchor sits where the "Read more" button is; opening scrolls to it (so the stats appear below it, in place)
  // and closing returns to it, instead of dropping the reader onto the next process.
  const closeMore = () => {
    setMore(false);
    setTimeout(() => {
      const el = moreRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const headerH = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      if (r.top < headerH || r.top > window.innerHeight * 0.7) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  };
  const fold = !isKid && (
    audience === "expert" || more ? (
      <div className="pj-late pj-reveal mt-3 rounded border px-4 py-3" style={{ borderColor: "#e0e0e0" }}>
        {voice && audience !== "expert" && audience !== "overall" && (
          <p className="mb-3" style={{ fontSize: 16, lineHeight: 1.65, color: "#1f3a2a" }}>{voice}</p>
        )}
        <div style={{ fontSize: 15, lineHeight: 1.65, color: "#3c3c3c" }}>{intro}</div>
        {audience !== "expert" && (
          <p className="mt-3 rounded p-3" style={{ backgroundColor: "#fff8e6", fontSize: 15, lineHeight: 1.55, color: "#3c3c3c" }}>
            <strong>If you are ten:</strong> {kid}
          </p>
        )}
        {audience !== "expert" && (
          <button type="button" onClick={closeMore} className="mt-2 min-h-[44px] text-[14px] font-bold underline" style={{ color: "#6b6b6b" }}>
            Show less ▲
          </button>
        )}
      </div>
    ) : (
      <button type="button" onClick={() => setMore(true)} className="pj-foldbtn mt-3 min-h-[44px] w-full rounded border px-4 text-[15px] font-bold" style={{ borderColor: "#003047", color: "#003047", backgroundColor: "#fff" }}>
        Read more: the numbers, the cost, and how it works ▼
      </button>
    )
  );
  const body = (
    <>
      <ClickHint />
      <div className="pj-scroll">
        {children}
        <div ref={moreRef} className="pj-foldanchor scroll-mt-32" aria-hidden />
        {fold}
      </div>
    </>
  );
  return (
    <div ref={ref} className={`pj-anim rounded bg-white p-4 shadow-sm sm:p-6 ${inView ? "" : "pj-paused"} ${isKid ? "pj-kid" : ""} ${audience === "homeowner" || audience === "legislator" || audience === "business" ? "pj-lite" : ""} ${!isKid && audience !== "expert" && !more ? "pj-fold" : ""}`} style={{ borderTop: `6px solid ${mode === "ours" ? G : "#c0392b"}` }}>
      <DiagramStyles />
      {header}
      {big ? (
        <div className="pj-anim pj-bigwrap fixed inset-0 z-[100] overflow-auto bg-white p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={`${title}, enlarged`}>
          <div className="mx-auto max-w-[1400px]">
            {header}
            <p className="pj-swipe-cue mb-2 flex items-center justify-center gap-2 rounded px-3 py-2 text-[14px] font-bold sm:hidden" style={{ backgroundColor: "#fff8e6", color: "#8a6a00" }}>
              <span aria-hidden>◀</span> Only the drawing slides. Swipe it, or turn your phone sideways. <span aria-hidden>▶</span>
            </p>
            {body}
          </div>
        </div>
      ) : (
        body
      )}
      {/* Little kids: the steps as pills, then Toby & Moby. Everyone else already has the one line under the title. */}
      {isKid && (
      <div key={audience} className="pj-fade mt-4 rounded p-4" style={{ backgroundColor: "#eaf6ee", borderLeft: "6px solid #2e8b57" }}>
        {isKid && kidSteps[kicker] && (
          <ol className="mt-3 flex flex-wrap gap-2">
            {kidSteps[kicker].map((st, i) => (
              <li key={st} className="rounded-full px-4 py-2 font-black" style={{ backgroundColor: "#fff", color: "#1f5f3a", fontSize: 16, border: "2px solid #2e8b57" }}>
                {i + 1}. {st}
              </li>
            ))}
          </ol>
        )}
        {isKid && processTM[kicker] && (
          <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
            <TobyMoby chat={processTM[kicker]} />
          </div>
        )}
      </div>
      )}
      <p className="pj-adult mt-3 text-[14px]" style={{ color: "#6b6b6b" }}>
        {isKid ? "Want more detail?" : audience === "expert" ? "Want it simpler?" : "Not written for you?"}{" "}
        <a href="#questions" className="pj-btn inline-flex items-center font-bold underline" style={{ color: "#15768c" }}>
          Change reader ↑
        </a>
      </p>
      {showFine && (
      <p className="pj-units mt-3 text-[14px]" style={{ color: "#6b6b6b" }}>
        Units: <Term k="MW" /> is a megawatt, a rate of power (1 MW ≈ 38 home furnaces of heat, or the electricity of about 750 homes). <Term k="MGD" /> is
        million gallons a day. <Term k="tpy">tons/yr</Term> is tons per year. Tap any underlined word for the full definition; the glossary at the top of the
        processes has the rest.
      </p>
      )}
      <details name="pj-one" className="pj-src mt-3 rounded border px-3 py-2" style={{ borderColor: "#e0e0e0" }}>
        <summary className="cursor-pointer text-[14px] font-bold uppercase" style={{ color: "#15768c" }}>Sources for this process ({sources.length})</summary>
        <SourceList ids={sources} />
      </details>
    </div>
  );
}

const COLOR_WORDS: Record<string, string> = { "#2e8b57": "green", "#1f7ae0": "blue", "#6f8f9a": "gray", "#003047": "dark blue", "#9aa5ad": "light gray", "#c0392b": "red", "#e07b00": "orange" };
const plainLabel = (l: string) => l.replace(/\s*\([^)]*\)/g, "").replace(/\s+MW$/i, "").trim();
const shareWords = (pct: number) => (pct <= 0.5 ? "nothing" : pct >= 60 ? "most of it" : pct >= 25 ? "a big piece" : pct >= 5 ? "a small piece" : "a tiny sliver");

/** A stacked bar plus a sentence that says what the bar is, so nobody has to guess what the colors mean. */
function Bar({ parts, total, what }: { parts: { label: string; value: number; color: string }[]; total: number; what?: string }) {
  const [audience] = useAudience();
  const kid = audience === "kid";
  return (
    <div>
      {what && (
        <p className="mb-1 text-[13px] font-bold uppercase tracking-wide" style={{ color: "#6b6b6b" }}>This bar is {what}</p>
      )}
      <div className="flex h-8 w-full overflow-hidden rounded" title={what ? `The full width is ${what}; each color is that part's share: ${parts.map((p) => `${plainLabel(p.label)} ${Math.round((p.value / total) * 100)}%`).join(", ")}.` : undefined}>
        {parts.map((p) => (
          <div key={p.label} title={`${p.label}: ${Math.round(p.value).toLocaleString()}`} className="transition-all duration-500" style={{ width: `${Math.max(0, (p.value / total) * 100)}%`, backgroundColor: p.color }} />
        ))}
      </div>
      <div className="pj-num mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[14px]" style={{ color: "#3c3c3c" }}>
        {parts.map((p) => (
          <span key={p.label} className="flex items-center gap-1">
            <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: p.color }} />
            {p.label}: <strong>{Math.round(p.value).toLocaleString()}</strong>
          </span>
        ))}
      </div>
      {what && kid && (
        <p className="mt-2" style={{ fontSize: 17, lineHeight: 1.55, color: "#1f5f3a" }}>
          {parts.map((p) => `The ${COLOR_WORDS[p.color] ?? "colored"} part is ${plainLabel(p.label).toLowerCase()}: ${shareWords((p.value / total) * 100)}.`).join(" ")}
        </p>
      )}
    </div>
  );
}

function ClickHint() {
  const [audience] = useAudience();
  if (audience === "kid") {
    return (
      <p className="mb-2 flex items-center gap-2 font-bold" style={{ fontSize: 17, color: "#1f5f3a" }}>
        <span className="pj-shake" aria-hidden>!</span>
        <span>Tap the picture. Every part tells you what it is.</span>
      </p>
    );
  }
  return (
    <p className="mb-2 flex items-center gap-2 text-[14px]" style={{ color: "#6b6b6b" }}>
      <span className="pj-shake" aria-hidden>!</span>
      <span>
        <strong style={{ color: G }}>Tap any part of the drawing</strong> for what it is and a photo. <span className="rounded px-1 text-[12px] font-black text-white" style={{ backgroundColor: G }}>NEW</span> marks what the upgrade adds.
      </span>
    </p>
  );
}

// ─── Schematic primitives ────────────────────────────────────────────────────

function Flow({ d, color, width = 6, dur = 3, r = 3.2, active = true }: { d: string; color: string; width?: number; dur?: number; r?: number; active?: boolean }) {
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" opacity={active ? 0.35 : 0.15} strokeDasharray={active ? undefined : "4 6"} />
      {active && <path d={d} fill="none" stroke={color} strokeWidth={r * 2} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0.1 11.9" className="pj-dots" style={{ animationDuration: `${dur}s` }} />}
    </g>
  );
}

function Tag({ x, y, text: rawText, anchor = "start", size = 9.5, color = "#3c3c3c", bold = false, bg = "#ffffff" }: { x: number; y: number; text: string; anchor?: "start" | "middle" | "end"; size?: number; color?: string; bold?: boolean; bg?: string }) {
  const [audience] = useAudience();
  // Little kids get the name of the thing, not its numbers: keep the label before the first " · ", drop number-only tags.
  let text = rawText;
  if (audience === "kid") {
    text = rawText.split(" · ").filter((p) => !/\d/.test(p)).join(" · ").trim();
    if (!text) return null;
  }
  const w = text.length * size * (bold ? 0.62 : 0.56) + 10;
  const bx = anchor === "start" ? x - 5 : anchor === "end" ? x - w + 5 : x - w / 2;
  return (
    <g pointerEvents="none">
      <rect x={bx} y={y - size - 2} width={w} height={size + 7} rx={3} fill={bg} fillOpacity={0.92} />
      <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={bold ? 800 : 500} fill={color}>
        {text}
      </text>
    </g>
  );
}

const FAN_BLADES = ["M0,0 L6.30,0.00 L3.22,2.70 Z", "M0,0 L-3.15,5.46 L-3.95,1.44 Z", "M0,0 L-3.15,-5.46 L0.73,-4.14 Z"];

function Fan({ cx, cy, dur }: { cx: number; cy: number; dur: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={7} fill="#dfe7ea" stroke="#3f5a63" strokeWidth={0.8} />
      <g className="pj-fan" style={{ transformOrigin: `${cx}px ${cy}px`, animationDuration: `${dur}s` }}>
        <g transform={`translate(${cx} ${cy})`}>
          {FAN_BLADES.map((d) => (
            <path key={d} d={d} fill="#3f5a63" />
          ))}
        </g>
      </g>
    </g>
  );
}

function FanBank({ x, y, w, h, dur, spacing = 24 }: { x: number; y: number; w: number; h: number; dur: number; spacing?: number }) {
  const cols = Math.floor(w / spacing);
  const rows = Math.floor(h / spacing);
  const items: React.ReactNode[] = [];
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) items.push(<Fan key={`${i}-${j}`} cx={x + spacing / 2 + i * spacing} cy={y + spacing / 2 + j * spacing} dur={dur} />);
  return <>{items}</>;
}

function GreenhouseIcon({ x, y, w, h, warm }: { x: number; y: number; w: number; h: number; warm: boolean }) {
  return (
    <g>
      <path d={`M${x},${y + h} L${x},${y + h * 0.45} L${x + w / 2},${y} L${x + w},${y + h * 0.45} L${x + w},${y + h} Z`} fill={warm ? "#d7f0dc" : "#e6f2ff"} stroke="#1f5f3a" strokeWidth={1.2} />
      <line x1={x} y1={y + h * 0.45} x2={x + w} y2={y + h * 0.45} stroke="#1f5f3a" strokeWidth={0.6} />
      {[0.25, 0.5, 0.75].map((f) => (
        <g key={f}>
          <line x1={x + w * f} y1={y + h - 3} x2={x + w * f} y2={y + h * 0.62} stroke="#2e8b57" strokeWidth={2} />
          <circle cx={x + w * f} cy={y + h * 0.6} r={3} fill="#d9534f" />
        </g>
      ))}
      <path d={`M${x + 3},${y + h - 3} H${x + w - 3}`} stroke={warm ? "#c0392b" : "#1f7ae0"} strokeWidth={2.5} strokeDasharray="3 3" />
    </g>
  );
}

function Person({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={3} fill="#003047" />
      <path d={`M${x},${y + 3} V${y + 11} M${x - 4},${y + 6} H${x + 4} M${x},${y + 11} L${x - 3},${y + 17} M${x},${y + 11} L${x + 3},${y + 17}`} stroke="#003047" strokeWidth={1.6} fill="none" strokeLinecap="round" />
    </g>
  );
}

function House({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x},${y + 6} L${x + 6},${y} L${x + 12},${y + 6} V${y + 13} H${x} Z`} fill="#fdb715" stroke="#8a6a00" strokeWidth={0.8} />
      <rect x={x + 4.5} y={y + 8} width={3} height={5} fill="#8a6a00" />
    </g>
  );
}

function Truck({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={16} height={9} rx={1} fill="#2e8b57" />
      <rect x={x + 16} y={y + 3} width={6} height={6} rx={1} fill="#1f5f3a" />
      <circle cx={x + 4} cy={y + 10} r={2} fill="#3c3c3c" />
      <circle cx={x + 18} cy={y + 10} r={2} fill="#3c3c3c" />
    </g>
  );
}

function DataHall({ x, y, w = 140, h = 130, label = "DATA HALL" }: { x: number; y: number; w?: number; h?: number; label?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill="#003047" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={x + 12 + i * 32} y={y + 18} width={22} height={h - 50} rx={2} fill="#0b4a66" stroke="#6ea8ff" strokeWidth={0.8} />
          {[0, 1, 2, 3, 4, 5].map((j) => (
            <rect key={j} x={x + 15 + i * 32} y={y + 22 + j * 12} width={16} height={7} fill={j % 2 ? "#1d7bb8" : "#2ba0e0"} className="pj-blink" style={{ animationDelay: `${((i + j) % 4) * 0.3}s` }} />
          ))}
        </g>
      ))}
      <Tag x={x + w / 2} y={y - 6} text={label} anchor="middle" bold color="#003047" />
    </g>
  );
}

/** Ground cross-section with drinking-water aquifer, cap rock and deep storage, labeled in plain words. */
function Underground({ x, y, w, h, fill, label, sub }: { x: number; y: number; w: number; h: number; fill: number; label: string; sub: string }) {
  const layer = h / 4;
  return (
    <g>
      <rect x={x} y={y} width={w} height={layer} fill="#e3cfa8" />
      <rect x={x} y={y + layer} width={w} height={layer} fill="#a9c4d8" />
      <rect x={x} y={y + 2 * layer} width={w} height={layer * 0.6} fill="#5a5a5a" />
      <rect x={x} y={y + 2.6 * layer} width={w} height={h - 2.6 * layer} fill="#7a6142" />
      <rect x={x + 4} y={y + 2.7 * layer} width={(w - 8) * fill} height={h - 2.8 * layer} fill="#003047" opacity={0.85} />
      <Tag x={x + w / 2} y={y + layer * 0.65} text="soil" anchor="middle" size={8} bg="#e3cfa8" />
      <Tag x={x + w / 2} y={y + layer * 1.65} text="drinking-water aquifer (shallow)" anchor="middle" size={8} bg="#a9c4d8" />
      <Tag x={x + w / 2} y={y + layer * 2.42} text="cap rock: shale or salt, gas cannot pass" anchor="middle" size={8} color="#fff" bg="#5a5a5a" />
      <Tag x={x + w / 2} y={y + h - 6} text={label} anchor="middle" size={8.5} bold color="#fff" bg="#7a6142" />
      <Tag x={x + w / 2} y={y - 6} text={sub} anchor="middle" size={8.5} />
    </g>
  );
}

// ─── 1. Heat ─────────────────────────────────────────────────────────────────

export function HeatDiagram() {
  const [mode, setMode] = usePlanMode();
  const [season, setSeason] = useState<"winter" | "summer">("winter");
  const [acres, setAcres] = useState(GH_ACRES_PHASE1);
  const [part, setPart] = useState<string | null>(null);
  const ours = mode === "ours";
  const winter = season === "winter";
  const gh = ours ? (winter ? acres * GH_PEAK_MW_PER_ACRE : acres * GH_PEAK_MW_PER_ACRE * 0.5) : 0; // summer: the same heat drives absorption chillers for the glass (estimate)
  const desal = ours ? DESAL_PREHEAT_MW : 0;
  const brine = ours && !winter ? BRINE_CONCENTRATOR_MW : 0;
  const reused = gh + desal + brine;
  const dry = HEAT_MW - reused;
  const fansSaved = reused * 0.1;
  const nGh = Math.max(1, Math.min(8, Math.round(acres / 50)));
  const ghW = Math.min(52, Math.floor(210 / nGh));
  const fanDur = 0.6 + 1.2 * (1 - dry / HEAT_MW);
  const dryH = humanHeat(dry);
  const reusedH = humanHeat(reused);

  return (
    <Card tools={ours ? <SeasonToggle season={season} onChange={setSeason} /> : null} voices={{ homeowner: "This is the heat that would otherwise blow across the desert toward your street. Used, it grows tomatoes in winter and makes cold for the greenhouses in summer.", legislator: "A waste-heat reuse condition in the lease is the cheapest item on the list: about $60 million of standard district-heating hardware, paid by the developer and recovered in fan and chiller electricity. The Waste-Heat Reuse bill makes it standard practice statewide.", business: "About 2,400 MW of heat is rejected for free today. Sold to growers in winter and turned into absorption cooling in summer, it becomes a revenue line and a lower electricity bill on the same fans you already pay for.", overall: "The computers' heat is free. Their plan throws it away. Ours sells it to greenhouses in winter and turns it into cooling in summer." }} kicker="Process 1 · Heat" title="Where the heat goes" mode={mode} onMode={setMode} kid="Computers get hot, like a laptop on your lap. This place cools millions of them with water. In their plan the warm water goes to big fans that blow all the heat into the sky. In ours, one extra box lets greenhouses and the water plant use the warmth first. The fans still handle the rest." sources={["render", "waterpdf", "faq", "sob", "sweden", "carrier-furnace"]} intro={(<p>
        {ours ? (
          <>
            Nearly all the electricity a chip uses turns into heat. Their halls run closed-loop liquid cooling with a one-time fill<Cite ids={["waterpdf", "faq"]} />, and their render
            shows the heat leaving through rows of dry coolers, fans blowing desert air over finned coils<Cite ids={["render"]} />. We add one plate heat exchanger ahead of
            those fans. Gothenburg, Sweden already heats a greenhouse this way<Cite ids={["sweden"]} />. <strong>Heat is not smog.</strong> The fans move warm air; the smog and
            CO₂ come from the fuel-cell stacks in Process 2.
          </>
        ) : (
          <>
            <strong>Their plan, as filed.</strong> Warm water from the chips goes to the modular chiller plants and then to two long bands of dry coolers, which blow about{" "}
            {HEAT_MW.toLocaleString()} MW of heat into the desert air, roughly {humanHeat(HEAT_MW).furnaces.toLocaleString()} home furnaces running flat out
            <Cite ids={["render", "waterpdf", "carrier-furnace"]} />. Nothing uses it. The fuel cells make heat too, but recycle it internally to reform their fuel<Cite ids={["sob"]} />.
          </>
        )}
      </p>)}>

      <div className="pj-frame"><svg viewBox="0 0 640 320" className="pj-diagram mb-2 w-full" role="img" aria-label={ours ? "How server heat is reused" : "How their plan rejects all heat to the air"}>
        <Clickable id="dataHall" selected={part} onSelect={setPart}>
          <DataHall x={10} y={100} label="1 · DATA HALL" />
        </Clickable>
        <Tag x={12} y={246} text={`chips heat water to ${tempRange(45, 65)}`} anchor="start" size={8} />

        {ours ? (
          <>
            <Flow d="M150,140 H220" color="#c0392b" width={9} dur={1.6} />
            <Flow d="M220,190 H150" color="#1f7ae0" width={7} dur={1.6} />
            <Tag x={185} y={128} text={`hot ≈${temp(60)}`} anchor="middle" size={8} color="#c0392b" />
            <Tag x={185} y={210} text={`cool ≈${temp(35)}`} anchor="middle" size={8} color="#1f7ae0" />
            <Clickable id="heatExchanger" selected={part} onSelect={setPart}>
              <rect x={220} y={110} width={70} height={110} rx={4} fill="#c0392b" />
              {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={227 + i * 10} y={120} width={5} height={90} fill="#ffffff" fillOpacity={0.75} pointerEvents="none" />)}
            </Clickable>
            <Tag x={255} y={104} text="2 · HEAT EXCHANGER" anchor="middle" bold color="#c0392b" size={9} />
            <NewMarker box={{ x: 220, y: 110, w: 70, h: 110 }} side="left" />

            <Flow d="M290,125 C340,125 350,50 400,50 H428" color={winter ? "#2e8b57" : "#1f7ae0"} width={Math.max(3, Math.min(11, gh / 20))} dur={2.2} />
            <Clickable id="greenhouses" selected={part} onSelect={setPart}>
              <rect x={426} y={12} width={nGh * ghW + 4} height={54} fill="transparent" />
              {Array.from({ length: nGh }).map((_, i) => <GreenhouseIcon key={i} x={428 + i * ghW} y={14} w={ghW - 3} h={50} warm={winter} />)}
            </Clickable>
            <Tag x={535} y={8} text={`3 · GREENHOUSES · ${acres} acres`} anchor="middle" bold color="#1f5f3a" size={9} />
            <Tag x={535} y={80} text={winter ? `warm water heats roots · ${Math.round(gh)} MW ≈ ${humanHeat(gh).furnaces.toLocaleString()} furnaces` : "summer: the heat runs absorption chillers that cool the glass"} anchor="middle" size={8} color={winter ? "#1f5f3a" : "#1f7ae0"} />
            <NewMarker box={{ x: 428, y: 14, w: nGh * ghW, h: 50 }} side="left" />

            <Flow d="M290,165 H428" color="#1f7ae0" width={5} dur={2.6} />
            <Clickable id="waterPlantHeat" selected={part} onSelect={setPart}>
              <rect x={428} y={148} width={214} height={36} rx={4} fill="#1f7ae0" />
              <text x={535} y={163} textAnchor="middle" fontSize={10} fontWeight={800} fill="#fff" pointerEvents="none">WATER PLANT</text>
              <text className="pj-num " x={535} y={177} textAnchor="middle" fontSize={8.5} fill="#e6f0ff" pointerEvents="none">{winter ? `preheats salty feed by 15 °C / 27 °F · ${desal} MW` : `preheat + brine drying · ${desal + brine} MW`}</text>
            </Clickable>
            <NewMarker box={{ x: 428, y: 148, w: 214, h: 36 }} side="left" />

            <Flow d="M290,205 C340,205 350,260 400,260 H428" color="#6f8f9a" width={Math.max(5, Math.min(16, dry / 180))} dur={2} />
            <Clickable id="dryCoolers" selected={part} onSelect={setPart}>
              <rect x={428} y={224} width={214} height={86} rx={4} fill="#6f8f9a" />
              <FanBank x={436} y={232} w={198} h={70} dur={fanDur} />
            </Clickable>
            <Tag x={535} y={212} text={`4 · DRY COOLERS (THEIRS) · ${Math.round(dry).toLocaleString()} MW to the air`} anchor="middle" bold color="#3f5a63" size={9} />
          </>
        ) : (
          <>
            <Flow d="M150,140 H240" color="#c0392b" width={11} dur={1.4} />
            <Flow d="M240,190 H150" color="#1f7ae0" width={8} dur={1.4} />
            <Tag x={195} y={128} text="hot" anchor="middle" size={8.5} color="#c0392b" />
            <Tag x={195} y={210} text="cool" anchor="middle" size={8.5} color="#1f7ae0" />
            <Clickable id="chillerPlants" selected={part} onSelect={setPart}>
              <rect x={240} y={110} width={90} height={110} rx={4} fill="#8a949b" />
              {[0, 1, 2].map((i) => <circle key={i} cx={262 + i * 24} cy={150} r={9} fill="#cfd6da" stroke="#3c3c3c" strokeWidth={0.8} pointerEvents="none" />)}
              {[0, 1, 2].map((i) => <rect key={i} x={253 + i * 24} y={170} width={18} height={34} fill="#b8c0c5" stroke="#3c3c3c" strokeWidth={0.8} pointerEvents="none" />)}
            </Clickable>
            <Tag x={285} y={104} text="2 · CHILLER PLANTS" anchor="middle" bold color="#4f6b7a" size={9} />
            <Tag x={285} y={236} text="closed loop, one-time fill" anchor="middle" size={8.5} />
            <Flow d="M330,165 H428" color="#6f8f9a" width={16} dur={1.6} />
            <Clickable id="dryCoolers" selected={part} onSelect={setPart}>
              <rect x={428} y={110} width={214} height={120} rx={4} fill="#6f8f9a" />
              <FanBank x={436} y={118} w={198} h={104} dur={0.6} />
            </Clickable>
            <Tag x={535} y={104} text={`3 · DRY COOLERS · all ${HEAT_MW.toLocaleString()} MW to the air`} anchor="middle" bold color="#3f5a63" size={9} />
            <Flow d="M535,110 V70" color="#9aa5ad" width={14} dur={1.2} />
            <Cloud cx={535} cy={44} size={30} variant="clean" opacity={0.8} />
            <Tag x={535} y={18} text={`warm air, ≈ ${humanHeat(HEAT_MW).furnaces.toLocaleString()} furnaces&apos; worth (not smog)`} anchor="middle" size={8} />
            <rect x={428} y={252} width={214} height={54} rx={4} fill="none" stroke="#c0392b" strokeWidth={1.2} strokeDasharray="6 4" />
            <text x={535} y={274} textAnchor="middle" fontSize={8.5} fontWeight={700} fill="#c0392b">no greenhouse, no water plant downstream</text>
            <text x={535} y={290} textAnchor="middle" fontSize={8.5} fill="#8e3b2f">open desert in their render</text>
          </>
        )}
      </svg></div>
      <PartInfo id={part} onClose={() => setPart(null)} />

      <Slider label="Greenhouse acres (proposed)" value={acres} min={50} max={400} step={10} unit="acres" onChange={setAcres} disabled={!ours} />
      <div className="mt-4">
        <Bar what="all the heat the computers make, and where it goes" total={HEAT_MW} parts={[{ label: "Greenhouses MW", value: gh, color: "#2e8b57" }, { label: "Water plant MW", value: desal + brine, color: "#1f7ae0" }, { label: "Dry coolers MW", value: dry, color: "#6f8f9a" }]} />
      </div>
      <div className="pj-stats mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Heat put to work" value={`${Math.round(reused)} MW`} sub={<>≈ {reusedH.furnaces.toLocaleString()} home furnaces&apos; worth<Cite ids={["carrier-furnace"]} /> · {((reused / HEAT_MW) * 100).toFixed(1)}% of the total · {winter ? "winter: greenhouse root heat" : "summer: absorption cooling + brine drying"}</>} color={ours ? "#2e8b57" : "#c0392b"} />
        <Stat label="Heat blown into the air" value={`${Math.round(dry).toLocaleString()} MW`} sub={<>≈ {dryH.furnaces.toLocaleString()} furnaces running flat out, every hour</>} color="#c0392b" />
        <Stat label="Fan & chiller electricity saved" value={`~${Math.round(fansSaved)} MW`} sub={ours ? "their bill, lower (estimate)" : "nothing saved"} color="#d99a00" />
      </div>
      {ours && <CostStrip millions={60} label="for the heat exchanger, pumps and insulated header (standard district-heating hardware, estimate)" who="the developer; it pays back in fan and chiller electricity" />}
      <p className="pj-fine mt-3 text-[14px]" style={{ color: "#6b6b6b" }}>
        In summer the same heat can drive absorption chillers, standard hardware that makes cold from 65–100 °C water at a coefficient of performance near 0.86, cutting the electric chiller load<Cite ids={["absorption-review", "absorption-multistage"]} />; that is an estimate for this site, not a design. A megawatt (MW) is a rate of energy, like miles per hour is a rate of distance. To make it concrete we translate every MW into home furnaces: a typical furnace is
        rated about 90,000 BTU per hour, so 1 MW ≈ 38 furnaces<Cite ids={["carrier-furnace"]} />. Rough equivalences, labeled as such. Heat ≈ IT load is thermodynamics, not a
        measured figure. Greenhouse acreage is a proposal; the site is about 819 acres with 400 in the first phase<Cite ids={["cba"]} />.
      </p>
    </Card>
  );
}

// ─── 2. Carbon ───────────────────────────────────────────────────────────────

const GHG_PERMIT_TPY = 10_144_115; // NMED draft Statement of Basis, safety factor removed
const GHG_APPLICANT_TPY = 8_820_970; // applicant's figure with 15% safety factor
const STACKS = 2275;

const pollutants = [
  { name: "Carbon dioxide (CO₂)", amount: "10,144,115 tons/yr permitted", does: "Warms the climate. Not a smog gas; it is the climate gas.", standard: "No ambient health standard; it is regulated as a greenhouse gas.", future: "20 years as filed: about 200 million tons in the air, where CO₂ stays for centuries. Warming is cumulative, so every year adds to the last. Upgraded: 10 to 20 million tons over the same 20 years, falling as gas hours fall.", sources: ["sob"] },
  { name: "Nitrogen oxides (NOx)", amount: "held under 250 tons/yr", does: "Reacts with VOCs in sunlight to make ground-level ozone, the main ingredient of smog. Irritates lungs, triggers asthma.", standard: "Ozone health standard: 70 ppb over 8 hours. Sunland Park has failed it since 2018.", future: "20 years as filed: up to 5,000 tons of NOx over a town that already fails the ozone standard, twenty summers of smog days for children now in elementary school. Upgraded: the same fuel cells, but every ton measured and posted, under controls set at the strict-review level.", sources: ["sob", "epa-ozone-naaqs", "sunland-park-ozone"] },
  { name: "Carbon monoxide (CO)", amount: "≈161 tons/yr (application)", does: "Reduces the blood's ability to carry oxygen at high concentrations.", standard: "Held under the 250-ton line that would trigger full PSD review.", future: "20 years as filed: about 3,200 tons, released and estimated rather than measured. Upgraded: continuous monitors, so a bad day is known the day it happens.", sources: ["nmelc", "sob"] },
  { name: "Volatile organic compounds (VOC)", amount: "≈124 tons/yr (application)", does: "The other half of the smog recipe with NOx.", standard: "Held under 250 tons/yr.", future: "20 years as filed: about 2,500 tons feeding summer ozone. Upgraded: measured, posted, and falling with gas hours.", sources: ["nmelc", "sob"] },
  { name: "Fine particles (PM2.5)", amount: "held under 250 tons/yr", does: "Reach deep into the lungs; linked to heart attacks, asthma attacks and premature death.", standard: "Health standard: 9 µg/m³ annual average (2024).", future: "20 years as filed: chronic exposure is what the health studies count, and a child born the year the plant opens turns 20 under it. Upgraded: monitored, with the count falling as gas hours fall.", sources: ["sob", "epa-pm-naaqs"] },
  { name: "Hazardous air pollutants (HAPs)", amount: "under 25 tons/yr", does: "Toxic compounds regulated individually.", standard: "25 tons/yr is the major-source line; the earlier split permits sat just under it.", future: "20 years as filed: up to 500 tons of listed toxics, each kept under its own line. Upgraded: one permit, one total, measured.", sources: ["nmelc"] },
];

export function CarbonDiagram() {
  const [mode, setMode] = usePlanMode();
  const [rate, setRate] = useState(90);
  const [part, setPart] = useState<string | null>(null);
  const [showPollutants, setShowPollutants] = useState(false);
  const [useShare, setUseShare] = useState(10);
  const ours = mode === "ours";
  const r = ours ? rate / 100 : 0;
  const captured = GHG_PERMIT_TPY * r;
  const used = captured * (useShare / 100);
  const stored = captured - used;
  const left = GHG_PERMIT_TPY * (1 - r);
  const leftLow = GHG_APPLICANT_TPY * (1 - r);
  const penaltyMW = IT_LOAD_MW * CAPTURE_MAX_PENALTY * (ours ? rate / 95 : 0);
  const plume = 8 + (1 - r) * 30;

  return (
    <Card voices={{ homeowner: "This is the exhaust that drifts toward Sunland Park on hot days. Captured, used and monitored, it stops being a smog ingredient you cannot see and becomes a number you can check.", legislator: "One Title V permit with PSD-level controls and continuous monitoring is a lease condition the county can set today, and it is the difference between a permit that survives review and the one currently stayed by the Supreme Court.", business: "A 95%-pure CO₂ stream is a feedstock: greenhouse enrichment, concrete curing, carbonate aggregate. Selling it beats paying for a pipeline and a well, and a monitored, capture-first permit is the one that stays out of court, ends the moratorium talk, and takes the legislators off your back. For Oracle, Meta, STACK or BorderPlex it is also the environmental line for the earnings call.", overall: "The power plant's exhaust is almost pure CO₂, which is exactly why it can be caught, used, and counted instead of released." }} kicker="Process 2 · Carbon" title="Capture it, use it, and cut it" mode={mode} onMode={setMode} kid="Their power machines breathe out a gas that warms the planet. In their plan it all floats into the sky, and on hot days part of what comes out turns into smog over the houses next door. Because the machines do not burn with a flame, their breath is almost pure fizz-gas, so in our plan it is dried and caught in a box. Some of it feeds the tomatoes and gets locked into concrete and gravel, which is the best use. What nobody can use yet is pumped deep underground under a lid of solid rock, and every year the machines run less because cleaner power takes over (see Process 4)." sources={["sob", "notice", "bloom-co2", "bloom-chart", "bocc", "abq-lc", "cba", "epa-ozone-naaqs", "sunland-park-ozone", "epa-class-vi-saline", "bloom-fuels", "boundary-dam-2024", "ieefa-bd3", "carboncure", "blue-planet", "usgs-induced", "decatur"]} intro={(<p>
        {ours ? (
          <>
            NMED&apos;s own words: the depleted anode exhaust is &quot;approximately 95 percent carbon dioxide once dried&quot;<Cite ids={["sob"]} />. A gas turbine&apos;s exhaust is a few
            percent CO₂<Cite ids={["bloom-co2"]} />. <strong>Two different percentages:</strong> 95% is <em>purity</em>, how much of the pipe is CO₂. The slider is <em>capture
            efficiency</em>, how much of that CO₂ the box catches. Whatever the box misses is what gets released. Bloom and Chart Industries already sell capture for this exact
            exhaust<Cite ids={["bloom-chart"]} />.
          </>
        ) : (
          <>
            <strong>Their plan, as filed.</strong> Permit 10883 covers a 2,462 MW Bloom fuel-cell plant<Cite ids={["notice"]} /> with {STACKS.toLocaleString()} exhaust stacks running
            8,760 hours a year<Cite ids={["sob"]} />. NMED puts its greenhouse gas at {GHG_PERMIT_TPY.toLocaleString()} tons a year, all released<Cite ids={["sob"]} />. The developers say
            real-world use will run about 40% below that ceiling<Cite ids={["bocc"]} /> and promise &quot;100% carbon-free energy matching by 2031&quot;, which buys clean-energy credits
            elsewhere; it does not change what leaves these stacks<Cite ids={["bocc", "faq"]} />.
          </>
        )}
      </p>)}>

      <div className="pj-frame"><svg viewBox="0 0 640 360" className="pj-diagram mb-2 w-full" role="img" aria-label={ours ? "How fuel-cell exhaust is captured" : "How their plan releases all fuel-cell exhaust"}>
        <Clickable id="naturalGas" selected={part} onSelect={setPart}>
          <rect x={4} y={136} width={64} height={30} rx={4} fill="#5c4a3a" />
          <text className="pj-num " x={36} y={149} textAnchor="middle" fontSize={8.5} fontWeight={800} fill="#fff" pointerEvents="none">1 · GAS</text>
          <text className="pj-num " x={36} y={160} textAnchor="middle" fontSize={7.5} fill="#f2e6d8" pointerEvents="none">≤400 MMcf/day</text>
        </Clickable>
        <Flow d="M68,150 H80" color="#5c4a3a" width={9} dur={2.4} />

        <Clickable id="fuelCell" selected={part} onSelect={setPart}>
          <rect x={80} y={95} width={110} height={110} rx={4} fill="#8e3b2f" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i} pointerEvents="none">
              <rect x={90} y={105 + i * 16} width={90} height={5} fill="#f2c9a0" />
              <rect x={90} y={110 + i * 16} width={90} height={5} fill="#e9e4d8" />
              <rect x={90} y={115 + i * 16} width={90} height={4} fill="#2b2b2b" />
            </g>
          ))}
        </Clickable>
        <Tag x={135} y={89} text="2 · BLOOM FUEL CELL" anchor="middle" bold size={9} color="#8e3b2f" />
        <Tag x={125} y={219} text="ceramic layers · no flame" anchor="middle" size={7.5} />
        <Tag x={125} y={231} text={tempRange(700, 900)} anchor="middle" size={7.5} />

        <Flow d="M100,205 V300 H250" color="#fdb715" width={4} dur={1.2} r={2.6} />
        <Clickable id="dataHall" selected={part} onSelect={setPart}>
          <rect x={250} y={282} width={100} height={36} rx={4} fill="#003047" />
          <text x={300} y={304} textAnchor="middle" fontSize={10} fontWeight={800} fill="#fff" pointerEvents="none">DATA HALLS</text>
        </Clickable>
        <Tag x={192} y={292} text="electricity" anchor="middle" size={8.5} color="#8a6a00" />

        {ours ? (
          <>
            <Flow d="M190,125 H250" color="#8a949b" width={11} dur={1.8} />
            <Tag x={220} y={112} text="3 · exhaust" anchor="middle" bold size={9} color="#4f6b7a" />
            <Clickable id="dryer" selected={part} onSelect={setPart}>
              <rect x={250} y={100} width={70} height={50} rx={4} fill="#4f6b7a" />
              <text x={285} y={121} textAnchor="middle" fontSize={9.5} fontWeight={800} fill="#fff" pointerEvents="none">DRYER</text>
              <text x={285} y={135} textAnchor="middle" fontSize={8.5} fill="#e3eef3" pointerEvents="none">takes water out</text>
            </Clickable>
            <NewMarker box={{ x: 250, y: 100, w: 70, h: 50 }} side="top" />
            <Flow d="M285,150 V214" color="#1f7ae0" width={3} dur={1.5} r={2.4} />
            <rect x={185} y={214} width={200} height={28} rx={3} fill="#dbe9f7" stroke="#1f7ae0" strokeWidth={1} />
            <text x={285} y={226} textAnchor="middle" fontSize={8} fontWeight={800} fill="#1f5f3a">clean water from the dryer (condensate)</text>
            <text x={285} y={237} textAnchor="middle" fontSize={7.5} fill="#1f5f3a">→ tops off cooling loops · waters greenhouses</text>
            <Flow d="M320,125 H390" color="#3c3c3c" width={11} dur={1.8} />
            <Tag x={355} y={112} text="≈95% CO₂ (purity)" anchor="middle" size={8} bold />
            <Clickable id="captureSkid" selected={part} onSelect={setPart}>
              <rect x={390} y={90} width={90} height={70} rx={4} fill={G} />
              <text x={435} y={115} textAnchor="middle" fontSize={10} fontWeight={800} fill="#fff" pointerEvents="none">CAPTURE +</text>
              <text x={435} y={129} textAnchor="middle" fontSize={10} fontWeight={800} fill="#fff" pointerEvents="none">COMPRESS</text>
              <text x={435} y={146} textAnchor="middle" fontSize={8.5} fill="#e8f8ee" pointerEvents="none">Bloom + Chart skids</text>
            </Clickable>
            <Tag x={435} y={178} text={`4 · catches ${rate}% (efficiency)`} anchor="middle" bold size={9} color={G} />
            <NewMarker box={{ x: 390, y: 90, w: 90, h: 70 }} side="top" />

            {/* released = uncaptured share */}
            <Flow d="M480,105 C520,105 545,70 575,50" color="#9aa5ad" width={Math.max(1.5, 12 * (1 - r))} dur={2.2} active={r < 1} />
            <Clickable id="released" selected={part} onSelect={setPart}>
              <Cloud cx={590} cy={40} size={plume} variant={r >= 0.9 ? "clean" : "smog"} opacity={0.35 + (1 - r) * 0.6} />
            </Clickable>
            <Tag x={636} y={plume * 0.5 + 62} text={`released: ${Math.round((1 - r) * 100)}% not caught · ${(left / 1e6).toFixed(1)} Mt/yr`} anchor="end" size={7.5} color="#6b6b6b" />

            <Flow d="M480,125 H520" color="#2e8b57" width={Math.max(2, 10 * (useShare / 100) * r)} dur={2.4} r={2.4} />
            <Clickable id="useCo2" selected={part} onSelect={setPart}>
              <rect x={520} y={104} width={116} height={42} rx={4} fill={G} />
              <text x={578} y={119} textAnchor="middle" fontSize={8.5} fontWeight={800} fill="#fff" pointerEvents="none">USE FIRST</text>
              <text x={578} y={130} textAnchor="middle" fontSize={7.5} fill="#e8f8ee" pointerEvents="none">greenhouses · concrete · aggregate</text>
              <text className="pj-num " x={578} y={141} textAnchor="middle" fontSize={7.5} fontWeight={800} fill="#fff" pointerEvents="none">{`${(used / 1e6).toFixed(1)} Mt/yr`}</text>
            </Clickable>
            <NewMarker box={{ x: 520, y: 104, w: 116, h: 42 }} side="bottom" />

            <Flow d="M435,160 V195 H560 V245" color="#003047" width={Math.max(2, 12 * (stored / GHG_PERMIT_TPY))} dur={2.6} active={stored > 0} />
            <Clickable id="storage" selected={part} onSelect={setPart}>
              <rect x={468} y={228} width={170} height={130} fill="transparent" />
              <Underground x={470} y={230} w={165} h={126} fill={r} label={`5 · fallback: ${(stored / 1e6).toFixed(1)} Mt/yr stored deep`} sub="not fracking · monitored" />
            </Clickable>
            <NewMarker box={{ x: 470, y: 230, w: 165, h: 126 }} side="left" />
            <Clickable id="nearZero" selected={part} onSelect={setPart}>
              <rect x={235} y={330} width={225} height={26} rx={4} fill="#eaf6ee" stroke="#2e8b57" strokeWidth={1} />
              <text className="pj-num " x={347} y={347} textAnchor="middle" fontSize={9} fontWeight={800} fill="#1f5f3a" pointerEvents="none">HOW THE LAST {100 - rate}% REACHES ZERO →</text>
            </Clickable>
          </>
        ) : (
          <>
            <Flow d="M190,125 H300 C360,125 400,90 430,60" color="#8a949b" width={14} dur={1.4} />
            <Clickable id="exhaust" selected={part} onSelect={setPart}>
              <rect x={200} y={100} width={230} height={50} fill="transparent" />
            </Clickable>
            <Tag x={300} y={108} text="3 · exhaust · ≈95% CO₂ + water vapor + smog gases" anchor="middle" bold size={8.5} color="#4f6b7a" />
            <Clickable id="released" selected={part} onSelect={setPart}>
              <Cloud cx={480} cy={42} size={40} variant="smog" opacity={0.9} />
              <Cloud cx={565} cy={62} size={30} variant="smog" opacity={0.75} />
            </Clickable>
            <Tag x={500} y={112} text={`100% released · ${(GHG_PERMIT_TPY / 1e6).toFixed(1)} Mt/yr permitted`} anchor="middle" bold size={9} color="#c0392b" />
            <Tag x={500} y={130} text={`developers expect ~${((GHG_PERMIT_TPY * 0.6) / 1e6).toFixed(1)} Mt in practice · ≈ ${(GHG_PERMIT_TPY / 1e6 / ABQ_LC_MT).toFixed(1)}× Albuquerque + Las Cruces`} anchor="middle" size={8} />
            {/* smog over homes */}
            <rect x={420} y={150} width={215} height={60} fill="#d9d3c7" />
            <rect x={420} y={150} width={215} height={60} fill="#4a4a4a" opacity={0.18} />
            <Neighborhood x={432} y={180} w={192} />
            <Tag x={527} y={165} text="on hot days it becomes ozone (smog) over Sunland Park" anchor="middle" size={8} color="#8e3b2f" />
            <rect x={420} y={222} width={215} height={130} rx={4} fill="none" stroke="#c0392b" strokeWidth={1.2} strokeDasharray="6 4" />
            <text x={527} y={248} textAnchor="middle" fontSize={9.5} fontWeight={800} fill="#c0392b">NO DRYER · NO CAPTURE · NO STORAGE</text>
            <text x={527} y={268} textAnchor="middle" fontSize={8.5} fill="#3c3c3c">&quot;100% carbon-free matching by 2031&quot; = credits</text>
            <text x={527} y={282} textAnchor="middle" fontSize={8.5} fill="#3c3c3c">bought elsewhere; the stacks are unchanged</text>
            <text x={527} y={302} textAnchor="middle" fontSize={8.5} fill="#3c3c3c">Sunland Park: ozone nonattainment since 2018</text>
            <text x={527} y={316} textAnchor="middle" fontSize={8.5} fill="#3c3c3c">Doña Ana County: F for ozone, 15 bad-air days/yr</text>
            <text x={527} y={336} textAnchor="middle" fontSize={8.5} fill="#3c3c3c">HB93: net-zero required only by 2045</text>
          </>
        )}
      </svg></div>
      <PartInfo id={part} onClose={() => setPart(null)} />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Slider label="Capture efficiency (how much of the CO₂ the box catches)" value={ours ? rate : 0} min={0} max={95} step={5} unit="%" onChange={setRate} disabled={!ours} />
        <Slider label="Share of captured CO₂ used (greenhouses, concrete, aggregate) instead of stored" value={ours ? useShare : 0} min={0} max={100} step={5} unit="%" onChange={setUseShare} disabled={!ours} />
      </div>
      <div className="mt-4">
        <Bar what="all the gas the power plant breathes out in a year" total={GHG_PERMIT_TPY} parts={[{ label: "Captured (tons/yr)", value: captured, color: "#003047" }, { label: "Released (tons/yr)", value: left, color: "#9aa5ad" }]} />
      </div>
      <div className="pj-stats mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Released" value={`${(leftLow / 1e6).toFixed(2)}–${(left / 1e6).toFixed(2)} Mt`} sub={<>per year, applicant vs. NMED figure<Cite ids={["sob"]} /></>} color={r >= 0.9 ? "#2e8b57" : "#c0392b"} />
        <Stat label="Used, not buried" value={`${(used / 1e6).toFixed(1)} Mt`} sub={ours ? "per year into food, concrete and aggregate (buyers set the pace)" : "nothing is used"} color="#2e8b57" />
        <Stat label="Stored as fallback" value={`${(stored / 1e6).toFixed(1)} Mt`} sub={ours ? "per year by pipeline to permitted storage; shrinks as use and clean power grow" : "nothing is captured"} color="#1f7ae0" />
        <Stat label="Equals" value={`${(left / 1e6 / ABQ_LC_MT).toFixed(2)}×`} sub={<>Albuquerque + Las Cruces (~6.7 Mt)<Cite ids={["abq-lc"]} /></>} color={r >= 0.9 ? "#2e8b57" : "#c0392b"} />
        <Stat label="Energy penalty" value={`~${Math.round(penaltyMW)} MW`} sub={ours ? "more fuel cells to run capture (estimate)" : "none, nothing is captured"} color="#c0392b" />
      </div>
      {ours && <CostStrip millions={1500} label="for capture and compression on 2,275 stacks, manifolded by cluster (order-of-magnitude estimate, no vendor quote yet)" who="the developer" />}

      <button type="button" onClick={() => setShowPollutants((v) => !v)} className="pj-more mt-4 w-full rounded px-3 py-2 text-left text-[15px] font-bold" style={{ backgroundColor: "#fff0ed", color: "#c0392b", border: "1px dashed #c0392b" }} aria-expanded={showPollutants}>
        {showPollutants ? "▲ Hide" : "▼ Show"} what is in the exhaust, what each gas does, and what counts as unhealthy
      </button>
      {showPollutants && (
        <div className="pj-late mt-2 overflow-x-auto">
          <table className="pj-table pj-table--stack" style={{ fontSize: 14 }}>
            <thead>
              <tr>
                <th>Gas</th>
                <th>Permitted amount</th>
                <th>What it does to people</th>
                <th>Health standard / context</th>
                <th>Future humanity (20 years on)</th>
              </tr>
            </thead>
            <tbody>
              {pollutants.map((p) => (
                <tr key={p.name}>
                  <th scope="row">{p.name}</th>
                  <td data-label="Permitted amount">{p.amount}</td>
                  <td data-label="What it does to people">{p.does}</td>
                  <td data-label="Health standard / context">
                    {p.standard}
                    <Cite ids={p.sources} />
                  </td>
                  <td data-label="Future humanity (20 years on)" style={{ color: "#8e3b2f" }}>{p.future}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-[14px]" style={{ color: "#6b6b6b" }}>
            &quot;Held under 250 tons&quot; is the line above which a plant faces Prevention of Significant Deterioration review with best available controls; the permit keeps each
            gas just below it<Cite ids={["sob", "nmelc"]} />. Good or bad in plain terms: the area next to the site already fails the national smog standard
            <Cite ids={["sunland-park-ozone", "ala-sota-2025"]} />, so any addition lands on people already breathing unhealthy air on about 15 days a year.
          </p>
        </div>
      )}
      <p className="pj-fine mt-3 text-[14px]" style={{ color: "#6b6b6b" }}>
        Zero is not on the slider on purpose. Capture designs top out around 90 to 95%; the longest-running power-plant unit, Boundary Dam, captured 848,388 tonnes in 2024 at 85% availability against a 1-million-tonne design, so the slider starts at 90, not 95<Cite ids={["boundary-dam-2024", "ieefa-bd3"]} />. Use before storage: curing concrete with CO₂ and making carbonate aggregate are commercial (690,000 tonnes mineralized worldwide to date; one aggregate plant takes 5,000 tonnes a year)<Cite ids={["carboncure", "blue-planet"]} />, so the use slider starts at 10% and grows only as buyers sign; the pipeline to storage is the fallback, not the plan, and Process 4 shrinks the whole stream every year. The rest reaches zero by blending renewable gas and hydrogen, which Bloom hardware runs on
        <Cite ids={["bloom-fuels"]} />, plus verified removals; HB93 already requires net-zero by 2045<Cite ids={["cba"]} />. Storage depth: CO₂ stays a dense fluid below about 800 m
        / 2,625 ft under impermeable cap rock<Cite ids={["epa-class-vi-saline"]} />. New Mexico has no permitted Class VI wells yet, so the realistic path is a pipeline to Permian
        Basin storage<Cite ids={["epa-class-vi"]} />.
      </p>
    </Card>
  );
}

// ─── 3. Water ────────────────────────────────────────────────────────────────

function nmsuCost(mgd: number): number {
  const pts = NMSU_COST_POINTS;
  if (mgd <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) {
    if (mgd <= pts[i][0]) {
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      return y0 + ((mgd - x0) / (x1 - x0)) * (y1 - y0);
    }
  }
  return pts[pts.length - 1][1];
}

export function WaterDiagram() {
  const [mode, setMode] = usePlanMode();
  const [mgd, setMgd] = useState(5);
  const [part, setPart] = useState<string | null>(null);
  const ours = mode === "ours";
  const plant = nmsuCost(mgd);
  const system = plant * NMSU_SYSTEM_MULTIPLIER;
  const feed = mgd / NMSU_RECOVERY;
  const brine = feed - mgd;
  const acreFeet = mgd * 1120.9;
  const households = (mgd * 1_000_000) / GAL_PER_HOME_DAY;
  const nWells = Math.min(5, Math.ceil(mgd / 2));
  const nSkids = mgd;
  const nHomes = Math.min(10, Math.max(1, Math.round(households / 3500)));
  const tankFill = 8 + (mgd / 10) * 24;

  return (
    <Card voices={{ homeowner: "This is your tap. CRRUA needs 6 million gallons a day next year and 15 by 2042. The plant makes 5 million a day from water nobody could drink, so your supply goes up instead of down.", legislator: "The CBA already funds a $250,000 study of exactly this plant. NMSU designed and priced it in 2023. A lease condition that funds construction instead of a study delivers 5 MGD to CRRUA for about 0.16% of the bond.", business: "A designed, priced plant with a utility customer whose demand more than doubles by 2042, plus El Paso's precedent of recovering water and minerals from the brine. Water is a product here, not a cost.", overall: "Deep under the desert is salty water nobody can drink. A filter takes the salt out and gives 16,700 homes' worth of clean water a day to the town." }} kicker="Process 3 · Water" title="Salty groundwater in, clean water out" mode={mode} onMode={setMode} kid="Deep under the desert there is a huge lake of salty water nobody can drink. In their plan the campus takes drinking water from the town pipe and pumps an old farm's water for its fills. In ours, pumps bring the salty water up, server heat warms it, and a super-fine filter lets water through but not salt. Three cups out of four come out clean and go to homes. The salty cup is pumped very deep, below the good water, so it can never mix back in." sources={["nmsu", "epwater", "twdb", "cduaws", "cba", "faq", "haussamen-water", "cbd-well", "epa-watersense", "usgs-mesilla"]} intro={(<p>
        {ours ? (
          <>
            NMSU has already designed a 5 MGD brackish reverse-osmosis plant for Santa Teresa: 75% recovery, 1 MGD skids, $115.5M plant, $269.4M system, brine to deep injection wells
            <Cite ids={["nmsu"]} />. The Mesilla Basin holds roughly 65 million acre-feet of recoverable water<Cite ids={["nmsu", "cduaws"]} />. El Paso&apos;s Kay Bailey Hutchison plant has run
            this way since 2007 at 27.5 MGD<Cite ids={["epwater", "twdb"]} />. <strong>Not a loop:</strong> the brine goes 3,700–4,000 ft down, below the aquifer, exactly so it cannot come
            back and re-salt the water being treated.
          </>
        ) : (
          <>
            <strong>Their plan, as filed.</strong> Drinking water for offices comes from CRRUA, capped at 20,000 gallons a day average and 60,000 peak<Cite ids={["cba"]} />. Water for the
            one-time fills, 2.5 million gallons per hall and 960,000 for the fuel cells, is pumped from an old sod farm&apos;s right in the same fresh aquifer homes and farms use
            <Cite ids={["faq", "haussamen-water"]} />. Construction pumped more than 103 million gallons between April and August 2026 from a well the Supreme Court has since stayed
            <Cite ids={["cbd-well"]} />. The campus gives CRRUA $50 million and produces no water<Cite ids={["cba", "bocc"]} />.
          </>
        )}
      </p>)}>

      <div className="pj-frame"><svg viewBox="0 0 640 340" className="pj-diagram mb-2 w-full" role="img" aria-label={ours ? "How brackish groundwater becomes clean water" : "How their plan sources water"}>
        {ours ? (
          <>
            <Clickable id="brackishWell" selected={part} onSelect={setPart}>
              <rect x={10} y={200} width={130} height={130} fill="#e3cfa8" />
              <rect x={10} y={240} width={130} height={90} fill="#7a9bb5" />
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => <circle key={i} cx={18 + ((i * 13) % 115)} cy={250 + ((i * 11) % 70)} r={2} fill="#ffffff" pointerEvents="none" />)}
              {Array.from({ length: nWells }).map((_, i) => (
                <g key={i} pointerEvents="none">
                  <rect x={22 + i * 24} y={160} width={10} height={90} fill="#5a5a5a" />
                  <rect x={18 + i * 24} y={154} width={18} height={8} fill="#3c3c3c" />
                </g>
              ))}
            </Clickable>
            <Tag x={75} y={146} text={`1 · ${nWells} BRACKISH WELL${nWells > 1 ? "S" : ""}`} anchor="middle" bold size={9} color="#3c3c3c" />
            <Tag x={75} y={324} text="salty · 1,000–10,000 mg/L · looks clear" anchor="middle" size={8} bg="#e3cfa8" />
            <NewMarker box={{ x: 10, y: 200, w: 130, h: 130 }} side="right" />
            <Flow d="M75,154 V60 H140" color="#7a9bb5" width={Math.max(4, 3 + feed)} dur={2.6} />
            <Tag x={100} y={54} text={`${feed.toFixed(1)} MGD salty`} anchor="middle" size={8.5} color="#4a6a80" />

            {/* Same plate heat exchanger as Process 1, drawn the same way so readers recognize it. */}
            <Clickable id="preheat" selected={part} onSelect={setPart}>
              <rect x={140} y={35} width={95} height={50} rx={4} fill="#c0392b" />
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={i} x={149 + i * 10.5} y={42} width={5} height={36} fill="#ffffff" fillOpacity={0.75} pointerEvents="none" />)}
            </Clickable>
            <Tag x={187} y={96} text="2 · PREHEAT · HEAT EXCHANGER · +15 °C / +27 °F" anchor="middle" bold color="#c0392b" size={7.5} />
            <NewMarker box={{ x: 140, y: 35, w: 95, h: 50 }} side="top" />
            <Flow d="M235,60 H250" color="#7a9bb5" width={7} dur={1.2} />

            <Clickable id="filters" selected={part} onSelect={setPart}>
              <rect x={250} y={35} width={95} height={50} rx={4} fill="#8a949b" />
              <text className="pj-num " x={297} y={54} textAnchor="middle" fontSize={10} fontWeight={800} fill="#fff" pointerEvents="none">3 · FILTERS</text>
              <text x={297} y={68} textAnchor="middle" fontSize={8} fill="#f0f0f0" pointerEvents="none">sand · cartridges</text>
            </Clickable>
            <Flow d="M345,60 H400" color="#7a9bb5" width={7} dur={1.2} />

            <Clickable id="reverseOsmosis" selected={part} onSelect={setPart}>
              <rect x={400} y={18} width={230} height={84} rx={6} fill="#1f7ae0" />
              {Array.from({ length: nSkids }).map((_, i) => {
                const w = Math.min(20, Math.floor(210 / nSkids)) - 3;
                const x = 410 + i * (w + 3);
                return (
                  <g key={i} pointerEvents="none">
                    <rect x={x} y={30} width={w} height={60} rx={2} fill="#ffffff" fillOpacity={0.9} />
                    <rect x={x + w / 2 - 1} y={32} width={2} height={56} fill="#1f7ae0" />
                    <circle cx={x + w * 0.28} cy={45 + (i % 3) * 12} r={1.6} fill="#5a5a5a" />
                    <circle cx={x + w * 0.28} cy={70 - (i % 2) * 10} r={1.6} fill="#5a5a5a" />
                    <circle cx={x + w * 0.74} cy={52 + (i % 2) * 14} r={1.2} fill="#7fb7ff" />
                  </g>
                );
              })}
            </Clickable>
            <Tag x={515} y={12} text={`4 · REVERSE OSMOSIS · ${nSkids} × 1 MGD skid${nSkids > 1 ? "s" : ""} · ~800 psi`} anchor="middle" bold size={9} color="#1f5f3a" />
            <NewMarker box={{ x: 400, y: 18, w: 230, h: 84 }} side="left" />
            <Tag x={515} y={116} text="salt stays on one side of each membrane · water squeezes through" anchor="middle" size={7.5} />

            <Flow d="M630,60 H636 V150 H560" color="#1f7ae0" width={Math.max(4, 3 + mgd)} dur={2.4} />
            <Clickable id="storageTank" selected={part} onSelect={setPart}>
              <rect x={470} y={130} width={90} height={40} rx={4} fill="#dbe9f7" stroke="#1f7ae0" strokeWidth={1.2} />
              <rect x={470} y={170 - tankFill} width={90} height={tankFill} rx={2} fill="#1f7ae0" pointerEvents="none" />
            </Clickable>
            <Tag x={515} y={190} text={`5 · TREATED DRINKING-WATER TANK · ${mgd} MGD (${Math.round(NMSU_RECOVERY * 100)}% of the feed)`} anchor="middle" bold size={8.5} color="#1f5f3a" />
            <Flow d="M470,150 H370" color="#1f7ae0" width={Math.max(4, 3 + mgd)} dur={2} />
            <Clickable id="crruaMains" selected={part} onSelect={setPart}>
              <rect x={280} y={132} width={90} height={36} rx={4} fill="#2e8b57" />
              <text x={325} y={147} textAnchor="middle" fontSize={9.5} fontWeight={800} fill="#fff" pointerEvents="none">CRRUA MAINS</text>
              <text x={325} y={160} textAnchor="middle" fontSize={8.5} fill="#e8f8ee" pointerEvents="none">homes · greenhouses</text>
              {Array.from({ length: nHomes }).map((_, i) => <House key={i} x={250 + i * 16} y={200} />)}
            </Clickable>
            <NewMarker box={{ x: 280, y: 132, w: 90, h: 36 }} side="left" />
            <Flow d="M325,168 V196" color="#2e8b57" width={3} dur={2} r={2.4} />
            <Tag x={270} y={230} text={`${Math.round(households / 1000)}k homes' daily water · ${Math.round((mgd / CRRUA_2027_MGD) * 100)}% of CRRUA's 2027 need`} anchor="middle" size={8} color="#1f5f3a" bold />
            <Tag x={270} y={244} text="used water goes back to CRRUA's treatment plant, as today" anchor="middle" size={7.5} color="#6b6b6b" />

            <Flow d="M420,102 V215 H520 V262" color="#8e3b2f" width={Math.max(2, 2 + brine * 1.5)} dur={3} />
            <Clickable id="brineWell" selected={part} onSelect={setPart}>
              <rect x={438} y={258} width={196} height={82} fill="transparent" />
              <rect x={440} y={262} width={190} height={20} fill="#a9c4d8" />
              <rect x={440} y={282} width={190} height={14} fill="#5a5a5a" />
              <rect x={440} y={296} width={190} height={44} fill="#7a6142" />
              <rect x={514} y={258} width={12} height={70} fill="#5a5a5a" pointerEvents="none" />
            </Clickable>
            <Tag x={535} y={256} text={`6 · ${brine.toFixed(1)} MGD brine · injected ~20 miles away`} anchor="middle" bold size={8.5} color="#8e3b2f" />
            <Tag x={480} y={276} text="brackish aquifer" anchor="middle" size={7.5} bg="#a9c4d8" />
            <Tag x={480} y={293} text="confining rock" anchor="middle" size={7.5} color="#fff" bg="#5a5a5a" />
            <Tag x={535} y={334} text="sealed 3,700–4,000 ft down · does NOT loop back" anchor="middle" size={7.5} color="#fff" bg="#7a6142" />
          </>
        ) : (
          <>
            <Clickable id="crruaMains" selected={part} onSelect={setPart}>
              <rect x={10} y={30} width={130} height={56} rx={4} fill="#2e8b57" />
              <text x={75} y={52} textAnchor="middle" fontSize={10} fontWeight={800} fill="#fff" pointerEvents="none">CRRUA DRINKING WATER</text>
              <text x={75} y={68} textAnchor="middle" fontSize={8.5} fill="#e8f8ee" pointerEvents="none">the town&apos;s pipe</text>
            </Clickable>
            <Flow d="M140,58 H260" color="#2e8b57" width={4} dur={2.4} r={2.4} />
            <Tag x={200} y={104} text="20,000 gal/day avg · 60,000 peak · signed cap" anchor="middle" size={8.5} />
            <rect x={260} y={30} width={120} height={56} rx={4} fill="#9aa5ad" />
            <text x={320} y={52} textAnchor="middle" fontSize={10} fontWeight={800} fill="#fff">OFFICES</text>
            <text x={320} y={68} textAnchor="middle" fontSize={8.5} fill="#f0f0f0">sinks · restrooms · kitchens</text>

            <Clickable id="sodFarmWell" selected={part} onSelect={setPart}>
              <rect x={10} y={150} width={130} height={60} fill="#b89a6a" />
              <rect x={10} y={185} width={130} height={25} fill="#7a9bb5" pointerEvents="none" />
              <rect x={60} y={120} width={10} height={70} fill="#5a5a5a" pointerEvents="none" />
            </Clickable>
            <Tag x={12} y={140} text="SOD-FARM WELL · fresh aquifer water, taken" anchor="start" bold size={8.5} color="#8e3b2f" />
            <Tag x={75} y={228} text="up to ~2,400 acre-feet a year" anchor="middle" size={8.5} />
            <Flow d="M75,120 V160 M140,180 H260" color="#7a9bb5" width={6} dur={2.4} />
            <Clickable id="closedLoop" selected={part} onSelect={setPart}>
              <rect x={260} y={150} width={140} height={64} rx={4} fill="#003047" />
              <text x={330} y={170} textAnchor="middle" fontSize={10} fontWeight={800} fill="#fff" pointerEvents="none">CLOSED LOOPS</text>
              <text className="pj-num " x={330} y={185} textAnchor="middle" fontSize={8} fill="#cfe6ff" pointerEvents="none">2.5M gal × 4 halls · 960k fuel cells</text>
              <text x={330} y={199} textAnchor="middle" fontSize={8} fill="#cfe6ff" pointerEvents="none">filled once · small top-offs · click</text>
            </Clickable>
            <Tag x={330} y={232} text="non-potable · operating volume undisclosed" anchor="middle" size={8.5} color="#8e3b2f" />

            <rect x={10} y={250} width={130} height={56} rx={4} fill="#8e3b2f" />
            <text x={75} y={272} textAnchor="middle" fontSize={10} fontWeight={800} fill="#fff">CONSTRUCTION</text>
            <text x={75} y={288} textAnchor="middle" fontSize={8.5} fill="#ffe0da">dust, compaction, concrete</text>
            <Tag x={150} y={282} text="103M+ gal pumped Apr–Aug 2026 · well stayed by NM Supreme Court" anchor="start" size={8.5} color="#8e3b2f" />

            <rect x={445} y={30} width={187} height={286} rx={4} fill="none" stroke="#c0392b" strokeWidth={1.2} strokeDasharray="6 4" />
            <text x={538} y={120} textAnchor="middle" fontSize={10} fontWeight={800} fill="#c0392b">NO WATER IS PRODUCED</text>
            <text x={538} y={142} textAnchor="middle" fontSize={8.5} fill="#3c3c3c">$50M cheque to CRRUA for pipes</text>
            <text x={538} y={158} textAnchor="middle" fontSize={8.5} fill="#3c3c3c">$250k to study a desalination plant</text>
            <text x={538} y={182} textAnchor="middle" fontSize={8.5} fill="#3c3c3c">CRRUA need: 6 MGD by 2027, 15 by 2042</text>
            <text x={538} y={206} textAnchor="middle" fontSize={8.5} fill="#3c3c3c">NMSU&apos;s 5 MGD plant design sits unfunded</text>
            <text x={538} y={240} textAnchor="middle" fontSize={8.5} fill="#6b6b6b">&quot;nine households&quot; counts only the fills,</text>
            <text x={538} y={254} textAnchor="middle" fontSize={8.5} fill="#6b6b6b">not offices, construction or the sod farm</text>
            <text x={538} y={290} textAnchor="middle" fontSize={8.5} fill="#8e3b2f">Mesilla Basin storage has fallen in most</text>
            <text x={538} y={304} textAnchor="middle" fontSize={8.5} fill="#8e3b2f">five-year periods since 1985 (USGS)</text>
          </>
        )}
      </svg></div>
      <PartInfo id={part} onClose={() => setPart(null)} />

      <Slider label="Plant capacity" value={ours ? mgd : 0} min={ours ? 1 : 0} max={10} step={1} unit="MGD" onChange={setMgd} disabled={!ours} />
      <div className="pj-stats mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ours ? (
          <>
            <Stat label="Clean water made" value={`${mgd} M gal/day`} sub={`${Math.round(acreFeet).toLocaleString()} acre-feet a year`} color="#1f7ae0" />
            <Stat label="Homes' daily water" value={`~${Math.round(households / 1000).toLocaleString()}k`} sub={<>at {GAL_PER_HOME_DAY} gal/day per home<Cite ids={["epa-watersense"]} /></>} color="#2e8b57" />
            <Stat label="Of CRRUA's 2027 demand" value={`${Math.round((mgd / CRRUA_2027_MGD) * 100)}%`} sub={<>6 MGD projected<Cite ids={["nmsu"]} /></>} color="#2e8b57" />
            <Stat label="Whole-system cost" value={`$${Math.round(system)}M`} sub={<>plant alone ${Math.round(plant)}M, NMSU 2023<Cite ids={["nmsu"]} /></>} color="#d99a00" />
            <Stat label="Share of $165B bond" value={pctOfBond(system)} sub="what we ask them to fund" color="#d99a00" />
            <Stat label="Brine to inject" value={`${brine.toFixed(1)} MGD`} sub={<>two deep wells ~20 miles out<Cite ids={["nmsu"]} /></>} color="#8e3b2f" />
          </>
        ) : (
          <>
            <Stat label="Water produced" value="0" sub="nothing is made; water is only taken" color="#c0392b" />
            <Stat label="Drinking water taken, signed cap" value="20k gal/day" sub={<>60,000 peak<Cite ids={["cba"]} /></>} />
            <Stat label="Non-potable taken" value="undisclosed" sub={<>Oracle declined to state a volume<Cite ids={["haussamen-water"]} /></>} color="#8e3b2f" />
            <Stat label="One-time fills" value="~11M gal" sub={<>2.5M × 4 halls + 960k fuel cells<Cite ids={["faq"]} /></>} />
            <Stat label="Construction pumped" value="103M+ gal" sub={<>Apr–Aug 2026<Cite ids={["cbd-well"]} /></>} color="#8e3b2f" />
            <Stat label="Money instead" value="$50M" sub={<>to CRRUA pipes, almost fully paid<Cite ids={["bocc"]} /></>} />
          </>
        )}
      </div>
      {ours && <CostStrip millions={system} label={`for the whole ${mgd} MGD system: wells, plant, storage, brine wells, lines (NMSU 2023 figures)`} who="the developer, delivered to CRRUA and the county" />}
      <p className="pj-fine mt-3 text-[14px]" style={{ color: "#6b6b6b" }}>
        Brine does not have to be the end of the line: El Paso&apos;s board approved recovering about 3 MGD of drinking water and minerals from its KBH brine in 2026<Cite ids={["epwater-brine-recovery"]} />, and a brine concentrator run on summer server heat would cut the injected volume by half or more (an estimate with a real energy cost)<Cite ids={["zld-nature-water", "reclamation-zld"]} />. Costs interpolate NMSU&apos;s 2023 figures for 1, 5 and 10 MGD plants and scale to the whole system using the study&apos;s 5 MGD ratio. Well count and home count are
        illustrative. Reverse osmosis is the proven method; server heat is a helper, not the engine. The county is already paying $250,000 to study a desalination plant
        <Cite ids={["cba"]} />; the plan asks them to fund the one NMSU designed.
      </p>
    </Card>
  );
}

// ─── 4. Solar: roof by roof on the blueprint ─────────────────────────────────

const HALL_SQFT_TOTAL = 3_000_000; // reported total, KTSM
const ROOF_W_PER_SQFT = 10; // DC watts per usable square foot, standard rooftop yield
const ROOF_USABLE = 0.7;
const SOLAR_COST_PER_W = 1.5; // DOE Q1 2024 commercial benchmark range $1.34–$1.51/Wdc

type SolarStep = { id: string; label: string; featureIds: string[]; sqft: number; note: string; conditional?: boolean };

function hallArea(id: string) {
  const f = features.find((x) => x.id === id)!;
  return f.rect.w * f.rect.h;
}
const hallIds = ["dcMain", "dcN1", "dcN2", "dcE"];
const hallAreaTotal = hallIds.reduce((s, id) => s + hallArea(id), 0);
const sqftPerUnit = HALL_SQFT_TOTAL / hallAreaTotal;

const solarSteps: SolarStep[] = [
  { id: "dcMain", label: "Main data center roof", featureIds: ["dcMain"], sqft: hallArea("dcMain") * sqftPerUnit, note: "Largest roof on the site." },
  { id: "dcN1", label: "North-west hall roof", featureIds: ["dcN1"], sqft: hallArea("dcN1") * sqftPerUnit, note: "" },
  { id: "dcN2", label: "North-east hall roof", featureIds: ["dcN2"], sqft: hallArea("dcN2") * sqftPerUnit, note: "" },
  { id: "dcE", label: "East hall roof", featureIds: ["dcE"], sqft: hallArea("dcE") * sqftPerUnit, note: "" },
  { id: "warehouse", label: "Warehouse roof", featureIds: ["warehouse"], sqft: hallArea("warehouse") * sqftPerUnit, note: "" },
  { id: "ops", label: "Operations roof", featureIds: ["ops"], sqft: hallArea("ops") * sqftPerUnit, note: "" },
  { id: "parking", label: "Parking canopy", featureIds: ["parking"], sqft: hallArea("parking") * sqftPerUnit, note: "Shaded cars as a bonus." },
  { id: "greenhouse", label: "¼ of greenhouse roof (semi-transparent)", featureIds: ["greenhouse"], sqft: 150 * 43560 * 0.25 * 0.5, note: "Only if greenhouses are built.", conditional: true },
];

export function SolarDiagram() {
  const [mode, setMode] = usePlanMode();
  const [step, setStep] = useState(4);
  const [part, setPart] = useState<string | null>(null);
  const [roof, setRoof] = useState<string | null>(null);
  const ours = mode === "ours";
  const active = ours ? solarSteps.slice(0, step) : [];
  const peakMW = active.reduce((s, x) => s + (x.sqft * ROOF_USABLE * ROOF_W_PER_SQFT) / 1e6, 0);
  const avgMW = peakMW * SOLAR_CAPACITY_FACTOR;
  const pct = (avgMW / IT_LOAD_MW) * 100;
  const activeIds = new Set(active.flatMap((x) => x.featureIds));
  const shown = features.filter((f) => f.plan === "both" || (ours && f.plan === "ours"));
  const mapH = ours ? CANVAS.h : 640;
  const allPeak = solarSteps.reduce((s, x) => s + (x.sqft * ROOF_USABLE * ROOF_W_PER_SQFT) / 1e6, 0);
  const costM = (allPeak * 1e6 * SOLAR_COST_PER_W) / 1e6;
  const roofStep = roof ? solarSteps.find((s) => s.id === roof) : null;
  const [geoMW, setGeoMW] = useState(150);
  const [ppaMW, setPpaMW] = useState(500);
  const geoAvg = ours ? geoMW * 0.9 : 0;
  const ppaAvg = ours ? ppaMW * 0.4 : 0;
  const cleanAvg = avgMW + geoAvg + ppaAvg;
  const gasShare = Math.max(0, 1 - cleanAvg / IT_LOAD_MW);
  const gasHours = Math.round(8760 * gasShare);
  const co2Avoided = GHG_PERMIT_TPY * (1 - gasShare);
  const stacksIdle = Math.round(STACKS * (1 - gasShare));

  return (
    <Card voices={{ homeowner: "Every hour the fuel cells rest is an hour with no exhaust over your neighborhood. Hot rock under this valley and New Mexico's own wind can take those hours, more of them every year.", legislator: "HB93 requires net-zero by 2045 but sets no path. A lease condition for geothermal test wells in Phase 1 and a delivered-renewables contract gives the 2045 zero a schedule, with Google's 396 MW geothermal purchase as the market precedent.", business: "Gas is the plant's largest operating cost. Geothermal at about 90% capacity factor and contracted wind at 40% cut gas hours directly, and both are bought at fixed prices while gas is not.", overall: "The best way to make less smoke is to burn less gas. Hot rock under the valley and the biggest wind farm in America can take over more of the work every year." }} kicker="Process 4 · Retire the gas" title="Solar on the roofs, geothermal in the ground, wind on the wire" mode={mode} onMode={setMode} kid="The best way to make less smoke is to burn less gas. The sun goes on every roof, but that is a tiny slice. The big slices are hot rock deep under this valley, which can make power day and night, and the giant wind farm New Mexico just switched on, whose power can come here by wire. Every year more clean power arrives and the gas machines run less, until the law says zero in 2045." sources={["ktsm-sqft", "notice", "render", "cba", "doe-pv-cost", "lightning-dock", "dona-ana-geothermal", "nm-geothermal-handout", "fervo-cape", "fervo-google", "sunzia-eia", "sob"]} intro={(<p>
        {ours ? (
          <>
            Cleaning the exhaust is the second-best answer; the best is fewer hours of gas. Three clean sources, in order of size. <strong>Geothermal:</strong> this
            county sits on the Rio Grande rift, where 150 °C rock is 1 to 5.5 km down<Cite ids={["dona-ana-geothermal"]} />; New Mexico already runs an 11 MW geothermal
            plant at Lightning Dock<Cite ids={["lightning-dock"]} />, and enhanced geothermal is now sold at data-center scale: Fervo&apos;s Cape Station delivers 100 MW in
            2026 and 500 MW by 2028, with Google buying 396 MW<Cite ids={["fervo-cape", "fervo-google"]} />. <strong>Wind on the wire:</strong> SunZia, 3,650 MW of New
            Mexico wind, was commissioned in 2026<Cite ids={["sunzia-eia"]} />; a delivered power-purchase agreement throttles the fuel cells when it blows.{" "}
            <strong>Rooftop solar:</strong> the halls total about 3 million square feet<Cite ids={["ktsm-sqft"]} />; drag the roof slider to add panels. It is the smallest
            slice and the card says so. Their &quot;100% matching by 2031&quot; is the same idea done as paperwork; this is done as delivered megawatts.
          </>
        ) : (
          <>
            <strong>Their plan, as filed.</strong> All 2,462 MW come from natural-gas fuel cells running 8,760 hours a year<Cite ids={["notice", "sob"]} />, with battery storage
            for smoothing<Cite ids={["cba"]} />. No solar, geothermal or delivered wind appears on the render or in any filing<Cite ids={["render"]} />; the CBA says only that the
            microgrid is &quot;actively exploring renewable energy integration in accordance with HB93&quot;<Cite ids={["cba"]} />, and HB93 does not require zero until 2045.
          </>
        )}
      </p>)}>

      <div className="pj-frame"><svg viewBox={`0 0 ${CANVAS.w} ${mapH + 96}`} className="pj-diagram mb-2 w-full rounded" style={{ backgroundColor: "#e8d9b8" }} role="img" aria-label="Blueprint with solar, geothermal and delivered wind">
        <defs>
          <pattern id="solar-mini" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" fill="#1d3557" />
            <path d="M0 0H8M0 4H8M4 0V8" stroke="#6ea8ff" strokeWidth="0.6" />
          </pattern>
        </defs>
        <polygon points={ours ? FENCE_OURS : FENCE_THEIRS} fill="#dccaa3" fillOpacity={0.5} stroke="#3c3c3c" strokeWidth={2} strokeDasharray="10 5" />
        {shown.map((f) => {
          const on = activeIds.has(f.id);
          const isGh = f.id === "greenhouse";
          const clickable = solarSteps.some((s) => s.id === f.id);
          const body = (
            <g key={f.id}>
              <rect x={f.rect.x} y={f.rect.y} width={f.rect.w} height={f.rect.h} fill={isGh ? "#2e8b57" : f.plan === "ours" ? (f.id === "water" ? "#1f7ae0" : f.id === "packing" ? "#d99a00" : f.id === "capture" ? "#2e8b57" : f.id === "solarGround" ? "#1d3557" : "#2e8b57") : f.kind === "coolers" ? "#6f8f9a" : f.kind === "yard" ? "#8a949b" : f.kind === "gate" ? "#3c3c3c" : "#efe9dc"} stroke={roof === f.id ? "#c0392b" : "#3c3c3c"} strokeWidth={roof === f.id ? 5 : 1} />
              {on && <rect x={f.rect.x + 4} y={f.rect.y + 4} width={f.rect.w - 8} height={isGh ? (f.rect.h - 8) * 0.25 : f.rect.h - 8} fill="url(#solar-mini)" pointerEvents="none" />}
              {(f.kind === "hall" || f.kind === "building" || f.kind === "parking" || (f.plan === "ours" && f.rect.h > 60)) && (
                <text x={f.rect.x + f.rect.w / 2} y={f.rect.y + f.rect.h / 2 + 4} textAnchor="middle" fontSize={11} fontWeight={900} fill={on ? "#ffffff" : "#003047"} style={{ paintOrder: "stroke", stroke: on ? "rgba(0,0,0,0.5)" : "none", strokeWidth: 3 }} pointerEvents="none">
                  {f.label}
                </text>
              )}
            </g>
          );
          return clickable ? (
            <g key={f.id} role="button" tabIndex={0} style={{ cursor: "pointer" }} onClick={() => { setRoof(f.id); setPart(isGh ? "solarAlternatives" : "solarRoof"); }} onKeyDown={(e) => { if (e.key === "Enter") { setRoof(f.id); setPart("solarRoof"); } }}>
              {body}
            </g>
          ) : (
            body
          );
        })}
        {!ours && (
          <g transform={`translate(0 ${(640) - 560 + 12})`}>
            <rect x={250} y={560} width={700} height={60} rx={6} fill="#ffffff" fillOpacity={0.92} />
            <text x={600} y={585} textAnchor="middle" fontSize={16} fontWeight={900} fill="#c0392b">GAS FUEL CELLS 8,760 HOURS A YEAR · 0 MW CLEAN</text>
            <text x={600} y={606} textAnchor="middle" fontSize={11} fill="#3c3c3c">no solar, no geothermal, no delivered wind · nothing retires before 2045</text>
          </g>
        )}
        {ours && (
          <g transform={`translate(0 ${mapH - 556 + 12})`}>
            <rect x={250} y={556} width={700} height={70} rx={6} fill="#ffffff" fillOpacity={0.94} />
            <Clickable id="geothermal" selected={part} onSelect={setPart}>
              <rect x={262} y={566} width={210} height={50} rx={4} fill={G} />
              <text x={367} y={586} textAnchor="middle" fontSize={11} fontWeight={900} fill="#fff" pointerEvents="none">GEOTHERMAL WELLS</text>
              <text className="pj-num " x={367} y={603} textAnchor="middle" fontSize={9} fill="#e8f8ee" pointerEvents="none">{`${ours ? geoMW : 0} MW · hot rock under the rift`}</text>
            </Clickable>
            <Clickable id="deliveredRenewables" selected={part} onSelect={setPart}>
              <rect x={490} y={566} width={220} height={50} rx={4} fill={G} />
              <text x={600} y={586} textAnchor="middle" fontSize={11} fontWeight={900} fill="#fff" pointerEvents="none">WIND + SOLAR ON THE WIRE</text>
              <text className="pj-num " x={600} y={603} textAnchor="middle" fontSize={9} fill="#e8f8ee" pointerEvents="none">{`${ours ? ppaMW : 0} MW contracted · SunZia and El Paso grid`}</text>
            </Clickable>
            <Clickable id="solarRoof" selected={part} onSelect={setPart}>
              <rect x={728} y={566} width={210} height={50} rx={4} fill="#1d3557" />
              <text x={833} y={586} textAnchor="middle" fontSize={11} fontWeight={900} fill="#fff" pointerEvents="none">ROOFTOP SOLAR</text>
              <text className="pj-num " x={833} y={603} textAnchor="middle" fontSize={9} fill="#e9f0ff" pointerEvents="none">{`${peakMW.toFixed(0)} MW peak · the small slice`}</text>
            </Clickable>
            <NewMarker box={{ x: 262, y: 566, w: 210, h: 50 }} side="top" />
            <NewMarker box={{ x: 490, y: 566, w: 220, h: 50 }} side="top" />
          </g>
        )}
      </svg></div>
      {roofStep && part && (
        <div className="mb-2 rounded px-3 py-2" style={{ backgroundColor: "#e9f0ff", fontSize: 15, color: "#1d3557" }}>
          <strong>This roof: {roofStep.label}.</strong> About {Math.round(roofStep.sqft / 1000).toLocaleString()}k sq ft usable area scaled from the render →{" "}
          {((roofStep.sqft * ROOF_USABLE * ROOF_W_PER_SQFT) / 1e6).toFixed(1)} MW peak, ≈ ${Math.round((roofStep.sqft * ROOF_USABLE * ROOF_W_PER_SQFT * SOLAR_COST_PER_W) / 1e6)}M installed at $1.50/W
          <Cite ids={["doe-pv-cost"]} />. {roofStep.note}
        </div>
      )}
      <PartInfo id={part} onClose={() => { setPart(null); setRoof(null); }} />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Slider label="Geothermal built by 2032 (MW)" value={ours ? geoMW : 0} min={0} max={500} step={25} unit="MW" onChange={setGeoMW} disabled={!ours} />
        <Slider label="Wind + solar delivered by wire (MW contracted)" value={ours ? ppaMW : 0} min={0} max={2000} step={100} unit="MW" onChange={setPpaMW} disabled={!ours} />
        <Slider label="Roofs with solar" value={ours ? step : 0} min={0} max={solarSteps.length} step={1} unit={`of ${solarSteps.length}`} onChange={setStep} disabled={!ours} />
      </div>
      <div className="mt-4">
        <Bar what="where the electricity comes from on an average hour" total={IT_LOAD_MW} parts={[{ label: "Gas fuel cells (avg MW)", value: IT_LOAD_MW * gasShare, color: "#c0392b" }, { label: "Geothermal (avg MW)", value: geoAvg, color: "#2e8b57" }, { label: "Wind + solar by wire (avg MW)", value: ppaAvg, color: "#1f7ae0" }, { label: "Rooftop solar (avg MW)", value: avgMW, color: "#e07b00" }]} />
      </div>
      <ol className="pj-list mt-3 grid grid-cols-1 gap-1 sm:grid-cols-2" style={{ fontSize: 14 }}>
        {solarSteps.map((s, i) => {
          const mw = (s.sqft * ROOF_USABLE * ROOF_W_PER_SQFT) / 1e6;
          const on = ours && i < step;
          return (
            <li key={s.id} className="flex items-center gap-2 rounded px-2 py-1" style={{ backgroundColor: on ? "#e9f0ff" : "transparent", color: on ? "#1d3557" : "#9a9a9a" }}>
              <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: on ? "#1d3557" : "#d9d9d9" }} />
              <span className="flex-1">
                {i + 1}. {s.label}
                {s.conditional && <span className="ml-1 text-[12px] font-bold uppercase" style={{ color: "#c0392b" }}>proposed</span>}
              </span>
              <strong>{mw.toFixed(1)} MW</strong>
            </li>
          );
        })}
      </ol>
      <div className="pj-stats mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Gas hours a year, equivalent" value={`${gasHours.toLocaleString()} of 8,760`} sub={ours ? `${Math.round((1 - gasShare) * 100)}% of the load is clean on average (estimate)` : "every hour, every stack"} color={gasShare < 0.8 ? "#2e8b57" : "#c0392b"} />
        <Stat label="CO₂ avoided before any capture" value={`${(co2Avoided / 1e6).toFixed(1)} Mt/yr`} sub={<>of the {(GHG_PERMIT_TPY / 1e6).toFixed(1)} Mt permitted<Cite ids={["sob"]} /></>} color="#2e8b57" />
        <Stat label="Stacks that can sit idle" value={`~${stacksIdle.toLocaleString()} of ${STACKS.toLocaleString()}`} sub="on an average hour (estimate)" color="#2e8b57" />
        <Stat label="Rooftop peak" value={`${peakMW.toFixed(1)} MW`} sub={`${Math.round(active.reduce((s, x) => s + x.sqft, 0) / 1000).toLocaleString()}k sq ft of roof`} color="#e07b00" />
        <Stat label="Share of campus load" value={`${pct.toFixed(2)}%`} sub={<>of 2,462 MW<Cite ids={["notice"]} />. This is the honest number</>} color="#c0392b" />
        <Stat label="Average output" value={`${avgMW.toFixed(1)} MW`} sub={ours ? "enough for greenhouses, water plant, offices" : "no solar in their plan"} color="#2e8b57" />
      </div>
      {ours && <CostStrip millions={costM + geoMW * 3} label={`for ${geoMW} MW of enhanced geothermal at about $3M per MW (Fervo has raised about $1.5B for 500 MW; estimate) plus all ${solarSteps.length} roofs at $1.50 per watt; the delivered wind and solar is bought by contract, not built`} who="the developer, offset by lower gas purchases" />}
      <p className="pj-fine mt-3 text-[14px]" style={{ color: "#6b6b6b" }}>
        Geothermal is counted at a 90% capacity factor and delivered wind and solar at 40%, both typical, and the fuel cells are assumed to throttle in proportion; the
        &quot;gas hours&quot; figure is that average expressed as full-load hours, an estimate. Enhanced geothermal is itself deep injection of water and carries the same
        induced-seismicity rules as any injection well<Cite ids={["usgs-induced"]} />; the difference is zero exhaust and power around the clock. Roof areas other than the
        halls are scaled from the render. Rooftop solar alone is about 1% of the load, and this card says so instead of hiding it.
      </p>
    </Card>
  );
}

// ─── 5. Greenhouses ──────────────────────────────────────────────────────────

export function GreenhouseDiagram() {
  const [mode, setMode] = usePlanMode();
  const [acres, setAcres] = useState(GH_ACRES_PHASE1);
  const [season, setSeason] = useState<"winter" | "summer">("winter");
  const [part, setPart] = useState<string | null>(null);
  const ours = mode === "ours";
  const winter = season === "winter";
  const jobs = acres * GH_JOBS_PER_ACRE;
  const lbs = acres * GH_LBS_PER_ACRE;
  const waterSaved = lbs * GH_WATER_SAVED_GAL_PER_LB;
  const co2 = acres * GH_CO2_TONS_PER_ACRE;
  const heat = winter ? acres * GH_PEAK_MW_PER_ACRE : 0;
  const lease = acres * GH_LEASE_PER_ACRE_M;
  const nBays = Math.max(1, Math.min(8, Math.round(acres / 50)));
  const bayW = Math.min(46, Math.floor(330 / nBays));
  const nPeople = Math.max(1, Math.min(14, Math.round(jobs / 100)));
  const nTrucks = Math.max(1, Math.min(6, Math.round(lbs / 12_000_000)));

  return (
    <Card tools={ours ? <SeasonToggle season={season} onChange={setSeason} labels={["Winter", "Summer"]} /> : null} voices={{ homeowner: "These are jobs you can drive to and food you can buy in town: about 1,500 greenhouse, water and training jobs on top of the tech jobs, and about 60 million pounds of local produce a year.", legislator: "Greenhouse staffing is what lifts the enforceable job count from 750 to about 3,000, and the land lease is revenue the county can condition. The Data Center Standards bill makes heat-to-agriculture a statewide expectation.", business: "About 150 acres of leasable land with heat and CO₂ supplied, at about $130,000 an acre a year in lease and heat revenue, with a packing house at the border crossing. Grower capital, off the developer's balance sheet.", overall: "Plants love warm roots and extra CO₂, and the data center has both to spare. Farmers rent the land next to the fans and grow food all year." }} kicker="Process 5 · Food & jobs" title="Greenhouses next to the dry coolers" mode={mode} onMode={setMode} kid="Plants love warm roots and extra CO₂, and the data center has both to spare. In their plan the land next to the fans stays empty desert and the promise is 750 jobs. In ours, farmers rent that land, pipe in the warm water and the captured gas, and grow tomatoes and lettuce all winter with no bug spray. Every 50 acres is one block of glass and about 300 people." sources={["cba", "epm-jobs", "sob", "sweden", "waterpdf"]} intro={(<p>
        {ours ? (
          <>
            Heat comes from the dry-cooler loop and CO₂ from the capture skids, whose exhaust is about 95% CO₂<Cite ids={["sob"]} />. Santa Teresa winters are short
            but real: December to February nights drop into the 20s and 30s °F, and a greenhouse needs root heat on every cold night from November to March. The rest of the
            year the same heat is not idle: it runs absorption chillers, standard hardware that makes cold from 65–100 °C water, to cool the glass in summer and to run
            cold storage in the packing house<Cite ids={["absorption-review", "absorption-multistage"]} />. Heat is used twelve months a year, for warmth in winter and for
            cold in summer. Gothenburg already runs a greenhouse on data-center heat<Cite ids={["sweden"]} />. Slide the acres:
            more blocks, more workers, more trucks.
          </>
        ) : (
          <>
            <strong>Their plan, as filed.</strong> The binding job commitment is 750 full-time and 50 part-time positions within three years of opening, at an average wage of $75,000 to
            $100,000<Cite ids={["cba", "epm-jobs"]} />, against 1,500 advertised. Heat goes to the sky, CO₂ goes to the sky, and the land beside the dry coolers stays open desert in the
            render<Cite ids={["render"]} />. Their closed-loop cooling is the one thing here we keep exactly as designed: click it to see why it makes sense for them.
          </>
        )}
      </p>)}>

      <div className="pj-frame"><svg viewBox="0 0 640 300" className="pj-diagram mb-2 w-full" role="img" aria-label={ours ? "How the greenhouses use heat and CO₂ and create jobs" : "Their plan: heat and CO₂ to the sky, empty land"}>
        <Clickable id="dryCoolers" selected={part} onSelect={setPart}>
          <rect x={10} y={40} width={120} height={80} rx={4} fill="#6f8f9a" />
          <FanBank x={18} y={48} w={104} h={64} dur={ours ? 1.2 : 0.7} />
        </Clickable>
        <Tag x={70} y={ours ? 34 : 37} text="DRY COOLERS (THEIRS)" anchor="middle" bold size={8.5} color="#3f5a63" />
        {ours ? (
          <>
            <Clickable id="captureSkid" selected={part} onSelect={setPart}>
              <rect x={10} y={140} width={120} height={36} rx={4} fill={G} />
              <text x={70} y={155} textAnchor="middle" fontSize={9.5} fontWeight={800} fill="#fff" pointerEvents="none">CAPTURE SKIDS</text>
              <text className="pj-num " x={70} y={168} textAnchor="middle" fontSize={8.5} fill="#e8f8ee" pointerEvents="none">CO₂ ≈95% pure</text>
            </Clickable>
            <NewMarker box={{ x: 10, y: 140, w: 120, h: 36 }} side="top" />
            <Flow d="M130,70 H180" color="#c0392b" width={Math.max(3, Math.min(10, heat / 20))} dur={1.8} active={winter} />
            <Tag x={152} y={88} text={winter ? `${Math.round(heat)} MW heat` : "heat off"} anchor="middle" size={8} color={winter ? "#c0392b" : "#6b6b6b"} />
            <Flow d="M130,158 H160 V100 H180" color="#3c3c3c" width={3} dur={2.4} r={2.4} />
            <Tag x={70} y={192} text={`CO₂ · ${Math.round(co2 / 1000)}k t/yr`} anchor="middle" size={8.5} />
            <Clickable id="greenhouses" selected={part} onSelect={setPart}>
              <rect x={178} y={26} width={nBays * bayW + 4} height={96} fill="transparent" />
              {Array.from({ length: nBays }).map((_, i) => <GreenhouseIcon key={i} x={180 + i * bayW} y={28} w={bayW - 3} h={92} warm={i < Math.ceil(nBays / 2)} />)}
              <text x={180 + (Math.ceil(nBays / 2) * bayW) / 2} y={60} textAnchor="middle" fontSize={8} fontWeight={900} fill="#8e3b2f" pointerEvents="none">WINTER</text>
              <text x={180 + Math.ceil(nBays / 2) * bayW + ((nBays - Math.ceil(nBays / 2)) * bayW) / 2} y={60} textAnchor="middle" fontSize={8} fontWeight={900} fill="#1f5f3a" pointerEvents="none">SUMMER</text>
            </Clickable>
            <Clickable id="absorptionChiller" selected={part} onSelect={setPart}>
              <rect x={136} y={96} width={42} height={24} rx={3} fill="#1f7ae0" />
              <text x={157} y={106} textAnchor="middle" fontSize={6.5} fontWeight={800} fill="#fff" pointerEvents="none">CHILLER</text>
              <text x={157} y={115} textAnchor="middle" fontSize={5.5} fill="#e6f0ff" pointerEvents="none">heat → cold</text>
            </Clickable>
            <Flow d={`M178,108 H${180 + Math.ceil(nBays / 2) * bayW}`} color="#1f7ae0" width={3} dur={2} r={2.2} active={!winter} />
            <NewMarker box={{ x: 178, y: 26, w: nBays * bayW + 4, h: 96 }} side="left" align="start" />
            <Tag x={180 + (nBays * bayW) / 2} y={20} text={`${acres} acres · ${nBays} block${nBays > 1 ? "s" : ""} of ~50 acres · sealed, no pesticides`} anchor="middle" bold size={9} color="#1f5f3a" />
            <Tag x={182} y={134} text={winter ? `winter blocks: roots at ${tempRange(20, 22)} · summer blocks: chiller cools the glass` : "summer blocks: the chiller makes cold from the same heat · winter blocks idle"} anchor="start" size={7.5} />
            {Array.from({ length: nPeople }).map((_, i) => <Person key={i} x={190 + i * 18} y={160} />)}
            <Tag x={190 + (nPeople * 18) / 2} y={196} text={`~${Math.round(jobs).toLocaleString()} jobs · ${GH_JOBS_PER_ACRE} per acre incl. packing (industry average)`} anchor="middle" size={8} color="#003047" />
            <Flow d={`M${180 + nBays * bayW},75 H540`} color="#2e8b57" width={5} dur={2.2} />
            <Clickable id="packing" selected={part} onSelect={setPart}>
              <rect x={540} y={50} width={92} height={50} rx={4} fill="#d99a00" />
              <text x={586} y={71} textAnchor="middle" fontSize={9.5} fontWeight={800} fill="#fff" pointerEvents="none">PACKING</text>
              <text x={586} y={85} textAnchor="middle" fontSize={8.5} fill="#fff8e6" pointerEvents="none">own gate · own road</text>
            </Clickable>
            <NewMarker box={{ x: 540, y: 50, w: 92, h: 50 }} side="top" />
            {Array.from({ length: nTrucks }).map((_, i) => <Truck key={i} x={540 + (i % 3) * 30} y={112 + Math.floor(i / 3) * 18} />)}
            <Tag x={586} y={160} text={`${(lbs / 1e6).toFixed(0)}M lbs of food a year`} anchor="middle" bold size={9} color="#1f5f3a" />
            <rect x={180} y={220} width={452} height={34} rx={4} fill="#dbe9f7" stroke="#1f7ae0" strokeWidth={1} />
            <text x={406} y={234} textAnchor="middle" fontSize={9} fontWeight={800} fill="#1f5f3a">RECIRCULATING HYDROPONICS · water goes around and around</text>
            <text className="pj-num" x={406} y={247} textAnchor="middle" fontSize={8.5} fill="#3c3c3c">~90% less water per pound than open fields · saves about {(waterSaved / 1e9).toFixed(1)} billion gallons a year vs. field farming</text>
            <Flow d="M190,262 H622" color="#1f7ae0" width={3} dur={4} r={2.2} />
            <Flow d="M622,270 H190" color="#1f7ae0" width={3} dur={4} r={2.2} />
            <Tag x={406} y={292} text={`lease + heat revenue to the developer: about $${lease.toFixed(0)}M a year (estimate)`} anchor="middle" size={8.5} color="#8a6a00" bold />
          </>
        ) : (
          <>
            <Flow d="M70,40 V22" color="#9aa5ad" width={12} dur={1} />
            <Cloud cx={70} cy={12} size={14} variant="clean" opacity={0.7} />
            <Tag x={70} y={133} text="heat → sky (warm air)" anchor="middle" size={8} color="#6b6b6b" />
            <Clickable id="exhaust" selected={part} onSelect={setPart}>
              <rect x={10} y={140} width={120} height={36} rx={4} fill="#8e3b2f" />
              <text x={70} y={155} textAnchor="middle" fontSize={9.5} fontWeight={800} fill="#fff" pointerEvents="none">FUEL-CELL STACKS</text>
              <text className="pj-num " x={70} y={168} textAnchor="middle" fontSize={8.5} fill="#ffe0da" pointerEvents="none">CO₂ ≈95% pure → sky</text>
            </Clickable>
            <Flow d="M130,158 H170 V120" color="#4a4a4a" width={6} dur={1.6} />
            <Cloud cx={176} cy={104} size={16} variant="smog" opacity={0.75} />
            <Clickable id="closedLoop" selected={part} onSelect={setPart}>
              <rect x={210} y={140} width={200} height={50} rx={4} fill="#003047" />
              <text x={310} y={158} textAnchor="middle" fontSize={9.5} fontWeight={800} fill="#fff" pointerEvents="none">CLOSED-LOOP COOLING (THEIRS)</text>
              <text x={310} y={172} textAnchor="middle" fontSize={8} fill="#cfe6ff" pointerEvents="none">filled once, reused for years · click: why it makes sense</text>
              <text x={310} y={184} textAnchor="middle" fontSize={8} fill="#cfe6ff" pointerEvents="none">we keep it exactly as designed</text>
            </Clickable>
            <rect x={180} y={28} width={452} height={92} rx={4} fill="none" stroke="#c0392b" strokeWidth={1.2} strokeDasharray="6 4" />
            <text x={406} y={66} textAnchor="middle" fontSize={11} fontWeight={800} fill="#c0392b">OPEN DESERT IN THEIR RENDER</text>
            <text x={406} y={84} textAnchor="middle" fontSize={8.5} fill="#3c3c3c">no greenhouse · no farm · no packing house</text>
            <text x={406} y={100} textAnchor="middle" fontSize={8.5} fill="#3c3c3c">the heat and the CO₂ that could grow food are vented</text>
            {Array.from({ length: 8 }).map((_, i) => <Person key={i} x={440 + i * 18} y={150} />)}
            <Tag x={512} y={205} text="750 + 50 jobs binding · 1,500 advertised" anchor="middle" size={8} color="#003047" />
            <rect x={180} y={220} width={452} height={34} rx={4} fill="#fff4f2" stroke="#c0392b" strokeWidth={1} />
            <text x={406} y={234} textAnchor="middle" fontSize={9} fontWeight={800} fill="#c0392b">FOOD GROWN ON SITE: 0 lbs</text>
            <text x={406} y={247} textAnchor="middle" fontSize={8.5} fill="#3c3c3c">Doña Ana County produce keeps arriving by truck from California and Mexico</text>
          </>
        )}
      </svg></div>
      <PartInfo id={part} onClose={() => setPart(null)} />

      <Slider label="Greenhouse acres (proposed)" value={ours ? acres : 0} min={ours ? 50 : 0} max={400} step={10} unit="acres" onChange={setAcres} disabled={!ours} />
      <div className="pj-stats mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ours ? (
          <>
            <Stat label="Permanent jobs" value={`~${Math.round(jobs).toLocaleString()}`} sub={`${GH_JOBS_PER_ACRE} per acre incl. packing (industry average)`} color="#d99a00" />
            <Stat label="Food per year" value={`${(lbs / 1_000_000).toFixed(0)}M lbs`} sub="tomatoes, peppers, greens, berries (industry average)" color="#2e8b57" />
            <Stat label="Water saved vs. fields" value={`${(waterSaved / 1_000_000_000).toFixed(1)}B gal`} sub="per year, recirculating hydroponics" color="#1f7ae0" />
            <Stat label="Winter heat drawn" value={`${Math.round(acres * GH_PEAK_MW_PER_ACRE)} MW`} sub={`≈ ${humanHeat(acres * GH_PEAK_MW_PER_ACRE).furnaces.toLocaleString()} home furnaces, coldest night (estimate)`} color="#c0392b" />
            <Stat label="CO₂ used by plants" value={`${Math.round(co2 / 1000)}k tons`} sub="per year, a small share of capture" color="#1f7ae0" />
            <Stat label="Lease + heat revenue" value={`$${lease.toFixed(0)}M/yr`} sub="to the developer, new (estimate)" color="#d99a00" />
          </>
        ) : (
          <>
            <Stat label="Binding jobs" value="750 + 50" sub={<>full-time + part-time, within 3 years<Cite ids={["cba"]} /></>} color="#c0392b" />
            <Stat label="Advertised jobs" value="1,500" sub={<>on their website<Cite ids={["faq"]} /></>} />
            <Stat label="Food grown" value="0 lbs" sub="no agriculture in the plan" color="#c0392b" />
            <Stat label="Heat used" value="0 MW" sub="all vented by the dry coolers" />
            <Stat label="CO₂ used" value="0 tons" sub="all released" />
            <Stat label="Land beside the coolers" value="desert" sub={<>open ground in the render<Cite ids={["render"]} /></>} />
          </>
        )}
      </div>
      {ours && <CostStrip millions={475} label="for ~150 acres of glass greenhouses ($450M, ~$3M/acre industry average) plus the packing house and produce gate ($25M)" who="commercial growers who lease the land, not the developer" />}
      <p className="pj-fine mt-3 text-[14px]" style={{ color: "#6b6b6b" }}>
        Every figure on the upgraded card except the job commitment and the CO₂ purity is an industry average, not a Santa Teresa study. The site is about 819 acres with 400 in the
        first phase<Cite ids={["cba"]} />; the developers have not published which acres are unbuilt, so the greenhouse acreage and location are a proposal to be set from their site
        plan, not a claim.
      </p>

      {/* Feasibility note, not the plan: robotic vertical farming, with the honest trade-offs. */}
      {ours && (
        <details name="pj-one" className="pj-late mt-4 rounded border px-4 py-3" style={{ borderColor: "#d99a00", backgroundColor: "#fffaf0" }}>
          <summary className="cursor-pointer text-[15px] font-bold" style={{ color: "#8a6a00" }}>
            Also feasible here, not the plan: robotic vertical farms (Japan, China), with the numbers
          </summary>
          <div className="mt-3" style={{ fontSize: 15, lineHeight: 1.6, color: "#3c3c3c" }}>
            <p>
              Two working examples. <strong>Techno Farm Keihanna</strong> (Spread Co., Kyoto) grows about 30,000 heads of lettuce a day in stacked trays; robots seed, move and
              harvest, an IoT system tunes light, temperature and nutrients, the farm runs at a 99% operating rate and recycles over 90% of its water
              <Cite ids={["spread-keihanna"]} />. <strong>Chengdu</strong> (Chinese Academy of Agricultural Sciences, 2023): a 20-layer, 8.8-metre plant factory on a
              100-square-metre footprint where robot arms do everything from seeding to packing; lettuce in 35 days, about 50 tonnes a year, the output of roughly 4 hectares
              of field<Cite ids={["chengdu-vertical"]} />.
            </p>
            <p className="mt-2">
              <strong>The catch is electricity.</strong> Today&apos;s vertical farms use about 10–18 kWh per kilogram of lettuce against about 3.8 for a Dutch greenhouse; the
              best measured cases reach 3–7<Cite ids={["vf-energy"]} />. LEDs cannot use the site&apos;s waste heat, so on this campus every vertical-farm kilowatt is a gas
              kilowatt until Process 4 retires it. That is why the plan is glass greenhouses on free heat first, with vertical farms as a phase-two option once clean
              power is on the wire<Cite ids={["vf-econ"]} />.
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="pj-table pj-table--stack" style={{ fontSize: 14 }}>
                <thead>
                  <tr>
                    <th>Measure</th>
                    <th>Glass greenhouses (the plan)</th>
                    <th>Robotic vertical farm (feasible)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Food per acre", "~400,000 lb/yr, industry average", "Roughly 10× a greenhouse per acre of floor (stacked layers); ~1% of field land for the same crop"],
                    ["Money for business owners", "Lease + heat revenue ~$130k/acre/yr (estimate); grower capital ~$3M/acre", "Higher output per acre; higher capital and power bills per kg; cost-competitive only with cheap clean power"],
                    ["Money for the county", "~6.5 jobs/acre incl. packing → ~1,000 jobs on 150 acres; taxable leases", "Far fewer jobs per pound (robots); more output tax base per acre; fewer wages"],
                    ["Time to first harvest", "Blocks of ~50 acres, about a year each (estimate)", "Modular; a factory unit in under a year (Chengdu built in months)"],
                    ["Net gain to humanity now", "Free heat used, CO₂ used, ~60M lb local food, jobs", "More food per acre, but paid for in gas-fired electricity on this site today"],
                    ["In 50 years", "Heat and CO₂ supplied as long as the campus runs; greenhouses re-glazed every 20–30 years", "If power is clean by then (HB93 says 2045), the higher-output path; energy per kg is the deciding number"],
                    ["In 100 years", "Land stays farmable; the campus lease has ended and returned to the tax rolls", "Same land, more food per acre, fewer hands; both paths leave the aquifer and the air better than the plan as filed"],
                  ].map(([m, a, b]) => (
                    <tr key={m}>
                      <th scope="row">{m}</th>
                      <td data-label="Glass greenhouses (the plan)" className="pj-cell-ours">{a}</td>
                      <td data-label="Robotic vertical farm (feasible)">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[14px]" style={{ color: "#6b6b6b" }}>
              Estimates are labeled. Vertical-farm figures are from the two cited farms and the energy benchmarking literature, not from a Santa Teresa design. The
              50- and 100-year lines are the direction the cited numbers point, not forecasts.
            </p>
          </div>
        </details>
      )}
    </Card>
  );
}
