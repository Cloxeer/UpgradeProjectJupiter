"use client";

import { asset } from "@/lib/base";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePlanMode, SwitchHint, markSwitched } from "@/components/blueprint/PlanMode";
import { useAudience } from "@/components/jupiter/Audience";
import { zoneKid, zoneKidName } from "@/data/blueprintVoices";
import { zoneTM } from "@/data/tobyMoby";
import { TobyMoby } from "@/components/blueprint/TobyMoby";
import { NewMarker } from "@/components/blueprint/Parts";

/** What each Science topic points at on the map, in kid words and grown-up words. Everything here is already stated, with sources, on the process cards. */
const SPOTS: Record<string, { ids: string[]; title: string; kid: string; adult: string }> = {
  money: {
    ids: ["greenhouse", "packing", "water", "capture"],
    title: "Money and jobs",
    kid: "The money and the jobs come from the new green things: the greenhouses, the packing house and school, and the clean-water machine. People work there, and the town gets paid.",
    adult: "The new revenue and jobs come from what is added on the same land: greenhouse leases and about 1,000 greenhouse jobs, the packing house and NMSU / DACC institute, water sales from the 5 MGD plant, and captured CO₂ with buyers.",
  },
  heat: {
    ids: ["hx", "greenhouse"],
    title: "Where the heat goes",
    kid: "The computers' heat goes through the little red box (HX) and warms the greenhouses instead of the sky.",
    adult: "Heat leaves the halls through the plate heat exchanger (HX) on the warm-water header and feeds the greenhouses and the water plant's preheat before the dry coolers.",
  },
  carbon: {
    ids: ["capture"],
    title: "Catching the gas",
    kid: "The gas-catching box is right next to the power plant. It catches the gas before it floats away.",
    adult: "Capture and compression skids sit beside the fuel-cell plant; captured CO₂ goes to greenhouses, concrete and aggregate first, with deep storage as the fallback.",
  },
  water: {
    ids: ["water"],
    title: "Clean water",
    kid: "This is the clean-water machine. Salty water goes in, clean water comes out for the town.",
    adult: "The 5 MGD brackish desalination plant (NMSU design) delivers to CRRUA; brine is injected about 20 miles away, below the aquifer.",
  },
  solar: {
    ids: ["solarGround", "dcMain", "dcN1", "dcN2", "dcE"],
    title: "Sun, hot rock and wind",
    kid: "Solar panels go on all the big roofs and in the strip by the fans. The sun helps a little; hot rock and wind do most of the work.",
    adult: "Rooftop solar on every hall roof plus a ground strip is about 1% of the load, stated honestly; geothermal and delivered wind are what retire gas hours.",
  },
  food: {
    ids: ["greenhouse", "packing", "water"],
    title: "Food and jobs",
    kid: "Food comes from here: the greenhouses grow tomatoes with the computers' heat, the packing house boxes them up, and the water machine gives them water.",
    adult: "About 150 acres of greenhouses on waste heat and captured CO₂, a packing house with its own gate at the border crossing, and water from the desalination plant.",
  },
};
import {
  zones,
  features,
  topRoads,
  solarRoofIds,
  agrivoltaicIds,
  FENCE_THEIRS,
  FENCE_OURS,
  SOURCE_NOTE,
  CANVAS,
  TOTAL_ACRES,
  type Feature,
  type Zone,
} from "@/data/blueprint";

type View = "theirs" | "ours";

/** Crops of their Aug. 27, 2026 render, by feature id (falls back to zone id). */
const renderCrop: Record<string, { src: string; caption: string }> = {
  dcMain: { src: asset("/images/jupiter/render-crops/halls.jpg"), caption: "The main hall, truck dock and transformer yard in their render" },
  dcE: { src: asset("/images/jupiter/render-crops/dcE.jpg"), caption: "The east hall in their render" },
  dcN1: { src: asset("/images/jupiter/render-crops/dcN.jpg"), caption: "The north row of halls in their render" },
  dcN2: { src: asset("/images/jupiter/render-crops/dcN.jpg"), caption: "The north row of halls in their render" },
  dryNorth: { src: asset("/images/jupiter/render-crops/dryNorth.jpg"), caption: "The dry-cooler row behind the north halls in their render" },
  drySW: { src: asset("/images/jupiter/render-crops/dry.jpg"), caption: "The long dry-cooler rows in their render" },
  drySE: { src: asset("/images/jupiter/render-crops/dry.jpg"), caption: "The long dry-cooler rows in their render" },
  transformers: { src: asset("/images/jupiter/render-crops/transformers.jpg"), caption: "The transformer yard along the main hall in their render" },
  cp1: { src: asset("/images/jupiter/render-crops/chillers.jpg"), caption: "Modular chiller plants in their render" },
  cp2: { src: asset("/images/jupiter/render-crops/chillers.jpg"), caption: "Modular chiller plants in their render" },
  cp3: { src: asset("/images/jupiter/render-crops/chillers.jpg"), caption: "Modular chiller plants in their render" },
  u1: { src: asset("/images/jupiter/render-crops/power.jpg"), caption: "Transformer yard and chiller units in their render" },
  u2: { src: asset("/images/jupiter/render-crops/power.jpg"), caption: "Transformer yard and chiller units in their render" },
  u3: { src: asset("/images/jupiter/render-crops/power.jpg"), caption: "Transformer yard and chiller units in their render" },
  warehouse: { src: asset("/images/jupiter/render-crops/warehouse.jpg"), caption: "The warehouse in their render" },
  ops: { src: asset("/images/jupiter/render-crops/ops.jpg"), caption: "Operations, parking and the secure entrance in their render" },
  parking: { src: asset("/images/jupiter/render-crops/ops.jpg"), caption: "Operations, parking and the secure entrance in their render" },
  entrance: { src: asset("/images/jupiter/render-crops/gates.jpg"), caption: "Secure exit, guard booth and entry roads in their render" },
  exit: { src: asset("/images/jupiter/render-crops/gates.jpg"), caption: "Secure exit, guard booth and entry roads in their render" },
  booth: { src: asset("/images/jupiter/render-crops/gates.jpg"), caption: "Secure exit, guard booth and entry roads in their render" },
  gateTop: { src: asset("/images/jupiter/render-crops/fence.jpg"), caption: "Security fence in their render" },
  gateCross: { src: asset("/images/jupiter/render-crops/fence.jpg"), caption: "Security fence in their render" },
  // zone fallbacks
  halls: { src: asset("/images/jupiter/render-crops/halls.jpg"), caption: "The main hall and transformer yard in their render" },
  dry: { src: asset("/images/jupiter/render-crops/dry.jpg"), caption: "Dry-cooler rows in their render" },
  power: { src: asset("/images/jupiter/render-crops/power.jpg"), caption: "Transformer yard and modular chiller plants in their render" },
  pipeline: { src: asset("/images/jupiter/render-crops/fence.jpg"), caption: "Security fence and the south edge in their render" },
};

const fill: Record<Feature["kind"], string> = {
  hall: "#e9e4d8",
  building: "#efe9dc",
  yard: "#8a949b",
  coolers: "#6f8f9a",
  parking: "#b9b4a8",
  gate: "#3c3c3c",
  fence: "none",
  new: "#2e8b57",
  ghost: "#8e3b2f",
};

const newColors: Record<string, string> = {
  capture: "#2e8b57",
  hx: "#c0392b",
  greenhouse: "#2e8b57",
  packing: "#d99a00",
  water: "#1f7ae0",
  solarGround: "#e07b00",
  buffer: "#b89a6a",
};

function Label({ f, small = false }: { f: Feature; small?: boolean }) {
  const cx = f.rect.x + f.rect.w / 2;
  const cy = f.rect.y + f.rect.h / 2;
  const vertical = f.rect.h > f.rect.w * 2.2 && f.rect.w < 120;
  const fs = small ? 9 : f.rect.w < 80 && !vertical ? 9 : 11;
  return (
    <g pointerEvents="none" transform={vertical ? `rotate(-90 ${cx} ${cy})` : undefined}>
      <rect
        x={cx - (f.label.length * fs * 0.62) / 2 - 5}
        y={cy - fs - (f.sub ? 6 : 0)}
        width={f.label.length * fs * 0.62 + 10}
        height={fs + 8 + (f.sub ? 10 : 0)}
        rx={2}
        fill="#ffffff"
        fillOpacity={0.92}
      />
      <text x={cx} y={cy + (f.sub ? -2 : 2)} textAnchor="middle" fontSize={fs} fontWeight={900} fill="#003047">
        {f.label}
      </text>
      {f.sub && (
        <text x={cx} y={cy + 9} textAnchor="middle" fontSize={7.5} fontWeight={600} fill="#15768c">
          {f.sub}
        </text>
      )}
    </g>
  );
}

function outline(f: Feature): string {
  const { x, y, w, h } = f.rect;
  const n = f.notch;
  if (!n) return `${x},${y} ${x + w},${y} ${x + w},${y + h} ${x},${y + h}`;
  if (n.corner === "ne") return `${x},${y} ${x + w - n.w},${y} ${x + w - n.w},${y + n.h} ${x + w},${y + n.h} ${x + w},${y + h} ${x},${y + h}`;
  if (n.corner === "nw") return `${x + n.w},${y} ${x + w},${y} ${x + w},${y + h} ${x},${y + h} ${x},${y + n.h} ${x + n.w},${y + n.h}`;
  if (n.corner === "se") return `${x},${y} ${x + w},${y} ${x + w},${y + h - n.h} ${x + w - n.w},${y + h - n.h} ${x + w - n.w},${y + h} ${x},${y + h}`;
  return `${x},${y} ${x + w},${y} ${x + w},${y + h} ${x + n.w},${y + h} ${x + n.w},${y + h - n.h} ${x},${y + h - n.h}`;
}

function Fans({ r }: { r: Feature["rect"] }) {
  // two rows of fan circles for the dry coolers
  const horizontal = r.w > r.h;
  const n = Math.floor((horizontal ? r.w : r.h) / 14);
  const items: React.ReactNode[] = [];
  for (let i = 0; i < n; i++) {
    for (let row = 0; row < 2; row++) {
      const cx = horizontal ? r.x + 7 + i * 14 : r.x + r.w * (row === 0 ? 0.3 : 0.72);
      const cy = horizontal ? r.y + r.h * (row === 0 ? 0.3 : 0.72) : r.y + 7 + i * 14;
      items.push(<circle key={`${i}-${row}`} cx={cx} cy={cy} r={4.5} fill="#dfe7ea" stroke="#3f5a63" strokeWidth={0.8} />);
    }
  }
  return <>{items}</>;
}

function Tanks({ r }: { r: Feature["rect"] }) {
  const items: React.ReactNode[] = [];
  const rows = Math.floor(r.h / 22);
  for (let i = 0; i < rows; i++) {
    const y = r.y + 8 + i * 22;
    items.push(<circle key={`t${i}`} cx={r.x + 12} cy={y + 6} r={6} fill="#cfd6da" stroke="#3c3c3c" strokeWidth={0.8} />);
    items.push(<rect key={`b${i}`} x={r.x + 24} y={y} width={r.w - 30} height={12} fill="#b8c0c5" stroke="#3c3c3c" strokeWidth={0.8} />);
  }
  return <>{items}</>;
}

function Cars({ r }: { r: Feature["rect"] }) {
  const items: React.ReactNode[] = [];
  const cols = Math.floor(r.w / 16);
  const rows = Math.floor(r.h / 30);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      items.push(
        <rect
          key={`${i}-${j}`}
          x={r.x + 6 + i * 16}
          y={r.y + 8 + j * 30}
          width={7}
          height={13}
          rx={1.5}
          fill={["#d9534f", "#ffffff", "#5b6770", "#c7c7c7", "#2a4a6a"][(i + j) % 5]}
          stroke="#555"
          strokeWidth={0.4}
        />
      );
    }
  }
  return <>{items}</>;
}

function Bays({ r }: { r: Feature["rect"] }) {
  const items: React.ReactNode[] = [];
  const n = Math.floor(r.w / 22);
  for (let i = 0; i < n; i++) {
    items.push(<rect key={i} x={r.x + 6 + i * 22} y={r.y + 6} width={14} height={r.h - 12} fill="#a9dcb6" stroke="#1f5f3a" strokeWidth={0.8} />);
  }
  return <>{items}</>;
}

export function SitePlan() {
  const [view, setView] = usePlanMode();
  const [selected, setSelected] = useState<string>("greenhouse");
  const [selFeature, setSelFeature] = useState<string>("greenhouse");
  const [audience] = useAudience();
  const isKid = audience === "kid";
  const [hover, setHover] = useState<string | null>(null);
  // On phones and tablets the detail panel opens full-screen; on desktop it is the side column.
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  // Arrived from the Science page: point at the things this topic is about.
  const [spot, setSpot] = useState<string | null>(null);
  const [next, setNext] = useState<string | null>(null);
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      const sp = q.get("spot");
      if (sp && SPOTS[sp]) {
        setSpot(sp);
        setNext(q.get("next"));
        setView("ours");
        setSelected(SPOTS[sp].ids[0] === "hx" ? "power" : zones.find((z) => features.find((f) => f.id === SPOTS[sp].ids[0])?.zoneId === z.id)?.id ?? "greenhouse");
        setSelFeature(SPOTS[sp].ids[0]);
      }
    } catch {
      /* no query string */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const spotIds = new Set(spot ? SPOTS[spot].ids : []);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(max-width: 1023px)");
    if (!mq.matches) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const visible = features.filter((f) => view === "ours" || f.plan === "both");
  const sel: Zone | undefined = zones.find((z) => z.id === selected);
  // An upgrade-only zone while looking at their render: say plainly that their plan leaves it out.
  const missing = view === "theirs" && sel?.plan === "ours";
  const theirsAcres = zones.filter((z) => z.plan === "both").reduce((s, z) => s + z.acres, 0);
  const oursAcres = zones.filter((z) => z.plan === "ours").reduce((s, z) => s + z.acres, 0);

  return (
    <>
    {spot && (
      <div className="pj-reveal mb-4 rounded p-4" style={{ backgroundColor: "#fff8e6", border: "2px solid #fdb715" }} role="region" aria-live="polite">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[13px] font-black uppercase tracking-wide" style={{ color: "#8a6a00" }}>Look here · {SPOTS[spot].title}</div>
            <p className="mt-1" style={{ fontSize: isKid ? 19 : 16, lineHeight: 1.55, color: "#3c3c3c" }}>
              {isKid ? SPOTS[spot].kid : SPOTS[spot].adult} <strong>The yellow arrows on the map point at them.</strong>
            </p>
            {next && (
              <a href={next} className="mt-2 inline-flex min-h-[40px] items-center rounded px-4 text-[14px] font-black uppercase text-white" style={{ backgroundColor: "#2e8b57" }}>
                {isKid ? "See how it works →" : "See the process drawing →"}
              </a>
            )}
          </div>
          <button type="button" onClick={() => setSpot(null)} aria-label="Dismiss" className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full" style={{ color: "#6b6b6b", border: "1px solid #d9d9d9", fontSize: 18 }}>
            ×
          </button>
        </div>
      </div>
    )}
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex flex-col items-center gap-1">
            <SwitchHint />
            <div className="inline-flex overflow-hidden rounded border" style={{ borderColor: "#003047" }}>
              {(["theirs", "ours"] as View[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => { setView(v); markSwitched(); }}
                  className="px-4 py-2 text-[15px] font-bold uppercase tracking-wide transition-colors"
                  style={{
                    backgroundColor: view === v ? (v === "ours" ? "#2e8b57" : "#c0392b") : "#ffffff",
                    color: view === v ? "#ffffff" : "#003047",
                  }}
                >
                  {v === "theirs" ? "Their render, top view" : "Force-upgraded"}
                </button>
              ))}
            </div>
          </div>
          <div className="pj-adult text-[15px] font-semibold" style={{ color: "#3c3c3c" }}>
            Drone view, straight down · North is up · ~{TOTAL_ACRES.toLocaleString()} acres per the CBA
          </div>
        </div>

        <svg
          viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`}
          className="w-full rounded shadow-sm"
          style={{ backgroundColor: "#e8d9b8", aspectRatio: `${CANVAS.w} / ${CANVAS.h}` }}
          role="img"
          aria-label={`${view === "ours" ? "Force-upgraded" : "Their"} campus, top view`}
        >
          <defs>
            <pattern id="solar" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="#1d3557" />
              <path d="M0 0H8M0 4H8M4 0V8" stroke="#6ea8ff" strokeWidth="0.6" />
            </pattern>
            <pattern id="desert" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="8" cy="10" r="1.6" fill="#8f7a4a" />
              <circle cx="28" cy="30" r="1.4" fill="#8f7a4a" />
              <circle cx="20" cy="22" r="1" fill="#a3925f" />
            </pattern>
          </defs>
          <rect x={0} y={0} width={CANVAS.w} height={CANVAS.h} fill="url(#desert)" />

          {/* Interior campus ground */}
          <polygon points={view === "ours" ? FENCE_OURS : FENCE_THEIRS} fill="#dccaa3" fillOpacity={0.5} />

          {/* Roads */}
          {topRoads.theirs.map((r) => (
            <polyline key={r.id} points={r.points} fill="none" stroke="#5a5a5a" strokeWidth={14} strokeLinejoin="round" strokeLinecap="round" />
          ))}
          {topRoads.theirs.map((r) => (
            <polyline key={`${r.id}-c`} points={r.points} fill="none" stroke="#fdb715" strokeWidth={1} strokeDasharray="8 8" />
          ))}
          {view === "ours" &&
            topRoads.ours.map((r) => (
              <g key={r.id}>
                <polyline points={r.points} fill="none" stroke="#5a5a5a" strokeWidth={14} strokeLinecap="round" />
                <text x={300} y={898} fontSize={9} fontWeight={800} fill="#c0392b">
                  {r.label}
                </text>
              </g>
            ))}

          {/* Trees: both sides of the west road, and along the cross road */}
          {Array.from({ length: 15 }).map((_, i) => (
            <g key={`w${i}`}>
              <circle cx={18} cy={230 + i * 20} r={3.5} fill="#5d8a4a" />
              <circle cx={44} cy={230 + i * 20} r={3.5} fill="#5d8a4a" />
            </g>
          ))}
          {Array.from({ length: 44 }).map((_, i) => (
            <circle key={`r${i}`} cx={250 + i * 22} cy={203} r={3.5} fill="#5d8a4a" />
          ))}

          {/* Features */}
          {visible.map((f) => {
            const isNew = f.plan === "ours";
            const base = isNew ? newColors[f.id] ?? "#2e8b57" : fill[f.kind];
            const ghost = f.kind === "ghost";
            return (
              <g
                key={f.id}
                onClick={() => {
                  setSelected(f.zoneId);
                  setSelFeature(f.id);
                  setOpen(true);
                }}
                onMouseEnter={() => setHover(f.zoneId)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer" }}
                transform={f.rotate ? `rotate(${f.rotate} ${f.rect.x + f.rect.w / 2} ${f.rect.y + f.rect.h / 2})` : undefined}
              >
                <polygon
                  points={outline(f)}
                  fill={base}
                  fillOpacity={ghost ? 0.25 : f.kind === "hall" || f.kind === "building" ? 1 : 0.9}
                  stroke={ghost ? "#8e3b2f" : isNew ? "#ffffff" : "#3c3c3c"}
                  strokeWidth={1.2}
                  strokeDasharray={ghost ? "6 4" : undefined}
                />
                {f.kind === "hall" && !f.notch && (
                  <rect x={f.rect.x + 4} y={f.rect.y + 4} width={f.rect.w - 8} height={f.rect.h - 8} fill="none" stroke="#c9c2b2" strokeWidth={1} />
                )}
                {f.kind === "coolers" && <Fans r={f.rect} />}
                {f.id === "chillers" && <Tanks r={f.rect} />}
                {f.id === "parking" && <Cars r={f.rect} />}
                {f.id === "greenhouse" && <Bays r={f.rect} />}
                {view === "ours" && solarRoofIds.includes(f.id) && (
                  <polygon points={outline(f)} fill="url(#solar)" fillOpacity={0.85} stroke="#ffffff" strokeWidth={6} pointerEvents="none" />
                )}
                {view === "ours" && agrivoltaicIds.includes(f.id) && (
                  <rect
                    x={f.rect.x + 6}
                    y={f.rect.y + 6}
                    width={f.rect.w - 12}
                    height={(f.rect.h - 12) * 0.25}
                    fill="url(#solar)"
                    fillOpacity={0.7}
                    pointerEvents="none"
                  />
                )}
                <Label f={f} small={f.kind === "gate"} />
              </g>
            );
          })}

          {/* Security fence */}
          <polygon points={view === "ours" ? FENCE_OURS : FENCE_THEIRS} fill="none" stroke="#3c3c3c" strokeWidth={2.5} strokeDasharray="10 5" pointerEvents="none" />
          <g pointerEvents="none">
            <rect x={600} y={view === "ours" ? 787 : 591} width={112} height={18} rx={2} fill="#ffffff" fillOpacity={0.92} />
            <text x={656} y={view === "ours" ? 800 : 604} textAnchor="middle" fontSize={10} fontWeight={900} fill="#003047">
              SECURITY FENCE
            </text>
          </g>

          {/* Ours: pipes */}
          {view === "ours" && (
            <g pointerEvents="none">
              <polyline points="770,520 770,640" fill="none" stroke="#c0392b" strokeWidth={6} strokeLinecap="round" />
              <text x={776} y={600} fontSize={9} fontWeight={800} fill="#c0392b">warm water</text>
              <polyline points="785,500 1000,500 1000,640" fill="none" stroke="#c0392b" strokeWidth={3} strokeDasharray="6 4" />
              <text x={880} y={495} fontSize={8} fontWeight={800} fill="#c0392b">preheat</text>
              <polyline points="304,55 304,62 258,62 258,600 275,640" fill="none" stroke="#003047" strokeWidth={2} strokeDasharray="4 3" />
              <text x={252} y={300} fontSize={8} fontWeight={800} fill="#003047" transform="rotate(-90 252 300)">CO₂ to greenhouses</text>
            </g>
          )}

          {/* Highlight layer: drawn last so nothing covers it. Outlines the clicked or hovered building. */}
          <defs>
            <filter id="pj-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#2e8b57" floodOpacity="0.9" />
            </filter>
          </defs>
          {visible
            .filter((f) => f.id === selFeature || f.zoneId === hover || spotIds.has(f.id))
            .map((f) => (
              <polygon
                key={`hl-${f.id}`}
                points={outline(f)}
                fill="none"
                stroke={spotIds.has(f.id) ? "#fdb715" : f.id === selFeature ? "#2e8b57" : "#fdb715"}
                strokeWidth={spotIds.has(f.id) ? 6 : f.id === selFeature ? 5 : 3}
                strokeLinejoin="round"
                filter={f.id === selFeature ? "url(#pj-glow)" : undefined}
                pointerEvents="none"
              />
            ))}
          {/* Arrows for the thing the reader came to see */}
          {spot &&
            visible
              .filter((f) => spotIds.has(f.id))
              .map((f) => <NewMarker key={`spot-${f.id}`} box={f.rect} side={f.rect.y < 120 ? "bottom" : "top"} label="HERE" color="#fdb715" textColor="#003047" />)}

          <text x={22} y={10} fontSize={9} fontWeight={800} fill="#003047">
            DRONE VIEW OF THEIR AUG. 27, 2026 RENDER · NORTH UP · NOT TO SURVEY SCALE
          </text>
          <text x={1194} y={797} textAnchor="end" fontSize={9} fontWeight={800} fill="#003047">
            THE RENDER SHOWS THE 400-ACRE FIRST PHASE; THE ~819-ACRE SITE EXTENDS BEYOND THIS VIEW (CBA)
          </text>
        </svg>
        <p className="mt-2 rounded px-3 py-2 text-center text-[15px] font-bold lg:hidden" style={{ backgroundColor: "#eaf6ee", color: "#1f5f3a" }}>
          Tap any building to open it full-screen.
        </p>
        <details name="pj-one" className="pj-adult mt-2">
          <summary className="cursor-pointer text-[14px] font-bold" style={{ color: "#15768c" }}>Where this layout comes from, and what sits inside the fence ▾</summary>
        <p className="mt-2 text-[14px]" style={{ color: "#6b6b6b" }}>
          {SOURCE_NOTE} Drone view straight down, north up. The security fence encloses only the halls, the chiller
          plants and the dry coolers; the warehouse, Operations and parking sit outside it on the west, with the secure
          entrance and secure exit as gates in the fence and the guard booth on the public road. Inside the fence: a dry-cooler
          band across the north, a loop road under it running from west of the warehouse to the east edge and back down, two
          halls in the north row split by a pair of roads, a cross road, the main hall with a smaller hall east of it split by
          a centre road and ringed by a service road, three chiller plants and three units below, and a dry-cooler band across
          the south. Two more roads run between the warehouse and the west hall. No building touches a road.
        </p>
        </details>
      </div>

      {/* Detail panel: the side column on desktop; portaled to <body> as a full-screen view on phones so no ancestor can paint over it. */}
      {(() => {
        const fs = open && mobile;
        const panel = (
      <div id="site-detail" className={`pj-site-panel pj-fade scroll-mt-32 rounded bg-white p-5 shadow-sm ${fs ? "pj-fs" : ""}`} key={selFeature} role={open ? "dialog" : undefined} aria-modal={open ? true : undefined} style={{ borderTop: `6px solid ${missing ? "#c0392b" : sel?.color ?? "#003047"}` }}>
        <button type="button" onClick={() => setOpen(false)} className="pj-fs__close mb-3 min-h-[44px] w-full items-center justify-center rounded font-black uppercase text-white" style={{ backgroundColor: "#003047", fontSize: 15 }}>
          ✕ Back to the map
        </button>
        {sel && (
          <>
            <div className="text-[13px] font-bold uppercase tracking-wide" style={{ color: missing || sel.plan === "ours" ? "#c0392b" : "#15768c" }}>
              {missing ? "Not in their plan · open desert as filed" : sel.plan === "ours" ? "New · inside the fence, on their property" : "Theirs · stays exactly where the render puts it"}
            </div>
            <h3 className="mt-1 font-bold" style={{ fontSize: 20, color: "#003047" }}>
              {sel.name}
            </h3>
            <div className="mt-1 font-black" style={{ fontSize: 28, color: missing ? "#c0392b" : sel.color }}>
              ~{sel.acres} acres
            </div>
            {missing && (
              <div className="mt-3 rounded p-3" style={{ backgroundColor: "#fff0ed", border: "1px dashed #c0392b" }}>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: "#8e3b2f" }}>
                  You are looking at their render. Nothing is drawn here in their plan; this is what the upgrade would add on the same ground.
                </p>
                <button type="button" onClick={() => { setView("ours"); markSwitched(); }} className="mt-2 min-h-[40px] rounded px-4 text-[13px] font-bold uppercase text-white" style={{ backgroundColor: "#2e8b57" }}>
                  Show it drawn in
                </button>
              </div>
            )}
            {(renderCrop[selFeature] ?? renderCrop[sel.id]) && (
              <figure className="mt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={(renderCrop[selFeature] ?? renderCrop[sel.id]).src} alt={(renderCrop[selFeature] ?? renderCrop[sel.id]).caption} className="w-full rounded" loading="lazy" decoding="async" />
                <figcaption className="mt-1 text-[13px]" style={{ color: "#6b6b6b" }}>
                  {(renderCrop[selFeature] ?? renderCrop[sel.id]).caption}. Crop of Project Jupiter Together&apos;s labeled render, Aug. 27, 2026{" "}
                  <a href="/sources#render" className="font-bold" style={{ color: "#15768c" }}>[6]</a>.
                </figcaption>
              </figure>
            )}
            <div className="mt-4">
              {isKid ? (
                <TobyMoby chat={zoneTM[sel.id]} fallback={zoneKid[sel.id] ?? sel.theirs} />
              ) : (
                <>
                  <div className="text-[13px] font-bold uppercase" style={{ color: "#6b6b6b" }}>How they are doing it (render + filings)</div>
                  <p style={{ fontSize: 16, lineHeight: 1.6, color: "#3c3c3c" }}>{sel.theirs}</p>
                </>
              )}
            </div>
            <div className="mt-3 rounded p-3" style={{ backgroundColor: "#eaf6ee" }}>
              {!isKid && (
                <>
                  <div className="text-[13px] font-bold uppercase" style={{ color: "#1f5f3a" }}>{missing ? "What the upgrade would put here" : "How it should be done"}</div>
                  <p style={{ fontSize: 16, lineHeight: 1.6, color: "#1f5f3a" }}>{sel.ours}</p>
                </>
              )}
            </div>
          </>
        )}

      </div>
        );
        return fs ? createPortal(panel, document.body) : panel;
      })()}
    </div>

    {/* Acre budget: a sideways strip under the map. Folded for grown-ups; open, in plain words, for little kids. */}
    <details name="pj-one" open={isKid} className="mt-4 rounded bg-white p-4 shadow-sm">
      <summary className="cursor-pointer text-[15px] font-bold" style={{ color: "#15768c" }}>
        {isKid ? "How the land is shared ▾" : `Acre budget: how the ~${TOTAL_ACRES.toLocaleString()} acres are used ▾`}
      </summary>
      <div className="mt-3 flex h-5 w-full overflow-hidden rounded">
        {zones.map((z) => (
          <button
            key={z.id}
            type="button"
            title={`${z.name}: ${z.acres} ac`}
            onClick={() => {
              if (z.plan === "ours") setView("ours");
              setSelected(z.id);
              setSelFeature(z.id);
            }}
            className="pj-inline transition-all duration-300"
            style={{ width: `${(z.acres / TOTAL_ACRES) * 100}%`, backgroundColor: z.color, opacity: selected === z.id ? 1 : 0.45, transform: selected === z.id ? "scaleY(1.5)" : "none", outline: selected === z.id ? "2px solid #2e8b57" : "none", zIndex: selected === z.id ? 1 : 0 }}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {zones.map((z) => {
          const on = selected === z.id;
          return (
            <button
              key={z.id}
              type="button"
              onClick={() => { if (z.plan === "ours") setView("ours"); setSelected(z.id); setSelFeature(z.id); }}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-full border px-3 text-[14px] font-semibold transition-colors"
              style={{ borderColor: on ? z.color : "#e0e0e0", backgroundColor: on ? "#eaf6ee" : "#fff", color: "#003047" }}
            >
              <span className="inline-block h-3 w-3 flex-shrink-0 rounded-full" style={{ backgroundColor: z.color }} />
              <span>{isKid ? zoneKidName[z.id] ?? z.name : z.name}</span>
              <span className="pj-num whitespace-nowrap" style={{ color: "#6b6b6b" }}>· {z.acres} ac</span>
            </button>
          );
        })}
      </div>
      <div className="pj-num mt-3 flex flex-wrap justify-between gap-2 text-[14px] font-semibold" style={{ color: "#3c3c3c" }}>
        <span>Theirs, unchanged: {theirsAcres} ac</span>
        <span style={{ color: "#1f5f3a" }}>{sel ? `Selected: ${sel.name} · ${sel.acres} acres · ${Math.round((sel.acres / TOTAL_ACRES) * 100)}% of the site` : "Tap a zone"}</span>
        <span style={{ color: "#2e8b57" }}>New: {oursAcres} ac</span>
      </div>
    </details>
    </>
  );
}
