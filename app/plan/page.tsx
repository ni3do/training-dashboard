"use client";

import { useEffect, useState } from "react";
import { Calendar, Footprints, Wind, Activity } from "lucide-react";
import { LoadingSkeleton } from "../components/loading-skeleton";

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
  easy: "text-blue-600 dark:text-blue-400",
  moderate: "text-yellow-600 dark:text-yellow-400",
  tempo: "text-orange-600 dark:text-orange-400",
  hard: "text-red-600 dark:text-red-400",
};

const bgColors: Record<string, string> = {
  easy: "bg-blue-50 dark:bg-blue-950/30",
  moderate: "bg-yellow-50 dark:bg-yellow-950/30",
  tempo: "bg-orange-50 dark:bg-orange-950/30",
  hard: "bg-red-50 dark:bg-red-950/30",
};

export default function PlanPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlan() {
      try {
        const response = await fetch("/api/plan?days=42");
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

  const filteredWorkouts = selectedSport
    ? workouts.filter((w) => w.sport === selectedSport)
    : workouts;

  const sports = Array.from(new Set(workouts.map((w) => w.sport)));
  const workoutsByWeek = filteredWorkouts.reduce(
    (acc: Record<string, Workout[]>, workout) => {
      const date = new Date(workout.date);
      const weekStart = new Date(date);
      weekStart.setDate(weekStart.getDate() - date.getDay());
      const weekKey = weekStart.toISOString().split("T")[0];

      if (!acc[weekKey]) acc[weekKey] = [];
      acc[weekKey].push(workout);
      return acc;
    },
    {}
  );

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Training Plan
          </h1>
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Training Plan
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Your personalized {filteredWorkouts.length} workouts
        </p>
      </div>

      {/* Sport Filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedSport(null)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedSport === null
              ? "bg-blue-600 text-white"
              : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600"
          }`}
        >
          All Sports
        </button>
        {sports.map((sport) => (
          <button
            key={sport}
            onClick={() => setSelectedSport(sport)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
              selectedSport === sport
                ? "bg-blue-600 text-white"
                : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600"
            }`}
          >
            {sport}
          </button>
        ))}
      </div>

      {/* Workouts by Week */}
      <div className="space-y-8">
        {Object.entries(workoutsByWeek)
          .sort()
          .map(([weekStart, weekWorkouts]) => {
            const weekDate = new Date(weekStart);
            const weekEnd = new Date(weekDate);
            weekEnd.setDate(weekEnd.getDate() + 6);

            return (
              <div key={weekStart}>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Week of {weekDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{" "}
                  {weekEnd.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </h2>

                <div className="space-y-3">
                  {weekWorkouts
                    .sort((a, b) => a.date.localeCompare(b.date))
                    .map((workout) => {
                      const Icon = sportIcons[workout.sport] || Activity;
                      const colorClass = intensityColors[workout.target_intensity || "easy"] || intensityColors.easy;
                      const bgClass = bgColors[workout.target_intensity || "easy"] || bgColors.easy;
                      const date = new Date(workout.date);
                      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
                      const dateStr = date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });

                      return (
                        <div
                          key={`${workout.date}-${workout.workout_type}`}
                          className={`card p-6 border border-slate-200 dark:border-slate-800 ${bgClass}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              <Icon className={`w-6 h-6 ${colorClass} mt-1 flex-shrink-0`} />
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-bold text-slate-900 dark:text-white">
                                    {dayName}, {dateStr}
                                  </span>
                                  <span className={`text-sm font-semibold ${colorClass} capitalize`}>
                                    {workout.target_intensity || "moderate"}
                                  </span>
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400 capitalize mb-2">
                                  {workout.sport} • {workout.workout_type}
                                </div>
                                {workout.description && (
                                  <div className="text-sm text-slate-700 dark:text-slate-300">
                                    {workout.description}
                                  </div>
                                )}
                              </div>
                            </div>
                            {workout.target_duration_minutes && (
                              <div className="text-right flex-shrink-0 ml-4">
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                  {workout.target_duration_minutes}
                                </div>
                                <div className="text-xs text-slate-600 dark:text-slate-400">
                                  minutes
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
