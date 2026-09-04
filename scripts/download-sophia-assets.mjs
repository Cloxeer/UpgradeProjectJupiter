// Downloads real brand assets from sourdoughsophia.co.uk into public/images/sophia
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = "public/images/sophia";
const CDN = "https://sourdoughsophia.co.uk/cdn/shop/files";

const assets = [
  ["SS_logo_grey_dark_pink_15395fb2-66df-44ba-b249-32a1c62bb9ff_2048x.png?v=1614385900", "logo.png"],
  ["Favicon_a113344d-aeea-4817-8b95-9d690d7e4dac_180x180.png", "favicon.png"],
  ["SourdoughSophia_631_2048x.jpg?v=1721644846", "hero.jpg"],
  ["SourdoughSophia_537_2048x.jpg?v=1721642501", "card-order.jpg"],
  ["SourdoughSophia_109_2048x.jpg?v=1721644930", "card-careers.jpg"],
  ["SourdoughSophia_862_33f810a0-cd61-484c-af79-636588e4f8a2_2048x.jpg?v=1721644712", "card-contact.jpg"],
  ["SourdoughSophia_953_2048x.jpg?v=1721644750", "featured.jpg"],
];

async function run() {
  await mkdir(OUT, { recursive: true });
  for (let i = 0; i < assets.length; i += 4) {
    const batch = assets.slice(i, i + 4);
    await Promise.all(
      batch.map(async ([path, name]) => {
        const url = `${CDN}/${path}`;
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`${res.status}`);
          const buf = Buffer.from(await res.arrayBuffer());
          await writeFile(join(OUT, name), buf);
          console.log(`✓ ${name} (${(buf.length / 1024).toFixed(0)}kb)`);
        } catch (e) {
          console.error(`✗ ${name}: ${e.message}  <- ${url}`);
        }
      })
    );
  }
}
run();
