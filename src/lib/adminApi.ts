
// src/lib/adminApi.ts
export const API =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

// parse + ném lỗi kèm status (handle 204)
async function parse(r: Response) {
  if (r.status === 204) return { ok: true }; // ⬅️ quan trọng cho DELETE

  const ct = r.headers.get("content-type") || "";
  const body = ct.includes("application/json")
    ? await r.json().catch(() => ({}))
    : await r.text().catch(() => "");

  if (!r.ok) {
    const msg =
      typeof body === "string"
        ? body
        : body?.message || body?.error || JSON.stringify(body);
    throw new Error(`${r.status} ${msg}`);
  }
  return body;
}

// helper fetch có timeout + luôn include cookie
export async function req(
  path: string,
  init?: RequestInit,
  timeoutMs = 10000
) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort("timeout"), timeoutMs);
  try {
    const r = await fetch(`${API}${path}`, {
      credentials: "include",
      signal: ctrl.signal,
      ...init,
    });
    return await parse(r);
  } finally {
    clearTimeout(timer);
  }
}

// public helpers
export const apiGet = (p: string, cache: RequestCache = "no-store") =>
  req(p, { method: "GET", cache });
export const apiPost = (p: string, data?: any) =>
  req(p, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data ? JSON.stringify(data) : undefined,
  });
export const apiPatch = (p: string, data?: any) =>
  req(p, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: data ? JSON.stringify(data) : undefined,
  });
export const apiDelete = (p: string) => req(p, { method: "DELETE" });

// -------- Articles ----------
export async function listArticles(q = "", page = 1, limit = 20) {
  const qs = new URLSearchParams({
    q,
    page: String(page),
    limit: String(limit),
  }).toString();
  return apiGet(`/articles?${qs}`);
}

export const createArticle = (data: any) => apiPost(`/articles`, data);

export const updateArticle = (id: string, data: any) =>
  apiPatch(`/articles/${id}`, data);

// ✅ dùng apiDelete để không json() trên 204
export const deleteArticle = (id: string) => apiDelete(`/articles/${id}`);





