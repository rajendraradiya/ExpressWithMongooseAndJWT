const express = require("express");
const router = express.Router();
const { getNotes, createNotes } = require("../controllers/notes");
const auth = require("../middleware/auth");

router.get("/", auth, getNotes);
router.post("/", auth, createNotes);

module.exports = router;
