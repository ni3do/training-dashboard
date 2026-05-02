import Database from "better-sqlite3";
import path from "path";
import { mkdir } from "fs/promises";

const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), "data", "training.db");

async function initDatabase() {
  try {
    // Ensure data directory exists
    await mkdir(path.dirname(dbPath), { recursive: true });

    const db = new Database(dbPath);

    // Enable foreign keys
    db.pragma("foreign_keys = ON");

    // Create activities table (Strava data)
    db.exec(`
      CREATE TABLE IF NOT EXISTS activities (
        id INTEGER PRIMARY KEY,
        strava_id INTEGER UNIQUE,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        sport_type TEXT,
        date TEXT NOT NULL,
        distance_km REAL,
        duration_seconds INTEGER,
        avg_hr INTEGER,
        max_hr INTEGER,
        avg_pace TEXT,
        elevation_m INTEGER,
        calories INTEGER,
        suffer_score INTEGER,
        latitude REAL,
        longitude REAL,
        polyline TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create whoop recovery table
    db.exec(`
      CREATE TABLE IF NOT EXISTS whoop_recovery (
        id INTEGER PRIMARY KEY,
        date TEXT UNIQUE NOT NULL,
        recovery_score REAL,
        hrv REAL,
        rhr INTEGER,
        sleep_score REAL,
        sleep_hours REAL,
        strain_score REAL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create training plan table
    db.exec(`
      CREATE TABLE IF NOT EXISTS training_plan (
        id INTEGER PRIMARY KEY,
        date TEXT NOT NULL,
        workout_type TEXT NOT NULL,
        description TEXT,
        target_duration_minutes INTEGER,
        target_intensity TEXT,
        sport TEXT NOT NULL,
        completed BOOLEAN DEFAULT 0,
        actual_duration_minutes INTEGER,
        notes TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(date, workout_type)
      );
    `);

    // Create oauth tokens table
    db.exec(`
      CREATE TABLE IF NOT EXISTS oauth_tokens (
        id INTEGER PRIMARY KEY,
        service TEXT UNIQUE NOT NULL,
        refresh_token TEXT NOT NULL,
        access_token TEXT,
        expires_at TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_activities_date ON activities(date);
      CREATE INDEX IF NOT EXISTS idx_activities_strava_id ON activities(strava_id);
      CREATE INDEX IF NOT EXISTS idx_whoop_recovery_date ON whoop_recovery(date);
      CREATE INDEX IF NOT EXISTS idx_training_plan_date ON training_plan(date);
    `);

    console.log("Database initialized successfully at:", dbPath);
    db.close();
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1);
  }
}

initDatabase();
