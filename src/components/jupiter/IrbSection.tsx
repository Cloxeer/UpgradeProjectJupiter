import { SectionHeading } from "./SectionHeading";
import { TheySay } from "./TheySay";
import { irbPoints as theirPoints } from "@/data/jupiter";
import { irbPoints, irbSubhead } from "@/data/upgrade";

function Points({ items }: { items: { label: string; text: string }[] }) {
  return (
    <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-6 md:grid-cols-2">
      {items.map((p) => (
        <div
          key={p.label}
          className="rounded border-l-4 bg-white p-5 shadow-sm"
          style={{ borderColor: "#219ebc" }}
        >
          <span className="font-bold" style={{ fontSize: 16, color: "#003047" }}>
            {p.label}{" "}
          </span>
          <span style={{ fontSize: 16, lineHeight: "23.1px", color: "#3c3c3c" }}>{p.text}</span>
        </div>
      ))}
    </div>
  );
}

export function IrbSection() {
  return (
    <section>
      <SectionHeading stamp="upgrade">INDUSTRIAL REVENUE BONDS (IRB)</SectionHeading>
      <div className="pj-container pb-16">
        <h3 className="mb-8 text-center font-bold" style={{ fontSize: 22, color: "#15768c" }}>
          {irbSubhead}
        </h3>
        <Points items={irbPoints} />
        <div className="mx-auto max-w-[1000px]">
          <TheySay>
            <h4 className="mb-6 text-center font-bold" style={{ fontSize: 18, color: "#15768c" }}>
              No Financial Risk to County
            </h4>
            <Points items={theirPoints} />
          </TheySay>
        </div>
      </div>
    </section>
  );
}
