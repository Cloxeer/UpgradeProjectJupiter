import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const assets = [
  ["logo.png", "https://spyderwebdev.com/wp-content/uploads/2022/10/SpyderWeb-Dev-Logo-Black-e1631636071793-700x120.png"],
  ["hero-bg.jpg", "https://spyderwebdev.com/wp-content/uploads/2022/07/ben-curry-1-W0b0zSt5E-unsplash_50-1-e1628878291571.jpg"],
  ["google-5-stars.png", "https://spyderwebdev.com/wp-content/uploads/2022/07/google-5-stars.png"],
  ["portfolio-showcase.webp", "https://spyderwebdev.com/wp-content/uploads/2022/11/websites-designed-by-spyderweb-dev.webp"],
  ["icon-internet.png", "https://spyderwebdev.com/wp-content/uploads/2022/07/internet-1.png"],
  ["icon-loupe.png", "https://spyderwebdev.com/wp-content/uploads/2022/07/loupe1.png"],
  ["icon-wrench.png", "https://spyderwebdev.com/wp-content/uploads/2022/07/wrench1.png"],
  ["icon-stars.png", "https://spyderwebdev.com/wp-content/uploads/2022/07/five-stars-outlines1.png"],
  ["icon-gmb.png", "https://spyderwebdev.com/wp-content/uploads/2022/11/my-business.png"],
  ["icon-graphic.png", "https://spyderwebdev.com/wp-content/uploads/2022/07/graphic-design1.png"],
  ["laptop.png", "https://spyderwebdev.com/wp-content/uploads/2022/09/laptop.png"],
  ["triangle-dots.png", "https://spyderwebdev.com/wp-content/uploads/2022/09/traingle-dots-flipped.png"],
  ["project-berry-farm.png", "https://spyderwebdev.com/wp-content/uploads/2022/10/Screen-Shot-2022-10-20-at-15.41.14-1024x554.png"],
  ["project-nm-life.jpg", "https://spyderwebdev.com/wp-content/uploads/2022/11/Screen-Shot-2022-11-09-at-10.41.56-1024x644.jpg"],
  ["project-habitat.jpg", "https://spyderwebdev.com/wp-content/uploads/2022/11/Screen-Shot-2022-11-09-at-10.39.55-1024x695.jpg"],
  ["project-rhe.png", "https://spyderwebdev.com/wp-content/uploads/2022/10/Screen-Shot-2022-10-20-at-15.40.30-1024x564.png"],
  ["blog-ai-search.jpeg", "https://spyderwebdev.com/wp-content/uploads/2026/06/AdobeStock_635870905-700x421.jpeg"],
  ["blog-google-ai.jpeg", "https://spyderwebdev.com/wp-content/uploads/2026/06/AdobeStock_489977008-700x282.jpeg"],
  ["blog-bulletin.png", "https://spyderwebdev.com/wp-content/uploads/2025/11/BULLETINS-BEST-BADGE-26-WINNER-700x685.png"],
  ["google-review.png", "https://spyderwebdev.com/wp-content/uploads/2022/09/GoogleReview.png"],
  ["badge-highly-recommended.png", "https://spyderwebdev.com/wp-content/uploads/2022/09/highly-recommended-bdcd9d666c33af66db04744d399e5edeaca995aba8c3563aaa1b063c7e8a4e79.png"],
  ["badge-privacy.png", "https://spyderwebdev.com/wp-content/uploads/2022/09/data-privacy-certified-agency-partner.png"],
  ["badge-1.png", "https://spyderwebdev.com/wp-content/uploads/2022/09/new-badge20210412-28934-eeeq5o.png"],
  ["badge-asset.png", "https://spyderwebdev.com/wp-content/uploads/2022/09/Asset-1@3x-682x700.png"],
  ["badge-2.png", "https://spyderwebdev.com/wp-content/uploads/2022/09/new-badge20210412-28934-14j2itz.png"],
  ["badge-consultant.png", "https://spyderwebdev.com/wp-content/uploads/2022/09/DigitalBusinessConsultant.png"],
  ["badge-designrush.png", "https://spyderwebdev.com/wp-content/uploads/2022/09/Design-Rush-Accredited-Badge.png"],
  ["nm-flag.png", "https://spyderwebdev.com/wp-content/uploads/2022/10/US-NM-New-Mexico-Flag-icon-150x150.png"],
  ["favicon-32.png", "https://spyderwebdev.com/wp-content/uploads/2022/11/cropped-rsz_swd_gray_logo-32x32.png"],
  ["og-image.png", "https://spyderwebdev.com/wp-content/uploads/2022/11/Social-Share-Image-Home-high-rez.png"],
];

const outDir = path.resolve("public/images/spyderwebdev");
await mkdir(outDir, { recursive: true });
await mkdir(path.resolve("public/seo"), { recursive: true });

async function download([name, url]) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const dest = path.join(outDir, name);
  await writeFile(dest, buf);
  return name;
}

const batchSize = 4;
const results = [];
for (let i = 0; i < assets.length; i += batchSize) {
  const batch = assets.slice(i, i + batchSize);
  const names = await Promise.all(batch.map(download));
  results.push(...names);
}

await writeFile(path.join("public/seo", "favicon.png"), await fetch(assets.find(([n]) => n === "favicon-32.png")[1]).then((r) => r.arrayBuffer()).then(Buffer.from));
console.log(`Downloaded ${results.length} assets to ${outDir}`);
