// // app/news/_client.tsx
// "use client";

// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { getAllNews } from "./_data";

// const PAGE_SIZE = 6; // 2 hàng * 3 cột

// const cx = (...s: (string | false | undefined)[]) =>
//   s.filter(Boolean).join(" ");

// function formatDate(v: string) {
//   try {
//     return new Intl.DateTimeFormat("vi-VN", {
//       dateStyle: "medium",
//       timeStyle: "short",
//     }).format(new Date(v));
//   } catch {
//     return v;
//   }
// }

// export default function NewsClient() {
//   const items = getAllNews();
//   const sp = useSearchParams();

//   const raw = Number(sp.get("page") || "1");
//   const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
//   const page = Math.min(Math.max(raw, 1), totalPages);

//   const start = (page - 1) * PAGE_SIZE;
//   const current = items.slice(start, start + PAGE_SIZE);

//   return (
//     <section className="max-w-6xl px-4 py-8 mx-auto">
//       <h1 className="mb-6 text-2xl font-semibold md:text-3xl">
//         Tin tức công nghệ
//       </h1>

//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {current.map((n) => (
//           <Link
//             key={n.id}
//             href={`/news/${n.slug}`}
//             className="overflow-hidden transition-shadow bg-white border group rounded-2xl border-zinc-200/60 dark:bg-zinc-900 dark:border-zinc-800 hover:shadow-md"
//           >
//             <div className="aspect-[16/9] overflow-hidden">
//               <img
//                 src={n.image}
//                 alt={n.title}
//                 className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
//                 loading="lazy"
//               />
//             </div>

//             <div className="p-4">
//               <h2 className="text-base font-semibold md:text-lg line-clamp-2">
//                 {n.title}
//               </h2>
//               <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">
//                 {n.excerpt}
//               </p>

//               <div className="flex items-center justify-between mt-4 text-xs text-zinc-500 dark:text-zinc-400">
//                 <span>{n.author}</span>
//                 <time dateTime={n.publishedAt}>
//                   {formatDate(n.publishedAt)}
//                 </time>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>

//       <Pagination page={page} totalPages={totalPages} />
//     </section>
//   );
// }

// function Pagination({
//   page,
//   totalPages,
// }: {
//   page: number;
//   totalPages: number;
// }) {
//   const href = (p: number) => `/news?page=${p}`;
//   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <nav
//       className="flex items-center justify-center gap-2 mt-8"
//       aria-label="Pagination"
//     >
//       <Link
//         href={href(Math.max(1, page - 1))}
//         aria-disabled={page <= 1}
//         className={cx(
//           "h-9 px-3 inline-flex items-center rounded-lg border border-zinc-200/60 dark:border-zinc-800",
//           "text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/60",
//           page <= 1 && "pointer-events-none opacity-50"
//         )}
//       >
//         Trước
//       </Link>

//       {pages.map((p) => (
//         <Link
//           key={p}
//           href={href(p)}
//           aria-current={p === page ? "page" : undefined}
//           className={cx(
//             "h-9 w-9 grid place-items-center rounded-lg border text-sm",
//             "border-zinc-200/60 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60",
//             p === page && "bg-black text-white dark:bg-white dark:text-black"
//           )}
//         >
//           {p}
//         </Link>
//       ))}

//       <Link
//         href={href(Math.min(totalPages, page + 1))}
//         aria-disabled={page >= totalPages}
//         className={cx(
//           "h-9 px-3 inline-flex items-center rounded-lg border border-zinc-200/60 dark:border-zinc-800",
//           "text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/60",
//           page >= totalPages && "pointer-events-none opacity-50"
//         )}
//       >
//         Sau
//       </Link>
//     </nav>
//   );
// }

// app/news/_client.tsx
// "use client";

// import Link from "next/link";
// import { useSearchParams } from "next/navigation";

// const PAGE_SIZE = 6; // 2 hàng * 3 cột
// const FALLBACK_IMG =
//   "https://dummyimage.com/640x360/e5e7eb/9ca3af&text=3BOW+News";

// const cx = (...s: (string | false | undefined)[]) => s.filter(Boolean).join(" ");

// function formatDate(v: string) {
//   try {
//     return new Intl.DateTimeFormat("vi-VN", {
//       dateStyle: "medium",
//       timeStyle: "short",
//     }).format(new Date(v));
//   } catch {
//     return v;
//   }
// }

// // nhận items từ server
// export type NewsItem = {
//   id: number;
//   slug: string;
//   title: string;
//   excerpt?: string | null;
//   author: string;
//   publishedAt: string;
//   image?: string | null;
// };

// export default function NewsClient({ items }: { items: NewsItem[] }) {
//   const sp = useSearchParams();

//   const raw = Number(sp.get("page") || "1");
//   const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
//   const page = Math.min(Math.max(raw, 1), totalPages);

//   const start = (page - 1) * PAGE_SIZE;
//   const current = items.slice(start, start + PAGE_SIZE);

//   return (
//     <section className="max-w-6xl px-4 py-8 mx-auto">
//       <h1 className="mb-6 text-2xl font-semibold md:text-3xl">Tin tức công nghệ</h1>

//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {current.map((n) => (
//           <Link
//             key={n.id}
//             href={`/news/${n.slug}`}
//             className="overflow-hidden transition-shadow bg-white border group rounded-2xl border-zinc-200/60 dark:bg-zinc-900 dark:border-zinc-800 hover:shadow-md"
//           >
//             <div className="aspect-[16/9] overflow-hidden">
//               <img
//                 src={n.image || FALLBACK_IMG}
//                 alt={n.title}
//                 className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
//                 loading="lazy"
//               />
//             </div>

//             <div className="p-4">
//               <h2 className="text-base font-semibold md:text-lg line-clamp-2">
//                 {n.title}
//               </h2>
//               <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">
//                 {n.excerpt}
//               </p>

//               <div className="flex items-center justify-between mt-4 text-xs text-zinc-500 dark:text-zinc-400">
//                 <span>{n.author}</span>
//                 <time dateTime={n.publishedAt}>{formatDate(n.publishedAt)}</time>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>

//       <Pagination page={page} totalPages={totalPages} />
//     </section>
//   );
// }

// function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
//   const href = (p: number) => `/news?page=${p}`;
//   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Pagination">
//       <Link
//         href={href(Math.max(1, page - 1))}
//         aria-disabled={page <= 1}
//         className={cx(
//           "h-9 px-3 inline-flex items-center rounded-lg border border-zinc-200/60 dark:border-zinc-800",
//           "text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/60",
//           page <= 1 && "pointer-events-none opacity-50"
//         )}
//       >
//         Trước
//       </Link>

//       {pages.map((p) => (
//         <Link
//           key={p}
//           href={href(p)}
//           aria-current={p === page ? "page" : undefined}
//           className={cx(
//             "h-9 w-9 grid place-items-center rounded-lg border text-sm",
//             "border-zinc-200/60 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60",
//             p === page && "bg-black text-white dark:bg-white dark:text-black"
//           )}
//         >
//           {p}
//         </Link>
//       ))}

//       <Link
//         href={href(Math.min(totalPages, page + 1))}
//         aria-disabled={page >= totalPages}
//         className={cx(
//           "h-9 px-3 inline-flex items-center rounded-lg border border-zinc-200/60 dark:border-zinc-800",
//           "text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/60",
//           page >= totalPages && "pointer-events-none opacity-50"
//         )}
//       >
//         Sau
//       </Link>
//     </nav>
//   );
// }

// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { getArticlesPaged } from "@/lib/api";
// import type { News } from "@/lib/newsApi";

// const LIMIT = 10;

// export default function NewsClient() {
//   const [items, setItems] = React.useState<News[]>([]);
//   const [q, setQ] = React.useState("");
//   const [page, setPage] = React.useState(1);
//   const [total, setTotal] = React.useState(0);
//   const [loading, setLoading] = React.useState(true);
//   const [err, setErr] = React.useState<string | null>(null);

//   async function load(p = 1, keyword = "") {
//     try {
//       setLoading(true);
//       setErr(null);
//       const { items, total } = await getArticlesPaged(keyword, p, LIMIT);
//       setItems(items);
//       setTotal(total);
//       setPage(p);
//     } catch (e: any) {
//       setErr(e?.message || "Load failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   React.useEffect(() => {
//     load(1, "");
//   }, []);

//   const pages = Math.max(1, Math.ceil(total / LIMIT));

//   function pageList(curr: number, max: number) {
//     const out: (number | string)[] = [];
//     const push = (v: number | string) => out.push(v);
//     const addRange = (a: number, b: number) => { for (let i = a; i <= b; i++) push(i); };

//     if (max <= 7) {
//       addRange(1, max);
//     } else if (curr <= 4) {
//       addRange(1, 5); push("…"); push(max);
//     } else if (curr >= max - 3) {
//       push(1); push("…"); addRange(max - 4, max);
//     } else {
//       push(1); push("…"); addRange(curr - 1, curr + 1); push("…"); push(max);
//     }
//     return out;
//   }

//   return (
//     <main className="max-w-3xl p-6 mx-auto">
//       <h1 className="mb-4 text-2xl font-bold">Bài viết</h1>

//       {/* Search */}
//       <form
//         className="flex gap-2 mb-4"
//         onSubmit={(e) => {
//           e.preventDefault();
//           load(1, q.trim());
//         }}
//       >
//         <input
//           className="w-full h-10 px-3 border rounded"
//           placeholder="Tìm tiêu đề, nội dung, tác giả..."
//           value={q}
//           onChange={(e) => setQ(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="h-10 px-4 text-white bg-black rounded disabled:opacity-50"
//           disabled={loading}
//         >
//           Tìm
//         </button>
//       </form>

//       {/* States */}
//       {err && <p className="mb-3 text-sm text-red-600">{err}</p>}
//       {loading && <p className="text-sm text-zinc-500">Đang tải…</p>}

//       {/* List */}
//       {!loading && items.length === 0 && (
//         <p className="text-sm text-zinc-500">Không có bài viết.</p>
//       )}

//       {!loading && items.length > 0 && (
//         <>
//           <ul className="space-y-3">
//             {items.map((a) => (
//               <li key={a.id} className="p-4 border rounded hover:bg-zinc-50">
//                 <Link href={`/news/${a.slug}`} className="font-semibold">
//                   {a.title}
//                 </Link>
//                 <p className="text-sm text-zinc-600">{a.excerpt}</p>
//               </li>
//             ))}
//           </ul>

//           {/* Pagination */}
//           <div className="flex items-center justify-center gap-1 mt-6">
//             <button
//               className="px-3 border rounded h-9 disabled:opacity-50"
//               disabled={page <= 1 || loading}
//               onClick={() => load(page - 1, q)}
//             >
//               ← Trước
//             </button>

//             {pageList(page, pages).map((p, i) =>
//               typeof p === "number" ? (
//                 <button
//                   key={i}
//                   className={`h-9 px-3 border rounded ${
//                     p === page ? "bg-black text-white" : "hover:bg-zinc-50"
//                   }`}
//                   disabled={loading}
//                   onClick={() => load(p, q)}
//                 >
//                   {p}
//                 </button>
//               ) : (
//                 <span key={i} className="px-2 text-zinc-500">
//                   {p}
//                 </span>
//               )
//             )}

//             <button
//               className="px-3 border rounded h-9 disabled:opacity-50"
//               disabled={page >= pages || loading}
//               onClick={() => load(page + 1, q)}
//             >
//               Sau →
//             </button>
//           </div>

//           {/* Summary */}
//           <p className="mt-2 text-xs text-center text-zinc-500">
//             Trang {page}/{pages} • {total} bài
//           </p>
//         </>
//       )}
//     </main>
//   );
// }


// //app/news/_client/tsx
// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { getArticlesPaged } from "@/lib/api";
// import type { News } from "@/lib/newsApi";

// const LIMIT = 12; // hợp lưới 3x4
// const FALLBACK_IMG =
//   "https://dummyimage.com/1200x630/e5e7eb/9ca3af&text=3BOW+News";

// function formatDate(v?: string | null) {
//   if (!v) return "—";
//   const d = new Date(v);
//   if (Number.isNaN(d.getTime())) return "—";
//   return new Intl.DateTimeFormat("vi-VN", {
//     dateStyle: "medium",
//     timeStyle: "short",
//   }).format(d);
// }

// export default function NewsClient() {
//   const [items, setItems] = React.useState<News[]>([]);
//   const [q, setQ] = React.useState("");
//   const [page, setPage] = React.useState(1);
//   const [total, setTotal] = React.useState(0);
//   const [loading, setLoading] = React.useState(true);
//   const [err, setErr] = React.useState<string | null>(null);

//   async function load(p = 1, keyword = "") {
//     try {
//       setLoading(true);
//       setErr(null);
//       // ✅ gọi đúng thứ tự tham số (page, limit, q)
//       const { items, total } = await getArticlesPaged(p, LIMIT, keyword);
//       setItems(items);
//       setTotal(total);
//       setPage(p);
//     } catch (e: any) {
//       setErr(e?.message || "Load failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   React.useEffect(() => {
//     load(1, "");
//   }, []);

//   const pages = Math.max(1, Math.ceil(total / LIMIT));
//   const pageList = (curr: number, max: number) => {
//     const out: (number | string)[] = [];
//     const add = (a: number, b: number) => {
//       for (let i = a; i <= b; i++) out.push(i);
//     };
//     if (max <= 7) add(1, max);
//     else if (curr <= 4) {
//       add(1, 5);
//       out.push("…", max);
//     } else if (curr >= max - 3) {
//       out.push(1, "…");
//       add(max - 4, max);
//     } else {
//       out.push(1, "…", curr - 1, curr, curr + 1, "…", max);
//     }
//     return out;
//   };

//   return (
//     <main className="max-w-6xl p-6 mx-auto">
//       <h1 className="mb-6 text-3xl font-bold text-center">Bài viết</h1>

//       {/* Search */}
//       <form
//         className="flex justify-center gap-2 mb-6"
//         onSubmit={(e) => {
//           e.preventDefault();
//           load(1, q.trim());
//         }}
//       >
//         <input
//           className="w-full h-10 max-w-xl px-3 border rounded"
//           placeholder="Tìm tiêu đề, nội dung, tác giả..."
//           value={q}
//           onChange={(e) => setQ(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="h-10 px-4 text-white bg-black rounded disabled:opacity-50"
//           disabled={loading}
//         >
//           Tìm
//         </button>
//       </form>

//       {/* States */}
//       {err && <p className="mb-3 text-sm text-center text-red-600">{err}</p>}
//       {loading && (
//         <p className="text-sm text-center text-zinc-500">Đang tải…</p>
//       )}

//       {/* Grid */}
//       {!loading && items.length === 0 && (
//         <p className="text-sm text-center text-zinc-500">Không có bài viết.</p>
//       )}

//       {!loading && items.length > 0 && (
//         <>
//           <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
//             {items.map((a) => (
//               <Link
//                 key={a.id}
//                 href={`/news/${a.slug}`}
//                 className="overflow-hidden transition border group rounded-xl hover:shadow-sm"
//               >
//                 <div className="aspect-[16/9] bg-zinc-100 overflow-hidden">
//                   <img
//                     src={a.image || FALLBACK_IMG}
//                     alt={a.title}
//                     className="w-full h-full object-cover group-hover:scale-[1.02] transition"
//                     loading="lazy"
//                   />
//                 </div>
//                 <div className="p-4">
//                   <h2 className="font-semibold line-clamp-2">{a.title}</h2>
//                   <p className="mt-1 text-sm text-zinc-600 line-clamp-3">
//                     {a.excerpt}
//                   </p>
//                   <div className="flex items-center justify-between mt-3 text-xs text-zinc-500">
//                     <span className="truncate">{a.author}</span>
//                     <time dateTime={a.publishedAt || undefined}>
//                       {formatDate(a.publishedAt)}
//                     </time>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>

//           {/* Pagination */}
//           <div className="flex items-center justify-center gap-1 mt-8">
//             <button
//               className="px-3 border rounded h-9 disabled:opacity-50"
//               disabled={page <= 1 || loading}
//               onClick={() => load(page - 1, q)}
//             >
//               ← Trước
//             </button>
//             {pageList(page, pages).map((p, i) =>
//               typeof p === "number" ? (
//                 <button
//                   key={i}
//                   className={`h-9 px-3 border rounded ${
//                     p === page ? "bg-black text-white" : "hover:bg-zinc-50"
//                   }`}
//                   disabled={loading}
//                   onClick={() => load(p, q)}
//                 >
//                   {p}
//                 </button>
//               ) : (
//                 <span key={i} className="px-2 text-zinc-500">
//                   {p}
//                 </span>
//               )
//             )}
//             <button
//               className="px-3 border rounded h-9 disabled:opacity-50"
//               disabled={page >= pages || loading}
//               onClick={() => load(page + 1, q)}
//             >
//               Sau →
//             </button>
//           </div>

//           <p className="mt-2 text-xs text-center text-zinc-500">
//             Trang {page}/{pages} • {total} bài
//           </p>
//         </>
//       )}
//     </main>
//   );
// }












// app/news/_client.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { getArticlesPaged, type Article } from "@/lib/api";

const LIMIT = 6; // lưới 3x4
const FALLBACK_IMG =
  "https://dummyimage.com/1200x630/e5e7eb/9ca3af&text=3BOW+News";

function formatDate(v?: string | null) {
  if (!v) return "—";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

// danh sách trang gọn + chống NaN
function buildPageList(curr: number, max: number) {
  const M = Number.isFinite(max) && max > 0 ? Math.floor(max) : 1;
  const C = Math.min(Math.max(1, curr || 1), M);
  const out: (number | string)[] = [];
  const add = (a: number, b: number) => {
    for (let i = a; i <= b; i++) out.push(i);
  };
  if (M <= 7) add(1, M);
  else if (C <= 4) {
    add(1, 5); out.push("…", M);
  } else if (C >= M - 3) {
    out.push(1, "…"); add(M - 4, M);
  } else {
    out.push(1, "…", C - 1, C, C + 1, "…", M);
  }
  return out;
}

export default function NewsClient() {
  const [items, setItems] = React.useState<Article[]>([]);
  const [q, setQ] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState<string | null>(null);

  const pages = React.useMemo(() => {
    const t = Number.isFinite(total) ? total : 0;
    const n = Math.ceil(t / LIMIT);
    return n >= 1 ? n : 1;
  }, [total]);

  async function load(p = 1, keyword = "") {
    try {
      setLoading(true);
      setErr(null);
      const r = await getArticlesPaged(p, LIMIT, keyword);
      const items = (r as any).items ?? [];
      const totalRaw =
        (r as any).total ??
        (r as any).count ??
        (r as any).meta?.total ??
        0;

      setItems(items);
      setTotal(Number.isFinite(totalRaw) ? Number(totalRaw) : 0);
      setPage(p);
    } catch (e: any) {
      setErr(e?.message || "Load failed");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => { load(1, ""); }, []);

  const pageList = React.useMemo(() => buildPageList(page, pages), [page, pages]);

  return (
    <main className="max-w-6xl p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Bài viết</h1>

      {/* Search */}
      <form
        className="flex justify-center gap-2 mb-6"
        onSubmit={(e) => { e.preventDefault(); load(1, q.trim()); }}
      >
        <input
          className="w-full h-10 max-w-xl px-3 border rounded"
          placeholder="Tìm tiêu đề, nội dung, tác giả..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button
          type="submit"
          className="h-10 px-4 text-white bg-black rounded disabled:opacity-50"
          disabled={loading}
        >
          Tìm
        </button>
      </form>

      {/* States */}
      {err && <p className="mb-3 text-sm text-center text-red-600">{err}</p>}
      {loading && <p className="text-sm text-center text-zinc-500">Đang tải…</p>}

      {/* Grid */}
      {!loading && items.length === 0 && (
        <p className="text-sm text-center text-zinc-500">Không có bài viết.</p>
      )}

      {!loading && items.length > 0 && (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((a) => (
              <Link
                key={a.id}
                href={`/news/${a.slug}`}
                className="overflow-hidden transition border group rounded-xl hover:shadow-sm"
              >
                <div className="aspect-[16/9] bg-zinc-100 overflow-hidden">
                  <img
                    src={a.image || FALLBACK_IMG}
                    alt={a.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-semibold line-clamp-2">{a.title}</h2>
                  <p className="mt-1 text-sm text-zinc-600 line-clamp-3">
                    {a.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-3 text-xs text-zinc-500">
                    <span className="truncate">{a.author}</span>
                    <time dateTime={a.publishedAt || undefined}>
                      {formatDate(a.publishedAt)}
                    </time>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination (ẩn khi 1 trang) */}
          {pages > 1 && (
            <>
              <div className="flex items-center justify-center gap-1 mt-8">
                <button
                  className="px-3 border rounded h-9 disabled:opacity-50"
                  disabled={page <= 1 || loading}
                  onClick={() => load(page - 1, q)}
                >
                  ← Trước
                </button>

                {pageList.map((p, i) =>
                  typeof p === "number" ? (
                    <button
                      key={i}
                      className={`h-9 px-3 border rounded ${
                        p === page ? "bg-black text-white" : "hover:bg-zinc-50"
                      }`}
                      disabled={loading}
                      onClick={() => load(p, q)}
                    >
                      {String(p)} {/* chống React nhận NaN */}
                    </button>
                  ) : (
                    <span key={i} className="px-2 text-zinc-500">{p}</span>
                  )
                )}

                <button
                  className="px-3 border rounded h-9 disabled:opacity-50"
                  disabled={page >= pages || loading}
                  onClick={() => load(page + 1, q)}
                >
                  Sau →
                </button>
              </div>

              <p className="mt-2 text-xs text-center text-zinc-500">
                Trang {page}/{pages} • {total} bài
              </p>
            </>
          )}
        </>
      )}
    </main>
  );
}
