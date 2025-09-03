// // src/app/news/[slug]/page.tsx
// import SiteShell from "@/components/siteHeaderFooter";
// import { notFound } from "next/navigation";
// import { getArticles, getArticleBySlug } from "@/lib/newsApi";

// const FALLBACK_IMG =
//   "https://dummyimage.com/1200x630/e5e7eb/9ca3af&text=3BOW+News";

// export async function generateStaticParams() {
//   const { items } = await getArticles(undefined, 1, 100);
//   return items.map((n) => ({ slug: n.slug }));
// }

// export async function generateMetadata({ params }: { params: { slug: string } }) {
//   try {
//     const a = await getArticleBySlug(params.slug);
//     return {
//       title: `${a.title} • 3BOW`,
//       description: a.excerpt ?? "Chi tiết bài viết",
//       openGraph: {
//         title: a.title,
//         description: a.excerpt ?? "",
//         images: [{ url: a.image || FALLBACK_IMG }],
//       },
//     };
//   } catch {
//     return { title: "Bài viết • 3BOW", description: "Chi tiết bài viết" };
//   }
// }

// // ✅ nhận undefined/null
// function formatDate(v?: string | null) {
//   if (!v) return "—";
//   try {
//     return new Intl.DateTimeFormat("vi-VN", {
//       dateStyle: "medium",
//       timeStyle: "short",
//     }).format(new Date(v));
//   } catch {
//     return v ?? "—";
//   }
// }

// export default async function NewsDetailPage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const a = await getArticleBySlug(params.slug).catch(() => null);
//   if (!a) return notFound();

//   return (
//     <SiteShell>
//       <article className="max-w-3xl px-4 py-8 mx-auto">
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold md:text-4xl">{a.title}</h1>
//           <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
//             <span>{a.author || "—"}</span> •{" "}
//             {/* ✅ dateTime cần string | undefined */}
//             <time dateTime={a.publishedAt ?? undefined}>
//               {formatDate(a.publishedAt)}
//             </time>
//           </div>
//         </div>

//         <div className="overflow-hidden border rounded-2xl border-zinc-200/60 dark:border-zinc-800">
//           <img
//             src={a.image || FALLBACK_IMG}
//             alt={a.title}
//             className="object-cover w-full"
//           />
//         </div>

//         <div className="mt-6 prose whitespace-pre-line dark:prose-invert prose-zinc">
//           {a.content}
//         </div>
//       </article>
//     </SiteShell>
//   );
// }

// src/app/news/[slug]/page.tsx
import SiteShell from "@/components/siteHeaderFooter";
import { notFound } from "next/navigation";
import { getArticles, getArticleBySlug } from "@/lib/newsApi";
import Markdown from "@/components/Markdown";

const FALLBACK_IMG =
  "https://dummyimage.com/1200x630/e5e7eb/9ca3af&text=3BOW+News";

export async function generateStaticParams() {
  const { items } = await getArticles(undefined, 1, 100);
  return items.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const a = await getArticleBySlug(params.slug);
    return {
      title: `${a.title} • 3BOW`,
      description: a.excerpt ?? "Chi tiết bài viết",
      openGraph: {
        title: a.title,
        description: a.excerpt ?? "",
        images: [{ url: a.image || FALLBACK_IMG }],
      },
    };
  } catch {
    return { title: "Bài viết • 3BOW", description: "Chi tiết bài viết" };
  }
}

function formatDate(v?: string | null) {
  if (!v) return "—";
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(v));
  } catch {
    return v ?? "—";
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const a = await getArticleBySlug(params.slug).catch(() => null);
  if (!a) return notFound();

  return (
    <SiteShell>
      <article className="max-w-3xl px-4 py-8 mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold md:text-4xl">{a.title}</h1>
          <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
            <span>{a.author || "—"}</span> •{" "}
            <time dateTime={a.publishedAt ?? undefined}>
              {formatDate(a.publishedAt)}
            </time>
          </div>
        </div>

        <div className="overflow-hidden border rounded-2xl border-zinc-200/60 dark:border-zinc-800">
          <img
            src={a.image || FALLBACK_IMG}
            alt={a.title}
            className="object-cover w-full"
          />
        </div>

        <div className="mt-6">
          <Markdown>{a.content || ""}</Markdown>
        </div>
      </article>
    </SiteShell>
  );
}
