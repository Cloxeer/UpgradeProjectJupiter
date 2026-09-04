import type { NextConfig } from "next";

// Static export for GitHub Pages. NEXT_PUBLIC_BASE_PATH is set by the Pages workflow to "/<repo>";
// it is empty for local dev and root-domain hosting, so nothing changes in the UI.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
