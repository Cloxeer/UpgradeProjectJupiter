import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell, PageHeading } from "@/components/site/SiteShell";

export const metadata: Metadata = {
  title: "Story | Sourdough Sophia",
  description:
    "Sourdough Sophia is truly a bakery born in the community — our story from a lockdown micro bakery to award-winning London bakeries.",
};

export default function StoryPage() {
  return (
    <SiteShell>
      <article className="pb-16">
        <PageHeading>Story</PageHeading>

        {/* HERO */}
        <section className="ss-container">
          <div className="relative w-full overflow-hidden rounded-md">
            <Image
              src="/images/sophia/featured.jpg"
              alt="Sourdough Sophia bakery"
              width={1200}
              height={650}
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="h-auto w-full object-cover"
            />
          </div>
          <p className="mx-auto mt-8 max-w-[820px] text-center font-[family-name:var(--font-fraunces)] text-[28px] leading-snug text-ink md:mt-10 md:text-[32px]">
            Sourdough Sophia is truly a bakery born in the community.
          </p>
        </section>

        {/* ORIGIN STORY */}
        <section className="ss-container py-10 md:py-16">
          <div className="ss-rte mx-auto max-w-[800px] text-center">
            <p>
              Our story began during lockdown, when founders Sophia and Jesse
              set up a micro bakery from the dining room of their home.
            </p>
            <p>
              Sophia was raised by a baker father in Germany and had always
              dreamed of opening her own bakery. What started at the kitchen
              table quickly captured the imagination of the local community —
              within weeks there were queues down the street.
            </p>
          </div>
        </section>

        {/* VALUES — full-bleed cream band */}
        <section className="bg-white py-14 md:py-20">
          <div className="ss-container">
            <div className="mx-auto max-w-[760px] text-center">
              <h2 className="font-[family-name:var(--font-fraunces)] text-[28px] font-normal text-ink md:text-[32px]">
                What we stand for
              </h2>
              <p className="mt-5 text-[19px] leading-relaxed text-ink md:text-[20px]">
                Sustainable quality ingredients, artisanal techniques, an
                innovative and ever-changing menu, and a homage to the
                comforting classics.
              </p>
            </div>
          </div>
        </section>

        {/* GROWTH — two-column image / text */}
        <section className="ss-container py-10 md:py-16">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="overflow-hidden rounded-md">
              <Image
                src="/images/sophia/card-careers.jpg"
                alt="Inside a Sourdough Sophia bakery"
                width={800}
                height={640}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ss-rte">
              <h2 className="font-[family-name:var(--font-fraunces)]">
                Growing
              </h2>
              <p>
                We opened our first bakery in 2020, just eight months after we
                started baking from home.
              </p>
              <p>
                In March 2024 we opened our second location in Islington,
                followed by two more bakeries in 2025 in Highgate and Hampstead.
              </p>
            </div>
          </div>
        </section>

        {/* AWARDS & MENTIONS */}
        <section className="ss-container py-10 md:py-16">
          <div className="mx-auto max-w-[800px] text-center">
            <h2 className="font-[family-name:var(--font-fraunces)] text-[28px] font-normal text-ink md:text-[32px]">
              Awards &amp; mentions
            </h2>
            <p className="mt-5 text-[19px] leading-relaxed text-ink md:text-[20px]">
              We&apos;ve been honoured with two World Bread Awards and three
              Great Taste Awards, and are proud to be among the UK high street
              shop finalists. Our story has been featured in Bloomberg, Timeout
              and BBC News.
            </p>
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
