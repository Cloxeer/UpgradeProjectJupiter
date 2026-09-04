import Image from "next/image";
import Link from "next/link";
import { episodes } from "@/data/episodes";

export function LatestEpisodes() {
  return (
    <section className="bg-sage-light">
      <div className="bb-container pb-[60px] pt-[40px]">
        <h2 className="mb-[34px] text-center font-[family-name:var(--font-circular)] text-[28px] font-bold leading-[1.1] text-ink md:text-[32px]">
          Latest Episodes
        </h2>

        <div className="grid grid-cols-1 gap-x-[20px] gap-y-[40px] sm:grid-cols-2 md:grid-cols-3">
          {episodes.map((ep) => (
            <Link
              key={ep.title}
              href="https://www.bialikbreakdown.com/episodes"
              className="group block"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={ep.img}
                  alt={ep.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
                  className="object-cover"
                />
              </div>
              <p className="mt-[14px] text-[12px] font-bold uppercase tracking-[0.5px] text-grey">
                {ep.date}
              </p>
              <h3 className="mt-[6px] font-[family-name:var(--font-circular)] text-[22px] font-bold leading-[1.25] text-green transition-opacity group-hover:opacity-80 md:text-[24px] md:leading-[30px]">
                {ep.title}
              </h3>
            </Link>
          ))}
        </div>

        <div className="mt-[44px] text-center">
          <Link
            href="https://www.bialikbreakdown.com/episodes"
            className="inline-block font-[family-name:var(--font-circular)] text-[20px] font-[900] uppercase text-deep-green transition-opacity hover:opacity-75"
          >
            More Episodes
          </Link>
        </div>
      </div>
    </section>
  );
}
