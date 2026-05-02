import cron from "node-cron";
import { runSync } from "./sync-all";

// Get cron schedule from environment or use default (5am daily)
const cronSchedule = process.env.CRON_SCHEDULE || "0 5 * * *";

console.log(`Training data sync scheduled for: ${cronSchedule}`);

// Schedule the sync task
const task = cron.schedule(cronSchedule, async () => {
  console.log(`Running scheduled sync at ${new Date().toISOString()}`);
  try {
    await runSync();
  } catch (error) {
    console.error("Scheduled sync failed:", error);
  }
});

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("Stopping cron scheduler...");
  task.stop();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Stopping cron scheduler...");
  task.stop();
  process.exit(0);
});

// Keep the process running
console.log("Cron scheduler is running. Press Ctrl+C to stop.");
