import type { Metadata } from "next";
import { SiteHeader } from "@/components/jupiter/SiteHeader";
import { SiteFooter } from "@/components/jupiter/SiteFooter";
import { SectionHeading } from "@/components/jupiter/SectionHeading";
import { Stamp } from "@/components/jupiter/Stamp";
import { TheySay } from "@/components/jupiter/TheySay";
import { SitePlan } from "@/components/blueprint/SitePlan";
import { HeatDiagram, CarbonDiagram, WaterDiagram, SolarDiagram, GreenhouseDiagram } from "@/components/blueprint/Diagrams";
import { YearTimeline } from "@/components/blueprint/YearTimeline";
import { costItems, costTotals, receipts, SOURCE_NOTE } from "@/data/blueprint";
import { HelpImprove } from "@/components/jupiter/HelpImprove";
import { pctOfBond } from "@/lib/units";
import { PlanModeProvider, PlanSwitch } from "@/components/blueprint/PlanMode";
import { Glossary } from "@/components/jupiter/Term";
import { JupiterStorm } from "@/components/jupiter/JupiterStorm";
import { AudienceChip } from "@/components/jupiter/Audience";
import { VoiceText, HideFor, OnlyFor } from "@/components/blueprint/Voice";

export const metadata: Metadata = {
  title: "Blueprint | Force Upgrade Project Jupiter",
  description: "An interactive, sourced blueprint for upgrading Project Jupiter on its own 819-acre site: site plan, five processes, costs, and timeline.",
};

function parseCost(v: string): number {
  const n = parseFloat(v.replace(/[^0-9.]/g, ""));
  return v.includes("B") ? n * 1000 : n;
}

const renderLabels = ["Secure Entrance", "Secure Exit", "Operations", "Warehouse", "Parking", "Guard Booth", "Security Fence", "Transformer Yard", "Modular Chiller Plants — Closed Loop System", "Dry Coolers"];

const processes = [
  { id: "p1", Comp: HeatDiagram },
  { id: "p2", Comp: CarbonDiagram },
  { id: "p3", Comp: WaterDiagram },
  { id: "p4", Comp: SolarDiagram },
  { id: "p5", Comp: GreenhouseDiagram },
];

export default function BlueprintPage() {
  return (
    <>
      <SiteHeader />
      <PlanModeProvider>
      <main>
        {/* A different page, at a glance: graph paper, navy type, one control. */}
        <section style={{ backgroundColor: "#f6f9fb", backgroundImage: "repeating-linear-gradient(0deg, rgba(0,48,71,0.08) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(0,48,71,0.08) 0 1px, transparent 1px 24px)" }}>
          <div className="pj-container py-10 text-center">
            <p className="mb-2 text-[13px] font-black uppercase tracking-wide" style={{ color: "#2e8b57" }}>The blueprint · tap any building</p>
            <h1 className="font-black" style={{ fontSize: "clamp(36px,6vw,56px)", lineHeight: 1.05, color: "#003047" }}>
              <Stamp kind="force">PROJECT JUPITER</Stamp> BLUEPRINT
            </h1>
            <p className="mx-auto mt-4 max-w-[760px] font-semibold" style={{ fontSize: "clamp(17px,2vw,21px)", lineHeight: 1.4, color: "#003047" }}>
              <VoiceText field="heroSub" />
            </p>
            <div className="mt-6 flex flex-col items-center gap-4">
              <PlanSwitch labelTheirs="Their plan, as filed" labelOurs="The upgraded plan" big hint scrollTo="#site" />
              <AudienceChip />
            </div>
          </div>
        </section>

        <JupiterStorm />

        {/* Site plan */}
        <SectionHeading stamp="force" id="site">THE SITE, THEIRS AND UPGRADED</SectionHeading>
        <div className="pj-container pb-16">
          <HideFor audiences={["kid"]}>
          <p className="mx-auto mb-2 max-w-[900px] text-center" style={{ fontSize: 15, lineHeight: 1.6, color: "#6b6b6b" }}>
            {SOURCE_NOTE}
          </p>
          </HideFor>
          <p className="mx-auto mb-6 max-w-[900px] text-center font-semibold" style={{ fontSize: 15, lineHeight: 1.6, color: "#c0392b" }}>
            This layout is the closest approximation we could draw from the one photo the developers have published. It is a mock-up, not a survey.
          </p>
          <OnlyFor audiences={["kid"]}>
            <p className="mx-auto mb-6 max-w-[900px] text-center font-bold" style={{ fontSize: 19, lineHeight: 1.5, color: "#1f5f3a" }}>
              This is a map of the computer place from above. Tap a building to see what it is. Green is what we want to add.
            </p>
          </OnlyFor>
          <SitePlan />
          <HideFor audiences={["kid"]}>
          <TheySay label="What their Aug. 27, 2026 labeled render actually shows">
            <p className="mb-3">Their render carries exactly these labels, and nothing else:</p>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2" style={{ listStyle: "disc", paddingLeft: 20 }}>
              {renderLabels.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <p className="mt-4">
              Not labeled anywhere: the 2,462 MW fuel-cell plant, which NMED places about 3.6 miles south of Santa Teresa, the gas line feeding it, or
              the property line. The signed agreement describes about 819 acres with a 400-acre first phase; the render shows that phase.
            </p>
            <p className="mt-2">
              <a href="https://projectjupitertogether.com/wp-content/uploads/2026/08/Project-Jupiter-Site-Render_Labeled-8.27.26-Website.jpg" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#15768c" }}>
                Open their labeled render
              </a>
            </p>
          </TheySay>
          </HideFor>
        </div>

        {/* Processes: one full-width section each */}
        <div style={{ backgroundColor: "#fafafa" }}>
          <SectionHeading stamp="upgrade" id="processes">THE PROCESSES</SectionHeading>
          <div className="pj-container pb-6">
            <HideFor audiences={["kid"]}>
            <p className="mx-auto mb-4 max-w-[860px] text-center" style={{ fontSize: 17, lineHeight: 1.6, color: "#3c3c3c" }}>
              Five things happen on this campus that their site does not explain. Each one below is a real machine with real limits. The sliders
              show the limits too. A plan that leaves them out is a plan that gets thrown out.
            </p>
            </HideFor>
            <OnlyFor audiences={["kid"]}>
              <p className="mx-auto mb-4 max-w-[860px] text-center font-bold" style={{ fontSize: 19, lineHeight: 1.5, color: "#1f5f3a" }}>
                Five things happen here: heat, gas, water, power and food. Each drawing moves. Slide the sliders and tap the parts.
              </p>
            </OnlyFor>
            <div className="mb-4">
              <HideFor audiences={["kid", "homeowner"]}>
              <Glossary keys={["MW", "MGD", "tpy", "ppb", "ugm3", "CO2e", "captureEfficiency", "brackish", "PSD", "TitleV", "nonattainment", "acreFoot", "IRB", "CBA"]} />
              </HideFor>
            </div>
            <nav aria-label="Processes" className="mb-4 flex flex-wrap justify-center gap-2 text-[14px] font-bold uppercase">
              {["1 · Heat", "2 · Carbon", "3 · Water", "4 · Retire the gas", "5 · Food & jobs"].map((t, i) => (
                <a key={t} href={`#p${i + 1}`} className="inline-flex items-center rounded border px-3 py-1.5" style={{ borderColor: "#003047", color: "#003047", backgroundColor: "#fff" }}>
                  {t}
                </a>
              ))}
            </nav>
          </div>
          {processes.map(({ id, Comp }, i) => (
            <section key={id} id={id} className="scroll-mt-32" style={{ backgroundColor: i % 2 ? "#ffffff" : "#fafafa" }}>
              <div className="pj-container py-8">
                <Comp />
              </div>
            </section>
          ))}
        </div>

        {/* Cost */}
        <SectionHeading stamp="force" id="cost">WHAT IT COSTS AND WHO PAYS</SectionHeading>
        <div className="pj-container pb-16">
          <p className="mx-auto mb-6 max-w-[900px] text-center font-semibold" style={{ fontSize: 18, lineHeight: 1.55, color: "#003047" }}>
            <VoiceText field="cost" />
          </p>
          <HideFor audiences={["kid"]}>
          <div className="w-full overflow-x-auto">
            <table className="pj-table pj-table--compare pj-table--stack">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Cost</th>
                  <th>% of $165B</th>
                  <th>Who pays</th>
                  <th>Basis</th>
                </tr>
              </thead>
              <tbody>
                {costItems.map((c) => (
                  <tr key={c.item}>
                    <th scope="row">{c.item}</th>
                    <td data-label="Cost" className="pj-cell-ours" style={{ whiteSpace: "nowrap" }}>{c.cost}</td>
                    <td data-label="% of $165B" style={{ whiteSpace: "nowrap", fontWeight: 700, color: "#c0392b" }}>{pctOfBond(parseCost(c.cost))}</td>
                    <td data-label="Who pays">{c.who}</td>
                    <td data-label="Basis" style={{ fontSize: 15 }}>{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </HideFor>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: "Developer's share", value: costTotals.developer, sub: "against a $165B bond request", color: "#c0392b" },
              { label: "Growers' share", value: costTotals.growers, sub: "private, off the developer's books", color: "#2e8b57" },
              { label: "Added to the project", value: costTotals.pctOfBond, sub: "for capture, water, food, and 1,500 more jobs", color: "#003047" },
            ].map((s) => (
              <div key={s.label} className="rounded bg-white p-5 text-center shadow-sm">
                <div className="text-[13px] font-bold uppercase tracking-wide" style={{ color: "#6b6b6b" }}>{s.label}</div>
                <div className="font-black" style={{ fontSize: 34, color: s.color }}>{s.value}</div>
                <div className="text-[15px]" style={{ color: "#3c3c3c" }}>{s.sub}</div>
              </div>
            ))}
          </div>
          <HideFor audiences={["kid"]}>
          <TheySay label="What they are spending on the community today">
            <p>
              $50 million for water system improvements (80% funded), about $360 million in payments in lieu of taxes over 30 years, and $6.9 million
              for workforce and community programs. Total: roughly $417 million, or about 0.25% of the $165 billion bond.
            </p>
          </TheySay>
          </HideFor>
        </div>

        {/* Timeline, year by year */}
        <div style={{ backgroundColor: "#003047" }}>
          <div className="pj-container py-12" id="timeline">
            <div className="pj-heading mb-6">
              <h2 style={{ color: "#ffffff" }}>THE TIMELINE, YEAR BY YEAR</h2>
            </div>
            <YearTimeline />
            <div className="mx-auto max-w-[900px]">
              <HideFor audiences={["kid"]}>
              <TheySay dark label="Their timeline">
                <p>
                  Development 100%, construction 30%, delivery 0% as of July 2026. Power online targeted within 18 to 24 months of permits. The air
                  permit is currently stayed by the New Mexico Supreme Court and the pipeline route has been denied twice by the State Land Office.
                </p>
              </TheySay>
              </HideFor>
            </div>
          </div>
        </div>

        {/* Receipts */}
        <HideFor audiences={["kid"]}>
        <SectionHeading stamp="upgrade" id="receipts">THE RECEIPTS</SectionHeading>
        <div className="pj-container pb-16">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {receipts.map((r) => (
              <div key={r.claim} className="rounded border-l-4 bg-white p-5 shadow-sm" style={{ borderColor: "#219ebc" }}>
                <div className="font-bold" style={{ fontSize: 17, color: "#003047" }}>{r.claim}</div>
                <p className="mt-2" style={{ fontSize: 16, lineHeight: 1.6, color: "#3c3c3c" }}>{r.proof}</p>
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-[15px] font-bold underline" style={{ color: "#15768c" }}>
                  {r.label} ↗
                </a>
              </div>
            ))}
          </div>
        </div>
        </HideFor>
        <HelpImprove dark />
      </main>
      </PlanModeProvider>
      <SiteFooter />
    </>
  );
}
