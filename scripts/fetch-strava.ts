import axios, { AxiosInstance } from "axios";
import { upsertActivity, getOAuthToken, saveOAuthToken, getDatabase, closeDatabase } from "./db";

const STRAVA_API_BASE = "https://www.strava.com/api/v3";
const STRAVA_AUTH_URL = "https://www.strava.com/oauth/token";

interface StravaActivity {
  id: number;
  name: string;
  type: string;
  sport_type: string;
  start_date: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  average_heartrate?: number;
  max_heartrate?: number;
  average_speed: number;
  total_elevation_gain: number;
  calories?: number;
  suffer_score?: number;
  map?: {
    polyline?: string;
  };
  start_latitude?: number;
  start_longitude?: number;
}

class StravaClient {
  private client: AxiosInstance;
  private clientId: string;
  private clientSecret: string;

  constructor() {
    this.clientId = process.env.STRAVA_CLIENT_ID || "";
    this.clientSecret = process.env.STRAVA_CLIENT_SECRET || "";

    this.client = axios.create({
      baseURL: STRAVA_API_BASE,
      timeout: 10000,
    });
  }

  async refreshAccessToken(): Promise<string> {
    try {
      const token = getOAuthToken("strava");
      if (!token?.refresh_token) {
        throw new Error("No Strava refresh token found. Please set STRAVA_REFRESH_TOKEN.");
      }

      const response = await axios.post(STRAVA_AUTH_URL, {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
      });

      const newAccessToken = response.data.access_token;
      const expiresIn = response.data.expires_in;
      const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

      saveOAuthToken("strava", token.refresh_token, newAccessToken, expiresAt);

      this.client.defaults.headers.authorization = `Bearer ${newAccessToken}`;
      return newAccessToken;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to refresh Strava token:", error.response?.data);
      } else {
        console.error("Failed to refresh Strava token:", error);
      }
      throw error;
    }
  }

  async initializeToken(): Promise<void> {
    const token = getOAuthToken("strava");
    if (token?.access_token) {
      this.client.defaults.headers.authorization = `Bearer ${token.access_token}`;
    } else if (process.env.STRAVA_REFRESH_TOKEN) {
      // Initialize from env variable
      saveOAuthToken("strava", process.env.STRAVA_REFRESH_TOKEN);
      await this.refreshAccessToken();
    } else {
      throw new Error("No Strava authentication found");
    }
  }

  async getActivities(page: number = 1, perPage: number = 30): Promise<StravaActivity[]> {
    try {
      const response = await this.client.get("/athlete/activities", {
        params: {
          per_page: perPage,
          page,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.log("Access token expired, refreshing...");
        await this.refreshAccessToken();
        return this.getActivities(page, perPage);
      }
      throw error;
    }
  }

  private mpsToMinKm(mps: number): string {
    const kmh = mps * 3.6;
    const pace = 60 / kmh; // minutes per km
    const minutes = Math.floor(pace);
    const seconds = Math.round((pace - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  async fetchAllActivities(): Promise<void> {
    console.log("Starting Strava data sync...");

    try {
      await this.initializeToken();

      const allActivities: StravaActivity[] = [];
      let page = 1;
      const perPage = 30;
      let hasMore = true;

      while (hasMore) {
        console.log(`Fetching page ${page}...`);
        const activities = await this.getActivities(page, perPage);

        if (activities.length === 0) {
          hasMore = false;
          break;
        }

        allActivities.push(...activities);
        page += 1;

        if (activities.length < perPage) {
          hasMore = false;
        }
      }

      console.log(`Retrieved ${allActivities.length} activities from Strava`);

      // Process and store activities
      for (const activity of allActivities) {
        const date = new Date(activity.start_date).toISOString().split("T")[0];

        upsertActivity({
          strava_id: activity.id,
          name: activity.name,
          type: activity.type,
          sport_type: activity.sport_type,
          date,
          distance_km: activity.distance / 1000,
          duration_seconds: activity.moving_time,
          avg_hr: activity.average_heartrate || undefined,
          max_hr: activity.max_heartrate || undefined,
          avg_pace: this.mpsToMinKm(activity.average_speed),
          elevation_m: Math.round(activity.total_elevation_gain),
          calories: activity.calories || undefined,
          suffer_score: activity.suffer_score || undefined,
          latitude: activity.start_latitude || undefined,
          longitude: activity.start_longitude || undefined,
          polyline: activity.map?.polyline || undefined,
        });
      }

      console.log("Strava sync completed successfully");
    } catch (error) {
      console.error("Strava sync failed:", error);
      throw error;
    }
  }
}

// Main execution
async function main() {
  try {
    const client = new StravaClient();
    await client.fetchAllActivities();
  } finally {
    closeDatabase();
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

export { StravaClient };
