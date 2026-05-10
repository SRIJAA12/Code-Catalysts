const prisma = require("../prisma/client");

// GET /api/trips/:id/packing
async function getPackingList(req, res) {
  const { uid } = req.user;
  const { id }  = req.params;
  try {
    const trip = await prisma.trip.findFirst({
      where:   { id, userId: uid },
      include: { PackItem: { orderBy: { createdAt: "asc" } } },
    });
    if (!trip) return res.status(404).json({ error: "Trip not found." });
    res.json({ items: trip.PackItem });
  } catch (err) {
    console.error("getPackingList error:", err.message);
    res.status(500).json({ error: err.message });
  }
}

// POST /api/trips/:id/packing
async function addPackingItem(req, res) {
  const { uid } = req.user;
  const { id }  = req.params;
  const { label, category } = req.body;
  if (!label) return res.status(400).json({ error: "Label required." });
  try {
    const trip = await prisma.trip.findFirst({ where: { id, userId: uid } });
    if (!trip) return res.status(404).json({ error: "Trip not found." });
    const item = await prisma.packItem.create({
      data: {
        id:       require("crypto").randomUUID(),
        label,
        category: category || "general",
        tripId:   id,
        userId:   uid,
      },
    });
    res.status(201).json({ item });
  } catch (err) {
    console.error("addPackingItem error:", err.message);
    res.status(500).json({ error: err.message });
  }
}

// PATCH /api/packing/:itemId/toggle
async function togglePackingItem(req, res) {
  const { uid }    = req.user;
  const { itemId } = req.params;
  try {
    const item = await prisma.packItem.findUnique({ where: { id: itemId }, include: { Trip: true } });
    if (!item || item.userId !== uid) return res.status(404).json({ error: "Item not found." });
    const updated = await prisma.packItem.update({ where: { id: itemId }, data: { packed: !item.packed } });
    res.json({ item: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE /api/packing/:itemId
async function deletePackingItem(req, res) {
  const { uid }    = req.user;
  const { itemId } = req.params;
  try {
    const item = await prisma.packItem.findUnique({ where: { id: itemId } });
    if (!item || item.userId !== uid) return res.status(404).json({ error: "Item not found." });
    await prisma.packItem.delete({ where: { id: itemId } });
    res.json({ message: "Deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getPackingList, addPackingItem, togglePackingItem, deletePackingItem };
