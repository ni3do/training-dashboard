"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { LoadingSkeleton } from "../components/loading-skeleton";

interface Metric {
  date: string;
  ctl: number;
  atl: number;
  tsb: number;
  daily_tss: number;
}

interface MetricsData {
  success: boolean;
  data: Metric[];
  recovery: {
    avg_recovery: number | null;
    avg_strain: number | null;
  };
}

export default function MetricsPage() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [recovery, setRecovery] = useState({ avg_recovery: null, avg_strain: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const response = await fetch("/api/metrics?days=42");
        const data: MetricsData = await response.json();
        if (data.success) {
          setMetrics(data.data);
          setRecovery(data.recovery);
        }
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Training Metrics
          </h1>
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  const latestMetric = metrics[metrics.length - 1];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Training Metrics
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Track your fitness, fatigue, and training stress
        </p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-6 border border-slate-200 dark:border-slate-800">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            Fitness (CTL)
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {latestMetric?.ctl.toFixed(1) || "-"}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Chronic Training Load
          </p>
        </div>

        <div className="card p-6 border border-slate-200 dark:border-slate-800">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            Fatigue (ATL)
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {latestMetric?.atl.toFixed(1) || "-"}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Acute Training Load
          </p>
        </div>

        <div className="card p-6 border border-slate-200 dark:border-slate-800">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            Balance (TSB)
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {latestMetric?.tsb.toFixed(1) || "-"}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Training Stress Balance
          </p>
        </div>

        <div className="card p-6 border border-slate-200 dark:border-slate-800">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            Avg Recovery
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {recovery.avg_recovery ? recovery.avg_recovery.toFixed(0) : "-"}
            {recovery.avg_recovery && "%"}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Whoop Recovery Score
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="space-y-8">
        {/* CTL/ATL/TSB Chart */}
        <div className="card p-6 border border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Fitness Trends (42 days)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
                stroke="#94a3b8"
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#f1f5f9" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="ctl"
                stroke="#3b82f6"
                name="Fitness (CTL)"
                dot={false}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="atl"
                stroke="#ef4444"
                name="Fatigue (ATL)"
                dot={false}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="tsb"
                stroke="#10b981"
                name="Balance (TSB)"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Daily TSS Chart */}
        <div className="card p-6 border border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Daily Training Stress
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
                stroke="#94a3b8"
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#f1f5f9" }}
              />
              <Bar
                dataKey="daily_tss"
                fill="#f59e0b"
                name="Daily TSS"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6 border border-slate-200 dark:border-slate-800 bg-blue-50 dark:bg-blue-950/20">
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">
            Understanding CTL (Fitness)
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Chronic Training Load measures your fitness level. Higher CTL indicates better endurance fitness built over time.
          </p>
        </div>

        <div className="card p-6 border border-slate-200 dark:border-slate-800 bg-red-50 dark:bg-red-950/20">
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">
            Understanding ATL (Fatigue)
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Acute Training Load measures your recent fatigue. High ATL means you're fatigued; you need recovery.
          </p>
        </div>

        <div className="card p-6 border border-slate-200 dark:border-slate-800 bg-green-50 dark:bg-green-950/20">
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">
            Understanding TSB (Balance)
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Training Stress Balance = CTL - ATL. Positive TSB suggests you're recovered and ready to train hard.
          </p>
        </div>

        <div className="card p-6 border border-slate-200 dark:border-slate-800 bg-yellow-50 dark:bg-yellow-950/20">
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">
            Understanding TSS
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Training Stress Score represents workout intensity and duration. Higher TSS = harder, longer workouts.
          </p>
        </div>
      </div>
    </div>
  );
}
