// Logging Configuration Module

// This module configures the behavior of the console object based on the ENABLE_LOGGING environment variable.
// Users can selectively enable or disable various logging levels by setting the ENABLE_LOGGING variable.

// Configuration Options:
// - ENABLE_LOGGING controls which logging levels are enabled.

// Logging Levels:
// 1. Specific Logging Levels
//    - Example: ENABLE_LOGGING = debug,error
//    - Description: Enable specific logging levels by providing a comma-separated list of levels.
//    - Available Levels: log, debug, info, warn, error, trace, time, timeLog, timeEnd.
// 2. Enable All Logging
//    - Example: ENABLE_LOGGING = all
//    - Description: Enable all logging levels to capture comprehensive logs during development.
// 3. Disable All Logging
//    - Example: ENABLE_LOGGING = disable
//    - Description: Disable all logging levels except info.

import dotenv from "dotenv";
dotenv.config();

const enableLogging = process.env.ENABLE_LOGGING || "";
const enableLoggingTag =
  process.env.ENABLE_LOGGING_TAG?.toLowerCase() === "true";

// Function to get the current timestamp in the desired format (YYYY-MM-DD HH:mm:ss) in UTC
function getFormattedTimestamp() {
  const now = new Date();
  return now.toISOString().replace("T", " ").substring(0, 19);
}

// Function to wrap a logging method with a timestamp and optional log level tag
function wrapLogMethod(method, logLevel = "INFO") {
  return function (...args) {
    const timestamp = `[${getFormattedTimestamp()}]`;
    const tag = enableLoggingTag ? `[${logLevel}]` : "";
    const prefix = tag ? `${timestamp} ${tag}` : timestamp;
    method(prefix, ...args);
  };
}

const originalConsole = {
  log: console.log,
  debug: console.debug,
  info: console.info,
  warn: console.warn,
  error: console.error,
  trace: console.trace,
  time: console.time,
  timeLog: console.timeLog,
  timeEnd: console.timeEnd,
};

if (enableLogging.toLowerCase() === "all") {
  // Enable all logging levels
  console.log = wrapLogMethod(originalConsole.log, "LOG");
  console.debug = wrapLogMethod(originalConsole.debug, "DEBUG");
  console.info = wrapLogMethod(originalConsole.info, "INFO");
  console.warn = wrapLogMethod(originalConsole.warn, "WARN");
  console.error = wrapLogMethod(originalConsole.error, "ERROR");
  console.trace = wrapLogMethod(originalConsole.trace, "TRACE");
  console.time = originalConsole.time;
  console.timeLog = originalConsole.timeLog;
  console.timeEnd = originalConsole.timeEnd;
} else if (
  enableLogging.includes("log") ||
  enableLogging.includes("debug") ||
  enableLogging.includes("info") ||
  enableLogging.includes("warn") ||
  enableLogging.includes("error") ||
  enableLogging.includes("trace") ||
  enableLogging.includes("time") ||
  enableLogging.includes("timeLog") ||
  enableLogging.includes("timeEnd")
) {
  // Enable logging based on the specified levels
  console.log = enableLogging.includes("log")
    ? wrapLogMethod(originalConsole.log, "LOG")
    : () => {};

  console.debug = enableLogging.includes("debug")
    ? wrapLogMethod(originalConsole.debug, "DEBUG")
    : () => {};

  console.info = enableLogging.includes("info")
    ? wrapLogMethod(originalConsole.info, "INFO")
    : () => {};

  console.warn = enableLogging.includes("warn")
    ? wrapLogMethod(originalConsole.warn, "WARN")
    : () => {};

  console.error = enableLogging.includes("error")
    ? wrapLogMethod(originalConsole.error, "ERROR")
    : () => {};

  console.trace = enableLogging.includes("trace")
    ? wrapLogMethod(originalConsole.trace, "TRACE")
    : () => {};

  console.time = enableLogging.includes("time")
    ? originalConsole.time
    : () => {};

  console.timeLog = enableLogging.includes("timeLog")
    ? originalConsole.timeLog
    : () => {};

  console.timeEnd = enableLogging.includes("timeEnd")
    ? originalConsole.timeEnd
    : () => {};
} else {
  // Disable all logging levels except info (default behavior)
  console.log =
    console.debug =
    console.warn =
    console.error =
    console.trace =
    console.timeLog =
    console.timeEnd =
    console.time =
      () => {};

  console.info = wrapLogMethod(originalConsole.info, "INFO");
}

export default console;
