import Image from "next/image";
import { photos, type PhotoId } from "@/data/photos";

/** A real photograph in a fixed frame, with its caption and the credit its license requires. */
export function Photo({ id, ratio = "3 / 2", priority = false, dark = false }: { id: PhotoId; ratio?: string; priority?: boolean; dark?: boolean }) {
  const p = photos[id];
  return (
    <figure className="m-0">
      <div className="relative w-full overflow-hidden rounded" style={{ aspectRatio: ratio, backgroundColor: "#dfe3e5" }}>
        <Image src={p.src} alt={p.alt} fill sizes="(max-width: 768px) 100vw, 50vw" priority={priority} className="object-cover" />
      </div>
      <figcaption className="mt-2 text-[14px]" style={{ lineHeight: 1.45, color: dark ? "rgba(255,255,255,0.8)" : "#5d6a70" }}>
        {p.caption}{" "}
        <a href={p.href} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: dark ? "rgba(255,255,255,0.7)" : "#6b6b6b" }}>
          {p.credit}
        </a>
      </figcaption>
    </figure>
  );
}

/** A pair of photographs side by side, stacked on phones. */
export function PhotoPair({ ids }: { ids: PhotoId[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {ids.map((id) => (
        <Photo key={id} id={id} />
      ))}
    </div>
  );
}
