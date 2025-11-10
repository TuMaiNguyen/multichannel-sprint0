const API_BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/+$/,'') // bỏ dấu '/' cuối

export async function apiGet(path) {
  const clean = String(path).replace(/^\/+/, '')
  const url = `${API_BASE}/${clean}`
  const res = await fetch(url)
  if (!res.ok) {
    const text = await res.text().catch(()=>'')
    throw new Error(`GET /${clean} failed: ${res.status}${text ? ' - ' + text.slice(0,120) : ''}`)
  }
  return res.json()
}
