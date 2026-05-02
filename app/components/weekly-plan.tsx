"use client";

import { useEffect, useState } from "react";
import { Zap, Wind, Footprints, Activity } from "lucide-react";

interface Workout {
  date: string;
  workout_type: string;
  description?: string;
  target_duration_minutes?: number;
  target_intensity?: string;
  sport: string;
  completed?: boolean;
}

const sportIcons: Record<string, typeof Activity> = {
  running: Footprints,
  cycling: Wind,
  swimming: Activity,
};

const intensityColors: Record<string, string> = {
  easy: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
  moderate: "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800",
  tempo: "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800",
  hard: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
};

export function WeeklyPlan() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlan() {
      try {
        const response = await fetch("/api/plan?days=14");
        const data = await response.json();
        if (data.success) {
          setWorkouts(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch plan:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlan();
  }, []);

  if (loading) {
    return <div className="animate-pulse card p-6 h-64"></div>;
  }

  if (workouts.length === 0) {
    return (
      <div className="card p-6 text-center text-slate-600 dark:text-slate-400">
        <p>No workouts planned yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {workouts.slice(0, 7).map((workout) => {
        const Icon = sportIcons[workout.sport] || Activity;
        const colorClass = intensityColors[workout.target_intensity || "easy"] || intensityColors.easy;
        const date = new Date(workout.date);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

        return (
          <div
            key={`${workout.date}-${workout.workout_type}`}
            className={`card p-4 border ${colorClass} transition-all hover:shadow-md`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">
                    {dayName}, {dateStr}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                    {workout.sport} • {workout.workout_type}
                  </div>
                  {workout.description && (
                    <div className="text-sm mt-1 text-slate-700 dark:text-slate-300">
                      {workout.description}
                    </div>
                  )}
                </div>
              </div>
              {workout.target_duration_minutes && (
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {workout.target_duration_minutes}min
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
