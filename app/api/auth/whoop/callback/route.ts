import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { saveOAuthToken } from "@/scripts/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.redirect(
        new URL(`/settings?whoop_error=${encodeURIComponent(error)}`, request.url)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL("/settings?whoop_error=no_code", request.url)
      );
    }

    // Exchange code for access token
    const clientId = process.env.WHOOP_CLIENT_ID;
    const clientSecret = process.env.WHOOP_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.redirect(
        new URL("/settings?whoop_error=config_missing", request.url)
      );
    }

    const response = await axios.post(
      "https://api.prod.whoop.com/oauth/oauth2/auth/token",
      {
        grant_type: "authorization_code",
        code,
        client_id: clientId,
        client_secret: clientSecret,
      }
    );

    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;
    const expiresIn = response.data.expires_in;
    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

    // Save tokens to database
    saveOAuthToken("whoop", refreshToken, accessToken, expiresAt);

    return NextResponse.redirect(
      new URL("/settings?whoop_success=true", request.url)
    );
  } catch (error) {
    console.error("Whoop OAuth callback error:", error);
    return NextResponse.redirect(
      new URL(
        `/settings?whoop_error=${encodeURIComponent(
          error instanceof Error ? error.message : "Unknown error"
        )}`,
        request.url
      )
    );
  }
}
