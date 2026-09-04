// "Force Upgrade Project Jupiter" — our replacement content.
// The original Project Jupiter Together text lives in ./jupiter.ts and is shown
// verbatim inside the "What they actually say" dropdown under every section.
//
// Numbers are Phase 1 unless marked "full build". Sources are in ./sources.ts and cited on the Sources page.

import type { TabPanel } from "@/data/jupiter";

export const siteName = "Force Upgrade Project Jupiter";
export const author = "Sebastian, an NMSU AI student";

export const LAST_UPDATED = "Sept. 2, 2026";

export const banner =
  "This is an upgrade proposal built on Project Jupiter's own plan, land, and timeline. Not affiliated with Oracle, STACK Infrastructure, or Project Jupiter Together. Every section keeps their original text one click away.";

export const nav = [
  { label: "HOME", href: "/" },
  { label: "THE UPGRADE", href: "/#highlights" },
  { label: "BLUEPRINT", href: "/blueprint" },
  { label: "THE SCIENCE", href: "/science" },
  { label: "LEGISLATORS", href: "/legislators" },
  { label: "PETITION", href: "/petition" },
  { label: "FAQ", href: "/faq" },
  { label: "SOURCES", href: "/sources" },
];

export const heroSubhead =
  "$6.6 billion in economic benefits, 3,000 permanent jobs, 5 million gallons of new water a day, fresh local food, and zero excuses for New Mexico.";

export const heroQuestion = "WHAT SHOULD PROJECT JUPITER MEAN FOR NEW MEXICO?";

export const heroBullets = [
  { strong: "$6.6 billion in economic benefits.", rest: " Same site, same timeline, about 1.5% more capital. $8 billion at full build." },
  { strong: "More good jobs.", rest: " 8,000+ construction jobs and 3,000 permanent jobs in Phase 1: the same 1,500 tech roles plus 1,500 in greenhouses, water, capture, and training. About 5,000 at full build." },
  { strong: "More water, not less.", rest: " Fund the 5 million gallon a day desalination plant NMSU already designed for Santa Teresa. Server heat preheats the feed." },
  { strong: "Clean air, not cleaner air.", rest: " NMED says the fuel-cell exhaust is about 95% CO₂ once dried. Capture 90 to 95% of it at the stack from day one, with continuous smog monitoring." },
  { strong: "Fresh local food.", rest: " About 150 acres of heated greenhouses on unbuilt land next to the dry coolers, growing about 60 million pounds a year, pesticide-free and certified local." },
  { strong: "", rest: "Project Jupiter can be the right, responsible data center for New Mexico. Right now it is not. Force the upgrade." },
];

export const ctaText = { before: "Click ", link: "HERE", after: " To Force The Upgrade of Project Jupiter" };

export const whatIsParagraphs = [
  "Project Jupiter is a data center campus in Santa Teresa, Doña Ana County, backed by $165 billion in county industrial revenue bonds. The signed Community Benefits Agreement describes a site of about 819 acres with a 400-acre first phase; news reports say 1,400. NMED's draft permit puts the fuel-cell plant's greenhouse gas at 10,144,115 tons a year, more than Albuquerque and Las Cruces combined, with each smog pollutant capped just under the 250-ton line that would trigger full review. The website promises 1,500 permanent jobs; the signed agreement requires 750. That is one binding job for roughly every 13,500 tons of carbon.",
  "The upgrade does not cancel the project. It keeps the same four data halls, the same fuel cells, the same fenced campus, and the same construction timeline, then bolts on what the developers left out. NMED's own permit review says the fuel cells' dried exhaust is about 95 percent carbon dioxide, which is why Bloom has already partnered with Chart Industries on capture. Capture skids go in the fuel-cell yard. One plate heat exchanger taps the warm-water header before the dry coolers and sends heat to 150 acres of greenhouses in winter and to desalination preheat in summer. The added cost is about 1.5 percent of the bond request.",
  "The upgrade also rebalances the deal. Instead of a $50 million check for water, the county gets the 5 million gallon a day brackish desalination plant that NMSU engineers designed and priced at $269 million in 2023. Instead of $360 million for schools over 30 years, a conditioned bond agreement delivers $1 billion. Instead of $6.9 million for workforce programs, a $50 million NMSU and DACC institute trains local residents for the jobs. Every number on this page is an estimate, labeled as such, and their original numbers are one click below each section so you can compare.",
];

export type UpgradeHighlight = {
  icon: "datacenter" | "water" | "school" | "community" | "helmet" | "emissions" | "energy" | "household";
  num: string;
  label: string;
  theirs: string;
  color: string;
};

export const highlights: UpgradeHighlight[] = [
  { icon: "datacenter", num: "$6.6B+", label: "IN LONG TERM ECONOMIC IMPACT, PHASE 1 († $8B AT FULL BUILD)", theirs: "$4.7B", color: "#15768c" },
  { icon: "water", num: "$269M", label: "THE NMSU-DESIGNED 5 MGD DESALINATION PLANT, FULLY FUNDED", theirs: "$50M", color: "#1f7ae0" },
  { icon: "school", num: "$1B+", label: "SCHOOLS, INFRASTRUCTURE & PUBLIC SERVICES OVER 30 YEARS", theirs: "$360M", color: "#d99a00" },
  { icon: "community", num: "$50M", label: "COMMUNITY & WORKFORCE PROGRAMS, INCLUDING AN NMSU / DACC TECH INSTITUTE", theirs: "$6.9M", color: "#e07b00" },
  { icon: "helmet", num: "11,000+", label: "WELL PAYING CONSTRUCTION & PERMANENT JOBS (3,000 PERMANENT IN PHASE 1)", theirs: "8,500+", color: "#2e8b57" },
  { icon: "emissions", num: "1", label: "MAJOR-SOURCE AIR PERMIT FOR THE WHOLE CAMPUS, WITH CONTINUOUS PUBLIC NOx MONITORING. NO PERMIT SPLITTING", theirs: "92% lower NOx", color: "#c0392b" },
  { icon: "energy", num: "90–95%", label: "OF CO₂ CAPTURED AT THE STACK FROM DAY ONE, NOT \"MATCHED\" BY 2031", theirs: "100% matching by 2031", color: "#2e8b57" },
  { icon: "household", num: "5M", label: "GALLONS PER DAY OF NEW CLEAN WATER MADE FROM SALTY GROUNDWATER", theirs: "~9 households used", color: "#1f7ae0" },
];

// ─── Speed & cost section ────────────────────────────────────────────────────

export const speedRows: { label: string; theirs: string; ours: string }[] = [
  { label: "Land", theirs: "About 819 acres per the signed CBA, 400 in the first phase; news reports say 1,400", ours: "The same site. Nothing added outside the property line; greenhouse acreage set from their unpublished site plan" },
  { label: "Construction footprint", theirs: "Four data halls, ops, warehouse, transformer yard, chiller plants, dry coolers, and a fuel-cell yard the render does not show", ours: "Every one of those stays where it is. Greenhouses and the water plant go on undeveloped acres beside the dry coolers" },
  { label: "Time to power online", theirs: "18 to 24 months, currently stalled by a Supreme Court stay on the air permit", ours: "18 to 24 months. Capture skids ship in containers like the fuel cells. Meeting the conditions is what un-stalls the permit" },
  { label: "Capital cost", theirs: "~$165B (the bond request)", ours: "~$167.4B, about 1.5% more. Growers finance their own greenhouses" },
  { label: "Who runs the greenhouses", theirs: "Nobody. Heat is blown into the desert by the dry coolers", ours: "Commercial growers lease 150 acres. Oracle and STACK sell them heat they are paying fans to throw away" },
  { label: "Permanent jobs", theirs: "750 full-time + 50 part-time, binding. 1,500 advertised", ours: "About 3,000 in Phase 1 including the binding 750, about 5,000 at full build" },
  { label: "CO₂ released per year", theirs: "10,144,115 tons permitted (NMED); developers expect ~40% less in practice", ours: "0.5 to 1.0 million tons with 90 to 95% capture. Zero only when gas is replaced, which HB93 requires by 2045" },
  { label: "Smog (NOx)", theirs: "One Title V permit, each pollutant capped under 250 tons/yr to stay out of PSD review", ours: "PSD-level controls anyway, continuous stack monitoring, public dashboard" },
  { label: "Water", theirs: "Takes 20,000 gal/day of drinking water (signed cap); pulls an undisclosed amount more from a fresh-aquifer farm right; pumped 103M gallons for construction; gives a $50M cheque", ours: "Makes 5 million gallons a day of clean water from salty groundwater nobody can drink, using the plant NMSU designed, and puts it in CRRUA's pipes" },
  { label: "Solar", theirs: "None", ours: "Every roof and parking canopy. Honestly under 1% of campus load, but enough to run the greenhouses, water plant, and offices" },
  { label: "Food", theirs: "None", ours: "About 60 million pounds a year in Phase 1, pesticide-free, certified local" },
  { label: "Lawsuits and delays", theirs: "Supreme Court stays, paused permits, pipeline denied twice, open-meetings suits", ours: "Conditions met up front become the settlement that lets permits move" },
];

export const pitches = [
  {
    title: "If you run the company",
    body: "You do not farm, and you do not run a water plant. You lease 150 acres you are not using to growers, sell them heat your dry-cooler fans are already paid to reject, and bolt Chart capture skids onto exhaust that is half pure CO₂. It adds about 1.5% to the budget, ends the litigation that has your air permit frozen, and gives you the cleanest hyperscale site in the country to put on your earnings call.",
  },
  {
    title: "If you hold the vote",
    body: "You approved $165 billion in bonds without conditions. The county owns the land during the bond term and leases it back. Write the conditions into that lease: capture on before power-on, one air permit, heat offered to growers, the NMSU water plant funded, bonds tied to jobs delivered. Same timeline you already agreed to.",
  },
  {
    title: "If you are ten years old",
    body: "A computer gets hot when you play games for a long time. This place will have millions of computers. The company wants to blow the hot air into the desert with giant fans and burn gas that makes smoke. Instead, we can use the heat to grow tomatoes and strawberries in giant greenhouses all winter, and clean salty water so people and animals can drink it. Same buildings. Better idea.",
  },
];

// ─── Will / Will Not ─────────────────────────────────────────────────────────

export const willList = [
  "Deliver more than $6.6 billion in long-term economic impact from the same land in Phase 1: their tax revenue and investment, plus 17 years of produce output, water sales, and land leases†",
  "Provide $1 billion in direct support for schools, infrastructure, and local services through bond payments conditioned on jobs and emissions targets actually being met",
  "Fund the $269 million, 5 million gallon a day brackish desalination system that NMSU designed for Santa Teresa in 2023, instead of writing a $50 million check",
  "Fund a $50 million NMSU and Doña Ana Community College institute for power, water, greenhouse, and hardware careers, with guaranteed local placement",
  "Create 8,000+ construction jobs and 3,000 permanent jobs in Phase 1: the same 1,500 data center roles plus about 1,000 in greenhouses, 250 in water and capture operations, and 250 in hardware refurbishment and training",
  "Pay full-time salaries averaging $75K–$100K plus benefits for tech roles, and living wages with benefits in every third-party greenhouse and water contract",
  "Use the same Bloom Energy fuel cells, with point-source carbon capture on the exhaust before the first cell turns on, removing 90 to 95% of CO₂",
  "Operate under one major-source air permit with continuous stack monitoring published on a public dashboard",
  "Tap the warm-water header before the dry coolers with one heat exchanger, sending heat to greenhouse root zones in winter and desalination preheat in summer, and rejecting the rest through the same dry coolers with zero water",
  "Grow about 60 million pounds of pesticide-free, certified-local produce a year on 150 acres, run by commercial growers who lease the land and use their own gate and road",
  "Put solar on every roof and parking canopy, sized honestly, to run the greenhouses, water plant, and offices",
  "Keep every promise on their list that is already good: privately funded infrastructure, no ratepayer impact, closed-loop cooling, no potable water for operations",
];

export const willNotList = [
  "Release 10 to 14 million tons of CO₂ a year, more than Albuquerque and Las Cruces combined",
  "Split one campus into several sub-250-ton smog permits to avoid a full Clean Air Act review",
  "Blow gigawatts of usable heat into the Chihuahuan Desert with fans",
  "Count \"carbon-free energy matching by 2031\" as clean air. Matching is accounting. Capture is physical",
  "Take $165 billion in tax abatements without conditions attached to jobs, emissions, or water",
  "Use the \"behind-the-meter\" microgrid loophole to sidestep the clean-energy standards every public utility in New Mexico must follow",
  "Build anything outside the 1,400 acres, or move a single building they have already drawn",
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
    title: "$6.6 Billion in Long-Term Economic Impact",
    table: {
      head: ["Economic Impact", "Annual Average", "Duration (Years)", "Their Total", "+ Upgrade", "= Upgraded Total (Phase 1)"],
      rows: [
        ["Gross Receipts Tax / Sales Tax During Construction", "—", "3", "$600M", "+ $50M", "$650M"],
        ["Additional Estimated Economic Activity During Construction", "~$384M → ~$415M", "3", "$1.15B", "+ $100M", "$1.25B"],
        ["Gross Receipts Tax / Sales Tax During Operations (1)(2)", "$40M → $42M", "17", "$680M", "+ $40M", "$720M"],
        ["Additional Economic Activity During Operations (1)(2)", "~$113M → ~$155M", "17", "$1.92B", "+ $680M", "$2.6B"],
        ["Industrial Revenue Bond – Schools, Infrastructure, Services (3)", "$12M → $33M", "30", "$360M", "+ $640M", "$1.0B"],
        ["Workforce Development & Community Programs (4)", "—", "—", "$6.9M", "+ $43M", "$50M"],
        ["Greenhouse Land Lease & Heat Sales to Growers (5)", "~$20M", "17", "—", "+ $340M", "$340M"],
        ["Total", "", "", "$4.7B", "+ $1.9B", "$6.6B"],
      ],
    },
  },
  {
    title: "Thousands of Jobs",
    table: {
      head: ["Job Type", "Their Projection", "Upgraded, Phase 1", "Upgraded, Full Build"],
      rows: [
        ["Construction Workers", "7,000", "8,000+", "9,000+"],
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
        ["Brackish Desalination Plant, NMSU 2023 design (5)", "$50M check to CRRUA", "5 MGD reverse osmosis, 75% recovery, $269M whole system, brine to two deep injection wells", "Potable"],
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
        ["Nitrogen Oxides (NOx, smog)", "92%", "92%, under one major-source permit with continuous public monitoring"],
        ["Particulate Air Pollution", "83%", "83%+"],
        ["Carbon Monoxide (CO)", "67%", "67%+"],
        ["Carbon Dioxide (CO₂)", "21%", "90 to 95% captured at the stack (exhaust is ~50% CO₂)"],
        ["CO₂ Actually Released Each Year", "10 to 14 million tons", "0.5 to 1.4 million tons. Zero requires replacing gas with geothermal or grid clean power in a later phase"],
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
      "Bloom Energy solid-oxide fuel cells do not burn gas in a flame. They run an electrochemical reaction at 700 to 900 °C (1,300 to 1,650 °F), which is why their smog emissions are far lower than a turbine's. NMED's draft Statement of Basis says the depleted anode exhaust is about 95 percent carbon dioxide once dried, versus a few percent in turbine exhaust. That is why Bloom has already partnered with Chart Industries to capture it. Skid-mounted capture units ship in containers like the fuel cells, bolt onto the exhaust side, and come online on the same schedule.",
      "The energy penalty is real, roughly 10 to 20 percent of output, which means more fuel cells and more gas. That is the honest price of not releasing 10 million tons a year. Captured CO₂ goes two places: a small share into the greenhouses at 800 to 1,200 ppm, where it speeds growth by 25 to 35 percent, and the bulk into permanent geologic storage. New Mexico has no approved Class VI injection wells yet, so the realistic path is a pipeline to Permian Basin storage in Texas, with a capture-ready build and a sequestration deadline written into the permit.",
      "The permit is already a single Title V major source, but each criteria pollutant is held just under 250 tons a year, which keeps it out of Prevention of Significant Deterioration review. The upgrade asks for PSD-level controls anyway, plus continuous stack monitors with a public dashboard.",
    ],
    sources: ["sob", "notice", "bloom-co2", "bloom-chart", "nmelc"],
  },
  {
    title: "Water: The Plant NMSU Already Designed",
    paragraphs: [
      "Southern New Mexico sits on a vast brackish aquifer. NMSU's Dr. Pei Xu told the Legislature in October 2023 that the Mesilla Basin holds roughly 65 million acre-feet of economically recoverable fresh-to-brackish water, and presented a designed 5 million gallon a day reverse-osmosis plant for Santa Teresa: 75 percent recovery, two deep injection wells for brine about 20 miles away, $115.5 million for the treatment plant and $269 million for the whole system including wells, storage, and pipelines.",
      "The proof it works is 30 miles away. El Paso's Kay Bailey Hutchison plant has treated Hueco Bolson brackish water since 2007 at 27.5 million gallons a day and pipes its brine 22 miles to three injection wells. Reverse osmosis is the proven technology. Server heat helps by preheating the feed, which raises membrane throughput, and by concentrating brine so less has to be injected.",
      "Five million gallons a day is nearly all of CRRUA's projected 2027 demand of 6 MGD for Sunland Park and Santa Teresa. The county is already paying $250,000 under the CBA to study a desalination plant. Every promise on their water page stays: closed-loop cooling, a 20,000 gallon a day potable cap, no evaporative towers. The upgrade adds an output, and it costs 0.16 percent of the bond.",
    ],
    sources: ["nmsu", "epwater", "twdb", "cduaws", "cba", "haussamen-water", "cbd-well"],
  },
  {
    title: "150 Acres of Greenhouses, Then More",
    paragraphs: [
      "Commercial glass hydroponic greenhouses grow 200 to 250 tons of tomatoes per acre per year, roughly ten times an open field, with about 90 percent less water. Leafy greens go seed to harvest in 25 to 35 days. Tomatoes, peppers, and cucumbers first-harvest at 60 to 75 days and then produce for ten months on vertical trellises. Strawberries fruit year-round under supplemental LEDs. Phase 1 is 150 acres beside the dry coolers, about 60 million pounds of food a year and about 1,000 growing, packing, and trucking jobs at the industry's 5 to 8 workers per acre.",
      "Winter nights in Santa Teresa drop into the 20s and 30s °F (about −5 to 2 °C), and crops need roots held at 68 to 72 °F (20 to 22 °C). Growers in New Mexico normally burn propane for that. Here the heat is free. Summer cooling is evaporative pads and shade, the way Arizona greenhouses already do it. Sealed bays mean no field pests, so no pesticides. Sensors, computer vision, and AI scheduling run climate, nutrients, and harvest, as in the Netherlands and China's automated farms.",
      "Oracle and STACK do not farm. Established growers lease the land, buy the heat and CO₂, and use their own public gate so produce trucks never touch the secure server entrance. Acreage and location depend on which of the roughly 819 acres are unbuilt, which the developers have not published. Every yield and staffing figure here is an industry average, not a Santa Teresa study.",
    ],
    sources: ["cba", "epm-jobs", "sweden", "sob"],
  },
  {
    title: "The Desert Gets Greener",
    paragraphs: [
      "Do this for twenty years and the land changes. Desalinated water beyond what the greenhouses need goes to CRRUA and to restoring the sod farms west of Sunland Park whose water rights the project acquired. The 125-acre buffer becomes a native-plant wildlife corridor instead of a fence line. Local food replaces produce trucked in from California and Mexico, cutting highway emissions on top of the capture at the stack.",
      "None of this is exotic. Sweden pipes data center heat into city greenhouses. Bloom and Chart are already selling capture for fuel cells. El Paso has desalinated brackish water for nearly twenty years. HB93 already requires this microgrid to be net-zero by 2045. The only thing missing in Santa Teresa is a lease clause that says the developers have to start now.",
    ],
    sources: ["sweden", "bloom-chart", "epwater", "cba"],
  },
];

// ─── IRB ─────────────────────────────────────────────────────────────────────

export const irbSubhead = "No Financial Risk to County. Conditions Attached.";

export const irbPoints = [
  { label: "KICKSTARTING BIG INVESTMENTS:", text: "IRBs are how counties attract projects like this. The upgrade keeps the bonds. It attaches conditions to them." },
  { label: "$165B WITH STRINGS:", text: "The bond size signals the investment. A 1.5% add-on buys capture, greenhouses, and the NMSU water plant. The county should not abate $165 billion in taxes for nothing in return." },
  { label: "JOBS TIED TO ABATEMENTS:", text: "Tax benefits scale with permanent jobs actually delivered and verified each year, not with a projection on a website." },
  { label: "NO COUNTY RISK:", text: "Unchanged. Doña Ana County spends no money and takes on no debt. Growers finance their own greenhouses." },
  { label: "FINANCIAL BENEFIT TO DOÑA ANA COUNTY:", text: "$1 billion in payments in lieu of taxes over 30 years, about $33M a year instead of $12M, plus lease revenue from 150 acres of greenhouses." },
  { label: "HOW IT WORKS:", text: "Same structure: the County owns the site and leases it back. The lease adds five clauses: capture before power-on, one air permit, heat offered to growers, the water plant funded, bonds tied to jobs." },
];

// ─── Resources ───────────────────────────────────────────────────────────────

export const resources = [
  { title: "The Blueprint", desc: "Interactive 1,400-acre site plan and every process, theirs and ours", href: "/blueprint" },
  { title: "The Upgrade", desc: "Every metric, theirs and ours, side by side", href: "/#highlights" },
  { title: "The Science", desc: "Heat, carbon, water, and greenhouses, explained", href: "/science" },
  { title: "Legislators", desc: "Who to call and what to say", href: "/legislators" },
  { title: "Petition", desc: "Add your name to force the upgrade", href: "/petition" },
  { title: "The Three Bills", desc: "Microgrid Oversight, Waste-Heat Reuse, Data Center Standards", href: "/legislators#bills" },
  { title: "FAQ", desc: "Their questions, answered with sources", href: "/faq" },
  { title: "Sources", desc: "Every document behind every number", href: "/sources" },
];

export const sources = [
  { title: "NMED Air Permit 10883", desc: "Yucca Growth Infrastructure microgrid application", href: "https://nmed.commentinput.com/comment/extra?id=tBWf3NmbZ&lang=en" },
  { title: "NMSU Desalination Study", desc: "Dr. Pei Xu, 5 MGD Santa Teresa design, Oct. 2023", href: "https://www.nmlegis.gov/handouts/STTC%20103023%20Item%208%20Santa%20Teresa%20Brackish%20water%20desalination.pdf" },
  { title: "Their Labeled Site Render", desc: "Project Jupiter Together media gallery, Aug. 27, 2026", href: "https://projectjupitertogether.com/wp-content/uploads/2026/08/Project-Jupiter-Site-Render_Labeled-8.27.26-Website.jpg" },
];

// ─── Disclaimers ─────────────────────────────────────────────────────────────

export const disclaimers = [
  "† Upgraded figures are estimates prepared for this proposal, not audited projections. They take Project Jupiter Together's own IMPLAN-based totals as the baseline and add: 17 years of Phase 1 produce output, water sales, and greenhouse land leases; the $269M NMSU-designed desalination system; a conditioned $1B bond agreement; and a $50M training institute. They assume the same air permit and pipeline approvals the original plan assumes, plus capture installed before power-on.",
  "Emissions figures come from NMED's draft Statement of Basis for permit 10883 (10,144,115 tons GHG per year; criteria pollutants each held under 250 tons per year; exhaust about 95 percent CO₂ once dried). Capture rates of 90 to 95% reflect vendor claims and published pilot results, not a guaranteed figure. Greenhouse yields (200 to 250 tons per acre per year for tomatoes), 5 to 8 workers per acre, and water savings reflect controlled-environment agriculture industry averages. Desalination capacity, recovery, and cost are from the NMSU feasibility study presented to the Legislature on October 31, 2023. Site acreage: the executed Community Benefits Agreement says about 819 acres with a 400-acre first phase; news reports say 1,400. Map positions are traced from the August 2026 render and are not survey-accurate. Full citations on the Sources page.",
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
    name: "Data Center Moratorium & Standards Act",
    status: "Real proposal. Announced July 2026 by Rep. Micaela Lara Cadena, Sen. Carrie Hamblen, Rep. Eleanor Chávez, and Rep. Angelica Rubio for the 2027 session.",
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
  "I study artificial intelligence at NMSU. I want this data center in New Mexico. I want it built right.",
  "Their own permit filings say 10 to 14 million tons of carbon a year and 500 tons of smog, for 1,500 permanent jobs.",
  "The exhaust from their fuel cells is about half pure CO₂. Bloom already sells capture for it. Require it before power-on.",
  "Their servers make hot water. In Sweden and the Netherlands that heat grows food. Require them to offer it to growers on the 150 empty acres beside the dry coolers. That is 1,000 more jobs.",
  "NMSU already designed a 5 million gallon a day desalination plant for Santa Teresa. It costs $269 million, 0.16% of their bond. Make them fund it.",
  "Same land. Same timeline. About 1.5% more money. Attach the conditions to the $165 billion in bonds you already approved.",
];

// ─── Petition ────────────────────────────────────────────────────────────────

export const petitionText = [
  "To the Doña Ana County Board of Commissioners, the New Mexico Environment Department, and the New Mexico Legislature:",
  "We do not ask you to cancel Project Jupiter. We ask you to force its upgrade. Before the first fuel cell turns on in Santa Teresa, make the following conditions binding on the air permit, the water permits, and the $165 billion in Industrial Revenue Bonds:",
];

export const petitionDemands = [
  "Point-source carbon capture installed and operating on all fuel-cell exhaust before power-on, removing at least 90% of CO₂, with a sequestration plan and deadline.",
  "One major-source air permit for the whole campus, with continuous stack monitoring published on a public dashboard. No permit splitting.",
  "Server waste heat offered to commercial greenhouse operators on the undeveloped acres beside the dry coolers, with local growers given first refusal.",
  "The NMSU-designed 5 million gallon a day brackish desalination system fully funded and delivered to CRRUA.",
  "Bond tax abatements tied to permanent jobs verified each year, and a funded NMSU and Doña Ana Community College institute so the jobs go to people who already live here.",
];
