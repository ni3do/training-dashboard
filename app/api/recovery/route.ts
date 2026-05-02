import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/scripts/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = searchParams.get("days") || "30";

    const daysNum = parseInt(days);
    if (isNaN(daysNum) || daysNum < 1) {
      return NextResponse.json(
        { error: "Invalid days parameter" },
        { status: 400 }
      );
    }

    const db = getDatabase();

    // Calculate the date range
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - daysNum);

    const startDateStr = startDate.toISOString().split("T")[0];

    const stmt = db.prepare(`
      SELECT * FROM whoop_recovery
      WHERE date >= ?
      ORDER BY date DESC
    `);

    const recovery = stmt.all(startDateStr);

    return NextResponse.json(
      {
        success: true,
        count: Array.isArray(recovery) ? recovery.length : 0,
        data: recovery,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch recovery data:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
