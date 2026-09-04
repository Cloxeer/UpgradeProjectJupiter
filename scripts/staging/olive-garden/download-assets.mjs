import fs from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { createWriteStream } from "node:fs";

const staging = path.resolve("scripts/staging/olive-garden");
const haliteAssets = path.resolve("d:/HaliteWebDevelopment/templates/restaurant/olive-garden/assets/images");

const assets = [
  ["logo.svg", "https://media.olivegarden.com/images/OG_Redesign_Assets/OG_Logo.svg"],
  ["icon-location.svg", "https://media.olivegarden.com/images/OG_Redesign_Assets/Mobile/Icons/Mobile_Header_Location.svg"],
  ["icon-cart.svg", "https://media.olivegarden.com/images/OG_Redesign_Assets/Mobile/Icons/Mobile_Header_Cart.svg"],
  ["icon-chevron.svg", "https://media.olivegarden.com/images/OG_Redesign_Assets/Icons/Menu_Detail_Chevron_Right.svg"],
  ["hero-poster.jpg", "https://media.olivegarden.com/en_us/images/marketing/og-07132026-desktop.png"],
  ["delivery-banner-desktop.png", "https://media.olivegarden.com/images/OG_Redesign_Assets/Desktop/Desktop_Homepage_Delivery_Banner_Updated.png"],
  ["delivery-banner-mobile.png", "https://media.olivegarden.com/images/OG_Redesign_Assets/Mobile/Mobile_Homepage_Delivery_Banner_Updated.png"],
  ["promo-banner-desktop.png", "https://media.olivegarden.com/en_us/images/marketing/og-07132026-desktop.png"],
  ["promo-banner-mobile.png", "https://media.olivegarden.com/en_us/images/marketing/og-07132026-mobile.png"],
  ["special-1.jpg", "https://media.olivegarden.com/en_us/images/marketing/calabrian-homepage-desktop.png"],
  ["special-2.jpg", "https://media.olivegarden.com/images/OG_Redesign_Assets/Desktop/Desktop_Homepage_Specials_Catering_Image.png"],
  ["special-3.jpg", "https://media.olivegarden.com/images/OG_Redesign_Assets/Desktop/Desktop_Homepage_Specials_CYOP_Image.png"],
  ["special-4.jpg", "https://media.olivegarden.com/images/OG_Redesign_Assets/Desktop/Desktop_Homepage_Specials_Take_Home_Entrees_Image.png"],
  ["menu-lunch.jpg", "https://media.olivegarden.com/images/OG_Redesign_Assets/Desktop/Desktop_Homepage_Menu_Highlights_Lunch_Sized_Favorites.png"],
  ["menu-family.jpg", "https://media.olivegarden.com/images/OG_Redesign_Assets/Desktop/Desktop_Homepage_Menu_Highlights_Family_Style_Meals.png"],
  ["menu-appetizers.jpg", "https://media.olivegarden.com/images/OG_Redesign_Assets/Mobile/Mobile_Homepage_Menu_Highlights_Appetizers.png"],
  ["menu-pasta.jpg", "https://media.olivegarden.com/images/OG_Redesign_Assets/Mobile/Mobile_Homepage_Menu_Highlights_Create_Your_Own_Pasta.png"],
  ["menu-desserts.jpg", "https://media.olivegarden.com/images/OG_Redesign_Assets/Desktop/Desktop_Homepage_Menu_Highlights_Desserts.png"],
  ["menu-catering.jpg", "https://media.olivegarden.com/images/OG_Redesign_Assets/Mobile/Mobile_Homepage_Menu_Highlights_Catering.png"],
  ["menu-entrees.jpg", "https://media.olivegarden.com/images/OG_Redesign_Assets/Mobile/Mobile_Homepage_Menu_Highlights_Classic_Entrees.png"],
  ["menu-beverages.jpg", "https://media.olivegarden.com/images/OG_Redesign_Assets/Desktop/Desktop_Homepage_Menu_Highlights_Non_Alcoholic_Beverages.png"],
  ["quick-join.jpg", "https://media.olivegarden.com/images/OG_Redesign_Assets/Desktop/Desktop_Homepage_Join_Our_Family_Card.png"],
  ["quick-catering.jpg", "https://media.olivegarden.com/images/OG_Redesign_Assets/Desktop/Desktop_Homepage_Catering_Card.png"],
  ["quick-eclub.jpg", "https://media.olivegarden.com/images/OG_Redesign_Assets/Desktop/Desktop_Homepage_EClub_Card.png"],
  ["quick-gift.jpg", "https://media.olivegarden.com/images/OG_Redesign_Assets/Desktop/Desktop_Homepage_Gift_Cards_Card.png"],
  ["social-facebook.svg", "https://media.olivegarden.com/images/OG_Redesign_Assets/Social_Media_Icon_Facebook.svg"],
  ["social-twitter.svg", "https://media.olivegarden.com/images/OG_Redesign_Assets/Social_Media_Icon_Twitter.svg"],
  ["social-instagram.svg", "https://media.olivegarden.com/images/OG_Redesign_Assets/Social_Media_Icon_Instagram.svg"],
  ["app-google-play.png", "https://media.olivegarden.com/images/OG_Redesign_Assets/Desktop/Desktop_Footer_Google_Play_Tag.png"],
  ["app-app-store.png", "https://media.olivegarden.com/images/OG_Redesign_Assets/Desktop/Footer/Desktop_Footer_App_Store_Tag.png"],
];

async function downloadOne([name, url]) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${name}: ${res.status}`);
  const dest = path.join(staging, name);
  await pipeline(res.body, createWriteStream(dest));
  return name;
}

async function main() {
  await fs.mkdir(staging, { recursive: true });
  await fs.mkdir(haliteAssets, { recursive: true });
  const batchSize = 4;
  const results = [];
  for (let i = 0; i < assets.length; i += batchSize) {
    const batch = assets.slice(i, i + batchSize);
    const settled = await Promise.allSettled(batch.map(downloadOne));
    for (const s of settled) {
      if (s.status === "fulfilled") results.push(s.value);
      else console.error("FAIL:", s.reason?.message ?? s.reason);
    }
  }
  for (const name of results) {
    await fs.copyFile(path.join(staging, name), path.join(haliteAssets, name));
  }
  console.log(`Downloaded ${results.length}/${assets.length} assets`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
