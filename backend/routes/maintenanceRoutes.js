const express = require("express");

const router = express.Router();

const {
  getMaintenance,
  create,
  update,
  remove,
} = require("../controllers/MaintenanceController");

router.get("/", getMaintenance);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", remove);

module.exports = router;