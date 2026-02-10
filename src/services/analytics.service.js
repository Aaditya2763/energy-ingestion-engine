const db = require("../db");

exports.calculatePerformance = async (vehicleId) => {
  const { rows } = await db.query(
    `
    SELECT
      SUM(v.kwh_delivered_dc) AS total_dc,
      SUM(m.kwh_consumed_ac) AS total_ac,
      AVG(v.battery_temp) AS avg_temp
    FROM vehicle_telemetry_history v
    JOIN meter_telemetry_history m
      ON DATE_TRUNC('minute', v.timestamp) = DATE_TRUNC('minute', m.timestamp)
    WHERE v.vehicle_id = $1
      AND v.timestamp >= NOW() - INTERVAL '24 HOURS'
    `,
    [vehicleId]
  );

  const { total_dc, total_ac, avg_temp } = rows[0];

  return {
    totalAcConsumed: Number(total_ac || 0),
    totalDcDelivered: Number(total_dc || 0),
    efficiencyRatio: total_ac ? Number(total_dc / total_ac).toFixed(2) : 0,
    averageBatteryTemp: Number(avg_temp || 0),
  };
};
