import Image from "next/image";

const thumbs = [
  "/images/bialik/thumb-1.png",
  "/images/bialik/thumb-2.png",
  "/images/bialik/thumb-3.png",
];

const socials = [
  { icon: "/images/bialik/fb-black.png", href: "https://www.facebook.com/mayimbialik", w: 20, h: 20 },
  { icon: "/images/bialik/ig-black.png", href: "https://www.instagram.com/missmayim/", w: 21, h: 21 },
  { icon: "/images/bialik/tw-black.png", href: "https://twitter.com/missmayim", w: 20, h: 20 },
  { icon: "/images/bialik/yt-black.png", href: "https://www.youtube.com/@bialikbreakdown", w: 24, h: 17 },
];

export function Newsletter() {
  return (
    <section className="bg-sage">
      <div className="bb-container py-[60px]">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Left — thumbnails + socials */}
          <div>
            <div className="flex gap-[10px]">
              {thumbs.map((t) => (
                <div key={t} className="relative h-[90px] w-[90px] overflow-hidden">
                  <Image src={t} alt="" fill sizes="90px" className="object-cover" />
                </div>
              ))}
            </div>
            <div className="mt-[18px] flex items-center gap-[18px]">
              {socials.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noreferrer">
                  <Image src={s.icon} alt="" width={s.w} height={s.h} className="h-auto" />
                </a>
              ))}
            </div>
          </div>

          {/* Right — heading + form */}
          <div>
            <h2 className="mb-[24px] font-[family-name:var(--font-circular)] text-[28px] font-[900] leading-[1.05] text-ink md:text-[32px]">
              Sign Up for Mayim&rsquo;s Newsletter
            </h2>
            <form className="grid grid-cols-1 gap-x-[16px] gap-y-[14px] sm:grid-cols-2">
              <div>
                <label className="bb-label">First Name</label>
                <input className="bb-input" type="text" name="first" />
              </div>
              <div>
                <label className="bb-label">Last Name</label>
                <input className="bb-input" type="text" name="last" />
              </div>
              <div className="sm:col-span-2">
                <label className="bb-label">Email Address</label>
                <input className="bb-input" type="email" name="email" />
              </div>
              <div>
                <label className="bb-label">Zip Code</label>
                <input className="bb-input" type="text" name="zip" />
              </div>
              <div className="flex items-end">
                <button type="submit" className="bb-btn-signup">
                  SIGN UP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
