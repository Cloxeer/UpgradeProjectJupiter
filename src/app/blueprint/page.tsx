import type { Metadata } from "next";
import { SiteHeader } from "@/components/jupiter/SiteHeader";
import { SiteFooter } from "@/components/jupiter/SiteFooter";
import { BeatSection } from "@/components/story/BeatSection";
import { Guide } from "@/components/story/Guide";
import { NotAt } from "@/components/story/Tiered";
import { SiteMap } from "@/components/story/diagrams/SiteMap";
import { CarbonDiagram } from "@/components/story/diagrams/CarbonDiagram";
import { WaterDiagram } from "@/components/story/diagrams/WaterDiagram";
import { HeatDiagram } from "@/components/story/diagrams/HeatDiagram";
import { PowerDiagram } from "@/components/story/diagrams/PowerDiagram";
import { MilestoneStrip } from "@/components/story/diagrams/MilestoneStrip";
import { CostTotals } from "@/components/blueprint/CostTotals";
import { ActOnRecord } from "@/components/jupiter/ActOnRecord";
import { Truth } from "@/components/jupiter/Truth";
import { costItems } from "@/data/blueprint";
import { pctOfBond, pctOfPhase1, parseCostM } from "@/lib/units";
import { blueprint } from "@/data/story";
import { Photo, PhotoPair } from "@/components/story/Photo";
import { changePhotos } from "@/data/photos";

export const metadata: Metadata = {
  title: "The plan: four changes, six conditions, one campus",
  description: "The upgraded site plan for Project Jupiter on its own 819 acres, the four changes in order of impact (carbon, water, heat and food, gas), what it costs against the $50B first phase, the years, and how to comment on the permit record.",
  alternates: { canonical: "/blueprint/" },
};

const diagrams: Record<string, React.ComponentType> = { carbon: CarbonDiagram, water: WaterDiagram, heat: HeatDiagram, gas: PowerDiagram };

/** The plan. Four sections: the site, the four changes, what it costs and when, act on the record. */
export default function BlueprintPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* 1. The site */}
        <section id="site" style={{ backgroundColor: "#f6f8f8" }}>
          <div className="pj-container py-14 md:py-20">
            <h1 className="max-w-[24ch] font-black" style={{ fontSize: "clamp(28px,4vw,44px)", lineHeight: 1.1, color: "#003047", letterSpacing: "-0.01em" }}>
              {blueprint.opening}
            </h1>
            <h2 className="mt-12 text-[22px] font-black" style={{ color: "#003047" }}>{blueprint.site.title}</h2>
            <div className="mt-5 rounded bg-white p-3 md:p-4">
              <SiteMap />
            </div>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-start">
              <Guide t={blueprint.site.line} />
              <Photo id="halls" ratio="16 / 10" />
            </div>
          </div>
        </section>

        {/* 2. The four changes, in order of impact */}
        <BeatSection id="changes" tone="light">
          <div className="pj-container py-16 md:py-24">
            <h2 className="font-black" style={{ fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.15, color: "#003047" }}>
              {blueprint.changesTitle}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-16 md:gap-24">
              {blueprint.changes.map((c) => {
                const Diagram = diagrams[c.id];
                return (
                  <article key={c.id} id={c.id} className="scroll-mt-32">
                    <h3 className="text-[24px] font-black md:text-[28px]" style={{ color: "#1f5f3a", lineHeight: 1.15 }}>{c.title}</h3>
                    <div className="mt-6 rounded p-3 md:p-5" style={{ backgroundColor: "#f6f8f8" }}>
                      <Diagram />
                    </div>
                    <div className="mt-8">
                      <Guide t={c.line} />
                    </div>
                    <div className="mt-8">
                      <PhotoPair ids={changePhotos[c.id] ?? []} />
                    </div>
                    {c.conditions.length > 0 ? (
                      <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                        {c.conditions.map((d) => (
                          <li key={d.n} style={{ borderLeft: "3px solid #2e8b57", paddingLeft: 16 }}>
                            <div className="text-[15px] font-bold" style={{ color: "#5d6a70" }}>Condition {d.n}</div>
                            <div className="mt-1 text-[17px] font-bold" style={{ color: "#003047", lineHeight: 1.4 }}>{d.short}</div>
                            <NotAt depth="simple">
                              <div className="mt-1 text-[15px]" style={{ color: "#3c3c3c", lineHeight: 1.5 }}>{d.gate}</div>
                            </NotAt>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <NotAt depth="simple">
                        <p className="mt-8 text-[15px]" style={{ color: "#5d6a70", lineHeight: 1.5 }}>{"note" in c ? c.note : null}</p>
                      </NotAt>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </BeatSection>

        {/* 3. What it costs, and when */}
        <BeatSection id="cost" tone="paper">
          <div className="pj-container py-16 md:py-24">
            <h2 className="font-black" style={{ fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.15, color: "#003047" }}>
              {blueprint.cost.title}
            </h2>
            <div className="mt-8">
              <Guide t={blueprint.cost.line} />
            </div>
            <CostTotals />
            <NotAt depth="simple">
              <details className="mt-10 rounded bg-white">
                <summary className="pj-press flex min-h-[52px] cursor-pointer items-center justify-between gap-3 px-5 py-3 text-[17px] font-bold" style={{ color: "#003047" }}>
                  <span>Every cost line, with its basis</span>
                  <span className="text-[13px] font-black uppercase" style={{ color: "#2e8b57" }}>open</span>
                </summary>
              <div className="w-full overflow-x-auto p-2">
                <table className="pj-table pj-table--compare pj-table--stack">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Cost</th>
                      <th>Share of the $50B first phase</th>
                      <th>Who pays</th>
                      <th>Basis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {costItems.map((c) => {
                      const m = parseCostM(c.cost);
                      const approx = m.lo !== undefined ? "about " : "";
                      return (
                        <tr key={c.item}>
                          <th scope="row">{c.item}</th>
                          <td data-label="Cost" className="pj-cell-ours" style={{ whiteSpace: "nowrap" }}>{c.cost}</td>
                          <td data-label="Share of the $50B first phase" style={{ whiteSpace: "nowrap" }}>
                            <span style={{ fontWeight: 700, color: "#003047" }}>{approx}{pctOfPhase1(m.m)}</span>
                            <span className="block text-[13px]" style={{ color: "#6b6b6b" }}>{approx}{pctOfBond(m.m)} of the $165B cap (a ceiling, not cash)</span>
                          </td>
                          <td data-label="Who pays">{c.who}</td>
                          <td data-label="Basis" style={{ fontSize: 15 }}>
                            <Truth label={c.label} /> {c.note}{m.stream && <span style={{ color: "#6b6b6b" }}> (A payment stream, not capital.)</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              </details>
            </NotAt>
            <h3 className="mt-16 text-[22px] font-black" style={{ color: "#003047" }}>The years</h3>
            <div className="mt-6">
              <MilestoneStrip />
            </div>
            <p className="mt-12 text-[16px]" style={{ color: "#3c3c3c" }}>
              {blueprint.cost.sourcesLine}{" "}
              <a href="/sources" className="inline-flex min-h-[44px] items-center font-bold underline" style={{ color: "#15768c" }}>
                All sources
              </a>
            </p>
          </div>
        </BeatSection>

        {/* 4. Act on the record */}
        <BeatSection id="act-section" tone="navy">
          <div className="pj-container py-16 md:py-24">
            <h2 className="font-black text-white" style={{ fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.15 }}>
              {blueprint.act.title}
            </h2>
            <div className="mt-8">
              <ActOnRecord />
            </div>
          </div>
        </BeatSection>
      </main>
      <SiteFooter />
    </>
  );
}
