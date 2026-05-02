import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/scripts/db";

interface Activity {
  date: string;
  duration_seconds?: number;
  suffer_score?: number;
}

interface MetricsResult {
  date: string;
  ctl: number; // Chronic Training Load (fitness)
  atl: number; // Acute Training Load (fatigue)
  tsb: number; // Training Stress Balance
  daily_tss: number;
}

function calculateTSS(activity: Activity): number {
  // Simplified TSS calculation based on suffer score and duration
  if (!activity.suffer_score || !activity.duration_seconds) {
    return 0;
  }

  // Suffer score is 0-100, use it directly as proxy for intensity
  // Duration in minutes
  const durationMinutes = activity.duration_seconds / 60;
  const intensity = activity.suffer_score / 100;

  // TSS ≈ (duration * intensity * FTP) / (FTP * 3600) * 100
  // Simplified: TSS ≈ (duration_minutes * intensity) / 60 * 100
  return (durationMinutes * intensity) / 0.75;
}

function calculateMetrics(activities: Activity[], days: number = 42): MetricsResult[] {
  const endDate = new Date();
  endDate.setHours(0, 0, 0, 0);

  const results: MetricsResult[] = [];

  // Initialize CTL (fitness baseline ~50)
  let ctl = 50;
  const ctlDecay = 42;
  const atlDecay = 7;

  for (let i = -days; i <= 0; i++) {
    const currentDate = new Date(endDate);
    currentDate.setDate(currentDate.getDate() + i);
    const dateStr = currentDate.toISOString().split("T")[0];

    // Get activities for this day
    const dayActivities = activities.filter((a) => a.date === dateStr);
    const dailyTSS = dayActivities.reduce((sum, a) => sum + calculateTSS(a), 0);

    // Update CTL (chronic load)
    ctl = ctl * Math.exp(-1 / ctlDecay) + dailyTSS * (1 - Math.exp(-1 / ctlDecay));

    // Calculate ATL (acute load)
    const recentTSS = activities
      .filter((a) => {
        const actDate = new Date(a.date);
        const daysAgo = Math.floor((currentDate.getTime() - actDate.getTime()) / (1000 * 60 * 60 * 24));
        return daysAgo >= 0 && daysAgo <= 7;
      })
      .reduce((sum, a) => sum + calculateTSS(a), 0);

    const atl = (recentTSS / atlDecay) * 7;

    // TSB = CTL - ATL
    const tsb = ctl - atl;

    results.push({
      date: dateStr,
      ctl: Math.round(ctl * 10) / 10,
      atl: Math.round(atl * 10) / 10,
      tsb: Math.round(tsb * 10) / 10,
      daily_tss: Math.round(dailyTSS * 10) / 10,
    });
  }

  return results;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = searchParams.get("days") || "42";

    const daysNum = parseInt(days);
    if (isNaN(daysNum) || daysNum < 1) {
      return NextResponse.json(
        { error: "Invalid days parameter" },
        { status: 400 }
      );
    }

    const db = getDatabase();

    // Get all activities for the date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysNum);
    const startDateStr = startDate.toISOString().split("T")[0];

    const stmt = db.prepare(`
      SELECT date, duration_seconds, suffer_score
      FROM activities
      WHERE date >= ?
      ORDER BY date ASC
    `);

    const activities = stmt.all(startDateStr) as Activity[];

    // Calculate metrics
    const metrics = calculateMetrics(activities, daysNum);

    // Get latest recovery data for context
    const recoveryStmt = db.prepare(`
      SELECT AVG(recovery_score) as avg_recovery, AVG(strain_score) as avg_strain
      FROM whoop_recovery
      WHERE date >= ?
    `);

    const recovery = recoveryStmt.get(startDateStr) as {
      avg_recovery: number | null;
      avg_strain: number | null;
    };

    return NextResponse.json(
      {
        success: true,
        data: metrics,
        recovery: {
          avg_recovery: recovery?.avg_recovery ? Math.round(recovery.avg_recovery * 10) / 10 : null,
          avg_strain: recovery?.avg_strain ? Math.round(recovery.avg_strain * 10) / 10 : null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to calculate metrics:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
