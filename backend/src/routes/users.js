// src/routes/users.js
const router = require("express").Router();
const prisma  = require("../lib/prisma");
const { verifyToken } = require("../middleware/auth");

// GET /api/users/profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where:   { firebaseUid: req.user.uid },
      include: { trips: { select: { id: true, title: true, status: true } } },
    });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/users/profile
router.patch("/profile", verifyToken, async (req, res) => {
  const { name, avatar } = req.body;
  try {
    const user = await prisma.user.update({
      where: { firebaseUid: req.user.uid },
      data:  { name, avatar },
    });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
