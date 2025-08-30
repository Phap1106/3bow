// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cách đơn giản: domains
    domains: ["images.unsplash.com", "dummyimage.com"],

    // (tùy chọn) Nếu muốn chặt chẽ hơn, dùng remotePatterns:
    // remotePatterns: [
    //   { protocol: "https", hostname: "images.unsplash.com" },
    //   { protocol: "https", hostname: "dummyimage.com" },
    // ],
  },
};

export default nextConfig;
