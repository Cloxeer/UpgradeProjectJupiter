import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const html = await import("node:fs/promises").then((fs) =>
  fs.readFile("docs/research/bangbangforever.com/page.html", "utf8"),
);

const urlPattern =
  /https?:\/\/images\.squarespace-cdn\.com\/content\/v1\/542dc06ae4b0a98dd74f94db\/[^"'\s)]+/g;
const matches = [...html.matchAll(urlPattern)].map((m) => m[0].split("?")[0]);
const unique = [...new Set(matches)];

const keyAssets = [
  ["logo-white.png", "https://images.squarespace-cdn.com/content/v1/542dc06ae4b0a98dd74f94db/1549405043728-B2LLXWH4WLOP7VH8II4Q/BANG_Logo_White_1000px.png?format=1500w"],
  ["hero.gif", "https://images.squarespace-cdn.com/content/v1/542dc06ae4b0a98dd74f94db/1521251687345-P2NZXURWRRK7MYRN6HHP/WWW_GIF2.gif"],
  ["grand-street.jpg", "https://images.squarespace-cdn.com/content/v1/542dc06ae4b0a98dd74f94db/1537551319963-Y063GIGL31Y1HVV7RGA2/62GRAND_BW2.jpg?format=2500w"],
  ["forever-care.jpg", "https://images.squarespace-cdn.com/content/v1/542dc06ae4b0a98dd74f94db/1547673023892-T6DWOEOVPMDXLJLEFE3Z/Untitled-6.jpg?format=2500w"],
  ["location.jpg", "https://images.squarespace-cdn.com/content/v1/542dc06ae4b0a98dd74f94db/1548570416419-MAXAD3ZRZWBEX49AEQWV/P_location.jpg?format=2500w"],
  ["artist-bang-bang.jpg", "https://images.squarespace-cdn.com/content/v1/542dc06ae4b0a98dd74f94db/1526610920115-RPOFS0XDIXD44SQW78HB/BBFINAL2018.jpg?format=1500w"],
  ["artist-jay-shin.jpg", "https://images.squarespace-cdn.com/content/v1/542dc06ae4b0a98dd74f94db/3ade313f-a0b2-49f3-afd0-832adf09f258/JAY232.jpg?format=1500w"],
  ["artist-zee.jpg", "https://images.squarespace-cdn.com/content/v1/542dc06ae4b0a98dd74f94db/d0a9dc98-f235-4857-8559-ad2ce6865ba8/ZEE231.jpg?format=1500w"],
  ["artist-pawel.jpg", "https://images.squarespace-cdn.com/content/v1/542dc06ae4b0a98dd74f94db/4a7e92de-6a55-4883-b025-f9a398493711/pawel.jpg?format=1500w"],
  ["artist-solar.jpg", "https://images.squarespace-cdn.com/content/v1/542dc06ae4b0a98dd74f94db/f21ad36b-950d-48c8-ba54-80ff57658d12/IMG_4930.JPG?format=1500w"],
  ["artist-adrian.jpg", "https://images.squarespace-cdn.com/content/v1/542dc06ae4b0a98dd74f94db/1611532649275-O5VJSPD2V9V9RIKXTB2I/ADRIAN.jpg?format=1500w"],
  ["artist-sara-kori.jpg", "https://images.squarespace-cdn.com/content/v1/542dc06ae4b0a98dd74f94db/45740899-33ed-4ba4-930d-d7b2522ba2ef/Sara+Kori+Website+photo.jpg?format=1500w"],
  ["artist-victor.jpg", "https://images.squarespace-cdn.com/content/v1/542dc06ae4b0a98dd74f94db/66d07022-e815-46da-b65f-81aa77b0f809/Victor+Final+.jpg?format=1500w"],
  ["artist-basil.jpg", "https://images.squarespace-cdn.com/content/v1/542dc06ae4b0a98dd74f94db/63ec8fc9-103b-4ff6-a69a-e151219986f5/BASIL23.jpg?format=1500w"],
  ["favicon.ico", "https://images.squarespace-cdn.com/content/v1/542dc06ae4b0a98dd74f94db/1412396574925-2NRLNNHZ72UEUOTELPUQ/favicon.ico"],
  ["apparel-blur-1.jpeg", "https://images.squarespace-cdn.com/content/v1/542dc06ae4b0a98dd74f94db/1724707673827-9TN0F2D07A36OYRTKQ4P/AL_06596_BLUR.jpeg?format=1500w"],
  ["apparel-blur-2.jpeg", "https://images.squarespace-cdn.com/content/v1/542dc06ae4b0a98dd74f94db/1724707659206-DH7EN41505A7GV0Y1N2N/AL_06741_blur.jpeg?format=1500w"],
  ["apparel-blur-3.jpg", "https://images.squarespace-cdn.com/content/v1/542dc06ae4b0a98dd74f94db/1724720874513-P812TTIUID9ULUCF39O4/AL_07064_blur.jpg?format=1500w"],
  ["book-cover.jpg", "https://images.squarespace-cdn.com/content/v1/542dc06ae4b0a98dd74f94db/1547673023892-T6DWOEOVPMDXLJLEFE3Z/Untitled-6.jpg?format=1500w"],
];

const outDir = path.resolve("public/images/bangbang");
const seoDir = path.resolve("public/seo");
await mkdir(outDir, { recursive: true });
await mkdir(seoDir, { recursive: true });

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
for (let i = 0; i < keyAssets.length; i += batchSize) {
  const batch = keyAssets.slice(i, i + batchSize);
  const names = await Promise.all(batch.map(download));
  results.push(...names);
}

await writeFile(
  path.join("docs/research/bangbangforever.com", "asset-urls.json"),
  JSON.stringify({ total: unique.length, urls: unique }, null, 2),
);

console.log(`Downloaded ${results.length} key assets. Found ${unique.length} total image URLs.`);
