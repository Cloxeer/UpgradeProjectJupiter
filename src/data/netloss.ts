// Net loss vs net gain over time, on their filed numbers. Every figure is derived from a cited source
// by simple multiplication; the derivation is shown in `how`.

export const GHG_PERMIT_TPY = 8_820_970; // Draft Permit 10883 Part A, Table 102.A (GHG as CO₂e). NMED struck the applicant's 15% safety factor; 10,144,115 was the application figure.
/** The developers' own expectation: about 40% below the 10.14 Mt application figure (BOCC deck, July 28, 2026). */
export const GHG_EXPECTED_TPY = 6_086_469;
export const POTABLE_CAP_GPD = 20_000; // CBA average cap
export const CONSTRUCTION_PUMPED_GAL = 103_000_000; // Apr–Aug 2026
export const BINDING_JOBS = 750;
export const OUR_RELEASED_TPY_LOW = GHG_PERMIT_TPY * 0.05;
export const OUR_RELEASED_TPY_HIGH = GHG_PERMIT_TPY * 0.1;
export const OUR_WATER_GPD = 5_000_000;
/** Water put back into the fresh aquifer from year 5: the towns' reclaimed flow today (about 1.85 MGD across three CRRUA plants, NMSU), rounded. CRRUA's demand exceeds the 5 MGD plant, so there is no plant surplus in Phase 1. */
export const OUR_RECHARGE_GPD = 2_000_000;
export const RECHARGE_START_YEAR = 5;
export const recharged = (y: number) => OUR_RECHARGE_GPD * 365 * Math.max(0, y - RECHARGE_START_YEAR);
/** Our uncaptured share keeps accruing for as long as gas runs. A falling gas share is the plan's target, not a law: HB93's net-zero definition allows methane offsets, and no firm clean supply for 2.4 GW has been identified. */
export const ourGasOp = (y: number) => operating(y);
export const OUR_JOBS = 3_000;
export const OUR_FOOD_LBS_YR = 60_000_000;

export const YEARS = [0, 1, 2, 5, 10, 15, 20, 25, 30, 40, 50, 80, 250] as const;
export type Year = (typeof YEARS)[number];

/** Operating years: construction runs through year 2 (their Q3 2028 target), so nothing is emitted or produced before then. */
export const operating = (y: number) => Math.max(0, y - 2);

/** Beyond this year no filing, lease or state projection reaches. The lines continue the documented trends and label every figure an estimate. */
export const FAR_YEAR = 100;
export const far = (y: number) => y >= FAR_YEAR;

export type Row = { label: string; kidLabel?: string; theirs: (y: number) => string; ours: (y: number) => string; how: string; kidHow?: string; sources: string[] };

const mt = (t: number) => (t === 0 ? "0" : `${(t / 1e6).toFixed(t >= 1e8 ? 0 : 1)} million tons`);
const bgal = (g: number) => (g === 0 ? "0 gallons" : g >= 1e9 ? `${(g / 1e9).toFixed(1)} billion gallons` : `${Math.round(g / 1e6)} million gallons`);

export const rows: Row[] = [
  {
    label: "CO₂ released into the air, cumulative",
    kidLabel: "Planet-warming gas let into the sky, all added up",
    kidHow: "Their permit allows almost 9 million tons a year. Our plan aims to catch 90 to 95% of it, with a meter to prove it, so only the small leftover gets out. Multiply by the years the plant has been running.",
    theirs: (y) => (far(y) ? `${mt(GHG_EXPECTED_TPY * operating(y))} to ${mt(GHG_PERMIT_TPY * operating(y))} if run as filed for the whole period (estimate). Warming tracks the cumulative total and lasts centuries, so every ton is still in the air.` : operating(y) === 0 ? "0 so far (still building)" : `${mt(GHG_EXPECTED_TPY * operating(y))} to ${mt(GHG_PERMIT_TPY * operating(y))}`),
    ours: (y) => (far(y) ? `${mt(OUR_RELEASED_TPY_LOW * ourGasOp(y))} to ${mt(OUR_RELEASED_TPY_HIGH * ourGasOp(y))} in total if capture runs at 90–95% the whole period (estimate, a target no plant has yet sustained), falling further as the share of energy from gas falls. The captured share is rock inside concrete and aggregate, or CO₂ under cap rock long past its 50-year federal monitoring period.` : operating(y) === 0 ? "0 so far (still building)" : `${mt(OUR_RELEASED_TPY_LOW * ourGasOp(y))} to ${mt(OUR_RELEASED_TPY_HIGH * ourGasOp(y))}`),
    how: "Theirs: the draft permit's 8,820,970 tons a year (high end) and the developers' own expectation of about 40% below their 10.14 million application figure, about 6.1 million (low end), × operating years, continued as filed in the long views. Ours: the 5–10% not captured × operating years, a 90–95% capture target that no plant has yet sustained for a decade, falling further as the share of energy from gas falls (a target set by geothermal test wells, storage and transmission; HB93 itself allows methane offsets). Operations start in year 2, their own Q3 2028 target. Every figure past year 80 is an estimate that continues the documented trend.",
    sources: ["sob", "sob-part-a", "bocc", "cba"],
  },
  {
    label: "Water taken from the fresh aquifer and CRRUA's pipes, cumulative",
    kidLabel: "Water: taken from our pipes, or added to them",
    kidHow: "Their signed deal lets them take 20,000 gallons a day of drinking water, and they already pumped 103 million gallons to build. Our plant makes 5 million gallons a day of clean water from salty water. Multiply by the years.",
    theirs: (y) => (far(y) ? bgal(CONSTRUCTION_PUMPED_GAL + POTABLE_CAP_GPD * 365 * y) + " taken at the signed cap alone (estimate), plus undisclosed non-potable use every year. The fresh table's 2000–2020 decline, driven by the whole basin's pumping and not by this campus alone, continued for 250 years; no filed plan or monitoring duty reaches this far." : y === 0 ? bgal(CONSTRUCTION_PUMPED_GAL) + " already pumped for construction" : bgal(CONSTRUCTION_PUMPED_GAL + POTABLE_CAP_GPD * 365 * y) + " (plus undisclosed non-potable use)"),
    ours: (y) => (far(y) ? bgal(OUR_WATER_GPD * 365 * operating(y)) + " of clean water made and " + bgal(recharged(y)) + " of reclaimed water put back into the fresh aquifer (estimate, trends continued). The towns' fresh wells pumped far less, so the local decline slowed (schematic, not a measurement); the brine sits below the confining layers; the monitoring wells, paid for by the closure bond, are the record." : operating(y) === 0 ? "Same construction water, then the plant opens" : "Same offices, same cap, but " + bgal(OUR_WATER_GPD * 365 * operating(y)) + " of new clean water put into those pipes" + (y >= RECHARGE_START_YEAR ? ", and " + bgal(recharged(y)) + " put back into the fresh aquifer (low estimate)" : "")),
    how: "Theirs: 103 million gallons pumped April–August 2026, plus the CBA's 20,000 gal/day average drinking-water cap × 365 × years; their non-potable operating volume has not been disclosed. Ours: 5 MGD produced × 365 × operating years; recharge from year 5 at about 2 MGD, the towns' reclaimed flow today (about 1.85 MGD across three CRRUA plants), once a State Engineer storage-and-recovery permit and the Rio Grande return-flow offset are settled, as El Paso has recharged reclaimed water since 1985 and Rio Rancho has since 2017. CRRUA's demand (6 MGD in 2027) exceeds the 5 MGD plant, so there is no plant surplus to recharge in Phase 1.",
    sources: ["cbd-well", "cba", "haussamen-water", "nmsu", "epwater-recharge", "nm-asr-act", "rio-rancho-pure", "abcwua-bear-canyon"],
  },
  {
    label: "Smog where people live",
    kidLabel: "Smog over the houses",
    kidHow: "Sunland Park already fails the safe-breathing test. Their smog numbers come from testing one small machine and multiplying, and nobody has to keep measuring the real chimneys. Our plan measures every bit and shows it to everyone.",
    theirs: (y) => (far(y) ? `About ${Math.round(37.2 * operating(y)).toLocaleString()} tons of NOx and ${Math.round(161 * operating(y)).toLocaleString()} tons of CO over the period if run as filed (estimate), beside a valley that already fails the ozone standard, estimated from four tests of one 65 kW unit and never measured continuously.` : operating(y) === 0 ? "Construction dust and truck exhaust beside an area that already fails the ozone standard" : "37 tons of NOx, 161 of CO and 124 of VOCs a year (draft permit), beside an area that has failed the ozone standard since 2018, estimated from four tests of one 65 kW unit with no continuous stack monitor required"),
    ours: (y) => (far(y) ? "Stack emissions falling with the share of energy from gas (target), every ton measured continuously and published; the archive of every stack, hour by hour, is the record." : "Same fuel cells, but every ton measured continuously and published, with permit limits set for the capture configuration"),
    how: "Draft Permit 10883 Part A, Table 102.A: NOx 37.2, CO 161.2, VOC 124.0, PM 75.4 tons a year, from tests of one 65 kW unit. Sunland Park has been an EPA ozone nonattainment area since Aug. 3, 2018; the campus sits just outside its boundary and NMED modelled its ozone contribution below the screening level. Doña Ana County: F for ozone, 15.2 unhealthy days a year (ALA 2025). The health standard is 70 ppb ozone; exposure is linked to asthma attacks and premature death.",
    sources: ["sob", "sob-part-a", "sunland-park-ozone", "ala-sota-2025", "epa-ozone-naaqs"],
  },
  {
    label: "Permanent jobs the county can enforce",
    kidLabel: "Jobs the county can count on",
    kidHow: "They signed for 750 jobs. Our plan makes about 3,000: their 1,500 computer jobs plus about 1,500 in greenhouses, water and training.",
    theirs: (y) => (far(y) ? "0 enforceable (estimate). The lease ended in 2056 and the signed agreement has no clause that reaches past its listed payments; whatever runs on the site runs on whoever owns it." : y < 5 ? "0 required yet (750 due within 3 years of opening)" : `${BINDING_JOBS.toLocaleString()} full-time + 50 part-time`),
    ours: (y) => (far(y) ? `~${OUR_JOBS.toLocaleString()} for as long as the water plant, greenhouses and institute are kept running (estimate), and in any case the closure and monitoring bond posted in the lease pays whoever is still watching the wells and the land.` : y < 2 ? "Construction; institute training the first cohorts" : y < 5 ? "~1,500 tech + first greenhouse block staffed" : `~${OUR_JOBS.toLocaleString()} permanent (1,500 tech + ~1,500 farm, water, capture, training)`),
    how: "Theirs: CBA minimum of 750 full-time and 50 part-time within three years of opening; the 1,500 advertised is not binding. Ours: their 1,500 kept, plus industry-average greenhouse staffing and plant operations.",
    sources: ["cba", "epm-jobs"],
  },
  {
    label: "Food grown on site, cumulative",
    kidLabel: "Food grown here",
    kidHow: "150 acres of greenhouses grow about 60 million pounds a year. Multiply by the years.",
    theirs: () => "0 lbs",
    ours: (y) => (far(y) ? `${((OUR_FOOD_LBS_YR * operating(y)) / 1e9).toFixed(1)} billion lbs if the glass is rebuilt each generation and the heat and water keep flowing (estimate, industry average yield).` : operating(y) === 0 ? "First block planted in year 2" : `${((OUR_FOOD_LBS_YR * operating(y)) / 1e6).toFixed(0)} million lbs, pesticide-free (industry average yield)`),
    how: "150 acres × ~400,000 lbs/acre/year for greenhouse tomatoes, peppers and greens (controlled-environment agriculture averages) × operating years.",
    sources: ["sweden"],
  },
  {
    label: "Heat blown into the desert air",
    kidLabel: "Heat from the computers",
    kidHow: "The computers make as much heat as 90,000 home furnaces. Their plan blows it into the sky. Ours warms greenhouses in winter and runs chillers in summer.",
    theirs: (y) => (far(y) ? "~2,400 MW every hour for the whole period if run as filed (estimate). Heat is gone the hour it is made; only what it was used for, or not, leaves a trace." : operating(y) === 0 ? "None yet" : "~2,400 MW every hour of the year, about 90,000 home furnaces running flat out"),
    ours: (y) => (far(y) ? "The same heat, put through greenhouses, chillers and the water plant first for the whole period (estimate). The food, water and jobs it made are the trace." : operating(y) === 0 ? "None yet" : "The same fans, minus what greenhouses and the water plant use first in winter"),
    how: "Heat ≈ IT load (2,462 MW) is thermodynamics. 1 MW ≈ 38 typical 90,000 BTU/hr home furnaces. The heat is not smog, but it is the resource the upgrade puts to work.",
    sources: ["notice", "carrier-furnace", "render"],
  },
];

export const allSources = Array.from(new Set([...rows.flatMap((r) => r.sources), "ipcc-ar6-spm", "nmbg-164", "usgs-mesilla-taap", "bloom-stack-life"]));
