"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SectionHeading } from "./SectionHeading";
import { Cite, SourceList } from "@/components/Cite";
import { rows, YEARS, operating, far, ourGasOp, RECHARGE_START_YEAR, recharged, allSources, GHG_PERMIT_TPY, OUR_WATER_GPD, type Year } from "@/data/netloss";
import { Cloud, Neighborhood } from "@/components/blueprint/Parts";
import { useCopy } from "./AudienceText";
import { useAudience } from "./Audience";

/*
  Long-view rules, all from cited sources (see the note under the pictures):
  - CO2 is a running total that never resets (IPCC AR6: cumulative CO2 drives warming near-linearly; effects last centuries).
  - HB93 requires "net-zero carbon resources" by 2045 = year 19, but the statute counts a gas plant that offsets a tenth of its
    CO2 in methane cuts as net-zero, so nothing forces gas hours down. Their route is credit matching by 2031. Our plan asks for a
    falling share of energy from gas on a public meter (a target), and keeps counting our uncaptured share for as long as gas runs.
  - Power modules are hot-swapped about once per five years (NMED Statement of Basis), so swaps are counted every 5 operating years.
  - The IRB lease is 30 years: at year 30 the land returns to the tax rolls (CBA).
  - New Mexico is projected 5–7 °F warmer within 50 years with major rivers down 16–28% (NMBGMR Bulletin 164, 2022);
    Mesilla groundwater already fell 2000–2020 (USGS). So the water table keeps dropping in the long views.
*/
const HB93_YEAR = 19; // 2045 - 2026
const LEASE_YEARS = 30;
const WARM_YEAR = 44; // ~2070, the end of the state's 50-year projection window
const STACK_LIFE = 5;
/** Our side falls at this share of the regional slope once the plant runs: fresh pumping cut and reclaimed water recharged. A schematic of direction, not a measurement. */
const SLOWED = 0.4;
/** Their CO₂ runs as filed for the whole period; ours is the uncaptured 5–10% (7.5% midpoint) for as long as gas runs. */
const tonsFor = (smog: boolean, years: number) => (smog ? GHG_PERMIT_TPY * operating(years) : GHG_PERMIT_TPY * 0.075 * ourGasOp(years));

/** Smog (or clean air) over the neighborhood. Clouds and haze scale with the running CO2 total, uncapped. */
function SmogScene({ smog, years }: { smog: boolean; years: number }) {
  const op = operating(years);
  const isFar = far(years);
  const tons = tonsFor(smog, years);
  const gasOff = false; // a falling gas share is a target, not a date; the drawing never shows zero exhaust
  // Haze: 0 at start, 1 at about 800 million tons (their 80-year total). Clouds: one more per ~120 million tons.
  const k = Math.min(1, tons / 8e8);
  const nClouds = smog ? Math.min(7, 1 + Math.floor(tons / 1.2e8)) : gasOff ? 0 : 2;
  const swaps = Math.floor(op / STACK_LIFE);
  const warm = years >= WARM_YEAR;
  const sky = smog ? `rgb(${217 - k * 90},${211 - k * 105},${199 - k * 120})` : warm ? "#f6efe0" : "#eaf4fb";
  const topLabel = isFar
    ? smog
      ? `Year ${years}: ${(tons / 1e6).toFixed(0)} M tons CO₂ if run as filed (estimate)`
      : `Year ${years}: ${(tons / 1e6).toFixed(0)} M tons total; the rest is rock (estimate)`
    : op === 0
      ? `Year ${years}: still building`
      : `Year ${years}: ${(tons / 1e6).toFixed(0)} M tons CO₂, running total`;
  void swaps;
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
      <rect x={4} y={4} width={Math.min(240, topLabel.length * 5 + 10)} height={16} rx={3} fill="#ffffff" fillOpacity={0.9} />
      <text x={9} y={15.5} fontSize={9} fontWeight={800} fill={smog ? "#8e3b2f" : "#1f5f3a"}>
        {topLabel}
      </text>
      <text x={160} y={124} textAnchor="middle" fontSize={8} fontWeight={800} fill={smog ? "#8e3b2f" : "#1f5f3a"}>
        {smog
          ? isFar
            ? "ESTIMATE · RUN AS FILED 250 YEARS · CO₂ STAYS FOR CENTURIES"
            : op === 0
              ? "CONSTRUCTION DUST · SUNLAND PARK ALREADY FAILS THE OZONE STANDARD"
              : op >= HB93_YEAR
                ? "SHOWN ASSUMING THE FUEL CELLS STILL BURN GAS AFTER 2045"
                : "SMOG FORMS DOWNWIND ON HOT DAYS · SUNLAND PARK, SANTA TERESA"
          : isFar
            ? "ESTIMATE · CAPTURE METERED · GAS SHARE FALLING (TARGET)"
            : op === 0
              ? "CAPTURE SKIDS INSTALLED BEFORE POWER-ON"
              : gasOff
                ? "NO EXHAUST"
                : "CAPTURE METERED AT THE STACK · PUBLISHED · GAS SHARE FALLING (TARGET)"}
      </text>
    </svg>
  );
}

/**
 * Water surface (SVG y) for a side at a given year. Both sides sit exactly on the 2026 line (y=50) at year 0.
 * Both gauges show the same thing: the fresh water table CRRUA's wells draw from.
 * Ours: same construction pumping until the plant opens (year 2); then the towns' fresh wells pump far less (the plant
 * covers most of CRRUA's demand) and from year 5 about 2 MGD of reclaimed water is recharged, so the local decline is drawn
 * slowed, not reversed. El Paso's recharge "slowed the decline" of its aquifer; stabilization there came with conservation and
 * river water. The slower slope is a schematic of direction, not a measurement; the chips and the expert note say so. In the
 * 250-year view both trends are continued and every figure is labelled an estimate.
 */
const SLOPE = 62 / 80; // svg units per year, the regional decline both sides share
/** Where the table stood in earlier years, on the same decline slope the model uses forward (USGS: the Mesilla table has been falling for decades). */
const HISTORY_MARKS: { year: number; y: number }[] = [
  { year: 1980, y: 50 - ((2026 - 1980) / 80) * 62 },
  { year: 2005, y: 50 - ((2026 - 2005) / 80) * 62 },
];
function waterTop(down: boolean, years: number): number {
  if (down) {
    // Their plan: the table keeps falling for the whole horizon (USGS decline 2000-2020; rivers down 16-28% in the state projection).
    return 50 + Math.min(80, years) * SLOPE;
  }
  if (years <= 2) return 50 + years * SLOPE; // same construction pumping until the plant opens
  const atOpen = 50 + 2 * SLOPE;
  return Math.min(50 + 62, atOpen + (years - 2) * SLOPE * SLOWED); // plant runs: decline slowed, not reversed (schematic)
}

function WaterGauge({ down, years }: { down: boolean; years: number }) {
  const op = operating(years);
  const top = waterTop(down, years);
  const gal = OUR_WATER_GPD * 365 * op;
  const isFar = far(years);
  const held = !down && op > 0 && years < RECHARGE_START_YEAR;
  const rising = !down && years >= RECHARGE_START_YEAR; // "rising" = recharge running; the table is drawn falling more slowly, not climbing
  const downLabelY = Math.min(112, Math.max(63, top - 5));
  const ourLabelY = Math.min(112, Math.max(63, top + 12));
  const warm = years >= WARM_YEAR;
  const ourLabel = isFar
    ? `year ${years}: slower decline continued (estimate)`
    : op === 0
      ? `year ${years}: same construction pumping · plant being built`
      : held
        ? `year ${years}: fresh pumping cut · decline slowed (estimate)`
        : `year ${years}: ~2 MGD recharged · decline slowed (estimate)`;
  return (
    <svg viewBox="0 0 320 130" className="w-full" role="img" aria-label={down ? `Aquifer level after ${years} years` : `Clean water added after ${years} years`}>
      <rect x={0} y={0} width={320} height={130} fill={warm ? "#e8d0a0" : "#e3cfa8"} />
      <rect x={0} y={top} width={320} height={130 - top} fill={down ? "#7a9bb5" : "#4f8fd0"} className="transition-all duration-500" />
      <rect x={290} y={8} width={12} height={top + 4} fill="#5a5a5a" />
      <line x1={0} y1={50} x2={320} y2={50} stroke="#003047" strokeWidth={1} strokeDasharray="4 4" />
      <text x={6} y={46} fontSize={8} fontWeight={700} fill="#003047">2026 level · year 0</text>
      {/* History: where the table stood in 1980 and 2005, so the reader sees it was already falling before either plan. */}
      {HISTORY_MARKS.map((m) => (
        <g key={m.year}>
          <line x1={200} y1={m.y} x2={288} y2={m.y} stroke="#5a5a5a" strokeWidth={1} strokeDasharray="2 3" />
          <text x={197} y={m.y + 3} textAnchor="end" fontSize={7} fontWeight={800} fill="#5a5a5a">
            {m.year} level
          </text>
        </g>
      ))}
      {down ? (
        <>
          <path d={`M60,52 L60,${top - 4}`} stroke="#c0392b" strokeWidth={3} strokeDasharray="4 3" />
          <path d={`M60,${top - 4} l-6,-8 M60,${top - 4} l6,-8`} stroke="#c0392b" strokeWidth={3} fill="none" />
          <rect x={68} y={downLabelY - 9} width={190} height={12} rx={2} fill="#e3cfa8" fillOpacity={0.9} />
          <text x={72} y={downLabelY} fontSize={9} fontWeight={800} fill="#8e3b2f">
            {isFar ? `year ${years}: decline continued for 250 years (estimate)` : `year ${years}: water table pulled down${warm ? " · recharge falling" : ""}`}
          </text>
        </>
      ) : (
        <>
          {(held || rising) && !isFar ? (
            // Slowed: a short green arrow down from the 2026 line, shorter than their red one, because the decline is slowed, not reversed.
            <>
              <path d={`M60,52 L60,${top - 4}`} stroke="#1f5f3a" strokeWidth={3} strokeDasharray="4 3" />
              <path d={`M60,${top - 4} l-6,-8 M60,${top - 4} l6,-8`} stroke="#1f5f3a" strokeWidth={3} fill="none" />
            </>
          ) : null}
          <rect x={68} y={ourLabelY - 9} width={205} height={12} rx={2} fill={rising || held ? "#4f8fd0" : "#e3cfa8"} fillOpacity={0.92} />
          <text x={72} y={ourLabelY} fontSize={9} fontWeight={800} fill={rising || held ? "#ffffff" : "#1f5f3a"}>
            {ourLabel}
          </text>
          {op > 0 && (
            <text x={6} y={120} fontSize={7.5} fontWeight={800} fill="#ffffff">
              {(gal / 1e9).toFixed(0)} B gal made from the salty layer{rising ? ` · ${(recharged(years) / 1e9).toFixed(0)} B gal reclaimed water put back${isFar ? " (est.)" : ""}` : ""}
            </text>
          )}
        </>
      )}
      <text x={160} y={down || op === 0 ? 124 : 112} textAnchor="middle" fontSize={8} fontWeight={800} fill={down ? "#8e3b2f" : rising || held ? "#ffffff" : "#1f5f3a"}>
        {down
          ? isFar
            ? "ESTIMATE · 2000–2020 DECLINE CONTINUED · TOWN WELLS DRY"
            : warm
              ? "FRESH WATER STILL TAKEN · STATE PROJECTS RECHARGE DOWN 25%+ BY 2070"
              : "FRESH WATER TAKEN FOR FILLS, BUILDING AND OPERATIONS"
          : isFar
            ? "ESTIMATE · SLOWER DECLINE CONTINUED · WELLS STILL READ YEARLY"
            : op === 0
              ? "PLANT UNDER CONSTRUCTION"
              : held
                ? "SALTY DEEP WATER TREATED · TOWNS' FRESH WELLS PUMP FAR LESS"
                : "RECLAIMED WATER RECHARGED (~2 MGD) · AS EL PASO HAS DONE SINCE 1985"}
      </text>
    </svg>
  );
}

type Fact = { id: string; chip: string; color: string; info: string; sources: string[] };

/** The facts behind a picture at this year, for this side. Each is a chip; tap or hover for the explanation and source. */
function factsFor(side: "ours" | "theirs", years: number, kid: boolean): Fact[] {
  const op = operating(years);
  const isFar = far(years);
  const theirs = side === "theirs";
  const tons = tonsFor(theirs, years);
  const out: Fact[] = [];
  if (op > 0) {
    out.push({
      id: "co2",
      chip: isFar ? `${(tons / 1e6).toFixed(0)} M tons CO₂ (estimate)` : `${(tons / 1e6).toFixed(0)} M tons CO₂ so far`,
      color: theirs ? "#c0392b" : "#2e8b57",
      info: kid
        ? "This is all the planet-warming gas let out since the plant turned on, added up. It does not go away on its own for hundreds of years."
        : theirs
          ? `Running total since operations began (year 2): the permitted 8,820,970 tons a year × ${op} operating years${isFar ? ", an estimate that assumes the plant ran as filed for the whole period" : ""}. Counted cumulatively because warming tracks cumulative CO₂ almost linearly and the effects persist for centuries.`
          : `Running total since operations began (year 2): the 5–10% not captured × ${ourGasOp(years)} operating years, stopping in 2045 when Process 4 brings gas hours to zero${isFar ? " (estimate: nothing added after that)" : ""}. Counted cumulatively because warming tracks cumulative CO₂ almost linearly and the effects persist for centuries.`,
      sources: ["sob", "ipcc-ar6-spm"],
    });
  }
  if (!theirs && op > 0) {
    const held = years < RECHARGE_START_YEAR;
    out.push({
      id: held ? "held" : "recharge",
      chip: held ? "decline slowed: fresh pumping cut" : isFar ? "slower decline (estimate)" : "~2 MGD of reclaimed water put back",
      color: "#1f7ae0",
      info: kid
        ? held
          ? "The clean water comes from the deep salty layer, so the town's fresh wells pump much less. The water underground still drops a little, because farms and two big cities pump the same basin, but much more slowly."
          : "The town's used water is cleaned all the way to drinking quality and soaked back into the ground. El Paso has done this since 1985. It helps the water underground drop more slowly; it does not fill it back up."
        : held
          ? "The plant makes 5 MGD from the deep brackish layer against CRRUA's 6 MGD of 2027 demand, so the towns' fresh wells pump about 1 MGD instead of 6. The regional decline, driven by farms, El Paso and Juárez, continues; locally it slows. Recharge needs a permit under New Mexico's Ground Water Storage and Recovery Act and a water right for the stored water; Albuquerque's took from 2008 tests to a 2014 permit, so the drawing starts recharge in year 5."
          : `CRRUA's three treatment plants handle about 1.85 MGD of wastewater today, growing with the towns. Treated to drinking standard and put into infiltration basins, that is about 2 million gallons a day back into the fresh aquifer, against the 3.1 MGD CRRUA pumped from it in 2020. There is no plant surplus to add: CRRUA's demand (6 MGD in 2027) exceeds the 5 MGD plant. El Paso has recharged reclaimed water since 1985, over 30 billion gallons, which the utility says slowed its aquifer's decline; Rio Rancho has held New Mexico's first permit for reclaimed-water recharge since 2017. Drawn as a decline at 40% of the regional rate: direction, not a measurement.${isFar ? " Continued for 250 years the slower decline still reaches the bottom of the gauge; nobody can promise otherwise." : ""} That effluent today counts as the towns' Rio Grande return-flow offset, and a storage permit needs a water right; the State Engineer is where both are settled.`,
      sources: ["nmsu", "epwater-recharge", "epwater-aquifers", "nm-asr-act", "rio-rancho-pure", "abcwua-bear-canyon", "usgs-mesilla-taap"],
    });
  }
  if (isFar) {
    out.push({
      id: "far",
      chip: "how this 250-year estimate is made",
      color: theirs ? "#8e3b2f" : "#003047",
      info: theirs
        ? kid
          ? "Nobody has written a plan this far ahead, so we kept their plan running exactly as filed the whole time. The deal itself ended when the last payment was made, and nobody wrote down who takes care of the land and the deep wells after that."
          : "No filing, lease or state projection reaches 2276, so this view continues the documented trends: the permitted emissions run as filed, the 2000–2020 decline of the water table continues, and the signed agreement, which ends when its listed payments end and has no closure, restoration or bond clause, leaves no one named to care for the wells or the land. Every number here is an estimate on those assumptions."
        : kid
          ? "We kept our plan running the whole time too: the gas catcher on and measured, hot rock and wind doing more of the work, the town's cleaned water going back into the ground, and money set aside at the start so someone is still paid to check the wells and the land."
          : "This view continues the upgraded plan's trends: capture metered against a 90–95% target on whatever gas still runs, a gas share falling as far as geothermal, storage and transmission allow, recharge at about 2 MGD slowing the local decline, and the closure and monitoring bond, sized by an engineer's estimate and revised every five years the way Doña Ana County already requires of solar farms, paying for the wells to be watched. Every number here is an estimate on those assumptions.",
      sources: theirs ? ["cba"] : ["cba", "dac-solar-decom"],
    });
    if (!theirs) {
      out.push({
        id: "rock",
        chip: "captured CO₂ is rock",
        color: "#2e8b57",
        info: kid
          ? "The gas we caught was turned into stone inside concrete, or pushed deep under a lid of rock. Stone does not float away."
          : "CO₂ mineralized in concrete and aggregate becomes calcium carbonate, the mineral limestone is made of, stable on geologic time. CO₂ stored under cap rock passed its 50-year federal post-injection care in the 2100s; after that the bond funds whoever still monitors it.",
        sources: ["carboncure", "blue-planet", "epa-class-vi"],
      });
    }
  }
  if (theirs && op > 0) {
    const swaps = Math.floor(op / STACK_LIFE);
    out.push({
      id: "stacks",
      chip: swaps > 0 ? `~${swaps} stack swaps` : "first stacks",
      color: "#6b6b6b",
      info: kid
        ? "The power machines wear out inside and get new parts about every five years. That is how many times so far."
        : `Bloom expects fuel-cell stacks to be replaced about every 5 years, so over ${op} operating years that is roughly ${swaps} swap${swaps === 1 ? "" : "s"} across 2,275 stacks. An operating reality of the plant, not a claim about its owners.`,
      sources: ["bloom-stack-life", "sob"],
    });
  }
  if (theirs && op >= HB93_YEAR) {
    out.push({
      id: "hb93",
      chip: "past the 2045 net-zero date",
      color: "#c0392b",
      info: kid
        ? "A New Mexico law says the plant has to count as clean by 2045, but the law lets a gas plant count as clean by cutting other pollution somewhere else. So we keep drawing the smoke."
        : "HB93 requires this microgrid to use net-zero carbon resources by 2045 (year 19), but the statute counts a gas plant that offsets a tenth of its CO₂ in methane cuts as net-zero, and the developers' stated route is carbon-free energy matching by 2031. Neither changes what leaves the stacks, so this drawing keeps the fuel cells burning gas after 2045.",
      sources: ["cba", "bocc", "nmsa-62-17-12"],
    });
  }
  if (!theirs && op >= HB93_YEAR) {
    out.push({
      id: "gasoff",
      chip: "gas share falling (target)",
      color: "#2e8b57",
      info: kid
        ? "Hot rock and wind take over more of the work each year, so the gas machines rest more. How much they can rest depends on test wells nobody has drilled yet, so this is a goal, not a promise."
        : "Process 4 asks for a falling share of energy from gas on a public meter: geothermal test wells in Phase 1, delivered wind and solar, rooftop panels. How far it falls depends on the wells, storage and new transmission; even with every slider at maximum the Blueprint model leaves about half the year's energy on gas, and no 2.4 GW round-the-clock load runs without gas anywhere. A target, stated as one.",
      sources: ["cba", "nmsa-62-17-12", "fervo-cape"],
    });
  }
  if (!theirs && op > 0) {
    out.push({
      id: "water",
      chip: `${((OUR_WATER_GPD * 365 * op) / 1e9).toFixed(0)} B gallons made`,
      color: "#1f7ae0",
      info: kid ? "Clean water made from salty water, all added up since the plant started." : `5 million gallons a day × 365 × ${op} operating years, from NMSU's 5 MGD brackish desalination design delivered to CRRUA.`,
      sources: ["nmsu"],
    });
  }
  if (years >= LEASE_YEARS) {
    out.push({
      id: "lease",
      chip: "lease over · land on tax rolls",
      color: "#003047",
      info: kid
        ? "The county's 30-year deal with the company is finished by now, so the land pays normal taxes again."
        : "The industrial revenue bond lease in the Community Benefits Agreement runs 30 years. When it ends (year 30) the property returns to the tax rolls, so payments in lieu of taxes stop and ordinary property tax applies.",
      sources: ["cba"],
    });
  }
  if (years >= WARM_YEAR) {
    out.push({
      id: "warm",
      chip: "NM ~5–7 °F warmer by 2070",
      color: "#d99400",
      info: kid
        ? "Scientists for New Mexico say the state will be a lot hotter and drier by the time you are grown up, with less water coming into the ground."
        : "New Mexico's Bureau of Geology projects 5 to 7 °F of warming over the next 50 years and major-river flows down 16 to 28%. Shown as context on both sides; beyond 2070 the projection ends and the drawing holds at its endpoint.",
      sources: ["nmbg-164"],
    });
  }
  if (theirs && years >= WARM_YEAR) {
    out.push({
      id: "recharge",
      chip: "water table still falling",
      color: "#8e3b2f",
      info: kid
        ? "Their plan keeps taking the good water while less rain and snow refill it, so the water underground keeps dropping."
        : "Mesilla groundwater already declined from 2000 to 2020 as streamflow fell and withdrawals rose; with river flows projected down 16 to 28%, continued fresh-water withdrawals across the basin keep pulling the table down.",
      sources: ["usgs-mesilla-taap", "nmbg-164"],
    });
  }
  return out;
}

function LongViewFacts({ side, years, kid }: { side: "ours" | "theirs"; years: number; kid: boolean }) {
  const facts = factsFor(side, years, kid);
  const [openId, setOpenId] = useState<string | null>(null);
  const open = facts.find((f) => f.id === openId) ?? null;
  if (facts.length === 0) return null;
  return (
    <div className="mt-2">
      <div className="flex flex-wrap gap-1.5">
        {facts.map((f) => (
          <button
            key={f.id}
            type="button"
            title={f.info}
            onClick={() => setOpenId(openId === f.id ? null : f.id)}
            aria-expanded={openId === f.id}
            className="inline-flex min-h-[28px] items-center gap-1.5 rounded-full border px-2.5 text-[12px] font-bold leading-none transition-colors"
            style={{ borderColor: openId === f.id ? f.color : "#e0e0e0", backgroundColor: openId === f.id ? "#f4f4f4" : "#fff", color: "#003047" }}
          >
            <span className="inline-block h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: f.color }} />
            {f.chip}
            <span aria-hidden style={{ color: "#9a9a9a", fontSize: 11 }}>ⓘ</span>
          </button>
        ))}
      </div>
      {open && (
        <div className="pj-reveal mt-2 rounded p-3 text-left" style={{ backgroundColor: "#f7f7f7", borderLeft: `4px solid ${open.color}`, fontSize: kid ? 15 : 14, lineHeight: 1.55, color: "#3c3c3c" }}>
          {open.info}
          {!kid && <Cite ids={open.sources} />}
        </div>
      )}
    </div>
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

        {/* Year bar: above the pictures; sticks under the header while an expert scrolls the rows */}
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
          After {year} {year === 1 ? "year" : "years"} · {2026 + year} {far(year) ? `· ${operating(year)} years of operation · estimate: trends continued past every filing` : operating(year) === 0 ? "· still under construction" : `· ${operating(year)} ${operating(year) === 1 ? "year" : "years"} of operation`}
        </div>

        </div>
        {/* Pictures: ours first, side by side */}
        <div className="mx-auto mb-8 grid max-w-[1000px] grid-cols-2 gap-2 sm:gap-4">
          {(["ours", "theirs"] as const).map((side) => {
            const theirs = side === "theirs";
            return (
              <div key={side} className="rounded bg-white p-2 shadow-sm sm:p-3" style={{ borderTop: `4px solid ${theirs ? "#c0392b" : "#2e8b57"}` }}>
                <div className="mb-2 flex items-center justify-between text-[12px] font-black uppercase sm:text-[14px]" style={{ color: theirs ? "#c0392b" : "#1f5f3a" }}>
                  <span>{theirs ? (kid ? "Their plan" : "As filed") : kid ? "Our plan" : "Force-upgraded"} · year {year} · {2026 + year}</span>
                  <button type="button" onClick={() => setZoom(side)} aria-label={`Open the ${theirs ? "as-filed" : "upgraded"} year ${year} pictures full-screen`} className="flex h-8 w-8 items-center justify-center rounded" style={{ fontSize: 15, color: "#003047" }}>
                    ⤢
                  </button>
                </div>
                <button type="button" onClick={() => setZoom(side)} className="block w-full text-left" aria-label={`Open the ${theirs ? "as-filed" : "upgraded"} year ${year} pictures full-screen`}>
                  <SmogScene smog={theirs} years={year} />
                  <div className="mt-2">
                    <WaterGauge down={theirs} years={year} />
                  </div>
                </button>
                <LongViewFacts side={side} years={year} kid={kid} />
              </div>
            );
          })}
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
                        After {year} {year === 1 ? "year" : "years"} · {2026 + year}
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
                  <LongViewFacts side={zoom} years={year} kid={kid} />
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

        {expert && year >= 30 && (
          <p className="pj-adult mx-auto mb-6 max-w-[1000px] rounded px-4 py-3 text-[14px]" style={{ backgroundColor: "#fff8e6", lineHeight: 1.55, color: "#3c3c3c" }}>
            <strong>What the long views assume, and where it comes from.</strong> CO₂ is a running total because cumulative emissions drive warming almost linearly and the effects last for centuries<Cite ids={["ipcc-ar6-spm"]} />. Their side uses the draft permit&apos;s 8,820,970 tons a year (high) and the developers&apos; own expectation of about 6.1 million (low)<Cite ids={["sob-part-a", "bocc"]} />. HB93 requires net-zero carbon resources by 2045 (year 19), but the statute counts a gas plant that offsets a tenth of its CO₂ in methane cuts as net-zero, and the developers&apos; route is credit matching by 2031, so their exhaust is drawn continuing<Cite ids={["nmsa-62-17-12", "cba", "bocc"]} />. Our side counts the 5–10% not captured for as long as gas runs, against a 90–95% capture target that no plant has yet sustained for a decade; the gas share is drawn as a falling target, never as zero<Cite ids={["boundary-dam-2024"]} />. Power modules are swapped about every five years<Cite ids={["sob"]} />. The 30-year lease ends at year 30 and the land returns to the tax rolls<Cite ids={["cba"]} />. New Mexico is projected 5–7 °F warmer within 50 years with major rivers down 16–28%<Cite ids={["nmbg-164"]} />, and Mesilla groundwater already fell from 2000 to 2020<Cite ids={["usgs-mesilla-taap"]} />, so the water table keeps dropping under their plan. Beyond 2070 the state projection ends; the drawings hold at its endpoint rather than extrapolate. Both water gauges show the same fresh table CRRUA&apos;s wells draw from, and the historic marks are schematic. Ours is drawn falling at 40% of the regional slope from year 2, when the plant covers most of CRRUA&apos;s demand and the fresh wells pump about 1 MGD instead of 6, with about 2 MGD of the towns&apos; reclaimed water recharged from year 5 under a Ground Water Storage and Recovery permit once the Rio Grande return-flow offset and a water right are settled<Cite ids={["nmsu", "nm-asr-act"]} />. El Paso has recharged reclaimed water since 1985, over 30 billion gallons, which the utility says slowed its aquifer&apos;s decline; Rio Rancho has held New Mexico&apos;s first reclaimed-recharge permit since 2017<Cite ids={["epwater-recharge", "epwater-aquifers", "rio-rancho-pure"]} />. There is no plant surplus to recharge in Phase 1 because CRRUA&apos;s demand exceeds the plant. The year-250 view is an estimate that continues each documented trend past every filing and projection; every figure on it carries the word estimate<Cite ids={["ipcc-ar6-spm", "epa-class-vi", "cba", "nmsu"]} />.
          </p>
        )}
        {/* Rows: the label sits in the middle because it applies to both sides; ours left, theirs right. Expert only; the home page comparison carries the six headline lines. */}
        {expert && (
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
        )}

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
