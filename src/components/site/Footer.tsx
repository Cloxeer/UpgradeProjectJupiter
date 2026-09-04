import Link from "next/link";
import { footerLinks, social } from "@/data/sophia";

export function Footer() {
  return (
    <footer>
      {/* Top block — #303030 */}
      <div className="bg-footer px-[30px] py-[60px] md:py-[30px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-[30px]">
          {/* Useful links */}
          <div>
            <FooterHeading>Useful links</FooterHeading>
            <ul>
              {footerLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="ss-foot-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <FooterHeading>Contact info</FooterHeading>
            <p className="ss-foot-text mb-4">{social.company}</p>
            <a href={`mailto:${social.email}`} className="ss-foot-link italic font-bold">
              {social.email}
            </a>
          </div>

          {/* Mailing list */}
          <div>
            <FooterHeading>Sign up to our mailing list</FooterHeading>
            <form className="flex items-center">
              <input
                type="email"
                required
                placeholder="Email"
                aria-label="Email"
                className="min-w-0 flex-1 border-0 bg-white px-[10px] pb-[5px] pt-[6px] font-[family-name:var(--font-fraunces)] text-[16px] font-light text-ink outline-none"
              />
              <button type="submit" className="ss-btn-join shrink-0">
                join
              </button>
            </form>
          </div>

          {/* Connect */}
          <div>
            <FooterHeading>Connect with us</FooterHeading>
            <div className="flex gap-4">
              <a
                href={social.facebook}
                aria-label="Facebook"
                className="text-mist transition-colors hover:text-rose"
              >
                <FacebookIcon />
              </a>
              <a
                href={social.instagram}
                aria-label="Instagram"
                className="text-mist transition-colors hover:text-rose"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — #262626 */}
      <div className="flex flex-col items-center justify-between gap-3 bg-footer-deep px-[30px] py-[15px] font-[family-name:var(--font-fraunces)] text-[15px] font-light text-stone md:flex-row">
        <p>© Copyright 2026, Sourdough Sophia. Powered by Shopify</p>
        <div className="flex items-center gap-2">
          <span>Currency</span>
          <select
            aria-label="Currency"
            defaultValue="GBP £"
            className="border border-white/20 bg-transparent px-2 py-1 text-stone outline-none [&>option]:text-ink"
          >
            <option>AUD $</option>
            <option>CAD $</option>
            <option>EUR €</option>
            <option>GBP £</option>
            <option>USD $</option>
          </select>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-[15px] font-[family-name:var(--font-fraunces)] text-[15px] font-light text-rose">
      {children}
    </h3>
  );
}

function FacebookIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H17V3.6c-.29-.04-1.28-.12-2.43-.12-2.4 0-4.07 1.47-4.07 4.17v2.24H7.8V13h2.7v8h3Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  );
}
