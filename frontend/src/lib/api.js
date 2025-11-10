const BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");

export async function apiGet(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  const url = `${BASE}${p}?t=${Date.now()}`; // phá cache
  const res = await fetch(url, { headers: { Accept: "application/json" }, cache: "no-store" });

  // Nếu server trả 304, vẫn dùng cache của trình duyệt (không ném lỗi)
  if (!res.ok && res.status !== 304) {
    const txt = await res.text().catch(() => "");
    throw new Error(`GET ${p} failed: ${res.status} - ${txt}`);
  }

  try { return await res.json(); } catch { return null; }
}
