import { Stamp, type StampKind } from "./Stamp";

export function SectionHeading({
  children,
  dark = false,
  stamp,
  id,
}: {
  children: string;
  dark?: boolean;
  stamp?: StampKind;
  id?: string;
}) {
  return (
    <div className="pj-container scroll-mt-28 py-12" id={id}>
      <div
        className="pj-heading"
        style={
          dark
            ? ({ ["--_line" as string]: "#219ebc" } as React.CSSProperties)
            : undefined
        }
      >
        <h2 style={{ color: dark ? "#ffffff" : "#3c3c3c" }}>
          {stamp ? <Stamp kind={stamp}>{children}</Stamp> : children}
        </h2>
      </div>
    </div>
  );
}
