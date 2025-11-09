// frontend/src/lib/api.js
export const API_BASE =
  import.meta.env.VITE_API_BASE || 'https://sweet-heaven-api.onrender.com';

export async function apiGet(path, init = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { Accept: 'application/json', ...(init.headers || {}) },
  });
  if (!res.ok) {
    throw new Error(`GET ${path} failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
