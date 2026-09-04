import { SectionHeading } from "./SectionHeading";
import { TheySay } from "./TheySay";
import { Tabs } from "./Tabs";
import { keyComponentTabs as theirTabs } from "@/data/jupiter";
import { keyComponentTabs } from "@/data/upgrade";

export function KeyComponentsSection() {
  return (
    <section id="components">
      <SectionHeading stamp="upgrade">PROJECT JUPITER KEY COMPONENTS</SectionHeading>
      <div className="pj-container pb-16">
        <Tabs panels={keyComponentTabs} />
        <TheySay label="Their original key components">
          <Tabs panels={theirTabs} />
        </TheySay>
      </div>
    </section>
  );
}
