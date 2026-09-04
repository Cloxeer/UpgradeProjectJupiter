// Net loss vs net gain over time, on their filed numbers. Every figure is derived from a cited source
// by simple multiplication; the derivation is shown in `how`.

export const GHG_PERMIT_TPY = 10_144_115; // NMED draft Statement of Basis
export const GHG_PRACTICE_FACTOR = 0.6; // developers: "~40% less CO2 based on real-world operating expectations"
export const POTABLE_CAP_GPD = 20_000; // CBA average cap
export const CONSTRUCTION_PUMPED_GAL = 103_000_000; // Apr–Aug 2026
export const BINDING_JOBS = 750;
export const OUR_RELEASED_TPY_LOW = GHG_PERMIT_TPY * 0.05;
export const OUR_RELEASED_TPY_HIGH = GHG_PERMIT_TPY * 0.1;
export const OUR_WATER_GPD = 5_000_000;
export const OUR_JOBS = 3_000;
export const OUR_FOOD_LBS_YR = 60_000_000;

export const YEARS = [0, 1, 2, 5, 10, 15, 20, 25, 30] as const;
export type Year = (typeof YEARS)[number];

/** Operating years: construction runs through year 2 (their Q3 2028 target), so nothing is emitted or produced before then. */
export const operating = (y: number) => Math.max(0, y - 2);

export type Row = { label: string; kidLabel?: string; theirs: (y: number) => string; ours: (y: number) => string; how: string; kidHow?: string; sources: string[] };

const mt = (t: number) => (t === 0 ? "0" : `${(t / 1e6).toFixed(t >= 1e8 ? 0 : 1)} million tons`);
const bgal = (g: number) => (g === 0 ? "0 gallons" : g >= 1e9 ? `${(g / 1e9).toFixed(1)} billion gallons` : `${Math.round(g / 1e6)} million gallons`);

export const rows: Row[] = [
  {
    label: "CO₂ released into the air, cumulative",
    kidLabel: "Planet-warming gas let into the sky, all added up",
    kidHow: "Their permit says about 10 million tons a year. We catch 90 to 95% of it, so only the small leftover gets out. Multiply by the years the plant has been running.",
    theirs: (y) => (operating(y) === 0 ? "0 so far (still building)" : `${mt(GHG_PERMIT_TPY * GHG_PRACTICE_FACTOR * operating(y))} to ${mt(GHG_PERMIT_TPY * operating(y))}`),
    ours: (y) => (operating(y) === 0 ? "0 so far (still building)" : `${mt(OUR_RELEASED_TPY_LOW * operating(y))} to ${mt(OUR_RELEASED_TPY_HIGH * operating(y))}`),
    how: "Theirs: NMED's permitted 10,144,115 tons a year (low end uses the developers' own '40% less in practice' claim) × operating years. Ours: the 5–10% not captured × operating years, falling further as cleaner gas is blended. Operations start in year 2, their own Q3 2028 target.",
    sources: ["sob", "bocc", "cba"],
  },
  {
    label: "Water taken from the fresh aquifer and CRRUA's pipes, cumulative",
    kidLabel: "Water: taken from our pipes, or added to them",
    kidHow: "Their signed deal lets them take 20,000 gallons a day of drinking water, and they already pumped 103 million gallons to build. Our plant makes 5 million gallons a day of clean water from salty water. Multiply by the years.",
    theirs: (y) => (y === 0 ? bgal(CONSTRUCTION_PUMPED_GAL) + " already pumped for construction" : bgal(CONSTRUCTION_PUMPED_GAL + POTABLE_CAP_GPD * 365 * y) + " (plus undisclosed non-potable use)"),
    ours: (y) => (operating(y) === 0 ? "Same construction water, then the plant opens" : "Same offices, same cap, but " + bgal(OUR_WATER_GPD * 365 * operating(y)) + " of new clean water put into those pipes"),
    how: "Theirs: 103 million gallons pumped April–August 2026, plus the CBA's 20,000 gal/day average drinking-water cap × 365 × years; their non-potable operating volume has not been disclosed. Ours: 5 MGD produced × 365 × operating years.",
    sources: ["cbd-well", "cba", "haussamen-water", "nmsu"],
  },
  {
    label: "Smog where people live",
    kidLabel: "Smog over the houses",
    kidHow: "Sunland Park already fails the safe-breathing test. Their permit adds more smog gases. Our plan measures every bit and shows it to everyone.",
    theirs: (y) => (operating(y) === 0 ? "Construction dust and truck exhaust in an area that already fails the ozone standard" : "Up to ~250 tons/yr of each smog pollutant added to an area that has failed the ozone standard since 2018 and gets an F grade"),
    ours: () => "Same fuel cells, but every ton measured continuously and published, under one permit with PSD-level controls",
    how: "Sunland Park has been an EPA ozone nonattainment area since Aug. 3, 2018. Doña Ana County: F for ozone, 15.2 unhealthy days a year (ALA 2025). The health standard is 70 ppb ozone; exposure is linked to asthma attacks and premature death.",
    sources: ["sunland-park-ozone", "ala-sota-2025", "epa-ozone-naaqs", "sob"],
  },
  {
    label: "Permanent jobs the county can enforce",
    kidLabel: "Jobs the county can count on",
    kidHow: "They signed for 750 jobs. Our plan makes about 3,000: their 1,500 computer jobs plus about 1,500 in greenhouses, water and training.",
    theirs: (y) => (y < 5 ? "0 required yet (750 due within 3 years of opening)" : `${BINDING_JOBS.toLocaleString()} full-time + 50 part-time`),
    ours: (y) => (y < 2 ? "Construction; institute training the first cohorts" : y < 5 ? "~1,500 tech + first greenhouse block staffed" : `~${OUR_JOBS.toLocaleString()} permanent (1,500 tech + ~1,500 farm, water, capture, training)`),
    how: "Theirs: CBA minimum of 750 full-time and 50 part-time within three years of opening; the 1,500 advertised is not binding. Ours: their 1,500 kept, plus industry-average greenhouse staffing and plant operations.",
    sources: ["cba", "epm-jobs"],
  },
  {
    label: "Food grown on site, cumulative",
    kidLabel: "Food grown here",
    kidHow: "150 acres of greenhouses grow about 60 million pounds a year. Multiply by the years.",
    theirs: () => "0 lbs",
    ours: (y) => (operating(y) === 0 ? "First block planted in year 2" : `${((OUR_FOOD_LBS_YR * operating(y)) / 1e6).toFixed(0)} million lbs, pesticide-free (industry average yield)`),
    how: "150 acres × ~400,000 lbs/acre/year for greenhouse tomatoes, peppers and greens (controlled-environment agriculture averages) × operating years.",
    sources: ["sweden"],
  },
  {
    label: "Heat blown into the desert air",
    kidLabel: "Heat from the computers",
    kidHow: "The computers make as much heat as 90,000 home furnaces. Their plan blows it into the sky. Ours warms greenhouses in winter and runs chillers in summer.",
    theirs: (y) => (operating(y) === 0 ? "None yet" : "~2,400 MW every hour of the year, about 90,000 home furnaces running flat out"),
    ours: (y) => (operating(y) === 0 ? "None yet" : "The same fans, minus what greenhouses and the water plant use first in winter"),
    how: "Heat ≈ IT load (2,462 MW) is thermodynamics. 1 MW ≈ 38 typical 90,000 BTU/hr home furnaces. The heat is not smog, but it is the resource the upgrade puts to work.",
    sources: ["notice", "carrier-furnace", "render"],
  },
];

export const allSources = Array.from(new Set(rows.flatMap((r) => r.sources)));
