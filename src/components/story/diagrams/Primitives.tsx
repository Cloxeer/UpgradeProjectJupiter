"use client";

import { useInView } from "@/hooks/useInView";

// Shared drawing parts for the static diagrams. Every moving line is ONE dashed path animated by CSS
// (stroke-dashoffset); every fan is a static disc plus one blade group spun by a CSS transform.
// Compositor-only, no per-frame JavaScript. A figure pauses off screen.

export function Figure({ label, viewBox, children, caption }: { label: string; viewBox: string; children: React.ReactNode; caption?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <figure ref={ref} className={`pj-anim m-0 ${inView ? "" : "pj-paused"}`}>
      <div className="pj-scroll">
        <svg viewBox={viewBox} className="pj-diagram w-full" role="img" aria-label={label}>
          {children}
        </svg>
      </div>
      {caption && (
        <figcaption className="mt-3 text-[15px]" style={{ color: "#5d6a70", lineHeight: 1.5 }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export const GREEN = "#2e8b57";
export const NAVY = "#003047";
export const BLUE = "#1f7ae0";
export const RED = "#c0392b";
export const GRAY = "#6f8f9a";

export function Flow({ d, color, width = 6, dur = 3, r = 3.2, active = true }: { d: string; color: string; width?: number; dur?: number; r?: number; active?: boolean }) {
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" opacity={active ? 0.35 : 0.15} strokeDasharray={active ? undefined : "4 6"} />
      {active && <path d={d} fill="none" stroke={color} strokeWidth={r * 2} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0.1 11.9" className="pj-dots" style={{ animationDuration: `${dur}s` }} />}
    </g>
  );
}

export function Tag({ x, y, text, anchor = "start", size = 9.5, color = "#3c3c3c", bold = false, bg = "#ffffff" }: { x: number; y: number; text: string; anchor?: "start" | "middle" | "end"; size?: number; color?: string; bold?: boolean; bg?: string }) {
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

export function Fan({ cx, cy, dur }: { cx: number; cy: number; dur: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={7} fill="#dfe7ea" stroke="#3f5a63" strokeWidth={0.8} />
      {/* The origin is in viewBox units, so the box must be the view box; the global .pj-fan rule says fill-box. */}
      <g className="pj-fan" style={{ transformBox: "view-box", transformOrigin: `${cx}px ${cy}px`, animationDuration: `${dur}s` }}>
        <g transform={`translate(${cx} ${cy})`}>
          {FAN_BLADES.map((d) => (
            <path key={d} d={d} fill="#3f5a63" />
          ))}
        </g>
      </g>
    </g>
  );
}

export function FanBank({ x, y, w, h, dur, spacing = 24 }: { x: number; y: number; w: number; h: number; dur: number; spacing?: number }) {
  const cols = Math.floor(w / spacing);
  const rows = Math.floor(h / spacing);
  const items: React.ReactNode[] = [];
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) items.push(<Fan key={`${i}-${j}`} cx={x + spacing / 2 + i * spacing} cy={y + spacing / 2 + j * spacing} dur={dur} />);
  return <>{items}</>;
}

export function GreenhouseIcon({ x, y, w, h, warm }: { x: number; y: number; w: number; h: number; warm: boolean }) {
  return (
    <g>
      <path d={`M${x},${y + h} L${x},${y + h * 0.45} L${x + w / 2},${y} L${x + w},${y + h * 0.45} L${x + w},${y + h} Z`} fill={warm ? "#d7f0dc" : "#e6f2ff"} stroke="#1f5f3a" strokeWidth={1.2} />
      <line x1={x} y1={y + h * 0.45} x2={x + w} y2={y + h * 0.45} stroke="#1f5f3a" strokeWidth={0.6} />
      {[0.25, 0.5, 0.75].map((f) => (
        <g key={f}>
          <line x1={x + w * f} y1={y + h - 3} x2={x + w * f} y2={y + h * 0.62} stroke={GREEN} strokeWidth={2} />
          <circle cx={x + w * f} cy={y + h * 0.6} r={3} fill="#d9534f" />
        </g>
      ))}
      <path d={`M${x + 3},${y + h - 3} H${x + w - 3}`} stroke={warm ? RED : BLUE} strokeWidth={2.5} strokeDasharray="3 3" />
    </g>
  );
}

export function Person({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={3} fill={NAVY} />
      <path d={`M${x},${y + 3} V${y + 11} M${x - 4},${y + 6} H${x + 4} M${x},${y + 11} L${x - 3},${y + 17} M${x},${y + 11} L${x + 3},${y + 17}`} stroke={NAVY} strokeWidth={1.6} fill="none" strokeLinecap="round" />
    </g>
  );
}

export function House({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x},${y + 6} L${x + 6},${y} L${x + 12},${y + 6} V${y + 13} H${x} Z`} fill="#fdb715" stroke="#8a6a00" strokeWidth={0.8} />
      <rect x={x + 4.5} y={y + 8} width={3} height={5} fill="#8a6a00" />
    </g>
  );
}

export function Truck({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={16} height={9} rx={1} fill={GREEN} />
      <rect x={x + 16} y={y + 3} width={6} height={6} rx={1} fill="#1f5f3a" />
      <circle cx={x + 4} cy={y + 10} r={2} fill="#3c3c3c" />
      <circle cx={x + 18} cy={y + 10} r={2} fill="#3c3c3c" />
    </g>
  );
}

export function DataHall({ x, y, w = 140, h = 130, label = "DATA HALL" }: { x: number; y: number; w?: number; h?: number; label?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={NAVY} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={x + 12 + i * 32} y={y + 18} width={22} height={h - 50} rx={2} fill="#0b4a66" stroke="#6ea8ff" strokeWidth={0.8} />
          {[0, 1, 2, 3, 4, 5].map((j) => (
            <rect key={j} x={x + 15 + i * 32} y={y + 22 + j * 12} width={16} height={7} fill={j % 2 ? "#1d7bb8" : "#2ba0e0"} className="pj-blink" style={{ animationDelay: `${((i + j) % 4) * 0.3}s` }} />
          ))}
        </g>
      ))}
      <Tag x={x + w / 2} y={y - 6} text={label} anchor="middle" bold color={NAVY} />
    </g>
  );
}

export function Cloud({ cx, cy, size, smog = false, opacity = 0.8 }: { cx: number; cy: number; size: number; smog?: boolean; opacity?: number }) {
  const fill = smog ? "#8a8a8a" : "#d9e3e8";
  const s = size / 20;
  return (
    <g opacity={opacity}>
      <circle cx={cx - 10 * s} cy={cy + 2 * s} r={9 * s} fill={fill} />
      <circle cx={cx} cy={cy - 4 * s} r={12 * s} fill={fill} />
      <circle cx={cx + 11 * s} cy={cy + 3 * s} r={9 * s} fill={fill} />
      <rect x={cx - 16 * s} y={cy + 2 * s} width={32 * s} height={9 * s} fill={fill} />
    </g>
  );
}

/** Ground cross-section: soil, drinking-water aquifer, cap rock, deep storage. */
export function Underground({ x, y, w, h, fill, label, sub }: { x: number; y: number; w: number; h: number; fill: number; label: string; sub: string }) {
  const layer = h / 4;
  return (
    <g>
      <rect x={x} y={y} width={w} height={layer} fill="#e3cfa8" />
      <rect x={x} y={y + layer} width={w} height={layer} fill="#a9c4d8" />
      <rect x={x} y={y + 2 * layer} width={w} height={layer * 0.6} fill="#5a5a5a" />
      <rect x={x} y={y + 2.6 * layer} width={w} height={h - 2.6 * layer} fill="#7a6142" />
      <rect x={x + 4} y={y + 2.7 * layer} width={(w - 8) * fill} height={h - 2.8 * layer} fill={NAVY} opacity={0.85} />
      <Tag x={x + w / 2} y={y + layer * 0.65} text="soil" anchor="middle" size={8} bg="#e3cfa8" />
      <Tag x={x + w / 2} y={y + layer * 1.65} text="drinking-water aquifer (shallow)" anchor="middle" size={8} bg="#a9c4d8" />
      <Tag x={x + w / 2} y={y + layer * 2.42} text="cap rock: shale or salt, gas cannot pass" anchor="middle" size={8} color="#fff" bg="#5a5a5a" />
      <Tag x={x + w / 2} y={y + h - 6} text={label} anchor="middle" size={8.5} bold color="#fff" bg="#7a6142" />
      <Tag x={x + w / 2} y={y - 6} text={sub} anchor="middle" size={8.5} />
    </g>
  );
}
