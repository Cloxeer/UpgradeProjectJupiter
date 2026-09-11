// The story, word for word from docs/research/SCRIPT.md (draft 2, voice rule applied).
// Every number here traces to KNOWLEDGE.md; the source ids are rendered on the expert tier.
// Ranges use a hyphen. No dashes as punctuation anywhere a reader sees.
import type { Tiered } from "./depth";

export const GUIDE = {
  name: "Sebastian",
  role: "NMSU computer science",
  intro: "I'm Sebastian. I study computer science at NMSU, and I read the whole permit. I want to show you what this is, and a better way to build the same thing. How much do you want?",
};

// ─── Home ────────────────────────────────────────────────────────────────────

export const hook = {
  line: "In Doña Ana County, west of El Paso, a computer the size of a town is being built.",
  sub: "It will run on its own gas power plant, every hour of the year, and draw as much electricity as Albuquerque and Las Cruces together.",
  imageAlt: "The Project Jupiter construction site in the desert at Santa Teresa, New Mexico",
};

export const stakes: { title: string; line: Tiered; tiles: { value: string; label: string }[] } = {
  title: "What's at stake",
  line: {
    simple: "As the plan is written, the carbon goes up into the sky, the water comes from the aquifer the towns drink from, and the heat blows out into the desert.",
    normal:
      "Here is what the plan does as it is written. The permit allows 8.8 million tons of carbon dioxide a year up the stacks, more than Albuquerque and Las Cruces combined; the water comes from the same aquifer Santa Teresa and Sunland Park drink from, the one that has been dropping since 2000; and the computers' heat, as much as 90,000 home furnaces, blows out into the desert. About 17,500 people have already written to the state about it.",
    expert: {
      text: "Draft Permit 10883 Part A, Table 102.A, sets facility-wide greenhouse gas at 8,820,970 tons CO₂e a year after NMED removed the applicant's 15% safety factor; the developers expect about 40% less in practice, still about the emissions of Albuquerque and Las Cruces combined. The Mesilla basin, measured yearly by the USGS since 1987, fell across 2000-2020; 103 million gallons were pumped from it under an emergency well authorization in five months of 2026 before the Supreme Court stayed the well, and the towns' utility expects to need 6 million gallons a day in 2027 and 15 by 2042. The 2,462 MW of computer heat leaves through dry coolers at 45-65 °C, uncounted. Smog gases are estimated from four four-hour tests of one 65 kW unit with no continuous stack monitor required. About 17,500 comments reached NMED; the state Department of Justice is investigating whether some were filed without consent, an investigation with no findings yet.",
      cites: ["sob-part-a", "bocc", "sourcenm-cities", "usgs-mesilla-taap", "cbd-well", "nmpr-stay", "nmsu", "sob", "sourcenm-comments", "nmdoj-comments"],
    },
  },
  tiles: [
    { value: "8.8 million tons", label: "of CO₂ a year, permitted" },
    { value: "103 million gallons", label: "already pumped from the towns' aquifer" },
    { value: "90,000 furnaces", label: "of heat, blown away" },
  ],
};

export const idea: { headline: string; line: Tiered; marks: string[] } = {
  headline: "You don't have to stop it to fix it.",
  line: {
    simple: "Build the same campus, on the same land, on the same schedule, and make it catch its carbon, make its own water, use its heat, and burn less gas each year.",
    normal:
      "This is the part that surprised me. Same 819 acres, same buildings, same opening date. You just build it the better way: catch the carbon instead of venting it, make water instead of only pumping it, send the heat next door instead of into the sky, and let the share of gas fall over time. About 8% more on the $50 billion first phase. That's the whole idea.",
    expert: {
      text: "Four changes, none of which move a building, in order of what they do for the air, the water and the land: capture-ready fuel-cell stacks with the CO₂ metered at the stack, since the dried exhaust is about 95% CO₂, the easy case; NMSU's designed 5 MGD brackish plant funded by the developer and handed to the towns' utility, with the towns' reclaimed water recharged under a State Engineer permit; one heat exchanger before the dry coolers feeding about 150 acres of greenhouses; and a public meter on which the share of energy from gas falls over time, as a target. Developer capital of about $3.4-3.9 billion plus $640 million in payments over 30 years: about 8% of the $50 billion first phase (2.5% of the $165 billion bond cap, a ceiling, not cash), before the federal 45Q credit of $85 a ton for 12 years.",
      cites: ["sob", "bloom-chart", "nmsu", "nm-asr-act", "agriport", "enefg", "nmsa-62-17-12", "cba", "irs-45q"],
    },
  },
  marks: ["catch the carbon", "make the water", "use the heat", "shrink the gas"],
};

export const years: { title: string; line: Tiered; strip: { year: number; cal: string; caption: string; on?: boolean }[]; closing: string; button: string } = {
  title: "The years",
  line: {
    simple: "It doesn't happen all at once, and I won't pretend it does: the first real changes land about five years in.",
    normal:
      "I want to be honest about the years. For the first two or three, the upgraded campus looks almost the same as the ordinary one: the meters go on, the permits get filed, the water plant is built. Around year five the plant opens, recharge begins, capture is metered, and the first greenhouses go up. By year ten, capture is at its target or the lease charges for the shortfall. The aquifer's decline slows. It doesn't stop, and I won't say it does.",
    expert: {
      text: "Year 0-1 (2026-27): conditions negotiated at the next consent point; stack meters and independent audits; NMSU plant final design; ASR, Class VI and pipeline applications filed. Year 2 (2028): capture skids installable but no storage line yet, so CO₂ is measured and about 1% goes to concrete; ours is about the same as theirs on carbon and water. Year 5 (2031): 5 MGD plant online, recharge begins from about 2 MGD of reclaimed water, storage line connected, capture metered at 50-75% (the best operating plants' range), first greenhouse block. Year 10 (2036): capture at the 90-95% target or a lease penalty, full greenhouse acreage, about 3,000 permanent jobs; residual carbon 0.45-1.0 Mt a year including the 120-370 MW energy penalty. Year 20 (2045-46) is the state's net-zero date, met by a falling share of gas on a public meter as a target; year 30 (2056) the lease ends and the closure bond is exercised or renewed; the well series at year 40-80 shows whether the decline slowed, an estimate, labelled.",
      cites: ["nmsu", "boundary-dam-2024", "epa-class-vi", "bocc", "cba", "nmsa-62-17-12", "dac-solar-decom", "usgs-mesilla-taap"],
    },
  },
  strip: [
    { year: 0, cal: "2026", caption: "conditions negotiated" },
    { year: 1, cal: "2027", caption: "meters on" },
    { year: 2, cal: "2028", caption: "full power; carbon measured" },
    { year: 5, cal: "2031", caption: "water plant opens; capture metered; first greenhouses", on: true },
    { year: 10, cal: "2036", caption: "capture at target, or the lease charges for it", on: true },
    { year: 20, cal: "2045", caption: "gas share falling, on a public meter" },
    { year: 30, cal: "2056", caption: "lease ends; bond exercised" },
    { year: 80, cal: "estimate", caption: "the wells tell the story" },
  ],
  closing: "It gets decided at the county's next consent point on the lease, and the permit record is open now. The full plan is on the next page.",
  button: "See the full plan",
};

// ─── Blueprint ───────────────────────────────────────────────────────────────

export const blueprint = {
  opening: "This is the plan. Four changes, six conditions, one campus, in the order of what they do for the air, the water and the land.",
  site: {
    title: "The site",
    line: {
      simple: "Their buildings don't move; the upgrade fits inside the fence and on the empty land beside it.",
      normal:
        "Every building in the filed plan stays exactly where it is. The capture skids sit beside the fuel cells, the water plant and recharge basins on the west side, and the greenhouses on the empty acres by the dry coolers, inside the extended fence.",
      expert: {
        text: "The filed site is 819 acres with a 400-acre first phase; the fence encloses the halls, chillers and dry coolers, with operations, warehouse and parking outside it. Additions: capture manifolds and skids at the fuel-cell yard with a pipeline corridor; the 5 MGD plant (6.7 MGD brackish feed at 75% recovery, two deep brine injection wells) and infiltration basins; about 150 acres of greenhouses beside the dry coolers; the packing house and training institute fronting the public roads. All additions lie inside the extended fence; nothing crosses a road.",
        cites: ["cba", "render", "nmsu", "sob"],
      },
    } as Tiered,
  },
  changesTitle: "The four changes",
  changes: [
    {
      id: "carbon",
      title: "Carbon",
      line: {
        simple: "The fuel cells' exhaust is almost pure CO₂, so a capture unit can catch most of it, and a meter shows how much it really catches.",
        normal:
          "Dried, the exhaust from these fuel cells is about 95% CO₂, which is the easy case for capture. Bloom announced a capture product with Chart in 2025; no plant runs it yet, and the best capture plants anywhere sustain 50-75%. So the condition is metered tons against a 90-95% target, with the stacks built capture-ready before power-on. A little is fed to the greenhouses and to concrete; the rest goes by pipeline to storage in Texas.",
        expert: {
          text: "NMED describes the anode exhaust as about 95% CO₂ once dried. Bloom-Chart capture was announced Feb. 2025 with no operating plant; Boundary Dam captured 848,388 t in 2024 at 85% availability against a 1 Mt design, long-run about 660 kt a year. The energy penalty is 5-15%, about 120-370 MW, and is added to the emissions math, so the residual at the 90-95% target is 0.45-1.0 Mt a year. Use before storage: greenhouse enrichment only with vents closed (a cool-season practice, about 9,000 t a year, 0.1% of the stream) and concrete curing; storage needs a roughly 200-mile line to Class VI wells in Texas, where the Railroad Commission holds primacy, with 50-year post-injection care and financial assurance up front. 45Q pays $85 a ton stored for 12 years.",
          cites: ["sob", "bloom-chart", "boundary-dam-2024", "sob-part-a", "osu-co2-enrichment", "carboncure", "epa-class-vi", "irs-45q"],
        },
      } as Tiered,
      conditions: [
        { n: 1, short: "Catch the CO₂ at the stack before power-on.", gate: "Metered tons captured, published quarterly; a shortfall is charged in the lease." },
        { n: 2, short: "Every stack on a public meter, limits set for the capture configuration.", gate: "Continuous monitors per cluster with same-day public data." },
      ],
    },
    {
      id: "water",
      title: "Water",
      line: {
        simple: "A plant NMSU already designed turns deep salty water into five million gallons a day, and the towns' cleaned wastewater goes back into the aquifer.",
        normal:
          "NMSU designed a plant in 2023 that makes 5 million gallons a day from brackish water nobody can drink. The county is already building a smaller one with $15 million of Project Jupiter tax money; the condition is that the developer funds the full NMSU system instead and hands it to the towns' utility. There's no surplus, the towns will need 6 million a day next year, so the recharge is the towns' reclaimed water, about 2 million gallons a day, under a state storage permit. The decline slows. It doesn't reverse, and I won't say it does.",
        expert: {
          text: "NMSU M36 (2023): 5 MGD RO at Santa Teresa, 75% recovery, $115.5M plant and $269.5M whole system, O&M $1.16M a year, two deep brine injection wells; brine 18-25k t a year of salts, minerals a byproduct only after EWM's El Paso plant failed at commissioning. Demand 3.1 MGD (2020) to 6 (2027) to 15 (2042), so no plant surplus in Phase 1; recharge is the three plants' reclaimed flow, about 1.85 MGD, under the Ground Water Storage and Recovery Act with a water right and return-flow offset, on the Bear Canyon (2014) and Rio Rancho (2017) precedents; El Paso has recharged since 1985. The county's STAR plant (4 MGD RO plus 1.5 reuse, about $75M, 2028-29) proceeds regardless. The unused sod-farm right, about 2,400-2,600 acre-feet a year, stays in a State Engineer conservation program, which NMSA 72-12-8 protects from forfeiture. Opens about 2031.",
          cites: ["nmsu", "ewm-elpaso", "gao-brine-minerals", "nm-asr-act", "abcwua-bear-canyon", "rio-rancho-pure", "epwater-recharge", "star-plant", "nmsa-72-12-8"],
        },
      } as Tiered,
      conditions: [
        { n: 4, short: "Fund the NMSU water plant, hand it to the towns' utility, recharge the towns' reclaimed water, and leave the unused farm water right in the aquifer.", gate: "Plant commissioned and transferred; recharge permit issued; conservation-program filing on record." },
        { n: 6, short: "A closure and monitoring bond, so the land and wells are cared for after the lease ends.", gate: "Engineer's estimate posted, revised every five years, on the county's own solar-decommissioning template." },
      ],
    },
    {
      id: "heat",
      title: "Heat, food and jobs",
      line: {
        simple: "One heat exchanger in front of the fans sends the computers' warmth to about 150 acres of greenhouses next door, which grow up to 60 million pounds of food a year and add about 1,000 jobs.",
        normal:
          "The computers reject about 2,462 megawatts of heat through fans. One heat exchanger before those fans carries it, as warm water, to greenhouses on the empty land beside them: root-zone heat for cool seasons and mornings; in summer they vent like any greenhouse, so I don't count summer. The signed agreement binds the company to 750 jobs; greenhouses, the water plant, capture and a training institute lift the enforceable count to about 3,000, paid as jobs are verified each year.",
        expert: {
          text: "The loop runs 45-65 °C; absorption chillers need about 90 °C, so no cooling is counted, and greenhouse root heat plus desalination preheat use about 1% of the total heat. Precedents: Agriport A7 pairs data centers with growers at scale; Germany's EnEfG requires 10-20% reuse; Gothenburg runs a 130 m² pilot. Food: 150 acres at about 400,000 lbs an acre, up to 60 million pounds a year, with far fewer pesticides than field farming. Jobs: the CBA binds 750 full-time plus 50 part-time within three years; ours is about 3,000 permanent in Phase 1 (1,500 tech, about 1,000 greenhouse at 4-6.5 an acre, about 250 water and capture, about 250 institute), 4,800 at full build; the county's IRB Safeguards policy already allows clawbacks. Pad-cooling water is about 1-1.6 MGD, which is why this part depends on the water plant.",
          cites: ["absorption-review", "nmsu", "agriport", "enefg", "goteborg-energi", "sweden", "cba", "epm-jobs", "dac-irb-safeguards"],
        },
      } as Tiered,
      conditions: [
        { n: 3, short: "Offer the computers' heat to greenhouses next door.", gate: "Heat exchanger installed before the dry coolers; verified by the county engineer at commissioning." },
        { n: 5, short: "Tie the tax break to real jobs, with a training school on site.", gate: "Verified headcount annually; the PILT schedule follows the count." },
      ],
    },
    {
      id: "gas",
      title: "Gas",
      line: {
        simple: "Wind from the big new line, geothermal from under the county, and a public meter that shows the share of gas falling every year.",
        normal:
          "Solar on the roofs is real but small, about a quarter of one percent. What moves the number is delivered wind and solar over new transmission, and geothermal, which this county has at depth. The honest measure is a public meter showing the share of energy from gas falling over time, as a target. Even at the most optimistic settings, about half the energy is still gas for years.",
        expert: {
          text: "SunZia has 3,021 MW contracted west of here and the line runs to Arizona; new transmission is the constraint. Geothermal: the county shows 150 °C at under 1-5.5 km; Lightning Dock produces about 11 MW; Fervo's Cape project scales 100 to 500 MW by 2028 at $3-7M per MW. Rooftop solar is about 0.25% of load. HB93's net-zero definition (NMSA 62-17-12(E)(2)) counts a gas plant that offsets a tenth of its CO₂ with methane cuts, so this site says \"falling share of gas (target)\", never \"zero gas by law\". The developers' own route is carbon-free energy matching by 2031: accounting, not stacks.",
          cites: ["sunzia-eia", "dona-ana-geothermal", "fervo-cape", "gsa-2011", "nmsa-62-17-12", "bocc"],
        },
      } as Tiered,
      conditions: [] as { n: number; short: string; gate: string }[],
      note: "No standalone condition; the gas-share meter is part of Condition 2's public data.",
    },
  ],
  cost: {
    title: "What it costs, and when",
    line: {
      simple: "About 8% more on the $50 billion first phase, most of the capture part repayable by a federal credit, with the first real changes about five years in.",
      normal:
        "Capture and its pipeline and wells, the heat exchanger, the water plant, solar and the institute add about $3.4-3.9 billion of developer capital plus $640 million in payments over 30 years. Against the $50 billion the companies committed for the first five years, that's about 8%. The federal capture credit, $85 a ton for 12 years, could repay most of the capture line. Growers bring their own $470 million.",
      expert: {
        text: "Developer capital $3.4-3.9B including $1.5-2B for CO₂ transport, wells and storage care; PILT $640M over 30 years; grower capital $0.47B. Denominator: the CBA's $50B first phase leads (about 8%); the $165B IRB cap is second (2.5%) and is a ceiling, not cash; PILT is county revenue and never a denominator. 45Q at $85 a ton for 12 years against 8-9 Mt a year captured is on the order of the capture capital. Economic impact about $6.4B (their $4.7B plus $1.7B). Each line in the table carries its truth label: fact, verified estimate, projection, or unknown.",
        cites: ["cba", "nmsu", "epa-class-vi", "irs-45q"],
      },
    } as Tiered,
    sourcesLine: "Every number on this page traces to a document.",
  },
  act: {
    title: "Act on the record",
    lead: "A petition has no force here. Two things do: a written comment on the permit record, and three minutes at the commission microphone. Here is how to do both.",
    closing: "That's everything I know. Thank you for reading all of it.",
  },
};
