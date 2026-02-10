const ingestService = require("../services/ingest.service");
const {
    validateVehiclePayload,
    validateMeterPayload,
} = require("../utils/validation");

exports.ingestTelemetry = async (req, res) => {
    try {
        const payload = req.body;

        // VEHICLE DATA
        if (payload.vehicleId) {
            const errors = validateVehiclePayload(payload);
            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    errors,
                });
            }

            await ingestService.handleVehicle(payload);
            return res.status(201).json({ success: true });
        }

        // METER DATA
        if (payload.meterId) {
            const errors = validateMeterPayload(payload);
            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    errors,
                });
            }

            await ingestService.handleMeter(payload);
            return res.status(201).json({ success: true });
        }

        return res.status(400).json({
            success: false,
            message: "Invalid telemetry payload",
        });
    } catch (error) {
        console.error("Ingest Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
