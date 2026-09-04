// The Science page at four reading levels. Adult = the full sections (ImpactSection, KeyComponentsSection, IrbSection).
// `little` = one picture and one sentence; `kid` = a few plain sentences; `expert` = the numbers with units and sources.

export type Topic = {
  id: string;
  icon: string;
  title: string;
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
    little: "The upgrade makes more jobs and more money for schools.",
    kid: "The company promised the county 750 jobs and $360 million for schools over 30 years. Our plan makes about 3,000 jobs and about $1 billion for schools, and it only costs about 1.5% more to build.",
    expert: [
      { line: "Binding CBA minimums: 750 FT + 50 PT within 3 years of opening; ≥2,500 construction. Advertised: 1,500 permanent, 7,000 construction.", sources: ["cba", "epm-jobs", "faq"] },
      { line: "PILT: $12M/yr × 30 = $360M (theirs) vs a conditioned ≈$33M/yr ≈ $1.0B (ours), tied to verified jobs and stack emissions in the IRB lease.", sources: ["cba", "county-qa"] },
      { line: "Added capital ≈ $2.5B ≈ 1.5% of the $165B bond; ≈$450M of it is grower capital for greenhouses (industry-average $3M/acre).", sources: ["cba"] },
      { line: "Their IMPLAN total $4.7B (assumes permit and pipeline approval); our Phase-1 total $6.6B adds leases, heat and water sales and higher PILT.", sources: ["econpdf", "bocc"] },
    ],
    blueprint: "/blueprint#cost",
  },
  {
    id: "heat",
    icon: "🔥",
    title: "Heat",
    little: "The computers make heat. We use it to grow tomatoes.",
    kid: "Computers get hot, and this place will have millions of them. Their plan blows all the heat into the sky with giant fans. Our plan adds one metal box that lets warm water heat greenhouses on cold nights, and in summer the same heat runs special chillers that make cold air. Heat is used all year, then the fans do the rest.",
    expert: [
      { line: "IT load 2,462 MW → reject heat ≈ 2,400 MW (thermodynamic identity, not measured). 1 MW ≈ 38 × 90,000 BTU/hr furnaces.", sources: ["notice", "carrier-furnace"] },
      { line: "Closed-loop liquid cooling, one-time fill ≈2.5M gal per hall; supply/return ≈45–65 °C / 113–149 °F (typical direct-to-chip ranges).", sources: ["waterpdf", "faq"] },
      { line: "Greenhouse winter peak ≈0.6 MW/acre → 150 acres ≈ 90 MW; desal preheat 15 MW; brine concentrator 20 MW (estimates).", sources: ["sweden", "nmsu"] },
      { line: "Precedent: Gothenburg greenhouse on data-center waste heat with the city energy company.", sources: ["sweden"] },
      { line: "Summer use: absorption chillers on 65–100 °C water (COP ≈0.86 at 80 °C) cool the greenhouses and the packing house cold store; desal preheat and brine concentration run year-round. Twelve-month heat use, not a winter-only story.", sources: ["absorption-review", "absorption-multistage"] },
    ],
    blueprint: "/blueprint#p1",
  },
  {
    id: "carbon",
    icon: "🌫️",
    title: "Carbon and smog",
    little: "The power plant breathes out gas. We catch it, turn it into rock, and burn less gas every year.",
    kid: "The power plant does not burn with a flame, so its breath is almost all carbon dioxide. That makes it easy to catch in a box, dry it, squeeze it, and pump it deep under the ground below a lid of solid rock. It is not fracking: the pressure is kept low so the rock never cracks.",
    expert: [
      { line: "Permit 10883: 2,462 MW Bloom SOFC, 2,275 stacks, 8,760 h/yr, Title V; GHG 10,144,115 tpy (NMED) / 8,820,970 tpy (applicant, with 15% safety factor); each criteria pollutant < 250 tpy so PSD is not triggered.", sources: ["sob", "notice", "nmelc"] },
      { line: "Dried anode exhaust ≈95% CO₂ (NMED); ≈10× turbine CO₂ concentration at ≈1/15 the mass flow; Bloom–Chart capture partnership.", sources: ["sob", "bloom-co2", "bloom-chart"] },
      { line: "Capture efficiency 90–95% (industry range for concentrated streams); residual closed by RNG/H₂ blending (Bloom-compatible) and verified removals; HB93 net-zero by 2045.", sources: ["bloom-fuels", "cba"] },
      { line: "Use before storage: CO₂ mineralization in concrete (≈690,000 t cumulative worldwide, CarbonCure) and carbonate aggregate (≈5,000 t/yr per plant, Blue Planet) are commercial but small; use share starts at 10% and grows with buyers.", sources: ["carboncure", "blue-planet"] },
      { line: "Fallback storage: Class VI, > 800 m / 2,625 ft, supercritical CO₂ under impermeable cap rock; injection pressure capped below fracture pressure; induced-seismicity risk managed by fault mapping, pressure limits and monitoring. NM has no permitted Class VI wells; Texas does.", sources: ["epa-class-vi-saline", "epa-class-vi", "usgs-induced", "decatur"] },
      { line: "Boundary Dam BD3, the longest-running power-plant capture unit: 848,388 t captured in 2024 at 85% availability against a 1 Mt design; the skeptic's case is cited alongside.", sources: ["boundary-dam-2024", "ieefa-bd3"] },
      { line: "Ozone NAAQS 70 ppb (8-h); PM2.5 9 µg/m³ annual; Sunland Park nonattainment since Aug. 3, 2018; ALA grade F, 15.2 unhealthy days/yr.", sources: ["epa-ozone-naaqs", "epa-pm-naaqs", "sunland-park-ozone", "ala-sota-2025"] },
    ],
    blueprint: "/blueprint#p2",
  },
  {
    id: "water",
    icon: "💧",
    title: "Water",
    little: "Salty water goes in. Clean water comes out for 16,700 homes.",
    kid: "Deep under the desert is a huge lake of salty water nobody can drink. Pumps bring it up, server heat warms it, and a super-fine filter lets water through but not salt. Three cups out of four come out clean. The salty cup is pumped very deep, below the good water, so it never mixes back.",
    expert: [
      { line: "NMSU (Xu, 2023): 5 MGD brackish RO, 75% recovery, 1 MGD skids, $115.5M plant / $269.4M system, brine to deep injection ≈20 mi away; Mesilla Basin ≈65M acre-ft recoverable < 5,000 mg/L.", sources: ["nmsu", "cduaws"] },
      { line: "El Paso KBH: 27.5 MGD since 2007, brine piped 22 mi to injection wells 3,720–4,030 ft deep.", sources: ["epwater", "twdb"] },
      { line: "Their draw: 20,000 gal/day potable cap (60,000 peak); non-potable operating volume undisclosed; 103M+ gal pumped Apr–Aug 2026; sod-farm right ≈2,400–2,600 acre-ft/yr.", sources: ["cba", "haussamen-water", "cbd-well", "epm-jobs"] },
      { line: "5 MGD ÷ 300 gal/home/day ≈ 16,700 homes; CRRUA demand 6 MGD (2027) → 15 MGD (2042).", sources: ["epa-watersense", "nmsu"] },
    ],
    blueprint: "/blueprint#p3",
  },
  {
    id: "solar",
    icon: "☀️",
    title: "Retire the gas",
    little: "Hot rock and wind make clean power, so the gas machines run less.",
    kid: "The sun goes on every roof, but that is a tiny slice. The big slices are hot rock deep under this valley, which makes power day and night, and the giant wind farm New Mexico switched on in 2026, whose power comes here by wire. Every year the gas machines run less.",
    expert: [
      { line: "≈3M sq ft of halls; 10 W/usable sq ft, 70% usable, 24% capacity factor → ≈20 MW peak on halls, more with warehouse, ops, canopy and semi-transparent greenhouse roof.", sources: ["ktsm-sqft", "doe-pv-cost"] },
      { line: "Installed cost benchmark $1.34–$1.51/Wdc (commercial, DOE Q1-2024); ≈0.02% of the bond.", sources: ["doe-pv-cost"] },
      { line: "Share of the 2,462 MW load ≈ 1%: honest, and enough for the community loads (≈21 MW average).", sources: ["notice"] },
      { line: "Geothermal: Doña Ana County 150 °C isotherm at <1–5.5 km (NMERDI); Lightning Dock ≈11 MW net since 2018; Fervo Cape Station 100 MW (Oct. 2026) → 500 MW (2028), Google 396 MW PPA. Proposal: 100–200 MW by 2032 at ≈90% capacity factor, ≈$3M/MW (estimate).", sources: ["dona-ana-geothermal", "lightning-dock", "fervo-cape", "fervo-google"] },
      { line: "Delivered wind/solar: SunZia 3,650 MW (916 turbines) on a 3,500 MW HVDC line, commissioned 2026; a delivered PPA at ≈40% capacity factor throttles the fuel cells. Gas-hours-per-year is the metric.", sources: ["sunzia-eia", "bocc"] },
    ],
    blueprint: "/blueprint#p4",
  },
  {
    id: "food",
    icon: "🍅",
    title: "Food and jobs",
    little: "Warm greenhouses grow food all winter.",
    kid: "Plants love warm roots and extra carbon dioxide, and the data center has both to spare. Farmers rent the land next to the fans, pipe in the warm water and the captured gas, and grow tomatoes and lettuce all year with no bug spray: warm roots on cold nights, and in summer the same heat runs chillers that keep the glass cool. Every 50 acres is one block of glass and about 300 people.",
    expert: [
      { line: "≈150 acres (proposal); 6.5 jobs/acre incl. packing; ≈400,000 lb/acre/yr; ≈90% less water per lb than field farming; ≈60 t CO₂/acre/yr uptake (industry averages, no Santa Teresa study).", sources: ["sweden"] },
      { line: "Lease + heat revenue ≈$0.13M/acre/yr to the developer (estimate); growers' capital ≈$3M/acre.", sources: ["cba"] },
      { line: "Packing house and produce gate on the public road, separate from the secure entrance.", sources: ["render"] },
    ],
    blueprint: "/blueprint#p5",
  },
];
