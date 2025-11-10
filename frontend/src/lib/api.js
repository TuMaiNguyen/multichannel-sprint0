const API_BASE = (import.meta.env.VITE_API_BASE || "https://sweet-heaven-api.onrender.com").replace(/\/$/, "");

export async function apiGet(path) {
  const url = `${API_BASE}${path}${path.includes("?") ? "&" : "?"}t=${Date.now()}`;
  const r = await fetch(url, { headers: { Accept: "application/json" } });
  if (!r.ok) throw new Error(`GET ${path} failed: ${r.status} - ${await r.text()}`);
  return r.json();
}

export async function apiPost(path, data) {
  const url = `${API_BASE}${path}?t=${Date.now()}`;
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type":"application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error(`POST ${path} failed: ${r.status} - ${await r.text()}`);
  return r.json();
}
