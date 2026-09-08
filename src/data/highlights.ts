// Highlight pairs. `theirs` is quoted exactly from projectjupitertogether.com (see ./jupiter.ts).
// `ours` answers the same line in our own honest terms. `explain` is shown when the card is clicked.

export type HighlightPair = {
  icon: "datacenter" | "water" | "school" | "community" | "helmet" | "emissions" | "energy" | "household";
  color: string;
  ours: { num: string; label: string };
  theirs: { num: string; label: string };
  explain: string;
  math?: string;
  sources: string[];
  /** wording for a specific audience; numbers never change */
  voices?: Partial<Record<"legislator" | "business" | "kid", { label: string; explain?: string }>>;
};

export const highlightPairs: HighlightPair[] = [
  {
    icon: "datacenter",
    color: "#15768c",
    ours: { num: "$4.7B + $1.7B", label: "THEIR ECONOMIC IMPACT, PLUS ABOUT $1.7B MORE FROM FOOD, WATER, LEASES AND HIGHER PAYMENTS (PHASE 1, ESTIMATE†)" },
    theirs: { num: "$4.7B", label: "IN LONG TERM ECONOMIC IMPACT*" },
    explain: "We start from their own IMPLAN-based total and add only what the upgrade creates: 17 years of greenhouse produce, water sales and greenhouse land leases, a conditioned $1 billion bond payment schedule, and a $50 million institute. Their footnote applies to ours too: it assumes the air permit and pipeline are approved.",
    math: "$4.7B (theirs) + $0.12B leases and heat sales (heat near propane parity) + $0.64B higher bond payments + $0.68B added operating activity + $0.19B construction and workforce ≈ $1.7B more ≈ $6.4B.",
    sources: ["bocc", "econpdf", "cba"],
    voices: {
      legislator: { label: "THEIR FISCAL-IMPACT TOTAL, PLUS ABOUT $1.7B IN LEASE, WATER AND CONDITIONED-PILT REVENUE (PHASE 1, ESTIMATE†)", explain: "Their $4.7 billion is the IMPLAN estimate in their county presentation and assumes permit and pipeline approval. The $1.7 billion is what the six lease conditions add: greenhouse leases and heat sales, water sales, a conditioned $1 billion PILT schedule, and the institute. Same basis, same caveat, both cited, and our additions are estimates built on their total, not an independent study." },
      business: { label: "THEIR ECONOMIC IMPACT, PLUS ABOUT $1.7B OF NEW REVENUE LINES: LEASES, HEAT, WATER, PILT (PHASE 1, ESTIMATE†)" },
      kid: { label: "MORE MONEY FOR THE TOWN THAN THEY PROMISED", explain: "They say the project brings $4.7 billion. Our plan adds about $1.7 billion more, from selling food, water and heat, and from paying more to schools." },
    },
  },
  {
    icon: "water",
    color: "#1f7ae0",
    ours: { num: "$269.5M", label: "A 5-MILLION-GALLON-A-DAY DESALINATION PLANT, ALREADY DESIGNED BY NMSU, BUILT AND HANDED TO CRRUA" },
    theirs: { num: "$50M", label: "WATER SYSTEM IMPROVEMENTS" },
    explain: "Their $50 million is a cheque to CRRUA for pipes: about $25 million collected so far, held by the state and expected to reach the county in early 2027. NMSU priced a complete 5 MGD brackish reverse-osmosis system for Santa Teresa at $269.5 million in 2023: wells, plant, storage, brine injection wells and lines. The county is already designing a smaller 4 MGD plant with $15 million of Jupiter tax money. Have the developer fund the full plant instead, and keep the tax money.",
    math: "$269.5M ÷ $50,000M first phase = 0.54%; ÷ $165,000M bond cap = 0.16% (a ceiling, not cash).",
    sources: ["nmsu", "bocc", "cba", "epm-water-fund", "star-plant"],
    voices: {
      legislator: { label: "THE NMSU-DESIGNED 5 MGD BRACKISH DESALINATION SYSTEM, DELIVERED TO CRRUA UNDER THE LEASE" },
      business: { label: "A 5 MGD WATER PLANT WITH A UTILITY CUSTOMER, PRICED AND DESIGNED BY NMSU" },
      kid: { label: "A MACHINE THAT TURNS SALTY WATER INTO DRINKING WATER", explain: "They give the water company $50 million for pipes. We build the machine that NMSU already designed. It makes 5 million gallons of clean water every day." },
    },
  },
  {
    icon: "school",
    color: "#d99a00",
    ours: { num: "$1B+", label: "SCHOOLS, INFRASTRUCTURE & PUBLIC SERVICES OVER 30 YEARS, PAID ONLY AS JOBS AND EMISSIONS TARGETS ARE MET" },
    theirs: { num: "$360M", label: "SCHOOLS, INFRASTRUCTURE & PUBLIC SERVICES" },
    explain: "Their $360 million is $12 million a year for 30 years in lieu of property tax on a project they value at up to $165 billion. The upgrade asks for about $33 million a year, tied in the lease to verified permanent jobs and stack emissions, so the money follows performance.",
    math: "$33M × 30 years ≈ $1.0B; their $12M × 30 = $360M.",
    sources: ["cba", "faq", "county-qa"],
    voices: {
      legislator: { label: "CONDITIONED PILT FOR SCHOOLS, INFRASTRUCTURE AND SERVICES OVER 30 YEARS, PAID AS VERIFIED TARGETS ARE MET" },
      business: { label: "PAYMENTS IN LIEU OF TAXES TIED TO PERFORMANCE: ABOUT $33M A YEAR INSTEAD OF $12M" },
      kid: { label: "MONEY FOR SCHOOLS, ONLY IF THEY KEEP THEIR PROMISES", explain: "They pay $12 million a year for 30 years. Our plan asks for about $33 million a year, and they only pay it when the jobs and clean-air promises are kept." },
    },
  },
  {
    icon: "community",
    color: "#e07b00",
    ours: { num: "$50M", label: "AN NMSU / DACC TECHNICAL INSTITUTE WITH GUARANTEED LOCAL PLACEMENT" },
    theirs: { num: "$6.9M", label: "COMMUNITY & WORKFORCE PROGRAMS" },
    explain: "The signed CBA's Exhibit B actually totals $11.4 million, but $4.5 million of it offsets building-permit fees and only $4 million goes to workforce education. The upgrade funds one institute on site for power, water, greenhouse and hardware careers.",
    sources: ["cba"],
    voices: {
      legislator: { label: "AN NMSU / DACC TECHNICAL INSTITUTE ON SITE WITH LOCAL-PLACEMENT REQUIREMENTS" },
      business: { label: "AN ON-SITE INSTITUTE THAT TRAINS THE POWER, WATER AND GREENHOUSE WORKFORCE" },
      kid: { label: "A SCHOOL ON SITE THAT TRAINS PEOPLE FOR THE JOBS", explain: "They give $6.9 million for programs. We build a $50 million training school right there, so people from here get the jobs." },
    },
  },
  {
    icon: "helmet",
    color: "#2e8b57",
    ours: { num: "~10,500", label: "CONSTRUCTION & PERMANENT JOBS · 3,000 PERMANENT IN PHASE 1 · THEY SIGNED FOR 750" },
    theirs: { num: "8,500+", label: "WELL PAYING CONSTRUCTION & OPERATIONS JOBS" },
    explain: "Their 8,500 is 7,000 construction plus 1,500 operations, both website projections. The signed agreement requires 2,500 construction and 750 full-time jobs. The upgrade keeps their 1,500 tech roles and adds up to about 1,000 greenhouse jobs per 150 acres (Southwest greenhouses run 4 to 6.5 an acre), 250 in water and capture, and 250 in refurbishment and training. All estimates.",
    sources: ["cba", "epm-jobs", "faq"],
    voices: {
      legislator: { label: "CONSTRUCTION AND PERMANENT POSITIONS · 3,000 PERMANENT IN PHASE 1, ENFORCEABLE UNDER THE IRB LEASE · 750 IN THE EXECUTED CBA" },
      business: { label: "CONSTRUCTION AND PERMANENT JOBS · 3,000 PERMANENT IN PHASE 1, ABOUT 1,500 OF THEM IN GROWER AND PLANT OPERATIONS" },
      kid: { label: "JOBS: THEY PROMISED 750, WE MAKE ABOUT 3,000", explain: "Their website says 8,500 jobs, but they only signed for 750. Our plan makes about 3,000 jobs that last, plus about 7,500 building jobs." },
    },
  },
  {
    icon: "emissions",
    color: "#c0392b",
    ours: { num: "100%", label: "OF SMOG EMISSIONS MEASURED CONTINUOUSLY AND PUBLISHED LIVE, NOT ESTIMATED ONCE A YEAR" },
    theirs: { num: "92%", label: "LOWER NOX EMISSIONS WITH BLOOM ENERGY FUEL CELLS" },
    explain: "Their 92% compares fuel cells with their own earlier gas-turbine plan. We keep the same fuel cells, so we do not invent a bigger percentage. The draft permit puts NOx at 37 tons a year, estimated from four tests of one 65 kW unit and scaled to 2,275 stacks, with no continuous stack monitor required. What changes: continuous monitors on every cluster with the data public, and limits set for the capture configuration, beside an area that already fails the ozone standard.",
    sources: ["faq", "sob", "sob-part-a", "sunland-park-ozone", "ala-sota-2025"],
    voices: {
      legislator: { label: "OF CRITERIA-POLLUTANT EMISSIONS MEASURED CONTINUOUSLY AND REPORTED PUBLICLY, WITH PERMIT LIMITS SET FOR THE CAPTURE CONFIGURATION" },
      business: { label: "OF SMOG EMISSIONS ON A PUBLIC METER, WHICH IS WHAT KEEPS A PERMIT OUT OF COURT" },
      kid: { label: "EVERY BIT OF SMOG IS MEASURED AND SHOWN TO EVERYONE", explain: "They say their machines make 92% less smog than an older idea. Same machines in our plan, but we measure every bit of smog all the time and put the numbers online." },
    },
  },
  {
    icon: "energy",
    color: "#2e8b57",
    ours: { num: "90–95%", label: "CAPTURE TARGET, METERED AT THE STACK FROM THE FIRST DAY · THE LAST 5–10% CLOSED OVER TIME WITH CLEANER GAS AND VERIFIED REMOVALS (TARGET)" },
    theirs: { num: "100%", label: "CARBON-FREE ENERGY MATCHING BY 2031" },
    explain: "Matching means buying clean-energy credits somewhere else; the 8,820,970 permitted tons still leave the stacks in Santa Teresa. Capture is physical: NMED says the dried exhaust is about 95% CO₂, and Bloom and Chart announced capture for it in 2025, though no plant runs it yet and the best operating plants sustain 50 to 75%. So the condition is metered tons against the target, with the federal 45Q credit paying $85 a ton; the skids themselves burn 5 to 15% more gas (about 120 to 370 MW), and that CO₂ goes through the same skids. The last 5–10% is covered over time by blending renewable gas and hydrogen, which Bloom hardware runs on, and verified removals for any remainder; renewable-gas supply is the limit. Captured CO₂ is used first where buyers exist (greenhouses, concrete, aggregate, today about 1%) and the rest stored, and Process 4 asks for a falling share of energy from gas so the whole stream shrinks.",
    sources: ["bocc", "sob", "bloom-chart", "bloom-fuels", "cba"],
    voices: {
      legislator: { label: "OF STACK CO₂ CAPTURED FROM COMMENCEMENT OF OPERATIONS · USED FIRST, STORED AS FALLBACK · RESIDUAL CLOSED BY 2031 WITH CLEANER GAS AND VERIFIED REMOVALS (TARGET)" },
      business: { label: "OF STACK CO₂ CAPTURED FROM DAY ONE AND SOLD TO CONCRETE AND GREENHOUSE BUYERS FIRST; STORAGE IS THE FALLBACK" },
      kid: { label: "OF THE GAS IS CAUGHT IN A BOX FROM THE FIRST DAY", explain: "They promise to buy \"clean energy credits\" somewhere else by 2031. That does not change what comes out of the pipe. Our plan catches 9 out of every 10 tons at the pipe, uses it, and burns less gas every year." },
    },
  },
  {
    icon: "household",
    color: "#1f7ae0",
    ours: { num: "+16,700", label: "HOMES' DAILY WATER MADE ON SITE, EVERY DAY, FROM SALTY GROUNDWATER NOBODY CAN DRINK" },
    theirs: { num: "~9", label: "U.S. HOUSEHOLDS ANNUAL NON-POTABLE WATER USE FOR DATA CENTER OPERATIONS" },
    explain: "Their 'nine households' counts only the cooling fills and top-offs averaged over 15 years. It leaves out the 20,000 gallons a day of drinking water for offices, the undisclosed non-potable operating use, and the 103 million gallons pumped for construction. The upgrade turns the site into a producer: 5 million gallons a day of clean water from the brackish aquifer, delivered to CRRUA's pipes.",
    math: "5,000,000 gal/day ÷ 300 gal per home per day (EPA WaterSense) ≈ 16,700 homes' daily use.",
    sources: ["faq", "cba", "haussamen-water", "cbd-well", "nmsu", "epa-watersense"],
    voices: {
      legislator: { label: "HOMES' DAILY WATER PRODUCED ON SITE FROM THE BRACKISH AQUIFER AND DELIVERED TO CRRUA, AGAINST A NET POTABLE DRAW" },
      business: { label: "HOMES' WORTH OF WATER A DAY MADE ON SITE AND SOLD INTO A UTILITY WHOSE DEMAND DOUBLES BY 2042" },
      kid: { label: "CLEAN WATER FOR 16,700 HOMES EVERY DAY", explain: "They say they use as much water as 9 homes. That only counts one small part. Our plan makes clean water from salty water: enough for 16,700 homes every single day." },
    },
  },
];
