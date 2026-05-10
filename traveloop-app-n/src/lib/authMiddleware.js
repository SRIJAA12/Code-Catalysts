// src/lib/authMiddleware.js
// Verifies Firebase token from Authorization header in API routes
import { auth } from "firebase-admin/auth";
import { initializeApp, getApps, cert } from "firebase-admin/app";

// Lazy-init Firebase Admin (server-side only)
function getAdminApp() {
  if (getApps().length) return getApps()[0];

  // If service account env vars are set, use them
  const projectId   = process.env.FIREBASE_PROJECT_ID   || "traveloop-d1b43";
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey  = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (clientEmail && privateKey) {
    return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  }

  // Fallback: just use projectId (token validation only, no admin ops)
  return initializeApp({ projectId });
}

/**
 * Verifies the Bearer token from Authorization header.
 * Returns { uid, email } or throws.
 */
export async function verifyToken(request) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) throw new Error("Missing authorization token");

  try {
    getAdminApp();
    const decoded = await auth().verifyIdToken(token);
    return { uid: decoded.uid, email: decoded.email };
  } catch {
    throw new Error("Invalid or expired token");
  }
}

/** Helper: return a 401 JSON response */
export function unauthorized(msg = "Unauthorized") {
  return Response.json({ error: msg }, { status: 401 });
}

/** Helper: return a 400 JSON response */
export function badRequest(msg = "Bad request") {
  return Response.json({ error: msg }, { status: 400 });
}

/** Helper: return a 500 JSON response */
export function serverError(msg = "Internal server error") {
  return Response.json({ error: msg }, { status: 500 });
}
