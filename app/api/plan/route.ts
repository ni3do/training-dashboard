export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/scripts/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = searchParams.get("days") || "14";

    const daysNum = parseInt(days);
    if (isNaN(daysNum) || daysNum < 1) {
      return NextResponse.json(
        { error: "Invalid days parameter" },
        { status: 400 }
      );
    }

    const db = getDatabase();

    // Calculate the date range
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + daysNum);

    const startDateStr = startDate.toISOString().split("T")[0];
    const endDateStr = endDate.toISOString().split("T")[0];

    const stmt = db.prepare(`
      SELECT * FROM training_plan
      WHERE date BETWEEN ? AND ?
      ORDER BY date ASC
    `);

    const plan = stmt.all(startDateStr, endDateStr);

    return NextResponse.json(
      {
        success: true,
        count: Array.isArray(plan) ? plan.length : 0,
        data: plan,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch training plan:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
