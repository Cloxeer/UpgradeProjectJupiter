# KNOWLEDGE.md — read this first, before any work on the Force Upgrade Project Jupiter site

Last verified: Sept. 8, 2026. One file, checked in, so no session re-derives the baselines.
Rule: every number below traces to a document in `src/data/sources.ts` (id in brackets) or to a primary text in `docs/research/primary/`. Anything not here is unverified until checked against a primary document.

## 1. The filed project (theirs)
- Site: ~819 acres, Santa Teresa, Doña Ana County; 400-acre first phase by Q3 2028; initial operations targeted Q4 2026 [cba][bocc].
- Microgrid: 2,462 MW Bloom fuel cells (2,275 stacks), natural gas, 8,760 h/yr [sob][sob-part-a].
- Draft Permit 10883 Part A, Table 102.A (facility-wide, tons/yr): **GHG 8,820,970 CO₂e** (NMED struck the applicant's 15% safety factor; 10,144,115 was the application figure), NOx 37.2, CO 161.21, VOC 124.0, SO₂ 0.08, PM/PM10/PM2.5 75.4, HAPs 1.4 [sob-part-a]. One Title V permit (CO and VOC >100 tpy); PSD not triggered; facility sits outside the Sunland Park ozone nonattainment area; emission factors from four 4-hour tests of one 65 kW unit; no continuous stack monitor required; stacks swapped ~every 5 years [sob][bloom-stack-life].
- Developers expect ~40% below the application figure ≈ 6,086,469 t/yr (`GHG_EXPECTED_TPY`) [bocc]. Albuquerque + Las Cruces ≈ 6.7 Mt/yr [sourcenm-cities].
- Water: CBA potable cap 20,000 gal/day average; 103 million gallons pumped Apr–Aug 2026 under an emergency well authorization; non-potable operating volume undisclosed; sod-farm groundwater right ≈ 2,400–2,600 acre-feet/yr (≈2.2 MGD) [cba][cbd-well][haussamen-water].
- Jobs: binding 750 full-time + 50 part-time within 3 years of opening; 1,500 advertised [cba][epm-jobs].
- Money: $165B IRB cap; PILT $12M/yr → ~$360M over 30 years; $50M water fund (~$25M collected, held by the state, flows early 2027); lease ends 2056, property to tax rolls, shareholders own the site; CBA has no decommissioning/restoration/bond clause (only $1M habitat fund) [cba][epm-water-fund].
- Gas supply: Energy Transfer "Green Chile" lateral, 17.7 miles, 24-inch, up to 400 MMcf/day; State Land Office denied the 0.63-mile state-trust segment Mar. 20, 2026 and denied reconsideration July 15, 2026; pipeline delayed to 2027; federal-land route being sought [slo][dcd-pipeline][energyconnects].

## 2. Record of events (dated)
- Nov. 12, 2025 CBA + IRB signed. Oct. 23, 2025 emergency well authorization. May 23, 2025 county voted to terminate the CRRUA joint powers agreement [crrua-termination].
- June 30, 2026 Source NM: residents' names on pro-permit comments without consent. July 9, 2026: NM Department of Justice opens investigation; NMED says about 42 of ~17,500 comments may be fraudulent; NMED changed its comment portal (Aug. 7, 2026 update). State only what the record says: an investigation, allegations, no findings yet [sourcenm-comments][nmdoj-comments].
- July 2, 2026: four legislators propose a 2027 statewide data-center moratorium [krwg-reintro]. SB 235 Microgrid Oversight Act passed Senate, died in House, to be reintroduced 2027.
- July 28, 2026: developers report 2,755 workers, 9% progress [bocc]. July 29, 2026: NMED draft permit [sob].
- Aug. 24, 2026 Supreme Court stays the permit hearing and the well; Sept. 1 refuses to lift the stay [nmpr-stay][abq-stay]. County reports missed quarterly job reports [abq-reports].
- Casa de Peregrinos received ≈$400k total from Jupiter affiliates (pop-up pantries with Roadrunner Food Bank). Not on the site; irrelevant to engineering claims.

## 3. Law and leverage (present-day, New Mexico and federal)
- HB93 / NMSA 62-17-12(E)(2): "net-zero carbon resource" includes a gas plant that offsets ≥1/10 of its CO₂ tons with methane cuts. So: **"falling share of energy from gas (target)", never "zero gas by law"**. Developers' route: carbon-free energy matching by 2031 (accounting, not stacks) [nmsa-62-17-12][bocc].
- CBA §III: amendable only by agreement of all parties. County leverage = the next consent point in the IRB lease (assignment, amendment, support resolution); precedent Sandoval County–Intel 2019/2024 [sandoval-intel]. County IRB Safeguards policy allows clawbacks [dac-irb-safeguards]. Wording: "negotiate into the lease at the next consent point", never "write into".
- Recharge: Ground Water Storage and Recovery Act (NMSA 72-5A; 19.25.8 NMAC) permit from the State Engineer + a water right for the stored water + Rio Grande return-flow offset accounting. Albuquerque's took 2008 tests → 2014 permit [nm-asr-act][abcwua-bear-canyon]. Rio Rancho first reclaimed-recharge permit 2017 [rio-rancho-pure]. El Paso recharging since 1985, >30 billion gallons, "slowed the decline" [epwater-recharge].
- Water-right forfeiture: NMSA 72-12-8 (groundwater) and 72-5-28 (surface): four years' nonuse forfeits, **except** periods when the right is placed in a State Engineer-approved water conservation program [nmsa-72-12-8]. Basis for demand 4's sod-farm retirement. No data-center lease has done this; districts and the Interstate Stream Commission use the mechanism.
- CO₂ storage: EPA Class VI, 50-year default post-injection care, financial assurance up front [epa-class-vi]. Texas RRC has Class VI primacy (effective Dec. 15, 2025), ~6+6-month reviews. New Mexico sent primacy rules to the Oil Conservation Commission Dec. 2025; no permitted NM wells. NMSU: injection-well permitting 4–5 years. 45Q: $85/t stored, 12 years [irs-45q].
- Closure bond template: Doña Ana County's own solar decommissioning rule (engineer's estimate, revised every 5 years) [dac-solar-decom].

## 4. Water (NMSU M36, 2023)
- 5 MGD brackish RO at Santa Teresa, 75% recovery (6.7 MGD feed), $115.5M plant / $269.5M whole system, O&M $1.16M/yr; $4/kgal capital-equivalent; two deep brine injection wells [nmsu].
- CRRUA demand 3.1 MGD (2020) → 6 (2027) → 15 (2042): **no plant surplus in Phase 1**; recharge water is the towns' reclaimed flow ≈1.85 MGD (three plants) → "about 2 MGD" (`OUR_RECHARGE_GPD`) [nmsu].
- STAR plant (county): 4 MGD RO + 1.5 MGD reuse, ~$75M, $15M Jupiter tax money, construction 2028–29 [star-plant].
- Brine: feed ~2,000 mg/L TDS → 18–25k t/yr salts; minerals are a byproduct only (EWM's El Paso plant failed at commissioning; GAO: brine mining unproven at scale; El Paso approved a second attempt July 2026) [ewm-elpaso][gao-brine-minerals][epwater-brine-recovery]. No lithium number exists.
- Deep aquifer: 60–65M acre-ft usable brackish, recharge rate "unknown" (NMSU); USGS Mesilla network annual measurements since 1987; table fell 2000–2020 [usgs-mesilla-taap].

## 5. Capture, heat, power, jobs, food, cost
- Capture: exhaust ≈95% CO₂ once dried (NMED). Target 90–95%; best operating plants 50–75% (Boundary Dam 848,388 t in 2024 at 85% availability vs 1 Mt design; long-run avg ~660 kt/yr); Bloom–Chart announced Feb. 2025, **no operating plant**; energy penalty 5–15% = about 120–370 MW of the 2,462 (`CAPTURE_PENALTY_LO/HI`, `penaltyMW()`), and `ourReleased()` uplifts gross CO₂ by (1 + penalty) from year 5, so the **residual at the 90–95% target is 0.45–1.0 Mt/yr** (was 0.4–0.9); cumulative ours ≈ 20–45 Mt at year 10, 25–55 Mt at year 20; ~200-mile pipeline to Texas Class VI storage; use slider starts 1% [boundary-dam-2024][bloom-chart][carboncure][blue-planet].
- Heat: 2,462 MW IT ≈ heat; loop 45–65 °C; absorption chillers need ~90 °C → **not counted**; greenhouse root heat + desal preheat only (~1% of heat); precedents Gothenburg 130 m² pilot, Agriport A7, German EnEfG 10%/20% [goteborg-energi][agriport][enefg]. Pad cooling water 1–1.6 MGD.
- Power: SunZia 3,021 MW contracted west; geothermal $3–7M/MW, Fervo Cape 100→500 MW, Lightning Dock ~11 MW; roof solar ~0.25%; every slider at max still leaves ~half the energy on gas [fervo-cape][gsa-2011].
- Jobs: ~3,000 permanent Phase 1 (1,500 tech + ~1,000 greenhouse at 4–6.5/acre + ~250 water/capture + ~250 institute); 4,800 full build; construction ~7,500. Food: 150 acres × ~400,000 lbs/acre = "up to 60M lbs/yr"; "far fewer pesticides", not "pesticide-free" unless labelled [sweden].
- Cost: developer capital $3.4–3.9B (incl. $1.5–2B CO₂ transport/storage) + $640M PILT; growers $0.47B. **Denominator rule (Sept. 8):** lead with "about 8% of the $50B first phase" (CBA: $50B in five years), then "(2.5% of the $165B bond cap, a ceiling, not cash)"; never the cap alone, never PILT as a denominator. Code: `PHASE1_M`, `BOND_M` in blueprint.ts; `pctOfPhase1`, `pctOfBond`, `parseCostM` in `src/lib/units.ts`. Economic impact ~$6.4B (their $4.7B + $1.7B). Greenhouse lease+heat ≈ $0.05M/acre/yr.

## 6. Realistic milestone years (both timelines must match this table)
Years count from 2026. Their schedule is used for what they build; ours adds only what permits and build times allow.

| Year | Calendar | Theirs | Ours (honest state) |
|---|---|---|---|
| 0 | 2026 | Q4 2026 initial ops targeted; permit and well stayed | Conditions negotiated at the next consent point; capture-ready manifolds and heat loop in design |
| 1 | 2027 | First halls | Stack meters and independent audits start; NMSU plant final design; ASR, Class VI and pipeline applications filed |
| 2 | 2028 | Full 2,462 MW by Q3 2028 | Capture skids installable but **no storage line yet**: CO₂ measured, ~1% to concrete; water plant under construction; ours ≈ theirs on CO₂ |
| 5 | 2031 | "100% matching" (accounting) | NMSU 5 MGD plant online; recharge **begins** (≈0 cumulative at year 5); storage line connected, capture metered 50–75%; first greenhouse block |
| 10 | 2036 | unchanged | Capture 90–95% or lease penalty; 10 MGD expansion if CRRUA demand triggers it; full greenhouse acreage; ~3,000 jobs |
| 19–20 | 2045–46 | HB93 net-zero date (offsets allowed) | Gas share falling on a public meter (target) |
| 30 | 2056 | Lease ends; shareholders own the site | Closure bond exercised or renewed |
| 40–80 | | | Well series shows whether decline slowed; bond + archive outlive the permits |

Code: `CAPTURE_START_YEAR`, `captureShare()`, `OUR_WATER_START_YEAR`, `RECHARGE_START_YEAR`, `FAR_YEAR` in `src/data/netloss.ts`; `HB93_YEAR` in `NetLossSection.tsx` compares calendar years (fires at selection 20); `timelineYears` in `src/data/blueprint.ts`.

## 7. Wording rules Sebastian set
- Strictly factual, sourced, professional; "net gain for humanity" framing, grounded in present-day law while thinking 80 years out. Never make anything up; every claim against a primary document.
- The year-80 view is an estimate, labelled, never "no projection". Water gauge for ours: **decline slowed**, not held or rising, until recharge and expansion are real. Pros/cons in plain sentences. Condense, never lengthen; prefer chips/tooltips/folds. **Text changes only, no UI changes** unless asked. `src/data/jupiter.ts` stays untouched.
- Kid voice (Toby & Moby) must stay factual; kid pitches anchor ages to years explicitly.
- **Truth labels (Sept. 8):** structured claims carry one of four labels from `src/data/claims.ts` rendered by `<Truth/>` (hidden for kids): Fact = in a signed or filed document; Verified estimate = priced or measured by a named institution, not built here; Projection = our arithmetic on industry averages; Unknown = no document answers it. Applied on compare rows, cost table, hero tiles, feasibility checks, net-gain rows, zone stat tiles. Prose stays unlabelled; the "(ESTIMATE†)" dagger stays for aggregate totals.
- **Gates (Sept. 8):** every demand has a `gate` (test, verifier, by, ifMissed) and a `clause` (model lease text). The county cannot stop operations (NMED permit; CBA makes the lease the sole remedy), so every consequence is a lease consequence: conditioned payment withheld, IRB Safeguards clawback, bond exercised, assignment consent withheld. Never write "no operations permitted until". Clauses are labelled "model text for counsel, not legal advice".
- **Greenhouse CO₂:** enrichment works only with vents closed (OSU HLA-6723, `osu-co2-enrichment`); in summer pads and vents run, so it is a cool-season and morning practice. Say "fed to plants", never "absorbed"; ~9,000 t/yr ≈ 0.1% of the stream (estimate).

## 8. Outside review (Sept. 8, 2026): adopted and rejected
Adopted: $50B first phase as the lead denominator; four truth labels; gates inside demand folds; draft lease clauses (home fold + legislators appendix); energy penalty in MW and in the emission math; summer venting caveat; two new expert open questions (parasitic CO₂, greenhouse uptake); fixes for 975-vs-1,000 jobs (rounded to hundreds), 11,000→10,500 total, use-slider 10%→1% text and step 5→1.
Rejected as wrong or unverified: "Sunland Park in nonattainment" as a facility claim (facility is outside the NAA, SoB §2.79); "SOFC exhaust ~50% CO₂" (NMED ~95% dried); Boundary Dam "57%" (site uses 848,388 t in 2024, ~660 kt/yr avg); an "Oracle July 1, 2026 power-plan blog" (not verified; the overhaul source is `sfnm-fuelcells`, April 2026); PILT ($360M) as a cost denominator (county revenue, not developer spend); "25 vs 150 acres" (150 everywhere; misread of "125-acre buffer" and "25–35 MW").

## 9. Tooling and process
- Deploy: worktree `deploy-sync` → remote `deploy` main; `git fetch deploy && git rebase deploy/main` then push, **never force**; GitHub Actions "Deploy to GitHub Pages"; verify via GitHub API (gh CLI not authenticated). CNAME is set in Pages settings, not a file.
- OCR: `D:\claude-tools\ocr\ocr.cmd` (pymupdf text layer first, Unlimited-OCR on GPU); never run a keep-warm server.
- Audit method: four independent trials per claim; report in `docs/research/AUDIT-2026-09-06-fact-test.md`; primary texts in `docs/research/primary/`.
- Checks: `npm run check` (lint + typecheck + build). Turbopack can wedge on mid-edit snapshots: if build is green, restart the dev server.
