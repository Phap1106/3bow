// app/page.tsx
"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import {
  Phone,
  Send,
  ChevronRight,
  LineChart,
  Rocket,
  Target,
  Megaphone,
  Globe,
  Handshake,
  Layers,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

import bowImg from "@/app/image/3bow.png";
import SiteShell from "@/components/siteHeaderFooter";

const H2 = ({ children }: { children: ReactNode }) => (
  <h2
    className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white"
    style={{ textShadow: "none" }}
  >
    {children}
  </h2>
);

export default function Page() {
  return (
    <SiteShell>
      <Hero />
      <Stats />
      <Services />
      <Process />
      <CaseStudies />
      <Clients />
      <Pricing />
      <Testimonials />
      <CTA />
      <Contact />
    </SiteShell>
  );
}

/* ============== HERO ============== */
function Hero() {
  return (
    <section className="section bg-white dark:bg-zinc-900">
      <div className="container-max grid lg:grid-cols-2 items-center gap-12">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[12px] font-medium text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
            <Sparkles className="h-3.5 w-3.5" />
            Performance Marketing • Multi-channel
          </div>
          <h1
            className="mt-4 text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white"
            style={{ textShadow: "none" }}
          >
            Dịch vụ chạy quảng cáo
          </h1>
          <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-300">
            Tập trung kết quả: gia tăng lead & doanh thu, tối ưu CPA/CAC, minh
            bạch dữ liệu.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary text-base px-6 py-3">
              Nhận báo giá <ChevronRight className="h-5 w-5" />
            </a>
            <a href="#services" className="btn-secondary text-base px-6 py-3">
              Xem dịch vụ
            </a>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-4 text-sm text-zinc-700 dark:text-zinc-300">
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-600" /> Hợp đồng & bảo
              mật rõ ràng
            </li>
            <li className="flex items-center gap-2">
              <LineChart className="h-4 w-4 text-green-600" /> Báo cáo KPI hàng
              tuần
            </li>
            <li className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-purple-600" /> Theo dõi đa kênh
            </li>
            <li className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-orange-600" /> Tối ưu landing &
              tracking
            </li>
          </ul>
        </div>

        <div className="relative w-full max-w-md mx-auto">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="relative aspect-[5/4] w-full">
              <Image
                src={bowImg}
                alt="3BOW Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <p className="muted mt-4 text-center text-sm">
              3BOW • Performance Partner
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== STATS ============== */
function Stats() {
  const items = [
    { label: "Khách hàng", value: "92+" },
    { label: "Dự án", value: "210+" },
    { label: "Hài lòng", value: "100%" },
    { label: "Quốc gia", value: "12+" },
  ];
  return (
    <section className="py-14 border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="container-max grid grid-cols-2 sm:grid-cols-4 gap-8">
        {items.map((it) => (
          <div key={it.label} className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {it.value}
            </div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============== SERVICES ============== */
function Services() {
  const list = [
    {
      icon: Megaphone,
      title: "Google Ads",
      desc: "Search, Shopping, Performance Max, Remarketing – tối ưu theo chuyển đổi.",
    },
    {
      icon: Target,
      title: "Facebook/Instagram Ads",
      desc: "Lead gen, Conversion API, creative testing, A/B theo funnel.",
    },
    {
      icon: Rocket,
      title: "TikTok Ads",
      desc: "Video-first, hook 3s, tối ưu CPA cho ngành dịch vụ & thương mại.",
    },
    {
      icon: Globe,
      title: "Landing Page",
      desc: "Thiết kế/đo lường (GTM, GA4, Pixel/CAPI) để tăng tỉ lệ chuyển đổi.",
    },
    {
      icon: LineChart,
      title: "Tracking & Analytics",
      desc: "GTM/GA4, server-side tracking, attribution model tuỳ biến.",
    },
    {
      icon: Handshake,
      title: "Quản trị & tư vấn",
      desc: "Khung KPI/OKR, roadmap tối ưu ngân sách theo giai đoạn.",
    },
  ];
  return (
    <section id="services" className="section bg-white dark:bg-zinc-900">
      <div className="container-max">
        <H2>Dịch vụ chủ đạo</H2>
        <p className="muted mt-2 max-w-2xl">
          Gói linh hoạt theo mục tiêu: lead, đơn hàng, brand, traffic chất
          lượng.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow dark:border-zinc-800 dark:bg-zinc-900"
            >
              <Icon className="h-6 w-6" />
              <h3 className="mt-4 font-semibold text-lg">{title}</h3>
              <p className="muted mt-2 text-sm">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== PROCESS ============== */
function Process() {
  const steps = [
    {
      title: "Tiếp nhận & tư vấn",
      desc: "Thu thập mục tiêu/KPI, audit tài khoản, đề xuất chiến lược.",
      icon: Handshake,
    },
    {
      title: "Lập kế hoạch",
      desc: "Phân bổ ngân sách, kế hoạch kênh, timeline triển khai.",
      icon: Layers,
    },
    {
      title: "Triển khai & tối ưu",
      desc: "Thiết lập campaign, creative testing, tối ưu theo dữ liệu.",
      icon: Rocket,
    },
    {
      title: "Báo cáo & mở rộng",
      desc: "Dashboard KPI, insight định kỳ, scale theo hiệu quả.",
      icon: LineChart,
    },
  ];
  return (
    <section id="process" className="section bg-white dark:bg-zinc-900">
      <div className="container-max">
        <H2>Quy trình làm việc</H2>
        <p className="muted mt-2">Rõ ràng – minh bạch – có thể mở rộng.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ title, desc, icon: Icon }, i) => (
            <div
              key={title}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700">
                  {i + 1}
                </span>
                Bước {i + 1}
              </div>
              <Icon className="mt-3 h-6 w-6" />
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="muted mt-2 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== CASES ============== */
function CaseStudies() {
  const cases = [
    {
      title: "Thẩm mỹ viện — tăng 180% lead",
      img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Nội thất — CPA giảm 42%",
      img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Edtech — ROAS 5.2",
      img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
    },
  ];
  return (
    <section id="cases" className="section bg-white dark:bg-zinc-900">
      <div className="container-max">
        <div className="flex items-end justify-between gap-4">
          <div>
            <H2>Case study tiêu biểu</H2>
            <p className="muted mt-2">
              Một số kết quả gần đây (ẩn thương hiệu theo NDA).
            </p>
          </div>
          <a href="#contact" className="btn-secondary">
            Yêu cầu demo báo cáo
          </a>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <article
              key={c.title}
              className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold group-hover:underline">
                  {c.title}
                </h3>
                <p className="muted mt-1 text-sm">
                  Ngân sách phù hợp, tracking chuẩn, tối ưu theo data.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== CLIENTS ============== */
function Clients() {
  const logos = Array.from({ length: 12 }).map(
    (_, i) => `https://dummyimage.com/200x80/eee/aaa&text=Logo+${i + 1}`
  );
  return (
    <section className="py-12 border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="container-max">
        <p className="text-center muted text-sm">
          Được tin tưởng bởi các doanh nghiệp trong & ngoài nước
        </p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
          {logos.map((src, idx) => (
            <div
              key={idx}
              className="relative w-40 h-16 mx-auto opacity-80 hover:opacity-100 transition"
            >
              <Image
                src={src}
                alt={`logo-${idx}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== PRICING ============== */
function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "8–15tr/tháng",
      features: ["Ngân sách < 80tr", "1–2 kênh", "Báo cáo tuần"],
    },
    {
      name: "Growth",
      price: "16–35tr/tháng",
      features: ["Ngân sách 80–300tr", "2–3 kênh", "Dashboard KPI"],
    },
    {
      name: "Scale",
      price: "Liên hệ",
      features: [
        "Ngân sách > 300tr",
        "Đa kênh + server tracking",
        "Cố vấn chiến lược",
      ],
    },
  ];
  return (
    <section id="pricing" className="section bg-white dark:bg-zinc-900">
      <div className="container-max">
        <H2>Bảng giá tham khảo</H2>
        <p className="muted mt-2">
          Tuỳ theo mục tiêu, ngành & mức độ cạnh tranh.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <div className="mt-1 text-2xl font-bold">{t.price}</div>
              <ul className="mt-4 space-y-2 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" /> {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="btn-primary mt-6 inline-flex">
                Nhận tư vấn
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== TESTIMONIALS ============== */
function Testimonials() {
  const list = [
    {
      name: "Trần Hoàng",
      role: "CEO ngành dịch vụ",
      quote: "Team minh bạch & rất nhanh trong tối ưu – CPA giảm mạnh.",
    },
    {
      name: "Anh Nhật",
      role: "E-commerce lead",
      quote: "Dashboards rõ ràng, báo cáo mỗi tuần, scale mượt.",
    },
    {
      name: "Lê Phong",
      role: "Marketing Manager",
      quote: "Tư duy performance tốt, gợi ý testing sáng tạo.",
    },
    {
      name: "Trần Hà",
      role: "CEO ngành dịch vụ",
      quote: "Team minh bạch & rất nhanh trong tối ưu – CPA giảm mạnh.",
    },
    {
      name: "Anh Nghi",
      role: "E-commerce lead",
      quote: "Dashboards rõ ràng, báo cáo mỗi tuần, scale mượt.",
    },
    {
      name: "Lê Nam",
      role: "Marketing Manager",
      quote: "Tư duy performance tốt, gợi ý testing sáng tạo.",
    },
  ];
  return (
    <section className="section bg-white dark:bg-zinc-900">
      <div className="container-max">
        <H2>Khách hàng nói gì</H2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {list.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <Star className="h-5 w-5" />
              <blockquote className="mt-3 text-sm">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-medium">
                {t.name} • <span className="muted font-normal">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== CTA ============== */
function CTA() {
  return (
    <section className="section bg-white dark:bg-zinc-900">
      <div className="container-max grid items-center gap-6 md:grid-cols-2">
        <div>
          <H2>Sẵn sàng tăng trưởng?</H2>
          <p className="muted mt-2">
            Nhận phân tích nhanh tài khoản & lộ trình tối ưu miễn phí.
          </p>
        </div>
        <div className="flex gap-3 md:justify-end">
          <a href="#contact" className="btn-primary">
            Đặt lịch tư vấn
          </a>
          <a href="#services" className="btn-secondary">
            Xem dịch vụ
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============== CONTACT ============== */
function Contact() {
  return (
    <section id="contact" className="section bg-white dark:bg-zinc-900">
      <div className="container-max grid lg:grid-cols-2 gap-10">
        <div>
          <H2>Liên hệ</H2>
          <p className="muted mt-2">
            Địa chỉ, hotline & email liên hệ. Hoặc gửi form – chúng tôi phản hồi
            trong 24h.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> 028 7109 2939
            </li>
            <li className="flex items-center gap-2">
              <Send className="h-4 w-4" /> contact@agencyads.vn
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}


function ContactForm() {
  const [state, setState] = useState<{ ok?: boolean; msg?: string }>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());
    await new Promise((r) => setTimeout(r, 600)); // TODO: POST /api/lead
    console.log("lead:", body);
    setState({ ok: true, msg: "Đã gửi yêu cầu — chúng tôi sẽ liên hệ sớm!" });
    (e.currentTarget as HTMLFormElement).reset();
  }

  const cardCls =
    "rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm " +
    "dark:border-zinc-800 dark:bg-zinc-900/70 backdrop-blur";
  const labelCls = "text-sm font-medium text-zinc-700 dark:text-zinc-300";
  const inputCls =
    "w-full h-10 rounded-lg border px-3 py-2 text-sm shadow-sm outline-none transition " +
    "border-zinc-300/80 bg-white/90 text-zinc-900 placeholder-zinc-500 " +
    "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 " +
    "dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-100 dark:placeholder-zinc-400 " +
    "dark:focus:border-blue-400 dark:focus:ring-blue-400/30";
  const textareaCls = inputCls.replace("h-10", "min-h-[120px] py-3");

  return (
    <form onSubmit={onSubmit} className={`${cardCls} grid gap-4`} noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Họ tên" labelCls={labelCls}>
          <input name="name" required autoComplete="name" className={inputCls} />
        </Field>
        <Field label="Email" labelCls={labelCls}>
          <input name="email" type="email" required autoComplete="email" className={inputCls} />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Số điện thoại" labelCls={labelCls}>
          <input name="phone" required autoComplete="tel" className={inputCls} />
        </Field>
        <Field label="Ngân sách dự kiến" labelCls={labelCls}>
          <select name="budget" className={inputCls}>
            <option>&lt; 50 triệu/tháng</option>
            <option>50–150 triệu/tháng</option>
            <option>150–300 triệu/tháng</option>
            <option>&gt; 300 triệu/tháng</option>
          </select>
        </Field>
      </div>

      <Field label="Mục tiêu chiến dịch" labelCls={labelCls}>
        <textarea
          name="message"
          className={textareaCls}
          placeholder="VD: tăng lead 200%, giảm CPA 30%, tối ưu landing..."
        />
      </Field>

      <button className="btn-primary" type="submit">Gửi yêu cầu</button>

      {state.msg && (
        <p
          aria-live="polite"
          className={`text-sm mt-1 rounded-md px-3 py-2 border ${
            state.ok
              ? "text-emerald-400 border-emerald-700/40 bg-emerald-500/10"
              : "text-red-400 border-red-700/40 bg-red-500/10"
          }`}
        >
          {state.msg}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  children,
  labelCls,
}: {
  label: string;
  children: React.ReactNode;
  labelCls: string;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
