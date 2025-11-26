// frontend/src/lib/api.js

const API_BASE = import.meta.env.VITE_API_BASE || "";

// Hàm xử lý response chung
async function handleResponse(res) {
  const contentType = res.headers.get("content-type") || "";
  let data = null;

  if (contentType.includes("application/json")) {
    data = await res.json();
  } else {
    const text = await res.text();
    data = { ok: res.ok, raw: text };
  }

  if (!res.ok) {
    const message =
      data?.error ||
      data?.message ||
      `API error ${res.status}: ${res.statusText}`;
    throw new Error(message);
  }

  return data;
}

// GET /path
export async function apiGet(path) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  return handleResponse(res);
}

// POST /path với body JSON
export async function apiPost(path, body) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body ?? {}),
  });
  return handleResponse(res);
}

// (Nếu cần) DELETE /path
export async function apiDelete(path) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });
  return handleResponse(res);
}
