// app/news/[slug]/page.tsx
import SiteShell from "@/components/siteHeaderFooter";
import { getAllNews, getNewsBySlug } from "../_data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllNews().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = getNewsBySlug(params.slug);
  return {
    title: item ? `${item.title} • 3BOW` : "Bài viết • 3BOW",
    description: item?.excerpt ?? "Chi tiết bài viết",
    openGraph: item
      ? {
          title: item.title,
          description: item.excerpt,
          images: [{ url: item.image }],
        }
      : undefined,
  };
}

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

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const item = getNewsBySlug(params.slug);
  if (!item) return notFound();

  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-4xl font-bold">{item.title}</h1>
          <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
            <span>{item.author}</span> • <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800">
          <img src={item.image} alt={item.title} className="w-full object-cover" />
        </div>

        <div className="prose dark:prose-invert prose-zinc mt-6">
          {item.content.split("\n").map((p, idx) => (
            <p key={idx}>{p.trim()}</p>
          ))}
        </div>
      </article>
    </SiteShell>
  );
}
