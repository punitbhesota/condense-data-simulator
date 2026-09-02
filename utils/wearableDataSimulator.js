import { publishKafka } from "./publishToKafka.js";
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomSleepPhase() {
  const phases = ["Awake", "Light", "Deep", "REM"];
  return phases[Math.floor(Math.random() * phases.length)];
}

function generateWearableData(deviceId) {
  const now = new Date().toISOString();

  return {
    deviceId,
    timestamp: Math.floor(Date.now() / 1000),
    heartRate: Math.round(randomInRange(60, 100)), // bpm
    bloodPressure: {
      systolic: Math.round(randomInRange(110, 130)), // mmHg
      diastolic: Math.round(randomInRange(70, 90)), // mmHg
    },
    spo2: Math.round(randomInRange(95, 100)), // %
    bodyTemperature: parseFloat(randomInRange(36.5, 37.5).toFixed(1)), // °C
    steps: Math.floor(randomInRange(0, 10000)), // steps per session
    sleepPhase: getRandomSleepPhase(),
  };
}

function getRandomDeviceId(deviceIds) {
  const index = Math.floor(Math.random() * deviceIds.length);
  return deviceIds[index];
}

// Cache of device IDs
const deviceIds = [
  "wearable-10001",
  "wearable-10002",
  "wearable-10003",
  "wearable-10004",
  "wearable-10005",
  "wearable-10006",
  "wearable-10007",
  "wearable-10008",
  "wearable-10009",
  "wearable-10010",
];

// Config
const INTERVAL_MS = process.env.INTERVAL_MS || 2000; // 2 seconds

// Main simulation loop
export const startWearableSimulator = () => {
  setInterval(() => {
    console.info(
      "startWearableSimulator: Starting wearable simulator with multiple devices...",
    );
    const deviceId = getRandomDeviceId(deviceIds);
    const data = generateWearableData(deviceId);
    console.debug(
      "startWearableSimulator: Wearable Data:",
      JSON.stringify(data, null, 2),
    );
    publishKafka(JSON.stringify(data), data.deviceId);
  }, INTERVAL_MS);
};
