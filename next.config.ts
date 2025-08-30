
// next.config.ts
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "3bow"; // ĐÚNG tên repo của bạn

const nextConfig: NextConfig = {
  // Xuất site tĩnh vào thư mục out/
  output: "export",

  // Khi lên GitHub Pages (production), site nằm dưới /3bow
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",

  // Khuyến nghị cho GitHub Pages để /path -> /path/index.html
  trailingSlash: true,

  // Ảnh: GitHub Pages không có Image Optimization server
  // nên dùng unoptimized = true
  images: {
    unoptimized: true,
    // Giữ domains để sau này chuyển sang Vercel vẫn OK
    domains: ["images.unsplash.com", "dummyimage.com"],
    // Nếu muốn chặt chẽ hơn thì bật remotePatterns (tùy chọn)
    // remotePatterns: [
    //   { protocol: "https", hostname: "images.unsplash.com" },
    //   { protocol: "https", hostname: "dummyimage.com" },
    // ],
  },
};

export default nextConfig;
