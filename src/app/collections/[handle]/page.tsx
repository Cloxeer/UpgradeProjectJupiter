import Link from "next/link";
import { SiteShell, PageHeading } from "@/components/site/SiteShell";
import { collections } from "@/data/sophia";

export function generateStaticParams() {
  return collections.map((c) => ({ handle: c.handle }));
}

function titleForHandle(handle: string): string {
  const known = collections.find((c) => c.handle === handle);
  if (known) return known.title;
  return handle
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const title = titleForHandle(handle);

  return (
    <SiteShell>
      <PageHeading>{title}</PageHeading>
      <div className="ss-container py-16 md:py-24 text-center">
        <p className="mx-auto max-w-[560px] font-[family-name:var(--font-cabin)] text-[18px] text-ink">
          Sorry, there are currently no products available at this collection.
        </p>
        <Link
          href="/"
          className="ss-btn-solid mt-8"
        >
          Continue shopping
        </Link>
      </div>
    </SiteShell>
  );
}
