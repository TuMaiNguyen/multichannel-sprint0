const BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '')

function normalizePath(path) {
  return path.startsWith('/') ? path : `/${path}`
}
function cacheBust(url) {
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}_=${Date.now()}`
}

export async function apiGet(path) {
  const url = cacheBust(`${BASE}${normalizePath(path)}`)
  const res = await fetch(url, {
    mode: 'cors',
    headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' }
  })
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`)
  return res.json()
}

export async function apiPost(path, body) {
  const url = `${BASE}${normalizePath(path)}`
  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`POST ${path} → ${res.status}`)
  return res.json()
}
