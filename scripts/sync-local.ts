/**
 * sync-local.ts — Populate the persistent local activity cache.
 *
 * Stores data at Training Plan/data/activities.db (outside the git repo).
 * Fetch once, reuse forever — no need to hit the Strava API every session.
 *
 * Usage:
 *   npm run sync:local          # from training-dashboard/
 *   tsx scripts/sync-local.ts   # directly (sets DB path automatically)
 */

import path from "path";
import { config as dotenvConfig } from "dotenv";

// 1. Load .env credentials (won't override env vars already set externally)
dotenvConfig();

// 2. Pin the DB path to the external cache BEFORE any db-dependent modules load.
//    Using dynamic imports below ensures db.ts reads this value at eval time.
//    process.cwd() is training-dashboard/ when run via npm scripts.
const LOCAL_DB = path.resolve(process.cwd(), "../data/activities.db");
process.env.DATABASE_PATH = LOCAL_DB;

async function main() {
  console.log("\n=".repeat(55));
  console.log(" Local activity cache sync");
  console.log("=".repeat(55));
  console.log(`📦 DB: ${LOCAL_DB}\n`);

  // Dynamic imports so DATABASE_PATH is already set when these modules evaluate
  const { initDatabase } = await import("./init-db");
  const { StravaClient } = await import("./fetch-strava");
  const { closeDatabase } = await import("./db");

  try {
    // Ensure schema exists (safe to run multiple times — CREATE IF NOT EXISTS)
    console.log("🔧 Initialising schema...");
    await initDatabase();

    // Fetch all activities from Strava and write to the cache
    console.log("📡 Fetching Strava activities...\n");
    const client = new StravaClient();
    await client.fetchAllActivities();

    console.log("\n✅ Local cache updated successfully.");
    console.log(`   ${LOCAL_DB}`);
    console.log("=".repeat(55) + "\n");
  } finally {
    closeDatabase();
  }
}

main().catch((err) => {
  console.error("❌ Local sync failed:", err);
  process.exit(1);
});
