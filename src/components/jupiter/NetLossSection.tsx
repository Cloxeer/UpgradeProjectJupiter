"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SectionHeading } from "./SectionHeading";
import { Cite, SourceList } from "@/components/Cite";
import { rows, YEARS, operating, allSources, GHG_PERMIT_TPY, OUR_WATER_GPD, type Year } from "@/data/netloss";
import { Cloud, Neighborhood } from "@/components/blueprint/Parts";
import { useCopy } from "./AudienceText";
import { useAudience } from "./Audience";

/*
  Long-view rules, all from cited sources (see the note under the pictures):
  - CO2 is a running total that never resets (IPCC AR6: cumulative CO2 drives warming near-linearly; effects last centuries).
  - HB93 requires net-zero by 2045 = year 19. Their route is credits, so drawing exhaust after year 19 assumes the fuel cells
    still burn gas. Our plan retires gas hours to zero by then (Process 4).
  - Bloom stacks last about 5 years, so stacks are swapped roughly every 5 operating years (Fast Company / Bloom).
  - The IRB lease is 30 years: at year 30 the land returns to the tax rolls (CBA).
  - New Mexico is projected 5–7 °F warmer within 50 years with recharge down at least 25% (NMBGMR Bulletin 164, 2022);
    Mesilla groundwater already fell 2000–2020 (USGS). So the water table keeps dropping in the long views.
*/
const HB93_YEAR = 19; // 2045 - 2026
const LEASE_YEARS = 30;
const WARM_YEAR = 44; // ~2070, the end of the state's 50-year projection window
const STACK_LIFE = 5;

/** Smog (or clean air) over the neighborhood. Clouds and haze scale with the running CO2 total, uncapped. */
function SmogScene({ smog, years }: { smog: boolean; years: number }) {
  const op = operating(years);
  const tons = smog ? GHG_PERMIT_TPY * op : GHG_PERMIT_TPY * 0.075 * op;
  const gasOff = !smog && op >= HB93_YEAR; // our plan: no gas hours after 2045
  // Haze: 0 at start, 1 at about 800 million tons (their 80-year total). Clouds: one more per ~120 million tons.
  const k = Math.min(1, tons / 8e8);
  const nClouds = smog ? Math.min(7, 1 + Math.floor(tons / 1.2e8)) : gasOff ? 0 : 2;
  const swaps = Math.floor(op / STACK_LIFE);
  const warm = years >= WARM_YEAR;
  const sky = smog ? `rgb(${217 - k * 90},${211 - k * 105},${199 - k * 120})` : warm ? "#f6efe0" : "#eaf4fb";
  return (
    <svg viewBox="0 0 320 130" className="w-full" role="img" aria-label={smog ? `Smog over homes after ${years} years` : `Clean air over homes after ${years} years`}>
      <rect x={0} y={0} width={320} height={130} fill={sky} />
      {smog && op > 0 && <rect x={0} y={0} width={320} height={130} fill="#3a3a3a" opacity={0.06 + k * 0.42} />}
      {warm && (
        <g>
          <circle cx={292} cy={22} r={11} fill="#fdb715" opacity={0.95} />
          {[0, 45, 90, 135].map((a) => (
            <line key={a} x1={292 - 16 * Math.cos((a * Math.PI) / 180)} y1={22 - 16 * Math.sin((a * Math.PI) / 180)} x2={292 + 16 * Math.cos((a * Math.PI) / 180)} y2={22 + 16 * Math.sin((a * Math.PI) / 180)} stroke="#fdb715" strokeWidth={2} />
          ))}
        </g>
      )}
      {Array.from({ length: nClouds }).map((_, i) => (
        <Cloud key={i} cx={40 + ((i * 47) % 250)} cy={28 + (i % 3) * 12} size={smog ? 16 + k * 22 : 14} variant={smog && op > 0 ? "smog" : "clean"} opacity={smog ? 0.45 + k * 0.5 : 0.7} />
      ))}
      <Neighborhood x={20} y={92} w={280} />
      {!smog && op > 0 && Array.from({ length: Math.min(5, 1 + Math.floor(op / 6)) }).map((_, i) => <path key={i} d={`M${178 + i * 26},92 l0,-14 l10,-8 l10,8 l0,14 z`} fill="#d7f0dc" stroke="#1f5f3a" strokeWidth={1} />)}
      <rect x={4} y={4} width={smog ? 168 : 150} height={22} rx={3} fill="#ffffff" fillOpacity={0.9} />
      <text x={10} y={19} fontSize={10} fontWeight={800} fill={smog ? "#8e3b2f" : "#1f5f3a"}>
        {op === 0 ? `Year ${years}: still building` : `Year ${years}: ${(tons / 1e6).toFixed(0)} M tons in the air, running total`}
      </text>
      {op > 0 && smog && (
        <>
          <rect x={4} y={30} width={172} height={16} rx={3} fill="#ffffff" fillOpacity={0.85} />
          <text x={10} y={41} fontSize={8} fontWeight={700} fill="#3c3c3c">
            {swaps > 0 ? `fuel-cell stacks swapped ~${swaps}× (5-yr life)` : "fuel cells on their first stacks"}
            {op >= HB93_YEAR ? " · past the 2045 deadline" : ""}
          </text>
        </>
      )}
      {gasOff && (
        <>
          <rect x={4} y={30} width={150} height={16} rx={3} fill="#ffffff" fillOpacity={0.85} />
          <text x={10} y={41} fontSize={8} fontWeight={700} fill="#1f5f3a">gas hours: 0 since 2045 (HB93)</text>
        </>
      )}
      <text x={160} y={124} textAnchor="middle" fontSize={8} fontWeight={800} fill={smog ? "#8e3b2f" : "#1f5f3a"}>
        {smog
          ? op === 0
            ? "CONSTRUCTION DUST · SUNLAND PARK ALREADY FAILS THE OZONE STANDARD"
            : op >= HB93_YEAR
              ? "SHOWN ASSUMING THE FUEL CELLS STILL BURN GAS AFTER 2045"
              : "SMOG FORMS DOWNWIND ON HOT DAYS · SUNLAND PARK, SANTA TERESA"
          : op === 0
            ? "CAPTURE SKIDS INSTALLED BEFORE POWER-ON"
            : gasOff
              ? "NO EXHAUST · GEOTHERMAL, WIND AND CAPTURE CARRY THE LOAD"
              : "CAPTURED AT THE STACK · MONITORED · PUBLISHED"}
      </text>
      {warm && (
        <text x={316} y={48} textAnchor="end" fontSize={7} fontWeight={800} fill="#8a6a00">
          NM ~5–7 °F WARMER BY 2070 (STATE PROJECTION)
        </text>
      )}
    </svg>
  );
}

/** Water table drops with years in their plan (and recharge falls); clean water added rises in ours. */
function WaterGauge({ down, years }: { down: boolean; years: number }) {
  const op = operating(years);
  // Their plan: the table keeps falling for the whole horizon (USGS decline 2000-2020; recharge down 25%+ in the state projection).
  const kDown = Math.min(1, years / 80);
  const top = down ? 50 + kDown * 62 : Math.max(24, 60 - Math.min(1, op / 25) * 36);
  const gal = OUR_WATER_GPD * 365 * op;
  const downLabelY = Math.min(112, Math.max(63, top - 5));
  const warm = years >= WARM_YEAR;
  const leaseOver = years >= LEASE_YEARS;
  return (
    <svg viewBox="0 0 320 130" className="w-full" role="img" aria-label={down ? `Aquifer level after ${years} years` : `Clean water added after ${years} years`}>
      <rect x={0} y={0} width={320} height={130} fill={warm ? "#e8d0a0" : "#e3cfa8"} />
      <rect x={0} y={top} width={320} height={130 - top} fill={down ? "#7a9bb5" : "#4f8fd0"} className="transition-all duration-500" />
      <rect x={290} y={8} width={12} height={top + 4} fill="#5a5a5a" />
      <line x1={0} y1={50} x2={320} y2={50} stroke="#003047" strokeWidth={1} strokeDasharray="4 4" />
      <text x={6} y={46} fontSize={8} fontWeight={700} fill="#003047">2026 level</text>
      {down ? (
        <>
          <path d={`M60,52 L60,${top - 4}`} stroke="#c0392b" strokeWidth={3} strokeDasharray="4 3" />
          <path d={`M60,${top - 4} l-6,-8 M60,${top - 4} l6,-8`} stroke="#c0392b" strokeWidth={3} fill="none" />
          <rect x={68} y={downLabelY - 9} width={190} height={12} rx={2} fill="#e3cfa8" fillOpacity={0.9} />
          <text x={72} y={downLabelY} fontSize={9} fontWeight={800} fill="#8e3b2f">
            year {years}: water table pulled down{warm ? " · recharge falling" : ""}
          </text>
        </>
      ) : (
        <>
          <text x={72} y={top + 16} fontSize={9} fontWeight={800} fill="#ffffff">{op === 0 ? "plant under construction" : `year ${years}: ${(gal / 1e9).toFixed(0)} billion gallons made`}</text>
          {op > 0 && <path d="M60,64 L60,40 M60,40 l-6,8 M60,40 l6,8" stroke="#1f5f3a" strokeWidth={3} fill="none" />}
        </>
      )}
      {leaseOver && (
        <>
          <rect x={4} y={4} width={128} height={12} rx={2} fill="#ffffff" fillOpacity={0.85} />
          <text x={8} y={13} fontSize={7.5} fontWeight={800} fill="#003047">LEASE OVER (YR 30) · LAND BACK ON TAX ROLLS</text>
        </>
      )}
      <text x={160} y={124} textAnchor="middle" fontSize={8} fontWeight={800} fill={down ? "#8e3b2f" : "#1f5f3a"}>
        {down
          ? warm
            ? "FRESH WATER STILL TAKEN · STATE PROJECTS RECHARGE DOWN 25%+ BY 2070"
            : "FRESH WATER TAKEN FOR FILLS, BUILDING AND OPERATIONS"
          : warm
            ? "SALTY DEEP WATER TREATED · MORE VALUABLE AS THE STATE DRIES"
            : "SALTY DEEP WATER TREATED · CLEAN WATER TO CRRUA"}
      </text>
    </svg>
  );
}

export function NetLossSection() {
  const [year, setYear] = useState<Year>(5);
  const [openRow, setOpenRow] = useState<number | null>(null);
  // Tap a year picture to open it big (full-screen on phones, a dialog on desktop), like the blueprint drawings.
  const [zoom, setZoom] = useState<"ours" | "theirs" | null>(null);
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(null);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [zoom]);
  const copy = useCopy();
  const [audience] = useAudience();
  const kid = audience === "kid";
  const expert = audience === "expert";

  return (
    <section id="netloss" style={{ backgroundColor: "#fafafa" }}>
      <SectionHeading stamp="force">A NET GAIN, YEAR AFTER YEAR</SectionHeading>
      <div className="pj-container pb-16">
        <p className="mx-auto mb-3 max-w-[900px] text-center font-semibold" style={{ fontSize: kid ? 20 : 18, lineHeight: 1.5, color: "#003047" }}>
          {copy.netlossLead}
        </p>
        {!kid && (
          <p className="mx-auto mb-6 max-w-[900px] text-center" style={{ fontSize: 15, lineHeight: 1.6, color: "#6b6b6b" }}>
            Nothing here is an opinion. Each line is a cited figure multiplied by the number of years. Tap a year, watch the pictures change, and tap
            any line for the arithmetic and the documents behind it.
          </p>
        )}

        <div className="mb-2 text-center text-[14px] font-bold uppercase" style={{ color: "#6b6b6b" }}>Year {year} · pick another year below the pictures</div>
        {/* Pictures: ours first, side by side */}
        <div className="mx-auto mb-8 grid max-w-[1000px] grid-cols-2 gap-2 sm:gap-4">
          <button type="button" onClick={() => setZoom("ours")} className="rounded bg-white p-2 text-left shadow-sm sm:p-3" style={{ borderTop: "4px solid #2e8b57" }} aria-label={`Open the upgraded year ${year} pictures full-screen`}>
            <div className="mb-2 flex items-center justify-between text-[12px] font-black uppercase sm:text-[14px]" style={{ color: "#1f5f3a" }}>
              <span>{kid ? "Our plan" : "Force-upgraded"} · year {year}</span>
              <span aria-hidden style={{ fontSize: 14 }}>⤢</span>
            </div>
            <SmogScene smog={false} years={year} />
            <div className="mt-2">
              <WaterGauge down={false} years={year} />
            </div>
          </button>
          <button type="button" onClick={() => setZoom("theirs")} className="rounded bg-white p-2 text-left shadow-sm sm:p-3" style={{ borderTop: "4px solid #c0392b" }} aria-label={`Open the as-filed year ${year} pictures full-screen`}>
            <div className="mb-2 flex items-center justify-between text-[12px] font-black uppercase sm:text-[14px]" style={{ color: "#c0392b" }}>
              <span>{kid ? "Their plan" : "As filed"} · year {year}</span>
              <span aria-hidden style={{ fontSize: 14 }}>⤢</span>
            </div>
            <SmogScene smog years={year} />
            <div className="mt-2">
              <WaterGauge down years={year} />
            </div>
          </button>
        </div>
        {zoom &&
          createPortal(
            <>
              <div className="pj-backdrop" onClick={() => setZoom(null)} aria-hidden />
              <div className="pj-sheet" role="dialog" aria-modal="true" aria-label={`${zoom === "ours" ? "Upgraded" : "As filed"}, year ${year}`}>
                <div className="pj-sheet__grab" />
                <div className="p-4 sm:p-6" style={{ borderTop: `6px solid ${zoom === "ours" ? "#2e8b57" : "#c0392b"}` }}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[13px] font-bold uppercase tracking-wide" style={{ color: zoom === "ours" ? "#1f5f3a" : "#c0392b" }}>
                        {zoom === "ours" ? (kid ? "Our plan" : "Force-upgraded") : kid ? "Their plan" : "As filed"}
                      </div>
                      <h4 className="mt-0.5 font-bold" style={{ fontSize: 22, color: "#003047" }}>
                        After {year} {year === 1 ? "year" : "years"}
                      </h4>
                    </div>
                    <button type="button" onClick={() => setZoom(null)} className="rounded-full px-3 py-1.5 text-[15px] font-black" style={{ color: "#6b6b6b", border: "1px solid #d9d9d9" }} aria-label="Close">
                      ✕
                    </button>
                  </div>
                  <div className="mt-4">
                    <SmogScene smog={zoom === "theirs"} years={year} />
                  </div>
                  <div className="mt-3">
                    <WaterGauge down={zoom === "theirs"} years={year} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {YEARS.map((y) => (
                      <button key={y} type="button" onClick={() => setYear(y)} className="min-h-[40px] rounded px-3 text-[14px] font-black" style={{ minWidth: 44, backgroundColor: year === y ? "#003047" : "#fff", color: year === y ? "#fff" : "#003047", border: "1px solid #003047" }} aria-pressed={year === y}>
                        {y}
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-[14px]" style={{ color: "#6b6b6b" }}>Pick another year while it is open. Tap outside or ✕ to go back.</p>
                  {/* Every line of the comparison, for this side only: the question, this side's figure, and the why. */}
                  <div className="mt-4 space-y-3">
                    {rows.map((r) => (
                      <div key={r.label} className="rounded border p-3" style={{ borderColor: "#e6e6e6", backgroundColor: zoom === "ours" ? "#f3faf5" : "#fff6f4" }}>
                        <div className="font-black" style={{ fontSize: kid ? 17 : 15, lineHeight: 1.3, color: "#003047" }}>{kid && r.kidLabel ? r.kidLabel : r.label}</div>
                        <div className="mt-1 font-black" style={{ fontSize: kid ? 19 : 17, lineHeight: 1.35, color: zoom === "ours" ? "#1f5f3a" : "#8e3b2f" }}>
                          {zoom === "ours" ? r.ours(year) : r.theirs(year)}
                        </div>
                        <p className="mt-1" style={{ fontSize: kid ? 15 : 14, lineHeight: 1.55, color: "#3c3c3c" }}>
                          <strong>{kid ? "How we know:" : "Why:"}</strong> {kid && r.kidHow ? r.kidHow : r.how}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>,
            document.body,
          )}

        {year >= 30 && (
          <p className="pj-adult mx-auto mb-6 max-w-[1000px] rounded px-4 py-3 text-[14px]" style={{ backgroundColor: "#fff8e6", lineHeight: 1.55, color: "#3c3c3c" }}>
            <strong>What the long views assume, and where it comes from.</strong> CO₂ is a running total because cumulative emissions drive warming almost linearly and the effects last for centuries<Cite ids={["ipcc-ar6-spm"]} />. HB93 requires net-zero by 2045 (year 19); their route is credits, so exhaust after that assumes the fuel cells still burn gas, while the upgrade retires gas hours to zero by then<Cite ids={["cba", "bocc"]} />. Stacks are swapped about every five years<Cite ids={["bloom-stack-life"]} />. The 30-year lease ends at year 30 and the land returns to the tax rolls<Cite ids={["cba"]} />. New Mexico is projected 5–7 °F warmer within 50 years with groundwater recharge down at least 25%<Cite ids={["nmbg-164"]} />, and Mesilla groundwater already fell from 2000 to 2020<Cite ids={["usgs-mesilla-taap"]} />, so the water table keeps dropping under their plan. Beyond 2070 the state projection ends; the drawings hold at its endpoint rather than extrapolate.
          </p>
        )}
        {/* Year bar: sticks under the header while you scroll the rows */}
        <div className="sticky z-20 mx-auto mb-4 max-w-[1000px] rounded bg-white px-3 py-2 shadow-md" style={{ top: 96, border: "1px solid #e0e0e0" }}>
        <div className="mb-1 text-center text-[13px] font-bold uppercase" style={{ color: "#3c3c3c" }}>{kid ? "How many years from now?" : "After how many years?"}</div>
        <div className="mb-1 flex flex-wrap items-center justify-center gap-1.5">
          {YEARS.map((y) => (
            <button key={y} type="button" onClick={() => setYear(y)} className="rounded px-2.5 py-1.5 text-[15px] font-black sm:px-3" style={{ minWidth: 44, backgroundColor: year === y ? "#003047" : "#fff", color: year === y ? "#fff" : "#003047", border: "1px solid #003047" }} aria-pressed={year === y}>
              {y}
            </button>
          ))}
        </div>
        <div className="text-center font-black" style={{ fontSize: 17, color: "#003047" }}>
          After {year} {year === 1 ? "year" : "years"} {operating(year) === 0 ? "· still under construction" : `· ${operating(year)} ${operating(year) === 1 ? "year" : "years"} of operation`}
        </div>

        </div>
        {/* Rows: the label sits in the middle because it applies to both sides; ours left, theirs right */}
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 hidden grid-cols-[1fr_auto_1fr] items-center gap-3 px-2 md:grid">
            <div className="text-[13px] font-black uppercase" style={{ color: "#1f5f3a" }}>{kid ? "Our plan" : "Force-upgraded"}</div>
            <div className="text-center text-[13px] font-black uppercase" style={{ color: "#6b6b6b" }}>what we are comparing</div>
            <div className="text-right text-[13px] font-black uppercase" style={{ color: "#c0392b" }}>{kid ? "Their plan" : "As filed"}</div>
          </div>
          <div className="space-y-3">
            {rows.map((r, i) => {
              const on = openRow === i;
              const label = kid && r.kidLabel ? r.kidLabel : r.label;
              return (
                <div key={r.label} className="rounded bg-white shadow-sm" style={{ border: `1px solid ${on ? "#2e8b57" : "#e6e6e6"}` }}>
                  <button type="button" onClick={() => setOpenRow(on ? null : i)} aria-expanded={on} className="w-full p-3 text-left">
                    <div className="grid grid-cols-1 items-stretch gap-3 md:grid-cols-[1fr_minmax(160px,220px)_1fr]">
                      <div className="rounded p-3" style={{ backgroundColor: "#eaf6ee" }}>
                        <div className="mb-1 text-[12px] font-black uppercase md:hidden" style={{ color: "#1f5f3a" }}>{kid ? "Our plan" : "Force-upgraded"}</div>
                        <div style={{ fontSize: kid ? 16 : 14, lineHeight: 1.5, color: "#1f5f3a", fontWeight: 600 }}>{r.ours(year)}</div>
                      </div>
                      <div className="flex flex-col items-center justify-center rounded px-2 py-2 text-center md:order-none" style={{ backgroundColor: "#f4f4f4" }}>
                        <div className="font-black" style={{ fontSize: kid ? 17 : 14, lineHeight: 1.25, color: "#003047" }}>{label}</div>
                        <div className="mt-1 text-[13px] font-bold" style={{ color: "#2e8b57" }}>{on ? "hide the math ▲" : kid ? "how do we know? ▼" : "why? ▼"}</div>
                      </div>
                      <div className="rounded p-3" style={{ backgroundColor: "#fff0ed" }}>
                        <div className="mb-1 text-[12px] font-black uppercase md:hidden" style={{ color: "#c0392b" }}>{kid ? "Their plan" : "As filed"}</div>
                        <div style={{ fontSize: kid ? 16 : 14, lineHeight: 1.5, color: "#8e3b2f", fontWeight: 600 }}>{r.theirs(year)}</div>
                      </div>
                    </div>
                  </button>
                  {on && (
                    <div className="border-t px-4 pb-4 pt-3" style={{ borderColor: "#f0f0f0", fontSize: kid ? 15 : 13, lineHeight: 1.6, color: "#3c3c3c" }}>
                      <strong>{kid ? "How we know:" : "How this is calculated:"}</strong> {kid && r.kidHow ? r.kidHow : r.how}
                      {!kid && (
                        <>
                          <div className="mt-2 text-[13px] font-bold uppercase" style={{ color: "#6b6b6b" }}>Documents behind this line</div>
                          <SourceList ids={r.sources} />
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {expert && (
          <>
            <details className="mx-auto mt-6 max-w-[1000px] rounded border bg-white px-4 py-3" style={{ borderColor: "#e0e0e0" }}>
              <summary className="cursor-pointer text-[15px] font-bold uppercase" style={{ color: "#15768c" }}>All documents used in this section ({allSources.length})</summary>
              <SourceList ids={allSources} />
            </details>
            <p className="mt-4 text-center text-[14px]" style={{ color: "#6b6b6b" }}>
              Estimates are marked as such in each line&apos;s arithmetic. Their figures assume the air permit and pipeline are approved, as their own
              footnote states. Years count from 2026; operations are assumed to start in year 2, their own Q3 2028 target.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
