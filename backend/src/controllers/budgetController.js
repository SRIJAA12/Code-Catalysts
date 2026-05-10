const prisma = require("../prisma/client");

// GET /api/trips/:id/budget
async function getBudget(req, res) {
  const { uid } = req.user;
  const { id }  = req.params;
  try {
    const trip = await prisma.trip.findFirst({
      where:   { id, userId: uid },
      include: { Expense: { orderBy: { createdAt: "desc" } } },
    });
    if (!trip) return res.status(404).json({ error: "Trip not found." });

    const items = trip.Expense;
    const total = items.reduce((sum, i) => sum + i.amount, 0);

    const categories = ["transport", "hotels", "meals", "activities", "shopping", "other"];
    const breakdown  = categories.map((cat) => ({
      category: cat,
      total:    items.filter((i) => i.category === cat).reduce((s, i) => s + i.amount, 0),
    }));

    const tripDays = trip.startDate && trip.endDate
      ? Math.max(1, Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / 86400000))
      : 1;

    const dailyAvg   = total / tripDays;
    const overBudget = trip.budget ? total > trip.budget : false;
    const remaining  = trip.budget ? trip.budget - total : null;

    // Normalize items: description → label for frontend
    const normalizedItems = items.map(({ description, ...rest }) => ({ ...rest, label: description || "" }));

    res.json({ total, breakdown, dailyAvg, overBudget, remaining, budgetLimit: trip.budget, tripDays, items: normalizedItems });
  } catch (err) {
    console.error("getBudget error:", err.message);
    res.status(500).json({ error: err.message });
  }
}

// POST /api/trips/:id/budget
async function addBudgetItem(req, res) {
  const { uid } = req.user;
  const { id }  = req.params;
  const { label, amount, category, date } = req.body;
  if (!label || !amount) return res.status(400).json({ error: "Label and amount required." });
  try {
    const trip = await prisma.trip.findFirst({ where: { id, userId: uid } });
    if (!trip) return res.status(404).json({ error: "Trip not found." });
    const item = await prisma.expense.create({
      data: {
        id:          require("crypto").randomUUID(),
        description: label,
        amount:      parseFloat(amount),
        category:    category || "other",
        date:        date ? new Date(date) : new Date(),
        tripId:      id,
        userId:      uid,
      },
    });
    res.status(201).json({ item: { ...item, label: item.description } });
  } catch (err) {
    console.error("addBudgetItem error:", err.message);
    res.status(500).json({ error: err.message });
  }
}

// DELETE /api/budget/:itemId
async function deleteBudgetItem(req, res) {
  const { uid }    = req.user;
  const { itemId } = req.params;
  try {
    const item = await prisma.expense.findUnique({ where: { id: itemId }, include: { Trip: true } });
    if (!item || item.Trip.userId !== uid) return res.status(404).json({ error: "Item not found." });
    await prisma.expense.delete({ where: { id: itemId } });
    res.json({ message: "Deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getBudget, addBudgetItem, deleteBudgetItem };
