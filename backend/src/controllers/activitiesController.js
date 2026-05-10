const prisma = require("../prisma/client");

async function verifyCityOwnership(cityId, uid) {
  const city = await prisma.tripCity.findUnique({ where: { id: cityId }, include: { Trip: true } });
  return city && city.Trip.userId === uid ? city : null;
}

// POST /api/stops/:stopId/activities
async function createActivity(req, res) {
  const { uid }    = req.user;
  const { stopId } = req.params; // stopId = cityId in DB
  const { title, description, category, startTime, endTime, cost, order } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required." });
  try {
    const city = await verifyCityOwnership(stopId, uid);
    if (!city) return res.status(404).json({ error: "Stop not found." });
    const activity = await prisma.activity.create({
      data: {
        id:          require("crypto").randomUUID(),
        title,
        description: description || null,
        category:    category    || "sightseeing",
        time:        startTime   || null,
        cost:        cost ? parseFloat(cost) : null,
        order:       order ?? 0,
        cityId:      stopId,
      },
    });
    // Normalize for frontend: time→startTime
    const { time, ...rest } = activity;
    res.status(201).json({ activity: { ...rest, startTime: time } });
  } catch (err) {
    console.error("createActivity error:", err.message);
    res.status(500).json({ error: err.message });
  }
}

// PUT /api/activities/:id
async function updateActivity(req, res) {
  const { uid } = req.user;
  const { id }  = req.params;
  const { title, description, category, startTime, cost, order } = req.body;
  try {
    const activity = await prisma.activity.findUnique({ where: { id }, include: { TripCity: { include: { Trip: true } } } });
    if (!activity || activity.TripCity.Trip.userId !== uid) return res.status(404).json({ error: "Activity not found." });
    const updated = await prisma.activity.update({
      where: { id },
      data:  {
        title,
        description: description || undefined,
        category:    category    || undefined,
        time:        startTime   || undefined,
        cost:        cost ? parseFloat(cost) : undefined,
        order,
      },
    });
    const { time, ...rest } = updated;
    res.json({ activity: { ...rest, startTime: time } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE /api/activities/:id
async function deleteActivity(req, res) {
  const { uid } = req.user;
  const { id }  = req.params;
  try {
    const activity = await prisma.activity.findUnique({ where: { id }, include: { TripCity: { include: { Trip: true } } } });
    if (!activity || activity.TripCity.Trip.userId !== uid) return res.status(404).json({ error: "Activity not found." });
    await prisma.activity.delete({ where: { id } });
    res.json({ message: "Activity deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createActivity, updateActivity, deleteActivity };
