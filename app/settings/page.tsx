"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (searchParams.get("strava_success")) {
      setStatusMessage("Strava connected successfully!");
      setTimeout(() => setStatusMessage(""), 5000);
    }
    if (searchParams.get("strava_error")) {
      setStatusMessage(`Strava error: ${searchParams.get("strava_error")}`);
    }
    if (searchParams.get("whoop_success")) {
      setStatusMessage("Whoop connected successfully!");
      setTimeout(() => setStatusMessage(""), 5000);
    }
    if (searchParams.get("whoop_error")) {
      setStatusMessage(`Whoop error: ${searchParams.get("whoop_error")}`);
    }
  }, [searchParams]);

  async function handleManualSync() {
    setSyncing(true);
    setSyncStatus(null);
    try {
      const response = await fetch("/api/sync", { method: "POST" });
      const data = await response.json();
      setSyncStatus(data);
    } catch (error) {
      setSyncStatus({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setSyncing(false);
    }
  }

  function getStravaAuthUrl() {
    const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID || "";
    const redirectUri = `${window.location.origin}/api/auth/strava/callback`;
    const scopes = ["activity:read"];
    return `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scopes.join(",")}`;
  }

  function getWhoopAuthUrl() {
    const clientId = process.env.NEXT_PUBLIC_WHOOP_CLIENT_ID || "";
    const redirectUri = `${window.location.origin}/api/auth/whoop/callback`;
    return `https://api.prod.whoop.com/oauth/oauth2/auth?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=read:cycles+offline`;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Connect your accounts and configure sync options
        </p>
      </div>

      {/* Status Messages */}
      {statusMessage && (
        <div className="card p-4 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800 dark:text-blue-200">{statusMessage}</p>
        </div>
      )}

      {syncStatus && (
        <div
          className={`card p-4 border flex items-start gap-3 ${
            syncStatus.success
              ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30"
              : "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30"
          }`}
        >
          {syncStatus.success ? (
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
          )}
          <p
            className={`text-sm ${
              syncStatus.success
                ? "text-green-800 dark:text-green-200"
                : "text-red-800 dark:text-red-200"
            }`}
          >
            {syncStatus.message}
          </p>
        </div>
      )}

      {/* OAuth Connections */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Connect Accounts
        </h2>

        {/* Strava */}
        <div className="card p-6 border border-slate-200 dark:border-slate-800">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Strava
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Connect your Strava account to sync running, cycling, and swimming activities
              </p>
            </div>
          </div>
          <div className="mt-4">
            <a
              href={getStravaAuthUrl()}
              className="btn-primary inline-block"
            >
              Connect Strava
            </a>
          </div>
        </div>

        {/* Whoop */}
        <div className="card p-6 border border-slate-200 dark:border-slate-800">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Whoop
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Connect your Whoop account to sync recovery, strain, and sleep data
              </p>
            </div>
          </div>
          <div className="mt-4">
            <a
              href={getWhoopAuthUrl()}
              className="btn-primary inline-block"
            >
              Connect Whoop
            </a>
          </div>
        </div>
      </div>

      {/* Sync Options */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Data Sync
        </h2>

        <div className="card p-6 border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Manual Sync
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Trigger an immediate sync of all connected data sources
          </p>
          <button
            onClick={handleManualSync}
            disabled={syncing}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {syncing ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Syncing...
              </>
            ) : (
              "Sync Now"
            )}
          </button>
        </div>

        <div className="card p-6 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Automatic Sync
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            Data is automatically synced every day at 5:00 AM (UTC)
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Configure the schedule in your environment variables (CRON_SCHEDULE)
          </p>
        </div>
      </div>

      {/* Environment Configuration */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Environment Setup
        </h2>

        <div className="card p-6 border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800 dark:text-amber-200">
              <p className="font-semibold mb-2">Required Environment Variables:</p>
              <code className="block bg-black/20 dark:bg-white/10 p-3 rounded text-xs font-mono mb-2">
                STRAVA_CLIENT_ID
                <br />
                STRAVA_CLIENT_SECRET
                <br />
                WHOOP_CLIENT_ID
                <br />
                WHOOP_CLIENT_SECRET
                <br />
                DATABASE_PATH
              </code>
              <p>
                See <code className="bg-black/20 dark:bg-white/10 px-2 py-1 rounded text-xs">.env.example</code> for all variables.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6 border border-slate-200 dark:border-slate-800 bg-blue-50 dark:bg-blue-950/20">
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">
            About Strava
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Strava provides running, cycling, and swimming activities with detailed metrics like pace, heart rate, and elevation.
          </p>
        </div>

        <div className="card p-6 border border-slate-200 dark:border-slate-800 bg-blue-50 dark:bg-blue-950/20">
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">
            About Whoop
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Whoop provides recovery scores, strain, heart rate variability, and sleep data to assess readiness.
          </p>
        </div>
      </div>
    </div>
  );
}
