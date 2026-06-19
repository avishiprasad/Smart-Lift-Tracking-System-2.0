const express = require("express");

const router = express.Router();

const {
  createRequest,
} = require("../controllers/LiftRequestController");

router.post("/", createRequest);

module.exports = router;