import { publishKafka } from "./publishToKafka.js";

const INTERVAL_MS = process.env.INTERVAL_MS || 2000;
const getRandomFloat = (min, max, decimals = 2) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
};

// Cache of Sensor IDs
const sensorCache = [
  {
    sensorId: "soil-sensor-001",
    location: "Field A - North",
    type: "MoistureSensor",
    farmName: "Green Valley Farm",
  },
  {
    sensorId: "soil-sensor-002",
    location: "Field A - South",
    type: "MoistureSensor",
    farmName: "Green Valley Farm",
  },
  {
    sensorId: "soil-sensor-003",
    location: "Field B - East",
    type: "TemperatureSensor",
    farmName: "Sunny Hills Farm",
  },
  {
    sensorId: "soil-sensor-004",
    location: "Field B - West",
    type: "pHSensor",
    farmName: "Sunny Hills Farm",
  },
  {
    sensorId: "soil-sensor-005",
    location: "Field C - Center",
    type: "MultiSensor",
    farmName: "Riverbank Farm",
  },
];

// Function to randomly pick a sensor ID from cache
const getRandomSensor = () => {
  const randomIndex = Math.floor(Math.random() * sensorCache.length);
  return sensorCache[randomIndex];
};

// Soil Sensor Simulator
function simulateSoilSensor(sensor) {
  return {
    sensorId: sensor.sensorId,
    location: sensor.location,
    type: sensor.type,
    farmName: sensor.farmName,
    timestamp: Math.floor(Date.now() / 1000),
    moisture: getRandomFloat(10, 60), // Moisture percentage
    temperature: getRandomFloat(10, 35), // Temperature in Celsius
    pH: getRandomFloat(5.5, 7.5), // Soil pH
  };
}

// Main Simulation Function
export const soilDataSimulatior = () => {
  console.info("soilDataSimulator: Starting Soil Sensor Data Simulator...\n");
  setInterval(() => {
    const randomSensorId = getRandomSensor();
    const soilSensorData = simulateSoilSensor(randomSensorId);

    console.debug("soilDataSimulator: Soil Sensor Data:", soilSensorData);
    publishKafka(JSON.stringify(soilSensorData), soilSensorData.sensorId);
  }, INTERVAL_MS); // every 5 seconds
};
