import { v4 as uuidv4 } from "uuid";
import { publishKafka } from "./publishToKafka.js";

// Helper functions
const randomInRange = (min, max) => Math.random() * (max - min) + min;

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Cached values
const userIds = [
  "user-001",
  "user-002",
  "user-003",
  "user-004",
  "user-005",
  "user-006",
  "user-007",
  "user-008",
  "user-009",
  "user-010",
];

const deviceIds = [
  "device-1001",
  "device-1002",
  "device-1003",
  "device-1004",
  "device-1005",
];

const merchantCodes = [
  "5411", // Grocery Stores
  "5812", // Restaurants
  "4111", // Transportation
  "5311", // Department Stores
  "5814", // Fast Food
  "6011", // ATM
];

const locations = [
  "New York, USA",
  "London, UK",
  "Mumbai, India",
  "Tokyo, Japan",
  "Berlin, Germany",
  "Toronto, Canada",
];

const channels = ["POS", "Online", "Mobile"];

// Generate a random transaction
const generateTransaction = () => ({
  transaction_id: uuidv4(),
  user_id: getRandomItem(userIds),
  amount: parseFloat(randomInRange(5, 2000).toFixed(2)),
  timestamp: Math.floor(Date.now() / 1000),
  merchant_code: getRandomItem(merchantCodes),
  location: getRandomItem(locations),
  channel: getRandomItem(channels),
  device_id: getRandomItem(deviceIds),
});

// Interval Config
const INTERVAL_MS = process.env.INTERVAL_MS || 2000; // 2 seconds

export const creditCardDataSimulator = () => {
  console.info(
    "creditCardDataSimulator: Starting credit card transaction simulator...",
  );
  setInterval(() => {
    const txn = generateTransaction();
    console.debug("creditCardDataSimulator: Transaction:", txn);
    publishKafka(JSON.stringify(txn), txn.user_id);
  }, INTERVAL_MS);
};
