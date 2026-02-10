# ⚡ Energy Ingestion Engine
### High-Scale Backend for EV & Smart Meter Telemetry


## 📖 Overview
This project implements a **high-scale backend ingestion and analytics system** designed to process telemetry data from **Electric Vehicles (EVs)** and **Smart Energy Meters**.

The system handles high-frequency data ingestion, maintains real-time operational states, and generates efficient analytical insights while ensuring scalability, performance, and data integrity.

---

## 🛠 Problem Statement
In an EV charging ecosystem, we track two primary metrics:
* **Smart Meters:** Measure **AC energy consumption** from the grid.
* **EVs / Chargers:** Report **DC energy delivered** to the battery along with health metrics.

Due to AC → DC conversion losses, **AC Energy Consumed > DC Energy Delivered**. A significant drop in efficiency may indicate hardware faults, energy leakage, or charging inefficiencies.

---

## 🏗 System Design Approach
The solution utilizes a **Hot and Cold Data Separation Architecture** to balance real-time responsiveness with historical depth.

### 1. Hot Data (Operational Store)
* **Purpose:** Stores only the **latest state** of each device.
* **Implementation:** Optimized **UPSERT** operations.

### 2. Cold Data (Historical Store)
* **Purpose:** Stores **every telemetry record** for deep analytics.
* **Implementation:** **Append-only** design with time-based indexing.

---

## 📊 Database Design

| Table Name | Type | Key Characteristics |
| :--- | :--- | :--- |
| `vehicle_live_status` | **Hot** | Latest SoC, Temp, and DC energy. |
| `meter_live_status` | **Hot** | Latest Voltage and AC consumption. |
| `vehicle_telemetry_history` | **Cold** | Minute-level logs; Indexed on `(device_id, timestamp)`. |
| `meter_telemetry_history` | **Cold** | Immutable log of all meter readings. |

---

## 🚀 API Documentation

### 📥 Ingestion API
**Endpoint:** `POST /v1/ingest`  
The ingestion layer is **polymorphic**, automatically detecting the telemetry type based on the payload structure.

#### **Vehicle Telemetry**
```json
{
  "vehicleId": "V1001",
  "soc": 70,
  "kwhDeliveredDc": 10.5,
  "batteryTemp": 36.5,
  "timestamp": "2026-02-10T10:00:00Z"
}
```
### **Meter Telemetry**
```json
{
  "meterId": "M2001",
  "kwhConsumedAc": 13.2,
  "voltage": 230,
  "timestamp": "2026-02-10T10:00:00Z"
}
```

# 📈 Analytics API Specification

## Performance Metrics Endpoint
Provides a summary of charging performance and battery health for a specific vehicle over the last 24-hour window.

### Endpoint
`GET /v1/analytics/performance/:vehicleId`

---

## 📊 Metrics Explained

The API calculates the following metrics by aggregating telemetry from both the **Hot** and **Cold** storage layers:

| Metric | Description |
| :--- | :--- |
| **Total AC Energy** | Sum of $kWh$ consumed from the grid (Smart Meter data). |
| **Total DC Energy** | Sum of $kWh$ delivered to the vehicle battery. |
| **Avg Battery Temp** | The arithmetic mean of battery temperature readings. |
| **

# Project Documentation

## Efficiency Formula
The core metric for energy calculation is derived using the following formula:

$$\text{Efficiency} = \frac{\text{DC Delivered}}{\text{AC Consumed}}$$

---

## Validation and Error Handling

### Validation
* **Required field validation:** Ensures all mandatory inputs are present.
* **Data type validation:** Verifies inputs match expected formats (e.g., integers, strings).
* **Database Integrity:** Prevents malformed data from entering the database.

### Error Handling
* **Centralized middleware:** A unified layer to catch and process all application errors.
* **Consistent API responses:** Standardized JSON error objects for better client-side handling.
* **Stability:** Prevents server crashes and improves debuggability through structured logging.

---

## Seed Data Strategy
Initial seed data is provided to facilitate:
* **Immediate testing:** Jump straight into the functionality without manual entry.
* **Easy reviewer verification:** Allows stakeholders to see the app in a "populated" state.

**Note:** Seeding is **idempotent**. It is designed to be executed only once, ensuring no duplicate records are created on subsequent re-runs.

---

## Docker Support
The project includes Docker configuration to ensure:
* **Consistent environments:** Eliminates "it works on my machine" issues.
* **Deployment:** Streamlines both local development and production workflows.

---

## Running the Project Locally

1. **Install dependencies**
   ```bash
   npm install
   ```bash
2. **Apply database schema**
   ```bash
   psql -U energy -d energy_db -f src/db/schema.sql
   ```bash

3. **Seed initial data**
   ```bash
   npm run seed
   ```bash
    
4. **Start the server**
   ```bash
   npm start
   ```bash

## Server Access: The API runs at http://localhost:3000

## Project Structure

src/
├── controllers/
├── routes/
├── services/
├── middlewares/
├── utils/
├── db/
│   ├── index.js
│   ├── schema.sql
│   └── seed.sql
├── app.js
└── server.js

## Scalability Considerations

* **Optimized Ingestion:** Built to handle write-heavy energy data streams.
* **Indexing:** Utilizes indexed time-based queries for rapid data retrieval.
* **Data Tiering:** Hot and cold data separation ensures predictable performance as datasets grow.
* **Extensibility:** The architecture is ready to be integrated with message queues like **Kafka** or **RabbitMQ**.

---

## Author

**Aditya Singh**
*Backend / Full Stack Developer*