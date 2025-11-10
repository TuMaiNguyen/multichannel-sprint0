const BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");

export async function apiGet(path) {
  const url = `${BASE}${path.startsWith("/") ? "" : "/"}${path}?t=${Date.now()}`; // phá cache
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok && res.status !== 304) {
    const txt = await res.text().catch(() => "");
    throw new Error(`GET ${path} failed: ${res.status} - ${txt}`);
  }
  // 304 vẫn parse được dữ liệu cache
  try { return await res.json(); } catch { return null; }
}
