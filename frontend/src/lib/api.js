// frontend/src/lib/api.js
const BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '');

export async function apiGet(path) {
  const url = `${BASE}${path.startsWith('/') ? path : '/' + path}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`GET ${path} failed: ${res.status}${text ? ' - ' + text.slice(0, 120) : ''}`);
  }
  return res.json();
}
