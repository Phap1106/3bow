// // components/admin/PostForm.tsx
// "use client";
// import * as React from "react";

// export type Post = {
//   id: string;
//   slug: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   author: string;
//   publishedAt: string; // ISO string or ""
//   image: string;
// };

// export type PostInput = Omit<Post, "id">;

// function slugify(input: string) {
//   return input
//     .toLowerCase()
//     .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)+/g, "");
// }

// // ISO ↔ input[type=datetime-local]
// function isoToLocalValue(iso?: string) {
//   if (!iso) return "";
//   const d = new Date(iso);
//   if (Number.isNaN(d.getTime())) return "";
//   const pad = (n: number) => String(n).padStart(2, "0");
//   const yyyy = d.getFullYear();
//   const MM = pad(d.getMonth() + 1);
//   const dd = pad(d.getDate());
//   const hh = pad(d.getHours());
//   const mm = pad(d.getMinutes());
//   return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
// }
// function localValueToISO(local: string) {
//   if (!local) return "";
//   // local = "YYYY-MM-DDTHH:mm" (local timezone)
//   const d = new Date(local);
//   if (Number.isNaN(d.getTime())) return "";
//   return d.toISOString();
// }

// export default function PostForm({
//   initial,
//   onSubmit,
//   onCancel,
// }: {
//   initial?: Post;
//   onSubmit: (input: PostInput) => void;
//   onCancel: () => void;
// }) {
//   const [title, setTitle] = React.useState(initial?.title ?? "");
//   const [slug, setSlug] = React.useState(initial?.slug ?? "");
//   const [excerpt, setExcerpt] = React.useState(initial?.excerpt ?? "");
//   const [content, setContent] = React.useState(initial?.content ?? "");
//   const [author, setAuthor] = React.useState(initial?.author ?? "");
//   const [publishedAtLocal, setPublishedAtLocal] = React.useState(
//     isoToLocalValue(initial?.publishedAt || "")
//   );
//   const [image, setImage] = React.useState(initial?.image ?? "");

//   const [saving, setSaving] = React.useState(false);
//   const [errors, setErrors] = React.useState<string | null>(null);

//   // Auto slug if empty
//   React.useEffect(() => {
//     if (!initial && title && !slug) {
//       setSlug(slugify(title));
//     }
//   }, [title, slug, initial]);

//   function validate(): string | null {
//     if (!title.trim()) return "Tiêu đề bắt buộc.";
//     if (!slug.trim()) return "Slug bắt buộc.";
//     if (!excerpt.trim()) return "Mô tả ngắn bắt buộc.";
//     if (!content.trim()) return "Nội dung bắt buộc.";
//     if (!author.trim()) return "Tác giả bắt buộc.";
//     // publishedAt optional
//     return null;
//   }

//   function submit(e: React.FormEvent) {
//     e.preventDefault();
//     const msg = validate();
//     if (msg) { setErrors(msg); return; }
//     setSaving(true);
//     onSubmit({
//       slug: slug.trim(),
//       title: title.trim(),
//       excerpt,
//       content,
//       author: author.trim(),
//       publishedAt: localValueToISO(publishedAtLocal),
//       image: image.trim(),
//     });
//     setSaving(false);
//   }

//   return (
//     <form onSubmit={submit} className="space-y-4">
//       {errors && (
//         <div className="text-sm text-red-600">{errors}</div>
//       )}

//       <div className="grid gap-2">
//         <label className="text-sm text-zinc-600 dark:text-zinc-300">Tiêu đề</label>
//         <input
//           value={title} onChange={(e) => setTitle(e.target.value)}
//           className="h-10 px-3 bg-white border outline-none rounded-xl border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900"
//           placeholder="Tiêu đề bài viết"
//         />
//       </div>

//       <div className="grid gap-2">
//         <div className="flex items-center justify-between">
//           <label className="text-sm text-zinc-600 dark:text-zinc-300">Slug</label>
//           <button
//             type="button"
//             onClick={() => setSlug(slugify(title || slug))}
//             className="px-2 py-1 text-xs border rounded-lg border-zinc-300 dark:border-zinc-700"
//           >
//             Tạo từ tiêu đề
//           </button>
//         </div>
//         <input
//           value={slug} onChange={(e) => setSlug(e.target.value)}
//           className="h-10 px-3 bg-white border outline-none rounded-xl border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900"
//           placeholder="vd: opentelemetry-next-nest-end-to-end"
//         />
//       </div>

//       <div className="grid gap-2">
//         <label className="text-sm text-zinc-600 dark:text-zinc-300">Mô tả ngắn</label>
//         <textarea
//           value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
//           className="min-h-[80px] rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 outline-none"
//           placeholder="Tóm tắt nội dung…"
//         />
//       </div>

//       <div className="grid gap-2">
//         <label className="text-sm text-zinc-600 dark:text-zinc-300">Nội dung</label>
//         <textarea
//           value={content} onChange={(e) => setContent(e.target.value)}
//           className="min-h-[160px] font-mono text-[13px] rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 outline-none"
//           placeholder="Markdown/Plain text…"
//         />
//       </div>

//       <div className="grid gap-2 md:grid-cols-2">
//         <div className="grid gap-2">
//           <label className="text-sm text-zinc-600 dark:text-zinc-300">Tác giả</label>
//           <input
//             value={author} onChange={(e) => setAuthor(e.target.value)}
//             className="h-10 px-3 bg-white border outline-none rounded-xl border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900"
//             placeholder="Tên tác giả"
//           />
//         </div>
//         <div className="grid gap-2">
//           <label className="text-sm text-zinc-600 dark:text-zinc-300">Publish (datetime)</label>
//           <input
//             type="datetime-local"
//             value={publishedAtLocal}
//             onChange={(e) => setPublishedAtLocal(e.target.value)}
//             className="h-10 px-3 bg-white border outline-none rounded-xl border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900"
//           />
//         </div>
//       </div>

//       <div className="grid gap-2">
//         <label className="text-sm text-zinc-600 dark:text-zinc-300">Ảnh bìa (URL)</label>
//         <input
//           value={image} onChange={(e) => setImage(e.target.value)}
//           className="h-10 px-3 bg-white border outline-none rounded-xl border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900"
//           placeholder="https://…"
//         />
//         {image ? (
//           // eslint-disable-next-line @next/next/no-img-element
//           <img src={image} alt="" className="object-cover w-full h-40 mt-2 rounded-xl" />
//         ) : null}
//       </div>

//       <div className="flex justify-end gap-2 pt-2">
//         <button type="button" onClick={onCancel} className="h-10 px-4 border rounded-xl border-zinc-300 dark:border-zinc-700">
//           Hủy
//         </button>
//         <button disabled={saving} className="h-10 px-4 text-white bg-black rounded-xl hover:opacity-90 disabled:opacity-50">
//           {initial ? "Lưu thay đổi" : "Tạo mới"}
//         </button>
//       </div>
//     </form>
//   );
// }



"use client";

import * as React from "react";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt?: string; // ISO | undefined
  image: string;
};

export type PostInput = Omit<Post, "id">;

export default function PostForm(props: {
  initial?: Post;
  onSubmit: (input: PostInput) => void | Promise<void>;
  onCancel: () => void;
}) {
  const [title, setTitle] = React.useState(props.initial?.title ?? "");
  const [slug, setSlug] = React.useState(props.initial?.slug ?? "");
  const [excerpt, setExcerpt] = React.useState(props.initial?.excerpt ?? "");
  const [content, setContent] = React.useState(props.initial?.content ?? "");
  const [author, setAuthor] = React.useState(props.initial?.author ?? "");
  const [publishedLocal, setPublishedLocal] = React.useState(
    toLocalDatetime(props.initial?.publishedAt)
  );
  const [image, setImage] = React.useState(props.initial?.image ?? "");
  const [saving, setSaving] = React.useState(false);

  // Reset state khi đổi bài đang chỉnh sửa
  React.useEffect(() => {
    setTitle(props.initial?.title ?? "");
    setSlug(props.initial?.slug ?? "");
    setExcerpt(props.initial?.excerpt ?? "");
    setContent(props.initial?.content ?? "");
    setAuthor(props.initial?.author ?? "");
    setPublishedLocal(toLocalDatetime(props.initial?.publishedAt));
    setImage(props.initial?.image ?? "");
  }, [props.initial]);

  function makeSlug() {
    setSlug(
      title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    );
  }

  async function submit() {
    if (!title.trim() || !slug.trim() || !excerpt.trim() || !content.trim() || !author.trim() || !image.trim()) {
      alert("Vui lòng điền đủ các trường bắt buộc.");
      return;
    }
    const payload: PostInput = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      author: author.trim(),
      image: image.trim(),
      publishedAt: publishedLocal ? toISO(publishedLocal) : undefined,
    };
    setSaving(true);
    try {
      await props.onSubmit(payload);
    } finally {
      setSaving(false);
    }
  }

  return (
    // ✅ KHUNG: giới hạn chiều rộng & chiều cao, nội dung cuộn bên trong
    <div className="w-[min(720px,calc(100vw-2rem))] max-h-[80vh] flex flex-col">
      {/* BODY cuộn */}
      <div className="flex-1 pr-1 space-y-4 overflow-y-auto">
        <div>
          <label className="block mb-1 text-sm">Tiêu đề</label>
          <input
            className="w-full h-10 px-3 border rounded-xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Slug</label>
          <div className="flex gap-2">
            <input
              className="w-full h-10 px-3 border rounded-xl"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            <button type="button" onClick={makeSlug} className="px-3 border rounded-xl">
              Tạo từ tiêu đề
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm">Mô tả ngắn</label>
          <textarea
            className="w-full px-3 py-2 border rounded-xl resize-y min-h-[96px]"
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Nội dung</label>
          <textarea
            className="w-full px-3 py-2 border rounded-xl resize-y min-h-[160px] font-mono text-sm"
            placeholder="Plain text… (xuống dòng sẽ được giữ nguyên)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm">Tác giả</label>
            <input
              className="w-full h-10 px-3 border rounded-xl"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Publish (datetime)</label>
            <input
              type="datetime-local"
              className="w-full h-10 px-3 border rounded-xl"
              value={publishedLocal}
              onChange={(e) => setPublishedLocal(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm">Ảnh bìa (URL)</label>
          <input
            className="w-full h-10 px-3 border rounded-xl"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          {image && (
            // giới hạn chiều cao để không đẩy form quá lớn
            <img src={image} alt="" className="object-cover w-full h-40 mt-2 rounded-xl" />
          )}
        </div>
      </div>

      {/* FOOTER sticky: luôn thấy nút hành động, không bị trôi */}
      <div className="sticky bottom-0 flex justify-end gap-2 px-1 pt-3 mt-4 -mx-1 border-t bg-white/90 dark:bg-zinc-900/90 backdrop-blur border-zinc-200 dark:border-zinc-800">
        <button onClick={props.onCancel} className="h-10 px-4 border rounded-xl">
          Hủy
        </button>
        <button
          onClick={submit}
          disabled={saving}
          className="h-10 px-4 text-white bg-black rounded-xl disabled:opacity-60"
        >
          {saving ? "Đang lưu…" : props.initial ? "Lưu thay đổi" : "Thêm mới"}
        </button>
      </div>
    </div>
  );
}

/** ISO -> 'YYYY-MM-DDTHH:mm' cho input datetime-local */
function toLocalDatetime(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(
    d.getMinutes()
  )}`;
}

/** 'YYYY-MM-DDTHH:mm' -> ISO */
function toISO(local: string) {
  const dt = new Date(local);
  return isNaN(dt.getTime()) ? undefined : dt.toISOString();
}
