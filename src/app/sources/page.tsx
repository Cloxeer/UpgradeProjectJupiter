import type { Metadata } from "next";
import { SiteHeader } from "@/components/jupiter/SiteHeader";
import { SiteFooter } from "@/components/jupiter/SiteFooter";
import { SectionHeading } from "@/components/jupiter/SectionHeading";
import { sources, citeNumber, sourceById, type Source } from "@/data/sources";
import { sourceMap } from "@/data/sourceMap";
import { HelpImprove } from "@/components/jupiter/HelpImprove";
import { SourceBrowser } from "./SourceBrowser";

export const metadata: Metadata = {
  title: "Sources: every document, by page",
  description: "Every document behind the Force Upgrade Project Jupiter site, grouped by page and section: the signed Community Benefits Agreement, NMED permit filings, NMSU research, vendor specifications and news reports.",
  alternates: { canonical: "/sources/" },
};

const groups: { key: Source["group"]; title: string; blurb: string }[] = [
  { key: "primary", title: "Primary documents", blurb: "Signed agreements, permit filings, and the developers' own publications. These outrank everything else on this site." },
  { key: "science", title: "Science and engineering", blurb: "Vendor specifications, operating plants, and university research that the upgrade relies on." },
  { key: "news", title: "Reporting", blurb: "Journalism used for status and context. Where a number appears here and in a primary document, the primary document wins." },
];

const photoCredits = ["photo-phe", "photo-bgndrf", "photo-grs", "render"].filter((id) => sourceById[id]);

export default function SourcesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section style={{ backgroundColor: "#003047" }}>
          <div className="pj-container py-14 text-center">
            <h1 className="font-black text-white" style={{ fontSize: "clamp(32px,5vw,48px)", lineHeight: 1.1 }}>SOURCES</h1>
            <p className="mx-auto mt-4 max-w-[760px] text-gold" style={{ fontSize: 18, lineHeight: 1.5 }}>
              Every number on this site traces to one of the {sources.length} documents below. Pick a page to see what it cites, section by section.
            </p>
            <p className="mx-auto mt-3 max-w-[760px]" style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}>
              Where we estimate, we say so on the page and here. Where the developers&apos; marketing and their signed agreement disagree, we quote
              both and cite both.
            </p>
          </div>
        </section>

        <SectionHeading id="by-page">SOURCES, PAGE BY PAGE</SectionHeading>
        <div className="pj-container pb-14">
          <SourceBrowser pages={sourceMap} />
        </div>

        <div style={{ backgroundColor: "#fafafa" }}>
          <SectionHeading id="all">EVERY DOCUMENT</SectionHeading>
          <div className="pj-container pb-14">
            <p className="mx-auto mb-6 max-w-[860px] text-center" style={{ fontSize: 16, lineHeight: 1.6, color: "#3c3c3c" }}>
              The full numbered list. Bracketed numbers in the text, like [1], link here.
            </p>
            {groups.map((g) => (
              // suppressHydrationWarning: browsers auto-open a <details> when the URL fragment points inside it, before React hydrates.
              <details key={g.key} suppressHydrationWarning className="mx-auto mb-3 max-w-[1000px] rounded border bg-white" style={{ borderColor: "#e0e0e0" }} open={g.key === "primary"}>
                <summary className="cursor-pointer px-5 py-4">
                  <span className="font-black" style={{ fontSize: 18, color: "#003047" }}>{g.title}</span>
                  <span className="ml-2 text-[15px]" style={{ color: "#6b6b6b" }}>· {sources.filter((s) => s.group === g.key).length} documents</span>
                  <p className="mt-1" style={{ fontSize: 15, color: "#6b6b6b" }}>{g.blurb}</p>
                </summary>
                <ol className="space-y-3 px-5 pb-5">
                  {sources
                    .filter((s) => s.group === g.key)
                    .map((s) => (
                      <li key={s.id} id={s.id} className="rounded border-l-4 p-4" style={{ borderColor: "#219ebc", backgroundColor: "#fafafa", scrollMarginTop: 140 }}>
                        <div className="flex flex-wrap items-baseline gap-x-3">
                          <span className="font-black" style={{ fontSize: 18, color: "#c0392b" }}>[{citeNumber(s.id)}]</span>
                          <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ fontSize: 17, color: "#003047" }}>
                            {s.title} ↗
                          </a>
                        </div>
                        <div className="mt-1" style={{ fontSize: 15, color: "#6b6b6b" }}>
                          {s.publisher} · {s.date}
                        </div>
                        <p className="mt-2" style={{ fontSize: 16, lineHeight: 1.6, color: "#3c3c3c" }}>
                          <strong>What we use it for:</strong> {s.used}
                        </p>
                      </li>
                    ))}
                </ol>
              </details>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: "#003047" }}>
          <div className="pj-container py-10">
            <div className="mx-auto max-w-[900px]" style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>
              <p className="font-bold text-gold">What is estimated, not sourced</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Greenhouse acreage, yields, jobs per acre, and food output use controlled-environment-agriculture industry averages. No Santa Teresa greenhouse study exists yet.</li>
                <li>Capture cost (~$1.5B) is an order-of-magnitude estimate for concentrated-stream capture on 2,275 stacks. No vendor quote exists.</li>
                <li>Solar output per roof is computed from the reported 3 million square feet of halls and standard rooftop yields, not from a structural survey.</li>
                <li>Heat available at the dry coolers is taken as roughly equal to the IT load, which is basic thermodynamics, not a measured figure.</li>
                <li>Map positions are traced from the developers&apos; one published render and are not survey-accurate. The exact boundary of the 819-acre site has not been published.</li>
              </ul>
              <p className="mt-5 font-bold text-gold">Photo credits and licences</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {photoCredits.map((id) => {
                  const s = sourceById[id]!;
                  return (
                    <li key={id}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline">{s.title}</a> · {s.publisher} · {s.used}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <HelpImprove />
      </main>
      <SiteFooter />
    </>
  );
}
