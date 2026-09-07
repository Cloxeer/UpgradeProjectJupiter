// The home page comparison: their filed number beside ours, one line each, six rows.
// No quotes, no commentary in the row itself. The reason and the documents open on tap.
import type { Audience } from "@/components/jupiter/Audience";

export type CompareRow = {
  id: string;
  /** what the row is about, two or three words */
  label: string;
  kidLabel: string;
  /** their number, then a two-to-four word tail */
  theirs: { num: string; tail: string };
  /** ours, same shape */
  ours: { num: string; tail: string };
  /** one short paragraph, plain words */
  why: string;
  kidWhy: string;
  /** optional wording for a reader type; numbers never change */
  voices?: Partial<Record<Audience, string>>;
  sources: string[];
};

export const compareRows: CompareRow[] = [
  {
    id: "air",
    label: "Carbon in the air",
    kidLabel: "Planet-warming gas",
    theirs: { num: "8.8M tons", tail: "a year, permitted" },
    ours: { num: "8.8M tons", tail: "a year to catch, metered (90–95% target)" },
    why: "The state's draft permit allows the fuel-cell plant 8,820,970 tons of CO₂ a year (the developers applied for 10.1 million and expect about 40% less in practice), more than Albuquerque and Las Cruces emit combined. Dried, that exhaust is about 95% CO₂, which is the easy case for capture. [Bloom Energy](https://www.bloomenergy.com/) announced a capture product with [Chart Industries](https://www.chartindustries.com/) in 2025; no plant runs it yet, and the best capture plants operating anywhere sustain 50 to 75%. So we ask for capture-ready stacks from day one and a lease condition written as metered tons, against a 90 to 95% target, with the federal 45Q credit paying $85 a ton toward it.",
    kidWhy: "Their power machines are allowed to breathe out almost 9 million tons of planet-warming gas every year. Because it comes out almost pure, a box can catch most of it. We want the box ready before the machines turn on, and a meter that shows how much it really catches.",
    voices: {
      legislator: "[NMED](https://www.env.nm.gov/) draft permit 10883, Table 102.A, lists 8,820,970 tons CO₂e a year after NMED struck the applicant's 15% safety factor. The anode exhaust is about 95% CO₂ once dried, the easiest stream to capture, but no fuel-cell capture plant operates anywhere yet. The lease condition should be metered tons captured, negotiated in at the county's next consent point; the permit is stayed and will be reissued anyway.",
      business: "A 95%-pure CO₂ stream is a feedstock, not a liability: greenhouse enrichment, concrete curing, aggregate, and the federal 45Q credit pays $85 a ton stored or used for 12 years. Metered capture is the line that answers the court stay and gives investor relations a quarterly number to report.",
    },
    sources: ["sob", "sob-part-a", "bloom-chart", "bloom-co2", "sourcenm-cities", "irs-45q"],
  },
  {
    id: "water",
    label: "Water",
    kidLabel: "Water to drink",
    theirs: { num: "103M gal", tail: "already pumped, more taken" },
    ours: { num: "5M gal", tail: "a day, added" },
    why: "More than 103 million gallons were pumped from the fresh aquifer for construction in five months before a court stopped it, and the signed agreement lets the campus draw up to 20,000 gallons a day of drinking water from the local utility. [NMSU](https://nmwrri.nmsu.edu/publications/miscellaneous-reports/m-documents/m36.pdf) designed a plant in 2023 that turns deep salty water into 5 million gallons a day of clean water. The county is already designing a smaller 4 MGD plant with $15 million of Project Jupiter tax money and a state grant. We ask that the developer fund the full NMSU system instead, so the tax money stays with schools and roads; that the brine be squeezed for more water before any is injected, as El Paso approved in 2026; and that the towns' reclaimed water, about 2 MGD, go back into the fresh aquifer under a state storage permit, as El Paso has done since 1985 and Rio Rancho since 2017, so the towns' fresh wells pump far less and the local decline slows.",
    kidWhy: "They already used 103 million gallons of the town's water to build, and their plan keeps taking. Deep under the desert is salty water nobody drinks. A machine can clean it and give 16,700 homes water every day.",
    voices: {
      homeowner: "This is your tap. [CRRUA](https://www.crrua.org/) needs 6 million gallons a day next year and 15 by 2042. The plant makes 5 million a day from water nobody could drink, so your supply goes up instead of down.",
      business: "A designed, priced plant with a utility customer whose demand more than doubles by 2042. [El Paso Water](https://www.epwater.org/our_water/water_resources/desalination) has run a 27.5 MGD brackish plant since 2007. Water is a product here.",
    },
    sources: ["cbd-well", "haussamen-water", "cba", "nmsu", "epwater", "star-plant", "epwater-brine-recovery", "epwater-recharge", "nm-asr-act", "rio-rancho-pure"],
  },
  {
    id: "food",
    label: "Heat and food",
    kidLabel: "Food from the heat",
    theirs: { num: "0 lbs", tail: "heat blown into the desert" },
    ours: { num: "60M lbs", tail: "of food a year" },
    why: "The computers reject about 2,400 megawatts of warmth, roughly 90,000 home furnaces' worth, through fans. One heat exchanger before those fans sends it to about 150 acres of greenhouses on the empty land beside them. At top-tier tomato yields that is up to about 60 million pounds of produce a year, grown with far fewer pesticides than field farming. Dutch data centers already sit beside greenhouse growers at Agriport A7, and Germany now requires data centers to reuse a share of their heat; Gothenburg runs a small pilot.",
    kidWhy: "Computers get hot. Their plan blows all the heat into the sky. Ours pipes the warm water to greenhouses next door and grows tomatoes and lettuce all year.",
    voices: {
      business: "About 150 leasable acres with heat and CO₂ supplied, around $40,000 to $60,000 an acre a year in lease and heat revenue (heat near propane parity, estimate), on grower capital. Heat becomes a product with a buyer.",
    },
    sources: ["agriport", "enefg", "goteborg-energi", "render", "notice", "carrier-furnace"],
  },
  {
    id: "jobs",
    label: "Permanent jobs",
    kidLabel: "Jobs for grown-ups",
    theirs: { num: "750", tail: "signed for" },
    ours: { num: "3,000", tail: "written into the lease" },
    why: "The website advertises 1,500 permanent jobs; the signed agreement binds the company to 750. Greenhouses, the water plant, capture and a training institute add about 1,500 more, and the upgrade negotiates the total into the lease so it is enforceable, with the tax break paid as jobs are verified each year, as the county's own IRB policy already allows.",
    kidWhy: "They promised the county 750 jobs. Our plan makes about 3,000, with a school on site that teaches people from here how to do them.",
    voices: {
      legislator: "Their binding number is 750 full-time plus 50 part-time within three years of opening. Greenhouse staffing at about 6.5 jobs an acre is what lifts the enforceable count to about 3,000. Tie the PILT schedule to the verified count.",
    },
    sources: ["cba", "epm-jobs", "faq", "dac-irb-safeguards"],
  },
  {
    id: "smog",
    label: "Smog and air checks",
    kidLabel: "Smog check",
    theirs: { num: "37 tons", tail: "of NOx a year, estimated, never measured" },
    ours: { num: "Every stack", tail: "on a public meter, limits set for capture" },
    why: "The draft permit puts the plant's smog gases at 37 tons of nitrogen oxides, 161 of carbon monoxide and 124 of volatile organics a year, far below the 250-ton line that triggers the strictest federal review. Those figures come from four four-hour tests of one 65 kW unit, scaled up to 2,275 stacks, and the permit requires no continuous stack monitor. This would be the largest fuel-cell plant in the world by about a hundred times, beside a valley that has failed the ozone standard since 2018. We ask for continuous monitors on every cluster with public data, and permit limits set for the capture configuration, which burns more gas.",
    kidWhy: "The air here already fails the safe-breathing test. Their smog numbers come from testing one small machine and multiplying, and nobody has to keep measuring once it runs. We want a meter on every chimney that anyone can read.",
    voices: {
      homeowner: "Their smog numbers are small on paper, 37 tons of NOx a year, but they were estimated from one small test unit and the permit never requires anyone to measure the real stacks. On hot days that exhaust can help make ozone over Sunland Park and Santa Teresa. We ask for a public air meter on every stack so you can see the readings the same day.",
    },
    sources: ["sob", "sob-part-a", "sunland-park-ozone", "ala-sota-2025", "epa-ozone-naaqs"],
  },
  {
    id: "cost",
    label: "Added cost",
    kidLabel: "How much more it costs",
    theirs: { num: "$0", tail: "as filed" },
    ours: { num: "~2.5%", tail: "of the bond cap; about 8% of the first phase" },
    why: "Capture, its pipeline and wells, the heat exchanger, the water plant, solar and the institute add about $3.4 to 3.9 billion of capital, plus $640 million more in payments over 30 years, to a project with a $165 billion bond cap: about 2.5% of the cap, or about 8% of the $50 billion the companies committed for the first five years. Growers add about $470 million of their own. The federal 45Q credit, $85 a ton captured for 12 years, could repay most of the capture cost. Same buildings, same fence; the pipeline and permits add years to the storage side, not to the halls.",
    kidWhy: "Our plan costs about two and a half pennies more on every dollar of the whole deal, and the buildings stay exactly the same.",
    voices: {
      business: "About 2.5% of the bond cap, or 8% of Phase 1 capital, with 45Q at $85 a ton covering most of the capture line, plus leases and water sales, for a permit that stays out of court. The greenhouses are off your balance sheet.",
    },
    sources: ["cba", "nmsu", "irs-45q"],
  },
];
