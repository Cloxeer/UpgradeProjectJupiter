export type StampKind = "upgrade" | "force";

const stampText: Record<StampKind, string> = {
  upgrade: "Upgrade",
  force: "Force Upgrade",
};

/**
 * Wraps text and overlays a rotated rubber-stamp reading UPGRADE or FORCE UPGRADE.
 * The original text stays visible underneath so nothing on the page is erased.
 */
export function Stamp({ kind, children }: { kind: StampKind; children: React.ReactNode }) {
  return (
    <span className="pj-stamp-wrap">
      {children}
      <span className={`pj-stamp pj-stamp--${kind}`} aria-label={stampText[kind]}>
        {stampText[kind]}
      </span>
    </span>
  );
}
