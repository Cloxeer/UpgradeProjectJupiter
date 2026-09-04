import { SiteChrome } from "@/components/site/SiteChrome";

/**
 * Page chrome. Content sits on the cream `.background` panel (inset 30px),
 * mirroring the original's `.main > .background` structure.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}

export function PageHeading({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="px-[15px] pb-4 pt-10 text-center font-[family-name:var(--font-fraunces)] text-[30px] font-normal text-ink md:text-[40px]">
      {children}
    </h1>
  );
}
