// // src/app/login/page.tsx
// "use client";
// import * as React from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { apiPost } from "@/lib/adminApi"; // đảm bảo file này có apiPost với credentials:'include'

// export default function LoginPage() {
//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [loading, setLoading] = React.useState(false);
//   const [error, setError] = React.useState<string | null>(null);
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   async function onSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);
//     try {
//       await apiPost("/auth/login", { email, password }); // <<< đổi sang API 4000
//       const next = searchParams.get("next") ?? "/admin";
//       router.replace(next);
//     } catch (e: any) {
//       setError(e?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   }

  // return (
//     <div className="flex items-center justify-center min-h-screen px-4 bg-zinc-50 dark:bg-zinc-950">
//       <div className="w-full max-w-sm p-6 bg-white border shadow-sm rounded-2xl border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
//         <h1 className="mb-4 text-xl font-semibold">Đăng nhập</h1>
//         {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
//         <form className="space-y-3" onSubmit={onSubmit}>
//           <div>
//             <div className="mb-1 text-xs text-zinc-500">Email</div>
//             <input
//               className="w-full h-10 px-3 bg-white border rounded-lg border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               required
//             />
//           </div>
//           <div>
//             <div className="mb-1 text-xs text-zinc-500">Mật khẩu</div>
//             <input
//               className="w-full h-10 px-3 bg-white border rounded-lg border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               required
//             />
//           </div>
//           <button
//             disabled={loading}
//             className="w-full h-10 text-white bg-black rounded-lg hover:opacity-90"
//           >
//             {loading ? "Đang đăng nhập…" : "Đăng nhập"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



// // src/app/login/page.tsx (client)
// "use client";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";

// const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// export default function LoginPage() {
//   const router = useRouter();
//   const next = useSearchParams().get("next") || "/";

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   async function onSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     const r = await fetch(`${API}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include", // nhận cookie
//       body: JSON.stringify({ email, password }),
//     });
//     if (!r.ok) return alert(await r.text());
//     const { user } = await r.json();
//     const target = user.role === "ADMIN" ? "/admin" : "/supportAdmin";
//     router.replace(next.startsWith("/admin") || next.startsWith("/supportAdmin") ? next : target);
//   }

//   return (
//     <form onSubmit={onSubmit} className="max-w-sm py-16 mx-auto space-y-3">
//       <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
//       <input className="input" placeholder="Mật khẩu" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
//       <button className="w-full btn btn-black" type="submit">Đăng nhập</button>
//     </form>
//   );
// }

  





// src/app/login/page.tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export default function LoginPage() {
  const router = useRouter();
  const next = useSearchParams().get("next") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [fieldErr, setFieldErr] = useState<{ email?: string; password?: string }>({});
  const [formErr, setFormErr] = useState("");

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email.trim()) errs.email = "Vui lòng nhập email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Email không hợp lệ.";
    if (!password) errs.password = "Vui lòng nhập mật khẩu.";
    setFieldErr(errs);
    return Object.keys(errs).length === 0;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormErr("");
    if (!validate()) return;

    setLoading(true);
    try {
      const r = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const text = await r.text();
      let data: any = null;
      try { data = text ? JSON.parse(text) : null; } catch {}

      if (!r.ok) {
        // Ưu tiên message từ BE
        setFormErr(data?.message || data?.error || "Đăng nhập thất bại. Vui lòng thử lại.");
        return;
      }

      const user = data?.user ?? data; // phòng khi BE trả trực tiếp user
      const target = user?.role === "ADMIN" ? "/admin" : "/supportAdmin";
      router.replace(
        next.startsWith("/admin") || next.startsWith("/supportAdmin") ? next : target
      );
    } catch {
      setFormErr("Không thể kết nối máy chủ. Kiểm tra lại mạng hoặc server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full max-w-sm p-6 bg-white border shadow-sm rounded-2xl border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="mb-4 text-xl font-semibold">Đăng nhập</h1>

        {formErr && <div className="mb-3 text-sm text-red-600">{formErr}</div>}

        <form className="space-y-3" onSubmit={onSubmit} noValidate>
          <div>
            <div className="mb-1 text-xs text-zinc-500">Email</div>
            <input
              className={`w-full h-10 px-3 bg-white border rounded-lg dark:border-zinc-800 dark:bg-zinc-900 ${
                fieldErr.email ? "border-red-500 focus:ring-red-500" : "border-zinc-200"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validate}
              type="email"
              autoComplete="email"
              required
              aria-invalid={!!fieldErr.email}
            />
            {fieldErr.email && (
              <p className="mt-1 text-xs text-red-600">{fieldErr.email}</p>
            )}
          </div>

          <div>
            <div className="mb-1 text-xs text-zinc-500">Mật khẩu</div>
            <input
              className={`w-full h-10 px-3 bg-white border rounded-lg dark:border-zinc-800 dark:bg-zinc-900 ${
                fieldErr.password ? "border-red-500 focus:ring-red-500" : "border-zinc-200"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validate}
              type="password"
              autoComplete="current-password"
              required
              aria-invalid={!!fieldErr.password}
            />
            {fieldErr.password && (
              <p className="mt-1 text-xs text-red-600">{fieldErr.password}</p>
            )}
          </div>

          <button
            disabled={loading}
            className="w-full h-10 text-white bg-black rounded-lg hover:opacity-90 disabled:opacity-60"
            type="submit"
          >
            {loading ? "Đang đăng nhập…" : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
