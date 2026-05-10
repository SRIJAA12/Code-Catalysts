const router      = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const { updateNote, deleteNote } = require("../controllers/notesController");

router.use(verifyToken);
router.put(   "/:noteId", updateNote);
router.delete("/:noteId", deleteNote);

module.exports = router;
