// The /original snapshot is a frozen copy of the pre-story site. This adds a single, subtle
// "back to the current site" bar at the bottom of every snapshot page, and keeps the archive
// self-contained (any stray root home link is retargeted to stay inside /original). Idempotent:
// re-running skips pages already processed. Run after regenerating public/original.
import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = "public/original";
const MARK = "pj-orig-back";
const BAR =
  `<a href="/" class="${MARK}" aria-label="Back to the current site" ` +
  `style="position:fixed;left:0;right:0;bottom:0;z-index:2147483000;` +
  `padding:7px 12px;text-align:center;box-sizing:border-box;` +
  `font:500 12.5px/1.35 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;` +
  `color:rgba(255,255,255,.82);background:rgba(11,31,42,.9);` +
  `text-decoration:none;border-top:1px solid rgba(255,255,255,.14)">` +
  `You&#39;re viewing the original, pre-story version &middot; ` +
  `<span style="text-decoration:underline">back to the current site &rarr;</span></a>`;

let count = 0;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) {
      let h = readFileSync(p, "utf8");
      if (h.includes(MARK)) continue;
      h = h.replace(/href="\/"/g, 'href="/original/"'); // keep the archive self-contained
      h = h.includes("</body>") ? h.replace("</body>", BAR + "</body>") : h + BAR;
      writeFileSync(p, h);
      count++;
    }
  }
}
walk(ROOT);
console.log(`original back-link injected into ${count} page(s)`);
