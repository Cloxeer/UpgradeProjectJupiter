"use client";

import { GHG_PERMIT_TPY } from "@/data/netloss";
import { Figure, Flow, Tag, Cloud, Underground, GREEN, NAVY, BLUE } from "./Primitives";

// The carbon path at the 90-95% target: dryer, capture, a little used first, the rest by pipeline to storage.
const RATE = 0.9;
const USE_SHARE = 0.01;
const captured = GHG_PERMIT_TPY * RATE;
const used = captured * USE_SHARE;
const stored = captured - used;
const left = GHG_PERMIT_TPY * (1 - RATE);

export function CarbonDiagram() {
  return (
    <Figure label="How the fuel-cell exhaust is dried, captured, used and stored" viewBox="0 0 640 360" caption="Gas in, electricity out; the exhaust is dried to about 95% CO₂, captured at the target, a little fed to greenhouses and concrete, the rest piped to storage under cap rock. The cloud is the 5-10% not caught.">
      <rect x={4} y={136} width={64} height={30} rx={4} fill="#5c4a3a" />
      <text x={36} y={149} textAnchor="middle" fontSize={8.5} fontWeight={800} fill="#fff">GAS</text>
      <text x={36} y={160} textAnchor="middle" fontSize={7.5} fill="#f2e6d8">up to 400 MMcf a day</text>
      <Flow d="M68,150 H80" color="#5c4a3a" width={9} dur={2.4} />

      <rect x={80} y={95} width={110} height={110} rx={4} fill="#8e3b2f" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x={90} y={105 + i * 16} width={90} height={5} fill="#f2c9a0" />
          <rect x={90} y={110 + i * 16} width={90} height={5} fill="#e9e4d8" />
          <rect x={90} y={115 + i * 16} width={90} height={4} fill="#2b2b2b" />
        </g>
      ))}
      <Tag x={135} y={89} text="FUEL CELL" anchor="middle" bold size={9} color="#8e3b2f" />
      <Tag x={125} y={219} text="ceramic layers, no flame" anchor="middle" size={7.5} />

      <Flow d="M100,205 V300 H250" color="#fdb715" width={4} dur={1.2} r={2.6} />
      <rect x={250} y={282} width={100} height={36} rx={4} fill={NAVY} />
      <text x={300} y={304} textAnchor="middle" fontSize={10} fontWeight={800} fill="#fff">DATA HALLS</text>
      <Tag x={192} y={292} text="electricity" anchor="middle" size={8.5} color="#8a6a00" />

      <Flow d="M190,125 H250" color="#8a949b" width={11} dur={1.8} />
      <Tag x={220} y={112} text="exhaust" anchor="middle" bold size={9} color="#4f6b7a" />
      <rect x={250} y={100} width={70} height={50} rx={4} fill="#4f6b7a" />
      <text x={285} y={121} textAnchor="middle" fontSize={9.5} fontWeight={800} fill="#fff">DRYER</text>
      <text x={285} y={135} textAnchor="middle" fontSize={8.5} fill="#e3eef3">takes water out</text>
      <Flow d="M285,150 V214" color={BLUE} width={3} dur={1.5} r={2.4} />
      <rect x={185} y={214} width={200} height={28} rx={3} fill="#dbe9f7" stroke={BLUE} strokeWidth={1} />
      <text x={285} y={226} textAnchor="middle" fontSize={8} fontWeight={800} fill="#1f5f3a">clean water from the dryer</text>
      <text x={285} y={237} textAnchor="middle" fontSize={7.5} fill="#1f5f3a">tops off cooling loops, waters greenhouses</text>

      <Flow d="M320,125 H390" color="#3c3c3c" width={11} dur={1.8} />
      <Tag x={355} y={112} text="about 95% CO₂" anchor="middle" size={8} bold />
      <rect x={390} y={90} width={90} height={70} rx={4} fill={GREEN} />
      <text x={435} y={115} textAnchor="middle" fontSize={10} fontWeight={800} fill="#fff">CAPTURE +</text>
      <text x={435} y={129} textAnchor="middle" fontSize={10} fontWeight={800} fill="#fff">COMPRESS</text>
      <text x={435} y={146} textAnchor="middle" fontSize={8.5} fill="#e8f8ee">metered at the stack</text>
      <Tag x={435} y={178} text="target 90-95%, from year 5" anchor="middle" bold size={9} color={GREEN} />

      <Flow d="M480,105 C520,105 545,70 575,50" color="#9aa5ad" width={2.5} dur={2.2} />
      <Cloud cx={590} cy={40} size={11} opacity={0.5} />
      <Tag x={636} y={70} text={`not caught: ${(left / 1e6).toFixed(1)} Mt a year`} anchor="end" size={7.5} color="#6b6b6b" />

      <Flow d="M480,125 H520" color={GREEN} width={2} dur={2.4} r={2.4} />
      <rect x={520} y={104} width={116} height={42} rx={4} fill={GREEN} />
      <text x={578} y={119} textAnchor="middle" fontSize={8.5} fontWeight={800} fill="#fff">USED FIRST</text>
      <text x={578} y={130} textAnchor="middle" fontSize={7.5} fill="#e8f8ee">greenhouses, concrete</text>
      <text x={578} y={141} textAnchor="middle" fontSize={7.5} fontWeight={800} fill="#fff">{`${(used / 1e6).toFixed(2)} Mt a year`}</text>

      <Flow d="M435,160 V195 H560 V245" color={NAVY} width={11} dur={2.6} />
      <Underground x={470} y={230} w={165} h={126} fill={RATE} label={`stored: ${(stored / 1e6).toFixed(1)} Mt a year, by pipeline`} sub="about 200 miles to Texas storage" />
    </Figure>
  );
}
