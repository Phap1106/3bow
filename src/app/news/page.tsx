// app/news/page.tsx
// import SiteShell from "@/components/siteHeaderFooter";
// import NewsClient from "./_client";

// export const metadata = {
//   title: "3BOW • Tin tức",
// };

// export default function NewsPage() {
//   return (
//     <SiteShell>
//       <NewsClient />
//     </SiteShell>
//   );
// }

// import Link from "next/link";
// import { getArticles } from "@/lib/api";

// export const metadata = {
//   title: "3BOW • Tin tức",
// };

// export default async function NewsPage() {
//   const items = await getArticles();
//   return (
//     <main className="max-w-3xl p-6 mx-auto">
//       <h1 className="mb-4 text-2xl font-bold">Bài viết</h1>
//       <ul className="space-y-3">
//         {items.map(a => (
//           <li key={a.id} className="p-4 border rounded hover:bg-zinc-50">
//             <Link href={`/news/${a.slug}`} className="font-semibold">{a.title}</Link>
//             <p className="text-sm text-zinc-600">{a.excerpt}</p>
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }

// app/news/page.tsx
// import Link from "next/link";
// import SiteShell from "@/components/siteHeaderFooter";
// import { getArticles } from "@/lib/api";

// export const metadata = {
//   title: "3BOW • Tin tức",
// };

// export default async function NewsPage() {
//   const items = await getArticles();

//   return (
//     <SiteShell>
//       <main className="max-w-3xl p-6 mx-auto">
//         <h1 className="mb-4 text-2xl font-bold">Bài viết</h1>
//         <ul className="space-y-3">
//           {items.map((a) => (
//             <li key={a.id} className="p-4 border rounded hover:bg-zinc-50">
//               <Link href={`/news/${a.slug}`} className="font-semibold">
//                 {a.title}
//               </Link>
//               <p className="text-sm text-zinc-600">{a.excerpt}</p>
//             </li>
//           ))}
//         </ul>
//       </main>
//     </SiteShell>
//   );
// }


// app/news/page.tsx
import SiteShell from "@/components/siteHeaderFooter";
import NewsClient from "./_client";

export const metadata = { title: "3BOW • Tin tức" };

export default function NewsPage() {
  return (
    <SiteShell>
      <NewsClient />
    </SiteShell>
  );
}
