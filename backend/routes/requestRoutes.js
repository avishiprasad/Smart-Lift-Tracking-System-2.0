
const express = require("express");

const router = express.Router();

const {
  createRequest,
  getRequests,
} = require("../controllers/LiftRequestController");

router.get("/", getRequests);

router.post("/", createRequest);
module.exports = router;