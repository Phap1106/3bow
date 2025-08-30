// next.config.ts
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "3bow-web";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : undefined,
  assetPrefix: isProd ? `/${repoName}/` : undefined,
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com", "dummyimage.com"],
  },
  trailingSlash: true,
};

export default nextConfig;
