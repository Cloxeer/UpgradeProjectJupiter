import type { Audience } from "@/components/jupiter/Audience";

export type AudiencePanel = {
  title: string;
  intro: string;
  bullets: { text: string; sources: string[] }[];
  links: { label: string; href: string }[];
  /** order of the eight highlight cards (indices into highlightPairs) */
  highlightsOrder: number[];
  heroSubhead: string;
  whatIsIntro: string;
  netlossIntro: string;
  speedIntro: string;
  ctaLabel: string;
};

// highlightPairs indices: 0 $4.7B+1.9B · 1 $269M water · 2 $1B schools · 3 $50M institute · 4 jobs · 5 NOx monitored · 6 capture · 7 water for homes
export const audiencePanels: Record<Audience, AudiencePanel> = {
  expert: {
    title: "The full record",
    intro: "Every section, every number, every unit and every source, exactly as written for review.",
    bullets: [],
    links: [
      { label: "Sources, page by page", href: "/sources" },
      { label: "The Science at expert level", href: "/science" },
      { label: "The Blueprint", href: "/blueprint" },
    ],
    highlightsOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    heroSubhead: "",
    whatIsIntro: "",
    netlossIntro: "",
    speedIntro: "",
    ctaLabel: "",
  },
  overall: {
    title: "The whole picture",
    intro: "Everything on this site, in the order it was written: what Project Jupiter is, what the upgrade changes, and what you can do.",
    bullets: [],
    links: [],
    highlightsOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    heroSubhead: "",
    whatIsIntro: "",
    netlossIntro: "",
    speedIntro: "",
    ctaLabel: "",
  },
  legislator: {
    title: "What this means if you hold office",
    intro: "You approved, or will vote on, the leases, the permits and the bills. Here is what the upgrade puts in your hands, with the numbers you will be asked about.",
    bullets: [
      { text: "About 3,000 permanent jobs in Phase 1 against the 750 the signed agreement requires, with staffing tied to the lease so the number is enforceable, not advertised.", sources: ["cba", "epm-jobs"] },
      { text: "A conditioned bond schedule of about $1 billion over 30 years for schools, infrastructure and services, against $360 million today, paid as jobs and emissions targets are verified.", sources: ["cba", "county-qa"] },
      { text: "Five million gallons a day of new drinking water delivered to CRRUA from the plant NMSU already designed and priced at $269 million, instead of a $250,000 study of the same idea.", sources: ["nmsu", "cba"] },
      { text: "Day-one carbon capture on the fuel-cell stacks, with every ton of smog measured continuously and published, in a county that already fails the ozone standard.", sources: ["sob", "sunland-park-ozone", "ala-sota-2025"] },
      { text: "Three bills are drafted and ready to sponsor: Microgrid Oversight, Waste-Heat Reuse, and Data Center Standards. The Microgrid Oversight Act (SB 235) passed the Senate in 2026.", sources: ["dailylobo"] },
      { text: "Cost to the developer is about 1.5% of the $165 billion bond; the county's only enforcement tool is the IRB lease, so the conditions have to be written in before the fuel cells arrive.", sources: ["cba"] },
    ],
    links: [
      { label: "The three bills and who to call", href: "/legislators" },
      { label: "The cost table: who pays what", href: "/blueprint#cost" },
      { label: "The record, year by year", href: "/blueprint#timeline" },
    ],
    highlightsOrder: [4, 2, 0, 1, 5, 6, 3, 7],
    heroSubhead: "3,000 enforceable jobs, $1 billion for schools over 30 years, 5 million gallons of new water a day, and a permit the courts will let stand.",
    whatIsIntro: "For an elected official the question is simple: the county's leverage is the lease, and the lease is being finalized now. Here is what the documents say the project is, and what five conditions would change.",
    netlossIntro: "On the developers' own filed numbers, here is what each year of the plan as filed costs the county, and what the same years deliver under the upgrade.",
    speedIntro: "Same site, same timeline, same builder. The upgrade adds about 1.5% to the bill and changes the outcome from a net loss to a net gain.",
    ctaLabel: "See the bills and the conditions",
  },
  homeowner: {
    title: "What this means for your home and your street",
    intro: "You live next to it, drink the same water and breathe the same air. Here is what the plan as filed takes, and what the upgrade gives back.",
    bullets: [
      { text: "Water: the filed plan takes up to 20,000 gallons a day of drinking water from CRRUA and pumps an undisclosed amount more from a fresh-aquifer farm right; 103 million gallons went to construction in five months. The upgrade adds 5 million gallons a day of clean water to CRRUA's pipes, enough for about 16,700 homes.", sources: ["cba", "haussamen-water", "cbd-well", "nmsu", "epa-watersense"] },
      { text: "Air: Sunland Park has failed the federal ozone standard since 2018 and the county gets an F grade. The filed permit adds up to 250 tons a year of each smog gas. The upgrade keeps the same fuel cells but captures the CO₂ and puts continuous monitors on the stacks with the data public.", sources: ["sunland-park-ozone", "ala-sota-2025", "sob"] },
      { text: "Traffic: produce trucks use their own gate on the public road, so farm traffic never mixes with the secure entrance.", sources: ["render"] },
      { text: "Food and prices: about 60 million pounds a year of local, pesticide-free produce from 150 acres of greenhouses next to the halls (industry-average estimate).", sources: ["sweden"] },
      { text: "Jobs within driving distance: about 1,500 greenhouse, water, capture and training jobs on top of the 1,500 tech jobs they advertise, with an NMSU / DACC institute on site.", sources: ["cba", "epm-jobs"] },
      { text: "What to ask your commissioner: are the five conditions in the lease yet? Today the answer is no.", sources: ["cba"] },
    ],
    links: [
      { label: "Sign the petition", href: "/petition" },
      { label: "Who to call", href: "/legislators" },
      { label: "The water process, drawn", href: "/blueprint#p3" },
    ],
    highlightsOrder: [7, 5, 6, 4, 1, 2, 3, 0],
    heroSubhead: "Clean water added instead of taken, smog measured and captured instead of released, and food grown next door.",
    whatIsIntro: "If you live in Sunland Park, Santa Teresa or Anthony, this project shares your water and your air. Here is what it is, in the developers' own words and documents, and what five conditions would change for your street.",
    netlossIntro: "Year by year, here is what the plan as filed takes from the aquifer and puts into the air over your neighborhood, and what the upgrade does instead.",
    speedIntro: "Nothing about the upgrade slows the project down or moves it. It changes what your neighborhood gets out of it.",
    ctaLabel: "Add your name to the petition",
  },
  business: {
    title: "What this means if you want to invest, lease, sell or build here",
    intro: "The upgrade creates businesses that do not exist in the filed plan: greenhouse leases, water sales, heat sales, packing and logistics, and a trained workforce. Here is the money side, with every figure labeled.",
    bullets: [
      { text: "Greenhouse land: about 150 acres inside the fence, leased to commercial growers, with warm water and CO₂ piped in. Lease plus heat revenue to the developer is estimated at about $130,000 per acre a year; growers get winter heat at a fraction of gas cost (estimate).", sources: ["sweden", "cba"] },
      { text: "Water: a 5 MGD plant priced by NMSU at $269 million for the whole system, selling to CRRUA whose demand is projected at 6 MGD by 2027 and 15 by 2042.", sources: ["nmsu"] },
      { text: "Packing and logistics: a packing house on the public road at the Santa Teresa border crossing, with its own gate, feeding the produce trade that already runs through the port of entry.", sources: ["render"] },
      { text: "Workforce: a $50 million NMSU / DACC institute on site training for power, water, greenhouse and hardware jobs, against $4 million for workforce education in the signed agreement.", sources: ["cba"] },
      { text: "For the developer: lower fan and chiller electricity (the heat is sold instead of blown away), lease and water revenue, and a permit that survives review. The signed CBA already offsets $4.5 million in permit fees; the county could put similar certainty on the table for a plan that meets the conditions (our proposal, not a promise).", sources: ["cba", "nmpr-stay"] },
      { text: "Total added cost is about 1.5% of the $165 billion bond, with the greenhouses off the developer's balance sheet.", sources: ["cba"] },
      { text: "For Oracle, Meta, STACK or BorderPlex: a capture-first, monitored, geothermal-backed campus is the version that ends the court stays and the 2027 moratorium talk, and it is the environmental line you can put on an earnings call. Doing it right is what takes the legislators off your back.", sources: ["nmpr-stay", "sourcenm-moratorium", "dailylobo"] },
    ],
    links: [
      { label: "The cost table and who pays", href: "/blueprint#cost" },
      { label: "Greenhouses: acres, jobs, revenue", href: "/blueprint#p5" },
      { label: "Help improve the plan", href: "/#help" },
    ],
    highlightsOrder: [0, 1, 3, 4, 6, 7, 2, 5],
    heroSubhead: "New leases, new water to sell, heat that is sold instead of thrown away, and a trained workforce on site, for about 1.5% more cost.",
    whatIsIntro: "For an investor or an operator, the filed plan is a closed box: one tenant, one product, no side businesses. Here is what it is, and what five conditions would open up on the same land.",
    netlossIntro: "The as-filed column is what the site produces for anyone but the tenant: nothing. The upgraded column is the new revenue, year by year.",
    speedIntro: "How fast and how cheap: same schedule, same builder, about 1.5% more capital, most of it from growers, not the developer.",
    ctaLabel: "See what it costs and who pays",
  },
  kid: {
    title: "What this means if you are a kid",
    intro: "A company is building a giant computer building near Sunland Park. Computers get hot, need lots of power, and the power plant breathes out gas. Here is what we want them to change.",
    bullets: [
      { text: "The hot water from the computers should warm greenhouses full of tomatoes instead of being blown into the sky.", sources: ["sweden"] },
      { text: "The power plant's breath is almost all carbon dioxide, so a box can catch it and pump it deep under the ground, under a lid of solid rock.", sources: ["sob", "bloom-chart"] },
      { text: "There is salty water deep under the desert that nobody can drink. A machine can take the salt out and give clean water to 16,700 homes every day.", sources: ["nmsu", "epa-watersense"] },
      { text: "Sun shines on the roofs all day. Put solar panels on every roof.", sources: ["doe-pv-cost"] },
      { text: "The air near the building already fails the safe-breathing test, so every bit of smog should be measured and shown to everyone.", sources: ["sunland-park-ozone"] },
      { text: "The company promised the county 750 jobs. Our plan makes about 3,000.", sources: ["cba"] },
    ],
    links: [
      { label: "See the drawings you can play with", href: "/blueprint#processes" },
      { label: "The science, explained for kids", href: "/science" },
    ],
    highlightsOrder: [7, 6, 4, 5, 1, 0, 2, 3],
    heroSubhead: "Catch the gas, use the heat, clean the salty water, grow food, and count every bit of smog.",
    whatIsIntro: "A company is building a giant computer building. It needs a power plant as big as a city's, and the plant breathes out gas. Here is what the grown-ups wrote down about it, and what we want them to change.",
    netlossIntro: "Pick a year and see what the plan does to the air and the water, and what our plan does instead.",
    speedIntro: "Our plan does not make it slower. It costs a tiny bit more and gives back a lot more.",
    ctaLabel: "Go play with the drawings",
  },
};
