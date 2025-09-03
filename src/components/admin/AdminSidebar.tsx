// "use client";
// import * as React from "react";
// import { FileText, PlusCircle, Users, UserPlus2 } from "lucide-react";

// export default function AdminSidebar({
//   active,
//   onGoPosts,
//   onAddPost,
//   onGoUsers,
//   onAddSupport,
// }: {
//   active: "posts" | "users";
//   onGoPosts: () => void;
//   onAddPost: () => void;
//   onGoUsers: () => void;
//   onAddSupport: () => void;
// }) {
//   const Item = ({
//     active, onClick, icon: Icon, children,
//   }: { active?: boolean; onClick: () => void; icon: any; children: React.ReactNode }) => (
//     <button
//       onClick={onClick}
//       className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left
//       border border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800
//       ${active ? "bg-black text-white hover:opacity-90" : "text-zinc-800 dark:text-zinc-200"}`}
//     >
//       <Icon size={16} />
//       <span className="text-sm">{children}</span>
//     </button>
//   );

//   return (
//     <aside className="w-[240px] shrink-0 h-[calc(100vh-64px)] sticky top-[64px] p-3
//       border-r border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur">
//       <div className="px-1 mb-2 text-xs uppercase text-zinc-500 dark:text-zinc-400">Bài viết</div>
//       <div className="space-y-2">
//         <Item active={active==="posts"} onClick={onGoPosts} icon={FileText}>Quản lý bài viết</Item>
//         <Item onClick={onAddPost} icon={PlusCircle}>Thêm bài viết</Item>
//       </div>

//       <div className="px-1 mt-5 mb-2 text-xs uppercase text-zinc-500 dark:text-zinc-400">Support</div>
//       <div className="space-y-2">
//         <Item active={active==="users"} onClick={onGoUsers} icon={Users}>Quản lý supportAdmin</Item>
//         <Item onClick={onAddSupport} icon={UserPlus2}>Thêm supportAdmin</Item>
//       </div>
//     </aside>
//   );
// }


// // components/admin/AdminSidebar.tsx
// export default function AdminSidebar({ active, onGoPosts, onAddPost, onGoUsers, onAddSupport }: {
//   active: "posts" | "users";
//   onGoPosts: () => void;
//   onAddPost: () => void;
//   onGoUsers: () => void;
//   onAddSupport: () => void;
// }) {
//   return (
//     <aside className="w-64 p-4">
//       <button onClick={onGoPosts} className={active==='posts'?'font-semibold':''}>Quản lý bài viết</button>
//       <button onClick={onAddPost}>+ Thêm bài viết</button>
//       <button onClick={onGoUsers} className={active==='users'?'font-semibold':''}>Quản lý supportAdmin</button>
//       <button onClick={onAddSupport}>+ Thêm supportAdmin</button>
//     </aside>
//   );
// }




// "use client";

// import * as React from "react";
// import {
//   FileText,
//   PlusCircle,
//   Users,
//   UserPlus2,
//   type LucideIcon,
// } from "lucide-react";

// export default function AdminSidebar({
//   active,
//   onGoPosts,
//   onAddPost,
//   onGoUsers,
//   onAddSupport,
// }: {
//   active: "posts" | "users";
//   onGoPosts: () => void;
//   onAddPost: () => void;
//   onGoUsers: () => void;
//   onAddSupport: () => void;
// }) {
//   const Item = ({
//     active,
//     onClick,
//     icon: Icon,
//     children,
//   }: {
//     active?: boolean;
//     onClick: () => void;
//     icon: LucideIcon;
//     children: React.ReactNode;
//   }) => (
//     <button
//       onClick={onClick}
//       className={[
//         "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors",
//         "border border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800",
//         "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/40",
//         "focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-700/50",
//         active ? "bg-black text-white hover:opacity-90" : "text-zinc-800 dark:text-zinc-200",
//       ].join(" ")}
//     >
//       <Icon size={16} />
//       <span className="text-sm">{children}</span>
//     </button>
//   );

//   return (
//     <aside
//       className="w-[240px] shrink-0 h-[calc(100vh-64px)] sticky top-[64px] p-3
//                  border-r border-zinc-200 dark:border-zinc-800
//                  bg-white/70 dark:bg-zinc-900/70 backdrop-blur"
//     >
//       <div className="px-1 mb-2 text-xs tracking-wide uppercase text-zinc-500 dark:text-zinc-400">
//         Bài viết
//       </div>
//       <div className="space-y-2">
//         <Item active={active === "posts"} onClick={onGoPosts} icon={FileText}>
//           Quản lý bài viết
//         </Item>
//         <Item onClick={onAddPost} icon={PlusCircle}>
//           Thêm bài viết
//         </Item>
//       </div>

//       <div className="px-1 mt-5 mb-2 text-xs tracking-wide uppercase text-zinc-500 dark:text-zinc-400">
//         Support
//       </div>
//       <div className="space-y-2">
//         <Item active={active === "users"} onClick={onGoUsers} icon={Users}>
//           Quản lý supportAdmin
//         </Item>
//         <Item onClick={onAddSupport} icon={UserPlus2}>
//           Thêm supportAdmin
//         </Item>
//       </div>
//     </aside>
//   );
// }



// src/components/admin/AdminSidebar.tsx
"use client";
import * as React from "react";
import { FileText, PlusCircle, Users, UserPlus2 } from "lucide-react";

type Role = "ADMIN" | "SUPPORT_ADMIN";

type Props = {
  role?: Role | null;                 // cho phép null lúc chưa load xong
  active: "posts" | "users";
  onGoPosts: () => void;
  onAddPost: () => void;
  onGoUsers: () => void;
  onAddSupport: () => void;
};

export default function AdminSidebar({
  role,
  active,
  onGoPosts,
  onAddPost,
  onGoUsers,
  onAddSupport,
}: Props) {
  const Btn = ({
    onClick,
    active,
    children,
  }: React.PropsWithChildren<{ onClick: () => void; active?: boolean }>) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left border ${
        active
          ? "bg-zinc-900 text-white border-zinc-900"
          : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
      }`}
    >
      {children}
    </button>
  );

  return (
    <aside className="w-64 p-4 border-r border-zinc-200 dark:border-zinc-800">
      <div className="mb-2 text-xs uppercase text-zinc-500">Bài viết</div>
      <div className="space-y-2">
        <Btn onClick={onGoPosts} active={active === "posts"}>
          <FileText size={16} /> Quản lý bài viết
        </Btn>
        <button
          onClick={onAddPost}
          className="flex items-center w-full gap-2 px-3 py-2 text-white bg-black rounded-lg hover:opacity-90"
        >
          <PlusCircle size={16} /> Thêm bài viết
        </button>
      </div>

      <div className="mt-6 mb-2 text-xs uppercase text-zinc-500">Support</div>
      <div className="space-y-2">
        <Btn onClick={onGoUsers} active={active === "users"}>
          <Users size={16} /> Quản lý supportAdmin
        </Btn>

        {/* chỉ ADMIN mới thấy */}
        {role === "ADMIN" && (
          <button
            onClick={onAddSupport}
            className="flex items-center w-full gap-2 px-3 py-2 text-white bg-black rounded-lg hover:opacity-90"
          >
            <UserPlus2 size={16} /> Thêm supportAdmin
          </button>
        )}
      </div>
    </aside>
  );
}
