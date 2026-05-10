const prisma = require("../prisma/client");

// GET /api/trips/:id/notes
async function getNotes(req, res) {
  const { uid } = req.user;
  const { id }  = req.params;
  try {
    const trip = await prisma.trip.findFirst({
      where:   { id, userId: uid },
      include: { notes: { orderBy: { createdAt: "desc" } } },
    });
    if (!trip) return res.status(404).json({ error: "Trip not found." });
    res.json({ notes: trip.notes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/trips/:id/notes
async function addNote(req, res) {
  const { uid } = req.user;
  const { id }  = req.params;
  const { content, title } = req.body;
  if (!content) return res.status(400).json({ error: "Content required." });
  try {
    const trip = await prisma.trip.findFirst({ where: { id, userId: uid } });
    if (!trip) return res.status(404).json({ error: "Trip not found." });
    const note = await prisma.note.create({
      data: {
        id:        require("crypto").randomUUID(),
        content,
        title:     title || "Note",
        tripId:    id,
        userId:    uid,
        updatedAt: new Date(),
      },
    });
    res.status(201).json({ note });
  } catch (err) {
    console.error("addNote error:", err.message);
    res.status(500).json({ error: err.message });
  }
}

// PUT /api/notes/:noteId
async function updateNote(req, res) {
  const { uid }    = req.user;
  const { noteId } = req.params;
  const { content, title } = req.body;
  try {
    const note = await prisma.note.findUnique({ where: { id: noteId } });
    if (!note || note.userId !== uid) return res.status(404).json({ error: "Note not found." });
    const updated = await prisma.note.update({
      where: { id: noteId },
      data:  { content, title, updatedAt: new Date() },
    });
    res.json({ note: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE /api/notes/:noteId
async function deleteNote(req, res) {
  const { uid }    = req.user;
  const { noteId } = req.params;
  try {
    const note = await prisma.note.findUnique({ where: { id: noteId } });
    if (!note || note.userId !== uid) return res.status(404).json({ error: "Note not found." });
    await prisma.note.delete({ where: { id: noteId } });
    res.json({ message: "Deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getNotes, addNote, updateNote, deleteNote };
