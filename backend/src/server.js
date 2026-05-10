require("dotenv").config();
const express = require("express");
const cors    = require("cors");

const usersRouter      = require("./routes/users");
const tripsRouter      = require("./routes/trips");
const stopsRouter      = require("./routes/stops");
const activitiesRouter = require("./routes/activities");
const budgetRouter     = require("./routes/budget");
const packingRouter    = require("./routes/packing");
const notesRouter      = require("./routes/notes");
const shareRouter      = require("./routes/share");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──
app.use(cors({
  origin:      process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

// ── Routes ──
app.use("/api/users",      usersRouter);
app.use("/api/trips",      tripsRouter);
app.use("/api/stops",      stopsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/budget",     budgetRouter);
app.use("/api/packing",    packingRouter);
app.use("/api/notes",      notesRouter);
app.use("/api/share",      shareRouter);

// ── Health check ──
app.get("/health", (_req, res) => res.json({ status: "ok", timestamp: new Date().toISOString() }));

// ── Centralized Error Handler ──
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`✅ Traveloop API running on http://localhost:${PORT}`);
});

module.exports = app;
