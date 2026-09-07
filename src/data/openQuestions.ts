// Open questions and parked ideas, for the expert reader only.
// Rule for this file: a question goes here when serious thought and a real natural process are needed to answer it,
// and no document on the Sources page answers it yet. A parked idea goes here with the reason it is not on the plan.

export type OpenQuestion = {
  q: string;
  /** what is known, with the physics or the arithmetic shown; then what is not known */
  thought: string;
  /** the measurement or decision that would answer it */
  next: string;
  sources: string[];
};

export type ParkedIdea = {
  idea: string;
  status: "parked" | "candidate";
  why: string;
  sources: string[];
};

export const openQuestions: OpenQuestion[] = [
  {
    q: "How fast does the deep brackish aquifer refill, and what happens to the ground above it?",
    thought:
      "NMSU puts 60 to 65 million acre-feet of usable brackish water in the Mesilla Basin and calls the supply 'large, but not infinite', recharged mostly by underflow that is itself brackish, at a rate it says is unknown. A 5 MGD plant draws about 5,600 acre-feet a year, 10 MGD about 11,200; against storage that is a hundredth of a percent a year, so volume is not the question. Compaction of fine-grained layers and salt moving upward toward fresh wells are, and neither has been measured at this depth here. El Paso's basin has measured subsidence from a century of fresh-water pumping; nobody has measured what brackish pumping at 1,000 to 2,000 feet does under Santa Teresa.",
    next: "Deep monitoring wells around the well field before the plant opens, read yearly against the USGS Mesilla network that has taken annual measurements since 1987, and a public report. The recharge basins answer the other half: with the towns' fresh wells pumping far less and about 2 MGD of reclaimed water going back underground, the shallow table's decline should slow, and the same wells will show whether it does. The lease condition exists because the answer does not.",
    sources: ["nmsu", "usgs-mesilla", "epwater-recharge", "nm-asr-act"],
  },
  {
    q: "Are the minerals in the brine worth selling, or did we just walk away from them?",
    thought:
      "We did the arithmetic rather than rule by instinct. The feed carries about 2,000 mg/L of dissolved solids, so the plant's 6.7 MGD of feed carries roughly 50 to 70 tons of salt a day, about 18,000 to 25,000 tons a year: mostly sodium, chloride and sulfate, with 20 to 84 mg/L calcium and 4 to 24 mg/L magnesium. Even if every ton fetched $500, a generous average for a mix that is mostly common salt, the whole stream is worth roughly $10 million a year against a plant NMSU costs at $1.16 million a year to operate plus $4 per 1,000 gallons in capital. The reason is dilution: this brine is several times thinner than seawater, and the world's mineral-recovery successes are on brines far more concentrated than seawater. GAO finds even seawater-brine mining unproven at scale, and the one plant that tried it next door failed at commissioning. The 2024 brackish pilot that works treats magnesium hydroxide as a byproduct of getting more water out.",
    next: "Recover the water first, which is worth more than the salts. Sell gypsum, salt or magnesium hydroxide when a buyer signs, and put the revenue in the public accounts. Revisit if El Paso's new brine plant runs for a year.",
    sources: ["nmsu", "gao-brine-minerals", "mred-brackish", "ewm-elpaso", "epwater-brine-recovery"],
  },
  {
    q: "Can the CO₂ be turned into rock with the brine's own minerals?",
    thought:
      "Arithmetic says no. Carbonate needs one magnesium or calcium for every CO₂. NMSU's highest readings at the Santa Teresa wells are 24 mg/L magnesium and 84 mg/L calcium. Five million gallons a day of feed carries about 170 tons of magnesium and 580 tons of calcium a year, enough to bind under 1,000 tons of CO₂ as carbonate, against 8.8 million tons from the stacks: about a ten-thousandth. Mineralization on this site therefore has to import its calcium, which is what concrete curing and synthetic aggregate do, and those are commercial in the thousands of tons a year, not millions.",
    next: "Nothing to measure; the stoichiometry is settled. The open question is the market: how many tons a year regional concrete and aggregate buyers will actually take, which is why the use slider starts at 1% and grows only as contracts are signed.",
    sources: ["nmsu", "carboncure", "blue-planet"],
  },
  {
    q: "What does 2,400 megawatts of warmth do to the night air over Santa Teresa?",
    thought:
      "Nearly all of the electricity the chips use leaves as heat, and in the filed plan the dry coolers hand every megawatt of it to the desert air, day and night, all year. Cities are measurably warmer at night than the land around them because of stored and released heat; that is documented for cities. It is not documented for a single 2.4 gigawatt campus in open desert, and we found no study of this site. The upgrade takes about 1% of the heat on average for greenhouses and the water plant; the rest still goes to the air.",
    next: "A ring of cheap temperature and humidity sensors around the campus and in Sunland Park, logging from before the first hall opens, published with the stack meters. It costs almost nothing and turns a guess into a record.",
    sources: ["notice", "render"],
  },
  {
    q: "Who is watching in 2100, and with whose money?",
    thought:
      "Federal rules make a CO₂ storage operator monitor for 50 years after injection stops and post the money for it up front. NMED groundwater permits require monitoring while the permit lives. The signed agreement's obligations run only while the bonds are outstanding and it names no one after that; after the 30-year lease the shareholders own the site. Between the last permit and 2276 the only instruments that can exist are a bond and a public archive of the data.",
    next: "The sixth condition: a closure and monitoring bond sized by an engineer and revised every five years, the way the county already requires of solar farms, with the meter and well data archived where the public can reach it.",
    sources: ["epa-class-vi", "cba", "dac-solar-decom"],
  },
  {
    q: "How much of this is a hardware problem, and how much is a trust problem?",
    thought:
      "Every physical fix on this site is ordinary equipment: a heat exchanger, a capture skid, a reverse-osmosis train, a stack monitor. The fights of the past year have not been about equipment. They have been about information: a non-disclosure agreement that obliges a public university to help the company resist records requests, a non-potable water volume the developer declined to state, quarterly job reports the county says were missed. A public meter costs less than one hearing. Most of what needs to change here is not steel.",
    next: "Write disclosure into the lease alongside the hardware: live meters, well readings and job counts published on a schedule, so the argument moves from what is happening to what to do about it.",
    sources: ["haussamen-nda", "haussamen-water", "abq-reports"],
  },
  {
    q: "Should the new water go to homes first, or to the greenhouses?",
    thought:
      "CRRUA needs 6 million gallons a day in 2027 and 15 by 2042, and its customers have had arsenic in their taps. Hydroponic greenhouses use about 90% less water per pound of food than fields, but what they use is the same treated water. The plan makes 5 MGD, then 10; for years there is enough for both, and then there may not be.",
    next: "A written order of priority in the lease: homes and CRRUA first, greenhouses on what remains, with the plant's expansion tied to CRRUA's demand curve rather than the growers'.",
    sources: ["nmsu", "sweden"],
  },
  {
    q: "What is the site's real lifetime, and why does every clock on it run at a different speed?",
    thought:
      "Servers turn over in three to five years, fuel-cell stacks in about five, the lease in thirty, the state's net-zero deadline in nineteen. The water the plant draws is a deep reserve NMSU describes as outside the hydrologic cycle. Every obligation in the filed deal is written on the shortest of these clocks. The physical consequences run on the longest.",
    next: "Match each obligation to the clock of the thing it governs: stack emissions yearly, jobs yearly, aquifer levels yearly for as long as the wells exist, closure whenever it comes. That is what the year-250 view on this site is for.",
    sources: ["bloom-stack-life", "cba", "nmsu"],
  },
];

export const parkedIdeas: ParkedIdea[] = [
  {
    idea: "Sell the minerals in the brine: caustic soda, acid, gypsum, magnesium hydroxide.",
    status: "candidate",
    why: "Worth a few million dollars a year at most on this dilute brine (arithmetic above), so it rides on the water-recovery step rather than paying for it. The one plant built to do exactly this, beside El Paso's desalination plant, failed during commissioning; El Paso approved a second attempt in July 2026. If it runs for a year, a buyer and a price go into the plan; until then the site counts the water and no mineral revenue.",
    sources: ["ewm-elpaso", "epwater-brine-recovery", "gao-brine-minerals"],
  },
  {
    idea: "Lithium from the deep brine.",
    status: "parked",
    why: "No published lithium concentration exists for these wells. NMSU's water-quality table for Lanark and Noria does not list it. A number first, then a plan.",
    sources: ["nmsu"],
  },
  {
    idea: "A rule for the servers themselves when they retire.",
    status: "candidate",
    why: "Columbia's Sabin Center recommends extending e-waste rules to data centers. The plan already funds a hardware-refurbishment institute; a lease line on where retired hardware goes would complete it.",
    sources: ["columbia-decom"],
  },
  {
    idea: "Night-air temperature sensors around the campus.",
    status: "candidate",
    why: "Answers the heat question above at the cost of a few weather stations. Not yet written into a condition because no one has asked for it.",
    sources: ["notice"],
  },
];

export const openQuestionSources = Array.from(new Set([...openQuestions.flatMap((q) => q.sources), ...parkedIdeas.flatMap((p) => p.sources)]));
