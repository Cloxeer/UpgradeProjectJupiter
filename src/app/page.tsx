import { SiteHeader } from "@/components/jupiter/SiteHeader";
import { HeroSection } from "@/components/jupiter/HeroSection";
import { CompareSection } from "@/components/jupiter/CompareSection";
import { NetLossSection } from "@/components/jupiter/NetLossSection";
import { SupportSection } from "@/components/jupiter/SupportSection";
import { SpeedCostSection } from "@/components/jupiter/SpeedCostSection";
import { ScienceTeaser } from "@/components/jupiter/ScienceTeaser";
import { HelpImprove } from "@/components/jupiter/HelpImprove";
import { MoreForAudience } from "@/components/jupiter/MoreForAudience";
import { UpdatesSection } from "@/components/jupiter/UpdatesSection";
import { ResourcesSection } from "@/components/jupiter/ResourcesSection";
import { DisclaimerSection } from "@/components/jupiter/DisclaimerSection";
import { SiteFooter } from "@/components/jupiter/SiteFooter";

/**
 * Home: one sentence, one button, three numbers; then their number beside ours;
 * then the year pictures; then the five demands and the one thing to do. Everything else folds.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <CompareSection />
        <NetLossSection />
        <SupportSection />
        <MoreForAudience foldFor={["kid", "homeowner", "overall", "business", "legislator", "expert"]} label="how fast, how cheap, status, the science, resources">
          <SpeedCostSection />
          <UpdatesSection />
          <ScienceTeaser />
          <ResourcesSection />
        </MoreForAudience>
        <HelpImprove />
        <MoreForAudience foldFor={["kid", "homeowner", "overall", "business", "legislator", "expert"]} label="footnotes and disclaimers">
          <DisclaimerSection />
        </MoreForAudience>
      </main>
      <SiteFooter />
    </>
  );
}
