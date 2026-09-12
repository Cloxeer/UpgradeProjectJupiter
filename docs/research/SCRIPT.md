# SCRIPT.md — every word the reader sees

Draft 2, Sept. 10, 2026. The site's screenplay. Edit this before any component exists; `src/data/story.ts` is built from it verbatim.
Facts: every number traces to `KNOWLEDGE.md` and a `sources.ts` id in brackets. Nothing here is new information — only new sentences.

## How to read this file

- **Guide** = Sebastian, first person. An NMSU computer-science student who read Permit 10883. Named once (under the hook), then simply "I".
- **Three tiers, one contract.** Simple = exactly one sentence. Normal = one to three. Expert = four to five, with sources.
  Simple never carries a citation. Normal may carry one number. Expert carries the numbers and the ids.
- **Four sections per page, never more.** The reader chooses depth once (under the hook) and can change it with a small chip. Nothing else asks them to choose anything until the one button.
- **Order of the four changes, everywhere on the site, by environmental impact:** carbon → water → heat → gas. (Carbon is the largest quantity; water is the local, slow-to-reverse one; heat's environmental effect is small — its value is food and jobs; the gas share is long-term and least certain.)
- **Place is named once**, in the hook. No section re-introduces where we are.
- **Wording rules that stay in force** (KNOWLEDGE §7): "falling share of energy from gas (target)", never "zero gas by law". "Negotiate into the lease at the next consent point", never "write into". Water: "decline slowed", never held or reversed. Capture: a *target*, "announced, no plant runs it yet". Food "up to 60 million pounds", "far fewer pesticides". Cost leads with "about 8% of the $50 billion first phase", then "(2.5% of the $165 billion bond cap, a ceiling, not cash)". Never "no operations permitted until".
- Voice: plain, specific, unhurried. Short sentences. No slogans, no exclamation marks, no "imagine". Say what is, then what could be.
- **Never sound superior.** The guide read a document — that is the whole of the authority. Lean on what the permit says, not on the reader (or the builders) missing something. Banned framings: "ordinary", "the default", "defaults get built", "nothing unusual", "that's the problem", "it isn't evil". What is routine to the industry is new to most readers; don't tell them it's obvious.

---

## HOME — the story (four sections)

### Header
Logo · Blueprint · Science · Legislators · FAQ · Sources
(Reference only. The story never points at the header.)

### 1 — The hook
**Image:** one wide still of the desert and the construction site (placeholder for now).
**On the image (all tiers, same words):**

> In Doña Ana County, west of El Paso, a computer the size of a town is being built.

**Under it (all tiers):**

> It will run on its own gas power plant, every hour of the year, and draw as much electricity as Albuquerque and Las Cruces together.

**The guide, directly under (this is the fork — a control, not a section):**
**Portrait:** small, real photo of Sebastian (placeholder).

> I'm Sebastian. I study computer science at NMSU, and I read the whole permit.
> I want to show you what this is, and a better way to build the same thing. How much do you want?

- **Simple** — *one sentence each*
- **Normal** — *a short paragraph*
- **Expert** — *the full case, with sources*

After the pick: the chip, small, top-right: `Simple ▾` / `Normal ▾` / `Expert ▾`. Scroll cue: *keep going*.

### 2 — What's at stake
**Image:** the campus as filed, drawn plain: stacks venting up, a well drawing down, fans blowing heat into the sky.

**Guide line**
- *Simple:* As the plan is written, the carbon goes up into the sky, the water comes from the aquifer the towns drink from, and the heat blows out into the desert.
- *Normal:* Here is what the plan does as it is written. The permit allows 8.8 million tons of carbon dioxide a year up the stacks, more than Albuquerque and Las Cruces combined; the water comes from the same aquifer Santa Teresa and Sunland Park drink from, the one that has been dropping since 2000; and the computers' heat, as much as 90,000 home furnaces, blows out into the desert. About 17,500 people have already written to the state about it.
- *Expert:* Draft Permit 10883 Part A, Table 102.A, sets facility-wide greenhouse gas at 8,820,970 tons CO₂e a year after NMED removed the applicant's 15% safety factor; the developers expect about 40% less in practice, still about the emissions of Albuquerque and Las Cruces combined [sob-part-a][bocc][sourcenm-cities]. The Mesilla basin, measured yearly by the USGS since 1987, fell across 2000–2020; 103 million gallons were pumped from it under an emergency well authorization in five months of 2026 before the Supreme Court stayed the well, and the towns' utility expects to need 6 million gallons a day in 2027 and 15 by 2042 [usgs-mesilla-taap][cbd-well][nmpr-stay][nmsu]. The 2,462 MW of computer heat leaves through dry coolers at 45–65 °C, uncounted [sob]. Smog gases are estimated from four four-hour tests of one 65 kW unit with no continuous stack monitor required [sob]. About 17,500 comments reached NMED; the state Department of Justice is investigating whether some were filed without consent — an investigation, no findings [sourcenm-comments][nmdoj-comments].

**Three tiles, in impact order (all tiers):**
- **8.8 million tons** — CO₂ a year, permitted
- **103 million gallons** — already pumped from the towns' aquifer
- **90,000 furnaces** — of heat, blown away

### 3 — The idea
**No image. One sentence, large, centered. Plenty of air.**

> You don't have to stop it to fix it.

**Guide line**
- *Simple:* Build the same campus, on the same land, on the same schedule — and make it catch its carbon, make its own water, use its heat, and burn less gas each year.
- *Normal:* This is the part that surprised me. Same 819 acres, same buildings, same opening date. You just build it the better way: catch the carbon instead of venting it, make water instead of only pumping it, send the heat next door instead of into the sky, and let the share of gas fall over time. About 8% more on the $50 billion first phase. That's the whole idea.
- *Expert:* Four changes, none of which move a building, in order of what they do for the air, the water and the land: capture-ready fuel-cell stacks with the CO₂ metered at the stack — the dried exhaust is about 95% CO₂, the easy case [sob][bloom-chart]; NMSU's designed 5 MGD brackish plant funded by the developer and handed to the towns' utility, with the towns' reclaimed water recharged under a State Engineer permit [nmsu][nm-asr-act]; one heat exchanger before the dry coolers feeding about 150 acres of greenhouses [agriport][enefg]; and a public meter on which the share of energy from gas falls over time, as a target [nmsa-62-17-12]. Developer capital of about $3.4–3.9 billion plus $640 million in payments over 30 years: about 8% of the $50 billion first phase (2.5% of the $165 billion bond cap, a ceiling, not cash), before the federal 45Q credit of $85 a ton for 12 years [cba][irs-45q].

**Four marks in a row, impact order (icon + word):** catch the carbon · make the water · use the heat · shrink the gas

### 4 — The years
**Image A: the milestone strip.** Year 0 · 1 · 2 · 5 · 10 · 20 · 30 · 80, calendar year under each. Static. From `KNOWLEDGE.md §6`.
**Image B: the hero scene.** The campus, upgraded — one drawing with the four changes visible: the capture skids and pipe, the water plant and recharge basins, the heat line to the greenhouses, the wire to the wind. The reader rests here.

**Guide line**
- *Simple:* It doesn't happen all at once, and I won't pretend it does — the first real changes land about five years in.
- *Normal:* I want to be honest about the years. For the first two or three, the upgraded campus looks almost the same as the ordinary one: the meters go on, the permits get filed, the water plant is built. Around year five the plant opens, recharge begins, capture is metered, and the first greenhouses go up. By year ten, capture is at its target or the lease charges for the shortfall. The aquifer's decline slows — it doesn't stop, and I won't say it does.
- *Expert:* Year 0–1 (2026–27): conditions negotiated at the next consent point; stack meters and independent audits; NMSU plant final design; ASR, Class VI and pipeline applications filed. Year 2 (2028): capture skids installable but no storage line yet, so CO₂ is measured and about 1% goes to concrete; ours ≈ theirs on carbon and water. Year 5 (2031): 5 MGD plant online, recharge begins from about 2 MGD of reclaimed water, storage line connected, capture metered at 50–75% (the best operating plants' range), first greenhouse block [nmsu][boundary-dam-2024][epa-class-vi]. Year 10 (2036): capture at the 90–95% target or a lease penalty, full greenhouse acreage, about 3,000 permanent jobs; residual carbon 0.45–1.0 Mt a year including the 120–370 MW energy penalty [bocc][cba]. Year 20 (2045–46) is the state's net-zero date, met by a falling share of gas on a public meter as a target; year 30 (2056) the lease ends and the closure bond is exercised or renewed; the well series at year 40–80 shows whether the decline slowed — an estimate, labelled [nmsa-62-17-12][dac-solar-decom][usgs-mesilla-taap].

**Strip captions (same at every tier):**
- **0 · 2026** — conditions negotiated
- **1 · 2027** — meters on
- **2 · 2028** — full power; carbon measured
- **5 · 2031** — water plant opens; capture metered; first greenhouses
- **10 · 2036** — capture at target, or the lease charges for it
- **20 · 2045** — gas share falling, on a public meter
- **30 · 2056** — lease ends; bond exercised
- **80** — the wells tell the story (estimate)

**Closing line, under the hero scene (all tiers, same words):**

> It gets decided at the county's next consent point on the lease, and the permit record is open now. The full plan is on the next page.

**The one button:**

> **See the full plan →**

Nothing under it but the footer.

### Footer (all pages)
An independent citizen proposal. Not affiliated with Oracle, STACK Infrastructure or Project Jupiter Together. Commentary, sourced; corrections welcome. Last updated {LAST_UPDATED}.

---

## BLUEPRINT — the plan (four sections)

Same guide, same chip. Linear. The reader arrived here by choosing to.

### 1 — The site
**Image:** the site plan, drawn plain, labeled on the drawing. No clicks required.

> This is the plan. Four changes, six conditions, one campus — in the order of what they do for the air, the water and the land.

- *Simple:* Their buildings don't move; the upgrade fits inside the fence and on the empty land beside it.
- *Normal:* Every building in the filed plan stays exactly where it is. The capture skids sit beside the fuel cells, the water plant and recharge basins on the west side, and the greenhouses on the empty acres by the dry coolers, inside the extended fence.
- *Expert:* The filed site is 819 acres with a 400-acre first phase; the fence encloses the halls, chillers and dry coolers, with operations, warehouse and parking outside it [cba][render]. Additions: capture manifolds and skids at the fuel-cell yard with a pipeline corridor; the 5 MGD plant (6.7 MGD brackish feed at 75% recovery, two deep brine injection wells) and infiltration basins; about 150 acres of greenhouses beside the dry coolers; the packing house and training institute fronting the public roads [nmsu][sob]. All additions lie inside the extended fence; nothing crosses a road.

### 2 — The four changes
One section, four parts, impact order. Each part: one static diagram, the guide line, its conditions.

#### Carbon
- *Simple:* The fuel cells' exhaust is almost pure CO₂, so a capture unit can catch most of it — and a meter shows how much it really catches.
- *Normal:* Dried, the exhaust from these fuel cells is about 95% CO₂, which is the easy case for capture. Bloom announced a capture product with Chart in 2025; no plant runs it yet, and the best capture plants anywhere sustain 50–75%. So the condition is metered tons against a 90–95% target, with the stacks built capture-ready before power-on. A little is fed to the greenhouses and to concrete; the rest goes by pipeline to storage in Texas.
- *Expert:* NMED describes the anode exhaust as about 95% CO₂ once dried [sob]. Bloom–Chart capture was announced Feb. 2025 with no operating plant; Boundary Dam captured 848,388 t in 2024 at 85% availability against a 1 Mt design, long-run about 660 kt a year [bloom-chart][boundary-dam-2024]. The energy penalty is 5–15%, about 120–370 MW, and is added to the emissions math, so the residual at the 90–95% target is 0.45–1.0 Mt a year [sob-part-a]. Use before storage: greenhouse enrichment only with vents closed (a cool-season practice, about 9,000 t a year, 0.1% of the stream) and concrete curing; storage needs a roughly 200-mile line to Class VI wells in Texas, where the Railroad Commission holds primacy, with 50-year post-injection care and financial assurance up front [osu-co2-enrichment][carboncure][epa-class-vi]. 45Q pays $85 a ton stored for 12 years [irs-45q].
- **Condition 1:** Catch the CO₂ at the stack before power-on. *Gate: metered tons captured, published quarterly; shortfall charged in the lease.*
- **Condition 2:** Every stack on a public meter, limits set for the capture configuration. *Gate: continuous monitors per cluster with same-day public data.*

#### Water
- *Simple:* A plant NMSU already designed turns deep salty water into five million gallons a day, and the towns' cleaned wastewater goes back into the aquifer.
- *Normal:* NMSU designed a plant in 2023 that makes 5 million gallons a day from brackish water nobody can drink. The county is already building a smaller one with $15 million of Project Jupiter tax money; the condition is that the developer funds the full NMSU system instead and hands it to the towns' utility. There's no surplus — the towns will need 6 million a day next year — so the recharge is the towns' reclaimed water, about 2 million gallons a day, under a state storage permit. The decline slows. It doesn't reverse, and I won't say it does.
- *Expert:* NMSU M36 (2023): 5 MGD RO at Santa Teresa, 75% recovery, $115.5M plant and $269.5M whole system, O&M $1.16M a year, two deep brine injection wells; brine 18–25k t a year of salts, minerals a byproduct only after EWM's El Paso plant failed at commissioning [nmsu][ewm-elpaso][gao-brine-minerals]. Demand 3.1 MGD (2020) → 6 (2027) → 15 (2042), so no plant surplus in Phase 1; recharge is the three plants' reclaimed flow, about 1.85 MGD, under the Ground Water Storage and Recovery Act with a water right and return-flow offset, on the Bear Canyon (2014) and Rio Rancho (2017) precedents; El Paso has recharged since 1985 [nm-asr-act][abcwua-bear-canyon][rio-rancho-pure][epwater-recharge]. The county's STAR plant (4 MGD RO + 1.5 reuse, ~$75M, 2028–29) proceeds regardless [star-plant]. The unused sod-farm right, about 2,400–2,600 acre-feet a year, stays in a State Engineer conservation program, which NMSA 72-12-8 protects from forfeiture [nmsa-72-12-8]. Opens about 2031.
- **Condition 4:** Fund the NMSU water plant, hand it to the towns' utility, recharge the towns' reclaimed water, and leave the unused farm water right in the aquifer. *Gate: plant commissioned and transferred; recharge permit issued; conservation-program filing on record.*
- **Condition 6:** A closure and monitoring bond, so the land and wells are cared for after the lease ends. *Gate: engineer's estimate posted, revised every five years, on the county's own solar-decommissioning template.*

#### Heat, food and jobs
- *Simple:* One heat exchanger in front of the fans sends the computers' warmth to about 150 acres of greenhouses next door, which grow up to 60 million pounds of food a year and add about 1,000 jobs.
- *Normal:* The computers reject about 2,462 megawatts of heat through fans. One heat exchanger before those fans carries it, as warm water, to greenhouses on the empty land beside them — root-zone heat for cool seasons and mornings; in summer they vent like any greenhouse, so I don't count summer. The signed agreement binds the company to 750 jobs; greenhouses, the water plant, capture and a training institute lift the enforceable count to about 3,000, paid as jobs are verified each year.
- *Expert:* The loop runs 45–65 °C; absorption chillers need about 90 °C, so no cooling is counted, and greenhouse root heat plus desalination preheat use about 1% of the total heat [absorption-review][nmsu]. Precedents: Agriport A7 pairs data centers with growers at scale; Germany's EnEfG requires 10–20% reuse; Gothenburg runs a 130 m² pilot [agriport][enefg][goteborg-energi]. Food: 150 acres × about 400,000 lbs an acre, "up to 60 million pounds a year", far fewer pesticides than field farming [sweden]. Jobs: CBA binds 750 full-time + 50 part-time within three years; ours about 3,000 permanent in Phase 1 (1,500 tech, about 1,000 greenhouse at 4–6.5 an acre, about 250 water and capture, about 250 institute), 4,800 at full build; the county's IRB Safeguards policy already allows clawbacks [cba][epm-jobs][dac-irb-safeguards]. Pad-cooling water is about 1–1.6 MGD, which is why this part depends on the water plant.
- **Condition 3:** Offer the computers' heat to greenhouses next door. *Gate: heat exchanger installed before the dry coolers; verified by the county engineer at commissioning.*
- **Condition 5:** Tie the tax break to real jobs, with a training school on site. *Gate: verified headcount annually; PILT schedule follows the count.*

#### Gas
- *Simple:* Wind from the big new line, geothermal from under the county, and a public meter that shows the share of gas falling every year.
- *Normal:* Solar on the roofs is real but small — about a quarter of one percent. What moves the number is delivered wind and solar over new transmission, and geothermal, which this county has at depth. The honest measure is a public meter showing the share of energy from gas falling over time, as a target. Even at the most optimistic settings, about half the energy is still gas for years.
- *Expert:* SunZia has 3,021 MW contracted west of here and the line runs to Arizona; new transmission is the constraint [sunzia-eia]. Geothermal: the county shows 150 °C at under 1–5.5 km; Lightning Dock produces about 11 MW; Fervo's Cape project scales 100 → 500 MW by 2028 at $3–7M per MW [dona-ana-geothermal][fervo-cape]. Rooftop solar is about 0.25% of load [gsa-2011]. HB93's net-zero definition (NMSA 62-17-12(E)(2)) counts a gas plant that offsets a tenth of its CO₂ with methane cuts, so the site says "falling share of gas (target)", never "zero gas by law" [nmsa-62-17-12]. The developers' own route is carbon-free energy matching by 2031 — accounting, not stacks [bocc].
- *(No standalone condition; the gas-share meter is part of Condition 2's public data.)*

### 3 — What it costs, and when
**Image A:** the cost table with truth labels per line (existing `blueprint.ts` cost items).
**Image B:** the same year strip as the story, one line per change under each year.

- *Simple:* About 8% more on the $50 billion first phase, most of the capture part repayable by a federal credit, with the first real changes about five years in.
- *Normal:* Capture and its pipeline and wells, the heat exchanger, the water plant, solar and the institute add about $3.4–3.9 billion of developer capital plus $640 million in payments over 30 years. Against the $50 billion the companies committed for the first five years, that's about 8%. The federal capture credit — $85 a ton for 12 years — could repay most of the capture line. Growers bring their own $470 million.
- *Expert:* Developer capital $3.4–3.9B including $1.5–2B for CO₂ transport, wells and storage care; PILT $640M over 30 years; grower capital $0.47B [cba][nmsu][epa-class-vi]. Denominator: the CBA's $50B first phase leads (about 8%); the $165B IRB cap is second (2.5%) and is a ceiling, not cash; PILT is county revenue and never a denominator. 45Q at $85/t × 12 years against 8–9 Mt a year captured is on the order of the capture capital [irs-45q]. Economic impact about $6.4B (their $4.7B plus $1.7B). Each line in the table carries its truth label: fact, verified estimate, projection, or unknown.

**One line under the table (all tiers):** Every number on this page traces to a document — *all sources →* (`/sources`).

### 4 — Act on the record
**Guide line (all tiers, same words):**

> A petition has no force here. Two things do: a written comment on the permit record, and three minutes at the commission microphone. Here is how to do both.

**Three steps, in this order:**
1. **Write a comment on Permit 10883.** The record is open; the permit is being reissued. What to say — copy it: *[the six conditions as one paragraph, from `feasibility.ts` shorts]*.
2. **Speak at the commission.** {commissionMeeting}. Three minutes. A script you can read: *[talkingPoints, minus the petition line]*.
3. **Call your commissioner.** {commissioners — five cards: district, name, phone, email; prefilled email via `mailtoWithScript`}.

**Closing line:**

> That's everything I know. Thank you for reading all of it.

---

## Chip and control labels
- Chip: `Simple ▾` · `Normal ▾` · `Expert ▾` — popover: "How much do you want?" with the three choices.
- Story button: `See the full plan →`
- Blueprint end: `Copy the comment` · `Copy the script` · `Email my commissioner`
- Scroll cue: `keep going`

## Not in this script (removed on purpose)
Toby & Sal; homeowner / legislator / business voices; the theirs/ours switch; all sliders; the petition and "add your name"; season tabs; "Make bigger"; the mission strip; the storm graphic; a separate "scene" section (folded into What's at stake); a separate receipts section (one line → /sources).
