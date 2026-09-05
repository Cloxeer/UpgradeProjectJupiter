"use client";

import { useEffect } from "react";
import { SourceList } from "@/components/Cite";
import { useAudience } from "@/components/jupiter/Audience";
import { partDocs, type PartDoc } from "@/data/parts";
import { partTM } from "@/data/tobyMoby";
import { TobyMoby } from "@/components/blueprint/TobyMoby";

/*
  Click-to-explain for the process diagrams.
  - <Clickable> wraps an SVG group and makes it keyboard/mouse selectable.
  - <PartInfo> renders the explanation panel below a diagram (same look as the site-plan detail panel).
  - <NewMarker> draws a red arrow + NEW badge pointing at an added part.
  - <Cloud> draws a proper cumulus; variant "smog" is dark for the "their plan" views.
*/

export function Clickable({ id, selected, onSelect, children }: { id: string; selected: string | null; onSelect: (id: string) => void; children: React.ReactNode }) {
  const on = selected === id;
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={partDocs[id]?.title ?? id}
      onClick={() => onSelect(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(id);
        }
      }}
      style={{ cursor: "pointer", outline: "none" }}
      className={on ? "pj-part-on" : "pj-part"}
    >
      {children}
    </g>
  );
}

export type Box = { x: number; y: number; w: number; h: number };

/** "NEW" badge sitting just outside one side of a part, centered on that side (or at one end), arrow pointing into the part. */
export function NewMarker({ box, side = "top", align = "center", label = "NEW", color = "#2e8b57", textColor = "#fff" }: { box: Box; side?: "top" | "bottom" | "left" | "right"; align?: "start" | "center" | "end"; label?: string; color?: string; textColor?: string }) {
  const along = (len: number, base: number) => (align === "start" ? base + 22 : align === "end" ? base + len - 22 : base + len / 2);
  let ax = 0, ay = 0, bx = 0, by = 0;
  if (side === "top") { ax = along(box.w, box.x); ay = box.y; bx = ax; by = ay - 15; }
  if (side === "bottom") { ax = along(box.w, box.x); ay = box.y + box.h; bx = ax; by = ay + 15; }
  if (side === "left") { ay = along(box.h, box.y); ax = box.x; bx = ax - 26; by = ay; }
  if (side === "right") { ay = along(box.h, box.y); ax = box.x + box.w; bx = ax + 26; by = ay; }
  // arrow head pointing into the box at (ax, ay)
  const dir = side === "top" ? [0, 1] : side === "bottom" ? [0, -1] : side === "left" ? [1, 0] : [-1, 0];
  const px = -dir[1], py = dir[0];
  const head = `M${ax},${ay} L${ax - dir[0] * 7 + px * 5},${ay - dir[1] * 7 + py * 5} L${ax - dir[0] * 7 - px * 5},${ay - dir[1] * 7 - py * 5} Z`;
  return (
    <g pointerEvents="none">
      <path d={head} fill={color} />
      <rect x={bx - 18} y={by - 8} width={36} height={16} rx={8} fill={color} stroke="#ffffff" strokeWidth={1.5} />
      <text x={bx} y={by + 3.5} textAnchor="middle" fontSize={9} fontWeight={900} fill={textColor} letterSpacing={0.5}>
        {label}
      </text>
    </g>
  );
}

export function Cloud({ cx, cy, size, variant = "clean", opacity = 1 }: { cx: number; cy: number; size: number; variant?: "clean" | "smog"; opacity?: number }) {
  const fill = variant === "smog" ? "#4a4a4a" : "#dfe7ea";
  const stroke = variant === "smog" ? "#2b2b2b" : "#9aa5ad";
  const s = size;
  // Cumulus: flat base + five lobes
  const d = `M${cx - s},${cy + s * 0.35}
    C${cx - s * 1.2},${cy - s * 0.1} ${cx - s * 0.75},${cy - s * 0.35} ${cx - s * 0.5},${cy - s * 0.15}
    C${cx - s * 0.45},${cy - s * 0.75} ${cx + s * 0.15},${cy - s * 0.8} ${cx + s * 0.25},${cy - s * 0.35}
    C${cx + s * 0.6},${cy - s * 0.6} ${cx + s * 1.05},${cy - s * 0.3} ${cx + s * 0.85},${cy + s * 0.05}
    C${cx + s * 1.25},${cy + s * 0.05} ${cx + s * 1.2},${cy + s * 0.4} ${cx + s * 0.9},${cy + s * 0.35} Z`;
  return (
    <g opacity={opacity}>
      <path d={d} fill={fill} stroke={stroke} strokeWidth={1} />
      {variant === "smog" && (
        <>
          <circle cx={cx - s * 0.3} cy={cy} r={s * 0.18} fill="#6b5a3a" opacity={0.55} />
          <circle cx={cx + s * 0.35} cy={cy - s * 0.15} r={s * 0.15} fill="#6b5a3a" opacity={0.55} />
        </>
      )}
    </g>
  );
}

/** Small ground scene for "their plan": houses, a tree, a deer, under a smog cloud. */
export function Neighborhood({ x, y, w }: { x: number; y: number; w: number }) {
  const n = Math.max(3, Math.floor(w / 26));
  return (
    <g>
      <rect x={x} y={y + 14} width={w} height={4} fill="#b89a6a" />
      {Array.from({ length: n }).map((_, i) => (
        <g key={i}>
          <path d={`M${x + 6 + i * 26},${y + 6} L${x + 13 + i * 26},${y} L${x + 20 + i * 26},${y + 6} V${y + 14} H${x + 6 + i * 26} Z`} fill="#fdb715" stroke="#8a6a00" strokeWidth={0.7} />
        </g>
      ))}
      {/* tree */}
      <rect x={x + w - 22} y={y + 4} width={3} height={10} fill="#6b4a2a" />
      <circle cx={x + w - 20.5} cy={y + 2} r={6} fill="#2e8b57" />
      {/* deer */}
      <g transform={`translate(${x + w - 44} ${y + 4})`}>
        <rect x={0} y={4} width={12} height={5} rx={2} fill="#8a6a3a" />
        <rect x={1} y={9} width={2} height={5} fill="#8a6a3a" />
        <rect x={9} y={9} width={2} height={5} fill="#8a6a3a" />
        <rect x={11} y={1} width={3} height={5} rx={1} fill="#8a6a3a" />
        <path d="M13,1 l2,-3 M13,1 l-1,-3" stroke="#8a6a3a" strokeWidth={0.8} />
      </g>
    </g>
  );
}

export function PartInfo({ id, onClose }: { id: string | null; onClose: () => void }) {
  const [audience] = useAudience();
  const isKid = audience === "kid";

  // Lock body scroll and wire Escape while the sheet is open.
  useEffect(() => {
    if (!id) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [id, onClose]);

  if (!id) return null;
  const doc: PartDoc | undefined = partDocs[id];
  if (!doc) return null;
  const isNew = doc.kind === "new";
  return (
    <>
      <div className="pj-backdrop" onClick={onClose} aria-hidden />
      <div className="pj-sheet" role="dialog" aria-modal="true" aria-label={`About ${doc.title}`}>
        <div className="pj-sheet__grab" />
        <div className="p-4 sm:p-6" style={{ borderTop: `6px solid ${isNew ? "#2e8b57" : "#15768c"}` }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[13px] font-bold uppercase tracking-wide" style={{ color: isNew ? "#2e8b57" : "#15768c" }}>
            {isNew ? "New part · added by the upgrade" : "Already in their plan"}
          </div>
          <h4 className="mt-0.5 font-bold" style={{ fontSize: 20, color: "#003047" }}>{doc.title}</h4>
        </div>
        <button type="button" onClick={onClose} className="rounded-full px-3 py-1.5 text-[15px] font-black" style={{ color: "#6b6b6b", border: "1px solid #d9d9d9" }} aria-label="Close explanation">
          ✕
        </button>
      </div>
      {isKid && (
        <div className="mt-3">
          <TobyMoby chat={partTM[id]} fallback={doc.kid} />
          {doc.photo && (
            <figure className="mx-auto mt-4 max-w-[420px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={doc.photo.src} alt={doc.photo.alt} className="w-full rounded" loading="lazy" decoding="async" />
            </figure>
          )}
        </div>
      )}
      {!isKid && (
      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-5">
        <div className={doc.photo ? "md:col-span-3" : "md:col-span-5"}>
          {!isKid && (
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "#3c3c3c" }}>
            <strong>What it is.</strong> {doc.what}
          </p>
          )}
          {!isKid && (
          <p className="mt-2" style={{ fontSize: 16, lineHeight: 1.6, color: "#3c3c3c" }}>
            <strong>{isNew ? "Why we add it." : "Why it is there."}</strong> {doc.why}
          </p>
          )}
          {!isKid && doc.theyDo && (
            <p className="mt-2" style={{ fontSize: 16, lineHeight: 1.6, color: "#3c3c3c" }}>
              <strong>What their plan does.</strong> {doc.theyDo}
            </p>
          )}
          {!isKid && audience !== "expert" && doc.kid && (
            <p className="mt-2 rounded p-2" style={{ fontSize: 15, lineHeight: 1.55, backgroundColor: "#fff8e6", color: "#3c3c3c" }}>
              <strong>If you are ten:</strong> {doc.kid}
            </p>
          )}
        </div>
        {doc.photo && (
          <figure className="md:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={doc.photo.src} alt={doc.photo.alt} className="w-full rounded" loading="lazy" decoding="async" />
            <figcaption className="mt-1 text-[13px]" style={{ color: "#6b6b6b", lineHeight: 1.4 }}>
              {doc.photo.caption}{" "}
              {doc.photo.href ? (
                <a href={doc.photo.href} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#15768c" }}>
                  {doc.photo.credit} ↗
                </a>
              ) : (
                <span style={{ opacity: 0.85 }}>{doc.photo.credit}</span>
              )}
            </figcaption>
          </figure>
        )}
      </div>
      )}
      {!isKid && <SourceList ids={doc.sources} />}
        </div>
      </div>
    </>
  );
}
