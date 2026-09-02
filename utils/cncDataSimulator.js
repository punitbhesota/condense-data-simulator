import dotenv from "dotenv";
dotenv.config();
import { faker } from "@faker-js/faker";
import { publishKafka } from "./publishToKafka.js";

const MACHINE_COUNT = 5;
const INTERVAL_MS = process.env.INTERVAL_MS || 2000;

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const machineIds = [
  "CNC-001",
  "CNC-002",
  "CNC-003",
  "CNC-004",
  "CNC-005",
  "CNC-006",
  "CNC-007",
  "CNC-008",
  "CNC-009",
  "CNC-010",
];
/**
 * Generates a random sensor data object for the given machineId.
 * @param {number} machineId - The CNC machine id.
 * @returns {Object} A sensor data object with keys:
 *   - timestamp: The current timestamp.
 *   - machineId: The CNC machine id.
 *   - temperature: A random temperature between 20-60.
 *   - spindleSpeed: A random spindle speed between 0-5000.
 *   - vibration: A random vibration between 0-5.
 *   - toolPosition: An object with random x, y and z coordinates between 0-500.
 *   - operationStatus: A random operation status from the array ["IDLE", "RUNNING", "ERROR", "MAINTENANCE"].
 */
const generateSensorData = () => ({
  timestamp: Math.floor(Date.now() / 1000),
  machineId: getRandomItem(machineIds),
  temperature: +(Math.random() * 40 + 20).toFixed(2),
  spindleSpeed: Math.floor(Math.random() * 5000),
  vibration: +(Math.random() * 5).toFixed(2),
  toolPosition: {
    x: +(Math.random() * 500).toFixed(2),
    y: +(Math.random() * 500).toFixed(2),
    z: +(Math.random() * 500).toFixed(2),
  },
  operationStatus: faker.helpers.arrayElement([
    "IDLE",
    "RUNNING",
    "ERROR",
    "MAINTENANCE",
  ]),
});

export const cncSimulator = () => {
  console.info("cncSimulator: Starting CNC Data Simulator...\n");

  setInterval(() => {
    const data = generateSensorData();
    publishKafka(JSON.stringify(data), data.machineId);
    console.debug("cncSimulator: data:", JSON.stringify(data, null, 2));
  }, INTERVAL_MS);
};
