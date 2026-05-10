const router = require("express").Router();
const { getPublicTrip } = require("../controllers/tripsController");

// Public — no auth required
router.get("/:token", getPublicTrip);

module.exports = router;
