import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell, PageHeading } from "@/components/site/SiteShell";

export const metadata: Metadata = {
  title: "Join us | Sourdough Sophia",
  description:
    "Join the Sourdough Sophia team. We reward every individual on their merits, with fair pay and a supportive, positive environment where you can grow.",
};

function Testimonial({ quote, author }: { quote: string; author: string }) {
  return (
    <figure className="mx-auto max-w-[820px] rounded-md bg-white px-6 py-8 md:px-10 md:py-10">
      <blockquote className="font-[family-name:var(--font-fraunces)] text-[22px] italic leading-snug text-ink md:text-[26px]">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 text-[16px] font-medium not-italic text-rose">
        — {author}
      </figcaption>
    </figure>
  );
}

export default function CareersPage() {
  return (
    <SiteShell>
      <article className="pb-16">
        <PageHeading>Join us.</PageHeading>

        {/* TESTIMONIAL 1 */}
        <section className="ss-container py-10 md:py-14">
          <Testimonial
            quote="Working for Sourdough Sophia is being part of a family. I love my colleagues, as well as Sophia and Jesse, who immediately believed in me and gave me the chance to grow."
            author="Simone"
          />
        </section>

        {/* OUR PRIORITY IS PEOPLE */}
        <section className="ss-container py-10 md:py-14">
          <div className="mx-auto max-w-[820px]">
            <h2 className="text-center font-[family-name:var(--font-fraunces)] text-[28px] font-normal text-ink md:text-[32px]">
              Our priority is people
            </h2>
            <div className="ss-rte mt-6 text-center">
              <p>
                Everyone in our team is valued, supported, loved and their
                progress is nurtured.
              </p>
              <p>
                Working in hospitality is always going to be hard, but it
                shouldn&apos;t be unfair. We believe that hard work done the
                right way can be the most rewarding experience for you.
              </p>
              <p>
                We reward every individual based on their merits, making the
                experience fair for everyone whilst enabling everyone to reach
                their true potential.
              </p>
              <p>
                We are set to do things differently. Fair pay and a supportive
                and positive working environment in which we strive for
                greatness, but where you can feel safe to take risks, make
                mistakes and learn along the journey.
              </p>
              <p>
                Sounds intriguing?{" "}
                <a
                  href="mailto:hr@sourdoughsophia.co.uk"
                  className="text-rose underline"
                >
                  Get in touch
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* CURRENTLY HIRING */}
        <section className="ss-container py-10 md:py-14">
          <div className="mx-auto max-w-[820px]">
            <h2 className="text-center font-[family-name:var(--font-fraunces)] text-[28px] font-normal text-ink md:text-[32px]">
              We&apos;re currently hiring the following roles:
            </h2>
            <div className="ss-rte mt-6 text-center">
              <ul className="inline-block text-left">
                <li>In-Store Baker</li>
                <li>Team Leader</li>
              </ul>
              <p>
                Get in touch —{" "}
                <a
                  href="mailto:hr@sourdoughsophia.co.uk"
                  className="text-rose underline"
                >
                  hr@sourdoughsophia.co.uk
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* WHY WORK FOR US — two-column with photo */}
        <section className="ss-container py-10 md:py-14">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="overflow-hidden rounded-md">
              <Image
                src="/images/sophia/card-careers.jpg"
                alt="Working at a Sourdough Sophia bakery"
                width={800}
                height={640}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ss-rte">
              <h2 className="font-[family-name:var(--font-fraunces)]">
                Why work for us?
              </h2>
              <p>
                We are set to expand over the coming years and we are looking for
                incredible talent to help us achieve our ambitious goals!
              </p>
              <p className="font-semibold">Join our team, and you will:</p>
              <ul>
                <li>
                  Be part of an incredibly close-knit team with a detailed
                  understanding of baking, cooking, hospitality and coffee.
                </li>
                <li>
                  Have excellent opportunities for career progression in a
                  company with big goals.
                </li>
                <li>Be given paid training opportunities.</li>
                <li>
                  Enjoy staff perks, including staff massage, free lunch, free
                  coffee, pastries and bread every day, access to specialist
                  third-party staff wellbeing services and more.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* TESTIMONIAL 2 */}
        <section className="ss-container py-10 md:py-14">
          <Testimonial
            quote="I love working at Sourdough Sophia because it's inspiring to see hard work and passion turn into a thriving business. I believe in eating well, sustainably sourced food and ethical practices which is the standard at Sourdough Sophia. Pastries are my favourite food in the world so being able to try delicious food made by my colleagues is a pleasure!"
            author="Alfie"
          />
        </section>

        {/* CLOSING */}
        <section className="ss-container py-10 md:py-14">
          <div className="mx-auto max-w-[820px]">
            <h2 className="text-center font-[family-name:var(--font-fraunces)] text-[28px] font-normal text-ink md:text-[32px]">
              We&apos;re always keen to hear from you if you&apos;d like to come
              onboard.
            </h2>
            <div className="ss-rte mt-6 text-center">
              <p>
                Please send your CV and covering letter explaining what job you
                would like to apply for and why you would like to work with us.
                Send your application to{" "}
                <a
                  href="mailto:hr@sourdoughsophia.co.uk"
                  className="text-rose underline"
                >
                  hr@sourdoughsophia.co.uk
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
