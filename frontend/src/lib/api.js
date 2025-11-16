const BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '')

function join(path) {
  return `${BASE}${path}`
}
function bust(url) {
  const t = `t=${Date.now()}`
  return url.includes('?') ? `${url}&${t}` : `${url}?${t}`
}

export async function apiGet(path) {
  const res = await fetch(bust(join(path)), {
    headers: { Accept: 'application/json' }
  })
  if (!res.ok) throw new Error(`GET ${path} ${res.status}`)
  return res.json()
}

export async function apiPost(path, body) {
  const res = await fetch(join(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(body || {})
  })
  if (!res.ok) throw new Error(`POST ${path} ${res.status}`)
  return res.json()
}

// Cho phép import { api } ... nếu lỡ dùng
export const api = { get: apiGet, post: apiPost, base: BASE }
export default api
