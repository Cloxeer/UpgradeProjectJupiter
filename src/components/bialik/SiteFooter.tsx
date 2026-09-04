import Image from "next/image";
import Link from "next/link";

const socials = [
  { icon: "/images/bialik/fb-white.png", href: "https://www.facebook.com/mayimbialik", w: 20, h: 20 },
  { icon: "/images/bialik/tw-white.png", href: "https://twitter.com/missmayim", w: 20, h: 20 },
  { icon: "/images/bialik/ig-white.png", href: "https://www.instagram.com/missmayim/", w: 21, h: 21 },
  { icon: "/images/bialik/yt-white.png", href: "https://www.youtube.com/@bialikbreakdown", w: 24, h: 17 },
];

export function SiteFooter() {
  return (
    <footer className="bg-green text-white">
      <div className="bb-container py-[44px]">
        <h2 className="mb-[30px] text-center font-[family-name:var(--font-circular)] text-[24px] font-[900] uppercase tracking-[0.5px] text-white md:text-[28px]">
          MBB is proud to be a part of
        </h2>

        <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:justify-between md:px-[100px]">
          <Image
            src="/images/bialik/impact-theory.png"
            alt="Impact Theory Network"
            width={2171}
            height={966}
            className="h-auto w-[260px] md:w-[305px]"
          />
          <a
            href="https://www.bialikbreakdown.com/contact"
            target="_blank"
            rel="noreferrer"
            className="transition-opacity hover:opacity-90"
          >
            <Image
              src="/images/bialik/partnership-btn.png"
              alt="Contact for Partnership"
              width={950}
              height={311}
              className="h-auto w-[260px] md:w-[305px]"
            />
          </a>
        </div>

        <div className="mt-[40px] flex flex-col-reverse items-center gap-6 border-t border-white/20 pt-[24px] md:flex-row md:justify-between">
          <p className="text-[14px] text-white/90">
            2025 © Mayim Bialik. All rights reserved.
          </p>
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
            <div className="flex items-center gap-[18px]">
              {socials.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noreferrer">
                  <Image src={s.icon} alt="" width={s.w} height={s.h} className="h-auto" />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-6 text-[14px]">
              <Link href="https://www.bialikbreakdown.com/terms-of-service" className="hover:opacity-80">
                Terms of Service
              </Link>
              <Link href="https://www.bialikbreakdown.com/privacy-policy" className="hover:opacity-80">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
