// app/news/_client.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getAllNews } from "./_data";

const PAGE_SIZE = 6; // 2 hàng * 3 cột

const cx = (...s: (string | false | undefined)[]) =>
  s.filter(Boolean).join(" ");

function formatDate(v: string) {
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(v));
  } catch {
    return v;
  }
}

export default function NewsClient() {
  const items = getAllNews();
  const sp = useSearchParams();

  const raw = Number(sp.get("page") || "1");
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const page = Math.min(Math.max(raw, 1), totalPages);

  const start = (page - 1) * PAGE_SIZE;
  const current = items.slice(start, start + PAGE_SIZE);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">
        Tin tức công nghệ
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {current.map((n) => (
          <Link
            key={n.id}
            href={`/news/${n.slug}`}
            className="group overflow-hidden rounded-2xl border border-zinc-200/60 bg-white dark:bg-zinc-900 dark:border-zinc-800 hover:shadow-md transition-shadow"
          >
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={n.image}
                alt={n.title}
                className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
                loading="lazy"
              />
            </div>

            <div className="p-4">
              <h2 className="text-base md:text-lg font-semibold line-clamp-2">
                {n.title}
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">
                {n.excerpt}
              </p>

              <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span>{n.author}</span>
                <time dateTime={n.publishedAt}>
                  {formatDate(n.publishedAt)}
                </time>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} />
    </section>
  );
}

function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const href = (p: number) => `/news?page=${p}`;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <Link
        href={href(Math.max(1, page - 1))}
        aria-disabled={page <= 1}
        className={cx(
          "h-9 px-3 inline-flex items-center rounded-lg border border-zinc-200/60 dark:border-zinc-800",
          "text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/60",
          page <= 1 && "pointer-events-none opacity-50"
        )}
      >
        Trước
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === page ? "page" : undefined}
          className={cx(
            "h-9 w-9 grid place-items-center rounded-lg border text-sm",
            "border-zinc-200/60 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60",
            p === page && "bg-black text-white dark:bg-white dark:text-black"
          )}
        >
          {p}
        </Link>
      ))}

      <Link
        href={href(Math.min(totalPages, page + 1))}
        aria-disabled={page >= totalPages}
        className={cx(
          "h-9 px-3 inline-flex items-center rounded-lg border border-zinc-200/60 dark:border-zinc-800",
          "text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/60",
          page >= totalPages && "pointer-events-none opacity-50"
        )}
      >
        Sau
      </Link>
    </nav>
  );
}
