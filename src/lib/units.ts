// Plain-language unit helpers. Every conversion here is cited on the Sources page.
import { BOND_M, PHASE1_M } from "@/data/blueprint";

/** "60 °C / 140 °F" */
export function temp(c: number): string {
  const f = Math.round((c * 9) / 5 + 32);
  return `${Math.round(c)} °C / ${f} °F`;
}

/** "45-65 °C / 113-149 °F" */
export function tempRange(c1: number, c2: number): string {
  const f = (c: number) => Math.round((c * 9) / 5 + 32);
  return `${c1}-${c2} °C / ${f(c1)}-${f(c2)} °F`;
}

// Heat equivalences (rough, labeled as such wherever shown):
// - A typical U.S. home gas furnace is rated about 80,000-100,000 BTU/hr (Carrier sizing guide). We use 90,000 BTU/hr ≈ 26 kW.
// - 1 MW = 3,412,142 BTU/hr.
const BTU_PER_HR_PER_MW = 3_412_142;
const FURNACE_BTU_PER_HR = 90_000;
const FURNACES_PER_MW = BTU_PER_HR_PER_MW / FURNACE_BTU_PER_HR; // ≈ 38

export function humanHeat(mw: number): { furnaces: number; btuPerHr: number; text: string } {
  const furnaces = Math.round(mw * FURNACES_PER_MW);
  const btuPerHr = Math.round(mw * BTU_PER_HR_PER_MW);
  return {
    furnaces,
    btuPerHr,
    text: `${Math.round(mw).toLocaleString()} MW of heat ≈ ${furnaces.toLocaleString()} home furnaces running flat out`,
  };
}

// Water equivalences:
// - EPA/WaterSense: an average American family uses more than 300 gallons of water per day at home. We use 300 gal/day.
export const GAL_PER_HOME_DAY = 300;

export function humanWater(gallonsPerDay: number): { homes: number; text: string } {
  const homes = Math.round(gallonsPerDay / GAL_PER_HOME_DAY);
  return { homes, text: `${homes.toLocaleString()} homes' daily water` };
}

/** Megatons → "10.1 million tons" */
export function tons(t: number): string {
  if (t >= 1e6) return `${(t / 1e6).toFixed(t >= 1e7 ? 1 : 2)} million tons`;
  if (t >= 1e3) return `${Math.round(t / 1e3).toLocaleString()} thousand tons`;
  return `${Math.round(t).toLocaleString()} tons`;
}

const pct = (millions: number, denomM: number): string => {
  const v = (millions / denomM) * 100;
  return v < 0.01 ? "<0.01%" : `${v.toFixed(2)}%`;
};
/** Share of the $165B IRB bond cap (a ceiling, not cash), as a percent string */
export function pctOfBond(millions: number): string {
  return pct(millions, BOND_M);
}
/** Share of the $50B the developers committed to the first five years (CBA), as a percent string */
export function pctOfPhase1(millions: number): string {
  return pct(millions, PHASE1_M);
}

/**
 * Parse a cost string from the cost table into millions. "$1.5B" → 1500; "$1.5-2B" → lo 1500, hi 2000, m 1750;
 * "+$640M over 30 years" → 640 with stream = true (a payment stream, not capital). Only the text before " over" is read.
 */
export function parseCostM(v: string): { m: number; lo?: number; hi?: number; stream: boolean } {
  const stream = /over\s+\d+\s+years/i.test(v);
  const head = v.split(/\s+over\s+/i)[0];
  const mt = head.match(/\$?\s*([\d.]+)(?:\s*[--]\s*([\d.]+))?\s*([MB])/i);
  if (!mt) return { m: 0, stream };
  const mult = mt[3].toUpperCase() === "B" ? 1000 : 1;
  const lo = parseFloat(mt[1]) * mult;
  if (mt[2]) {
    const hi = parseFloat(mt[2]) * mult;
    return { m: (lo + hi) / 2, lo, hi, stream };
  }
  return { m: lo, stream };
}
