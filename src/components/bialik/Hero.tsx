import Image from "next/image";

export function Hero() {
  return (
    <div className="bb-container">
      <div className="grid grid-cols-1 items-center gap-4 pb-10 md:grid-cols-2">
        {/* Left — Mayim photo with brain-burst (single composite PNG) */}
        <div className="relative flex justify-center md:justify-start">
          <Image
            src="/images/bialik/mayim-blazer.png"
            alt="Mayim Bialik"
            width={622}
            height={677}
            priority
            className="h-auto w-[85%] max-w-[560px] md:w-full"
          />
        </div>

        {/* Right — copy + listen badges */}
        <div className="pb-6 md:pb-0">
          <h1 className="font-[family-name:var(--font-circular)] text-[42px] font-[900] leading-[0.9] text-ink md:text-[52px] md:leading-[0.83]">
            Welcome to my breakdown!
          </h1>

          <p className="mt-[30px] max-w-[520px] font-[family-name:var(--font-circular)] text-[18px] font-normal leading-[1.35] text-ink md:text-[20px] md:leading-[1.35]">
            Armed with a Phd in Neuroscience and plenty of personal experience,
            we&rsquo;re exploring health, well-being &amp; the science of
            spirituality.
          </p>
          <p className="mt-[22px] max-w-[520px] font-[family-name:var(--font-circular)] text-[18px] font-normal leading-[1.35] text-ink md:text-[20px]">
            Beyond What You Ever Thought Was Possible!
          </p>

          <div className="mt-[26px] flex flex-wrap items-center gap-[14px]">
            <a
              href="https://podcasts.apple.com/us/podcast/mayim-bialiks-breakdown/id1512615582"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/images/bialik/apple-podcasts.png"
                alt="Listen on Apple Podcasts"
                width={166}
                height={40}
                className="h-[40px] w-auto"
              />
            </a>
            <a
              href="https://open.spotify.com/show/1FEEjWQ4jVTvUyR7dPjhjM"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/images/bialik/spotify.png"
                alt="Listen on Spotify"
                width={161}
                height={40}
                className="h-[40px] w-auto"
              />
            </a>
          </div>

          <div className="mt-[22px]">
            <a
              href="https://www.youtube.com/@bialikbreakdown"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/images/bialik/youtube-watch.png"
                alt="Watch on YouTube"
                width={216}
                height={25}
                className="h-[25px] w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
