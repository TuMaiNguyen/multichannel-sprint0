// frontent/src/lib/api.js
const API_BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");

export async function apiGet(path) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    // ném lỗi rõ ràng để nhìn thấy status ở UI
    throw new Error(`GET ${path} failed: ${res.status}`);
  }
  return res.json();
}
