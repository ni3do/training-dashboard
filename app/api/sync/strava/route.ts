export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { StravaClient } from "@/scripts/fetch-strava";
import { getOAuthToken, getDatabase } from "@/scripts/db";

export async function POST(_request: NextRequest) {
  // Guard: require a connected Strava account
  const token = getOAuthToken("strava");
  if (!token?.refresh_token) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Strava is not connected. Go to Settings and authorize Strava first.",
      },
      { status: 401 }
    );
  }

  try {
    const client = new StravaClient();
    await client.fetchAllActivities();

    // Return a count of persisted activities so the UI can confirm something happened
    const db = getDatabase();
    const { count } = db
      .prepare("SELECT COUNT(*) AS count FROM activities")
      .get() as { count: number };

    return NextResponse.json({
      success: true,
      message: "Strava activities synced successfully",
      total_activities_stored: count,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Strava sync failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function GET(_request: NextRequest) {
  return NextResponse.json(
    { message: "POST to this endpoint to trigger a Strava activity sync." },
    { status: 405 }
  );
}
