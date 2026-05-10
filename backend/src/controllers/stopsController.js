const prisma = require("../prisma/client");

async function getTripOwnership(tripId, uid) {
  return prisma.trip.findFirst({ where: { id: tripId, userId: uid } });
}

// POST /api/trips/:tripId/stops
async function createStop(req, res) {
  const { uid }    = req.user;
  const { tripId } = req.params;
  const { city, country, order, nights } = req.body;
  if (!city) return res.status(400).json({ error: "City is required." });
  try {
    const trip = await getTripOwnership(tripId, uid);
    if (!trip) return res.status(404).json({ error: "Trip not found." });
    const stop = await prisma.tripCity.create({
      data: {
        id:       require("crypto").randomUUID(),
        cityName: city,
        country:  country || null,
        order:    order ?? 0,
        nights:   nights ? parseInt(nights) : null,
        tripId,
      },
      include: { Activity: true },
    });
    // Normalize for frontend
    const { cityName, Activity, ...rest } = stop;
    res.status(201).json({ stop: { ...rest, city: cityName, activities: Activity } });
  } catch (err) {
    console.error("createStop error:", err.message);
    res.status(500).json({ error: err.message });
  }
}

// PUT /api/stops/:id
async function updateStop(req, res) {
  const { uid } = req.user;
  const { id }  = req.params;
  const { city, country, order, nights } = req.body;
  try {
    const stop = await prisma.tripCity.findUnique({ where: { id }, include: { Trip: true } });
    if (!stop || stop.Trip.userId !== uid) return res.status(404).json({ error: "Stop not found." });
    const updated = await prisma.tripCity.update({
      where: { id },
      data:  { cityName: city, country, order, nights: nights ? parseInt(nights) : undefined },
    });
    const { cityName, ...rest } = updated;
    res.json({ stop: { ...rest, city: cityName } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE /api/stops/:id
async function deleteStop(req, res) {
  const { uid } = req.user;
  const { id }  = req.params;
  try {
    const stop = await prisma.tripCity.findUnique({ where: { id }, include: { Trip: true } });
    if (!stop || stop.Trip.userId !== uid) return res.status(404).json({ error: "Stop not found." });
    await prisma.tripCity.delete({ where: { id } });
    res.json({ message: "Stop deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createStop, updateStop, deleteStop };
