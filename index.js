import dotenv from "dotenv";
dotenv.config();
import { cncSimulator } from "./utils/cncDataSimulator.js";
import { startTlematicsSimulator } from "./utils/telematicsDataSimulator.js";
import { startWearableSimulator } from "./utils/wearableDataSimulator.js";
import { soilDataSimulatior } from "./utils/soilSensorDataSimulator.js";
import { creditCardDataSimulator } from "./utils/creditCardDataSimulator.js";
import "./logger.js";

//hello

if (process.env.DATA_SIMULATOR === "true") {
  console.info("Data Simulator is enabled");
  // Add your data simulation code here
  if (
    process.env.INDUSTRIAL_AUTOMATION === "true" ||
    process.env.INDUSTRIAL_DATA_SIMULATOR === "true"
  ) {
    console.info("Industrial Automation is enabled");
    // Add your industrial automation code here
    cncSimulator();
  } else if (
    process.env.TELEMATICS_SIMULATOR === "true" ||
    process.env.TELEMATICS_DATA_SIMULATOR === "true"
  ) {
    console.info("Telemetry Simulation is enabled");
    // Add your telemetry simulation code here
    startTlematicsSimulator();
  } else if (process.env.WEARABLE_SIMULATOR === "true") {
    console.info("Wearable Simulation is enabled");
    // Add your wearable simulation code here
    startWearableSimulator();
  } else if (
    process.env.SOIL_SENSOR_SIMULATOR === "true" ||
    process.env.SOIL_SENSOR_DATA_SIMULATOR === "true"
  ) {
    console.info("Soil Sensor Simulation is enabled");
    // Add your soil sensor simulation code here
    soilDataSimulatior();
  } else if (process.env.CREDIT_CARD_SIMULATOR === "true") {
    console.info("Credit Card Simulation is enabled");
    // Add your credit card simulation code here
    creditCardDataSimulator();
  } else {
    startTlematicsSimulator();
  }
} else {
  console.info("Data Simulator is disabled");
}
