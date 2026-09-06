import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://upgradeprojectjupiter.com";

/** Every public page, most important first. Paths end in "/" to match the static export. */
const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/petition/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/blueprint/", priority: 0.9, changeFrequency: "weekly" },
  { path: "/legislators/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/science/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sources/", priority: 0.6, changeFrequency: "weekly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map((p) => ({ url: `${SITE}${p.path}`, lastModified, changeFrequency: p.changeFrequency, priority: p.priority }));
}
