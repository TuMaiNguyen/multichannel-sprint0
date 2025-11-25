// frontend/src/lib/api.js
const API_BASE =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE) ||
  "https://sweet-heaven-api.onrender.com";

async function handle(res) {
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`[${res.status}] ${t || res.statusText}`);
  }
  return res.json();
}

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, { credentials: "omit" });
  return handle(res);
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {})
  });
  return handle(res);
}

// Optional grouped export
export const api = { get: apiGet, post: apiPost };
