---
description: "Extract a reference website into a HaliteWebDevelopment JSON template variant (not Next.js)"
---
<!-- AUTO-GENERATED from .claude/skills/extract-halite-template/SKILL.md — do not edit directly.
     Run `node scripts/sync-skills.mjs` to regenerate. -->


# Extract Halite Template

You are extracting a **reusable HaliteWebDevelopment template variant** from a reference website. Output goes to Halite's `templates/{genre}/{variantSlug}/` — never to Next.js `src/`.

## Inputs (required)

Parse `$ARGUMENTS` as:

| Arg | Required | Notes |
|-----|----------|-------|
| `referenceUrl` | yes | URL to inspect with browser MCP |
| `genre` | yes | `restaurant` \| `tattoo` \| `web-developer` — **NEVER auto-detect**; caller provides |
| `variantSlug` | yes | kebab-case (e.g. `good-luck-cafe-style`, `bold-studio-dark`) |
| `haliteRepoPath` | no | absolute path to HaliteWebDevelopment (default: `d:\HaliteWebDevelopment`) |

If any required input is missing or `genre` is invalid, stop and ask the user.

**Output path:** `{haliteRepoPath}/templates/{genre}/{variantSlug}/`

## What This Produces

```
templates/{genre}/{variantSlug}/
  site.default.json      # required — validates against genre interface
  config.default.json    # required — version 2, section order
  styles.css             # optional — when visuals differ from default
  assets/images/         # optional — copied to project public/ on seed
```

Valid genres today: `restaurant`, `tattoo`, `web-developer`

## Pre-Flight

1. **Browser automation is required** (cursor-ide-browser MCP, Playwright MCP, etc.). If none available, stop and ask the user.
2. Verify `referenceUrl` loads in the browser.
3. Confirm `{haliteRepoPath}` exists and contains `src/lib/site/types.ts`.
4. Confirm `{haliteRepoPath}/templates/{genre}/default/site.default.json` exists — use as structural starting point.
5. Create staging dirs in the **Website-cloner** workspace (not Halite):
   - `docs/research/{variantSlug}/`
   - `docs/research/components/`
   - `docs/design-references/{variantSlug}/`
   - `scripts/staging/{variantSlug}/` — downloaded images before copy to Halite

**Do NOT** run `npm run build` on Website-cloner. **Do NOT** create git worktrees.

## Guiding Principles

1. **Layout, not business** — reference informs section order, colors, fonts, spacing, image placement. Never copy the reference business.
2. **Schema-first** — fit the reference into the existing genre interface in `types.ts`; do not invent new fields.
3. **Latin placeholders only** — all text content uses lorem ipsum (see Content Rules).
4. **Local assets** — download images; never hotlink reference CDN URLs in final JSON.
5. **Spec before JSON** — write research specs to `docs/research/components/*.md` before writing Halite output files.

---

## Phase 1 — Reconnaissance

Same extraction rigor as clone-website, but artifacts stay in `docs/research/` — no React builders.

### Screenshots

- Full-page at desktop (1440px) and mobile (390px)
- Save to `docs/design-references/{variantSlug}/`

### Global Extraction

Extract and save to `docs/research/{variantSlug}/DESIGN_TOKENS.md`:

- **Fonts** — families, weights, styles from `<link>` tags and `getComputedStyle`
- **Colors** — computed values as hex and oklch where useful; map to Halite `theme` fields: `colorText`, `colorMuted`, `colorAccent`, `colorBackground`, `colorSurface`
- **Typography scale** — heading/body sizes, line-heights, letter-spacing
- **Spacing rhythm** — padding/margin patterns, max-widths, gaps
- **Breakpoints** — layout shifts at ~768px, ~390px

### Page Topology

Save `docs/research/{variantSlug}/PAGE_TOPOLOGY.md`:

- Section order top-to-bottom with working names
- Map each visual section → Halite `sectionKey` for the given `genre` (see [GENRE-MAPPING.md](GENRE-MAPPING.md))
- Note sections to **omit** (no Halite block exists — drop or fold into nearest block)
- For multi-page references: note which Halite `pages[]` entries apply (tattoo, web-developer)

### Interaction Sweep

Save `docs/research/{variantSlug}/BEHAVIORS.md`:

- Scroll-triggered header changes, sticky elements, hover states
- These inform `styles.css` — Halite templates are static HTML, not React

### Per-Section Specs

For each mapped section, write `docs/research/components/{variantSlug}-{sectionKey}.spec.md`:

```markdown
# {sectionKey} — {variantSlug}

## Halite mapping
- sectionKey: ...
- Reference DOM summary: ...

## Computed styles (exact getComputedStyle values)
...

## Image slots
- hero: ...
- gallery-N: ...

## Responsive
- Desktop: ...
- Mobile: ...
```

Use the per-component extraction script from clone-website (`getComputedStyle` walk).

### Asset Download

1. Enumerate images, videos, background-images, inline SVGs via browser MCP.
2. Download to `scripts/staging/{variantSlug}/` with a Node script (batched, 4 parallel).
3. Rename generically for template reuse: `hero.jpg`, `about.jpg`, `gallery-1.jpg`, `logo.svg`, etc.
4. Copy final assets to `{haliteRepoPath}/templates/{genre}/{variantSlug}/assets/images/`.

---

## Phase 2 — STOP (do not build Next.js)

**Do NOT:**

- Create git worktrees
- Scaffold `src/app/`, React components, or `package.json`
- Build a Next.js app
- Dispatch builder agents for TSX components
- Modify Website-cloner `src/` except research docs and staging scripts

If you catch yourself writing `.tsx` files, stop and switch to Phase 3.

---

## Phase 3 — Bridge to Halite Template

### Read schema sources

Before writing output, read:

1. `{haliteRepoPath}/src/lib/site/types.ts` — genre interface
2. `{haliteRepoPath}/templates/{genre}/default/site.default.json` — structural reference
3. `{haliteRepoPath}/templates/{genre}/default/config.default.json` — default section order
4. `{haliteRepoPath}/src/lib/blocks/registry.ts` — valid `sectionKey` IDs per genre

### Build `site.default.json`

1. **Start from** `templates/{genre}/default/site.default.json` — deep clone in memory.
2. Set `"type"` to the genre string.
3. Update `theme` with extracted fonts and colors.
4. Update all image path fields to point at seeded assets (`images/hero.jpg`, etc.) — paths relative to project `public/` (no hotlinks).
5. Preserve **array lengths and object shapes** from the default (menu categories, artists, gallery items, pricing plans, etc.) — only change structure when the reference layout clearly requires more/fewer slots.
6. Replace **every** text field with Latin placeholders per Content Rules below.
7. Write to `{haliteRepoPath}/templates/{genre}/{variantSlug}/site.default.json`.

### Build `config.default.json`

```json
{
  "version": 2,
  "projectType": "<genre>",
  "sections": ["..."],
  "templateVariant": "<variantSlug>"
}
```

Rules:

- `sections` = Halite `sectionKey` array matching reference layout order
- Only use valid keys from `registry.ts` for that genre
- Include `pages[]` when genre uses multi-page config (tattoo, web-developer) — derive from reference subpages if inspected, else copy structure from default and trim sections to match reference home page
- Set `templateVariant` to `variantSlug`

### Build `styles.css` (when needed)

Write when extracted visuals differ materially from `templates/{genre}/default/styles.css`:

1. Read default `styles.css` as base.
2. Override CSS custom properties and genre-specific selectors with extracted values.
3. Use Halite CSS variables: `--font-display`, `--font-body`, `--color-text`, `--color-muted`, `--color-accent`, `--color-background`, `--color-surface`.
4. Write to `{haliteRepoPath}/templates/{genre}/{variantSlug}/styles.css`.

If the reference is a close match to default styling, omit `styles.css` (Halite falls back to default).

---

## Content Rules (CRITICAL)

Templates are **reusable visual starting points** — not copies of the reference business.

**NEVER** put the reference site's business name, phone, address, real copy, or branding text into `site.default.json`.

| Field type | Placeholder |
|------------|-------------|
| Short labels, tags, eyebrows | `Lorem ipsum` |
| Headlines, titles | `Lorem ipsum dolor sit amet` |
| Paragraphs, descriptions, bios, quotes | `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.` |
| Menu items / testimonials / team | Latin placeholders; preserve count and structure |
| Phone | `(555) 000-0000` |
| phoneTel | `5550000000` |
| Address | `123 Placeholder St`, `City`, `ST`, `00000` |
| meta.title | `Lorem Ipsum — Template Preview` |
| business.name / brand.name | `Lorem Business` |

The reference site informs **layout, colors, fonts, section order, and image placement only**.

---

## Validation

Before finishing:

1. `site.default.json` parses as valid JSON; `type` matches genre.
2. Every `sectionKey` in `config.default.json` exists in `registry.ts` for that genre.
3. No reference business names, URLs, or CDN image URLs in text or image fields.
4. No Next.js files in output path.
5. If `styles.css` written, file is valid CSS.

Optional: run `node -e "JSON.parse(require('fs').readFileSync('...'))"` on both JSON files.

---

## Completion Summary

Print:

```
## Halite Template Extracted

- **Genre:** {genre}
- **Variant:** {variantSlug}
- **Output:** {haliteRepoPath}/templates/{genre}/{variantSlug}/

### Section order (config.default.json)
{comma-separated section keys}

### Files written
- site.default.json
- config.default.json
- styles.css (or "skipped — uses default")
- assets: {list each file or "none"}

### Research artifacts (Website-cloner)
- docs/research/{variantSlug}/
- docs/research/components/{variantSlug}-*.spec.md
- docs/design-references/{variantSlug}/

Template ready — use From Template picker in Halite Studio or seed a client project from this variant.
```

---

## Integration with Halite Studio (future)

Halite's reference flow will:

1. Call this skill with `referenceUrl` + `genre` from workspace
2. Template is **always** saved (no opt-out)
3. Create client project from new variant + overlay real business data from planner (replacing ALL lorem text)

---

## Additional Resources

- Section mapping per genre: [GENRE-MAPPING.md](GENRE-MAPPING.md)
- Inspection checklist: `docs/research/INSPECTION_GUIDE.md` (Website-cloner)
- Halite types: `{haliteRepoPath}/src/lib/site/types.ts`
- Halite section registry: `{haliteRepoPath}/src/lib/blocks/registry.ts`
