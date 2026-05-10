const router      = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const { syncUser } = require("../controllers/usersController");

router.post("/sync", verifyToken, syncUser);

module.exports = router;
