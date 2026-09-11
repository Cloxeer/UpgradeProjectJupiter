import { features, topRoads, solarRoofIds, agrivoltaicIds, FENCE_OURS, CANVAS, type Feature } from "@/data/blueprint";

// The upgraded campus in one drawing: their buildings where the render puts them, the additions inside the
// extended fence. Drone view, north up, labeled on the drawing. No clicks; nothing to operate.

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

function outline(f: Feature): string {
  const { x, y, w, h } = f.rect;
  const n = f.notch;
  if (!n) return `${x},${y} ${x + w},${y} ${x + w},${y + h} ${x},${y + h}`;
  if (n.corner === "ne") return `${x},${y} ${x + w - n.w},${y} ${x + w - n.w},${y + n.h} ${x + w},${y + n.h} ${x + w},${y + h} ${x},${y + h}`;
  if (n.corner === "nw") return `${x + n.w},${y} ${x + w},${y} ${x + w},${y + h} ${x},${y + h} ${x},${y + n.h} ${x + n.w},${y + n.h}`;
  if (n.corner === "se") return `${x},${y} ${x + w},${y} ${x + w},${y + h - n.h} ${x + w - n.w},${y + h - n.h} ${x + w - n.w},${y + h} ${x},${y + h}`;
  return `${x},${y} ${x + w},${y} ${x + w},${y + h} ${x + n.w},${y + h} ${x + n.w},${y + h - n.h} ${x},${y + h - n.h}`;
}

function Label({ f, small = false }: { f: Feature; small?: boolean }) {
  const cx = f.rect.x + f.rect.w / 2;
  const cy = f.rect.y + f.rect.h / 2;
  const vertical = f.rect.h > f.rect.w * 2.2 && f.rect.w < 120;
  const fs = small ? 9 : f.rect.w < 80 && !vertical ? 9 : 11;
  return (
    <g pointerEvents="none" transform={vertical ? `rotate(-90 ${cx} ${cy})` : undefined}>
      <rect x={cx - (f.label.length * fs * 0.62) / 2 - 5} y={cy - fs - (f.sub ? 6 : 0)} width={f.label.length * fs * 0.62 + 10} height={fs + 8 + (f.sub ? 10 : 0)} rx={2} fill="#ffffff" fillOpacity={0.92} />
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

function Fans({ r }: { r: Feature["rect"] }) {
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
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) items.push(<rect key={`${i}-${j}`} x={r.x + 6 + i * 16} y={r.y + 8 + j * 30} width={7} height={13} rx={1.5} fill={["#d9534f", "#ffffff", "#5b6770", "#c7c7c7", "#2a4a6a"][(i + j) % 5]} stroke="#555" strokeWidth={0.4} />);
  return <>{items}</>;
}

function Bays({ r }: { r: Feature["rect"] }) {
  const items: React.ReactNode[] = [];
  const n = Math.floor(r.w / 22);
  for (let i = 0; i < n; i++) items.push(<rect key={i} x={r.x + 6 + i * 22} y={r.y + 6} width={14} height={r.h - 12} fill="#a9dcb6" stroke="#1f5f3a" strokeWidth={0.8} />);
  return <>{items}</>;
}

export function SiteMap() {
  return (
    <svg viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`} className="w-full rounded" style={{ backgroundColor: "#e8d9b8", aspectRatio: `${CANVAS.w} / ${CANVAS.h}` }} role="img" aria-label="The upgraded campus from above: their buildings where the render puts them, the additions inside the extended fence">
      <defs>
        <pattern id="pj-solar" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#1d3557" />
          <path d="M0 0H8M0 4H8M4 0V8" stroke="#6ea8ff" strokeWidth="0.6" />
        </pattern>
        <pattern id="pj-desert" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="10" r="1.6" fill="#8f7a4a" />
          <circle cx="28" cy="30" r="1.4" fill="#8f7a4a" />
          <circle cx="20" cy="22" r="1" fill="#a3925f" />
        </pattern>
      </defs>
      <rect x={0} y={0} width={CANVAS.w} height={CANVAS.h} fill="url(#pj-desert)" />
      <polygon points={FENCE_OURS} fill="#dccaa3" fillOpacity={0.5} />
      {topRoads.theirs.map((r) => (
        <polyline key={r.id} points={r.points} fill="none" stroke="#5a5a5a" strokeWidth={14} strokeLinejoin="round" strokeLinecap="round" />
      ))}
      {topRoads.theirs.map((r) => (
        <polyline key={`${r.id}-c`} points={r.points} fill="none" stroke="#fdb715" strokeWidth={1} strokeDasharray="8 8" />
      ))}
      {topRoads.ours.map((r) => (
        <g key={r.id}>
          <polyline points={r.points} fill="none" stroke="#5a5a5a" strokeWidth={14} strokeLinecap="round" />
          <text x={300} y={898} fontSize={9} fontWeight={800} fill="#c0392b">
            {r.label}
          </text>
        </g>
      ))}
      {Array.from({ length: 15 }).map((_, i) => (
        <g key={`w${i}`}>
          <circle cx={18} cy={230 + i * 20} r={3.5} fill="#5d8a4a" />
          <circle cx={44} cy={230 + i * 20} r={3.5} fill="#5d8a4a" />
        </g>
      ))}
      {Array.from({ length: 44 }).map((_, i) => (
        <circle key={`r${i}`} cx={250 + i * 22} cy={203} r={3.5} fill="#5d8a4a" />
      ))}
      {features.map((f) => {
        const isNew = f.plan === "ours";
        const base = isNew ? (newColors[f.id] ?? "#2e8b57") : fill[f.kind];
        const ghost = f.kind === "ghost";
        return (
          <g key={f.id} transform={f.rotate ? `rotate(${f.rotate} ${f.rect.x + f.rect.w / 2} ${f.rect.y + f.rect.h / 2})` : undefined}>
            <polygon points={outline(f)} fill={base} fillOpacity={ghost ? 0.25 : f.kind === "hall" || f.kind === "building" ? 1 : 0.9} stroke={ghost ? "#8e3b2f" : isNew ? "#ffffff" : "#3c3c3c"} strokeWidth={1.2} strokeDasharray={ghost ? "6 4" : undefined} />
            {f.kind === "hall" && !f.notch && <rect x={f.rect.x + 4} y={f.rect.y + 4} width={f.rect.w - 8} height={f.rect.h - 8} fill="none" stroke="#c9c2b2" strokeWidth={1} />}
            {f.kind === "coolers" && <Fans r={f.rect} />}
            {f.id === "chillers" && <Tanks r={f.rect} />}
            {f.id === "parking" && <Cars r={f.rect} />}
            {f.id === "greenhouse" && <Bays r={f.rect} />}
            {solarRoofIds.includes(f.id) && <polygon points={outline(f)} fill="url(#pj-solar)" fillOpacity={0.85} stroke="#ffffff" strokeWidth={6} pointerEvents="none" />}
            {agrivoltaicIds.includes(f.id) && <rect x={f.rect.x + 6} y={f.rect.y + 6} width={f.rect.w - 12} height={(f.rect.h - 12) * 0.25} fill="url(#pj-solar)" fillOpacity={0.7} pointerEvents="none" />}
            <Label f={f} small={f.kind === "gate"} />
          </g>
        );
      })}
      <polygon points={FENCE_OURS} fill="none" stroke="#3c3c3c" strokeWidth={2.5} strokeDasharray="10 5" pointerEvents="none" />
      <g pointerEvents="none">
        <rect x={600} y={787} width={112} height={18} rx={2} fill="#ffffff" fillOpacity={0.92} />
        <text x={656} y={800} textAnchor="middle" fontSize={10} fontWeight={900} fill="#003047">
          SECURITY FENCE
        </text>
      </g>
      <g pointerEvents="none">
        <polyline points="770,520 770,640" fill="none" stroke="#c0392b" strokeWidth={6} strokeLinecap="round" />
        <text x={776} y={600} fontSize={9} fontWeight={800} fill="#c0392b">warm water</text>
        <polyline points="785,500 1000,500 1000,640" fill="none" stroke="#c0392b" strokeWidth={3} strokeDasharray="6 4" />
        <text x={880} y={495} fontSize={8} fontWeight={800} fill="#c0392b">preheat</text>
        <polyline points="304,55 304,62 258,62 258,600 275,640" fill="none" stroke="#003047" strokeWidth={2} strokeDasharray="4 3" />
        <text x={252} y={300} fontSize={8} fontWeight={800} fill="#003047" transform="rotate(-90 252 300)">CO₂ to greenhouses</text>
      </g>
      <text x={22} y={10} fontSize={9} fontWeight={800} fill="#003047">
        DRONE VIEW FROM THEIR AUG. 27, 2026 RENDER. NORTH UP. NOT TO SURVEY SCALE.
      </text>
      <text x={1194} y={797} textAnchor="end" fontSize={9} fontWeight={800} fill="#003047">
        THE RENDER SHOWS THE 400-ACRE FIRST PHASE; THE 819-ACRE SITE EXTENDS BEYOND THIS VIEW
      </text>
    </svg>
  );
}
