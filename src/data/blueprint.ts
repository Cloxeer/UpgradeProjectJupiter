// Blueprint data: the 1,400-acre site plan (theirs and ours), process constants
// for the interactive diagrams, costs, phasing, and receipts.
//
// Acreages are estimates read off Project Jupiter Together's labeled render
// (Aug. 27, 2026) and Doña Ana County filings. The 1,400-acre total is fixed.
// Canvas is 1000 x 700 units; 1 acre ≈ 500 square units.

export type Rect = { x: number; y: number; w: number; h: number };

export type Zone = {
  id: string;
  name: string;
  acres: number;
  color: string;
  rects: Rect[];
  /** "both" = exists in their plan and stays put; "ours" = added on undeveloped land */
  plan: "both" | "ours";
  theirs: string;
  ours: string;
  /** short label drawn on the map */
  short: string;
};

export const TOTAL_ACRES = 819; // per the executed Community Benefits Agreement

export const zones: Zone[] = [
  {
    id: "future",
    name: "Unbuilt remainder of the 819-acre site",
    acres: 179,
    color: "#7a8a94",
    rects: [{ x: 0, y: 0, w: 1000, h: 290 }],
    plan: "both",
    short: "FUTURE EXPANSION (THEIRS)",
    theirs: "The CBA describes a Project Site of about 819 acres with a 400-acre first phase due by Q3 2028. That leaves about 419 acres unbuilt today; which acres they are, and what later phases use them for, has not been published.",
    ours: "Our proposals (greenhouses, water plant, capture, institute, solar) would use about 240 of the 419 unbuilt acres, leaving 179 for their later phases. Exact placement must come from their site plan.",
  },
  {
    id: "pipeline",
    name: "Gas pipeline & utility corridor",
    acres: 30,
    color: "#5c4a3a",
    rects: [{ x: 0, y: 290, w: 1000, h: 14 }],
    plan: "both",
    short: "GAS & UTILITY CORRIDOR",
    theirs: "400 million cubic feet of natural gas a day must reach the fuel cells. The State Land Office has denied the pipeline route across state trust land twice.",
    ours: "Same corridor. It also carries the CO₂ line out to sequestration and the treated-water line to CRRUA.",
  },
  {
    id: "fuel",
    name: "Fuel-cell microgrid (2,462 MW)",
    acres: 190,
    color: "#8e3b2f",
    rects: [{ x: 0, y: 304, w: 150, h: 216 }],
    plan: "both",
    short: "FUEL CELLS (NOT IN THEIR RENDER)",
    theirs: "Not shown anywhere on their render. Air Quality Permit 10883 for the 2.45 GW Bloom fuel-cell system is stayed by the New Mexico Supreme Court. On Sept. 1, 2026 the Court unanimously refused the developers' request to partially lift that stay, and the Sept. 14 hearing is off (Albuquerque Journal). Their own filings estimate 8.8 to 14 million tons of CO₂ a year.",
    ours: "Wherever the fuel cells go, capture skids go beside them, inside the fence, before power-on. Capture on this exhaust is what Bloom and Chart Industries already sell.",
  },
  {
    id: "ops",
    name: "Operations, warehouse, parking, gates",
    acres: 40,
    color: "#9aa5ad",
    rects: [{ x: 150, y: 304, w: 150, h: 216 }],
    plan: "both",
    short: "OPS · WAREHOUSE · PARKING",
    theirs: "Operations, warehouse and parking sit outside the security fence, west of the halls. The fence has two gates: the secure entrance where the stub road enters, and the secure exit where the lower road leaves. The guard booth is on the public road further south.",
    ours: "Unchanged, plus solar on the roofs and a canopy over the parking lot.",
  },
  {
    id: "halls",
    name: "Data centers (main hall + smaller halls)",
    acres: 70,
    color: "#003047",
    rects: [{ x: 300, y: 304, w: 450, h: 216 }],
    plan: "both",
    short: "4 DATA CENTERS",
    theirs: "Four halls, as their Aug. 27, 2026 render shows: a main hall, a smaller hall east of it, and two in a north row. Up to 2.45 GW of on-site power, per the Oracle and Bloom announcement. Leased to Oracle for 18 years with OpenAI as anchor tenant. Their website advertises 1,500 ongoing jobs, but the signed county agreement only requires 750 full-time workers and 2,500 construction workers (El Paso Matters, Sept. 2025).",
    ours: "Same four halls, same footprints, same cut corners. Solar on every roof. Bond tax breaks tied to the 1,500 jobs they advertise, not the 750 they signed for.",
  },
  {
    id: "power",
    name: "Transformer yard & modular chiller plants",
    acres: 30,
    color: "#4f6b7a",
    rects: [{ x: 750, y: 304, w: 100, h: 216 }],
    plan: "both",
    short: "TRANSFORMERS · CHILLERS",
    theirs: "Three modular chiller plants under the main hall and three equipment units under the east hall, all inside the fence. Transformers step the microgrid's voltage down for the servers. Their permit filings put NOx at about 500 tons a year, split across microgrid permits each under the 250-ton major-source line.",
    ours: "Same equipment. One major-source air permit for the whole campus with continuous stack monitoring on a public dashboard, and a heat exchanger at the east end of the chiller row.",
  },
  {
    id: "dry",
    name: "Dry coolers",
    acres: 40,
    color: "#6f8f9a",
    rects: [{ x: 850, y: 304, w: 100, h: 216 }],
    plan: "both",
    short: "DRY COOLERS",
    theirs: "Two long bands of dry coolers, north and south, plus the chiller plants. Their water PDF says cooling is a closed loop with a one-time fill. Fans reject roughly 2.4 GW of heat to the air.",
    ours: "Same coolers, same place. A plate heat exchanger ahead of them sends winter heat to greenhouses directly south, inside the fence, and preheats the water plant's feed. The coolers reject what is left.",
  },
  {
    id: "capture",
    name: "Carbon-capture skids",
    acres: 15,
    color: "#c0392b",
    rects: [{ x: 0, y: 520, w: 150, h: 50 }],
    plan: "ours",
    short: "CO₂ CAPTURE",
    theirs: "No capture in their plan. Their air permit application counts on releasing the CO₂.",
    ours: "Containerized capture units inside the fence at the north band, ducted to the fuel-cell exhaust. Bloom's own materials put that exhaust at roughly ten times a turbine's CO₂ concentration, which is why Bloom and Chart Industries sell capture for it. 90 to 95% removed, then compressed to storage.",
  },
  {
    id: "solar",
    name: "Solar (roofs, canopy, strip)",
    acres: 25,
    color: "#e07b00",
    rects: [{ x: 250, y: 520, w: 140, h: 180 }],
    plan: "ours",
    short: "SOLAR",
    theirs: "No solar in their plan or on their render.",
    ours: "Panels on all four hall roofs, the warehouse, Operations, a canopy over the parking lot, a strip between the dry coolers and the greenhouses, and semi-transparent panels on a quarter of the greenhouse roof. Honestly under 1% of the campus load. Sized to run the greenhouses, the water plant and the offices.",
  },
  {
    id: "institute",
    name: "NMSU / DACC institute, packing & logistics",
    acres: 25,
    color: "#d99a00",
    rects: [{ x: 390, y: 520, w: 70, h: 180 }],
    plan: "ours",
    short: "INSTITUTE · PACKING",
    theirs: "Their $6.9 million community fund covers workforce programs, the Boys and Girls Club, DACC and habitat work.",
    ours: "A packing house for the greenhouses and the NMSU / DACC training institute, set between the public road and the exit road so trucks load straight from the street and never enter the secure fence. Funded at $50 million.",
  },
  {
    id: "water",
    name: "Brackish desalination plant",
    acres: 25,
    color: "#1f7ae0",
    rects: [{ x: 460, y: 520, w: 70, h: 180 }],
    plan: "ours",
    short: "WATER PLANT",
    theirs: "They pledge $50 million to CRRUA for water upgrades and describe cooling water as about 9 households' worth. Reporting shows the campus overall needs nearly 1 million gallons a day (Santa Fe New Mexican) and more than first disclosed (Haussamen, April 2026). The Supreme Court also stayed an emergency well authorization in Aug. 2026.",
    ours: "The 5 MGD reverse-osmosis plant NMSU designed for Santa Teresa in 2023, built inside the extended fence south of the dry coolers, delivering water to CRRUA. $269 million for the whole system, 0.16% of the bond.",
  },
  {
    id: "greenhouse",
    name: "Greenhouses, Phase 1 (proposed)",
    acres: 150,
    color: "#2e8b57",
    rects: [{ x: 530, y: 520, w: 420, h: 180 }],
    plan: "ours",
    short: "GREENHOUSES · 150 AC",
    theirs: "Open desert inside the property.",
    ours: "150 acres of glass hydroponic bays directly south of the dry coolers, inside the extended fence, run by commercial growers who lease the land. About a quarter of the roof carries semi-transparent solar. About 60 million pounds of food and 1,000 jobs a year.",
  },
  {
    id: "buffer",
    name: "Wildlife & dust buffer",
    acres: 0,
    color: "#b89a6a",
    rects: [
      { x: 0, y: 570, w: 150, h: 130 },
      { x: 150, y: 520, w: 100, h: 180 },
      { x: 950, y: 304, w: 50, h: 216 },
    ],
    plan: "ours",
    short: "BUFFER",
    theirs: "Open desert.",
    ours: "Native-plant corridor and dust control fed by a small share of desalinated water. Keeps the fence line from becoming bare dirt.",
  },
];

export const undevelopedTheirs = {
  acres: TOTAL_ACRES - zones.filter((z) => z.plan === "both").reduce((s, z) => s + z.acres, 0),
  color: "#e3cfa8",
  rects: [
    { x: 0, y: 520, w: 950, h: 180 },
    { x: 950, y: 304, w: 50, h: 216 },
  ],
};

export const roads = {
  theirs: [
    { points: "200,700 200,520", label: "Secure entrance" },
    { points: "230,700 230,520", label: "" },
  ],
  ours: [
    { points: "200,700 200,520", label: "Secure entrance (unchanged)" },
    { points: "230,700 230,520", label: "" },
    { points: "740,700 740,610 950,610", label: "Produce gate (new, public)" },
  ],
};

// ─── Process constants ──────────────────────────────────────────────────────

export const IT_LOAD_MW = 2450;
export const HEAT_MW = 2400;
export const GH_PEAK_MW_PER_ACRE = 0.6; // winter night root-zone + air heating
export const DESAL_PREHEAT_MW = 15; // 5 MGD feed, +15 °C
export const BRINE_CONCENTRATOR_MW = 20;

export const CO2_BASELINE_MT = 12; // midpoint of 10–14 million tons/yr
export const CO2_LOW_MT = 10;
export const CO2_HIGH_MT = 14;
export const ABQ_LC_MT = 6.7; // Albuquerque + Las Cruces annual emissions
export const CAPTURE_MAX_PENALTY = 0.15; // share of output consumed at max capture

export const NMSU_COST_POINTS: [number, number][] = [
  [1, 35.117],
  [5, 115.545],
  [10, 192.98],
]; // MGD → construction $M (2023)
export const NMSU_SYSTEM_MULTIPLIER = 269.427 / 115.545; // whole system / plant only at 5 MGD
export const NMSU_RECOVERY = 0.75;
export const CRRUA_2027_MGD = 6.0;
export const CRRUA_2042_MGD = 15.0;
export const GAL_PER_HOUSEHOLD_DAY = 300;
export const BOND_M = 165000;

export const SOLAR_ACRES_PER_MW = 4;
export const SOLAR_CAPACITY_FACTOR = 0.24;
export const ROOF_AND_CANOPY_ACRES = 90;
export const COMMUNITY_LOAD_MW = 21; // greenhouses + RO plant + offices, average

export const GH_JOBS_PER_ACRE = 6.5;
export const GH_LBS_PER_ACRE = 400_000;
export const GH_WATER_SAVED_GAL_PER_LB = 22;
export const GH_CO2_TONS_PER_ACRE = 60;
export const GH_LEASE_PER_ACRE_M = 0.13;

// ─── Costs ──────────────────────────────────────────────────────────────────

export const costItems = [
  { item: "Carbon-capture on 2,462 MW of fuel cells (2,275 stacks, manifolded by cluster)", cost: "$1.5B", who: "Developer (Oracle / STACK / BorderPlex)", note: "Order-of-magnitude estimate for concentrated-stream capture; exhaust is ~95% CO₂ per NMED [3]. Includes compression. No vendor quote exists." },
  { item: "NMSU-designed 5 MGD desalination system", cost: "$269M", who: "Developer, delivered to CRRUA / county", note: "2023 NMSU figure for the whole system: wells, plant, storage, brine injection wells, lines [9]. The CBA already funds a $250,000 desalination study [1]." },
  { item: "Plate heat exchanger, pumps, insulated header to greenhouses", cost: "$60M", who: "Developer", note: "Standard district-heating hardware. Pays back in avoided fan and chiller electricity." },
  { item: "~150 acres of glass greenhouses (proposed)", cost: "$450M", who: "Commercial growers (leaseholders)", note: "About $3M per acre for high-tech Venlo glass, industry average. Off the developer's balance sheet. Acreage depends on the unpublished site plan." },
  { item: "Roof and canopy solar (~25–35 MW peak)", cost: "$45M", who: "Developer", note: "Scaled from the reported 3 million sq ft of halls [33]. Runs the community side of the campus." },
  { item: "NMSU / DACC institute endowment", cost: "$50M", who: "Developer", note: "On top of the CBA's Exhibit B payments, which total $11.4M including $4.5M of building-permit fee offsets [1]." },
  { item: "Packing house, produce road, public gate", cost: "$25M", who: "Growers and developer", note: "Keeps farm trucks off the secure entrance." },
];

export const costTotals = {
  developer: "$1.95B",
  growers: "$0.47B",
  pctOfBond: "about 1.5%",
};

export const phases = [
  { when: "Now", title: "Phase 0: Conditions", body: "Doña Ana County amends the IRB leases, the only enforcement tool the CBA gives it [1]. The air-permit hearing is stayed by the Supreme Court, which on Sept. 1, 2026 refused to lift the stay [23]; capture becomes a permit condition before it resumes." },
  { when: "Q4 2026 – Q3 2028", title: "Phase 1: Build together", body: "Their own dates: initial operations Q4 2026, 400-acre phase complete Q3 2028 [1][2]. Capture skids arrive with the fuel cells. Heat exchanger goes in with the chiller plants. NMSU water plant breaks ground. Solar goes on roofs as they close. Greenhouse acreage set from the site plan." },
  { when: "2028–2032", title: "Phase 2: Expand", body: "Greenhouses grow on unbuilt acres by agreement. Desalination expands toward 10 MGD as CRRUA demand rises toward 15 MGD by 2042 [9]. CO₂ sequestration reaches full volume." },
  { when: "2032–2045", title: "Phase 3: Retire the gas", body: "HB93 already requires qualified microgrids to run on net-zero carbon resources by 2045 [1]. Geothermal or grid clean power replaces fuel cells as they age out. This is the only path to actual zero, and we say so." },
];

export const receipts = [
  {
    claim: "Fuel-cell exhaust is concentrated enough to capture cheaply",
    proof: "Bloom Energy's own materials: about ten times the CO₂ concentration of a gas turbine, in one fifteenth the gas volume. Bloom and Chart Industries announced a carbon-capture partnership for exactly this stream.",
    href: "https://www.bloomenergy.com/news/bloom-energy-and-chart-industries-announce-groundbreaking-carbon-capture-partnership/",
    label: "Bloom / Chart announcement",
  },
  {
    claim: "The emissions numbers are theirs, not ours",
    proof: "Air Quality Permit application 10883 (Yucca Growth Infrastructure) to the New Mexico Environment Department, with greenhouse gas estimates of roughly 10 million tons a year and NOx split across microgrid permits.",
    href: "https://nmed.commentinput.com/comment/extra?id=tBWf3NmbZ&lang=en",
    label: "NMED permit 10883",
  },
  {
    claim: "The water plant is already designed and priced",
    proof: "Dr. Pei Xu, NMSU Civil Engineering, to the Legislature's Science, Technology and Telecommunications Committee, Oct. 31, 2023: 5 MGD brackish RO for Santa Teresa, 75% recovery, $115.5M plant, $269M system, brine to deep injection wells. Mesilla Basin holds ~65 million acre-feet of recoverable water.",
    href: "https://www.nmlegis.gov/handouts/STTC%20103023%20Item%208%20Santa%20Teresa%20Brackish%20water%20desalination.pdf",
    label: "NMSU study (PDF)",
  },
  {
    claim: "Brackish desalination works in this exact desert",
    proof: "El Paso's Kay Bailey Hutchison plant has treated Hueco Bolson brackish water since 2007 at 27.5 MGD, piping brine 22 miles to three injection wells. It is 30 miles from Santa Teresa.",
    href: "https://www.epwater.org/our-water/water-resources/desalination",
    label: "El Paso Water",
  },
  {
    claim: "The layout is theirs",
    proof: "Every building in our plan is in the position shown on Project Jupiter Together's labeled site render dated Aug. 27, 2026. We add nothing inside their fence.",
    href: "https://projectjupitertogether.com/wp-content/uploads/2026/08/Project-Jupiter-Site-Render_Labeled-8.27.26-Website.jpg",
    label: "Their labeled render",
  },
  {
    claim: "Data center heat already grows food elsewhere",
    proof: "Gothenburg, Sweden runs a greenhouse on data center heat with the city energy company. Dutch policy pushes data centers to supply heat networks. Equinix's Paris PA10 grows produce on the roof.",
    href: "https://sweden.se/",
    label: "Sweden.se",
  },
  {
    claim: "They signed for 750 jobs, not 1,500",
    proof: "The agreement between the developers and Doña Ana County requires 2,500 construction workers and 750 full-time workers once operational. The 7,000 and 1,500 figures on their website are marketing projections, not obligations.",
    href: "https://elpasomatters.org/2025/09/16/new-mexico-data-center-water-project-jupiter-santa-teresa-el-paso-texas/",
    label: "El Paso Matters",
  },
  {
    claim: "The Supreme Court just refused to unfreeze the permit",
    proof: "On Sept. 1, 2026 the New Mexico Supreme Court unanimously denied the developers' bid to partially reopen the air-permit proceeding. The Sept. 14 hearing on Permit 10883 will not happen while the stay stands.",
    href: "https://www.abqjournal.com/news/nm-supreme-court-leaves-project-jupiter-permit-on-hold/3113794",
    label: "Albuquerque Journal",
  },
  {
    claim: "The permit really is frozen",
    proof: "The New Mexico Supreme Court stayed the air-permit proceeding and an emergency well authorization in August 2026. The State Land Office has denied the pipeline route twice.",
    href: "https://nmpoliticalreport.com/2026/08/24/new-mexico-supreme-court-puts-project-jupiter-air-proceeding-emergency-well-authorization-on-hold/",
    label: "NM Political Report",
  },
];

// ─── Top-view features, traced from the Aug. 27, 2026 labeled render ────────
// Canvas 1200 x 785, north up. The photo looks north-east across the campus,
// so: Operations and parking are south-west, the Warehouse is north of Operations,
// the big front Data Center is centre, three more halls are north of it, the
// Transformer Yard and Modular Chiller Plants run along its east side, and the
// Dry Cooler rows form the east edge. Gates are on the south fence.

export type FeatureKind = "hall" | "building" | "yard" | "coolers" | "parking" | "gate" | "fence" | "new" | "ghost";

export type Feature = {
  id: string;
  zoneId: Zone["id"];
  kind: FeatureKind;
  label: string;
  sub?: string;
  rect: Rect;
  /** degrees, clockwise, about the rect centre */
  rotate?: number;
  /** a corner cut out of the rectangle */
  notch?: { corner: "ne" | "nw" | "se" | "sw"; w: number; h: number };
  plan: "both" | "ours";
};

export const CANVAS = { w: 1200, h: 800 };
/** Their security fence: only around the halls, chiller plants and dry coolers. Operations, warehouse and parking are outside it. */
export const FENCE_THEIRS = "240,18 1196,18 1196,600 240,600";
/** Upgraded: the same fence, extended south so every addition is inside it. */
export const FENCE_OURS = "240,18 1196,18 1196,796 18,796 18,630 240,630";
export const SOURCE_NOTE =
  "Layout source: Project Jupiter Together's labeled site render dated Aug. 27, 2026, from their media gallery [6]. It is the only site drawing the developers have published; no top-down plan has been released. The signed Community Benefits Agreement describes a site of about 819 acres with a 400-acre first phase [1]; the render shows that phase. Positions are read from the image and are not survey-accurate.";

// DC = dry coolers, DS = data center, WH = warehouse, OP = operations, P = parking, CP = chiller plant.

export const features: Feature[] = [
  // ── Their render ──
  { id: "dryNorth", zoneId: "dry", kind: "coolers", label: "DRY COOLERS", sub: "north band", rect: { x: 365, y: 28, w: 770, h: 27 }, plan: "both" },
  { id: "warehouse", zoneId: "ops", kind: "building", label: "WAREHOUSE", sub: "outside the fence", rect: { x: 140, y: 92, w: 145, h: 105 }, plan: "both" },
  { id: "dcN1", zoneId: "halls", kind: "hall", label: "DATA CENTER", sub: "north row, west", rect: { x: 367, y: 92, w: 371, h: 108 }, notch: { corner: "ne", w: 40, h: 32 }, plan: "both" },
  { id: "dcN2", zoneId: "halls", kind: "hall", label: "DATA CENTER", sub: "north row, east", rect: { x: 844, y: 92, w: 324, h: 108 }, notch: { corner: "nw", w: 36, h: 32 }, plan: "both" },
  { id: "ops", zoneId: "ops", kind: "building", label: "OPERATIONS", sub: "outside the fence", rect: { x: 75, y: 240, w: 90, h: 140 }, plan: "both" },
  { id: "parking", zoneId: "ops", kind: "parking", label: "PARKING", rect: { x: 65, y: 410, w: 120, h: 90 }, plan: "both" },
  { id: "dcMain", zoneId: "halls", kind: "hall", label: "DATA CENTER", sub: "main hall", rect: { x: 264, y: 248, w: 468, h: 204 }, notch: { corner: "ne", w: 40, h: 36 }, plan: "both" },
  { id: "dcE", zoneId: "halls", kind: "hall", label: "DATA CENTER", sub: "east of the main hall", rect: { x: 844, y: 268, w: 324, h: 147 }, notch: { corner: "nw", w: 40, h: 36 }, plan: "both" },
  { id: "cp1", zoneId: "power", kind: "yard", label: "CHILLER PLANT", rect: { x: 275, y: 480, w: 150, h: 40 }, plan: "both" },
  { id: "cp2", zoneId: "power", kind: "yard", label: "CHILLER PLANT", rect: { x: 445, y: 480, w: 130, h: 40 }, plan: "both" },
  { id: "cp3", zoneId: "power", kind: "yard", label: "CHILLER PLANT", rect: { x: 600, y: 480, w: 145, h: 40 }, plan: "both" },
  { id: "u1", zoneId: "power", kind: "yard", label: "UNITS", rect: { x: 840, y: 480, w: 100, h: 40 }, plan: "both" },
  { id: "u2", zoneId: "power", kind: "yard", label: "UNITS", rect: { x: 955, y: 480, w: 105, h: 40 }, plan: "both" },
  { id: "u3", zoneId: "power", kind: "yard", label: "UNITS", rect: { x: 1080, y: 480, w: 100, h: 40 }, plan: "both" },
  { id: "drySW", zoneId: "dry", kind: "coolers", label: "DRY COOLERS", sub: "south band, west", rect: { x: 275, y: 545, w: 485, h: 45 }, plan: "both" },
  { id: "drySE", zoneId: "dry", kind: "coolers", label: "DRY COOLERS", sub: "south band, east", rect: { x: 830, y: 540, w: 360, h: 55 }, plan: "both" },
  { id: "entrance", zoneId: "ops", kind: "gate", label: "SECURE ENTRANCE", sub: "gate in the fence", rect: { x: 227, y: 333, w: 26, h: 24 }, plan: "both" },
  { id: "exit", zoneId: "ops", kind: "gate", label: "SECURE EXIT", sub: "gate in the fence", rect: { x: 227, y: 454, w: 26, h: 24 }, plan: "both" },
  { id: "booth", zoneId: "ops", kind: "gate", label: "GUARD BOOTH", sub: "on the public road", rect: { x: 17, y: 560, w: 26, h: 22 }, plan: "both" },
  { id: "gateTop", zoneId: "ops", kind: "gate", label: "GATE", rect: { x: 230, y: 58, w: 20, h: 24 }, plan: "both" },
  { id: "gateCross", zoneId: "ops", kind: "gate", label: "GATE", rect: { x: 230, y: 203, w: 20, h: 24 }, plan: "both" },
  // ── Ours, all inside the fence ──
  { id: "capture", zoneId: "capture", kind: "new", label: "CO₂ CAPTURE", sub: "inside the fence, at the exhaust", rect: { x: 250, y: 28, w: 108, h: 27 }, plan: "ours" },
  { id: "hx", zoneId: "power", kind: "new", label: "HX", sub: "heat exch.", rect: { x: 755, y: 480, w: 30, h: 40 }, plan: "ours" },
  { id: "solarGround", zoneId: "solar", kind: "new", label: "SOLAR STRIP", sub: "between dry coolers and greenhouses", rect: { x: 275, y: 604, w: 915, h: 26 }, plan: "ours" },
  { id: "greenhouse", zoneId: "greenhouse", kind: "new", label: "GREENHOUSES · PROPOSED · ~150 AC", sub: "location to be set from their site plan · ¼ roof semi-transparent solar", rect: { x: 275, y: 640, w: 715, h: 150 }, plan: "ours" },
  { id: "water", zoneId: "water", kind: "new", label: "WATER PLANT", sub: "5 MGD RO · inside the fence", rect: { x: 1005, y: 640, w: 185, h: 150 }, plan: "ours" },
  { id: "packing", zoneId: "institute", kind: "new", label: "PACKING · INSTITUTE", sub: "fronts both roads · loading docks on the street", rect: { x: 48, y: 640, w: 126, h: 150 }, plan: "ours" },
];

export const topRoads = {
  theirs: [
    // public side (west of the fence)
    { id: "west", points: "30,200 30,800", label: "" },
    { id: "inner", points: "205,70 205,540 195,585 185,612 185,800", label: "" },
    { id: "uBottom", points: "30,525 205,525", label: "" },
    { id: "cross", points: "25,215 1185,215", label: "" },
    { id: "top", points: "124,70 1185,70", label: "" },
    { id: "northWest", points: "124,70 124,215", label: "" },
    { id: "stubIn", points: "205,345 248,345", label: "" },
    { id: "stubOut", points: "205,466 248,466", label: "" },
    // inside the fence
    { id: "eastSide", points: "1185,70 1185,466", label: "" },
    { id: "block", points: "248,232 248,466 1185,466 1185,232 248,232", label: "" },
    { id: "whRight", points: "300,70 300,215", label: "" },
    { id: "n1Left", points: "352,70 352,215", label: "" },
    { id: "n1Right", points: "752,70 752,215", label: "" },
    { id: "n2Left", points: "826,70 826,215", label: "" },
    { id: "mainRight", points: "752,215 752,466", label: "" },
    { id: "eastLeft", points: "826,215 826,466", label: "" },
  ],
  ours: [] as { id: string; points: string; label: string }[],
};

export const solarRoofIds = ["dcN1", "dcN2", "dcMain", "dcE", "warehouse", "ops", "parking"];
export const agrivoltaicIds = ["greenhouse"];

// ─── Year-by-year timeline (upgraded plan), same year marks as the net-loss section ──
export const timelineYears: { year: number; when: string; facts: string; built: string; running: string; delivered: string }[] = [
  { year: 0, when: "Now · 2026", facts: "What has actually happened: Nov. 12, 2025, Doña Ana County and the developers sign the Community Benefits Agreement alongside $165B in industrial revenue bonds [1]. Oct. 23, 2025, an emergency well authorization is issued; more than 103 million gallons are pumped April–August 2026 [25]. March and July 15, 2026, the State Land Office denies the pipeline's state-land segment [10]. July 2, 2026, four legislators propose a statewide data-center moratorium for 2027 [34]. July 28, 2026, the developers report 2,755 workers and 9% construction progress [2]. July 29, 2026, NMED publishes the draft air permit: 2,462 MW, 10,144,115 tons of CO₂e a year [3]. Aug. 24, 2026, the Supreme Court stays the air-permit hearing and the well; Sept. 1, 2026, it refuses to lift the stay [24][23]. The county reports missed quarterly job reports [32].", built: "Concrete is being poured (9% complete, their figure). Air permit and construction well are stayed by the Supreme Court.", running: "Nothing yet.", delivered: "Conditions written into the county IRB leases: capture before power-on, one permit, heat offered to growers, NMSU plant funded, bonds tied to verified jobs." },
  { year: 1, when: "2027", facts: "Their filed dates: initial operations targeted for Q4 2026 [1]. The Microgrid Oversight Act (SB 235) passed the Senate and died in the House in 2026; sponsors plan to reintroduce it in the 2027 session [35], alongside the proposed moratorium [34]. Whether the stayed permit is reissued with conditions is decided in this window.", built: "First halls close in. Heat exchanger installed with the chiller plants. Capture skids ordered with the fuel cells. NMSU water plant breaks ground.", running: "Construction only. Solar goes on each roof as it closes.", delivered: "First quarterly job and emissions reports published." },
  { year: 2, when: "2028 · their Q3 2028 target", facts: "Their filed dates: the 400-acre first phase, including the microgrid, complete by Q3 2028 [1]. Their $50M water fund is paid and CRRUA pipe projects finish [2]. Fuel cells begin running 8,760 hours a year under permit 10883 [3].", built: "400-acre first phase complete. Capture, dryer and compression on every fuel-cell cluster. Water plant online at 5 MGD.", running: "Fuel cells at full load with capture from the first day. Heat header live. First greenhouse block (~50 acres) planted.", delivered: "5 million gallons a day into CRRUA's pipes. First produce trucks out the produce gate." },
  { year: 5, when: "2031 · their 100% matching date", facts: "Their filed dates: 750 full-time and 50 part-time jobs due within three years of opening [1]; \"100% carbon-free energy matching by 2031\", an accounting match, not a stack change [2]. First $12M-a-year payments in lieu of taxes accrue toward $360M over 30 years [1].", built: "~150 acres of greenhouses. Brine and CO₂ lines complete.", running: "90–95% of stack CO₂ captured, with the used share (greenhouses, concrete, aggregate) growing; geothermal test wells drilled and the first delivered wind and solar contract throttling the fuel cells (targets).", delivered: "~3,000 permanent jobs, 60 million lbs of food a year, about 5 billion gallons of clean water so far." },
  { year: 10, when: "2036", facts: "Their plan: unchanged operation. About 101 million tons of CO₂e released so far at the permitted rate, or about 61 million at the developers' expected rate [3][2].", built: "Desalination expanded toward 10 MGD as CRRUA demand grows.", running: "First 100–200 MW of geothermal online (target, sized by the test wells); gas hours falling year on year; every stack monitored and public.", delivered: "About 15 billion gallons of clean water so far; about $330 million in conditioned bond payments so far." },
  { year: 15, when: "2041", facts: "Their plan: unchanged operation. CRRUA demand projected at 15 MGD by 2042 with no new supply from the campus [9].", built: "Greenhouse acreage set by demand, up to the unbuilt acres.", running: "Fuel cells begin aging out; replacement plan filed under HB93.", delivered: "About 24 billion gallons; about 780 million lbs of food; about $500 million in bond payments." },
  { year: 20, when: "2046 · HB93 net-zero deadline (2045)", facts: "HB93 requires qualified microgrids to run on net-zero carbon resources by 2045 [1]; the filed plan has not said how.", built: "Gas fuel cells replaced by geothermal or clean grid supply as they retire.", running: "Zero at the stack, required by state law by 2045.", delivered: "The only path to actual zero, stated as such." },
  { year: 25, when: "2051", facts: "Their plan: no filed milestones. IRB term continues.", built: "Campus at full 819-acre build-out.", running: "Water, food, power and training on one site.", delivered: "About 42 billion gallons; about $830 million in bond payments." },
  { year: 30, when: "2056 · end of the 30-year IRB term", facts: "2055–56: the 30-year IRB term ends and the property returns to the tax rolls; their payments total about $360M [1].", built: "Bonds retire; property returns to the tax rolls.", running: "Everything above, owned and operated locally where the leases allow.", delivered: "About $1 billion to schools and services, against their $360 million." },
];
