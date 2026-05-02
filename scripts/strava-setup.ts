#!/usr/bin/env npx ts-node
/**
 * Strava OAuth Setup Helper
 *
 * One-time script to get your initial Strava refresh token.
 * After this, the app handles token refresh automatically.
 *
 * Usage:
 *   1. Create a Strava API app at https://www.strava.com/settings/api
 *   2. Copy your Client ID and Client Secret into .env
 *   3. Run: npx ts-node scripts/strava-setup.ts
 *   4. Open the URL it prints, authorize, copy the code from the redirect
 *   5. Paste the code when prompted
 */

import axios from "axios";
import * as readline from "readline";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("\n❌ Missing STRAVA_CLIENT_ID or STRAVA_CLIENT_SECRET in .env");
  console.error("   Copy .env.example to .env and fill in your Strava API credentials.\n");
  process.exit(1);
}

const REDIRECT_URI = "http://localhost";
const SCOPES = "activity:read_all";

const authUrl =
  `https://www.strava.com/oauth/authorize` +
  `?client_id=${CLIENT_ID}` +
  `&response_type=code` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&scope=${SCOPES}` +
  `&approval_prompt=force`;

console.log("\n🏔️  Strava OAuth Setup\n");
console.log("Step 1: Open this URL in your browser:\n");
console.log(`   ${authUrl}\n`);
console.log("Step 2: Authorize the app. Strava will redirect to a localhost URL.");
console.log('        The URL will look like: http://localhost?state=&code=XXXXX&scope=...');
console.log("        Copy the 'code' value from that URL.\n");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Step 3: Paste the code here: ", async (code: string) => {
  code = code.trim();

  if (!code) {
    console.error("❌ No code provided. Exiting.");
    rl.close();
    process.exit(1);
  }

  try {
    console.log("\nExchanging code for tokens...");

    const response = await axios.post("https://www.strava.com/oauth/token", {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
    });

    const { access_token, refresh_token, expires_at, athlete } = response.data;

    console.log("\n✅ Success! Connected as:", athlete.firstname, athlete.lastname);
    console.log("   Athlete ID:", athlete.id);
    console.log("   Access token expires:", new Date(expires_at * 1000).toISOString());
    console.log("\n📋 Add this to your .env file:\n");
    console.log(`   STRAVA_REFRESH_TOKEN=${refresh_token}`);
    console.log(`\n   (Access token: ${access_token})`);
    console.log("   (The app will auto-refresh this using the refresh token)\n");

    // Also try to save to the database if it exists
    try {
      const { saveOAuthToken, closeDatabase } = require("./db");
      saveOAuthToken("strava", refresh_token, access_token, new Date(expires_at * 1000).toISOString());
      console.log("💾 Tokens saved to database automatically.\n");
      closeDatabase();
    } catch {
      console.log("💡 Run 'npx ts-node scripts/init-db.ts' first, then re-run this to save tokens to the DB.\n");
    }

    // Quick test: fetch recent activities
    console.log("📊 Testing API access — fetching your 5 most recent activities...\n");

    const activitiesResponse = await axios.get(
      "https://www.strava.com/api/v3/athlete/activities",
      {
        headers: { Authorization: `Bearer ${access_token}` },
        params: { per_page: 5, page: 1 },
      }
    );

    const activities = activitiesResponse.data;
    if (activities.length === 0) {
      console.log("   No activities found.\n");
    } else {
      for (const act of activities) {
        const date = new Date(act.start_date).toLocaleDateString();
        const dist = (act.distance / 1000).toFixed(1);
        const elev = Math.round(act.total_elevation_gain);
        const dur = `${Math.floor(act.moving_time / 3600)}h${Math.floor((act.moving_time % 3600) / 60).toString().padStart(2, "0")}m`;
        console.log(`   ${date}  ${act.type.padEnd(12)} ${act.name}`);
        console.log(`            ${dist}km | ${elev}m elev | ${dur}`);
      }
      console.log();
    }

    console.log("🎉 Setup complete! You can now:");
    console.log("   - Run 'npx ts-node scripts/fetch-strava.ts' to sync all activities");
    console.log("   - Or use the dashboard's Settings page to trigger syncs\n");
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("\n❌ Token exchange failed:", error.response?.data || error.message);
      if (error.response?.data?.message === "Bad Request") {
        console.error("   The code may have expired. Codes are single-use and expire quickly.");
        console.error("   Try again with a fresh code.\n");
      }
    } else {
      console.error("\n❌ Error:", error);
    }
    process.exit(1);
  }

  rl.close();
});
