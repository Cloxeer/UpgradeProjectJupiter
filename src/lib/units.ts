// Plain-language unit helpers. Every conversion here is cited on the Sources page.

/** "60 °C / 140 °F" */
export function temp(c: number): string {
  const f = Math.round((c * 9) / 5 + 32);
  return `${Math.round(c)} °C / ${f} °F`;
}

/** "45–65 °C / 113–149 °F" */
export function tempRange(c1: number, c2: number): string {
  const f = (c: number) => Math.round((c * 9) / 5 + 32);
  return `${c1}–${c2} °C / ${f(c1)}–${f(c2)} °F`;
}

// Heat equivalences (rough, labeled as such wherever shown):
// - A typical U.S. home gas furnace is rated about 80,000–100,000 BTU/hr (Carrier sizing guide). We use 90,000 BTU/hr ≈ 26 kW.
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

/** Share of the $165B bond, as a percent string */
export function pctOfBond(millions: number): string {
  const pct = (millions / 165_000) * 100;
  return pct < 0.01 ? "<0.01%" : `${pct.toFixed(2)}%`;
}
