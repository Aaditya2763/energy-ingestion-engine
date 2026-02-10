require("dotenv").config();
const db = require("./db");

async function seed() {
  console.log("🌱 Seeding database...");

  await db.query(`
    INSERT INTO vehicle_live_status
    (vehicle_id, soc, last_kwh_dc, avg_battery_temp)
    VALUES ('V1001', 70, 10.5, 36.5)
    ON CONFLICT (vehicle_id) DO NOTHING
  `);

  await db.query(`
    INSERT INTO meter_live_status
    (meter_id, last_kwh_ac, voltage)
    VALUES ('M2001', 13.2, 230)
    ON CONFLICT (meter_id) DO NOTHING
  `);

  console.log("✅ Seed completed (no duplicates)");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed", err);
  process.exit(1);
});
