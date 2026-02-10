const db = require("../db");
const AppError = require("../utils/appError");

exports.handleVehicle = async (data) => {
    try {
        await db.query(
            `INSERT INTO vehicle_telemetry_history
       (vehicle_id, soc, kwh_delivered_dc, battery_temp, timestamp)
       VALUES ($1,$2,$3,$4,$5)`,
            [
                data.vehicleId,
                data.soc,
                data.kwhDeliveredDc,
                data.batteryTemp,
                data.timestamp,
            ]
        );

        await db.query(
            `INSERT INTO vehicle_live_status
       (vehicle_id, soc, last_kwh_dc, avg_battery_temp)
       VALUES ($1,$2,$3,$4)
       ON CONFLICT (vehicle_id)
       DO UPDATE SET
         soc = EXCLUDED.soc,
         last_kwh_dc = EXCLUDED.last_kwh_dc,
         avg_battery_temp = EXCLUDED.avg_battery_temp,
         updated_at = NOW()`,
            [
                data.vehicleId,
                data.soc,
                data.kwhDeliveredDc,
                data.batteryTemp,
            ]
        );
    } catch (error) {
        throw new AppError("Failed to ingest vehicle telemetry", 500);
    }
};
