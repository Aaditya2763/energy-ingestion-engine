const express = require("express");
const ingestRoutes = require("./routes/ingest.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());
app.use(errorHandler);

app.use("/v1", ingestRoutes);
app.use("/v1", analyticsRoutes);

module.exports = app;
