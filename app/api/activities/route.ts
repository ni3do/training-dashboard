import { NextRequest, NextResponse } from "next/server";
import { getDatabase, closeDatabase } from "@/scripts/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = searchParams.get("days") || "30";
    const type = searchParams.get("type");

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

    let query = `
      SELECT * FROM activities
      WHERE date >= ?
    `;
    const params: any[] = [startDateStr];

    if (type) {
      query += ` AND type = ?`;
      params.push(type);
    }

    query += ` ORDER BY date DESC`;

    const stmt = db.prepare(query);
    const activities = stmt.all(...params);

    return NextResponse.json(
      {
        success: true,
        count: Array.isArray(activities) ? activities.length : 0,
        data: activities,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch activities:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
