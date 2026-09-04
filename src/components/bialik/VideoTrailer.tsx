"use client";

import Image from "next/image";
import { useState } from "react";

export function VideoTrailer() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-sage-light">
      <div className="relative mx-auto aspect-video w-full max-w-[1440px]">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/nDMgYdLiol4?rel=0&controls=1&autoplay=1"
            title="Mayim Bialik's Breakdown Official Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label="Play trailer"
          >
            <Image
              src="/images/bialik/brain-burst.png"
              alt="Mayim Bialik's Breakdown Official Trailer"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <span className="absolute left-4 top-3 max-w-[70%] text-left text-[13px] font-bold text-white drop-shadow md:text-[15px]">
              Mayim Bialik&rsquo;s Breakdown Official Trailer || Mayim Bialik
            </span>
            <span className="absolute left-1/2 top-1/2 flex h-[46px] w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[12px] bg-[#f00] transition-colors group-hover:bg-[#c00]">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
