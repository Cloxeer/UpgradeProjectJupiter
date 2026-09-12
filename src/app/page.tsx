import type { Metadata } from "next";
import Image from "next/image";
import { asset } from "@/lib/base";
import { SiteHeader } from "@/components/jupiter/SiteHeader";
import { SiteFooter } from "@/components/jupiter/SiteFooter";
import { BeatSection } from "@/components/story/BeatSection";
import { Guide, GuideMark } from "@/components/story/Guide";
import { DepthFork } from "@/components/jupiter/Depth";
import { MilestoneStrip } from "@/components/story/diagrams/MilestoneStrip";
import { SiteMap } from "@/components/story/diagrams/SiteMap";
import { GUIDE, hook, stakes, idea, years } from "@/data/story";
import { Photo } from "@/components/story/Photo";
import { stakePhotos } from "@/data/photos";

export const metadata: Metadata = {
  title: { absolute: "Force Upgrade Project Jupiter | A citizen plan for the Santa Teresa data center" },
  alternates: { canonical: "/" },
};

/**
 * The story. Four sections, one scroll, one exit: the hook (with the one choice inside it), what's at stake,
 * the idea, the years. The only button on the page is the last thing on it.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* 1. The hook: place and scale, then the one choice. */}
        <section id="hook" style={{ backgroundColor: "#0b1f2a" }}>
          <div className="relative">
            <Image src={asset("/images/jupiter/hero.jpg")} alt={hook.imageAlt} width={1600} height={900} priority sizes="100vw" className="h-[52vh] min-h-[360px] w-full object-cover md:h-[60vh]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,31,42,0.15) 0%, rgba(11,31,42,0.75) 100%)" }} aria-hidden />
            <div className="absolute inset-x-0 bottom-0">
              <div className="pj-container pb-10 md:pb-14">
                <h1 className="max-w-[22ch] font-black text-white" style={{ fontSize: "clamp(30px,5vw,54px)", lineHeight: 1.08, letterSpacing: "-0.01em" }}>
                  {hook.line}
                </h1>
              </div>
            </div>
          </div>
          <div className="pj-container py-10 md:py-14">
            <p className="max-w-[60ch] text-[20px] md:text-[22px]" style={{ lineHeight: 1.5, color: "rgba(255,255,255,0.92)" }}>
              {hook.sub}
            </p>
            <div className="mt-12 grid grid-cols-[44px_minmax(0,1fr)] gap-4">
              <GuideMark dark />
              <div>
                <p className="max-w-[60ch] text-[18px]" style={{ lineHeight: 1.6, color: "rgba(255,255,255,0.92)" }}>
                  <span className="sr-only">{GUIDE.name}: </span>
                  {GUIDE.intro}
                </p>
                <div className="mt-5 max-w-[720px]">
                  <DepthFork />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. What's at stake: what the filed plan does, in the permit's own numbers. No verdict. */}
        <BeatSection id="stakes" tone="paper">
          <div className="pj-container py-16 md:py-24">
            <h2 className="font-black" style={{ fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.15, color: "#003047" }}>
              {stakes.title}
            </h2>
            <div className="mt-8">
              <Guide t={stakes.line} />
            </div>
            <dl className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3">
              {stakes.tiles.map((t, i) => (
                <div key={t.value} className="flex flex-col gap-4">
                  <Photo id={stakePhotos[i]} />
                  <div style={{ borderTop: "3px solid #003047", paddingTop: 12 }}>
                    <dt className="text-[26px] font-black md:text-[30px]" style={{ color: "#003047", lineHeight: 1.1, fontVariantNumeric: "tabular-nums", textWrap: "balance" }}>{t.value}</dt>
                    <dd className="mt-2 text-[16px]" style={{ color: "#3c3c3c", lineHeight: 1.45 }}>{t.label}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </BeatSection>

        {/* 3. The idea: one sentence, then the four changes in one breath. The sentence is the image. */}
        <BeatSection id="idea" tone="light">
          <div className="pj-container py-24 md:py-32">
            <p className="mx-auto max-w-[18ch] text-center font-black" style={{ fontSize: "clamp(30px,5vw,56px)", lineHeight: 1.1, color: "#003047", letterSpacing: "-0.01em", textWrap: "balance" }}>
              {idea.headline}
            </p>
            <div className="mx-auto mt-12 max-w-[720px]">
              <Guide t={idea.line} size="lg" />
            </div>
            <ol className="mx-auto mt-12 grid max-w-[880px] grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4" aria-label="The four changes, in order of impact">
              {idea.marks.map((m) => (
                <li key={m} className="text-[17px] font-bold" style={{ color: "#1f5f3a", borderTop: "3px solid #2e8b57", paddingTop: 10 }}>
                  {m}
                </li>
              ))}
            </ol>
          </div>
        </BeatSection>

        {/* 4. The years: honest time, one scene to rest on, and the one exit. */}
        <BeatSection id="years" tone="navy">
          <div className="pj-container py-16 md:py-24">
            <h2 className="font-black text-white" style={{ fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.15 }}>
              {years.title}
            </h2>
            <div className="mt-8">
              <MilestoneStrip dark />
            </div>
            <div className="mt-12">
              <Guide t={years.line} dark />
            </div>
            <div className="mt-12 rounded bg-white p-3 md:p-4">
              <SiteMap />
            </div>
            <p className="mt-12 max-w-[62ch] text-[19px]" style={{ lineHeight: 1.6, color: "rgba(255,255,255,0.92)" }}>
              {years.closing}
            </p>
            <a href="/blueprint" className="pj-press mt-8 inline-flex min-h-[56px] items-center rounded px-7 text-[18px] font-black text-white" style={{ backgroundColor: "#2e8b57" }}>
              {years.button}
            </a>
          </div>
        </BeatSection>
      </main>
      <SiteFooter />
    </>
  );
}
