"use client";

import { SectionHeading } from "./SectionHeading";
import { useCopy } from "./AudienceText";

const cards = [
  { title: "Why capture works on fuel cells", body: "NMED's draft permit says the dried exhaust is about 95% CO₂. That is what makes capture practical here and not at a gas turbine.", href: "/science#components" },
  { title: "Why the water plant is real", body: "NMSU engineers designed and priced a 5-million-gallon-a-day brackish plant for Santa Teresa in 2023. El Paso has run one since 2007.", href: "/science#components" },
  { title: "Why heat can grow food", body: "Gothenburg heats a greenhouse with data-center heat today. Their dry coolers throw away about 2,400 MW, roughly 90,000 home furnaces' worth.", href: "/science#components" },
  { title: "What it costs and who pays", body: "Every upgrade line is shown as a share of the $165 billion bond, with the payer named.", href: "/blueprint#cost" },
];

export function ScienceTeaser() {
  const copy = useCopy();
  return (
    <section id="components" style={{ backgroundColor: "#fafafa" }}>
      <SectionHeading stamp="upgrade">THE SCIENCE</SectionHeading>
      <div className="pj-container pb-14">
        <p className="mx-auto mb-6 max-w-[860px] text-center" style={{ fontSize: 17, lineHeight: 1.6, color: "#3c3c3c" }}>
          {copy.scienceIntro}
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <a key={c.title} href={c.href} className="rounded bg-white p-5 shadow-sm hover:shadow-md" style={{ borderTop: "4px solid #2e8b57" }}>
              <h3 className="font-bold" style={{ fontSize: 18, color: "#003047" }}>{c.title}</h3>
              <p className="mt-2" style={{ fontSize: 16, lineHeight: 1.6, color: "#3c3c3c" }}>{c.body}</p>
              <span className="mt-2 inline-block text-[15px] font-bold underline" style={{ color: "#1f5f3a" }}>Read more →</span>
            </a>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a href="/science" className="inline-block rounded px-6 py-3 text-[14px] font-black uppercase tracking-wide text-white" style={{ backgroundColor: "#2e8b57" }}>
            Open the Science page
          </a>
        </div>
      </div>
    </section>
  );
}
