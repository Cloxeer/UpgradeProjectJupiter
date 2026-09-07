// Feasibility of each of the six demands, as a visible rubric rather than a bare score.
// Five checks per demand; each is "yes" or "partial" with the reason and the document behind it.
// A reader sees the checks, not a number we assigned ourselves.

export type Check = {
  label: string;
  status: "yes" | "partial";
  note: string;
  sources: string[];
};

export type Demand = {
  id: string;
  /** the Blueprint card kicker this demand belongs to, for the per-process chip */
  process: string;
  short: string;
  /** the same demand in little-kid words */
  kidShort: string;
  checks: Check[];
};

export const CHECK_LABELS = ["Sold today", "Done at scale", "Cost", "Fits the schedule", "Legal lever"] as const;

export const demands: Demand[] = [
  {
    id: "capture",
    process: "Process 2 · Carbon",
    short: "Catch the CO₂ at the stack before power-on",
    kidShort: "Catch the gas in a box before it goes into the sky",
    checks: [
      { label: "Sold today", status: "partial", note: "Bloom and Chart Industries announced a capture product for this fuel cell in February 2025; no operating plant uses it yet. NMED's own review says the dried exhaust is about 95% CO₂, the easiest stream to capture.", sources: ["bloom-chart", "bloom-co2", "sob"] },
      { label: "Done at scale", status: "partial", note: "Boundary Dam, the longest-running power-plant capture unit, caught 848,000 tons in its best year (2024) and about 660,000 a year on average since 2014; the best plants anywhere sustain 50 to 75%. Nothing captures 8 million tons at one site. So the lease condition is metered tons against a 90–95% target, phased in as stacks arrive.", sources: ["boundary-dam-2024", "sob"] },
      { label: "Cost", status: "partial", note: "The largest item: about $1.5 billion for the skids plus $1.5 to 2 billion for a pipeline to Texas storage, wells and 50 years of care, all estimates. The federal 45Q credit, $85 a ton for 12 years, could repay most of it. Together the upgrade is about 2.5% of the $165 billion bond cap, or 8% of the $50 billion first phase.", sources: ["cba", "irs-45q"] },
      { label: "Fits the schedule", status: "yes", note: "Skids go in the fuel-cell yard as each block of stacks is delivered. Nothing about the halls or the timeline changes.", sources: ["render", "notice"] },
      { label: "Legal lever", status: "yes", note: "The bond lease, amendable by agreement at the county's next consent point, and the air permit, which is already stayed in court and will be rewritten anyway.", sources: ["cba", "nmpr-stay"] },
    ],
  },
  {
    id: "permit",
    process: "Process 2 · Carbon",
    short: "Every stack on a public meter, with limits set for the capture configuration",
    kidShort: "Measure the smog from every chimney and show everyone the number",
    checks: [
      { label: "Sold today", status: "yes", note: "Continuous emissions monitors are standard equipment on large power plants. The draft permit requires none: its 37 tons of NOx a year is estimated from four four-hour tests of one 65 kW unit.", sources: ["sob", "sob-part-a"] },
      { label: "Done at scale", status: "yes", note: "Continuous monitoring is how every large fossil plant in the country reports. What is unusual here is the scale: NMED notes the largest operating fuel-cell plant is about 25 MW against 2,462 MW.", sources: ["sob"] },
      { label: "Cost", status: "yes", note: "Monitors and reporting are a rounding error against the plant. Setting the permit limits for the capture configuration, which burns 5 to 15% more gas, is a paperwork change.", sources: ["sob"] },
      { label: "Fits the schedule", status: "yes", note: "The permit is already paused by the Supreme Court. Adding monitoring conditions costs no time the project has not already lost.", sources: ["nmpr-stay"] },
      { label: "Legal lever", status: "yes", note: "NMED sets permit conditions; the county can ask for monitoring in the lease and in its comments on the draft permit.", sources: ["sob", "cba"] },
    ],
  },
  {
    id: "heat",
    process: "Process 1 · Heat",
    short: "Offer the computers' heat to greenhouses next door",
    kidShort: "Use the computers' heat to grow tomatoes",
    checks: [
      { label: "Sold today", status: "yes", note: "One plate heat exchanger on the warm-water line before the dry coolers. Ordinary district-heating hardware.", sources: ["absorption-review", "sweden"] },
      { label: "Done at scale", status: "partial", note: "Gothenburg and Boden run small pilots (130 and 300 square metres). The scale precedents are Agriport A7 in the Netherlands, where Microsoft and Google data centers sit beside greenhouse growers, and Germany's law requiring data centers to reuse 10% of their heat from July 2026 and 20% from 2028. No greenhouse of 150 acres runs on data-center heat yet.", sources: ["goteborg-energi", "agriport", "enefg"] },
      { label: "Cost", status: "yes", note: "About $60 million of hardware for the developer, recovered by selling heat to growers; fan savings alone are a few percent of the heat moved. The greenhouses themselves are grower money, off the developer's books.", sources: ["cba"] },
      { label: "Fits the schedule", status: "yes", note: "The greenhouse acres are empty in the filed render. Growers build in parallel while the halls go up.", sources: ["render"] },
      { label: "Legal lever", status: "yes", note: "A heat-offer condition in the lease now, and the Waste-Heat Reuse bill to make it standard statewide.", sources: ["cba", "dailylobo"] },
    ],
  },
  {
    id: "water",
    process: "Process 3 · Water",
    short: "Fund the NMSU water plant, hand it to the towns' utility, and recharge the towns' reclaimed water",
    kidShort: "Clean the salty water so there is more to drink, and put the towns' used water back into the ground, cleaned",
    checks: [
      { label: "Sold today", status: "yes", note: "Brackish reverse osmosis is the same technology El Paso has run since 2007, and El Paso has put reclaimed water back into its aquifer through wells and infiltration ponds since 1985.", sources: ["epwater", "epwater-recharge"] },
      { label: "Done at scale", status: "yes", note: "El Paso's plant makes 27.5 million gallons a day, more than five times what is asked for here, and its recharge program has returned more than 30 billion gallons to the Hueco Bolson.", sources: ["epwater", "epwater-recharge"] },
      { label: "Cost", status: "yes", note: "NMSU priced the whole 5 MGD system at $269.5 million in 2023, about 0.16% of the bond. Infiltration basins are the cheap end of water infrastructure; El Paso moved to them from wells for that reason.", sources: ["nmsu", "epwater-recharge"] },
      { label: "Fits the schedule", status: "yes", note: "The design exists, and the county is already designing a smaller 4 MGD plant with $15 million of Jupiter tax money for construction in 2028 or 2029. This puts the developer's money behind the full system on that same schedule.", sources: ["nmsu", "star-plant", "cba"] },
      { label: "Legal lever", status: "partial", note: "The lease can fund construction instead of a study, and CRRUA needs the water by 2027 on its own projections. Recharge needs a State Engineer permit under the Ground Water Storage and Recovery Act; Albuquerque's, the state's first, took from 2008 tests to a 2014 permit, and NMSU flags a water-rights accounting question for reuse near the river. Doable, not automatic.", sources: ["cba", "nmsu", "nm-asr-act", "abcwua-bear-canyon"] },
    ],
  },
  {
    id: "jobs",
    process: "Process 5 · Food & jobs",
    short: "Tie the tax break to real jobs, with a training school on site",
    kidShort: "Real jobs for people from here, and a school to learn them",
    checks: [
      { label: "Sold today", status: "yes", note: "No hardware. A lease clause that pays the bond benefit as jobs are verified each year, and a $50 million institute run by NMSU and the community college.", sources: ["cba", "county-qa"] },
      { label: "Done at scale", status: "yes", note: "Doña Ana County's own IRB policy already provides for repayment of tax breaks or higher payments when job goals are missed, and Sandoval County amended Intel's lease by agreement in 2019 and 2024 to add payments. Rio Rancho requires clawbacks; Las Cruces proposed tiered ones in 2026.", sources: ["dac-irb-safeguards", "sandoval-intel", "county-qa"] },
      { label: "Cost", status: "yes", note: "$50 million for the institute against the $4 million for workforce programs in the signed agreement. The jobs themselves are greenhouse and water jobs that pay for themselves.", sources: ["cba", "epm-jobs"] },
      { label: "Fits the schedule", status: "yes", note: "The institute can open before the first fuel cell turns on; the first permanent hires are for construction-phase operations anyway.", sources: ["cba"] },
      { label: "Legal lever", status: "yes", note: "The lease and the county's own sole remedy clause. The Data Center Standards bill would make verified-jobs terms standard.", sources: ["cba", "sourcenm-moratorium"] },
    ],
  },
  {
    id: "closure",
    process: "Process 3 · Water",
    short: "A closure and monitoring bond, so the land and wells are cared for after the lease ends",
    kidShort: "Set money aside now so someone still checks the wells and the land after the company leaves",
    checks: [
      { label: "Sold today", status: "yes", note: "Doña Ana County already requires it of solar farms: a bond, letter of credit or escrow for full decommissioning, sized by a New Mexico engineer's estimate after year one and every fifth year, with foundations removed to 36 inches and native replanting. New Mexico's mining and oil rules carry the same kind of financial assurance.", sources: ["dac-solar-decom"] },
      { label: "Done at scale", status: "partial", note: "For data centers it is new: Susquehanna County, Pa. requires decommissioning within twelve months of end of life with bonding, and a model clause recommended to Pennsylvania municipalities sets the bond at 110% of removal cost, updated every five years. No campus of this size carries one yet.", sources: ["columbia-decom", "cga-pa"] },
      { label: "Cost", status: "yes", note: "A bond is money set aside, not spent; the developer earns interest on an escrow and pays a premium on a surety. Against $165 billion the carrying cost is a rounding error. The size follows the engineer's estimate, as the county's solar rule already does.", sources: ["dac-solar-decom", "cba"] },
      { label: "Fits the schedule", status: "yes", note: "A lease clause and an engineer's estimate after the first year of operation. Nothing is built; nothing waits.", sources: ["dac-solar-decom"] },
      { label: "Legal lever", status: "yes", note: "The lease, which the signed agreement makes the county's sole remedy and which today has no closure, restoration or bond clause. Federal Class VI rules already make CO₂-well operators post the money for 50 years of post-injection care; the county's clause extends the same idea to the whole site.", sources: ["cba", "epa-class-vi"] },
    ],
  },
];

export const demandById = Object.fromEntries(demands.map((d) => [d.id, d])) as Record<string, Demand>;

/** How many of the five checks are a full yes. */
export function yesCount(d: Demand): number {
  return d.checks.filter((c) => c.status === "yes").length;
}

/** One word a reader can act on. */
export function verdict(d: Demand): string {
  const n = yesCount(d);
  return n === 5 ? "Ready now" : n === 4 ? "Feasible" : "Needs work";
}
