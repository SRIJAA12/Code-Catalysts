// src/routes/trips.js — full CRUD for trips + cities + activities
const router = require("express").Router();
const prisma  = require("../lib/prisma");
const { verifyToken } = require("../middleware/auth");
const { nanoid } = require("crypto"); // uses built-in crypto

function slug() { return require("crypto").randomBytes(6).toString("hex"); }

// ── GET all trips for user ──────────────────────────────────────
router.get("/", verifyToken, async (req, res) => {
  try {
    const user  = await prisma.user.findUnique({ where: { firebaseUid: req.user.uid } });
    if (!user) return res.status(404).json({ error: "User not found" });
    const trips = await prisma.trip.findMany({
      where:   { userId: user.id },
      include: { cities: { include: { activities: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json({ trips });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET single trip by id ───────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const trip = await prisma.trip.findUnique({
      where:   { id: req.params.id },
      include: { cities: { include: { activities: { orderBy: { order: "asc" } } }, orderBy: { order: "asc" } } },
    });
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    res.json({ trip });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET trip by shareSlug (public) ────────────────────────────
router.get("/share/:slug", async (req, res) => {
  try {
    const trip = await prisma.trip.findUnique({
      where:   { shareSlug: req.params.slug },
      include: { cities: { include: { activities: { orderBy: { order: "asc" } } }, orderBy: { order: "asc" } } },
    });
    if (!trip || !trip.isPublic) return res.status(404).json({ error: "Not found" });
    res.json({ trip });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── CREATE trip ────────────────────────────────────────────────
router.post("/", verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { firebaseUid: req.user.uid } });
    if (!user) return res.status(404).json({ error: "User not found" });
    const { title, destination, startDate, endDate, budget, budgetStyle, interests, coverImage, cities = [] } = req.body;
    const trip = await prisma.trip.create({
      data: {
        userId: user.id, title, destination, coverImage,
        startDate: startDate ? new Date(startDate) : null,
        endDate:   endDate   ? new Date(endDate)   : null,
        budget: budget ? Number(budget) : null,
        budgetStyle, interests: interests || [],
        shareSlug: slug(),
        cities: {
          create: cities.map((c, i) => ({
            cityName: c.cityName, country: c.country, lat: c.lat, lng: c.lng,
            order: i, nights: c.nights,
            activities: { create: (c.activities || []).map((a, j) => ({ ...a, order: j })) },
          })),
        },
      },
      include: { cities: { include: { activities: true } } },
    });
    res.status(201).json({ trip });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── UPDATE trip ────────────────────────────────────────────────
router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const { title, destination, startDate, endDate, budget, budgetStyle, interests, coverImage, status, isPublic } = req.body;
    const trip = await prisma.trip.update({
      where: { id: req.params.id },
      data:  {
        title, destination, coverImage, status, isPublic,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate:   endDate   ? new Date(endDate)   : undefined,
        budget: budget !== undefined ? Number(budget) : undefined,
        budgetStyle, interests,
      },
    });
    res.json({ trip });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── DELETE trip ────────────────────────────────────────────────
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await prisma.trip.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── ADD activity to city ───────────────────────────────────────
router.post("/:tripId/cities/:cityId/activities", verifyToken, async (req, res) => {
  try {
    const { title, time, description, cost, category } = req.body;
    const count = await prisma.activity.count({ where: { cityId: req.params.cityId } });
    const activity = await prisma.activity.create({
      data: { cityId: req.params.cityId, title, time, description, cost: cost ? Number(cost) : null, category, order: count },
    });
    res.status(201).json({ activity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
