import { asset } from "@/lib/base";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AudienceFlag } from "@/components/jupiter/AudienceFlag";

// Roboto — the exact font used on projectjupitertogether.com.
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "900"],
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://upgradeprojectjupiter.com";
const DESCRIPTION =
  "An independent, sourced plan to make the $165 billion Project Jupiter data center in Santa Teresa, New Mexico a net gain: carbon captured from day one, one air permit with public monitors, waste heat growing food, 5 million gallons a day of new water, and about 3,000 verified jobs. Same land, same timeline, about 1.5% more.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Force Upgrade Project Jupiter | A citizen plan for the Santa Teresa data center",
    template: "%s | Force Upgrade Project Jupiter",
  },
  description: DESCRIPTION,
  applicationName: "Force Upgrade Project Jupiter",
  keywords: [
    "Project Jupiter",
    "Upgrade Project Jupiter",
    "Force Upgrade Project Jupiter",
    "Project Jupiter data center",
    "Santa Teresa data center",
    "Doña Ana County data center",
    "Sunland Park",
    "Oracle STACK New Mexico",
    "Project Jupiter petition",
    "Project Jupiter air permit",
    "Project Jupiter water",
    "carbon capture fuel cells",
    "New Mexico data center moratorium",
  ],
  authors: [{ name: "Sebastian, NMSU" }],
  creator: "Force Upgrade Project Jupiter",
  category: "civic",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: {
    icon: [
      { url: asset("/seo/jupiter/favicon.svg"), type: "image/svg+xml" },
      { url: asset("/seo/jupiter/favicon.png"), type: "image/png", sizes: "512x512" },
    ],
    apple: asset("/seo/jupiter/apple-touch-icon.png"),
  },
  openGraph: {
    locale: "en_US",
    type: "website",
    siteName: "Force Upgrade Project Jupiter",
    title: "Force Upgrade Project Jupiter",
    description: DESCRIPTION,
    url: `${SITE}${asset("/")}`,
    images: [{ url: asset("/images/jupiter/hero.jpg"), width: 1600, height: 900, alt: "The Project Jupiter construction site in Santa Teresa, New Mexico" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Force Upgrade Project Jupiter",
    description: DESCRIPTION,
    images: [asset("/images/jupiter/hero.jpg")],
  },
};

/** Structured data: who publishes this and what it is. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#org`,
      name: "Force Upgrade Project Jupiter",
      alternateName: "Upgrade Project Jupiter",
      url: SITE,
      logo: `${SITE}${asset("/seo/jupiter/favicon.png")}`,
      email: "UpgradeProjectJupiter@gmail.com",
      description: DESCRIPTION,
      areaServed: { "@type": "AdministrativeArea", name: "Doña Ana County, New Mexico" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Force Upgrade Project Jupiter",
      alternateName: "Upgrade Project Jupiter",
      description: DESCRIPTION,
      publisher: { "@id": `${SITE}/#org` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <AudienceFlag />
        {children}
      </body>
    </html>
  );
}
