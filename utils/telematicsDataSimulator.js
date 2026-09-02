import dotenv from "dotenv";
dotenv.config();
import { faker } from "@faker-js/faker";
import { publishKafka } from "./publishToKafka.js";

const INTERVAL_MS = process.env.INTERVAL_MS || 2000;

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const machineIds = ["20101090", "20101091", "20101092", "20101093", "20101094"];
/**
 * Generates a random telematics data object for the given vehicleId.
 * @param {string} vehicleId - The vehicle id.
 * @returns {Object} A telematics data object with keys:
 *   - vehicleId: The vehicle id.
 *   - timestamp: The current timestamp in seconds.
 *   - location: An object with random latitude and longitude.
 *   - speed: A random speed between 0-120 km/h.
 *   - rpm: A random rpm between 700-4000.
 *   - fuelLevel: A random fuel level between 0-100 %.
 *   - engineTemp: A random engine temperature between 70-120 Celsius.
 *   - tirePressure: An object with random tire pressures between 30-35 PSI for each tire.
 *   - ignition: A random ignition status, either "on" or "off".
 */
const generateTelematicsData = (vehicleId) => {
  return {
    vehicleId,
    timestamp: Math.floor(Date.now() / 1000),
    location: {
      lat: faker.location.latitude(),
      lon: faker.location.longitude(),
    },
    speed: parseFloat((Math.random() * 120).toFixed(2)), // km/h
    rpm: Math.floor(Math.random() * (4000 - 700) + 700),
    fuelLevel: parseFloat((Math.random() * 100).toFixed(2)), // %
    engineTemp: Math.floor(Math.random() * (120 - 70) + 70), // Celsius
    tirePressure: {
      frontLeft: parseFloat((30 + Math.random() * 5).toFixed(2)),
      frontRight: parseFloat((30 + Math.random() * 5).toFixed(2)),
      rearLeft: parseFloat((30 + Math.random() * 5).toFixed(2)),
      rearRight: parseFloat((30 + Math.random() * 5).toFixed(2)),
    },
    ignition: Math.random() > 0.2 ? "on" : "off",
  };
};

/**
 * Simulates telematics data for vehicles at regular intervals.
 * The generated data is published to a Kafka topic.
 * Logs the start and running status of the simulator.
 */

const telematicsSimulator = () => {
  console.info("telematicsSimulator: Starting Telemetry Data Simulator...\n");
  setInterval(() => {
    const vehicleId = getRandomItem(machineIds);
    const data = generateTelematicsData(vehicleId);
    console.debug("telematicsSimulator: Telemetry Data:", data);
    publishKafka(JSON.stringify(data), data.vehicleId);
  }, INTERVAL_MS);
  console.info("telematicsSimulator: Telemetry Data Simulator is running.\n");
};

export const startTlematicsSimulator = () => {
  telematicsSimulator();
};
