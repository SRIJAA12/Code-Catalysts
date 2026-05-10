const router      = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const { updateActivity, deleteActivity } = require("../controllers/activitiesController");

router.use(verifyToken);

router.put(   "/:id", updateActivity);
router.delete("/:id", deleteActivity);

module.exports = router;
