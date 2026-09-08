// The Science page at four reading levels. Adult = the full sections (ImpactSection, KeyComponentsSection, IrbSection).
// `little` = one picture and one sentence; `kid` = a few plain sentences; `expert` = the numbers with units and sources.

export type Topic = {
  id: string;
  icon: string;
  title: string;
  /** two lines every adult reader sees first: what is wrong as filed, and the engineering fix */
  problem: string;
  fix: string;
  little: string;
  kid: string;
  expert: { line: string; sources: string[] }[];
  blueprint: string;
};

export const topics: Topic[] = [
  {
    id: "money",
    icon: "💰",
    title: "Money and jobs",
    problem: "The signed agreement binds the company to 750 jobs and about $12 million a year, for a project valued at up to $165 billion.",
    fix: "Tie the bond benefit to jobs verified each year and fund a training institute on site: about 3,000 jobs and about $1 billion over 30 years, for about 8% of the $50 billion first phase (2.5% of the bond cap) before the federal capture credit.",
    little: "The upgrade makes more jobs and more money for schools.",
    kid: "The company promised the county 750 jobs and $360 million for schools over 30 years. Our plan makes about 3,000 jobs and about $1 billion for schools, and it costs about two and a half pennies more on every dollar of the whole deal, most of which the government's carbon-catching credit pays back.",
    expert: [
      { line: "Binding CBA minimums: 750 FT + 50 PT within 3 years of opening; ≥2,500 construction. Advertised: 1,500 permanent, 7,000 construction.", sources: ["cba", "epm-jobs", "faq"] },
      { line: "PILT: $12M/yr × 30 = $360M (theirs) vs a conditioned ≈$33M/yr ≈ $1.0B (ours), tied to verified jobs and stack emissions in the IRB lease.", sources: ["cba", "county-qa"] },
      { line: "Added capital ≈ $3.4–3.9B (capture $1.5B; CO₂ transport, wells and storage care $1.5–2B; desal $0.27B; HX $0.06B; solar $0.045B; institute $0.05B) ≈ 8% of the $50B five-year commitment ≈ 2.5% of the $165B bond cap (a ceiling, not cash), plus +$640M PILT over 30 years; growers add ≈$0.47B. 45Q at $85/t × ~7.9 Mt/yr × 12 yr ≈ $8B if construction starts before 2033.", sources: ["cba", "irs-45q"] },
      { line: "Their IMPLAN total $4.7B (assumes permit and pipeline approval); our Phase-1 total ≈$6.4B adds leases and heat sales (≈$7M/yr, heat near propane parity), water sales, produce output and higher PILT. Our additions are estimates built on their total, not an independent study.", sources: ["econpdf", "bocc"] },
    ],
    blueprint: "/blueprint#cost",
  },
  {
    id: "heat",
    icon: "🔥",
    title: "Heat",
    problem: "About 2,400 MW of warmth, roughly 90,000 home furnaces' worth, is blown into the desert by fans.",
    fix: "One plate heat exchanger before the dry coolers sends part of it to 150 acres of greenhouses in winter and to the water plant year-round; about 1% of the heat on average, 4% on the coldest night, and the fans reject the rest.",
    little: "The computers make heat. We use it to grow tomatoes.",
    kid: "Computers get hot, and this place will have millions of them. Their plan blows all the heat into the sky with giant fans. Our plan adds one metal box that lets warm water heat greenhouses on cold nights and warm the salty water at the water plant all year. It is a small slice of the heat; the fans still do most of the work.",
    expert: [
      { line: "IT load 2,462 MW → reject heat ≈ 2,400 MW (thermodynamic identity, not measured). 1 MW ≈ 38 × 90,000 BTU/hr furnaces.", sources: ["notice", "carrier-furnace"] },
      { line: "Closed-loop liquid cooling, one-time fill ≈2.5M gal per hall; supply/return ≈45–65 °C / 113–149 °F (typical direct-to-chip ranges).", sources: ["waterpdf", "faq"] },
      { line: "Greenhouse winter peak ≈0.6 MW/acre (glass heat loss at El Paso's 26 °F design temperature, 0.5–0.85 depending on screens) → 150 acres ≈ 90 MW; desal preheat ≈10 MW (+5–10 °C, within membrane limits). Estimates; a thermal brine concentrator would need >65 °C and is not counted.", sources: ["nmsu"] },
      { line: "Precedent: Gothenburg (130 m²) and Boden (300 m²) pilots; scale precedents are Agriport A7 (NL; Microsoft and Google beside greenhouse growers) and Germany's EnEfG (10% heat reuse from July 2026, 20% from 2028). Annual average greenhouse draw ≈15–20 MW ≈ 1% of the heat stream (El Paso ≈2,600 heating degree-days).", sources: ["goteborg-energi", "agriport", "enefg"] },
      { line: "Summer: single-effect LiBr absorption chillers want ≈90 °C and reject ≈2.4× their cooling as heat; this loop is 45–65 °C, so absorption cooling is not counted. Summer cooling is evaporative pads (≈3–15 L/m²/day in Arizona → ≈1–1.6 MGD for 150 acres, consumptive); vents open means CO₂ enrichment is lost on those days (OSU HLA-6723), so it is a cool-season and morning practice. Desal preheat runs year-round.", sources: ["absorption-review"] },
    ],
    blueprint: "/blueprint#p1",
  },
  {
    id: "carbon",
    icon: "🌫️",
    problem: "8.8 million tons of CO₂ a year permitted, with smog gases estimated from four tests of one 65 kW unit and no continuous monitor, beside a valley that already fails the ozone standard.",
    fix: "The dried exhaust is about 95% CO₂, so capture skids can catch it, metered against a 90–95% target, for use where buyers exist and storage for the rest, with a public monitor on every stack.",
    title: "Carbon and smog",
    little: "The power plant breathes out gas. We catch it, turn it into rock, and burn less gas every year.",
    kid: "The power plant does not burn with a flame, so its breath is almost all carbon dioxide. That makes it easy to catch in a box, dry it, squeeze it, and pump it deep under the ground below a lid of solid rock. It is not fracking: the pressure is kept low so the rock never cracks.",
    expert: [
      { line: "Permit 10883 Part A, Table 102.A: 2,462 MW Bloom SOFC, 2,275 stacks, 8,760 h/yr; NOx 37.2, CO 161.2, VOC 124.0, SO₂ 0.08, PM 75.4, HAPs 1.4 tpy; GHG 8,820,970 tpy CO₂e (NMED removed the applicant's 15% safety factor; 10,144,115 was the application). Title V major (CO, VOC > 100 tpy); PSD n/a (not a listed category, each pollutant < 250). Facility outside the Sunland Park NAA; modelled O₃ below MERPs. Emission factors from four 4-hour tests of one 65 kW unit; no CEMS required.", sources: ["sob", "sob-part-a", "notice"] },
      { line: "Dried anode exhaust ≈95% CO₂ (NMED); ≈10× turbine CO₂ concentration at ≈1/15 the mass flow; Bloom–Chart capture partnership.", sources: ["sob", "bloom-co2", "bloom-chart"] },
      { line: "Capture 90–95% is a TARGET for a near-pure stream; operating point-source plants sustain 50–75% (Boundary Dam ≈660 kt/yr ten-year average, 848 kt best year; Quest ≈75%). No SOFC capture plant operates. Energy penalty literature 4–6% for anode streams; we budget 5–15% ≈ 120–370 MW of 2,462; the model uplifts gross CO₂ by (1 + penalty) from year 5, so the residual at target is ≈0.45–1.0 Mt/yr, not 0.4–0.9. Residual closed over time by RNG/H₂ blending and verified removals. HB93 §62-17-12(E)(2) counts methane offsets (≥1/10 of CO₂ tons) as net-zero, so 2045 does not force gas hours down.", sources: ["boundary-dam-2024", "bloom-fuels", "cba", "nmsa-62-17-12"] },
      { line: "Use before storage: CO₂ mineralization in concrete (≈690,000 t cumulative worldwide, CarbonCure) and carbonate aggregate (≈5,000 t/yr per plant, Blue Planet) are commercial but small; the use slider starts at 1% and grows only with signed buyers. 45Q: $85/t for storage or use, 12 years.", sources: ["carboncure", "blue-planet", "irs-45q"] },
      { line: "Fallback storage: Class VI, > 800 m / 2,625 ft, supercritical CO₂ under impermeable cap rock; injection pressure capped below fracture pressure; induced-seismicity risk managed by fault mapping, pressure limits and monitoring. NM has no permitted Class VI wells; Texas does.", sources: ["epa-class-vi-saline", "epa-class-vi", "usgs-induced", "decatur"] },
      { line: "Boundary Dam BD3, the longest-running power-plant capture unit: 848,388 t captured in 2024 at 85% availability against a 1 Mt design; the skeptic's case is cited alongside.", sources: ["boundary-dam-2024", "ieefa-bd3"] },
      { line: "Ozone NAAQS 70 ppb (8-h); PM2.5 9 µg/m³ annual; Sunland Park nonattainment since Aug. 3, 2018; ALA grade F, 15.2 unhealthy days/yr.", sources: ["epa-ozone-naaqs", "epa-pm-naaqs", "sunland-park-ozone", "ala-sota-2025"] },
    ],
    blueprint: "/blueprint#p2",
  },
  {
    id: "water",
    icon: "💧",
    problem: "Drinking water taken from the local utility and more pumped from the fresh aquifer; 103 million gallons went to construction in five months.",
    fix: "NMSU's 5 MGD brackish plant, designed and priced in 2023, turns salty groundwater into clean water for the towns, as El Paso has done since 2007.",
    title: "Water",
    little: "Salty water goes in. Clean water comes out for 16,700 homes.",
    kid: "Deep under the desert is a huge lake of salty water nobody can drink. Pumps bring it up, server heat warms it, and a super-fine filter lets water through but not salt. Three cups out of four come out clean. The salty cup is pumped very deep, below the good water, so it never mixes back. And the water the town has used is cleaned again and soaked back into the ground, so the good water underground fills back up.",
    expert: [
      { line: "NMSU (Xu, 2023): 5 MGD brackish RO, 75% recovery, 1 MGD skids, $115.5M plant / $269.5M system, brine to deep injection ≈20 mi away; Mesilla Basin ≈65M acre-ft recoverable < 5,000 mg/L.", sources: ["nmsu", "cduaws"] },
      { line: "El Paso KBH: 27.5 MGD since 2007, brine piped 22 mi to injection wells 3,720–4,030 ft deep.", sources: ["epwater", "twdb"] },
      { line: "Their draw: 20,000 gal/day potable cap (60,000 peak); non-potable operating volume undisclosed; 103M+ gal pumped Apr–Aug 2026; sod-farm right ≈2,400–2,600 acre-ft/yr.", sources: ["cba", "haussamen-water", "cbd-well", "epm-jobs"] },
      { line: "5 MGD ÷ 300 gal/home/day ≈ 16,700 homes; CRRUA demand 6 MGD (2027) → 15 MGD (2042).", sources: ["epa-watersense", "nmsu"] },
      { line: "Recharge: CRRUA's Sunland Park (2.1 MGD capacity, <1 MGD flow), North (1 MGD, ~0.8) and West Mesa (0.6, ~0.05) plants ≈1.85 MGD of wastewater today; treated to drinking standard → infiltration basins ≈2 MGD back into the fresh aquifer vs 3.1 MGD CRRUA pumped in 2020. No plant surplus: CRRUA demand 6 MGD (2027) > 5 MGD plant. Permit: Ground Water Storage and Recovery Act (72-5A NMSA, 19.25.8 NMAC, needs a water right for the stored water); NM's first ASR permit (Bear Canyon, ABQ, river water) took 2008 tests → 2014; Rio Rancho Pure (2017) is the reclaimed-water precedent. El Paso since 1985, up to 3 MGD, >30 billion gal, 'slowed the decline'. Effluent today is the towns' Rio Grande return-flow offset (NMSU). County voted May 23, 2025 to terminate CRRUA's JPA.", sources: ["nmsu", "nm-asr-act", "abcwua-bear-canyon", "rio-rancho-pure", "epwater-recharge", "epwater-aquifers", "crrua-termination"] },
      { line: "Brine minerals, order of magnitude: ~2,000–2,800 mg/L TDS × 6.7 MGD feed ≈ 18,000–25,000 t/yr of dissolved salts (mostly Na, Cl, SO₄; Ca 20–84, Mg 4–24 mg/L). Even at $500/t for every ton ≈ $9–12M/yr; NMSU's tabulated O&M is $1.16M/yr and its $4 per 1,000 gal is the capital-equivalent unit cost. Brine ≈ 5,000–14,000 mg/L vs seawater 35,000: inland brine is dilute, which is why GAO finds brine mining unproven at scale and the 2024 MRED brackish pilot treats Mg(OH)₂ as a byproduct of higher water recovery. Water is the product; salts are a bonus.", sources: ["nmsu", "gao-brine-minerals", "mred-brackish", "ewm-elpaso"] },
      { line: "Local wells carry arsenic (0.002–0.036 mg/L at Lanark and Noria; Santa Teresa Well 8A shut since 2001 for uranium and arsenic). RO removes both; they leave in the concentrate and the spent membranes, state-regulated residuals under the NMED discharge permit.", sources: ["nmsu", "epa-tenorm"] },
      { line: "Long view: NMSU calls the 60–65M acre-ft brackish supply 'large, but not infinite' with recharge 'unknown' → lease condition: monitoring wells + an annual public water-level report. Brine: recover water first (El Paso/Upwell, ~3 MGD approved July 2026; the first mineral-recovery attempt there failed at commissioning), inject the rest under NMED Class I/V with groundwater monitoring. CO₂ storage: 50-year post-injection care is federal law. The county is designing its own 4 MGD plant ($75M, $15M Jupiter GRT) for 2028–29; the ask moves the developer's money behind the full 5 MGD system.", sources: ["nmsu", "epwater-brine-recovery", "ewm-elpaso", "epa-class-vi", "star-plant"] },
    ],
    blueprint: "/blueprint#p3",
  },
  {
    id: "solar",
    icon: "☀️",
    problem: "Every hour of power is a gas hour. Rooftop solar alone covers about a quarter of one percent of the load.",
    fix: "Geothermal test wells in Phase 1 and a delivered-renewables contract cut the share of energy from gas every year, on a public meter; how far it falls depends on the wells, storage and transmission.",
    title: "Retire the gas",
    little: "Hot rock and wind make clean power, so the gas machines run less.",
    kid: "The sun goes on every roof, but that is a tiny slice. The big slices are hot rock deep under this valley, which makes power day and night, and wind farms that could send power here once new wires are built. Every year the gas machines can run less; how much less, the test wells will tell.",
    expert: [
      { line: "≈3M sq ft of halls; 10 W/usable sq ft, 70% usable, 24% capacity factor → ≈20 MW peak on halls, more with warehouse, ops, canopy and semi-transparent greenhouse roof.", sources: ["ktsm-sqft", "doe-pv-cost"] },
      { line: "Installed cost benchmark $1.34–$1.51/Wdc (commercial, DOE Q1-2024); ≈0.09% of the $50B first phase, 0.03% of the bond cap.", sources: ["doe-pv-cost"] },
      { line: "Share of the 2,462 MW load ≈ 0.25% (≈5 MW average): honest, and enough for the community loads (≈21 MW average) only with the canopy and greenhouse roofs.", sources: ["notice"] },
      { line: "Geothermal: Doña Ana County 150 °C isotherm at <1–5.5 km (GSA 2011); Lightning Dock ≈11 MW net since 2018; Fervo Cape Station 100 MW (2026) → 500 MW (2028), Google 396 MW PPA; Fervo's cost ≈$7,000/kW today, $3,000 goal. Proposal: test wells in Phase 1, 100–200 MW by 2032 if they flow (≈$0.5–1.4B). True zero gas for 2,462 MW would need ≈2.7 GW firm geothermal or ≈6 GW wind/solar plus tens of GWh of storage: not identified.", sources: ["gsa-2011", "lightning-dock", "fervo-cape", "fervo-google", "fervo-ipo"] },
      { line: "Delivered wind/solar: SunZia 3,650 MW (916 turbines) on a 3,021 MW HVDC line to Pinal County, Arizona, contracted to California and SRP; none is wired to Santa Teresa, and EPE's system peak is below the campus load, so a delivered PPA here needs new transmission or new NM projects. Metric: share of the year's energy from gas (full-load-hour equivalent).", sources: ["sunzia-eia", "bocc"] },
    ],
    blueprint: "/blueprint#p4",
  },
  {
    id: "food",
    icon: "🍅",
    problem: "The acres beside the fans stay bare desert, and the region imports the produce it eats.",
    fix: "Growers lease 150 acres with heat and CO₂ piped in: about 60 million pounds of food a year and about 1,000 jobs, on grower money.",
    title: "Food and jobs",
    little: "Warm greenhouses grow food all winter.",
    kid: "Plants love warm roots and extra carbon dioxide, and the data center has both to spare. Farmers rent the land next to the fans, pipe in the warm water and the captured gas, and grow tomatoes and lettuce all year with hardly any bug spray: warm roots on cold nights, and in summer wet pads and fans keep the glass cool. Every 50 acres is one block of glass and about 200 to 300 people.",
    expert: [
      { line: "≈150 acres (proposal); 4–6.5 jobs/acre incl. packing (Marfa 4.9, Willcox 5.7); up to ≈400,000 lb/acre/yr (top-tier tomato; mixed crop 200–300k); ≈90% less water per lb than field farming; CO₂ uptake per acre unverified (estimate; 150 acres × ~60 t ≈ 9,000 t/yr ≈ 0.1% of the 8.8 Mt stream, fed only with vents closed). Summer pad cooling ≈1–1.6 MGD for 150 acres. No Santa Teresa study.", sources: ["agriport"] },
      { line: "Lease + heat revenue ≈$0.04–0.06M/acre/yr to the developer (heat near propane parity; estimate); growers' capital ≈$3M/acre.", sources: ["cba"] },
      { line: "Packing house and produce gate on the public road, separate from the secure entrance.", sources: ["render"] },
    ],
    blueprint: "/blueprint#p5",
  },
];
