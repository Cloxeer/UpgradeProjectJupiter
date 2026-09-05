import type { Metadata } from "next";
import { SiteHeader } from "@/components/jupiter/SiteHeader";
import { SiteFooter } from "@/components/jupiter/SiteFooter";
import { SectionHeading } from "@/components/jupiter/SectionHeading";
import { SourceList } from "@/components/Cite";
import { faq } from "@/data/faq";

/** A stable anchor per question, so an answer can be linked from anywhere: /faq#will-fuel-cells-eliminate-all-emissions */
function slug(q: string): string {
  return q
    .toLowerCase()
    .replace(/[’'"?,.:]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .split("-")
    .reduce((acc, w) => (acc.length + w.length + 1 <= 60 ? (acc ? `${acc}-${w}` : w) : acc), "");
}

/** Air and water first, then jobs, then money: the order a first-time reader asks in. */
const ordered = [...faq].sort((a, b) => rank(a.q) - rank(b.q));
function rank(q: string): number {
  const s = q.toLowerCase();
  if (/water|aquifer/.test(s)) return 0;
  if (/air|emission|environment|energy transition|fuel cell|microgrid|natural gas|materials/.test(s)) return 1;
  if (/job|worker|training|construction/.test(s)) return 2;
  return 3;
}

export const metadata: Metadata = {
  title: "FAQ | Force Upgrade Project Jupiter",
  description: "Every question on Project Jupiter Together's FAQ, their answer, and the sourced answer.",
};

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section style={{ backgroundColor: "#003047" }}>
          <div className="pj-container py-14 text-center">
            <h1 className="font-black text-white" style={{ fontSize: "clamp(32px,5vw,48px)", lineHeight: 1.1 }}>
              THEIR QUESTIONS, ANSWERED WITH SOURCES
            </h1>
            <p className="mx-auto mt-4 max-w-[800px] text-gold" style={{ fontSize: 18, lineHeight: 1.5 }}>
              Every question below is quoted from Project Jupiter Together&apos;s own FAQ page. Their answer is summarized first, then the
              answer the documents support. Water and air first, then jobs, then money.
            </p>
          </div>
        </section>
        <SectionHeading stamp="force">PROJECT JUPITER FAQ</SectionHeading>
        <div className="pj-container pb-16">
          <ol className="mx-auto max-w-[1000px] space-y-6">
            {ordered.map((item, i) => (
              <li key={item.q} id={slug(item.q)} className="scroll-mt-32 rounded bg-white p-6 shadow-sm" style={{ borderLeft: "6px solid #c0392b" }}>
                <div className="text-[13px] font-bold uppercase tracking-wide" style={{ color: "#6b6b6b" }}>
                  Question {i + 1} · quoted from their FAQ
                </div>
                <h2 className="mt-1 font-bold" style={{ fontSize: 20, color: "#003047" }}>
                  <a href={`#${slug(item.q)}`} className="hover:underline" title="Link to this question">
                    &ldquo;{item.q}&rdquo;
                  </a>
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded p-4" style={{ backgroundColor: "#fff8f6", border: "1px dashed #c0392b" }}>
                    <div className="text-[13px] font-bold uppercase" style={{ color: "#c0392b" }}>What they say</div>
                    <p className="mt-1" style={{ fontSize: 16, lineHeight: 1.6, color: "#3c3c3c" }}>{item.theirs}</p>
                    <a href="https://projectjupitertogether.com/faqs/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-[14px] font-bold underline" style={{ color: "#15768c" }}>
                      Read their full answer ↗
                    </a>
                  </div>
                  <div className="rounded p-4" style={{ backgroundColor: "#eaf6ee" }}>
                    <div className="text-[13px] font-bold uppercase" style={{ color: "#1f5f3a" }}>What the documents support</div>
                    <p className="mt-1" style={{ fontSize: 16, lineHeight: 1.6, color: "#1f5f3a" }}>{item.ours}</p>
                  </div>
                </div>
                <SourceList ids={item.sources} />
              </li>
            ))}
          </ol>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
