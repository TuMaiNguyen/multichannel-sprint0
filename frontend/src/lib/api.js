// frontend/src/lib/api.js
const BASE = import.meta.env.VITE_API_BASE; // ví dụ: https://sweet-heaven-api.onrender.com

function withBust(url) {
  return `${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}`;
}

export async function apiGet(path) {
  const url = withBust(`${BASE}${path}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} ${res.status}`);
  return res.json();
}

export async function apiPost(path, body) {
  const url = withBust(`${BASE}${path}`);
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {})
  });
  if (!res.ok) throw new Error(`POST ${url} ${res.status}`);
  return res.json();
}

// Optional default để import nhầm vẫn chạy
const api = { get: apiGet, post: apiPost };
export default api;
