// src/routes/expenses.js
const router = require("express").Router();
const prisma  = require("../lib/prisma");
const { verifyToken } = require("../middleware/auth");

// GET /api/expenses?tripId=xxx
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { firebaseUid: req.user.uid } });
    const where = { userId: user.id };
    if (req.query.tripId) where.tripId = req.query.tripId;
    const expenses = await prisma.expense.findMany({ where, orderBy: { date: "desc" } });
    const total = expenses.reduce((s, e) => s + e.amount, 0);
    const byCategory = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});
    res.json({ expenses, analytics: { total, byCategory } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/expenses
router.post("/", verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { firebaseUid: req.user.uid } });
    const { tripId, amount, category, description, date } = req.body;
    const expense = await prisma.expense.create({
      data: {
        userId: user.id, tripId: tripId || null,
        amount: Number(amount), category, description,
        date: date ? new Date(date) : new Date(),
      },
    });
    res.status(201).json({ expense });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/expenses/:id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await prisma.expense.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
