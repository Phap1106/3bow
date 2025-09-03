
// // src/app/admin/page.tsx
// "use client";

// import * as React from "react";
// import { useRouter } from "next/navigation";
// import { Search, Eye, Pencil, Trash2, X } from "lucide-react";
// import Modal from "@/components/ui/Modal";
// import PostForm, { PostInput, Post } from "@/components/admin/PostForm";
// import {
//   listArticles,
//   createArticle,
//   updateArticle,
//   deleteArticle,
// } from "@/lib/adminApi";
// import {
//   listSupport,
//   createSupport,
//   deleteSupport,
//   kickSupport,
// } from "@/lib/usersApi";
// import SupportForm from "@/components/admin/SupportForm";
// import AdminSidebar from "@/components/admin/AdminSidebar";

// type Mode = "posts" | "users";
// type Role = "ADMIN" | "SUPPORT_ADMIN";
// const LIMIT = 20;
// const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// // =================== Edit form (inline) ===================
// type SupportUser = {
//   id: string;
//   firstName?: string | null;
//   lastName?: string | null;
//   name?: string | null;
//   email?: string | null;
//   phone?: string | null;
//   numberPhone?: string | null;
//   address?: string | null;
//   session?: boolean | null;
//   kickedAt?: string | null;
// };

// type SupportEditInput = {
//   firstName?: string;
//   lastName?: string;
//   phone?: string;
//   address?: string;
// };

// function EditSupportForm({
//   initial,
//   onCancel,
//   onSubmit,
// }: {
//   initial: SupportUser;
//   onCancel: () => void;
//   onSubmit: (d: SupportEditInput) => Promise<void>;
// }) {
//   const [f, setF] = React.useState<SupportEditInput>({
//     firstName: initial.firstName ?? "",
//     lastName: initial.lastName ?? "",
//     phone: initial.phone ?? initial.numberPhone ?? "",
//     address: initial.address ?? "",
//   });
//   const [loading, setLoading] = React.useState(false);
//   const set = <K extends keyof SupportEditInput>(k: K, v: any) =>
//     setF((s) => ({ ...s, [k]: v }));

//   async function submit(e: React.FormEvent) {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await onSubmit(f);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <form onSubmit={submit} className="space-y-3">
//       <div>
//         <div className="mb-1 text-xs text-zinc-500">Email (không chỉnh sửa)</div>
//         <input
//           disabled
//           value={initial.email ?? ""}
//           className="w-full h-10 px-3 border rounded-lg bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700"
//         />
//       </div>

//       <div className="flex gap-2">
//         <input
//           value={f.firstName}
//           onChange={(e) => set("firstName", e.target.value)}
//           placeholder="First name"
//           className="flex-1 h-10 px-3 border rounded-lg dark:bg-zinc-900 dark:border-zinc-800"
//         />
//         <input
//           value={f.lastName}
//           onChange={(e) => set("lastName", e.target.value)}
//           placeholder="Last name"
//           className="flex-1 h-10 px-3 border rounded-lg dark:bg-zinc-900 dark:border-zinc-800"
//         />
//       </div>

//       <input
//         value={f.phone}
//         onChange={(e) => set("phone", e.target.value)}
//         placeholder="Số điện thoại"
//         className="w-full h-10 px-3 border rounded-lg dark:bg-zinc-900 dark:border-zinc-800"
//       />

//       <input
//         value={f.address}
//         onChange={(e) => set("address", e.target.value)}
//         placeholder="Địa chỉ"
//         className="w-full h-10 px-3 border rounded-lg dark:bg-zinc-900 dark:border-zinc-800"
//       />

//       <div className="flex justify-end gap-2 pt-2">
//         <button
//           type="button"
//           className="h-10 px-4 border rounded-lg border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
//           onClick={onCancel}
//         >
//           Huỷ
//         </button>
//         <button
//           disabled={loading}
//           type="submit"
//           className="h-10 px-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
//         >
//           {loading ? "Đang lưu…" : "Lưu thay đổi"}
//         </button>
//       </div>
//     </form>
//   );
// }
// // =========================================================

// function statusOf(p: Post) {
//   if (!p.publishedAt)
//     return {
//       text: "Nháp",
//       cls: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200",
//     };
//   const pub = new Date(p.publishedAt).getTime();
//   if (pub > Date.now())
//     return {
//       text: "Lên lịch",
//       cls: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
//     };
//   return {
//     text: "Đã đăng",
//     cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
//   };
// }

// export default function AdminPage() {
//   const router = useRouter();

//   // ===== Auth guard =====
//   const [role, setRole] = React.useState<Role | null>(null);
//   const [authLoading, setAuthLoading] = React.useState(true);

//   React.useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         const r = await fetch(`${API}/auth/me`, {
//           credentials: "include",
//           cache: "no-store",
//         });
//         if (!r.ok) throw new Error("unauth");
//         const me = await r.json();
//         if (me.role !== "ADMIN") {
//           router.replace("/supportAdmin");
//           return;
//         }
//         if (mounted) setRole(me.role);
//       } catch {
//         router.replace("/login?next=/admin");
//       } finally {
//         if (mounted) setAuthLoading(false);
//       }
//     })();
//     return () => {
//       mounted = false;
//     };
//   }, [router]);

//   // ===== Posts state =====
//   const [mode, setMode] = React.useState<Mode>("posts");
//   const [q, setQ] = React.useState("");
//   const [items, setItems] = React.useState<Post[]>([]);
//   const [total, setTotal] = React.useState(0);
//   const [page, setPage] = React.useState(1);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState<string | null>(null);

//   const [showForm, setShowForm] = React.useState(false);
//   const [editing, setEditing] = React.useState<Post | null>(null);
//   const [showView, setShowView] = React.useState(false);
//   const [viewing, setViewing] = React.useState<Post | null>(null);
//   const [showConfirm, setShowConfirm] = React.useState(false);
//   const [deleting, setDeleting] = React.useState<Post | null>(null);

//   const loadingPostsRef = React.useRef(false);
//   async function loadPosts(p = 1, keyword = "") {
//     if (loadingPostsRef.current) return;
//     loadingPostsRef.current = true;
//     setLoading(true);
//     setError(null);
//     try {
//       const { items, total } = await listArticles(keyword, p, LIMIT);
//       setItems(items);
//       setTotal(total);
//       setPage(p);
//     } catch (e: any) {
//       setError(e.message || "Load failed");
//     } finally {
//       setLoading(false);
//       loadingPostsRef.current = false;
//     }
//   }
//   React.useEffect(() => {
//     loadPosts(1, "");
//   }, []);

//   // ===== Users state =====
//   const [uq, setUq] = React.useState("");
//   const [users, setUsers] = React.useState<SupportUser[]>([]);
//   const [utotal, setUtotal] = React.useState(0);
//   const [upage, setUpage] = React.useState(1);
//   const [uloading, setUloading] = React.useState(false);
//   const [uerror, setUerror] = React.useState<string | null>(null);
//   const [showCreateSupport, setShowCreateSupport] = React.useState(false);
//   const [editingSupport, setEditingSupport] = React.useState<SupportUser | null>(null);

//   async function loadUsers(p = 1, keyword = "") {
//     setUloading(true);
//     setUerror(null);
//     try {
//       const res = await listSupport(keyword, p, LIMIT);
//       const usersArr: SupportUser[] = Array.isArray(res)
//         ? (res as any)
//         : (res?.items ?? []);
//       const totalNum = Array.isArray(res) ? usersArr.length : res?.total ?? 0;
//       setUsers(usersArr);
//       setUtotal(totalNum);
//       setUpage(p);
//     } catch (e: any) {
//       setUerror(e.message || "Load users failed");
//       setUsers([]);
//     } finally {
//       setUloading(false);
//     }
//   }

//   // gọi trực tiếp API update (không phụ thuộc lib khác)
//   async function updateSupportUser(id: string, data: SupportEditInput) {
//     const r = await fetch(`${API}/auth/support-admin/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify(data),
//     });
//     if (!r.ok) throw new Error(await r.text());
//     return r.json();
//   }

//   function onCreate() {
//     setEditing(null);
//     setShowForm(true);
//   }
//   function onEdit(p: Post) {
//     setEditing(p);
//     setShowForm(true);
//   }
//   function onView(p: Post) {
//     setViewing(p);
//     setShowView(true);
//   }
//   function onAskDelete(p: Post) {
//     setDeleting(p);
//     setShowConfirm(true);
//   }

//   async function handleSubmit(input: PostInput) {
//     try {
//       setLoading(true);
//       if (editing) await updateArticle(editing.id, input);
//       else await createArticle(input);
//       setShowForm(false);
//       setEditing(null);
//       await loadPosts(page, q);
//     } catch (e: any) {
//       alert(e.message || "Save failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleDelete() {
//     if (!deleting) return;
//     try {
//       setLoading(true);
//       await deleteArticle(deleting.id);
//       setShowConfirm(false);
//       setDeleting(null);
//       await loadPosts(page, q);
//     } catch (e: any) {
//       alert(e.message || "Delete failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   const pages = Math.max(1, Math.ceil(total / LIMIT));
//   const upages = Math.max(1, Math.ceil(utotal / LIMIT));
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

//   if (authLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh] text-zinc-500">
//         Đang xác thực…
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
//       {/* Top bar */}
//       <div className="sticky top-0 z-20 border-b bg-white/70 dark:bg-zinc-900/70 backdrop-blur border-zinc-200/70 dark:border-zinc-800/60">
//         <div className="flex items-center justify-between max-w-6xl px-4 py-4 mx-auto">
//           <h1 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
//             Admin
//           </h1>
//         </div>
//       </div>

//       <div className="flex max-w-6xl gap-6 px-4 py-6 mx-auto">
//         <AdminSidebar
//           role={role ?? undefined}
//           active={mode}
//           onGoPosts={() => {
//             setMode("posts");
//             loadPosts(1, q);
//           }}
//           onAddPost={() => {
//             setMode("posts");
//             setEditing(null);
//             setShowForm(true);
//           }}
//           onGoUsers={() => {
//             setMode("users");
//             loadUsers(1, uq);
//           }}
//           onAddSupport={() => {
//             setMode("users");
//             setShowCreateSupport(true);
//           }}
//         />

//         <main className="flex-1">
//           {/* POSTS */}
//           {mode === "posts" && (
//             <>
//               {/* Toolbar */}
//               <div className="flex flex-wrap items-center gap-3 mb-4">
//                 <div className="relative w-full max-w-md">
//                   <input
//                     value={q}
//                     onChange={(e) => setQ(e.target.value)}
//                     placeholder="Tìm tiêu đề / slug / tác giả…"
//                     className="w-full h-10 pl-10 pr-3 bg-white border shadow-sm rounded-xl border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:bg-zinc-900 dark:border-zinc-800"
//                   />
//                   <Search
//                     className="absolute -translate-y-1/2 text-zinc-400 left-3 top-1/2"
//                     size={18}
//                   />
//                 </div>
//                 <button
//                   className="h-10 px-4 border shadow-sm rounded-xl border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
//                   onClick={() => loadPosts(1, q.trim())}
//                   disabled={loading}
//                 >
//                   Tìm
//                 </button>
//                 <button
//                   className="h-10 px-4 text-white bg-indigo-600 shadow-sm rounded-xl hover:bg-indigo-700"
//                   onClick={onCreate}
//                 >
//                   + Thêm bài viết
//                 </button>
//               </div>

//               {/* Table */}
//               <div className="overflow-x-auto bg-white border shadow-sm rounded-2xl border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
//                 {error && (
//                   <div className="p-4 text-sm text-red-600">{error}</div>
//                 )}
//                 {loading && (
//                   <div className="p-4 text-sm text-zinc-500">Đang tải…</div>
//                 )}
//                 {!loading && (
//                   <table className="min-w-full text-sm">
//                     <thead className="text-left border-b text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800">
//                       <tr>
//                         <th className="px-4 py-3 w-[36%]">Bài viết</th>
//                         <th className="px-4 py-3">Slug</th>
//                         <th className="px-4 py-3">Tác giả</th>
//                         <th className="px-4 py-3">Trạng thái</th>
//                         <th className="px-4 py-3">Publish</th>
//                         <th className="px-4 py-3 text-right">Thao tác</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {items.map((p) => {
//                         const st = statusOf(p);
//                         return (
//                           <tr
//                             key={p.id}
//                             className="border-b last:border-b-0 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40"
//                           >
//                             <td className="px-4 py-3">
//                               <div className="flex items-center gap-3">
//                                 <div className="w-12 h-12 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0">
//                                   {p.image && (
//                                     <img
//                                       src={p.image}
//                                       alt=""
//                                       className="object-cover w-full h-full"
//                                     />
//                                   )}
//                                 </div>
//                                 <div>
//                                   <div className="font-medium line-clamp-1">
//                                     {p.title}
//                                   </div>
//                                   <div className="text-zinc-500 line-clamp-1">
//                                     {p.excerpt}
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="px-4 py-3">{p.slug}</td>
//                             <td className="px-4 py-3">{p.author}</td>
//                             <td className="px-4 py-3">
//                               <span
//                                 className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${st.cls}`}
//                               >
//                                 {st.text}
//                               </span>
//                             </td>
//                             <td className="px-4 py-3">
//                               {p.publishedAt
//                                 ? new Date(p.publishedAt).toLocaleString()
//                                 : "—"}
//                             </td>
//                             <td className="px-4 py-3">
//                               <div className="flex justify-end gap-2">
//                                 <button
//                                   onClick={() => onView(p)}
//                                   className="p-2 border rounded-lg border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
//                                   title="Xem"
//                                 >
//                                   <Eye size={18} />
//                                 </button>
//                                 <button
//                                   onClick={() => onEdit(p)}
//                                   className="p-2 border rounded-lg border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
//                                   title="Sửa"
//                                 >
//                                   <Pencil size={18} />
//                                 </button>
//                                 <button
//                                   onClick={() => onAskDelete(p)}
//                                   className="p-2 text-red-600 border rounded-lg border-zinc-200 hover:bg-red-50 dark:border-zinc-800 dark:hover:bg-red-900/20"
//                                   title="Xoá"
//                                 >
//                                   <Trash2 size={18} />
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                       {!items.length && (
//                         <tr>
//                           <td
//                             colSpan={6}
//                             className="px-4 py-10 text-center text-zinc-500"
//                           >
//                             Không có bài viết
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 )}
//               </div>

//               {/* Pagination */}
//               {pages > 1 && (
//                 <div className="flex items-center justify-center gap-1 mt-6">
//                   <button
//                     className="px-3 border rounded h-9 disabled:opacity-50 border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
//                     disabled={page <= 1 || loading}
//                     onClick={() => loadPosts(page - 1, q)}
//                   >
//                     ← Trước
//                   </button>
//                   {pageList(page, pages).map((p, i) =>
//                     typeof p === "number" ? (
//                       <button
//                         key={i}
//                         className={`h-9 px-3 border rounded ${
//                           p === page
//                             ? "bg-indigo-600 text-white border-indigo-600"
//                             : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
//                         }`}
//                         onClick={() => loadPosts(p, q)}
//                       >
//                         {p}
//                       </button>
//                     ) : (
//                       <span key={i} className="px-2 text-zinc-500">
//                         …
// //
//                       </span>
//                     )
//                   )}
//                   <button
//                     className="px-3 border rounded h-9 disabled:opacity-50 border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
//                     disabled={page >= pages || loading}
//                     onClick={() => loadPosts(page + 1, q)}
//                   >
//                     Sau →
//                   </button>
//                 </div>
//               )}
//             </>
//           )}

//           {/* USERS */}
//           {mode === "users" && (
//             <>
//               <div className="flex flex-wrap items-center gap-3 mb-4">
//                 <div className="relative w-full max-w-md">
//                   <input
//                     value={uq}
//                     onChange={(e) => setUq(e.target.value)}
//                     placeholder="Tìm tên / email / SĐT…"
//                     className="w-full h-10 pl-10 pr-3 bg-white border shadow-sm rounded-xl border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:bg-zinc-900 dark:border-zinc-800"
//                   />
//                   <Search
//                     className="absolute -translate-y-1/2 text-zinc-400 left-3 top-1/2"
//                     size={18}
//                   />
//                 </div>
//                 <button
//                   className="h-10 px-4 border shadow-sm rounded-xl border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
//                   onClick={() => loadUsers(1, uq.trim())}
//                   disabled={uloading}
//                 >
//                   Tìm
//                 </button>
//                 <button
//                   className="h-10 px-4 text-white bg-indigo-600 shadow-sm rounded-xl hover:bg-indigo-700"
//                   onClick={() => setShowCreateSupport(true)}
//                 >
//                   + Thêm supportAdmin
//                 </button>
//               </div>

//               <div className="overflow-x-auto bg-white border shadow-sm rounded-2xl border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
//                 {uerror && (
//                   <div className="p-4 text-sm text-red-600">{uerror}</div>
//                 )}
//                 {uloading && (
//                   <div className="p-4 text-sm text-zinc-500">Đang tải…</div>
//                 )}
//                 {!uloading && (
//                   <table className="min-w-full text-sm">
//                     <thead className="text-left border-b text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800">
//                       <tr>
//                         <th className="px-4 py-3 w-[30%]">Người dùng</th>
//                         <th className="px-4 py-3">Email</th>
//                         <th className="px-4 py-3">SĐT</th>
//                         <th className="px-4 py-3">Trạng thái</th>
//                         <th className="px-4 py-3 text-right">Thao tác</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {(users ?? []).map((u) => {
//                         const fullName =
//                           (u.firstName || u.lastName)
//                             ? `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim()
//                             : u.name ?? "—";
//                         const phone = u.numberPhone ?? u.phone ?? "—";
//                         const status = u.session
//                           ? "Đang hoạt động"
//                           : u.kickedAt
//                           ? "Đã kick"
//                           : "—";

//                         return (
//                           <tr
//                             key={u.id}
//                             className="border-b last:border-b-0 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40"
//                           >
//                             <td className="px-4 py-3">{fullName}</td>
//                             <td className="px-4 py-3">{u.email ?? "—"}</td>
//                             <td className="px-4 py-3">{phone}</td>
//                             <td className="px-4 py-3">{status}</td>
//                             <td className="px-4 py-3">
//                               <div className="flex justify-end gap-2">
//                                 <button
//                                   className="p-2 border rounded-lg border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
//                                   title="Sửa"
//                                   onClick={() => setEditingSupport(u)}
//                                 >
//                                   <Pencil size={16} />
//                                 </button>
//                                 <button
//                                   className="p-2 border rounded-lg border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
//                                   title="Đăng xuất user này"
//                                   onClick={async () => {
//                                     await kickSupport(u.id);
//                                     await loadUsers(upage, uq);
//                                   }}
//                                 >
//                                   <X size={16} />
//                                 </button>
//                                 <button
//                                   className="p-2 text-red-600 border rounded-lg border-zinc-200 hover:bg-red-50 dark:border-zinc-800 dark:hover:bg-red-900/20"
//                                   title="Xoá"
//                                   onClick={async () => {
//                                     if (confirm("Xoá user này?")) {
//                                       await deleteSupport(u.id);
//                                       await loadUsers(upage, uq);
//                                     }
//                                   }}
//                                 >
//                                   <Trash2 size={18} />
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                       {(!users || users.length === 0) && (
//                         <tr>
//                           <td
//                             colSpan={5}
//                             className="px-4 py-10 text-center text-zinc-500"
//                           >
//                             Không có supportAdmin
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 )}
//               </div>

//               {upages > 1 && (
//                 <div className="flex items-center justify-center gap-1 mt-6">
//                   <button
//                     className="px-3 border rounded h-9 disabled:opacity-50 border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
//                     disabled={upage <= 1 || uloading}
//                     onClick={() => loadUsers(upage - 1, uq)}
//                   >
//                     ← Trước
//                   </button>
//                   {pageList(upage, upages).map((p, i) =>
//                     typeof p === "number" ? (
//                       <button
//                         key={i}
//                         className={`h-9 px-3 border rounded ${
//                           p === upage
//                             ? "bg-indigo-600 text-white border-indigo-600"
//                             : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
//                         }`}
//                         onClick={() => loadUsers(p, uq)}
//                       >
//                         {p}
//                       </button>
//                     ) : (
//                       <span key={i} className="px-2 text-zinc-500">
//                         …
//                       </span>
//                     )
//                   )}
//                   <button
//                     className="px-3 border rounded h-9 disabled:opacity-50 border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
//                     disabled={upage >= upages || uloading}
//                     onClick={() => loadUsers(upage + 1, uq)}
//                   >
//                     Sau →
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </main>
//       </div>

//       {/* Modals */}
//       <Modal
//         open={showForm}
//         onClose={() => {
//           setShowForm(false);
//           setEditing(null);
//         }}
//         title={editing ? "Sửa bài viết" : "Thêm bài viết"}
//         size="md"
//       >
//         <PostForm
//           initial={editing ?? undefined}
//           onCancel={() => {
//             setShowForm(false);
//             setEditing(null);
//           }}
//           onSubmit={handleSubmit}
//         />
//       </Modal>

//       <Modal
//         open={showView}
//         onClose={() => {
//           setShowView(false);
//           setViewing(null);
//         }}
//         title="Xem bài viết"
//         size="sm"
//       >
//         {viewing && (
//           <div className="space-y-3">
//             <div className="flex items-center justify-between">
//               <div className="text-sm text-zinc-500">ID: {viewing.id}</div>
//               <button
//                 className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
//                 onClick={() => setShowView(false)}
//               >
//                 <X size={18} />
//               </button>
//             </div>
//             {viewing.image && (
//               <img
//                 src={viewing.image}
//                 alt=""
//                 className="object-cover w-full h-48 rounded-xl"
//               />
//             )}
//             <div className="font-medium">{viewing.title}</div>
//             <div className="whitespace-pre-wrap text-zinc-600 dark:text-zinc-300">
//               {viewing.excerpt}
//             </div>
//           </div>
//         )}
//       </Modal>

//       <Modal
//         open={showCreateSupport}
//         onClose={() => setShowCreateSupport(false)}
//         title="Thêm supportAdmin"
//         size="sm"
//       >
//         <SupportForm
//           onCancel={() => setShowCreateSupport(false)}
//           onSubmit={async (d) => {
//             await createSupport(d);
//             setShowCreateSupport(false);
//             if (mode === "users") await loadUsers(upage, uq);
//           }}
//         />
//       </Modal>

//       {/* Modal edit support */}
//       <Modal
//         open={!!editingSupport}
//         onClose={() => setEditingSupport(null)}
//         title="Sửa Support Admin"
//         size="sm"
//       >
//         {editingSupport && (
//           <EditSupportForm
//             initial={editingSupport}
//             onCancel={() => setEditingSupport(null)}
//             onSubmit={async (d) => {
//               await updateSupportUser(editingSupport.id, d);
//               setEditingSupport(null);
//               await loadUsers(upage, uq);
//             }}
//           />
//         )}
//       </Modal>
//     </div>
//   );
// }









// src/app/admin/page.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, Eye, Pencil, Trash2, X } from "lucide-react";
import Modal from "@/components/ui/Modal";
import PostForm, { PostInput, Post } from "@/components/admin/PostForm";
import {
  listArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "@/lib/adminApi";
import {
  listSupport,
  createSupport,
  deleteSupport,
  kickSupport,
} from "@/lib/usersApi";
import SupportForm from "@/components/admin/SupportForm";
import AdminSidebar from "@/components/admin/AdminSidebar";
import LogoutButton from "@/components/common/LogoutButton";


type Mode = "posts" | "users";
type Role = "ADMIN" | "SUPPORT_ADMIN";
const LIMIT = 20;
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// =================== Edit form (inline) ===================
type SupportUser = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  numberPhone?: string | null;
  address?: string | null;
  session?: boolean | null;
  kickedAt?: string | null;
};

type SupportEditInput = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
};

function EditSupportForm({
  initial,
  onCancel,
  onSubmit,
}: {
  initial: SupportUser;
  onCancel: () => void;
  onSubmit: (d: SupportEditInput) => Promise<void>;
}) {
  const [f, setF] = React.useState<SupportEditInput>({
    firstName: initial.firstName ?? "",
    lastName: initial.lastName ?? "",
    phone: initial.phone ?? initial.numberPhone ?? "",
    address: initial.address ?? "",
  });
  const [loading, setLoading] = React.useState(false);
  const set = <K extends keyof SupportEditInput>(k: K, v: any) =>
    setF((s) => ({ ...s, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(f);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <div className="mb-1 text-xs text-zinc-500">Email (không chỉnh sửa)</div>
        <input
          disabled
          value={initial.email ?? ""}
          className="w-full h-10 px-3 border rounded-lg bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700"
        />
      </div>

      <div className="flex gap-2">
        <input
          value={f.firstName}
          onChange={(e) => set("firstName", e.target.value)}
          placeholder="First name"
          className="flex-1 h-10 px-3 border rounded-lg dark:bg-zinc-900 dark:border-zinc-800"
        />
        <input
          value={f.lastName}
          onChange={(e) => set("lastName", e.target.value)}
          placeholder="Last name"
          className="flex-1 h-10 px-3 border rounded-lg dark:bg-zinc-900 dark:border-zinc-800"
        />
      </div>

      <input
        value={f.phone}
        onChange={(e) => set("phone", e.target.value)}
        placeholder="Số điện thoại"
        className="w-full h-10 px-3 border rounded-lg dark:bg-zinc-900 dark:border-zinc-800"
      />

      <input
        value={f.address}
        onChange={(e) => set("address", e.target.value)}
        placeholder="Địa chỉ"
        className="w-full h-10 px-3 border rounded-lg dark:bg-zinc-900 dark:border-zinc-800"
      />

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          className="h-10 px-4 border rounded-lg border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
          onClick={onCancel}
        >
          Huỷ
        </button>
        <button
          disabled={loading}
          type="submit"
          className="h-10 px-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          {loading ? "Đang lưu…" : "Lưu thay đổi"}
        </button>
      </div>
    </form>
  );
}
// =========================================================

function statusOf(p: Post) {
  if (!p.publishedAt)
    return {
      text: "Nháp",
      cls: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200",
    };
  const pub = new Date(p.publishedAt).getTime();
  if (pub > Date.now())
    return {
      text: "Lên lịch",
      cls: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    };
  return {
    text: "Đã đăng",
    cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  };
}

export default function AdminPage() {
  const router = useRouter();

  // ===== Auth guard =====
  const [role, setRole] = React.useState<Role | null>(null);
  const [authLoading, setAuthLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const r = await fetch(`${API}/auth/me`, {
          credentials: "include",
          cache: "no-store",
        });
        if (!r.ok) throw new Error("unauth");
        const me = await r.json();
        if (me.role !== "ADMIN") {
          router.replace("/supportAdmin");
          return;
        }
        if (mounted) setRole(me.role);
      } catch {
        router.replace("/login?next=/admin");
      } finally {
        if (mounted) setAuthLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [router]);

  // ===== Posts state =====
  const [mode, setMode] = React.useState<Mode>("posts");
  const [q, setQ] = React.useState("");
  const [items, setItems] = React.useState<Post[]>([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [showForm, setShowForm] = React.useState(false);
  const [editing, setEditing] = React.useState<Post | null>(null);
  const [showView, setShowView] = React.useState(false);
  const [viewing, setViewing] = React.useState<Post | null>(null);

  // confirm delete
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [deleting, setDeleting] = React.useState<Post | null>(null);

  const loadingPostsRef = React.useRef(false);
  async function loadPosts(p = 1, keyword = "") {
    if (loadingPostsRef.current) return;
    loadingPostsRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const { items, total } = await listArticles(keyword, p, LIMIT);
      setItems(items);
      setTotal(total);
      setPage(p);
    } catch (e: any) {
      setError(e.message || "Load failed");
    } finally {
      setLoading(false);
      loadingPostsRef.current = false;
    }
  }
  React.useEffect(() => {
    loadPosts(1, "");
  }, []);

  // ===== Users state =====
  const [uq, setUq] = React.useState("");
  const [users, setUsers] = React.useState<SupportUser[]>([]);
  const [utotal, setUtotal] = React.useState(0);
  const [upage, setUpage] = React.useState(1);
  const [uloading, setUloading] = React.useState(false);
  const [uerror, setUerror] = React.useState<string | null>(null);
  const [showCreateSupport, setShowCreateSupport] = React.useState(false);
  const [editingSupport, setEditingSupport] = React.useState<SupportUser | null>(null);

  async function loadUsers(p = 1, keyword = "") {
    setUloading(true);
    setUerror(null);
    try {
      const res = await listSupport(keyword, p, LIMIT);
      const usersArr: SupportUser[] = Array.isArray(res)
        ? (res as any)
        : (res?.items ?? []);
      const totalNum = Array.isArray(res) ? usersArr.length : res?.total ?? 0;
      setUsers(usersArr);
      setUtotal(totalNum);
      setUpage(p);
    } catch (e: any) {
      setUerror(e.message || "Load users failed");
      setUsers([]);
    } finally {
      setUloading(false);
    }
  }

  // gọi trực tiếp API update (không phụ thuộc lib khác)
  async function updateSupportUser(id: string, data: SupportEditInput) {
    const r = await fetch(`${API}/auth/support-admin/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  }

  function onCreate() {
    setEditing(null);
    setShowForm(true);
  }
  function onEdit(p: Post) {
    setEditing(p);
    setShowForm(true);
  }
  function onView(p: Post) {
    setViewing(p);
    setShowView(true);
  }
  function onAskDelete(p: Post) {
    setDeleting(p);
    setShowConfirm(true);
  }

  async function handleSubmit(input: PostInput) {
    try {
      setLoading(true);
      if (editing) await updateArticle(editing.id, input);
      else await createArticle(input);
      setShowForm(false);
      setEditing(null);
      await loadPosts(page, q);
    } catch (e: any) {
      alert(e.message || "Save failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!deleting) return;
    try {
      setLoading(true);
      await deleteArticle(deleting.id);
      setShowConfirm(false);
      setDeleting(null);
      await loadPosts(page, q);
    } catch (e: any) {
      alert(e.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  }

  const pages = Math.max(1, Math.ceil(total / LIMIT));
  const upages = Math.max(1, Math.ceil(utotal / LIMIT));
  const pageList = (curr: number, max: number) => {
    const out: (number | string)[] = [];
    const add = (a: number, b: number) => {
      for (let i = a; i <= b; i++) out.push(i);
    };
    if (max <= 7) add(1, max);
    else if (curr <= 4) {
      add(1, 5);
      out.push("…", max);
    } else if (curr >= max - 3) {
      out.push(1, "…");
      add(max - 4, max);
    } else {
      out.push(1, "…", curr - 1, curr, curr + 1, "…", max);
    }
    return out;
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-zinc-500">
        Đang xác thực…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b bg-white/70 dark:bg-zinc-900/70 backdrop-blur border-zinc-200/70 dark:border-zinc-800/60">
        <div className="flex items-center justify-between max-w-6xl px-4 py-4 mx-auto">
          <h1 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
            Admin
          </h1>
          <LogoutButton />
        </div>
      </div>

      <div className="flex max-w-6xl gap-6 px-4 py-6 mx-auto">
        <AdminSidebar
          role={role ?? undefined}
          active={mode}
          onGoPosts={() => {
            setMode("posts");
            loadPosts(1, q);
          }}
          onAddPost={() => {
            setMode("posts");
            setEditing(null);
            setShowForm(true);
          }}
          onGoUsers={() => {
            setMode("users");
            loadUsers(1, uq);
          }}
          onAddSupport={() => {
            setMode("users");
            setShowCreateSupport(true);
          }}
        />

        <main className="flex-1">
          {/* POSTS */}
          {mode === "posts" && (
            <>
              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="relative w-full max-w-md">
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Tìm tiêu đề / slug / tác giả…"
                    className="w-full h-10 pl-10 pr-3 bg-white border shadow-sm rounded-xl border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:bg-zinc-900 dark:border-zinc-800"
                  />
                  <Search
                    className="absolute -translate-y-1/2 text-zinc-400 left-3 top-1/2"
                    size={18}
                  />
                </div>
                <button
                  className="h-10 px-4 border shadow-sm rounded-xl border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                  onClick={() => loadPosts(1, q.trim())}
                  disabled={loading}
                >
                  Tìm
                </button>
                <button
                  className="h-10 px-4 text-white bg-indigo-600 shadow-sm rounded-xl hover:bg-indigo-700"
                  onClick={onCreate}
                >
                  + Thêm bài viết
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto bg-white border shadow-sm rounded-2xl border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
                {error && (
                  <div className="p-4 text-sm text-red-600">{error}</div>
                )}
                {loading && (
                  <div className="p-4 text-sm text-zinc-500">Đang tải…</div>
                )}
                {!loading && (
                  <table className="min-w-full text-sm">
                    <thead className="text-left border-b text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800">
                      <tr>
                        <th className="px-4 py-3 w-[36%]">Bài viết</th>
                        <th className="px-4 py-3">Slug</th>
                        <th className="px-4 py-3">Tác giả</th>
                        <th className="px-4 py-3">Trạng thái</th>
                        <th className="px-4 py-3">Publish</th>
                        <th className="px-4 py-3 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((p) => {
                        const st = statusOf(p);
                        return (
                          <tr
                            key={p.id}
                            className="border-b last:border-b-0 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0">
                                  {p.image && (
                                    <img
                                      src={p.image}
                                      alt=""
                                      className="object-cover w-full h-full"
                                    />
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium line-clamp-1">
                                    {p.title}
                                  </div>
                                  <div className="text-zinc-500 line-clamp-1">
                                    {p.excerpt}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">{p.slug}</td>
                            <td className="px-4 py-3">{p.author}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${st.cls}`}
                              >
                                {st.text}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {p.publishedAt
                                ? new Date(p.publishedAt).toLocaleString()
                                : "—"}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => onView(p)}
                                  className="p-2 border rounded-lg border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                                  title="Xem"
                                >
                                  <Eye size={18} />
                                </button>
                                <button
                                  onClick={() => onEdit(p)}
                                  className="p-2 border rounded-lg border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                                  title="Sửa"
                                >
                                  <Pencil size={18} />
                                </button>
                                <button
                                  onClick={() => onAskDelete(p)}
                                  className="p-2 text-red-600 border rounded-lg border-zinc-200 hover:bg-red-50 dark:border-zinc-800 dark:hover:bg-red-900/20"
                                  title="Xoá"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {!items.length && (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-4 py-10 text-center text-zinc-500"
                          >
                            Không có bài viết
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="flex items-center justify-center gap-1 mt-6">
                  <button
                    className="px-3 border rounded h-9 disabled:opacity-50 border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                    disabled={page <= 1 || loading}
                    onClick={() => loadPosts(page - 1, q)}
                  >
                    ← Trước
                  </button>
                  {pageList(page, pages).map((p, i) =>
                    typeof p === "number" ? (
                      <button
                        key={i}
                        className={`h-9 px-3 border rounded ${
                          p === page
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                        }`}
                        onClick={() => loadPosts(p, q)}
                      >
                        {p}
                      </button>
                    ) : (
                      <span key={i} className="px-2 text-zinc-500">
                        …
                      </span>
                    )
                  )}
                  <button
                    className="px-3 border rounded h-9 disabled:opacity-50 border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                    disabled={page >= pages || loading}
                    onClick={() => loadPosts(page + 1, q)}
                  >
                    Sau →
                  </button>
                </div>
              )}
            </>
          )}

          {/* USERS */}
          {mode === "users" && (
            <>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="relative w-full max-w-md">
                  <input
                    value={uq}
                    onChange={(e) => setUq(e.target.value)}
                    placeholder="Tìm tên / email / SĐT…"
                    className="w-full h-10 pl-10 pr-3 bg-white border shadow-sm rounded-xl border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:bg-zinc-900 dark:border-zinc-800"
                  />
                  <Search
                    className="absolute -translate-y-1/2 text-zinc-400 left-3 top-1/2"
                    size={18}
                  />
                </div>
                <button
                  className="h-10 px-4 border shadow-sm rounded-xl border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                  onClick={() => loadUsers(1, uq.trim())}
                  disabled={uloading}
                >
                  Tìm
                </button>
                <button
                  className="h-10 px-4 text-white bg-indigo-600 shadow-sm rounded-xl hover:bg-indigo-700"
                  onClick={() => setShowCreateSupport(true)}
                >
                  + Thêm supportAdmin
                </button>
              </div>

              <div className="overflow-x-auto bg-white border shadow-sm rounded-2xl border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
                {uerror && (
                  <div className="p-4 text-sm text-red-600">{uerror}</div>
                )}
                {uloading && (
                  <div className="p-4 text-sm text-zinc-500">Đang tải…</div>
                )}
                {!uloading && (
                  <table className="min-w-full text-sm">
                    <thead className="text-left border-b text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800">
                      <tr>
                        <th className="px-4 py-3 w-[30%]">Người dùng</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">SĐT</th>
                        <th className="px-4 py-3">Trạng thái</th>
                        <th className="px-4 py-3 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(users ?? []).map((u) => {
                        const fullName =
                          (u.firstName || u.lastName)
                            ? `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim()
                            : u.name ?? "—";
                        const phone = u.numberPhone ?? u.phone ?? "—";
                        const status = u.session
                          ? "Đang hoạt động"
                          : u.kickedAt
                          ? "Đã kick"
                          : "—";

                        return (
                          <tr
                            key={u.id}
                            className="border-b last:border-b-0 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40"
                          >
                            <td className="px-4 py-3">{fullName}</td>
                            <td className="px-4 py-3">{u.email ?? "—"}</td>
                            <td className="px-4 py-3">{phone}</td>
                            <td className="px-4 py-3">{status}</td>
                            <td className="px-4 py-3">
                              <div className="flex justify-end gap-2">
                                <button
                                  className="p-2 border rounded-lg border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                                  title="Sửa"
                                  onClick={() => setEditingSupport(u)}
                                >
                                  <Pencil size={16} />
                                </button>
                                <button
                                  className="p-2 border rounded-lg border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                                  title="Đăng xuất user này"
                                  onClick={async () => {
                                    await kickSupport(u.id);
                                    await loadUsers(upage, uq);
                                  }}
                                >
                                  <X size={16} />
                                </button>
                                <button
                                  className="p-2 text-red-600 border rounded-lg border-zinc-200 hover:bg-red-50 dark:border-zinc-800 dark:hover:bg-red-900/20"
                                  title="Xoá"
                                  onClick={async () => {
                                    if (confirm("Xoá user này?")) {
                                      await deleteSupport(u.id);
                                      await loadUsers(upage, uq);
                                    }
                                  }}
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {(!users || users.length === 0) && (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-4 py-10 text-center text-zinc-500"
                          >
                            Không có supportAdmin
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              {upages > 1 && (
                <div className="flex items-center justify-center gap-1 mt-6">
                  <button
                    className="px-3 border rounded h-9 disabled:opacity-50 border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                    disabled={upage <= 1 || uloading}
                    onClick={() => loadUsers(upage - 1, uq)}
                  >
                    ← Trước
                  </button>
                  {pageList(upage, upages).map((p, i) =>
                    typeof p === "number" ? (
                      <button
                        key={i}
                        className={`h-9 px-3 border rounded ${
                          p === upage
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                        }`}
                        onClick={() => loadUsers(p, uq)}
                      >
                        {p}
                      </button>
                    ) : (
                      <span key={i} className="px-2 text-zinc-500">
                        …
                      </span>
                    )
                  )}
                  <button
                    className="px-3 border rounded h-9 disabled:opacity-50 border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                    disabled={upage >= upages || uloading}
                    onClick={() => loadUsers(upage + 1, uq)}
                  >
                    Sau →
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Modals */}
      <Modal
        open={showForm}
        onClose={() => {
          setShowForm(false);
          setEditing(null);
        }}
        title={editing ? "Sửa bài viết" : "Thêm bài viết"}
        size="md"
      >
        <PostForm
          initial={editing ?? undefined}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSubmit={handleSubmit}
        />
      </Modal>

      <Modal
        open={showView}
        onClose={() => {
          setShowView(false);
          setViewing(null);
        }}
        title="Xem bài viết"
        size="sm"
      >
        {viewing && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-zinc-500">ID: {viewing.id}</div>
              <button
                className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={() => setShowView(false)}
              >
                <X size={18} />
              </button>
            </div>
            {viewing.image && (
              <img
                src={viewing.image}
                alt=""
                className="object-cover w-full h-48 rounded-xl"
              />
            )}
            <div className="font-medium">{viewing.title}</div>
            <div className="whitespace-pre-wrap text-zinc-600 dark:text-zinc-300">
              {viewing.excerpt}
            </div>
          </div>
        )}
      </Modal>

      {/* ✅ Confirm delete Modal */}
      <Modal
        open={showConfirm}
        onClose={() => {
          setShowConfirm(false);
          setDeleting(null);
        }}
        title="Xoá bài viết"
        size="sm"
      >
        <div className="space-y-4">
          <div className="text-sm">
            Bạn có chắc muốn xoá bài viết
            {!!deleting && <b> “{deleting.title}”</b>}?
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setShowConfirm(false);
                setDeleting(null);
              }}
              className="px-4 py-2 border rounded-lg"
            >
              Huỷ
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-white bg-red-600 rounded-lg"
            >
              Xoá
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={showCreateSupport}
        onClose={() => setShowCreateSupport(false)}
        title="Thêm supportAdmin"
        size="sm"
      >
        <SupportForm
          onCancel={() => setShowCreateSupport(false)}
          onSubmit={async (d) => {
            await createSupport(d);
            setShowCreateSupport(false);
            if (mode === "users") await loadUsers(upage, uq);
          }}
        />
      </Modal>

      {/* Modal edit support */}
      <Modal
        open={!!editingSupport}
        onClose={() => setEditingSupport(null)}
        title="Sửa Support Admin"
        size="sm"
      >
        {editingSupport && (
          <EditSupportForm
            initial={editingSupport}
            onCancel={() => setEditingSupport(null)}
            onSubmit={async (d) => {
              await updateSupportUser(editingSupport.id, d);
              setEditingSupport(null);
              await loadUsers(upage, uq);
            }}
          />
        )}
      </Modal>
    </div>
  );
}
