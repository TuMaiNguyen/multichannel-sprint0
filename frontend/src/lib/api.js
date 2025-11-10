// frontend/src/lib/api.js
const API_BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '');

export async function apiGet(path, params = {}) {
  const url = new URL(API_BASE + path);
  // phá cache: thêm tham số t
  url.searchParams.set('t', Date.now());
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const res = await fetch(url.toString(), {
    headers: { 'Accept': 'application/json' }
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`GET ${path} failed: ${res.status} - ${text}`);
  }
  return res.json();
}
