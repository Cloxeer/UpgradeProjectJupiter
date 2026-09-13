# Force Upgrade Project Jupiter

An independent, sourced citizen proposal for **Project Jupiter**, the data-center campus with its own
2,462 MW gas fuel-cell power plant being built in Santa Teresa, Doña Ana County, New Mexico. The site
does not ask for the project to be cancelled. It lays out how to build the same campus better: capture
the carbon, make water instead of only pumping it, use the waste heat, and shrink the gas over time.

Live at **https://upgradeprojectjupiter.com**.

## Stack

- Next.js 16 (App Router, React 19, TypeScript strict), static export (`output: "export"`)
- Tailwind CSS v4, shadcn/ui primitives
- Deployed to GitHub Pages via `.github/workflows/pages.yml`

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # lint + typecheck + build
```

## Structure

```
src/app/            routes (home story, /blueprint, /science, /legislators, /faq, /sources)
src/components/     story/, jupiter/, blueprint/, ui/
src/data/           content and the verified fact layer (sources.ts, netloss.ts, blueprint.ts, story.ts)
public/             images, favicons, the CNAME, and /original (a snapshot of the previous version)
docs/research/      the fact and narrative brains: KNOWLEDGE.md, NARRATIVE.md, SCRIPT.md, primary sources
```

## Content rules

Every number traces to a primary document. See `docs/research/KNOWLEDGE.md` (facts) and
`docs/research/NARRATIVE.md` (story and architecture). Nothing on the site is invented.

## Deploy

Push to `main`; GitHub Actions builds the static export and publishes it to GitHub Pages on the custom
domain. `public/CNAME` keeps the domain attached.

## License

MIT — see [LICENSE](LICENSE).
