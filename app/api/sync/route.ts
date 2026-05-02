export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { StravaClient } from "@/scripts/fetch-strava";
import { WhoopClient } from "@/scripts/fetch-whoop";
import { getOAuthToken } from "@/scripts/db";

export async function POST(_request: NextRequest) {
  console.log("Full sync triggered at", new Date().toISOString());

  const results: Record<string, { success: boolean; error?: string }> = {};

  // --- Strava ---
  const stravaToken = getOAuthToken("strava");
  if (stravaToken?.refresh_token) {
    try {
      const strava = new StravaClient();
      await strava.fetchAllActivities();
      results.strava = { success: true };
    } catch (err) {
      console.warn("Strava sync failed:", err);
      results.strava = {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  } else {
    results.strava = { success: false, error: "Not connected" };
  }

  // --- Whoop ---
  const whoopToken = getOAuthToken("whoop");
  if (whoopToken?.refresh_token) {
    try {
      const whoop = new WhoopClient();
      await whoop.fetchAllRecoveryData();
      results.whoop = { success: true };
    } catch (err) {
      console.warn("Whoop sync failed:", err);
      results.whoop = {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  } else {
    results.whoop = { success: false, error: "Not connected" };
  }

  const anySuccess = Object.values(results).some((r) => r.success);
  const allFailed = Object.values(results).every((r) => !r.success);

  return NextResponse.json(
    {
      success: anySuccess,
      message: allFailed ? "All syncs failed" : "Sync completed",
      results,
      timestamp: new Date().toISOString(),
    },
    { status: allFailed ? 500 : 200 }
  );
}

export async function GET(_request: NextRequest) {
  return NextResponse.json(
    { message: "Use POST to trigger a full sync" },
    { status: 405 }
  );
}
