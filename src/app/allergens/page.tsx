import type { Metadata } from "next";
import { SiteShell, PageHeading } from "@/components/site/SiteShell";
import { allergenColumns, allergenRows } from "@/data/sophia";

export const metadata: Metadata = {
  title: "Allergen Information | Sourdough Sophia",
  description:
    "Allergen information for Sourdough Sophia products. All products are hand-made in the same bakery space.",
};

export default function AllergensPage() {
  return (
    <SiteShell>
      <div className="ss-container py-10">
        <PageHeading>Allergen Information</PageHeading>

        <div className="ss-rte mx-auto max-w-[800px] text-center">
          <p>
            Some of our products contain nuts and other allergens such as dairy
            and gluten. All of our products are hand-made and produced in the
            same bakery space.
          </p>
          <p>
            Although we are extremely careful to prevent cross contamination,
            there is still a small risk that traces of allergens could be
            present in all of our products.
          </p>
          <p>Please email us or ask a member of staff if you are unsure.</p>
          <p className="text-[15px] text-stone">
            Y = contains &middot; C = may contain (cross-contamination)
          </p>
        </div>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-[18px]">
            <thead>
              <tr>
                <th className="border-b border-[#cdcccc] px-[15px] py-[10px] text-left font-[family-name:var(--font-fraunces)] font-normal text-ink">
                  Product
                </th>
                {allergenColumns.map((col) => (
                  <th
                    key={col}
                    className="border-b border-[#cdcccc] px-[15px] py-[10px] text-center font-[family-name:var(--font-fraunces)] font-normal text-ink"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allergenRows.map((row, rowIndex) => {
                const [name, ...cells] = row;
                const isSpacer = name === "";

                if (isSpacer) {
                  return (
                    <tr key={`spacer-${rowIndex}`} aria-hidden="true">
                      <td
                        className="h-4 border-b border-[#cdcccc]"
                        colSpan={allergenColumns.length + 1}
                      />
                    </tr>
                  );
                }

                return (
                  <tr
                    key={`${name}-${rowIndex}`}
                    className="odd:bg-white/60"
                  >
                    <td className="border-b border-[#cdcccc] px-[15px] py-[10px] text-left font-[family-name:var(--font-fraunces)] text-ink">
                      {name}
                    </td>
                    {cells.map((cell, cellIndex) => (
                      <td
                        key={`${rowIndex}-${cellIndex}`}
                        className={`border-b border-[#cdcccc] px-[15px] py-[10px] text-center ${
                          cell === "C" ? "font-medium text-rose" : "text-ink"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </SiteShell>
  );
}
