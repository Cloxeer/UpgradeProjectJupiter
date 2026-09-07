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
    theirs: { num: "10M tons", tail: "a year, released" },
    ours: { num: "10M tons", tail: "a year, caught" },
    why: "The state's draft permit puts the fuel-cell plant at 10,144,115 tons of CO₂ a year, more than Albuquerque and Las Cruces combined. Dried, that exhaust is about 95% CO₂, which is the easy case for capture. [Bloom Energy](https://www.bloomenergy.com/) already partners with [Chart Industries](https://www.chartindustries.com/) to sell it. We ask that it run from the first day.",
    kidWhy: "Their power machines breathe out 10 million tons of planet-warming gas every year. Because it comes out almost pure, a box can catch it. We want the box on before the machines turn on.",
    voices: {
      legislator: "[NMED](https://www.env.nm.gov/) draft permit 10883 lists 10,144,115 tons CO₂e a year. The anode exhaust is about 95% CO₂ once dried, so capture is a standard skid, not a research project. The lease can require it before power-on; the permit is already stayed and will be reissued anyway.",
      business: "A 95%-pure CO₂ stream is a feedstock, not a liability: greenhouse enrichment, concrete curing, aggregate. Capture is the line that ends the court stay and gives investor relations a quarterly number to report.",
    },
    sources: ["sob", "bloom-chart", "bloom-co2", "abq-lc"],
  },
  {
    id: "water",
    label: "Water",
    kidLabel: "Water to drink",
    theirs: { num: "103M gal", tail: "already pumped, more taken" },
    ours: { num: "5M gal", tail: "a day, added" },
    why: "More than 103 million gallons were pumped from the fresh aquifer for construction in five months before a court stopped it, and the signed agreement lets the campus draw up to 20,000 gallons a day of drinking water from the local utility. [NMSU](https://nmwrri.nmsu.edu/publications/miscellaneous-reports/m-documents/m36.pdf) designed a plant in 2023 that turns deep salty water into 5 million gallons a day of clean water. The county is already designing a smaller 4 MGD plant with $15 million of Project Jupiter tax money and a state grant. We ask that the developer fund the full NMSU system instead, so the tax money stays with schools and roads, and that the brine be squeezed for more water before any is injected, as El Paso approved in 2026.",
    kidWhy: "They already used 103 million gallons of the town's water to build, and their plan keeps taking. Deep under the desert is salty water nobody drinks. A machine can clean it and give 16,700 homes water every day.",
    voices: {
      homeowner: "This is your tap. [CRRUA](https://www.crrua.org/) needs 6 million gallons a day next year and 15 by 2042. The plant makes 5 million a day from water nobody could drink, so your supply goes up instead of down.",
      business: "A designed, priced plant with a utility customer whose demand more than doubles by 2042. [El Paso Water](https://www.epwater.org/our_water/water_resources/desalination) has run a 27.5 MGD brackish plant since 2007. Water is a product here.",
    },
    sources: ["cbd-well", "haussamen-water", "cba", "nmsu", "epwater", "star-plant", "epwater-brine-recovery"],
  },
  {
    id: "food",
    label: "Heat and food",
    kidLabel: "Food from the heat",
    theirs: { num: "0 lbs", tail: "heat blown into the desert" },
    ours: { num: "60M lbs", tail: "of food a year" },
    why: "The computers reject about 2,400 megawatts of warmth, roughly 90,000 home furnaces' worth, through fans. One heat exchanger before those fans sends it to about 150 acres of greenhouses on the empty land beside them. At industry-average yields that is about 60 million pounds of produce a year, grown without pesticides. Gothenburg does this today on data-center heat.",
    kidWhy: "Computers get hot. Their plan blows all the heat into the sky. Ours pipes the warm water to greenhouses next door and grows tomatoes and lettuce all year.",
    voices: {
      business: "About 150 leasable acres with heat and CO₂ supplied, around $130,000 an acre a year in lease and heat revenue, on grower capital. Heat becomes a product with a buyer.",
    },
    sources: ["sweden", "render", "notice", "carrier-furnace"],
  },
  {
    id: "jobs",
    label: "Permanent jobs",
    kidLabel: "Jobs for grown-ups",
    theirs: { num: "750", tail: "signed for" },
    ours: { num: "3,000", tail: "written into the lease" },
    why: "The website advertises 1,500 permanent jobs; the signed agreement binds the company to 750. Greenhouses, the water plant, capture and a training institute add about 1,500 more, and the upgrade writes the total into the lease so it is enforceable, with the tax break paid as jobs are verified each year.",
    kidWhy: "They promised the county 750 jobs. Our plan makes about 3,000, with a school on site that teaches people from here how to do them.",
    voices: {
      legislator: "Their binding number is 750 full-time plus 50 part-time within three years of opening. Greenhouse staffing at about 6.5 jobs an acre is what lifts the enforceable count to about 3,000. Tie the PILT schedule to the verified count.",
    },
    sources: ["cba", "epm-jobs", "faq"],
  },
  {
    id: "smog",
    label: "Smog and air checks",
    kidLabel: "Smog check",
    theirs: { num: "No strict review", tail: "smog kept just under the trigger" },
    ours: { num: "Strict review", tail: "plus a public air meter on every stack" },
    why: "Federal law says a plant that puts out 250 tons a year or more of a smog gas gets a strict review, with the best pollution controls required. Their filing keeps each smog gas just under 250 tons, so the strict review never happens, over a valley that has failed the ozone standard since 2018. We ask for one permit for the whole campus that accepts the strict review, and a public air monitor on every stack so anyone can see the readings the same day.",
    kidWhy: "The air here already fails the safe-breathing test. Their plan stays just under the line where the tough rules kick in. We want the tough rules, and a meter on every chimney that anyone can read.",
    voices: {
      homeowner: "Their plan keeps each smog gas just under the amount that would force the strict federal review, so nobody has to install the best controls. On hot days that exhaust helps make ozone over Sunland Park and Santa Teresa. We ask for the strict review, and a public air meter on every stack so you can see the readings the same day.",
    },
    sources: ["sob", "sunland-park-ozone", "ala-sota-2025", "epa-ozone-naaqs"],
  },
  {
    id: "cost",
    label: "Added cost",
    kidLabel: "How much more it costs",
    theirs: { num: "$0", tail: "as filed" },
    ours: { num: "1.5%", tail: "of the bond, same timeline" },
    why: "Capture, the heat exchanger, the water plant and the institute add about $2.5 billion to a $165 billion project, about 1.5%, and about $450 million of that is grower money for greenhouses, off the developer's books. Same buildings, same fence, same schedule.",
    kidWhy: "Our plan costs only a tiny bit more, about one and a half pennies on every dollar, and the buildings stay exactly the same.",
    voices: {
      business: "About 1.5% of capital, most of it recovered in fan electricity, leases and water sales, for a permit that stays out of court. The greenhouses are off your balance sheet.",
    },
    sources: ["cba", "nmsu"],
  },
];
