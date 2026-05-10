// src/lib/api.js
// Centralised fetch wrapper — auto-attaches Firebase ID token to every request
import { auth } from "@/lib/firebase";

async function getToken() {
  const user = auth.currentUser;
  if (!user) return null;
  return user.getIdToken();
}

async function apiFetch(path, options = {}) {
  const token = await getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(path, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  get:    (path)         => apiFetch(path),
  post:   (path, data)   => apiFetch(path, { method: "POST",   body: JSON.stringify(data) }),
  put:    (path, data)   => apiFetch(path, { method: "PUT",    body: JSON.stringify(data) }),
  patch:  (path, data)   => apiFetch(path, { method: "PATCH",  body: JSON.stringify(data) }),
  delete: (path)         => apiFetch(path, { method: "DELETE" }),
};
