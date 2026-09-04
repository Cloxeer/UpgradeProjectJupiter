import type { Metadata } from "next";
import { SiteHeader } from "@/components/jupiter/SiteHeader";
import { SiteFooter } from "@/components/jupiter/SiteFooter";
import { SectionHeading } from "@/components/jupiter/SectionHeading";
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
  title: "Legislators | Force Upgrade Project Jupiter",
  description: "Who decides Project Jupiter's permits and bonds, how to reach them, and what to say.",
};

export default function LegislatorsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section style={{ backgroundColor: "#003047" }}>
          <div className="pj-container py-14 text-center">
            <h1 className="font-black text-white" style={{ fontSize: "clamp(32px,5vw,48px)", lineHeight: 1.1 }}>
              WHO TO CALL. WHAT TO SAY.
            </h1>
            <p className="mx-auto mt-4 max-w-[760px] text-gold" style={{ fontSize: 18, lineHeight: 1.5 }}>
              Five county commissioners approved the $165 billion in bonds. Eleven state legislators
              represent Doña Ana County. The upgrade happens when they attach conditions.
            </p>
          </div>
        </section>

        <SectionHeading stamp="force">DOÑA ANA COUNTY COMMISSION</SectionHeading>
        <div className="pj-container pb-12">
          <div className="w-full overflow-x-auto">
            <table className="pj-table">
              <thead>
                <tr>
                  <th>District</th>
                  <th>Commissioner</th>
                  <th>Phone</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {commissioners.map((c) => (
                  <tr key={c.district}>
                    <td>{c.district}</td>
                    <td>
                      <strong>{c.name}</strong>
                      {c.role && <span style={{ color: "#6b6b6b" }}> · {c.role}</span>}
                    </td>
                    <td>
                      <a href={`tel:${c.phone.replace(/[^\d]/g, "")}`} className="underline">
                        {c.phone}
                      </a>
                    </td>
                    <td>
                      <a href={`mailto:${c.email}`} className="underline">
                        {c.email}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-6 max-w-[900px] text-center" style={{ fontSize: 16, lineHeight: 1.6 }}>
            {commissionMeeting}
          </p>
        </div>

        <div style={{ backgroundColor: "#fafafa" }}>
          <SectionHeading stamp="upgrade">NEW MEXICO LEGISLATURE</SectionHeading>
          <div className="pj-container pb-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {[
                { title: "State Senate", items: stateSenators },
                { title: "State House", items: stateReps },
              ].map((group) => (
                <div key={group.title} className="rounded bg-white p-6 shadow-sm">
                  <h3 className="mb-4 font-bold" style={{ fontSize: 20, color: "#003047" }}>
                    {group.title}
                  </h3>
                  <ul className="space-y-3">
                    {group.items.map((m) => (
                      <li key={m.district} className="border-b border-line pb-3 last:border-0">
                        <div className="font-bold" style={{ fontSize: 16 }}>
                          {m.name} <span className="font-normal" style={{ color: "#6b6b6b" }}>· {m.district}</span>
                        </div>
                        {"note" in m && m.note && (
                          <div style={{ fontSize: 15, color: "#2e8b57" }}>{m.note}</div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center" style={{ fontSize: 16 }}>
              Office phone numbers and email addresses for every legislator are on the{" "}
              <a href={nmlegisUrl} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#15768c" }}>
                official New Mexico Legislature member list
              </a>
              .
            </p>
          </div>
        </div>

        <SectionHeading stamp="force" id="bills">THE THREE BILLS</SectionHeading>
        <div className="pj-container pb-12">
          <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 lg:grid-cols-3">
            {bills.map((b) => (
              <div key={b.name} className="flex flex-col rounded border-t-4 bg-white p-6 shadow-sm" style={{ borderColor: "#c0392b" }}>
                <h3 className="font-bold" style={{ fontSize: 20, color: "#003047" }}>{b.name}</h3>
                <p className="mt-2" style={{ fontSize: 14, lineHeight: 1.5, color: "#6b6b6b" }}>{b.status}</p>
                <p className="mt-4 font-semibold" style={{ fontSize: 17, lineHeight: 1.5, color: "#3c3c3c" }}>
                  “{b.pitch}”
                </p>
                <p className="mt-4" style={{ fontSize: 16, lineHeight: 1.6, color: "#3c3c3c" }}>
                  <strong>The ask:</strong> {b.ask}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: "#003047" }}>
          <div className="pj-container py-12">
            <div className="pj-heading mb-8">
              <h2 style={{ color: "#ffffff" }}>YOUR THREE MINUTES</h2>
            </div>
            <p className="mx-auto mb-6 max-w-[800px] text-center" style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>
              Public comment at the county commission is three minutes. This fits in two. Swap in your
              own name and school or job.
            </p>
            <ol className="mx-auto max-w-[800px] space-y-3 pl-6 text-white" style={{ fontSize: 17, lineHeight: 1.6, listStyle: "decimal" }}>
              {talkingPoints.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ol>
            <div className="mt-10 text-center">
              <a
                href="/petition"
                className="inline-block rounded px-8 py-3 font-bold uppercase text-white"
                style={{ backgroundColor: "#c0392b", fontSize: 16, letterSpacing: 1 }}
              >
                Then sign the petition
              </a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
