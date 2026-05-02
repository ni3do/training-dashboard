import { exec } from "child_process";
import { promisify } from "util";
import path from "path";

const execAsync = promisify(exec);

async function runSync() {
  console.log("=".repeat(60));
  console.log("Starting full training data sync...");
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log("=".repeat(60));

  try {
    // Sync Strava data
    console.log("\n[1/2] Syncing Strava activities...");
    try {
      await execAsync("npm run sync:strava");
      console.log("✓ Strava sync completed");
    } catch (error) {
      console.warn("⚠ Strava sync failed (continuing with Whoop):", error);
    }

    // Sync Whoop data
    console.log("\n[2/2] Syncing Whoop recovery data...");
    try {
      await execAsync("npm run sync:whoop");
      console.log("✓ Whoop sync completed");
    } catch (error) {
      console.warn("⚠ Whoop sync failed:", error);
    }

    console.log("\n" + "=".repeat(60));
    console.log("Full sync completed at", new Date().toISOString());
    console.log("=".repeat(60));
  } catch (error) {
    console.error("Fatal sync error:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  runSync().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

export { runSync };
