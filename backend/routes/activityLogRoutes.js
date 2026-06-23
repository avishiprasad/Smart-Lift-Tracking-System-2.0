const express = require("express");

const router = express.Router();

const {
    getLogs,
} = require("../controllers/ActivityLogController");

router.get("/", getLogs);

module.exports = router;