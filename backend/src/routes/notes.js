// src/routes/notes.js
const router = require("express").Router();
const prisma  = require("../lib/prisma");
const { verifyToken } = require("../middleware/auth");

router.get("/", verifyToken, async (req, res) => {
  try {
    const user  = await prisma.user.findUnique({ where: { firebaseUid: req.user.uid } });
    const where = { userId: user.id };
    if (req.query.tripId) where.tripId = req.query.tripId;
    const notes = await prisma.note.findMany({ where, orderBy: { updatedAt: "desc" } });
    res.json({ notes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { firebaseUid: req.user.uid } });
    const { tripId, title, content } = req.body;
    const note = await prisma.note.create({
      data: { userId: user.id, tripId: tripId || null, title, content },
    });
    res.status(201).json({ note });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const note = await prisma.note.update({
      where: { id: req.params.id },
      data:  { title: req.body.title, content: req.body.content },
    });
    res.json({ note });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await prisma.note.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
