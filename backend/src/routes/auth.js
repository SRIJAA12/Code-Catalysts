// src/routes/auth.js — upsert user on login
const router  = require("express").Router();
const prisma   = require("../lib/prisma");
const { verifyToken } = require("../middleware/auth");

// POST /api/auth/sync — called after Firebase sign-in to upsert DB user
router.post("/sync", verifyToken, async (req, res) => {
  const { uid, email, name, picture } = req.user;
  try {
    const user = await prisma.user.upsert({
      where:  { firebaseUid: uid },
      update: { email, name: name || undefined, avatar: picture || undefined },
      create: { firebaseUid: uid, email, name: name || null, avatar: picture || null },
    });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB sync failed" });
  }
});

// GET /api/auth/me
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { firebaseUid: req.user.uid } });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
