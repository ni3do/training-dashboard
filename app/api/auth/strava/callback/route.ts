import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { saveOAuthToken } from "@/scripts/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const state = searchParams.get("state");

    if (error) {
      return NextResponse.redirect(
        new URL(`/settings?strava_error=${encodeURIComponent(error)}`, request.url)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL("/settings?strava_error=no_code", request.url)
      );
    }

    // Exchange code for access token
    const clientId = process.env.STRAVA_CLIENT_ID;
    const clientSecret = process.env.STRAVA_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.redirect(
        new URL("/settings?strava_error=config_missing", request.url)
      );
    }

    const response = await axios.post("https://www.strava.com/oauth/token", {
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
    });

    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;
    const expiresIn = response.data.expires_in;
    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

    // Save tokens to database
    saveOAuthToken("strava", refreshToken, accessToken, expiresAt);

    return NextResponse.redirect(
      new URL("/settings?strava_success=true", request.url)
    );
  } catch (error) {
    console.error("Strava OAuth callback error:", error);
    return NextResponse.redirect(
      new URL(
        `/settings?strava_error=${encodeURIComponent(
          error instanceof Error ? error.message : "Unknown error"
        )}`,
        request.url
      )
    );
  }
}
