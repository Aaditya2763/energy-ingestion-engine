const express = require("express");
const { ingestTelemetry } = require("../controllers/ingest.controller");

const router = express.Router();
router.post("/ingest", ingestTelemetry);

module.exports = router;
