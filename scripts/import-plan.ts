/**
 * Import training-plan.json into the SQLite database.
 * Runs on container startup after init-db.ts.
 */
import fs from "fs";
import path from "path";
import { upsertTrainingPlan, closeDatabase } from "./db";

const planPath = path.join(process.cwd(), "training-plan.json");

async function importPlan() {
  if (!fs.existsSync(planPath)) {
    console.log("No training-plan.json found, skipping import.");
    return;
  }

  try {
    const raw = JSON.parse(fs.readFileSync(planPath, "utf-8"));

    // Support both formats: array or { plan_metadata, training_days }
    const days = Array.isArray(raw) ? raw : raw.training_days;

    if (!days || !Array.isArray(days)) {
      console.error("Invalid training-plan.json format — expected array or { training_days: [] }");
      return;
    }

    let imported = 0;
    let skipped = 0;

    for (const day of days) {
      // Skip rest days with 0 duration (optional — include them for completeness)
      try {
        upsertTrainingPlan({
          date: day.date,
          sport: day.sport,
          workout_type: day.workout_type,
          description: day.description || "",
          target_duration_minutes: day.target_duration_minutes || 0,
          target_intensity: day.target_intensity || "none",
          completed: false,
          notes: day.notes || "",
        });
        imported++;
      } catch (err) {
        console.warn(`Skipped ${day.date}: ${err}`);
        skipped++;
      }
    }

    console.log(`Training plan imported: ${imported} days (${skipped} skipped)`);
  } catch (error) {
    console.error("Failed to import training plan:", error);
  }
}

importPlan()
  .catch(console.error)
  .finally(() => closeDatabase());
