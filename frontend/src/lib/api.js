const API_BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");

export async function apiGet(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE}${p}?t=${Date.now()}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`GET ${p} failed: ${res.status} - ${body.slice(0, 120)}`);
  }
  return res.json();
}
