// Downloads all Bialik Breakdown assets to public/images/bialik/
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const OUT = join(process.cwd(), 'public', 'images', 'bialik');
const CDN1 = 'https://cdn.prod.website-files.com/5fb2afaf2aa82effee54005f/';
const CDN2 = 'https://cdn.prod.website-files.com/5fb2bb88b47c5a539a7b1400/';

const assets = [
  // brand / hero
  ['5fb2b184686e99165079e049_2020_BP_MayimBialikPodcast_Wordmark_Burst_GreyYellow%201.png', 'logo.png', CDN1],
  ['5fc472ca234e05624b139b9b_Mayim-white-blazer.png', 'mayim-blazer.png', CDN1],
  ['5ff643d9e1c8fa356aa7904c_Group%2083.png', 'brain-burst.png', CDN1],
  ['5fc57f826eacc678afc127d0_BG-2.png', 'bg-pattern.png', CDN1],
  // badges
  ['5fbd2fe5d8309438aca1863e_Apple%20Podcast.png', 'apple-podcasts.png', CDN1],
  ['5fbd2fe51ebb41824a7de80d_Spotify.png', 'spotify.png', CDN1],
  ['5fbd2fe509e7537fbd77a435_youtube-watch.png', 'youtube-watch.png', CDN1],
  // newsletter thumbs
  ['5fc04491208e6be022c12d51_mayim-img-1.png', 'thumb-1.png', CDN1],
  ['5fc04491dbdc805d4d196233_mayim-img-2.png', 'thumb-2.png', CDN1],
  ['5fc04491c145ac0709caa27c_mayim-img-3.png', 'thumb-3.png', CDN1],
  // social icons (dark)
  ['5fb426036854453d02e5478f_facebook-logo-black.png', 'fb-black.png', CDN1],
  ['5fb426115475077ecb5f3cf1_IG-black.png', 'ig-black.png', CDN1],
  ['5fb4260a5c0dba233059ec4c_twitter-social-logotype-black.png', 'tw-black.png', CDN1],
  ['5fb42618df14d24235fedfab_youtube-black.png', 'yt-black.png', CDN1],
  // social icons (white)
  ['5fb4119d178398f81f389f02_facebook-logo.png', 'fb-white.png', CDN1],
  ['5fb411f436fdc35088b8bccc_twitter-social-logotype.png', 'tw-white.png', CDN1],
  ['5fb4120213ca4d5ebc11b1cb_IG.png', 'ig-white.png', CDN1],
  ['5fb4120e561a6b57c12d1536_youtube.png', 'yt-white.png', CDN1],
  // footer / partnership
  ['688a24bb602b4ae83570987e_IMPACT%20ICON%20(1).png', 'impact-theory.png', CDN1],
  ['689630f378ad3ba1aab6ac8a_dab681e09fd8e9f3d294aba4d3fb8b74_PARTNERSHIP%20ICON%20v2.png', 'partnership-btn.png', CDN1],
  ['5fc6846dc60f8252fdc58f56_Group%204.png', 'group4.png', CDN1],
  // favicon
  ['5febc9b6f7f41843d98593f9_Frame%201.png', 'favicon.png', CDN1],
  // episode thumbnails
  ['6a6bbdf91de521fb56a36c3a_GREGG%20AUD%20re-air.jpg', 'ep-gregg.jpg', CDN2],
  ['6a682a5b99af5bc4e88025a6_Diane%20aud%20thumb%20(pt%202).jpg', 'ep-diane-2.jpg', CDN2],
  ['6a682a1ebe3ba8bb8f3d0644_Diane%20aud%20thumb%20(pt%201).jpg', 'ep-diane-1.jpg', CDN2],
  ['6a6251c3be9ba514b8de108b_Carla%20Naumbur%20aud%20thumb%20(v2).jpg', 'ep-carla.jpg', CDN2],
  ['6a5eb8f5f52c1bebaea99a0c_Kudrow%20aud%20(p2).jpg', 'ep-kudrow-2.jpg', CDN2],
  ['6a5eb79e5c6d03aae1c8835e_Kudrow%20aud%20(pt%201).jpg', 'ep-kudrow-1.jpg', CDN2],
];

// Also grab the CSS to extract font URLs
const CSS_URL = CDN1 + 'css/bialik-breakdown.webflow.shared.892dc914c.css';

await mkdir(OUT, { recursive: true });

async function grab(url, name) {
  try {
    const res = await fetch(url);
    if (!res.ok) { console.error('FAIL', res.status, name); return; }
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(join(OUT, name), buf);
    console.log('OK', name, buf.length);
  } catch (e) { console.error('ERR', name, e.message); }
}

// batch 4 at a time
for (let i = 0; i < assets.length; i += 4) {
  await Promise.all(assets.slice(i, i + 4).map(([p, name, cdn]) => grab(cdn + p, name)));
}

// fetch css to a text file for font extraction
try {
  const res = await fetch(CSS_URL);
  const txt = await res.text();
  await writeFile(join(OUT, '_webflow.css'), txt);
  const faces = [...txt.matchAll(/@font-face\{[^}]*\}/g)].map(m => m[0]).join('\n');
  console.log('FONT FACES:\n', faces.slice(0, 2000));
} catch (e) { console.error('css err', e.message); }

console.log('done');
