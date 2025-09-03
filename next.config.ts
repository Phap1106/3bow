// // next.config.ts
// import type { NextConfig } from "next";

// const isProd = process.env.NODE_ENV === "production";
// const repoName = "3bowindex";

// const nextConfig: NextConfig = {
//   output: "export",
//   basePath: isProd ? `/${repoName}` : undefined,
//   assetPrefix: isProd ? `/${repoName}/` : undefined,
//   images: {
//     unoptimized: true,
//     domains: ["images.unsplash.com", "dummyimage.com"],
//   },
//   trailingSlash: true,
// };

// export default nextConfig;


// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { domains: ["images.unsplash.com", "dummyimage.com"] },
  // ❌ remove: output: "export"
  
};
export default nextConfig;
