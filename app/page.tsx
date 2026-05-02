"use client";

import { useEffect, useState } from "react";
import { Activity, Heart, TrendingUp, Zap } from "lucide-react";
import { WeeklyPlan } from "./components/weekly-plan";
import { MetricSkeletons } from "./components/loading-skeleton";

interface Metric {
  label: string;
  value: string | number;
  icon: typeof Activity;
  color: string;
}

interface Summary {
  thisWeekActivities: number;
  thisWeekDuration: number;
  avgHeartRate: number;
  avgRecovery: number;
}

export default function Dashboard() {
  const [summary, setSummary] = useState<Summary>({
    thisWeekActivities: 0,
    thisWeekDuration: 0,
    avgHeartRate: 0,
    avgRecovery: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      try {
        // Fetch activities
        const activitiesRes = await fetch("/api/activities?days=7");
        const activitiesData = await activitiesRes.json();

        // Fetch recovery data
        const recoveryRes = await fetch("/api/recovery?days=7");
        const recoveryData = await recoveryRes.json();

        const activities = activitiesData.data || [];
        const recovery = recoveryData.data || [];

        const totalDuration = activities.reduce(
          (sum: number, a: any) => sum + (a.duration_seconds || 0),
          0
        );

        const avgHR =
          activities.length > 0
            ? Math.round(
                activities.reduce((sum: number, a: any) => sum + (a.avg_hr || 0), 0) /
                  activities.filter((a: any) => a.avg_hr).length
              )
            : 0;

        const avgRecovery =
          recovery.length > 0
            ? Math.round(
                recovery.reduce((sum: number, r: any) => sum + (r.recovery_score || 0), 0) /
                  recovery.length
              )
            : 0;

        setSummary({
          thisWeekActivities: activities.length,
          thisWeekDuration: Math.round(totalDuration / 3600),
          avgHeartRate: avgHR,
          avgRecovery,
        });
      } catch (error) {
        console.error("Failed to fetch summary:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, []);

  const metrics: Metric[] = [
    {
      label: "This Week",
      value: `${summary.thisWeekActivities} activities`,
      icon: Activity,
      color: "blue",
    },
    {
      label: "Total Duration",
      value: `${summary.thisWeekDuration}h`,
      icon: TrendingUp,
      color: "green",
    },
    {
      label: "Avg Heart Rate",
      value: `${summary.avgHeartRate} bpm`,
      icon: Heart,
      color: "red",
    },
    {
      label: "Avg Recovery",
      value: `${summary.avgRecovery}%`,
      icon: Zap,
      color: "yellow",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Training Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Welcome back. Here's your training overview.
        </p>
      </div>

      {/* Metrics Grid */}
      {loading ? (
        <MetricSkeletons />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="card p-6 border border-slate-200 dark:border-slate-800">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {metric.label}
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                      {metric.value}
                    </p>
                  </div>
                  <Icon className="w-8 h-8 text-slate-400 dark:text-slate-600" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Plan */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              This Week's Plan
            </h2>
            <a
              href="/plan"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              View full plan →
            </a>
          </div>
          <WeeklyPlan />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button
              onClick={async () => {
                try {
                  const res = await fetch("/api/sync", { method: "POST" });
                  if (res.ok) {
                    alert("Sync started! Check back in a moment.");
                  }
                } catch (error) {
                  alert("Sync failed: " + error);
                }
              }}
              className="btn-primary w-full text-center"
            >
              Sync Data Now
            </button>
            <a href="/settings" className="btn-secondary block text-center">
              Connect Accounts
            </a>
            <a href="/metrics" className="btn-secondary block text-center">
              View Metrics
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
