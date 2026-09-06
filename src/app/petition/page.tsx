import type { Metadata } from "next";
import { SiteHeader } from "@/components/jupiter/SiteHeader";
import { SiteFooter } from "@/components/jupiter/SiteFooter";
import { Stamp } from "@/components/jupiter/Stamp";
import { petitionText, petitionDemands } from "@/data/upgrade";
import { PetitionForm } from "./PetitionForm";

export const metadata: Metadata = {
  title: "Petition | Force Upgrade Project Jupiter",
  description: "Add your name: do not cancel Project Jupiter, force its upgrade before the first fuel cell turns on.",
};

export default function PetitionPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section style={{ backgroundColor: "#003047" }}>
          <div className="pj-container py-12 text-center">
            <h1 className="font-black text-white" style={{ fontSize: "clamp(36px,6vw,56px)", lineHeight: 1.05 }}>
              <Stamp kind="force">PROJECT JUPITER</Stamp>
            </h1>
            <p className="mx-auto mt-5 max-w-[760px] text-gold" style={{ fontSize: 20, lineHeight: 1.4, fontWeight: 600 }}>
              Do not cancel it. Force the upgrade. Five conditions, one signature.
            </p>
          </div>
        </section>

        {/* The signature first. The full text follows for anyone who wants to read before signing. */}
        <section>
          <div className="pj-container py-10">
            <PetitionForm />

            <div className="mx-auto mt-10 max-w-[820px]">
              <details className="rounded bg-white p-5 shadow-sm sm:p-6" open>
                <summary className="cursor-pointer text-[13px] font-black uppercase tracking-wide" style={{ color: "#2e8b57" }}>
                  The petition text, word for word · tap to fold
                </summary>
                <div className="mt-3" style={{ fontSize: 17, lineHeight: 1.65, color: "#3c3c3c" }}>
                  {petitionText.map((p, i) => (
                    <p key={i} className={i === 0 ? "font-bold" : "mt-4"}>
                      {p}
                    </p>
                  ))}
                  <ol className="mt-5 space-y-4">
                    {petitionDemands.map((d, i) => (
                      <li key={d.ask} className="rounded p-4" style={{ backgroundColor: "#f7faf8", borderLeft: "5px solid #2e8b57" }}>
                        <div className="flex gap-3">
                          <span className="font-black" style={{ fontSize: 22, lineHeight: 1.2, color: "#2e8b57" }}>{i + 1}</span>
                          <div>
                            <p className="font-bold" style={{ fontSize: 17, lineHeight: 1.5, color: "#003047" }}>{d.ask}</p>
                            <p className="mt-2" style={{ fontSize: 15, lineHeight: 1.55, color: "#8e3b2f" }}>
                              <strong>Their plan today:</strong> {d.theirs}
                            </p>
                            <p className="mt-1" style={{ fontSize: 15, lineHeight: 1.55, color: "#3c3c3c" }}>
                              <strong>Why it matters:</strong> {d.why}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-5">
                    Same land. Same timeline. About 1.5% more money. Clean air, new water, local food, and about 3,000 permanent jobs instead of the
                    750 they signed for. Their own plan, finished properly.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
