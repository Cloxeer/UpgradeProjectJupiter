"use client";

import { useAudience } from "./Audience";
import { Cite, SourceList } from "@/components/Cite";
import { openQuestions, parkedIdeas, openQuestionSources } from "@/data/openQuestions";

/**
 * Expert only. One closed fold: the questions this plan cannot yet answer, each with the physics or arithmetic
 * that is known and the measurement that would settle it, then the ideas parked with the reason.
 * Adds nothing to the page at rest but one line.
 */
export function OpenQuestions() {
  const [audience] = useAudience();
  if (audience !== "expert") return null;
  return (
    <section id="open-questions" style={{ backgroundColor: "#fafafa" }}>
      <div className="pj-container pb-12">
        <details className="mx-auto max-w-[1000px] rounded border bg-white px-4 py-3" style={{ borderColor: "#e0e0e0" }}>
          <summary className="cursor-pointer text-[15px] font-bold uppercase" style={{ color: "#15768c" }}>
            Open questions and parked ideas ({openQuestions.length} questions · {parkedIdeas.length} ideas)
          </summary>
          <p className="mt-3 text-[15px]" style={{ lineHeight: 1.6, color: "#3c3c3c" }}>
            A question lives here when serious thought and a real natural process are needed to answer it and no document on the Sources page does. Each one says what is known, shows the arithmetic where there is any, and names the measurement or decision that would settle it. Then the ideas that are not on the plan, and why.
          </p>
          <ol className="mt-4 space-y-4">
            {openQuestions.map((oq, i) => (
              <li key={oq.q} className="rounded p-3" style={{ backgroundColor: "#f7f7f7", borderLeft: "4px solid #003047" }}>
                <div className="font-black" style={{ fontSize: 16, lineHeight: 1.35, color: "#003047" }}>
                  {i + 1}. {oq.q}
                </div>
                <p className="mt-2 text-[14px]" style={{ lineHeight: 1.6, color: "#3c3c3c" }}>{oq.thought}</p>
                <p className="mt-2 text-[14px]" style={{ lineHeight: 1.6, color: "#1f5f3a" }}>
                  <strong>What would answer it:</strong> {oq.next}
                  <Cite ids={oq.sources} />
                </p>
              </li>
            ))}
          </ol>
          <h3 className="mt-6 text-[14px] font-black uppercase" style={{ color: "#6b6b6b" }}>Ideas not on the plan, and why</h3>
          <ul className="mt-2 space-y-2">
            {parkedIdeas.map((p) => (
              <li key={p.idea} className="flex gap-2 text-[14px]" style={{ lineHeight: 1.6, color: "#3c3c3c" }}>
                <span className="mt-0.5 flex-shrink-0 rounded px-1.5 text-[11px] font-black uppercase" style={{ backgroundColor: p.status === "candidate" ? "#eaf6ee" : "#f4f4f4", color: p.status === "candidate" ? "#1f5f3a" : "#6b6b6b", lineHeight: "18px" }}>
                  {p.status}
                </span>
                <span>
                  <strong style={{ color: "#003047" }}>{p.idea}</strong> {p.why}
                  <Cite ids={p.sources} />
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-[13px] font-bold uppercase" style={{ color: "#6b6b6b" }}>Documents behind this fold</div>
          <SourceList ids={openQuestionSources} />
        </details>
      </div>
    </section>
  );
}
