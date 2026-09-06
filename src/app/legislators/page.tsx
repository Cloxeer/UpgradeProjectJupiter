import type { Metadata } from "next";
import { SiteHeader } from "@/components/jupiter/SiteHeader";
import { SiteFooter } from "@/components/jupiter/SiteFooter";
import { SectionHeading } from "@/components/jupiter/SectionHeading";
import { Steps } from "@/components/jupiter/Steps";
import { CopyScriptButton } from "@/components/jupiter/CopyScript";
import { mailtoWithScript } from "@/lib/script";
import {
  commissioners,
  commissionMeeting,
  stateSenators,
  stateReps,
  nmlegisUrl,
  bills,
  talkingPoints,
} from "@/data/upgrade";

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
          <div className="pj-container py-12 text-center">
            <h1 className="font-black text-white" style={{ fontSize: "clamp(32px,5vw,48px)", lineHeight: 1.1 }}>
              WHO TO CALL. WHAT TO SAY.
            </h1>
            <p className="mx-auto mt-4 max-w-[760px] text-gold" style={{ fontSize: 18, lineHeight: 1.5 }}>
              Five county commissioners hold the lease. None of the five conditions is in it yet. Your call is step three.
            </p>
            <div className="mx-auto mt-8 max-w-[1000px] text-left">
              <Steps dark compact highlight={3} />
            </div>
          </div>
        </section>

        {/* Step 3, all in one place: who, when, and what to say. */}
        <SectionHeading stamp="force" id="commission">CALL YOUR COUNTY COMMISSIONER</SectionHeading>
        <div className="pj-container pb-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            {/* Who and when */}
            <div className="min-w-0">
              <div className="w-full overflow-x-auto rounded bg-white shadow-sm">
                <table className="pj-table pj-table--stack">
                  <thead>
                    <tr>
                      <th>Commissioner</th>
                      <th>District</th>
                      <th>Call</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissioners.map((c) => (
                      <tr key={c.district}>
                        <th scope="row">
                          {c.name}
                          {c.role && <span style={{ fontWeight: 400, opacity: 0.85 }}> · {c.role}</span>}
                        </th>
                        <td data-label="District" style={{ whiteSpace: "nowrap" }}>{c.district}</td>
                        <td data-label="Call" style={{ whiteSpace: "nowrap" }}>
                          <a href={`tel:${c.phone.replace(/[^\d]/g, "")}`} className="font-bold underline" style={{ color: "#15768c" }}>
                            {c.phone}
                          </a>
                        </td>
                        <td data-label="Email">
                          <a href={mailtoWithScript(c.email)} className="inline-block rounded px-3 py-1.5 text-[14px] font-black uppercase tracking-wide text-white" style={{ backgroundColor: "#2e8b57" }} title={`Opens an email to ${c.email} with the script filled in`}>
                            Email, script included
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[13px]" style={{ color: "#6b6b6b" }}>
                The email button opens your mail app with the subject and the six points already written. Change anything you like before you send it.
              </p>
              <div className="mt-4 rounded p-4" style={{ backgroundColor: "#fff8e6", borderLeft: "5px solid #d99a00" }}>
                <div className="text-[13px] font-black uppercase tracking-wide" style={{ color: "#8a6200" }}>Or say it in person</div>
                <p className="mt-1" style={{ fontSize: 16, lineHeight: 1.55, color: "#3c3c3c" }}>{commissionMeeting}</p>
              </div>
            </div>

            {/* What to say */}
            <div className="min-w-0 rounded p-5 sm:p-6" style={{ backgroundColor: "#003047" }}>
              <div className="text-[13px] font-black uppercase tracking-wide" style={{ color: "#fdb715" }}>What to say · fits in two minutes</div>
              <h2 className="mt-1 font-black text-white" style={{ fontSize: 24, lineHeight: 1.15 }}>Your three minutes</h2>
              <p className="mt-2" style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.85)" }}>
                Public comment is three minutes. This fits in two. Fill in your name and town, then read it, paste it, or send it.
              </p>
              <ol className="mt-4 space-y-2.5 pl-5 text-white" style={{ fontSize: 16, lineHeight: 1.55, listStyle: "decimal" }}>
                {talkingPoints.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <CopyScriptButton dark />
                <a href="/petition" className="inline-flex min-h-[44px] items-center rounded px-5 text-[14px] font-black uppercase tracking-wide text-white" style={{ backgroundColor: "#2e8b57" }}>
                  Then sign the petition
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Steps 1 and 2 live here too, folded: the state legislators and the three bills. */}
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
                  <span>Why these three asks · the bills in one line each</span>
                  <span className="text-[13px] font-black uppercase" style={{ color: "#2e8b57" }}>open ▼</span>
                </summary>
                <div className="grid grid-cols-1 gap-4 px-5 pb-5 lg:grid-cols-3">
                  {bills.map((b) => (
                    <div key={b.name} className="flex flex-col rounded border-t-4 p-4" style={{ borderColor: "#2e8b57", backgroundColor: "#f7faf8" }}>
                      <h3 className="font-bold" style={{ fontSize: 18, color: "#003047" }}>{b.name}</h3>
                      <p className="mt-1" style={{ fontSize: 13, lineHeight: 1.5, color: "#6b6b6b" }}>{b.status}</p>
                      <p className="mt-3 font-semibold" style={{ fontSize: 16, lineHeight: 1.5, color: "#3c3c3c" }}>“{b.pitch}”</p>
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
                  <span className="text-[13px] font-black uppercase" style={{ color: "#2e8b57" }}>open ▼</span>
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
                              {m.name} <span className="font-normal" style={{ color: "#6b6b6b" }}>· {m.district}</span>
                            </div>
                            {"note" in m && m.note && <div style={{ fontSize: 14, color: "#2e8b57" }}>{m.note}</div>}
                          </li>
                        ))}
                      </ul>
                      <a href={group.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-[14px] font-bold underline" style={{ color: "#15768c" }}>
                        Office phones and emails: official {group.title} list ↗
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
