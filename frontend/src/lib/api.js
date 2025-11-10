export const API_BASE = import.meta.env.VITE_API_BASE || "";

function withTs(url) {
  return url + (url.includes("?") ? "&" : "?") + "t=" + Date.now();
}

export async function apiGet(path) {
  const res = await fetch(withTs(`${API_BASE}${path}`));
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {}),
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}
