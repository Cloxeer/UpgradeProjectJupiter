import { disclaimers as theirDisclaimers } from "@/data/jupiter";
import { disclaimers } from "@/data/upgrade";
import { TheySay } from "./TheySay";

export function DisclaimerSection() {
  return (
    <section style={{ backgroundColor: "#003047" }}>
      <div className="pj-container py-8">
        <div className="mx-auto max-w-[1000px] space-y-3">
          {disclaimers.map((d, i) => (
            <p key={i} style={{ fontSize: 13, lineHeight: 1.5, color: "rgba(255,255,255,0.7)" }}>
              {d}
            </p>
          ))}
          <TheySay dark label="Their original footnotes">
            {theirDisclaimers.map((d, i) => (
              <p key={i} className="mb-2" style={{ fontSize: 13, lineHeight: 1.5 }}>
                {d}
              </p>
            ))}
          </TheySay>
        </div>
      </div>
    </section>
  );
}
