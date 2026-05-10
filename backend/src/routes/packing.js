const router      = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const { togglePackingItem, deletePackingItem } = require("../controllers/packingController");

router.use(verifyToken);
router.patch( "/:itemId/toggle", togglePackingItem);
router.delete("/:itemId",        deletePackingItem);

module.exports = router;
