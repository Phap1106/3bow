// components/siteHeaderFooter.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import bowImg from "@/app/image/3bow.png";
import { Phone, Sparkles } from "lucide-react";

const crispTextStyle: CSSProperties = {
  WebkitFontSmoothing: "auto",
  MozOsxFontSmoothing: "auto",
  textRendering: "optimizeSpeed",
};

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative" style={crispTextStyle}>
      <Header />
      {children}
      <Footer />
      <FloatingContact />
    </main>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-800">
      <div className="container-max h-16 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3 font-semibold">
          <div className="relative h-8 w-8 overflow-hidden rounded-xl ring-1 ring-zinc-200 dark:ring-zinc-800">
            <Image src={bowImg} alt="3BOW" fill className="object-cover" />
          </div>
          <span className="tracking-tight">
            <span className="mr-1">3BOW</span>
            <span className="text-xs font-medium text-zinc-500 group-hover:text-zinc-700 dark:text-zinc-400">
              • Growth Ads
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/#services" className="nav-link">Dịch vụ</Link>
          <Link href="/#process" className="nav-link">Quy trình</Link>
          <Link href="/#pricing" className="nav-link">Bảng giá</Link>
          <Link href="/#cases" className="nav-link">Case study</Link>
          <Link href="/news" className="nav-link">Tin tức</Link>
          <Link href="/#contact" className="nav-link">Liên hệ</Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/#contact" className="btn-secondary hidden sm:inline-flex">
            Nhận tư vấn
          </Link>
          <a href="tel:02871092939" className="btn-primary">
            <Phone className="h-4 w-4" /> 028 7109 2939
          </a>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="pt-16 pb-10 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="container-max grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 font-semibold">
            <div className="relative h-7 w-7 overflow-hidden rounded-xl ring-1 ring-zinc-200 dark:ring-zinc-800">
              <Image src={bowImg} alt="3BOW" fill className="object-cover" />
            </div>
            3BOW
          </div>
          <p className="muted mt-3 text-sm">
            Đối tác tăng trưởng – tập trung hiệu quả, minh bạch dữ liệu.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">Dịch vụ</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/#services" className="hover:underline">Google Ads</Link></li>
            <li><Link href="/#services" className="hover:underline">Facebook/Instagram Ads</Link></li>
            <li><Link href="/#services" className="hover:underline">TikTok Ads</Link></li>
            <li><Link href="/#services" className="hover:underline">Landing Page & Tracking</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Tài nguyên</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/#cases" className="hover:underline">Case study</Link></li>
            <li><Link href="/#pricing" className="hover:underline">Bảng giá</Link></li>
            <li><Link href="/news" className="hover:underline">Tin tức</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Liên hệ</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Hotline: 028 7109 2939</li>
            <li>Email: contact@agencyads.vn</li>
            <li>HCM, Việt Nam</li>
          </ul>
        </div>
      </div>
      <div className="container-max mt-10 flex flex-col sm:flex-row gap-3 sm:gap-0 items-center justify-between text-sm text-zinc-500">
        <p>© {new Date().getFullYear()} 3BOW. All rights reserved.</p>
        <p className="flex items-center gap-3">
          <a className="hover:underline" href="#">Privacy</a><span>•</span><a className="hover:underline" href="#">Terms</a>
        </p>
      </div>
    </footer>
  );
}

function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2">
      <a href="tel:02871092939" className="btn-primary shadow-sm">
        <Phone className="h-4 w-4" /> Gọi ngay
      </a>
    </div>
  );
}
