const prisma  = require("../prisma/client");
const { v4: uuidv4 } = require("uuid");

// POST /api/trips
async function createTrip(req, res) {
  const { uid } = req.user;
  const { title, coverImage, startDate, endDate, budget, budgetStyle, budgetType, interests, destination } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required." });
  try {
    const trip = await prisma.trip.create({
      data: {
        title,
        coverImage,
        destination: destination || null,
        startDate:  startDate ? new Date(startDate) : undefined,
        endDate:    endDate   ? new Date(endDate)   : undefined,
        budget:     budget    ? parseFloat(budget)  : undefined,
        budgetStyle: budgetStyle || budgetType || "moderate",
        interests:  interests || [],
        userId:     uid,
        updatedAt:  new Date(),
      },
    });
    res.status(201).json({ trip: normalizeTrip(trip) });
  } catch (err) {
    console.error("createTrip error:", err.message);
    res.status(500).json({ error: err.message });
  }
}

// GET /api/trips
async function getTrips(req, res) {
  const { uid } = req.user;
  try {
    const trips = await prisma.trip.findMany({
      where:   { userId: uid },
      include: {
        TripCity: { include: { Activity: true }, orderBy: { order: "asc" } },
        Expense:  true,
        PackItem: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json({ trips: trips.map(normalizeTrip) });
  } catch (err) {
    console.error("getTrips error:", err.message);
    res.status(500).json({ error: err.message });
  }
}

// GET /api/trips/:id
async function getTrip(req, res) {
  const { uid } = req.user;
  const { id }  = req.params;
  try {
    const trip = await prisma.trip.findFirst({
      where:   { id, userId: uid },
      include: {
        TripCity: { include: { Activity: true }, orderBy: { order: "asc" } },
        Expense:  true,
        PackItem: true,
        notes:    true,
      },
    });
    if (!trip) return res.status(404).json({ error: "Trip not found." });
    res.json({ trip: normalizeTrip(trip) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PUT /api/trips/:id
async function updateTrip(req, res) {
  const { uid } = req.user;
  const { id }  = req.params;
  const { title, coverImage, startDate, endDate, budget, budgetStyle, budgetType, interests, destination } = req.body;
  try {
    const trip = await prisma.trip.findFirst({ where: { id, userId: uid } });
    if (!trip) return res.status(404).json({ error: "Trip not found." });
    const updated = await prisma.trip.update({
      where: { id },
      data: {
        title, coverImage, destination,
        startDate:  startDate ? new Date(startDate) : undefined,
        endDate:    endDate   ? new Date(endDate)   : undefined,
        budget:     budget    ? parseFloat(budget)  : undefined,
        budgetStyle: budgetStyle || budgetType || undefined,
        interests:  interests || undefined,
        updatedAt:  new Date(),
      },
    });
    res.json({ trip: normalizeTrip(updated) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE /api/trips/:id
async function deleteTrip(req, res) {
  const { uid } = req.user;
  const { id }  = req.params;
  try {
    const trip = await prisma.trip.findFirst({ where: { id, userId: uid } });
    if (!trip) return res.status(404).json({ error: "Trip not found." });
    await prisma.trip.delete({ where: { id } });
    res.json({ message: "Trip deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/trips/:id/share — generate or return existing share token
async function shareTrip(req, res) {
  const { uid } = req.user;
  const { id }  = req.params;
  try {
    let trip = await prisma.trip.findFirst({ where: { id, userId: uid } });
    if (!trip) return res.status(404).json({ error: "Trip not found." });
    if (!trip.shareSlug) {
      trip = await prisma.trip.update({ where: { id }, data: { shareSlug: uuidv4(), updatedAt: new Date() } });
    }
    res.json({ shareToken: trip.shareSlug });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/share/:token — public read-only view
async function getPublicTrip(req, res) {
  const { token } = req.params;
  try {
    const trip = await prisma.trip.findFirst({
      where:   { shareSlug: token },
      include: { TripCity: { include: { Activity: true }, orderBy: { order: "asc" } } },
    });
    if (!trip) return res.status(404).json({ error: "Shared itinerary not found." });
    res.json({ trip: normalizeTrip(trip) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Normalize DB model names → frontend-friendly names
function normalizeTrip(trip) {
  if (!trip) return trip;
  const { TripCity, Expense, PackItem, shareSlug, budgetStyle, ...rest } = trip;
  return {
    ...rest,
    shareToken:  shareSlug,
    budgetType:  budgetStyle,
    stops:       (TripCity  || []).map(normalizeStop),
    budgetItems: (Expense   || []).map(normalizeExpense),
    packingItems:(PackItem  || []).map(normalizePackItem),
  };
}

function normalizeStop(city) {
  if (!city) return city;
  const { cityName, Activity, ...rest } = city;
  return { ...rest, city: cityName, activities: Activity || [] };
}

function normalizeExpense(exp) {
  if (!exp) return exp;
  const { description, ...rest } = exp;
  return { ...rest, label: description };
}

function normalizePackItem(item) {
  return item;
}

module.exports = { createTrip, getTrips, getTrip, updateTrip, deleteTrip, shareTrip, getPublicTrip };
