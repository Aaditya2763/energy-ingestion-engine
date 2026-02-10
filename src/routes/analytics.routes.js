const express = require("express");
const { getPerformance } = require("../controllers/analytics.controller");

const router = express.Router();
router.get("/analytics/performance/:vehicleId", getPerformance);

module.exports = router;
