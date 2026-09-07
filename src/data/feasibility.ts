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
      { label: "Sold today", status: "yes", note: "Bloom has partnered with Chart Industries on capture for exactly this fuel cell. NMED's own review says the dried exhaust is about 95% CO₂, the easy case for capture.", sources: ["bloom-chart", "bloom-co2", "sob"] },
      { label: "Done at scale", status: "partial", note: "Boundary Dam has captured about 850,000 tons a year from one coal unit since 2014. Nothing yet captures 10 million tons at one site; here it would be many skids beside many stacks, phased in as stacks arrive.", sources: ["boundary-dam-2024", "sob"] },
      { label: "Cost", status: "yes", note: "The largest single item on the list, and still inside the roughly 1.5% the whole upgrade adds to a $165 billion bond.", sources: ["cba"] },
      { label: "Fits the schedule", status: "yes", note: "Skids go in the fuel-cell yard as each block of stacks is delivered. Nothing about the halls or the timeline changes.", sources: ["render", "notice"] },
      { label: "Legal lever", status: "yes", note: "The bond lease, which the county controls, and the air permit, which is already stayed in court and will be rewritten anyway.", sources: ["cba", "nmpr-stay"] },
    ],
  },
  {
    id: "permit",
    process: "Process 2 · Carbon",
    short: "One air permit, every stack on a public meter",
    kidShort: "Measure the smog and show everyone the number",
    checks: [
      { label: "Sold today", status: "yes", note: "Continuous stack monitors are standard equipment; every major source under the Clean Air Act already runs them.", sources: ["sob"] },
      { label: "Done at scale", status: "yes", note: "This is how every large plant in the country is permitted. What is unusual is the filed plan's split into pieces each just under the 250-ton line.", sources: ["sob"] },
      { label: "Cost", status: "yes", note: "Monitors and reporting are a rounding error against the plant. The cost is the controls the review would require, already counted under capture.", sources: ["sob"] },
      { label: "Fits the schedule", status: "yes", note: "The permit is already paused by the Supreme Court. Rewriting it as one permit costs no time the project has not already lost.", sources: ["nmpr-stay"] },
      { label: "Legal lever", status: "yes", note: "NMED issues the permit; the county can require the single-permit condition in the lease.", sources: ["sob", "cba"] },
    ],
  },
  {
    id: "heat",
    process: "Process 1 · Heat",
    short: "Offer the computers' heat to greenhouses next door",
    kidShort: "Use the computers' heat to grow tomatoes",
    checks: [
      { label: "Sold today", status: "yes", note: "One plate heat exchanger on the warm-water line before the dry coolers. Ordinary district-heating hardware.", sources: ["absorption-review", "sweden"] },
      { label: "Done at scale", status: "yes", note: "Gothenburg heats a commercial greenhouse on data-center heat today; the Netherlands has rules requiring the offer.", sources: ["sweden"] },
      { label: "Cost", status: "yes", note: "About $60 million of hardware for the developer, recovered in fan and chiller electricity. The greenhouses themselves are grower money, off the developer's books.", sources: ["sweden", "cba"] },
      { label: "Fits the schedule", status: "yes", note: "The greenhouse acres are empty in the filed render. Growers build in parallel while the halls go up.", sources: ["render"] },
      { label: "Legal lever", status: "yes", note: "A heat-offer condition in the lease now, and the Waste-Heat Reuse bill to make it standard statewide.", sources: ["cba", "dailylobo"] },
    ],
  },
  {
    id: "water",
    process: "Process 3 · Water",
    short: "Fund the NMSU water plant and hand it to the towns",
    kidShort: "Clean the salty water so there is more to drink",
    checks: [
      { label: "Sold today", status: "yes", note: "Brackish reverse osmosis is the same technology El Paso has run since 2007.", sources: ["epwater"] },
      { label: "Done at scale", status: "yes", note: "El Paso's plant makes 27.5 million gallons a day, more than five times what is asked for here.", sources: ["epwater"] },
      { label: "Cost", status: "yes", note: "NMSU priced the whole 5 MGD system at $269.5 million in 2023, about 0.16% of the bond.", sources: ["nmsu"] },
      { label: "Fits the schedule", status: "yes", note: "The design exists, and the county is already designing a smaller 4 MGD plant with $15 million of Jupiter tax money for construction in 2028 or 2029. This puts the developer's money behind the full system on that same schedule.", sources: ["nmsu", "star-plant", "cba"] },
      { label: "Legal lever", status: "yes", note: "The lease can fund construction instead of a study. The utility, CRRUA, needs the water by 2027 on its own projections.", sources: ["cba", "nmsu"] },
    ],
  },
  {
    id: "jobs",
    process: "Process 5 · Food & jobs",
    short: "Tie the tax break to real jobs, with a training school on site",
    kidShort: "Real jobs for people from here, and a school to learn them",
    checks: [
      { label: "Sold today", status: "yes", note: "No hardware. A lease clause that pays the bond benefit as jobs are verified each year, and a $50 million institute run by NMSU and the community college.", sources: ["cba", "county-qa"] },
      { label: "Done at scale", status: "partial", note: "Clawbacks tied to job counts are common in incentive deals elsewhere. We have not found a New Mexico industrial revenue bond that carries one, so this would be a first here.", sources: ["county-qa"] },
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
      { label: "Done at scale", status: "partial", note: "For data centers it is new: Susquehanna County, Pa. requires decommissioning within twelve months of end of life with bonding, and Pennsylvania municipalities are adopting a 110%-of-removal-cost bond updated every five years. No campus of this size carries one yet.", sources: ["columbia-decom", "cga-pa"] },
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
