import axios, { AxiosInstance } from "axios";
import { upsertWhoopRecovery, getOAuthToken, saveOAuthToken, getDatabase, closeDatabase } from "./db";

const WHOOP_API_BASE = "https://api.prod.whoop.com/developer/v1";
const WHOOP_AUTH_URL = "https://api.prod.whoop.com/oauth/oauth2/auth/token";

interface WhoopCycle {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  start: string;
  end: string;
  timezone: string;
  score: {
    token: string;
    recovery_score: number;
    resting_heart_rate: number;
    heart_rate_variability: number;
    sleep_performance: number;
    previous_night_sleep: {
      total_sleep_time_milli: number;
    };
  };
  strain: {
    token: string;
    strain_score: number;
  };
}

class WhoopClient {
  private client: AxiosInstance;
  private clientId: string;
  private clientSecret: string;

  constructor() {
    this.clientId = process.env.WHOOP_CLIENT_ID || "";
    this.clientSecret = process.env.WHOOP_CLIENT_SECRET || "";

    this.client = axios.create({
      baseURL: WHOOP_API_BASE,
      timeout: 10000,
    });
  }

  async refreshAccessToken(): Promise<string> {
    try {
      const token = getOAuthToken("whoop");
      if (!token?.refresh_token) {
        throw new Error("No Whoop refresh token found. Please set WHOOP_REFRESH_TOKEN.");
      }

      const response = await axios.post(WHOOP_AUTH_URL, {
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
        client_id: this.clientId,
        client_secret: this.clientSecret,
      });

      const newAccessToken = response.data.access_token;
      const expiresIn = response.data.expires_in;
      const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

      saveOAuthToken("whoop", token.refresh_token, newAccessToken, expiresAt);

      this.client.defaults.headers.authorization = `Bearer ${newAccessToken}`;
      return newAccessToken;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to refresh Whoop token:", error.response?.data);
      } else {
        console.error("Failed to refresh Whoop token:", error);
      }
      throw error;
    }
  }

  async initializeToken(): Promise<void> {
    const token = getOAuthToken("whoop");
    if (token?.access_token) {
      this.client.defaults.headers.authorization = `Bearer ${token.access_token}`;
    } else if (process.env.WHOOP_REFRESH_TOKEN) {
      // Initialize from env variable
      saveOAuthToken("whoop", process.env.WHOOP_REFRESH_TOKEN);
      await this.refreshAccessToken();
    } else {
      throw new Error("No Whoop authentication found");
    }
  }

  async getCycles(start: string, end: string, limit: number = 100): Promise<WhoopCycle[]> {
    try {
      const response = await this.client.get("/cycles", {
        params: {
          start,
          end,
          limit,
        },
      });
      return response.data.records || [];
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.log("Access token expired, refreshing...");
        await this.refreshAccessToken();
        return this.getCycles(start, end, limit);
      }
      throw error;
    }
  }

  async fetchAllRecoveryData(): Promise<void> {
    console.log("Starting Whoop data sync...");

    try {
      await this.initializeToken();

      // Fetch last 90 days
      const end = new Date();
      const start = new Date(end);
      start.setDate(start.getDate() - 90);

      const startIso = start.toISOString();
      const endIso = end.toISOString();

      const cycles = await this.getCycles(startIso, endIso, 100);
      console.log(`Retrieved ${cycles.length} cycles from Whoop`);

      // Process and store recovery data
      for (const cycle of cycles) {
        if (!cycle.score) continue;

        const date = new Date(cycle.start).toISOString().split("T")[0];
        const sleepHours = cycle.score.previous_night_sleep?.total_sleep_time_milli
          ? cycle.score.previous_night_sleep.total_sleep_time_milli / (1000 * 60 * 60)
          : undefined;

        upsertWhoopRecovery({
          date,
          recovery_score: cycle.score.recovery_score,
          hrv: cycle.score.heart_rate_variability,
          rhr: cycle.score.resting_heart_rate,
          sleep_score: cycle.score.sleep_performance,
          sleep_hours: sleepHours,
          strain_score: cycle.strain?.strain_score,
        });
      }

      console.log("Whoop sync completed successfully");
    } catch (error) {
      console.error("Whoop sync failed:", error);
      throw error;
    }
  }
}

// Main execution
async function main() {
  try {
    const client = new WhoopClient();
    await client.fetchAllRecoveryData();
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

export { WhoopClient };
