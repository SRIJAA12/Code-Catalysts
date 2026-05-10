// Verify Firebase ID tokens using the Firebase REST API.
// This approach works WITHOUT a service account file — it only needs the Firebase project ID.
// Firebase's public keys are fetched automatically to validate the JWT signature.

const https = require("https");
const { createPublicKey } = require("crypto");
const { createVerify } = require("crypto");

let cachedCerts = null;
let certsExpiry = 0;

function fetchFirebaseCerts() {
  return new Promise((resolve, reject) => {
    if (cachedCerts && Date.now() < certsExpiry) {
      return resolve(cachedCerts);
    }
    https.get(
      "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com",
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            const cacheControl = res.headers["cache-control"] || "";
            const maxAgeMatch  = cacheControl.match(/max-age=(\d+)/);
            const maxAge       = maxAgeMatch ? parseInt(maxAgeMatch[1]) * 1000 : 3600000;
            cachedCerts = JSON.parse(data);
            certsExpiry = Date.now() + maxAge;
            resolve(cachedCerts);
          } catch (e) { reject(e); }
        });
      }
    ).on("error", reject);
  });
}

function base64urlDecode(str) {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(b64, "base64").toString("utf8");
}

async function verifyFirebaseToken(token) {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid token format.");

  const header  = JSON.parse(base64urlDecode(parts[0]));
  const payload = JSON.parse(base64urlDecode(parts[1]));

  // Check expiry
  if (payload.exp < Date.now() / 1000) throw new Error("Token expired.");

  // Check audience
  const projectId = process.env.FIREBASE_PROJECT_ID;
  if (payload.aud !== projectId) throw new Error(`Invalid audience: ${payload.aud}`);

  // Check issuer
  if (payload.iss !== `https://securetoken.google.com/${projectId}`) {
    throw new Error("Invalid issuer.");
  }

  // Verify signature
  const certs   = await fetchFirebaseCerts();
  const certPem = certs[header.kid];
  if (!certPem) throw new Error("Unknown key ID.");

  const signatureInput = `${parts[0]}.${parts[1]}`;
  const signature      = Buffer.from(parts[2].replace(/-/g, "+").replace(/_/g, "/"), "base64");
  const verify         = createVerify("SHA256");
  verify.update(signatureInput);
  const valid = verify.verify(certPem, signature);
  if (!valid) throw new Error("Invalid token signature.");

  return payload;
}

async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token      = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "No authorization token provided." });
  }

  try {
    const decoded = await verifyFirebaseToken(token);
    req.user = {
      uid:     decoded.uid || decoded.user_id || decoded.sub,
      email:   decoded.email,
      name:    decoded.name,
      picture: decoded.picture,
    };
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ error: `Invalid or expired token: ${err.message}` });
  }
}

module.exports = verifyToken;
