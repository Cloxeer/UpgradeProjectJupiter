// After `next build` (static export), prefix root-absolute links and asset URLs in the exported HTML
// with the GitHub Pages base path, and add .nojekyll so files starting with "_" are served.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const out = "out";
writeFileSync(join(out, ".nojekyll"), "");
if (!base) process.exit(0);

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) {
      let html = readFileSync(p, "utf8");
      const before = html;
      // href="/x" and src="/x" (but not protocol-relative "//" and not already-prefixed)
      html = html.replace(/(href|src|content)="\/(?!\/)/g, (m, attr) => `${attr}="${base}/`);
      html = html.replace(new RegExp(`${base}${base}/`, "g"), `${base}/`);
      if (html !== before) writeFileSync(p, html);
    }
  }
}
walk(out);
console.log(`prefixed exported HTML with ${base}`);
