// src/index.js — Express entry point
const express = require("express");
const cors    = require("cors");
require("dotenv").config();

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────────
app.use("/api/auth",         require("./routes/auth"));
app.use("/api/users",        require("./routes/users"));
app.use("/api/trips",        require("./routes/trips"));
app.use("/api/expenses",     require("./routes/expenses"));
app.use("/api/packing",      require("./routes/packing"));
app.use("/api/notes",        require("./routes/notes"));
app.use("/api/wallet",       require("./routes/wallet"));

app.get("/", (_req, res) => res.json({ status: "Traveloop API running ✅" }));

app.listen(PORT, () => console.log(`🚀  API listening on http://localhost:${PORT}`));
