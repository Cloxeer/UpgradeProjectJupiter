import type { Metadata } from "next";
import { SiteHeader } from "@/components/jupiter/SiteHeader";
import { SiteFooter } from "@/components/jupiter/SiteFooter";
import { ImpactSection } from "@/components/jupiter/ImpactSection";
import { KeyComponentsSection } from "@/components/jupiter/KeyComponentsSection";
import { IrbSection } from "@/components/jupiter/IrbSection";
import { HelpImprove } from "@/components/jupiter/HelpImprove";
import { ScienceLevels } from "@/components/jupiter/ScienceLevels";
import { Stamp } from "@/components/jupiter/Stamp";
import { WhatItMeansSection } from "@/components/jupiter/WhatItMeansSection";

export const metadata: Metadata = {
  title: "The science behind the upgrade",
  description: "Why carbon capture works on Bloom fuel cells, why the NMSU desalination plant is real, how server heat grows food, and what each condition costs, with vendor data, operating plants and sources.",
  alternates: { canonical: "/science/" },
};

export default function SciencePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section style={{ backgroundColor: "#003047" }}>
          <div className="pj-container py-14 text-center">
            <h1 className="font-black text-white" style={{ fontSize: "clamp(36px,6vw,56px)", lineHeight: 1.05 }}>
              <Stamp kind="upgrade">THE SCIENCE</Stamp>
            </h1>
            <p className="mx-auto mt-5 max-w-[820px] text-gold" style={{ fontSize: 20, lineHeight: 1.4, fontWeight: 600 }}>
              Why each part of the upgrade works, what it costs, and what the documents say. Their original sections sit one click below ours.
            </p>
            <p className="mx-auto mt-4 max-w-[760px]" style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>
              For the drawings and sliders, see the <a href="/blueprint" className="underline text-gold">Blueprint</a>. For every document, see{" "}
              <a href="/sources" className="underline text-gold">Sources</a>.
            </p>
          </div>
        </section>
        <div style={{ backgroundColor: "#fafafa" }}>
          <ScienceLevels>
            <ImpactSection />
            <KeyComponentsSection />
            <IrbSection />
          </ScienceLevels>
        </div>
        <WhatItMeansSection />
        <HelpImprove />
      </main>
      <SiteFooter />
    </>
  );
}
