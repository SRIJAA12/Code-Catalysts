// src/routes/packing.js
const router = require("express").Router();
const prisma  = require("../lib/prisma");
const { verifyToken } = require("../middleware/auth");

router.get("/", verifyToken, async (req, res) => {
  try {
    const user  = await prisma.user.findUnique({ where: { firebaseUid: req.user.uid } });
    const where = { userId: user.id };
    if (req.query.tripId) where.tripId = req.query.tripId;
    const items = await prisma.packItem.findMany({ where, orderBy: { createdAt: "asc" } });
    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { firebaseUid: req.user.uid } });
    const { tripId, label, category } = req.body;
    const item = await prisma.packItem.create({
      data: { userId: user.id, tripId: tripId || null, label, category },
    });
    res.status(201).json({ item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const item = await prisma.packItem.update({
      where: { id: req.params.id },
      data:  { packed: req.body.packed },
    });
    res.json({ item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await prisma.packItem.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
