const API_BASE = (import.meta.env.VITE_API_BASE || "https://sweet-heaven-api.onrender.com").replace(/\/$/, "");

export async function apiGet(path) {
  const url = `${API_BASE}${path}${path.includes("?") ? "&" : "?"}t=${Date.now()}`; // bust cache
  const r = await fetch(url, { headers: { Accept: "application/json" } });
  if (!r.ok) throw new Error(`GET ${path} failed: ${r.status} - ${await r.text()}`);
  return r.json();
}
