import { SiteHeader } from "@/components/jupiter/SiteHeader";
import { HeroSection } from "@/components/jupiter/HeroSection";
import { CtaBar } from "@/components/jupiter/CtaBar";
import { WhatIsSection } from "@/components/jupiter/WhatIsSection";
import { HighlightsSection } from "@/components/jupiter/HighlightsSection";
import { SpeedCostSection } from "@/components/jupiter/SpeedCostSection";
import { NetLossSection } from "@/components/jupiter/NetLossSection";
import { WhoAreYou } from "@/components/jupiter/WhoAreYou";
import { ScienceTeaser } from "@/components/jupiter/ScienceTeaser";
import { HelpImprove } from "@/components/jupiter/HelpImprove";
import { MoreForAudience } from "@/components/jupiter/MoreForAudience";
import { UpdatesSection } from "@/components/jupiter/UpdatesSection";
import { ResourcesSection } from "@/components/jupiter/ResourcesSection";
import { SupportSection } from "@/components/jupiter/SupportSection";
import { DisclaimerSection } from "@/components/jupiter/DisclaimerSection";
import { SiteFooter } from "@/components/jupiter/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <CtaBar />
        <WhoAreYou />
        <WhatIsSection />
        <HighlightsSection />
        <NetLossSection />
        <SupportSection />
        <MoreForAudience foldFor={["kid", "homeowner", "overall", "business", "legislator"]} label="how fast, how cheap, status, the science, resources">
          <SpeedCostSection />
          <UpdatesSection />
          <ScienceTeaser />
          <ResourcesSection />
        </MoreForAudience>
        <HelpImprove />
        <MoreForAudience foldFor={["kid", "homeowner", "overall", "business", "legislator"]} label="footnotes and disclaimers">
          <DisclaimerSection />
        </MoreForAudience>
      </main>
      <SiteFooter />
    </>
  );
}
