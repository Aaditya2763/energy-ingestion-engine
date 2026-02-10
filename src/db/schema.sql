-- ===============================
-- HOT TABLES (Operational Store)
-- ===============================

CREATE TABLE IF NOT EXISTS vehicle_live_status (
  vehicle_id TEXT PRIMARY KEY,
  soc INT NOT NULL,
  last_kwh_dc NUMERIC NOT NULL,
  avg_battery_temp NUMERIC NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS meter_live_status (
  meter_id TEXT PRIMARY KEY,
  last_kwh_ac NUMERIC NOT NULL,
  voltage NUMERIC NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ===============================
-- COLD TABLES (Historical Store)
-- ===============================

CREATE TABLE IF NOT EXISTS vehicle_telemetry_history (
  id BIGSERIAL PRIMARY KEY,
  vehicle_id TEXT NOT NULL,
  soc INT NOT NULL,
  kwh_delivered_dc NUMERIC NOT NULL,
  battery_temp NUMERIC NOT NULL,
  timestamp TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_vehicle_time
ON vehicle_telemetry_history (vehicle_id, timestamp);

CREATE TABLE IF NOT EXISTS meter_telemetry_history (
  id BIGSERIAL PRIMARY KEY,
  meter_id TEXT NOT NULL,
  kwh_consumed_ac NUMERIC NOT NULL,
  voltage NUMERIC NOT NULL,
  timestamp TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_meter_time
ON meter_telemetry_history (meter_id, timestamp);
