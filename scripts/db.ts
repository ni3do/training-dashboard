import Database from "better-sqlite3";
import path from "path";

const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), "data", "training.db");

let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (!db) {
    db = new Database(dbPath);
    db.pragma("foreign_keys = ON");
  }
  return db;
}

export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}

export interface Activity {
  strava_id: number;
  name: string;
  type: string;
  sport_type?: string;
  date: string;
  distance_km?: number;
  duration_seconds?: number;
  avg_hr?: number;
  max_hr?: number;
  avg_pace?: string;
  elevation_m?: number;
  calories?: number;
  suffer_score?: number;
  latitude?: number;
  longitude?: number;
  polyline?: string;
}

export interface WhoopRecovery {
  date: string;
  recovery_score?: number;
  hrv?: number;
  rhr?: number;
  sleep_score?: number;
  sleep_hours?: number;
  strain_score?: number;
}

export interface TrainingPlanEntry {
  date: string;
  workout_type: string;
  description?: string;
  target_duration_minutes?: number;
  target_intensity?: string;
  sport: string;
  completed?: boolean;
  actual_duration_minutes?: number;
  notes?: string;
}

export function upsertActivity(activity: Activity): void {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO activities (
      strava_id, name, type, sport_type, date, distance_km, duration_seconds,
      avg_hr, max_hr, avg_pace, elevation_m, calories, suffer_score,
      latitude, longitude, polyline, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(strava_id) DO UPDATE SET
      name = excluded.name,
      distance_km = excluded.distance_km,
      duration_seconds = excluded.duration_seconds,
      avg_hr = excluded.avg_hr,
      max_hr = excluded.max_hr,
      avg_pace = excluded.avg_pace,
      elevation_m = excluded.elevation_m,
      calories = excluded.calories,
      suffer_score = excluded.suffer_score,
      latitude = excluded.latitude,
      longitude = excluded.longitude,
      polyline = excluded.polyline,
      updated_at = CURRENT_TIMESTAMP
  `);

  stmt.run(
    activity.strava_id,
    activity.name,
    activity.type,
    activity.sport_type || null,
    activity.date,
    activity.distance_km || null,
    activity.duration_seconds || null,
    activity.avg_hr || null,
    activity.max_hr || null,
    activity.avg_pace || null,
    activity.elevation_m || null,
    activity.calories || null,
    activity.suffer_score || null,
    activity.latitude || null,
    activity.longitude || null,
    activity.polyline || null
  );
}

export function upsertWhoopRecovery(recovery: WhoopRecovery): void {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO whoop_recovery (
      date, recovery_score, hrv, rhr, sleep_score, sleep_hours, strain_score, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(date) DO UPDATE SET
      recovery_score = excluded.recovery_score,
      hrv = excluded.hrv,
      rhr = excluded.rhr,
      sleep_score = excluded.sleep_score,
      sleep_hours = excluded.sleep_hours,
      strain_score = excluded.strain_score,
      updated_at = CURRENT_TIMESTAMP
  `);

  stmt.run(
    recovery.date,
    recovery.recovery_score || null,
    recovery.hrv || null,
    recovery.rhr || null,
    recovery.sleep_score || null,
    recovery.sleep_hours || null,
    recovery.strain_score || null
  );
}

export function upsertTrainingPlan(entry: TrainingPlanEntry): void {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO training_plan (
      date, workout_type, description, target_duration_minutes,
      target_intensity, sport, completed, actual_duration_minutes, notes, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(date, workout_type) DO UPDATE SET
      description = excluded.description,
      target_duration_minutes = excluded.target_duration_minutes,
      target_intensity = excluded.target_intensity,
      completed = excluded.completed,
      actual_duration_minutes = excluded.actual_duration_minutes,
      notes = excluded.notes,
      updated_at = CURRENT_TIMESTAMP
  `);

  stmt.run(
    entry.date,
    entry.workout_type,
    entry.description || null,
    entry.target_duration_minutes || null,
    entry.target_intensity || null,
    entry.sport,
    entry.completed ? 1 : 0,
    entry.actual_duration_minutes || null,
    entry.notes || null
  );
}

export function getActivitiesSince(sinceDate: string): Activity[] {
  const db = getDatabase();
  const stmt = db.prepare(`
    SELECT * FROM activities WHERE date >= ? ORDER BY date DESC
  `);
  return stmt.all(sinceDate) as Activity[];
}

export function getWhoopRecoverySince(sinceDate: string): WhoopRecovery[] {
  const db = getDatabase();
  const stmt = db.prepare(`
    SELECT * FROM whoop_recovery WHERE date >= ? ORDER BY date DESC
  `);
  return stmt.all(sinceDate) as WhoopRecovery[];
}

export function getTrainingPlanRange(startDate: string, endDate: string): TrainingPlanEntry[] {
  const db = getDatabase();
  const stmt = db.prepare(`
    SELECT * FROM training_plan WHERE date BETWEEN ? AND ? ORDER BY date
  `);
  return stmt.all(startDate, endDate) as TrainingPlanEntry[];
}

export function saveOAuthToken(service: string, refreshToken: string, accessToken?: string, expiresAt?: string): void {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO oauth_tokens (service, refresh_token, access_token, expires_at, updated_at)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(service) DO UPDATE SET
      refresh_token = excluded.refresh_token,
      access_token = excluded.access_token,
      expires_at = excluded.expires_at,
      updated_at = CURRENT_TIMESTAMP
  `);

  stmt.run(service, refreshToken, accessToken || null, expiresAt || null);
}

export function getOAuthToken(service: string): { refresh_token: string; access_token?: string; expires_at?: string } | null {
  const db = getDatabase();
  const stmt = db.prepare(`SELECT refresh_token, access_token, expires_at FROM oauth_tokens WHERE service = ?`);
  return stmt.get(service) as any;
}
