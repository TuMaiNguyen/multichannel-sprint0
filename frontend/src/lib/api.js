// frontend/src/lib/api.js
export const API_BASE = 'https://sweet-heaven-api.onrender.com';

export const endpoints = {
  products: `${API_BASE}/products`,
  feedback: `${API_BASE}/feedback`,
};

export async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} at ${url}`);
  return res.json();
}
