# Force Upgrade Project Jupiter — project notes

An independent, sourced counter-proposal for the Project Jupiter data center in Santa Teresa, New Mexico.
Next.js 16 static export, deployed to GitHub Pages at https://upgradeprojectjupiter.com.

## Read first
- `docs/research/KNOWLEDGE.md` — the fact brain: every baseline number, the law, milestone years, wording
  rules. Do not re-derive the numbers; they trace to primary documents in `docs/research/primary/` and to
  `src/data/sources.ts`.
- `docs/research/NARRATIVE.md` — the story and architecture brain: the six-beat spine, the three reading
  depths, the four-sections-per-page layout, and the component map.
- `docs/research/SCRIPT.md` — every word on the site, the source of truth for `src/data/story.ts`.

## Rules
- Strictly factual and cited; never invent a number. Every claim traces to a primary document.
- Three reading depths (simple / normal / expert) via `src/components/jupiter/Depth.tsx`.
- Do not add AI co-author trailers to commits.

## Commands
- `npm run dev` — dev server
- `npm run check` — lint + typecheck + build

## Deploy
Push to `main`; GitHub Actions (`.github/workflows/pages.yml`) builds the static export and publishes to
Pages on the custom domain. `public/CNAME` keeps `upgradeprojectjupiter.com` attached. Never force-push
without explicit instruction.
