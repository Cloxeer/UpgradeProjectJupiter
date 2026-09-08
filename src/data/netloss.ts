import { IT_LOAD_MW, CAPTURE_PENALTY_LO, CAPTURE_PENALTY_HI } from "./blueprint";
import type { ClaimLabel } from "./claims";

// Net loss vs net gain over time, on their filed numbers. Every figure is derived from a cited source
// by simple multiplication; the derivation is shown in `how`.

export const GHG_PERMIT_TPY = 8_820_970; // Draft Permit 10883 Part A, Table 102.A (GHG as CO₂e). NMED struck the applicant's 15% safety factor; 10,144,115 was the application figure.
/** The developers' own expectation: about 40% below the 10.14 Mt application figure (BOCC deck, July 28, 2026). */
export const GHG_EXPECTED_TPY = 6_086_469;
export const POTABLE_CAP_GPD = 20_000; // CBA average cap
export const CONSTRUCTION_PUMPED_GAL = 103_000_000; // Apr–Aug 2026
export const BINDING_JOBS = 750;
/**
 * Capture cannot be metered before a storage line exists. Texas Class VI reviews run about a year once an application is
 * complete, a ~200-mile CO₂ pipeline needs rights-of-way of the kind the gas pipeline is still fighting for, and NMSU puts
 * injection-well permitting at 4 to 5 years. So the skids are installed with the fuel cells but capture is first metered in
 * year 5, at the 50–75% the best operating plants have averaged, and reaches the 90–95% target in year 10. Before year 5
 * about 1% goes to concrete curing and the rest is measured and vented, the same stacks as theirs.
 */
export const CAPTURE_START_YEAR = 5;
export const CAPTURE_FULL_YEAR = 10;
/** The capture skids and compressors run on the same gas: 5–15% of output (literature 4–6% for anode streams), so gross CO₂ rises by (1 + penalty) once capture runs. In MW: about 120 to 370 of the 2,462. */
export const penaltyMW = (): [number, number] => [Math.round((IT_LOAD_MW * CAPTURE_PENALTY_LO) / 10) * 10, Math.round((IT_LOAD_MW * CAPTURE_PENALTY_HI) / 10) * 10];
/** Share of the stacks' CO₂ kept out of the air in a given year: [low, high]. */
export const captureShare = (y: number): [number, number] => (y < CAPTURE_START_YEAR ? [0.01, 0.01] : y < CAPTURE_FULL_YEAR ? [0.5, 0.75] : [0.9, 0.95]);
/** Cumulative tons released under the upgrade through year y: [low, high]. Low uses the developers' expected rate with the high capture share and the low energy penalty; high uses the permitted rate with the low share and the high penalty. From year 5 the gross stream is uplifted by (1 + penalty) because the capture itself burns gas. Operations start in year 3 (year 2 is their Q3 2028 completion). */
export const ourReleased = (y: number): [number, number] => {
  let lo = 0;
  let hi = 0;
  for (let t = 3; t <= y; t++) {
    const [a, b] = captureShare(t);
    const up = t >= CAPTURE_START_YEAR ? [1 + CAPTURE_PENALTY_LO, 1 + CAPTURE_PENALTY_HI] : [1, 1];
    lo += GHG_EXPECTED_TPY * up[0] * (1 - b);
    hi += GHG_PERMIT_TPY * up[1] * (1 - a);
  }
  return [lo, hi];
};
export const OUR_WATER_GPD = 5_000_000;
/** NMSU's 5 MGD design still needs final design and a 2–3 year build (El Paso's 27.5 MGD plant took 2004–2007), so the plant opens in year 5; nothing is delivered before that. */
export const OUR_WATER_START_YEAR = 5;
export const madeWater = (y: number) => OUR_WATER_GPD * 365 * Math.max(0, y - OUR_WATER_START_YEAR);
/** Water put back into the fresh aquifer from year 5: the towns' reclaimed flow today (about 1.85 MGD across three CRRUA plants, NMSU), rounded. CRRUA's demand exceeds the 5 MGD plant, so there is no plant surplus in Phase 1. Recharge begins in year 5 (Albuquerque's storage permit took 2008 tests to a 2014 permit), so the cumulative figure at year 5 is zero. */
export const OUR_RECHARGE_GPD = 2_000_000;
export const RECHARGE_START_YEAR = 5;
export const recharged = (y: number) => OUR_RECHARGE_GPD * 365 * Math.max(0, y - RECHARGE_START_YEAR);
export const OUR_JOBS = 3_000;
/** Greenhouses go up with the heat loop in year 5; food and greenhouse jobs count from then. */
export const GH_START_YEAR = 5;
export const OUR_FOOD_LBS_YR = 60_000_000;
export const foodGrown = (y: number) => OUR_FOOD_LBS_YR * Math.max(0, y - GH_START_YEAR);

export const YEARS = [0, 1, 2, 5, 10, 15, 20, 25, 30, 40, 50, 80, 250] as const;
export type Year = (typeof YEARS)[number];

/** Operating years: construction runs through year 2 (their Q3 2028 target), so nothing is emitted or produced before then. */
export const operating = (y: number) => Math.max(0, y - 2);

/** From this year on (2106 and later) no filing, lease or state projection reaches. The lines continue the documented trends and label every figure an estimate. */
export const FAR_YEAR = 80;
export const far = (y: number) => y >= FAR_YEAR;

export type Row = { label: string; kidLabel?: string; theirsLabel: ClaimLabel; oursLabel: ClaimLabel; theirs: (y: number) => string; ours: (y: number) => string; how: string; kidHow?: string; sources: string[] };

const mt = (t: number) => (t === 0 ? "0" : `${(t / 1e6).toFixed(t >= 1e8 ? 0 : 1)} million tons`);
const bgal = (g: number) => (g === 0 ? "0 gallons" : g >= 1e9 ? `${(g / 1e9).toFixed(1)} billion gallons` : `${Math.round(g / 1e6)} million gallons`);

export const rows: Row[] = [
  {
    label: "CO₂ released into the air, cumulative",
    theirsLabel: "fact",
    oursLabel: "projection",
    kidLabel: "Planet-warming gas let into the sky, all added up",
    kidHow: "Their permit allows almost 9 million tons a year. Our plan catches it once the big pipe to the storage rock exists, in year 5, and aims for 90 to 95% by year 10, with a meter to prove it. Before that the chimneys are the same as theirs.",
    theirs: (y) => (far(y) ? `${mt(GHG_EXPECTED_TPY * operating(y))} to ${mt(GHG_PERMIT_TPY * operating(y))} if run as filed for the whole period (estimate). Warming tracks the cumulative total and lasts centuries, so every ton is still in the air.` : operating(y) === 0 ? "0 so far (still building)" : `${mt(GHG_EXPECTED_TPY * operating(y))} to ${mt(GHG_PERMIT_TPY * operating(y))}`),
    ours: (y) => (far(y) ? `${mt(ourReleased(y)[0])} to ${mt(ourReleased(y)[1])} in total if capture holds its 90–95% target from year 10 for the whole period (estimate, a target no plant has yet sustained), falling further as the share of energy from gas falls. The captured share is rock inside concrete and aggregate, or CO₂ under cap rock long past its 50-year federal monitoring period.` : operating(y) === 0 ? "0 so far (still building)" : y < CAPTURE_START_YEAR ? `${mt(ourReleased(y)[0])} to ${mt(ourReleased(y)[1])}: the same stacks as theirs while the storage line and wells are permitted; about 1% used in concrete` : y < CAPTURE_FULL_YEAR ? `${mt(ourReleased(y)[0])} to ${mt(ourReleased(y)[1])}: capture metered from year 5 at 50–75%, the range the best operating plants have averaged` : `${mt(ourReleased(y)[0])} to ${mt(ourReleased(y)[1])}`),
    how: "Theirs: the draft permit's 8,820,970 tons a year (high end) and the developers' own expectation of about 40% below their 10.14 million application figure, about 6.1 million (low end), × operating years, continued as filed in the long views. Ours, year by year: years 3 and 4 the same stacks with about 1% used in concrete curing, because the storage line and wells cannot be permitted faster (Texas Class VI reviews take about a year, NMSU puts injection wells at 4 to 5 years, and the gas pipeline shows what a right-of-way fight costs); years 5 to 9 capture metered at 50–75%, the range the best operating plants have averaged; from year 10 the 5–10% not captured, of a stream 5–15% larger because the capture skids run on the same gas (about 120 to 370 MW of the 2,462), against a 90–95% target that no plant has yet sustained for a decade, falling further as the share of energy from gas falls (HB93 itself allows methane offsets). Operations start in year 2, their own Q3 2028 target. Every figure from year 80 on is an estimate that continues the documented trend.",
    sources: ["sob", "sob-part-a", "bocc", "cba", "boundary-dam-2024", "epa-class-vi", "nmsu"],
  },
  {
    label: "Water taken from the fresh aquifer, or added to the pipes and the ground (cumulative)",
    theirsLabel: "fact",
    oursLabel: "verified-estimate",
    kidLabel: "Water: taken from our pipes, or added to them",
    kidHow: "Their signed deal lets them take 20,000 gallons a day of drinking water, and they already pumped 103 million gallons to build. Our plant makes 5 million gallons a day of clean water from salty water once it is built, in year 5. Multiply by the years after that.",
    theirs: (y) => (far(y) ? bgal(CONSTRUCTION_PUMPED_GAL + POTABLE_CAP_GPD * 365 * y) + " taken at the signed cap alone (estimate), plus undisclosed non-potable use every year. The fresh table's 2000–2020 decline, driven by the whole basin's pumping and not by this campus alone, continued for the whole period; no filed plan or monitoring duty reaches this far." : y === 0 ? bgal(CONSTRUCTION_PUMPED_GAL) + " already pumped for construction" : bgal(CONSTRUCTION_PUMPED_GAL + POTABLE_CAP_GPD * 365 * y) + " (plus undisclosed non-potable use)"),
    ours: (y) => (far(y) ? bgal(madeWater(y)) + " of clean water made and " + bgal(recharged(y)) + " of reclaimed water put back into the fresh aquifer (estimate, trends continued). The towns' fresh wells pumped far less, so the local decline slowed (schematic, not a measurement); the brine sits below the confining layers; the monitoring wells, paid for by the closure bond, are the record." : operating(y) === 0 ? "Same 103 million gallons of construction water; the plant is in final design and its permits are filed" : y < OUR_WATER_START_YEAR ? "Same 103 million gallons of construction water; same offices, same cap; the plant is under construction (a 2–3 year build), so 0 gallons delivered yet" : y === OUR_WATER_START_YEAR ? "Plant opens this year at 5 million gallons a day into CRRUA's pipes; recharge basins begin under the storage permit; first year of delivery; the count starts next year" : "Same offices, same cap, but " + bgal(madeWater(y)) + " of new clean water put into those pipes, and " + bgal(recharged(y)) + " put back into the fresh aquifer (low estimate)"),
    how: "Theirs: 103 million gallons pumped April–August 2026, plus the CBA's 20,000 gal/day average drinking-water cap × 365 × years; their non-potable operating volume has not been disclosed. Ours: nothing before year 5, because NMSU's design still needs final design and a 2–3 year build (El Paso's plant took 2004–2007); then 5 MGD × 365 × years since opening; recharge from the same year at about 2 MGD, the towns' reclaimed flow today (about 1.85 MGD across three CRRUA plants), once a State Engineer storage-and-recovery permit and the Rio Grande return-flow offset are settled, as El Paso has recharged reclaimed water since 1985 and Rio Rancho has since 2017. CRRUA's demand (6 MGD in 2027) exceeds the 5 MGD plant, so there is no plant surplus to recharge in Phase 1.",
    sources: ["cbd-well", "cba", "haussamen-water", "nmsu", "epwater-recharge", "nm-asr-act", "rio-rancho-pure", "abcwua-bear-canyon"],
  },
  {
    label: "Smog where people live",
    theirsLabel: "fact",
    oursLabel: "fact",
    kidLabel: "Smog over the houses",
    kidHow: "Sunland Park already fails the safe-breathing test. Their smog numbers come from testing one small machine and multiplying, and nobody has to keep measuring the real chimneys. Our plan measures every bit and shows it to everyone.",
    theirs: (y) => (far(y) ? `About ${Math.round(37.2 * operating(y)).toLocaleString()} tons of NOx and ${Math.round(161 * operating(y)).toLocaleString()} tons of CO over the period if run as filed (estimate), beside a valley that already fails the ozone standard, estimated from four tests of one 65 kW unit and never measured continuously.` : operating(y) === 0 ? "Construction dust and truck exhaust beside an area that already fails the ozone standard" : "37 tons of NOx, 161 of CO and 124 of VOCs a year (draft permit), beside an area that has failed the ozone standard since 2018, estimated from four tests of one 65 kW unit with no continuous stack monitor required"),
    ours: (y) => (far(y) ? "Stack emissions falling with the share of energy from gas (target), every ton measured continuously and published; the archive of every stack, hour by hour, is the record." : "Same fuel cells, but every ton measured continuously and published, with permit limits set for the capture configuration"),
    how: "Draft Permit 10883 Part A, Table 102.A: NOx 37.2, CO 161.2, VOC 124.0, PM 75.4 tons a year, from tests of one 65 kW unit. Sunland Park has been an EPA ozone nonattainment area since Aug. 3, 2018; the campus sits just outside its boundary and NMED modelled its ozone contribution below the screening level. Doña Ana County: F for ozone, 15.2 unhealthy days a year (ALA 2025). The health standard is 70 ppb ozone; exposure is linked to asthma attacks and premature death.",
    sources: ["sob", "sob-part-a", "sunland-park-ozone", "ala-sota-2025", "epa-ozone-naaqs"],
  },
  {
    label: "Permanent jobs the county can enforce",
    theirsLabel: "fact",
    oursLabel: "projection",
    kidLabel: "Jobs the county can count on",
    kidHow: "They signed for 750 jobs. Our plan makes about 3,000: their 1,500 computer jobs plus about 1,500 in greenhouses, water and training.",
    theirs: (y) => (far(y) ? "0 enforceable (estimate). The lease ended in 2056 and the signed agreement has no clause that reaches past its listed payments; whatever runs on the site runs on whoever owns it." : y < 5 ? "0 required yet (750 due within 3 years of opening)" : `${BINDING_JOBS.toLocaleString()} full-time + 50 part-time`),
    ours: (y) => (far(y) ? `~${OUR_JOBS.toLocaleString()} for as long as the water plant, greenhouses and institute are kept running (estimate), and in any case the closure and monitoring bond posted in the lease pays whoever is still watching the wells and the land.` : y < 2 ? "Construction; institute training the first cohorts" : y < GH_START_YEAR ? "~1,500 tech (their halls) + institute; greenhouses, plant and capture crews hire as those open in year 5" : y < CAPTURE_FULL_YEAR ? "~2,500 (1,500 tech + first greenhouse block, water plant and capture crews)" : `~${OUR_JOBS.toLocaleString()} permanent (1,500 tech + ~1,500 farm, water, capture, training)`),
    how: "Theirs: CBA minimum of 750 full-time and 50 part-time within three years of opening; the 1,500 advertised is not binding. Ours: their 1,500 kept, plus industry-average greenhouse staffing (4 to 6.5 jobs an acre) and plant operations, hired as the greenhouses, plant and capture line open from year 5 and reach full acreage by year 10.",
    sources: ["cba", "epm-jobs"],
  },
  {
    label: "Food grown on site, cumulative",
    theirsLabel: "fact",
    oursLabel: "projection",
    kidLabel: "Food grown here",
    kidHow: "150 acres of greenhouses grow up to about 60 million pounds a year once they are built, in year 5. Multiply by the years after that.",
    theirs: () => "0 lbs",
    ours: (y) => (far(y) ? `${(foodGrown(y) / 1e9).toFixed(1)} billion lbs if the glass is rebuilt each generation and the heat and water keep flowing (estimate, industry average yield).` : y < GH_START_YEAR ? "0 so far; the first block is planted with the heat loop in year 5" : y === GH_START_YEAR ? "First block planted this year" : `up to ${(foodGrown(y) / 1e6).toFixed(0)} million lbs, with far fewer pesticides (industry average yield)`),
    how: "150 acres × ~400,000 lbs/acre/year for greenhouse tomatoes, peppers and greens (controlled-environment agriculture averages) × years since the first block in year 5, when the heat loop and the water plant are running.",
    sources: ["sweden"],
  },
  {
    label: "Heat blown into the desert air",
    theirsLabel: "fact",
    oursLabel: "fact",
    kidLabel: "Heat from the computers",
    kidHow: "The computers make as much heat as 90,000 home furnaces. Their plan blows it into the sky. Ours warms greenhouses in winter and runs chillers in summer.",
    theirs: (y) => (far(y) ? "~2,462 MW every hour for the whole period if run as filed (estimate). Heat is gone the hour it is made; only what it was used for, or not, leaves a trace." : operating(y) === 0 ? "None yet" : "~2,462 MW every hour of the year, about 90,000 home furnaces running flat out"),
    ours: (y) => (far(y) ? "The same heat, put through greenhouses, chillers and the water plant first for the whole period (estimate). The food, water and jobs it made are the trace." : operating(y) === 0 ? "None yet" : y < GH_START_YEAR ? "The same fans; the heat exchanger is in, the growers and the plant connect in year 5" : "The same fans, minus what greenhouses and the water plant use first in winter"),
    how: "Heat ≈ IT load (2,462 MW) is thermodynamics. 1 MW ≈ 38 typical 90,000 BTU/hr home furnaces. The heat is not smog, but it is the resource the upgrade puts to work.",
    sources: ["notice", "carrier-furnace", "render"],
  },
];

export const allSources = Array.from(new Set([...rows.flatMap((r) => r.sources), "ipcc-ar6-spm", "nmbg-164", "usgs-mesilla-taap", "bloom-stack-life"]));
