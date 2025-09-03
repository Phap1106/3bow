// // src/lib/usersApi.ts
// const API =
//   process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

// async function req(path: string, init?: RequestInit) {
//   const r = await fetch(API + path, {
//     cache: "no-store",
//     headers: {
//       "content-type": "application/json",
//       ...(init?.headers as any),
//     },
//     ...init,
//   });
//   if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
//   return r.json();
// }

// export type SupportInput = {
//   name: string;
//   email?: string;
//   phone?: string;
//   active?: boolean;
//   note?: string;
// };

// // luôn trả về { items, total } để UI dễ dùng
// export async function listSupport(q = "", page = 1, limit = 20) {
//   const data = await req(
//     `/support?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}`
//   );
//   if (Array.isArray(data)) {
//     return { items: data, total: data.length };
//   }
//   const { items = [], total = 0 } = data || {};
//   return { items, total };
// }

// export async function createSupport(data: SupportInput) {
//   return req(`/support`, { method: "POST", body: JSON.stringify(data) });
// }

// export async function deleteSupport(id: string) {
//   return req(`/support/${id}`, { method: "DELETE" });
// }

// export async function kickSupport(id: string) {
//   return req(`/support/${id}/kick`, { method: "POST" });
// }





import { API } from '@/lib/adminApi';

async function req(path: string, init?: RequestInit) {
  const r = await fetch(`${API}${path}`, { credentials: 'include', ...init });
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
  return r.json();
}

export function listSupport(q = '', page = 1, limit = 20) {
  const qs = new URLSearchParams();
  if (q) qs.set('q', q);
  qs.set('page', String(page));
  qs.set('limit', String(limit));
  return req(`/users/support-admins?${qs.toString()}`);
}

// *** SỬA Ở ĐÂY: dùng /auth/register-support-admin ***
export function createSupport(data: { firtname: string;lastname?: string; email: string; phone?: string; password?: string ;birthday?: string ; address?: string}) {
  const payload = { password: data.password ?? '12345678', ...data };
  return req(`/auth/register-support-admin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function updateSupport(id: string, data: any) {
  const r = await fetch(`${API}/auth/support-admin/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export const deleteSupport = (id: string) => req(`/users/${id}`, { method: 'DELETE' });
export const kickSupport   = (id: string) => req(`/users/${id}/kick`, { method: 'POST' });


