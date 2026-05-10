const router      = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const { deleteBudgetItem } = require("../controllers/budgetController");

router.use(verifyToken);
router.delete("/:itemId", deleteBudgetItem);

module.exports = router;
