"use client";

import { IT_LOAD_MW } from "@/data/blueprint";
import { Figure, Flow, Tag, DataHall, GREEN, BLUE, RED, NAVY } from "./Primitives";

// Where an average hour's electricity comes from, at the target settings: geothermal 150 MW (90% CF),
// delivered wind and solar 500 MW (40% CF), rooftop solar about 25 MW peak (24% CF). The rest is gas.
const GEO_MW = 150;
const PPA_MW = 500;
const ROOF_PEAK_MW = 25;
const geoAvg = GEO_MW * 0.9;
const ppaAvg = PPA_MW * 0.4;
const roofAvg = ROOF_PEAK_MW * 0.24;
const cleanAvg = geoAvg + ppaAvg + roofAvg;
const gasShare = Math.max(0, 1 - cleanAvg / IT_LOAD_MW);
const gasHours = Math.round(8760 * gasShare);

const BAR_X = 20;
const BAR_W = 600;
const parts = [
  { label: "gas fuel cells", value: IT_LOAD_MW * gasShare, color: RED },
  { label: "geothermal", value: geoAvg, color: GREEN },
  { label: "wind and solar by wire", value: ppaAvg, color: BLUE },
  { label: "rooftop solar", value: roofAvg, color: "#e07b00" },
];
// Segment geometry computed once, outside render.
const segments = parts.reduce<{ label: string; color: string; x: number; w: number; value: number }[]>((acc, p) => {
  const x = acc.length ? acc[acc.length - 1].x + acc[acc.length - 1].w : BAR_X;
  const w = (p.value / IT_LOAD_MW) * BAR_W;
  acc.push({ label: p.label, color: p.color, x, w, value: p.value });
  return acc;
}, []);

export function PowerDiagram() {
  return (
    <Figure label="Where the campus's electricity comes from on an average hour, at the target settings" viewBox="0 0 640 300" caption={`At the targets (150 MW of geothermal, 500 MW of delivered wind and solar, rooftop solar on every hall) about ${Math.round((1 - gasShare) * 100)}% of the year's energy is clean on average: ${gasHours.toLocaleString()} of 8,760 full-load hours still run on gas. The meter that matters is the share of gas, falling each year, in public.`}>
      <rect x={20} y={20} width={200} height={50} rx={4} fill={GREEN} />
      <text x={120} y={40} textAnchor="middle" fontSize={11} fontWeight={900} fill="#fff">GEOTHERMAL WELLS</text>
      <text x={120} y={57} textAnchor="middle" fontSize={9} fill="#e8f8ee">{`${GEO_MW} MW, hot rock under the rift`}</text>
      <rect x={230} y={20} width={210} height={50} rx={4} fill={BLUE} />
      <text x={335} y={40} textAnchor="middle" fontSize={11} fontWeight={900} fill="#fff">WIND + SOLAR ON THE WIRE</text>
      <text x={335} y={57} textAnchor="middle" fontSize={9} fill="#e6f0ff">{`${PPA_MW} MW contracted, needs new transmission`}</text>
      <rect x={450} y={20} width={170} height={50} rx={4} fill="#1d3557" />
      <text x={535} y={40} textAnchor="middle" fontSize={11} fontWeight={900} fill="#fff">ROOFTOP SOLAR</text>
      <text x={535} y={57} textAnchor="middle" fontSize={9} fill="#e9f0ff">{`${ROOF_PEAK_MW} MW peak, the small slice`}</text>

      <Flow d="M120,70 V120" color={GREEN} width={5} dur={2} />
      <Flow d="M335,70 V120" color={BLUE} width={5} dur={2} />
      <Flow d="M535,70 V120" color="#e07b00" width={3} dur={2} />
      <rect x={20} y={90} width={140} height={50} rx={4} fill="#8e3b2f" />
      <text x={90} y={110} textAnchor="middle" fontSize={11} fontWeight={900} fill="#fff">GAS FUEL CELLS</text>
      <text x={90} y={127} textAnchor="middle" fontSize={9} fill="#ffe0da">run less each year</text>
      <Flow d="M160,115 H250" color={RED} width={9} dur={1.6} />

      <DataHall x={250} y={95} w={140} h={60} label="DATA HALLS" />

      <Tag x={20} y={200} text="an average hour, where the electricity comes from" anchor="start" size={9} bold color={NAVY} />
      {segments.map((s) => (
        <rect key={s.label} x={s.x} y={206} width={s.w} height={28} fill={s.color} />
      ))}
      {segments.map((s) => (s.w > 40 ? <Tag key={`${s.label}-t`} x={s.x + s.w / 2} y={252} text={`${s.label}, ${Math.round(s.value)} MW`} anchor="middle" size={8} color={s.color} bold /> : null))}
      <Tag x={20} y={282} text={`${gasHours.toLocaleString()} of 8,760 gas hours, a target, on a public meter`} anchor="start" size={9} color={RED} bold />
    </Figure>
  );
}
