# Force Upgrade Project Jupiter

An upgrade proposal for the Project Jupiter data-center campus in Santa Teresa, New Mexico, built on the developers' own plan, land and timeline: capture the carbon, reuse the heat, produce water, grow food, and retire the gas. Every number is cited; every section keeps the developers' original text one click away.

Not affiliated with Oracle, STACK Infrastructure, or Project Jupiter Together.

## Run it

```bash
npm install
npm run dev
```

`npm run build` produces a static export in `out/`. The GitHub Pages workflow (`.github/workflows/pages.yml`) builds and publishes it automatically on every push to `main`.

## Layout

- `src/app` — pages: home, blueprint, science, legislators, petition, FAQ, sources
- `src/components/jupiter`, `src/components/blueprint` — the site's components and interactive drawings
- `src/data` — all copy, figures and the source registry
- `docs/research/projectjupitertogether.com` — design notes taken from the original site
- `public/images/refs` — reference photos, each credited on the page where it appears
