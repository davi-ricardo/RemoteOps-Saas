const express = require("express");
const { getPreferences, updatePreferences } = require("../controllers/userPreferences");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

// All routes are protected
router.use(authenticate);

router.get("/", getPreferences);
router.put("/", updatePreferences);

module.exports = router;
