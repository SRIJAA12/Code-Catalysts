const router      = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const { updateStop, deleteStop }          = require("../controllers/stopsController");
const { createActivity }                  = require("../controllers/activitiesController");

router.use(verifyToken);

router.put(   "/:id",                    updateStop);
router.delete("/:id",                    deleteStop);
router.post(  "/:stopId/activities",     createActivity);

module.exports = router;
