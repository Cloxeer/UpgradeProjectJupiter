// "Force Upgrade Project Jupiter" — our replacement content.
// The original Project Jupiter Together text lives in ./jupiter.ts and is shown
// verbatim inside the "What they actually say" dropdown under every section.
//
// Numbers are Phase 1 unless marked "full build". Sources are in ./sources.ts and cited on the Sources page.

import type { TabPanel } from "@/data/jupiter";

export const siteName = "Force Upgrade Project Jupiter";
export const author = "Sebastian, an NMSU AI student";

export const LAST_UPDATED = "Sept. 7, 2026";

export const banner =
  "Independent proposal. Not affiliated with Oracle, STACK Infrastructure, or Project Jupiter Together. Their original text is one tap away.";

/** The mission, one sentence, shown under the header on every page. The same words for every reader. */
export const mission = "Keep the data center. Make it catch its carbon, reuse its heat, make new water and hire here. Same land, same buildings, about 2.5% more, most of it repayable by the federal capture credit.";

/** How the upgrade actually happens. Step 3 is the only one a reader controls. */
export const steps = [
  { n: 1, who: "The county", what: "negotiates the six conditions into the bond lease at its next consent point, before the fuel cells arrive.", why: "The county holds title during the 30-year bond and the lease is its only remedy, but the lease can be changed only by agreement; the leverage is every consent the companies still need.", href: "/legislators#commission", cta: "Who signs the lease" },
  { n: 2, who: "Santa Fe", what: "passes the three bills so the same rules apply to the next data center.", why: "The Microgrid Oversight Act already passed the Senate in 2026. The other two are drafted.", href: "/legislators#bills", cta: "The three bills" },
  { n: 3, who: "You", what: "sign, call your commissioner, and show up on a second or fourth Tuesday.", why: "None of the six conditions is in the lease yet. Concrete is being poured now.", href: "/petition", cta: "Sign the petition" },
] as const;

/** Six tabs. Petition is the button, not a tab. */
export const nav = [
  { label: "HOME", href: "/" },
  { label: "BLUEPRINT", href: "/blueprint" },
  { label: "SCIENCE", href: "/science" },
  { label: "LEGISLATORS", href: "/legislators" },
  { label: "FAQ", href: "/faq" },
  { label: "SOURCES", href: "/sources" },
];

export const heroSubhead =
  "This is about our air, our water, our land and the people who live here, not only our economy. Keep the data center. Make it earn its place.";

export const heroQuestion = "WHAT SHOULD PROJECT JUPITER MEAN FOR NEW MEXICO?";

export const heroBullets = [
  { strong: "About $6.4 billion in economic benefits (estimate).", rest: " Same site, same buildings, about 2.5% more capital, most of it repayable by the federal 45Q capture credit." },
  { strong: "More good jobs.", rest: " About 7,500 construction jobs and about 3,000 permanent jobs in Phase 1: the same 1,500 tech roles plus about 1,500 in greenhouses, water, capture and training (industry-average staffing). About 4,800 at full build." },
  { strong: "More water, not less.", rest: " Fund the 5 million gallon a day desalination plant NMSU already designed for Santa Teresa. Server heat preheats the feed." },
  { strong: "Clean air, not cleaner air.", rest: " NMED says the fuel-cell exhaust is about 95% CO₂ once dried. Capture-ready stacks from day one, capture metered against a 90 to 95% target once the storage line is connected (about year 5), and continuous smog monitors on every cluster." },
  { strong: "Fresh local food.", rest: " About 150 acres of heated greenhouses on unbuilt land next to the dry coolers, growing up to about 60 million pounds a year at industry yields, with far fewer pesticides than field farming." },
  { strong: "", rest: "Project Jupiter can be the right, responsible data center for New Mexico. Right now it is not. Force the upgrade." },
];

export const ctaText = { before: "Click ", link: "HERE", after: " to force the upgrade of Project Jupiter" };

export const whatIsParagraphs = [
  "Project Jupiter is a data center campus in Santa Teresa, Doña Ana County, backed by $165 billion in county industrial revenue bonds. The signed Community Benefits Agreement describes a site of about 819 acres with a 400-acre first phase; early news reports said 1,400. NMED's draft permit allows the fuel-cell plant 8,820,970 tons of greenhouse gas a year (the developers applied for 10.1 million), more than Albuquerque and Las Cruces emit combined, with smog gases estimated from four tests of one 65 kW unit and no continuous stack monitor required. The website promises 1,500 permanent jobs; the signed agreement requires 750. That is one binding job for roughly every 11,800 tons of carbon.",
  "The upgrade does not cancel the project. It keeps the same four data halls, the same fuel cells, the same fenced campus, and the same construction timeline, then bolts on what the developers left out. NMED's own permit review says the fuel cells' dried exhaust is about 95 percent carbon dioxide, which is why Bloom and Chart Industries announced a capture product for it in 2025; no plant runs it yet, so the condition is metered tons. Capture skids go in the fuel-cell yard. One plate heat exchanger taps the warm-water header before the dry coolers and sends heat to 150 acres of greenhouses in winter and to desalination preheat year-round. The added cost is about 2.5 percent of the bond cap, or about 8 percent of the $50 billion first phase, before the federal 45Q credit.",
  "The upgrade also rebalances the deal. Instead of a $50 million check for water, the county gets the 5 million gallon a day brackish desalination plant that NMSU engineers designed and priced at $269.5 million in 2023. Instead of $360 million for schools over 30 years, a conditioned bond agreement delivers $1 billion. Instead of $6.9 million for workforce programs, a $50 million NMSU and DACC institute trains local residents for the jobs. Every number on this page is an estimate, labeled as such, and their original numbers are one click below each section so you can compare.",
];

export type UpgradeHighlight = {
  icon: "datacenter" | "water" | "school" | "community" | "helmet" | "emissions" | "energy" | "household";
  num: string;
  label: string;
  theirs: string;
  color: string;
};

export const highlights: UpgradeHighlight[] = [
  { icon: "datacenter", num: "~$6.4B", label: "IN LONG TERM ECONOMIC IMPACT, PHASE 1 (ESTIMATE†)", theirs: "$4.7B", color: "#15768c" },
  { icon: "water", num: "$269.5M", label: "THE NMSU-DESIGNED 5 MGD DESALINATION PLANT, FULLY FUNDED", theirs: "$50M", color: "#1f7ae0" },
  { icon: "school", num: "$1B+", label: "SCHOOLS, INFRASTRUCTURE & PUBLIC SERVICES OVER 30 YEARS", theirs: "$360M", color: "#d99a00" },
  { icon: "community", num: "$50M", label: "COMMUNITY & WORKFORCE PROGRAMS, INCLUDING AN NMSU / DACC TECH INSTITUTE", theirs: "$6.9M", color: "#e07b00" },
  { icon: "helmet", num: "~10,500", label: "CONSTRUCTION & PERMANENT JOBS (ABOUT 3,000 PERMANENT IN PHASE 1, ESTIMATE)", theirs: "8,500+", color: "#2e8b57" },
  { icon: "emissions", num: "Every stack", label: "ON A CONTINUOUS PUBLIC MONITOR, WITH PERMIT LIMITS SET FOR THE CAPTURE CONFIGURATION", theirs: "92% lower NOx", color: "#c0392b" },
  { icon: "energy", num: "90–95%", label: "CAPTURE TARGET, METERED AT THE STACK FROM DAY ONE, NOT \"MATCHED\" BY 2031", theirs: "100% matching by 2031", color: "#2e8b57" },
  { icon: "household", num: "5M", label: "GALLONS PER DAY OF NEW CLEAN WATER MADE FROM SALTY GROUNDWATER", theirs: "~9 households used", color: "#1f7ae0" },
];

// ─── Speed & cost section ────────────────────────────────────────────────────

export const speedRows: { label: string; theirs: string; ours: string }[] = [
  { label: "Land", theirs: "About 819 acres per the signed CBA, 400 in the first phase; early news reports said 1,400", ours: "The same site. Nothing added outside the property line; greenhouse acreage set from their unpublished site plan" },
  { label: "Construction footprint", theirs: "Four data halls, ops, warehouse, transformer yard, chiller plants, dry coolers, and a fuel-cell yard the render does not show", ours: "Every one of those stays where it is. Greenhouses and the water plant go on undeveloped acres beside the dry coolers" },
  { label: "Time to power online", theirs: "18 to 24 months, currently stalled by a Supreme Court stay on the air permit", ours: "18 to 24 months. Capture skids ship in containers like the fuel cells. Meeting the conditions is what un-stalls the permit" },
  { label: "Capital cost", theirs: "~$165B bond cap; $50B committed in the first five years", ours: "About $3.4–3.9B more capital (2.5% of the cap, 8% of the first phase) plus $640M more in payments over 30 years, before the federal 45Q credit repays most of the capture cost. Growers finance their own greenhouses" },
  { label: "Who runs the greenhouses", theirs: "Nobody. Heat is blown into the desert by the dry coolers", ours: "Commercial growers lease 150 acres. Oracle and STACK sell them heat they are paying fans to throw away" },
  { label: "Permanent jobs", theirs: "750 full-time + 50 part-time, binding. 1,500 advertised", ours: "About 3,000 in Phase 1 including the binding 750, about 4,800 at full build (estimates)" },
  { label: "CO₂ released per year", theirs: "8,820,970 tons permitted (draft permit); the developers applied for 10.1 million and expect about 40% less in practice", ours: "0.4 to 0.9 million tons if capture meets its 90 to 95% target, falling as the share of energy from gas falls. HB93's 2045 net-zero definition allows methane offsets; we ask for the physical reading" },
  { label: "Smog (NOx)", theirs: "37 tons a year in the draft permit (CO 161, VOC 124), estimated from four tests of one 65 kW unit; no continuous stack monitor required", ours: "Continuous monitors on every cluster, public dashboard, limits set for the capture configuration" },
  { label: "Water", theirs: "Takes 20,000 gal/day of drinking water (signed cap); pulls an undisclosed amount more from a fresh-aquifer farm right; pumped 103M gallons for construction; gives a $50M cheque", ours: "Makes 5 million gallons a day of clean water from salty groundwater nobody can drink, using the plant NMSU designed, and puts it in CRRUA's pipes" },
  { label: "Solar", theirs: "None", ours: "Every roof and parking canopy. Honestly under 1% of campus load, but enough to run the greenhouses, water plant, and offices" },
  { label: "Food", theirs: "None", ours: "Up to about 60 million pounds a year in Phase 1 at industry yields, grown with far fewer pesticides than field farming, certified local" },
  { label: "Lawsuits and delays", theirs: "Supreme Court stays, paused permits, pipeline denied twice, open-meetings suits", ours: "Conditions met up front become the settlement that lets permits move" },
];

export const pitches = [
  {
    title: "If you run the company",
    body: "You do not farm, and you do not run a water plant. You lease 150 acres you are not using to growers, sell them heat your dry-cooler fans are already paid to reject, and bolt capture skids onto exhaust that is about 95% CO₂ once dried, with the federal 45Q credit paying $85 a ton. It adds about 2.5% of the bond cap, answers the litigation that has your air permit frozen, and gives you, to our knowledge, the first hyperscale site in the country to combine metered capture, heat reuse, water production and a public emissions meter.",
  },
  {
    title: "If you hold the vote",
    body: "You approved up to $165 billion in bonds with conditions on jobs, wages and drinking water, but none on emissions, heat or water production. The county owns the land during the bond term and leases it back, and the lease can be changed only by agreement. Negotiate the conditions in at the next consent the companies need, as Sandoval County did with Intel: capture-ready stacks with metered capture, continuous monitors, heat offered to growers, the NMSU water plant funded, bonds tied to jobs delivered, a closure bond. Same buildings you already approved.",
  },
  {
    title: "If you are ten years old",
    body: "A computer gets hot when you play games for a long time. This place will have millions of computers. The company wants to blow the hot air into the desert with giant fans and burn gas that makes smoke. Instead, we can use the heat to grow tomatoes and strawberries in giant greenhouses all winter, and clean salty water so people and animals can drink it. Same buildings. Better idea.",
  },
];

// ─── Will / Will Not ─────────────────────────────────────────────────────────

export const willList = [
  "Deliver about $6.4 billion in long-term economic impact from the same land in Phase 1: their tax revenue and investment, plus 17 years of produce output, water sales, and land leases†",
  "Provide $1 billion in direct support for schools, infrastructure, and local services through bond payments conditioned on jobs and emissions targets actually being met",
  "Fund the $269.5 million, 5 million gallon a day brackish desalination system that NMSU designed for Santa Teresa in 2023, instead of writing a $50 million check",
  "Fund a $50 million NMSU and Doña Ana Community College institute for power, water, greenhouse, and hardware careers, with guaranteed local placement",
  "Create about 7,500 construction jobs and about 3,000 permanent jobs in Phase 1: the same 1,500 data center roles plus up to about 1,000 in greenhouses, 250 in water and capture operations, and 250 in hardware refurbishment and training (estimates)",
  "Pay full-time salaries averaging $75K–$100K plus benefits for tech roles, and living wages with benefits in every third-party greenhouse and water contract",
  "Use the same Bloom Energy fuel cells, capture-ready before the first cell turns on, with capture metered against a 90 to 95% target and the federal 45Q credit paying toward it",
  "Run continuous stack monitors on every fuel-cell cluster, published on a public dashboard, with permit limits set for the capture configuration",
  "Tap the warm-water header before the dry coolers with one heat exchanger, sending heat to greenhouse root zones in winter and desalination preheat in summer, and rejecting the rest through the same dry coolers with zero water",
  "Grow up to about 60 million pounds of produce a year on 150 acres at industry yields, with far fewer pesticides than field farming, run by commercial growers who lease the land and use their own gate and road",
  "Put solar on every roof and parking canopy, sized honestly, to run the greenhouses, water plant, and offices",
  "Keep every promise on their list that is already good: privately funded infrastructure, no ratepayer impact, closed-loop cooling, no potable water for operations",
];

export const willNotList = [
  "Release 8.8 million tons of CO₂ a year, more than Albuquerque and Las Cruces combined, with no capture",
  "Run 2,275 stacks on smog estimates from four tests of one 65 kW unit, with no continuous stack monitor",
  "Blow gigawatts of usable heat into the Chihuahuan Desert with fans",
  "Count \"carbon-free energy matching by 2031\" as clean air. Matching is accounting. Capture is physical",
  "Take a property-tax abatement on up to $165 billion of property with no conditions on emissions, heat or water production",
  "Count a gas plant as net-zero through methane offsets, which HB93's definition allows, while every public utility in New Mexico must follow the Energy Transition Act",
  "Build anything outside the 819 acres, or move a single building they have already drawn",
  "Ask the County for funding, borrow public money, or expose taxpayers to financial risk. That promise stays",
];

// ─── Updates ─────────────────────────────────────────────────────────────────

export const updatesLead =
  "As of July 2026, more than 2,700 team members, including nearly 700 New Mexico residents, have worked a total of more than 2 million hours. The concrete is being poured now. The upgrade has to be attached now, before the fuel cells arrive.";

export const upgradeProgress = [
  { label: "CARBON CAPTURED", pct: 0 },
  { label: "HEAT REUSED", pct: 0 },
  { label: "WATER PRODUCED", pct: 0 },
];

// ─── Impact tabs (their rows kept, an Upgraded column added) ─────────────────

export const impactTabs: TabPanel[] = [
  {
    title: "About $6.4 Billion in Long-Term Economic Impact (Estimate)",
    table: {
      head: ["Economic Impact", "Annual Average", "Duration (Years)", "Their Total", "+ Upgrade", "= Upgraded Total (Phase 1)"],
      rows: [
        ["Gross Receipts Tax / Sales Tax During Construction", "—", "3", "$600M", "+ $50M", "$650M"],
        ["Additional Estimated Economic Activity During Construction", "~$384M → ~$415M", "3", "$1.15B", "+ $100M", "$1.25B"],
        ["Gross Receipts Tax / Sales Tax During Operations (1)(2)", "$40M → $42M", "17", "$680M", "+ $40M", "$720M"],
        ["Additional Economic Activity During Operations (1)(2)", "~$113M → ~$155M", "17", "$1.92B", "+ $680M", "$2.6B"],
        ["Industrial Revenue Bond – Schools, Infrastructure, Services (3)", "$12M → $33M", "30", "$360M", "+ $640M", "$1.0B"],
        ["Workforce Development & Community Programs (4)", "—", "—", "$6.9M", "+ $43M", "$50M"],
        ["Greenhouse Land Lease & Heat Sales to Growers (5)", "~$7M", "17", "—", "+ $120M", "$120M"],
        ["Total", "", "", "$4.7B", "+ $1.7B", "$6.4B"],
      ],
    },
  },
  {
    title: "Thousands of Jobs",
    table: {
      head: ["Job Type", "Their Projection", "Upgraded, Phase 1", "Upgraded, Full Build"],
      rows: [
        ["Construction Workers", "7,000", "~7,500", "~8,000"],
        ["Ongoing Data Center Roles Once Operational", "1,500", "1,500", "1,500"],
        ["Greenhouse Growing, Packing & Logistics (third-party growers, ~6.5 jobs per acre)", "—", "~1,000 (150 acres)", "~2,600 (400 acres)"],
        ["Water Plant & Carbon-Capture Operations", "—", "~250", "~300"],
        ["Hardware Refurbishment & NMSU / DACC Institute", "—", "~250", "~400"],
        ["Total Permanent Jobs", "1,500", "~3,000", "~4,800"],
      ],
    },
  },
  {
    title: "Water: Producer, Not Consumer",
    table: {
      head: ["Water", "Their Plan", "Upgraded Plan", "Potable vs. Non-Potable"],
      rows: [
        ["Data Center Closed-Loop Cooling", "One-time fill: 2.5M gallons per building. Top-offs: 0–1,000 gal/yr", "Same", "Non-potable"],
        ["Bloom Fuel Cell System", "One-time fill: 960,000 gal. Top-offs: 167,000 gal/yr", "Same", "Non-potable"],
        ["Employee Use (kitchens, bathrooms)", "20,000 gal/day average", "Same", "Potable"],
        ["Brackish Desalination Plant, NMSU 2023 design (5)", "$50M check to CRRUA", "5 MGD reverse osmosis, 75% recovery, $269.5M whole system, brine to two deep injection wells", "Potable"],
        ["Greenhouse Irrigation", "—", "Recirculating hydroponics: ~90% less water per pound of food than open fields", "Desalinated"],
        ["Net Campus Water Balance", "About 9 households consumed", "Net producer: 5 MGD is close to CRRUA's entire projected 2027 demand of 6 MGD", ""],
      ],
    },
  },
  {
    title: "Clean Air",
    table: {
      head: ["Emissions", "Their Reduction vs. Original Design", "Upgraded Reduction vs. Original Design"],
      rows: [
        ["Nitrogen Oxides (NOx, smog)", "92% (37 tons a year in the draft permit)", "Same fuel cells; every cluster on a continuous public monitor"],
        ["Particulate Air Pollution", "83%", "83%+"],
        ["Carbon Monoxide (CO)", "67%", "67%+"],
        ["Carbon Dioxide (CO₂)", "21%", "90 to 95% capture target, metered (dried exhaust is ~95% CO₂)"],
        ["CO₂ Actually Released Each Year", "8.8 million tons permitted", "0.4 to 0.9 million tons at the capture target, falling as the share of energy from gas falls"],
      ],
    },
  },
];

// ─── Key components tabs ─────────────────────────────────────────────────────

export const keyComponentTabs: TabPanel[] = [
  {
    title: "The Same Campus, Read Off Their Render",
    paragraphs: [
      "Their August 2026 site render labels eleven things: four data centers, a warehouse, an operations building, a secure entrance and exit, a guard booth, a security fence, a transformer yard, modular chiller plants marked closed loop, and rows of dry coolers on the far edge. The upgrade moves none of them. Cars still enter at the guard booth and park at Operations. Trucks still unload at the Warehouse. The transformer yard still steps the microgrid's power down for the servers.",
      "Two things the render does not show. First, the fuel cells: NMED's permit places a 2,462 MW plant with 2,275 exhaust stacks about 3.6 miles south of Santa Teresa, fed by a pipeline of up to 400 million cubic feet a day. Second, the property line. The signed agreement says about 819 acres with a 400-acre first phase; the render shows that phase. Which acres are unbuilt has not been published.",
    ],
    sources: ["render", "notice", "sob", "cba", "dcd-pipeline"],
  },
  {
    title: "How the Cooling Works, and Our One Pipe",
    paragraphs: [
      "A chip turns almost all of its electricity into heat. Water flows across cold plates on the chips, leaves warm at roughly 45 to 65 °C (113 to 149 °F), and has to dump that heat somewhere. Dry coolers are giant radiators: fans blow desert air over finned coils. No water evaporates, which is why the campus is closed loop. Air carries heat poorly, so the coil rows are enormous and sit on the edge for airflow. The modular chiller plants are the hot-day backup. A dry cooler cannot get water more than a few degrees below the air temperature, so on a 40 °C (104 °F) afternoon mechanical chillers run and burn electricity.",
      "The upgrade is one plate heat exchanger in the warm-water header before the dry coolers. Greenhouses and desalination preheat draw heat first. The dry coolers reject only what is left. Every kilowatt we take is fan and chiller electricity they no longer pay for.",
      "Honest limit: 2.45 gigawatts of compute makes about 2.4 gigawatts of heat. One hundred fifty acres of greenhouses draw about 90 megawatts on the coldest night and far less on average. Desalination preheat draws about 15. The rest still goes through the same dry coolers, with zero water. We reuse the heat that creates jobs, food, and water, and we say so.",
    ],
    sources: ["render", "waterpdf", "faq", "sweden"],
  },
  {
    title: "Carbon Capture on the Fuel Cells",
    paragraphs: [
      "Bloom Energy solid-oxide fuel cells do not burn gas in a flame. They run an electrochemical reaction at 700 to 900 °C (1,300 to 1,650 °F), which is why their smog emissions are far lower than a turbine's. NMED's draft Statement of Basis says the depleted anode exhaust is about 95 percent carbon dioxide once dried, versus a few percent in turbine exhaust. That is why Bloom and Chart Industries announced a capture product for it in February 2025. No plant runs it yet, and the best capture plants operating anywhere sustain 50 to 75 percent, so the lease condition is metered tons against a 90 to 95 percent target. Skid-mounted units ship in containers like the fuel cells and bolt onto the exhaust side.",
      "The energy penalty is real, roughly 5 to 15 percent of output, which means more fuel cells and more gas, and permit limits that must be set for that configuration. That is the honest price of not releasing 8.8 million tons a year; the federal 45Q credit, $85 a ton for 12 years, repays most of it. Captured CO₂ goes two places: a small share into the greenhouses at 800 to 1,200 ppm, where it speeds growth by 20 to 30 percent, and the bulk into permanent geologic storage. New Mexico has no approved Class VI injection wells yet, so the realistic path is a pipeline of about 200 miles to permitted Permian Basin storage in Texas, four to five years of permitting, with a capture-ready build and a sequestration deadline written into the permit.",
      "The permit is a single Title V major source because carbon monoxide and volatile organics exceed 100 tons a year; nitrogen oxides are 37 tons. Those figures are scaled from four four-hour tests of one 65 kW unit, and the permit requires no continuous stack monitor. The upgrade asks for continuous monitors on every cluster with a public dashboard, and limits set for the capture configuration.",
    ],
    sources: ["sob", "sob-part-a", "notice", "bloom-co2", "bloom-chart", "irs-45q", "boundary-dam-2024"],
  },
  {
    title: "Water: The Plant NMSU Already Designed",
    paragraphs: [
      "Southern New Mexico sits on a vast brackish aquifer. NMSU's Dr. Pei Xu told the Legislature in October 2023 that the Mesilla Basin holds roughly 65 million acre-feet of economically recoverable fresh-to-brackish water, and presented a designed 5 million gallon a day reverse-osmosis plant for Santa Teresa: 75 percent recovery, two deep injection wells for brine about 20 miles away, $115.5 million for the treatment plant and $269.5 million for the whole system including wells, storage, and pipelines.",
      "The proof it works is 30 miles away. El Paso's Kay Bailey Hutchison plant has treated Hueco Bolson brackish water since 2007 at 27.5 million gallons a day and pipes its brine 22 miles to three injection wells. Reverse osmosis is the proven technology. Server heat helps by preheating the feed, which raises membrane throughput, and by concentrating brine so less has to be injected.",
      "Five million gallons a day is nearly all of CRRUA's projected 2027 demand of 6 MGD for Sunland Park and Santa Teresa. The CBA has the companies pay the county $250,000 toward a desalination study, and the county is now designing a 4 MGD plant of its own with $15 million of Jupiter tax money. Every promise on their water page stays: closed-loop cooling, a 20,000 gallon a day potable cap, no evaporative towers. The upgrade adds an output, and it costs 0.16 percent of the bond.",
    ],
    sources: ["nmsu", "epwater", "twdb", "cduaws", "cba", "haussamen-water", "cbd-well"],
  },
  {
    title: "150 Acres of Greenhouses, Then More",
    paragraphs: [
      "Top-tier glass hydroponic greenhouses grow 200 to 250 tons of tomatoes per acre per year, roughly ten times an open field, with about 90 percent less water per pound. Leafy greens go seed to harvest in 25 to 35 days. Tomatoes, peppers, and cucumbers first-harvest at 60 to 75 days and then produce for ten months on vertical trellises. Phase 1 is 150 acres beside the dry coolers: up to about 60 million pounds of food a year if mostly tomatoes, 30 to 45 million on a mixed crop, and 600 to 1,000 growing, packing, and trucking jobs at the 4 to 6.5 workers per acre of Southwest greenhouses in Marfa and Willcox.",
      "Winter nights in Santa Teresa drop into the 20s and 30s °F (about −5 to 2 °C), and crops need roots held at 68 to 72 °F (20 to 22 °C). Growers normally burn gas or propane for that. Here the heat is sold at cost. Summer cooling is evaporative pads and shade, the way Arizona greenhouses already do it, which uses water: about 1 to 1.6 million gallons a day for 150 acres in summer, so the towns' 5 MGD must be ring-fenced. Sealed bays keep most field pests out, so pesticide use is far lower and mostly biological control. Sensors and computer vision run climate, nutrients, and harvest, as in the Netherlands.",
      "Oracle and STACK do not farm. Established growers lease the land, buy the heat and CO₂, and use their own public gate so produce trucks never touch the secure server entrance. Acreage and location depend on which of the roughly 819 acres are unbuilt, which the developers have not published. Every yield and staffing figure here is an industry average, not a Santa Teresa study.",
    ],
    sources: ["cba", "epm-jobs", "sweden", "sob"],
  },
  {
    title: "The Desert Gets Greener",
    paragraphs: [
      "Do this for twenty years and the land changes. Desalinated water beyond what the greenhouses need goes to CRRUA and to restoring the sod farms west of Sunland Park whose water rights the project acquired. The 125-acre buffer becomes a native-plant wildlife corridor instead of a fence line. Local food replaces produce trucked in from California and Mexico, cutting highway emissions on top of the capture at the stack.",
      "None of this is exotic. Dutch data centers sit beside greenhouse growers at Agriport A7, and Germany now requires data centers to reuse a share of their heat. Bloom and Chart have announced capture for fuel cells. El Paso has desalinated brackish water for nearly twenty years and recharged reclaimed water for forty. HB93 requires this microgrid to count as net-zero by 2045, though its definition allows methane offsets. The only thing missing in Santa Teresa is a lease clause, negotiated in, that says the developers have to start now.",
    ],
    sources: ["agriport", "enefg", "bloom-chart", "epwater", "epwater-recharge", "cba", "nmsa-62-17-12"],
  },
];

// ─── IRB ─────────────────────────────────────────────────────────────────────

export const irbSubhead = "No Financial Risk to County. Conditions Attached.";

export const irbPoints = [
  { label: "KICKSTARTING BIG INVESTMENTS:", text: "IRBs are how counties attract projects like this. The upgrade keeps the bonds. It attaches conditions to them." },
  { label: "$165B WITH STRINGS:", text: "The bond cap signals the investment. About 2.5% of it, most repayable by the federal capture credit, buys metered capture, heat to growers, and the NMSU water plant. The county should not abate property tax on up to $165 billion of property with no conditions on emissions, heat or water." },
  { label: "JOBS TIED TO ABATEMENTS:", text: "Tax benefits scale with permanent jobs actually delivered and verified each year, not with a projection on a website." },
  { label: "NO COUNTY RISK:", text: "Unchanged. Doña Ana County spends no money and takes on no debt. Growers finance their own greenhouses." },
  { label: "FINANCIAL BENEFIT TO DOÑA ANA COUNTY:", text: "$1 billion in payments in lieu of taxes over 30 years, about $33M a year instead of $12M, plus lease revenue from 150 acres of greenhouses." },
  { label: "HOW IT WORKS:", text: "Same structure: the County owns the site and leases it back. The lease can be changed only by agreement, so the six clauses are negotiated in at the next consent the companies need, as Sandoval County did with Intel: capture-ready stacks with metered capture, continuous monitors, heat offered to growers, the water plant funded, bonds tied to jobs, and a closure and monitoring bond." },
];

// ─── Resources ───────────────────────────────────────────────────────────────

export const resources = [
  { title: "The Blueprint", desc: "Interactive 819-acre site plan and every process, theirs and ours", href: "/blueprint" },
  { title: "The Upgrade", desc: "Every metric, theirs and ours, side by side", href: "/#highlights" },
  { title: "The Science", desc: "Heat, carbon, water, and greenhouses, explained", href: "/science" },
  { title: "Legislators", desc: "Who to call and what to say", href: "/legislators" },
  { title: "Petition", desc: "Add your name to force the upgrade", href: "/petition" },
  { title: "The Three Bills", desc: "Microgrid Oversight, Waste-Heat Reuse, Data Center Standards", href: "/legislators#bills" },
  { title: "FAQ", desc: "Their questions, answered with sources", href: "/faq" },
  { title: "Sources", desc: "Every document behind every number", href: "/sources" },
];

export const sources = [
  { title: "NMED Air Permit 10883", desc: "Draft permit and Statement of Basis, Yucca Growth Infrastructure microgrid", href: "https://www.env.nm.gov/public-notices/yucca-growth-infrastructure-llc-ygi-microgrid/" },
  { title: "NMSU Desalination Study", desc: "Dr. Pei Xu, 5 MGD Santa Teresa design, Oct. 2023", href: "https://www.nmlegis.gov/handouts/STTC%20103023%20Item%208%20Santa%20Teresa%20Brackish%20water%20desalination.pdf" },
  { title: "Their Labeled Site Render", desc: "Project Jupiter Together media gallery, Aug. 27, 2026", href: "https://projectjupitertogether.com/wp-content/uploads/2026/08/Project-Jupiter-Site-Render_Labeled-8.27.26-Website.jpg" },
];

// ─── Disclaimers ─────────────────────────────────────────────────────────────

export const disclaimers = [
  "† Upgraded figures are estimates prepared for this proposal, not audited projections. They take Project Jupiter Together's own IMPLAN-based totals as the baseline and add: 17 years of Phase 1 produce output, water sales, and greenhouse land leases (heat sold near propane parity); the $269.5M NMSU-designed desalination system; a conditioned $1B bond agreement; and a $50M training institute. They assume the same air permit and pipeline approvals the original plan assumes, plus capture installed before power-on.",
  "Emissions figures come from NMED's draft Permit 10883, Part A, Table 102.A (8,820,970 tons CO₂e per year; NOx 37.2, CO 161.2, VOC 124.0, PM 75.4 tons per year) and its Statement of Basis (exhaust about 95 percent CO₂ once dried; the applicant's 10,144,115-ton figure was reduced). Capture rates of 90 to 95% are a target; no operating plant has sustained them for a decade. Greenhouse yields (200 to 250 tons per acre per year for tomatoes), 5 to 8 workers per acre, and water savings reflect controlled-environment agriculture industry averages. Desalination capacity, recovery, and cost are from the NMSU feasibility study presented to the Legislature on October 31, 2023. Site acreage: the executed Community Benefits Agreement says about 819 acres with a 400-acre first phase; early news reports said 1,400. Map positions are traced from the August 2026 render and are not survey-accurate. Full citations on the Sources page.",
  "(1)–(4) as in the original Project Jupiter Together disclaimer, reproduced in the dropdown above. (5) New line items introduced by this proposal.",
];

export const footerText = `Website built by ${author} | Not affiliated with Oracle, STACK Infrastructure, or Project Jupiter Together | Copyright © 2026 Force Upgrade Project Jupiter`;

// ─── Legislators page ────────────────────────────────────────────────────────

export const commissioners = [
  { district: "District 1", name: "Christopher Schaljo-Hernandez", role: "", phone: "(575) 525-5808", email: "schaljohernandez@donaana.gov" },
  { district: "District 2", name: "Gloria Gameros", role: "Vice Chair", phone: "(575) 525-5804", email: "ggameros@donaana.gov" },
  { district: "District 3", name: "Susie Kimble", role: "", phone: "(575) 525-5807", email: "skimble@donaana.gov" },
  { district: "District 4", name: "Susana Chaparro", role: "", phone: "(575) 525-5810", email: "schaparro@donaana.gov" },
  { district: "District 5", name: "Manuel A. Sanchez", role: "Chair", phone: "(575) 525-5809", email: "msanchez@donaana.gov" },
];

export const commissionMeeting =
  "The Board of County Commissioners meets at 9 a.m. on the second and fourth Tuesday of each month in the Commission Chambers, 845 N. Motel Blvd., Las Cruces, NM 88007. Public comment is three minutes per person.";

export const stateSenators = [
  { district: "Senate 31", name: "Joseph Cervantes" },
  { district: "Senate 36", name: "Jeff Steinborn" },
  { district: "Senate 37", name: "William Soules" },
  { district: "Senate 38", name: "Carrie Hamblen", note: "Co-sponsor of the proposed statewide data center moratorium" },
];

export const stateReps = [
  { district: "House 33", name: "Micaela Lara Cadena", note: "Lead sponsor of the proposed statewide data center moratorium" },
  { district: "House 34", name: "Raymundo Lara" },
  { district: "House 35", name: "Angelica Rubio", note: "Co-sponsor of the proposed statewide data center moratorium" },
  { district: "House 36", name: "Nathan Small" },
  { district: "House 37", name: "Joanne Ferrary" },
  { district: "House 52", name: "Doreen Gallegos" },
  { district: "House 53", name: "Sarah Silva" },
];

export const nmlegisUrl = "https://www.nmlegis.gov/Members/Legislator_List";

export const bills = [
  {
    name: "Microgrid Oversight Act",
    status: "Real bill. Senate Bill 235 passed the New Mexico Senate in the 2026 session and died in the House. Sponsors plan to reintroduce it in 2027.",
    pitch: "If public utilities have to follow the Energy Transition Act, a private data center microgrid should not get a free pass to pollute.",
    ask: "Reintroduce and pass it. Add a clause requiring point-source carbon capture on any fossil-fueled behind-the-meter generation over 100 MW.",
  },
  {
    name: "Statewide data-center moratorium (proposed)",
    status: "Real proposal, no bill text yet. Announced July 2026 by Rep. Micaela Lara Cadena, Sen. Carrie Hamblen, Rep. Eleanor Chávez, and Rep. Angelica Rubio for the 2027 session. \"Data Center Standards\" is this site's shorthand for what the bill could carry.",
    pitch: "Pause new hyperscale permits until the state has rules for water, emissions, ratepayers, and community benefit.",
    ask: "Support it, and write the standards so a project that meets them, capture, one air permit, heat reuse, conditioned bonds, can proceed on its existing timeline.",
  },
  {
    name: "Industrial Symbiosis & Waste-Heat Reuse Mandate",
    status: "Proposed by this campaign. Modeled on Dutch and Scandinavian rules that require data centers to route heat into district heating or agriculture.",
    pitch: "Any facility over 500 MW must offer its waste heat to greenhouses, water treatment, or district heating before venting it.",
    ask: "Ask your representative to sponsor it. The text can be short: a heat off-take requirement, a right of first refusal for local growers, and a reporting rule.",
  },
];

export const talkingPoints = [
  "My name is ____ and I live in ____. I do not want Project Jupiter as it is filed. I want it only if it is upgraded: no conditions in the lease, no data center. Here is what to write in.",
  "Their draft permit allows 8.8 million tons of carbon a year, more than Albuquerque and Las Cruces combined, for 750 binding jobs, with smog estimated from one small test unit and never measured.",
  "The exhaust from their fuel cells is about 95% CO₂ once dried. Bloom has announced capture for it and the federal credit pays $85 a ton. Require capture-ready stacks and a meter before power-on.",
  "Their servers make hot water. In Sweden and the Netherlands that heat grows food. Require them to offer it to growers on the 150 empty acres beside the dry coolers. That is 1,000 more jobs.",
  "NMSU already designed a 5 million gallon a day desalination plant for Santa Teresa. It costs $269.5 million, 0.16% of their bond. Make them fund it.",
  "Same land. Same buildings. About 2.5% more, most of it repayable by the federal capture credit. Negotiate the conditions into the leases at the next consent the companies need.",
];

// ─── Petition ────────────────────────────────────────────────────────────────

export const petitionText = [
  "To the Doña Ana County Board of Commissioners, the New Mexico Environment Department, and the New Mexico Legislature:",
  "We do not ask you to cancel Project Jupiter. We ask you to force its upgrade. Before the first fuel cell turns on in Santa Teresa, make the following conditions binding on the air permit, the water permits, and the $165 billion in Industrial Revenue Bonds:",
];

/** The six conditions. Each says what we ask, what their filed plan does today, and why it matters, in plain words. */
export const petitionDemands: { ask: string; theirs: string; why: string }[] = [
  {
    ask: "Capture-ready fuel-cell stacks from the first day of operation, with capture metered against a 90% target once the storage line is connected (about year 5) and the results public.",
    theirs: "8.8 million tons of CO₂ a year are permitted to go straight into the sky. No capture is planned.",
    why: "The exhaust is about 95% CO₂ once dried, the easiest kind to catch; the maker of the fuel cells has announced the equipment, no plant runs it yet, and the federal 45Q credit pays $85 a ton toward it.",
  },
  {
    ask: "A continuous public air monitor on every fuel-cell cluster, with permit limits set for the capture configuration.",
    theirs: "The draft permit estimates 37 tons of NOx a year from four tests of one 65 kW unit, scaled to 2,275 stacks, and requires no continuous stack monitor.",
    why: "Sunland Park has failed the federal ozone standard since 2018 and this would be the largest fuel-cell plant in the world by about a hundred times. Public meters let anyone check the air the same day.",
  },
  {
    ask: "The computers' waste heat offered to greenhouse growers on the empty acres beside the cooling fans, local growers first.",
    theirs: "All the heat, about 2,400 megawatts, is blown into the desert by fans. The land beside them stays bare.",
    why: "About 150 acres of greenhouses would grow up to about 60 million pounds of food a year and add 600 to 1,000 jobs. Dutch data centers already sit beside greenhouse growers, and Germany requires data centers to reuse a share of their heat.",
  },
  {
    ask: "The NMSU-designed water plant built and handed to the towns' utility: 5 million gallons a day of clean water from salty groundwater, the towns' reclaimed water put back into the fresh aquifer under a state storage-and-recovery permit, and the unused part of the old farm's water right left in the aquifer in a State Engineer conservation program instead of pumped.",
    theirs: "Drinking water is taken from the local utility and more is pumped from the fresh aquifer. The signed deal has the companies fund a $250,000 study; the county is now designing a smaller plant with its own Jupiter tax money.",
    why: "The plant is already designed and priced at $269.5 million, about 0.16% of the bond. With the towns' fresh wells pumping far less and about 2 million gallons a day of reclaimed water going back underground, as El Paso has done since 1985 and Rio Rancho since 2017, the local decline slows. Leaving the farm right in a conservation program costs a filing, and state law protects an enrolled right from forfeiture.",
  },
  {
    ask: "The county tax break paid only as permanent jobs are verified each year, and a $50 million training institute on site so the jobs go to people who live here.",
    theirs: "The signed agreement binds the company to 750 jobs and $4 million for workforce programs. Whether missing the 750 is a lease default is not public; the leases are not posted.",
    why: "With greenhouses, the water plant and capture, about 3,000 permanent jobs are possible. The county's own IRB policy already allows repayment or higher payments when job goals are missed; verification makes the number real instead of advertised.",
  },
  {
    ask: "A closure and monitoring bond posted in the lease, sized by an independent engineer and revised every five years, so the wells, the land and the public meters are cared for after the companies are gone.",
    theirs: "The signed agreement's obligations run only as long as the bonds are outstanding. It has no decommissioning, restoration or bond clause; after the 30-year lease the shareholders own the site.",
    why: "Servers last five years, the lease thirty, the aquifer and the stored CO₂ far longer. Doña Ana County already requires this bond of solar farms. It is the only instrument written to outlive the companies.",
  },
];
