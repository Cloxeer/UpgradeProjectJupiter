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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Force Upgrade Project Jupiter",
  description:
    "Same land, same timeline, about 1% more money: carbon captured, heat reused, water produced, 5,200 permanent jobs. Their original claims one click away.",
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
    description:
      "Same land, same timeline, about 1% more money: carbon captured, heat reused, water produced, 5,200 permanent jobs. Their original claims one click away.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}${asset("/")}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AudienceFlag />
        {children}
      </body>
    </html>
  );
}
