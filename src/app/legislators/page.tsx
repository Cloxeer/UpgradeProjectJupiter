import type { Metadata } from "next";
import { SiteHeader } from "@/components/jupiter/SiteHeader";
import { SiteFooter } from "@/components/jupiter/SiteFooter";
import { SectionHeading } from "@/components/jupiter/SectionHeading";
import { Steps } from "@/components/jupiter/Steps";
import { ActOnRecord } from "@/components/jupiter/ActOnRecord";
import { CopyTextButton } from "@/components/jupiter/CopyScript";
import { clausesText } from "@/lib/script";
import { demands, CLAUSE_NOTE } from "@/data/feasibility";
import { stateSenators, stateReps, nmlegisUrl, bills } from "@/data/upgrade";

export const metadata: Metadata = {
  title: "Who to call and what to say",
  description: "Doña Ana County commissioners with phone and prefilled email, meeting times, a two-minute public-comment script, the state legislators, and the three bills that would make the Project Jupiter upgrade the rule.",
  alternates: { canonical: "/legislators/" },
};

const sponsors = [...stateSenators, ...stateReps].filter((m) => "note" in m && m.note);

export default function LegislatorsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section style={{ backgroundColor: "#003047" }}>
          <div className="pj-container py-12">
            <h1 className="font-black text-white" style={{ fontSize: "clamp(32px,5vw,48px)", lineHeight: 1.1 }}>
              Who to call. What to say.
            </h1>
            <p className="mt-4 max-w-[62ch] text-gold" style={{ fontSize: 18, lineHeight: 1.5 }}>
              Five county commissioners hold the lease. None of the six conditions is in it yet. Your comment and your call are step three.
            </p>
            <div className="mt-8 max-w-[1000px]">
              <Steps dark compact highlight={3} />
            </div>
          </div>
        </section>

        {/* Step 3: the same block that ends the Blueprint. One component, one data source. */}
        <section id="commission" style={{ backgroundColor: "#003047", borderTop: "1px solid rgba(255,255,255,0.15)" }}>
          <div className="pj-container py-14">
            <ActOnRecord id="act" />
            <details className="mt-10 rounded px-4 py-3" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)" }}>
              <summary className="cursor-pointer text-[15px] font-bold text-white">Appendix: six draft lease clauses for the commission (model text, not legal advice)</summary>
              <ol className="mt-3 space-y-3 pl-5" style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.9)", listStyle: "decimal" }}>
                {demands.map((d) => (
                  <li key={d.id}>
                    <strong className="text-white">{d.short}.</strong> {d.clause}
                  </li>
                ))}
              </ol>
              <p className="mt-2 text-[13px]" style={{ color: "rgba(255,255,255,0.7)" }}>{CLAUSE_NOTE}</p>
              <div className="mt-3">
                <CopyTextButton text={clausesText()} label="Copy the six clauses" dark />
              </div>
            </details>
          </div>
        </section>

        {/* Steps 1 and 2, folded: the state legislators and the three bills. */}
        <div style={{ backgroundColor: "#fafafa" }}>
          <SectionHeading stamp="upgrade" id="bills">SANTA FE: THE THREE BILLS</SectionHeading>
          <div className="pj-container pb-14">
            <p className="mx-auto mb-5 max-w-[860px] text-center" style={{ fontSize: 16, lineHeight: 1.6, color: "#3c3c3c" }}>
              The lease fixes this data center. Three bills fix the next one. {sponsors.length} of Doña Ana County&apos;s legislators already sponsor a moratorium bill:{" "}
              {sponsors.map((m, i) => (
                <span key={m.name}>
                  <strong>{m.name}</strong>
                  {i < sponsors.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>

            <div className="mx-auto max-w-[1000px] space-y-3">
              <details className="rounded bg-white shadow-sm" id="legislature">
                <summary className="flex min-h-[52px] cursor-pointer items-center justify-between gap-3 px-5 py-3 font-bold" style={{ fontSize: 17, color: "#003047" }}>
                  <span>Why these three asks: the bills in one line each</span>
                  <span className="text-[13px] font-black uppercase" style={{ color: "#2e8b57" }}>open</span>
                </summary>
                <div className="grid grid-cols-1 gap-4 px-5 pb-5 lg:grid-cols-3">
                  {bills.map((b) => (
                    <div key={b.name} className="flex flex-col rounded border-t-4 p-4" style={{ borderColor: "#2e8b57", backgroundColor: "#f7faf8" }}>
                      <h3 className="font-bold" style={{ fontSize: 18, color: "#003047" }}>{b.name}</h3>
                      <p className="mt-1" style={{ fontSize: 14, lineHeight: 1.5, color: "#6b6b6b" }}>{b.status}</p>
                      <p className="mt-3 font-semibold" style={{ fontSize: 16, lineHeight: 1.5, color: "#3c3c3c" }}>&ldquo;{b.pitch}&rdquo;</p>
                      <p className="mt-3" style={{ fontSize: 15, lineHeight: 1.55, color: "#3c3c3c" }}>
                        <strong>The ask:</strong> {b.ask}
                      </p>
                    </div>
                  ))}
                </div>
              </details>

              <details className="rounded bg-white shadow-sm">
                <summary className="flex min-h-[52px] cursor-pointer items-center justify-between gap-3 px-5 py-3 font-bold" style={{ fontSize: 17, color: "#003047" }}>
                  <span>All eleven Doña Ana County legislators</span>
                  <span className="text-[13px] font-black uppercase" style={{ color: "#2e8b57" }}>open</span>
                </summary>
                <div className="grid grid-cols-1 gap-6 px-5 pb-5 md:grid-cols-2">
                  {[
                    { title: "State Senate", items: stateSenators, url: `${nmlegisUrl}?T=S` },
                    { title: "State House", items: stateReps, url: `${nmlegisUrl}?T=R` },
                  ].map((group) => (
                    <div key={group.title}>
                      <h3 className="mb-2 font-bold" style={{ fontSize: 18, color: "#003047" }}>{group.title}</h3>
                      <ul className="space-y-2">
                        {group.items.map((m) => (
                          <li key={m.district} className="border-b border-line pb-2 last:border-0">
                            <div className="font-bold" style={{ fontSize: 16 }}>
                              {m.name} <span className="font-normal" style={{ color: "#6b6b6b" }}>({m.district})</span>
                            </div>
                            {"note" in m && m.note && <div style={{ fontSize: 14, color: "#2e8b57" }}>{m.note}</div>}
                          </li>
                        ))}
                      </ul>
                      <a href={group.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-[14px] font-bold underline" style={{ color: "#15768c" }}>
                        Office phones and emails: official {group.title} list
                      </a>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
