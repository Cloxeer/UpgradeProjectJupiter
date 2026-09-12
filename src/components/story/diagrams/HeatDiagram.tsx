"use client";

import { HEAT_MW, GH_ACRES_PHASE1, GH_PEAK_MW_PER_ACRE, DESAL_PREHEAT_MW, GH_JOBS_PER_ACRE, GH_LBS_PER_ACRE } from "@/data/blueprint";
import { humanHeat, tempRange, temp } from "@/lib/units";
import { Figure, Flow, Tag, DataHall, FanBank, GreenhouseIcon, Person, Truck, GREEN, BLUE, RED, GRAY } from "./Primitives";

// Winter: root heat to about 150 acres of greenhouses and preheat for the water plant; the fans still take the rest.
const gh = GH_ACRES_PHASE1 * GH_PEAK_MW_PER_ACRE;
const reused = gh + DESAL_PREHEAT_MW;
const dry = HEAT_MW - reused;
const jobs = Math.round((GH_ACRES_PHASE1 * GH_JOBS_PER_ACRE) / 100) * 100;
const lbs = GH_ACRES_PHASE1 * GH_LBS_PER_ACRE;

export function HeatDiagram() {
  return (
    <Figure label="How the computers' heat reaches greenhouses and the water plant before the fans" viewBox="0 0 640 330" caption={`Warm water from the chips (${tempRange(45, 65)}) passes one heat exchanger before the dry coolers. On a cold night about ${Math.round(gh)} MW warms the roots of ${GH_ACRES_PHASE1} acres of greenhouses and ${DESAL_PREHEAT_MW} MW preheats the water plant; the fans still reject about ${Math.round(dry).toLocaleString()} MW. Summer heat is not used.`}>
      <DataHall x={10} y={100} label="DATA HALL" />
      <Tag x={12} y={246} text={`chips heat water to ${tempRange(45, 65)}`} anchor="start" size={8} />

      <Flow d="M150,140 H220" color={RED} width={9} dur={1.6} />
      <Flow d="M220,190 H150" color={BLUE} width={7} dur={1.6} />
      <Tag x={185} y={128} text={`hot, about ${temp(60)}`} anchor="middle" size={8} color={RED} />
      <Tag x={185} y={210} text={`cool, about ${temp(35)}`} anchor="middle" size={8} color={BLUE} />
      <rect x={220} y={110} width={70} height={110} rx={4} fill={RED} />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={227 + i * 10} y={120} width={5} height={90} fill="#ffffff" fillOpacity={0.75} />)}
      <Tag x={255} y={104} text="HEAT EXCHANGER" anchor="middle" bold color={RED} size={9} />

      <Flow d="M290,125 C340,125 350,50 400,50 H428" color={GREEN} width={5} dur={2.2} />
      {[0, 1, 2].map((i) => <GreenhouseIcon key={i} x={428 + i * 52} y={14} w={49} h={50} warm />)}
      <Tag x={535} y={8} text={`GREENHOUSES, ${GH_ACRES_PHASE1} acres by year 10`} anchor="middle" bold color="#1f5f3a" size={9} />
      <Tag x={535} y={80} text={`warm water heats roots, ${Math.round(gh)} MW, about ${humanHeat(gh).furnaces.toLocaleString()} furnaces`} anchor="middle" size={8} color="#1f5f3a" />
      {Array.from({ length: 10 }).map((_, i) => <Person key={i} x={598 + (i % 5) * 9 - 28} y={92 + Math.floor(i / 5) * 20} />)}
      <Tag x={470} y={104} text={`about ${jobs.toLocaleString()} jobs`} anchor="middle" size={8} color="#003047" bold />
      <Tag x={470} y={118} text={`up to ${(lbs / 1e6).toFixed(0)}M lbs of food a year`} anchor="middle" size={8} color="#1f5f3a" />
      <Truck x={600} y={126} />

      <Flow d="M290,165 H428" color={BLUE} width={5} dur={2.6} />
      <rect x={428} y={148} width={214} height={36} rx={4} fill={BLUE} />
      <text x={535} y={163} textAnchor="middle" fontSize={10} fontWeight={800} fill="#fff">WATER PLANT</text>
      <text x={535} y={177} textAnchor="middle" fontSize={8.5} fill="#e6f0ff">{`preheats the salty feed, ${DESAL_PREHEAT_MW} MW`}</text>

      <Flow d="M290,205 C340,205 350,260 400,260 H428" color={GRAY} width={14} dur={2} />
      <rect x={428} y={224} width={214} height={86} rx={4} fill={GRAY} />
      <FanBank x={436} y={232} w={198} h={70} dur={1.2} />
      <Tag x={535} y={212} text={`DRY COOLERS, ${Math.round(dry).toLocaleString()} MW still to the air`} anchor="middle" bold color="#3f5a63" size={9} />
    </Figure>
  );
}
