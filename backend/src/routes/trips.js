const router      = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const { createTrip, getTrips, getTrip, updateTrip, deleteTrip, shareTrip } = require("../controllers/tripsController");
const { createStop }     = require("../controllers/stopsController");
const { getBudget, addBudgetItem } = require("../controllers/budgetController");
const { getPackingList, addPackingItem } = require("../controllers/packingController");
const { getNotes, addNote } = require("../controllers/notesController");

router.use(verifyToken);

router.post(  "/",                    createTrip);
router.get(   "/",                    getTrips);
router.get(   "/:id",                 getTrip);
router.put(   "/:id",                 updateTrip);
router.delete("/:id",                 deleteTrip);
router.get(   "/:id/share",           shareTrip);

// Nested stops
router.post("/:tripId/stops",         createStop);

// Nested budget
router.get( "/:id/budget",            getBudget);
router.post("/:id/budget",            addBudgetItem);

// Nested packing
router.get( "/:id/packing",           getPackingList);
router.post("/:id/packing",           addPackingItem);

// Nested notes
router.get( "/:id/notes",             getNotes);
router.post("/:id/notes",             addNote);

module.exports = router;
