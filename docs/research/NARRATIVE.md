# NARRATIVE.md - the story and architecture brain

Companion to `KNOWLEDGE.md` (the fact brain: numbers, law, sources). This file is the story, the information
architecture, the reading depths and the component map. One job each; do not merge them. Words live in
`SCRIPT.md` and ship verbatim through `src/data/story.ts`.

## The one idea

Keep the campus, build it the better way. Same 819 acres, same buildings, same opening date; catch the
carbon, make the water, use the heat, shrink the gas. About 8% more on the $50 billion first phase.

## Who tells it

Sebastian, the real author, first person, NMSU computer science, who read Permit 10883. His whole authority is
having read the document. He never sounds superior: no "ordinary", "default", "that's the problem", "not evil".
He says what the plan does, then the better way. See the voice rules at the top of `SCRIPT.md`.

## The reader's one choice

A fork under the hook: **Simple / Normal / Expert**. One sentence, one to three, four to five with sources.
Persisted (`pj-depth`), switchable anytime from the chip in the header. Numbers, images and order never
change with the depth; only the length of the guide's line and whether sources show.

## Four sections a page, never more

**Home (the story, one scroll, one exit)**
1. The hook: place named once (Doña Ana County, west of El Paso), scale, then the fork.
2. What's at stake: what the filed plan does, in the permit's own numbers, no verdict. Three stats.
3. The idea: "You don't have to stop it to fix it." The sentence is the image. Four changes in one breath.
4. The years: the milestone strip (KNOWLEDGE §6), the guide's honest line, the campus drawn once, the closing
   line, and the only button on the page: See the full plan.

**Blueprint (the plan, the reader chose to be here)**
1. The site: the campus from above, labeled, no clicks.
2. The four changes, one section, four parts, **in order of environmental impact: carbon, water, heat (with
   food and jobs), gas**. Each part: one static drawing, the guide's line, its conditions with their gates.
3. What it costs, and when: the guide's line, three totals, the cost table folded behind one tap, the years.
4. Act on the record: comment on Permit 10883, speak at the commission, call your commissioner. The real ask.

Friction lives in exactly two places: the fork and the step into the plan. Nothing between them asks the
reader to decide anything. No toggles, no sliders, no theirs/ours switch, no personas, no petition.

**Reference pages (in the header, off the golden path):** Science, Legislators, FAQ, Sources. Legislators
renders the same `ActOnRecord` block as the end of the Blueprint: one component, one data source.

## Component map

- `src/data/depth.ts`: `Depth`, `Tiered` (the authoring contract), `tierText`.
- `src/components/jupiter/Depth.tsx`: the store (`useDepth`), `DepthFork`, `DepthChip`. Migrates the old
  `pj-audience` / `pj-level` keys once.
- `src/data/story.ts`: every word, per section, as `Tiered`. Built from `SCRIPT.md`.
- `src/components/story/`: `BeatSection` (reveal once, DOM class swap via IntersectionObserver, 1 s safety
  net, reduced-motion aware), `Guide` and `GuideMark`, `Tiered` (`TieredText`, `NotAt`).
- `src/components/story/diagrams/`: `Primitives` (Flow, Tag, fans, houses, underground), `CarbonDiagram`,
  `WaterDiagram`, `HeatDiagram`, `PowerDiagram` (static, fixed at the plan's target settings, driven by the
  constants in `blueprint.ts` and `netloss.ts`), `MilestoneStrip` (§6), `SiteMap` (the campus, static).
- `src/components/jupiter/ActOnRecord.tsx`: the ask, from `upgrade.ts`, `feasibility.ts`, `lib/script.ts`.
- `src/hooks/useInView.ts`: shared IntersectionObserver hook (diagram pause off screen).
- Fact layer, untouched: `sources.ts`, `netloss.ts`, `blueprint.ts` constants, `claims.ts`, `KNOWLEDGE.md`.

## Motion and system

Tokens in `globals.css` (`--ease-out`, `--ease-in`, `--spring`, `--dur-fast/base/slow`). Only transform and
opacity animate. Section reveal: fade and a 16 px lift, once. Press feedback on controls. Diagram flows are
one dashed path each, paused off screen. Hover effects gated to fine pointers. Reduced motion collapses the
reveal to static. 8 px spacing scale; body 17 px; one accent (the green) for everything "ours".

## Removed on purpose (Sept. 10, 2026)

Six personas and their copy, Toby and Sal, the theirs/ours switch, eight sliders, season tabs, "Make bigger",
the petition and every link to it, the mission strip, the storm graphic, the will/won't lists, the leftover
bakery and podcast template routes and components.
