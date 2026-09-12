"use client";

import { NMSU_RECOVERY, CRRUA_2027_MGD } from "@/data/blueprint";
import { GAL_PER_HOME_DAY } from "@/lib/units";
import { Figure, Flow, Tag, House, GREEN, BLUE, RED } from "./Primitives";

// The 5 MGD plant NMSU designed: brackish wells, preheat, filters, reverse osmosis, the towns' pipes; brine injected below the aquifer.
const MGD = 5;
const feed = MGD / NMSU_RECOVERY;
const brine = feed - MGD;
const households = (MGD * 1_000_000) / GAL_PER_HOME_DAY;

export function WaterDiagram() {
  return (
    <Figure label="How brackish groundwater becomes five million gallons a day of clean water" viewBox="0 0 640 340" caption={`Three brackish wells feed ${feed.toFixed(1)} million gallons a day through a preheater, filters and reverse osmosis; ${MGD} come out clean for the towns' pipes, ${brine.toFixed(1)} of brine go to deep injection wells below the aquifer. Recharge of the towns' reclaimed water begins in year 5 under a state permit.`}>
      <rect x={10} y={200} width={130} height={130} fill="#e3cfa8" />
      <rect x={10} y={240} width={130} height={90} fill="#7a9bb5" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => <circle key={i} cx={18 + ((i * 13) % 115)} cy={250 + ((i * 11) % 70)} r={2} fill="#ffffff" />)}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={22 + i * 24} y={160} width={10} height={90} fill="#5a5a5a" />
          <rect x={18 + i * 24} y={154} width={18} height={8} fill="#3c3c3c" />
        </g>
      ))}
      <Tag x={75} y={146} text="BRACKISH WELLS" anchor="middle" bold size={9} color="#3c3c3c" />
      <Tag x={75} y={324} text="salty, 1,000-10,000 mg/L, looks clear" anchor="middle" size={8} bg="#e3cfa8" />
      <Flow d="M75,154 V60 H140" color="#7a9bb5" width={10} dur={2.6} />
      <Tag x={100} y={54} text={`${feed.toFixed(1)} MGD salty`} anchor="middle" size={8.5} color="#4a6a80" />

      <rect x={140} y={35} width={95} height={50} rx={4} fill={RED} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={i} x={149 + i * 10.5} y={42} width={5} height={36} fill="#ffffff" fillOpacity={0.75} />)}
      <Tag x={187} y={96} text="PREHEAT from the computers, +15 °C" anchor="middle" bold color={RED} size={7.5} />
      <Flow d="M235,60 H250" color="#7a9bb5" width={7} dur={1.2} />

      <rect x={250} y={35} width={95} height={50} rx={4} fill="#8a949b" />
      <text x={297} y={54} textAnchor="middle" fontSize={10} fontWeight={800} fill="#fff">FILTERS</text>
      <text x={297} y={68} textAnchor="middle" fontSize={8} fill="#f0f0f0">sand, cartridges</text>
      <Flow d="M345,60 H400" color="#7a9bb5" width={7} dur={1.2} />

      <rect x={400} y={18} width={230} height={84} rx={6} fill={BLUE} />
      {[0, 1, 2, 3, 4].map((i) => {
        const w = 39;
        const x = 410 + i * (w + 3);
        return (
          <g key={i}>
            <rect x={x} y={30} width={w} height={60} rx={2} fill="#ffffff" fillOpacity={0.9} />
            <rect x={x + w / 2 - 1} y={32} width={2} height={56} fill={BLUE} />
            <circle cx={x + w * 0.28} cy={45 + (i % 3) * 12} r={1.6} fill="#5a5a5a" />
            <circle cx={x + w * 0.74} cy={52 + (i % 2) * 14} r={1.2} fill="#7fb7ff" />
          </g>
        );
      })}
      <Tag x={515} y={12} text="REVERSE OSMOSIS, five 1 MGD skids, about 800 psi" anchor="middle" bold size={9} color="#1f5f3a" />
      <Tag x={515} y={116} text="salt stays on one side of each membrane; water squeezes through" anchor="middle" size={7.5} />

      <Flow d="M630,60 H636 V150 H560" color={BLUE} width={8} dur={2.4} />
      <rect x={470} y={130} width={90} height={40} rx={4} fill="#dbe9f7" stroke={BLUE} strokeWidth={1.2} />
      <rect x={470} y={150} width={90} height={20} rx={2} fill={BLUE} />
      <Tag x={515} y={190} text={`TREATED WATER, ${MGD} MGD (${Math.round(NMSU_RECOVERY * 100)}% of the feed)`} anchor="middle" bold size={8.5} color="#1f5f3a" />
      <Flow d="M470,150 H370" color={BLUE} width={8} dur={2} />
      <rect x={250} y={132} width={120} height={36} rx={4} fill={GREEN} />
      <text x={310} y={147} textAnchor="middle" fontSize={9.5} fontWeight={800} fill="#fff">TO THE TOWNS&apos; PIPES</text>
      <text x={310} y={160} textAnchor="middle" fontSize={7.5} fill="#e8f8ee">replaces fresh-well pumping</text>
      {[0, 1, 2, 3, 4].map((i) => <House key={i} x={250 + i * 16} y={200} />)}
      <Flow d="M310,168 V196" color={GREEN} width={3} dur={2} r={2.4} />
      <Tag x={270} y={230} text={`${Math.round(households / 1000)}k homes' daily water, ${Math.round((MGD / CRRUA_2027_MGD) * 100)}% of the 2027 need`} anchor="middle" size={8} color="#1f5f3a" bold />
      <Tag x={270} y={244} text="used water goes back to the treatment plant, as today" anchor="middle" size={7.5} color="#6b6b6b" />
      <Tag x={270} y={258} text="reclaimed water recharged, about 2 MGD from year 5" anchor="middle" size={7.5} color="#6b6b6b" />

      <Flow d="M420,102 V215 H520 V262" color="#8e3b2f" width={4.5} dur={3} />
      <rect x={440} y={262} width={190} height={20} fill="#a9c4d8" />
      <rect x={440} y={282} width={190} height={14} fill="#5a5a5a" />
      <rect x={440} y={296} width={190} height={44} fill="#7a6142" />
      <rect x={514} y={258} width={12} height={70} fill="#5a5a5a" />
      <Tag x={535} y={256} text={`${brine.toFixed(1)} MGD brine, injected about 20 miles away`} anchor="middle" bold size={8.5} color="#8e3b2f" />
      <Tag x={480} y={276} text="brackish aquifer" anchor="middle" size={7.5} bg="#a9c4d8" />
      <Tag x={480} y={293} text="confining rock" anchor="middle" size={7.5} color="#fff" bg="#5a5a5a" />
      <Tag x={535} y={334} text="sealed 3,700-4,000 ft down; it does not loop back" anchor="middle" size={7.5} color="#fff" bg="#7a6142" />
    </Figure>
  );
}
