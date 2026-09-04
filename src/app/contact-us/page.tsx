import { SiteShell, PageHeading } from "@/components/site/SiteShell";
import { locations, contactEmails } from "@/data/sophia";

export default function ContactUsPage() {
  return (
    <SiteShell>
      <div className="ss-container py-10">
        <div className="mx-auto max-w-[900px]">
          <PageHeading>Don&apos;t be a stranger, come and say hello!</PageHeading>
        </div>

        <section className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-3">
          {locations.map((location) => (
            <div
              key={location.name}
              className="rounded-lg bg-white p-6 text-left"
            >
              <h2 className="font-[family-name:var(--font-fraunces)] text-[22px] font-normal text-ink md:text-[24px]">
                {location.name}
              </h2>
              <p className="mt-3 text-[16px] text-ink">{location.address}</p>
              <div className="mt-3 space-y-1">
                {location.hours.map((line) => (
                  <p key={line} className="text-[16px] text-slate">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-16 text-center">
          <h2 className="font-[family-name:var(--font-fraunces)] text-[24px] font-normal text-ink md:text-[28px]">
            Get in touch
          </h2>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
            {contactEmails.map((contact) => (
              <p key={contact.email} className="text-[16px] text-ink">
                {contact.label}:{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="text-rose hover:underline"
                >
                  {contact.email}
                </a>
              </p>
            ))}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
