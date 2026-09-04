import { SectionHeading } from "./SectionHeading";
import { TheySay } from "./TheySay";
import { Tabs } from "./Tabs";
import { impactTabs as theirTabs } from "@/data/jupiter";
import { impactTabs } from "@/data/upgrade";

export function ImpactSection() {
  return (
    <section id="impact">
      <SectionHeading stamp="force">PROJECT JUPITER IMPACT</SectionHeading>
      <div className="pj-container pb-16">
        <Tabs panels={impactTabs} highlightLastColumn />
        <TheySay label="Their original impact tables">
          <Tabs panels={theirTabs} />
        </TheySay>
      </div>
    </section>
  );
}
