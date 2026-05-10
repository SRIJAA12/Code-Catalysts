// src/middleware/auth.js — Firebase Admin token verifier
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId:   process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey:  (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    }),
  });
}

/**
 * Middleware — verifies Firebase ID token in Authorization header.
 * Attaches decoded token as req.user.
 */
async function verifyToken(req, res, next) {
  const header = req.headers.authorization || "";
  const token  = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    req.user = await admin.auth().verifyIdToken(token);
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = { verifyToken, admin };
