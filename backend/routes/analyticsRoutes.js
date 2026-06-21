const express = require("express");

const router = express.Router();

const {
  analytics,
} = require("../controllers/AnalyticsController");

router.get("/", analytics);

module.exports = router;