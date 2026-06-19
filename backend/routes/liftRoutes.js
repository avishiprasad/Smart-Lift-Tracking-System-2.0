const express = require("express");
const router = express.Router();

const {
  createLift,
  getAllLifts,
  getLiftById,
  updateLift,
  deleteLift,
} = require("../controllers/liftController");

// Create Lift
router.post("/", createLift);

// Get All Lifts
router.get("/", getAllLifts);

// Get Lift By ID
router.get("/:id", getLiftById);

// Update Lift
router.put("/:id", updateLift);

// Delete Lift
router.delete("/:id", deleteLift);

module.exports = router;