"use client";

import { Calendar, Dumbbell, Footprints, AlertCircle, MapPin, TrendingUp } from "lucide-react";
import { useState } from "react";

interface PhaseInfo {
  name: string;
  month: string;
  dateRange: string;
  color: string;
  colorDark: string;
  description: string;
  focusAreas: string[];
}

interface SessionDay {
  day: string;
  sessions: Array<{
    type: "gym" | "run" | "rest";
    name: string;
    color: string;
    details?: string;
  }>;
}

export default function OverviewPage() {
  const [selectedPhase, setSelectedPhase] = useState<number>(0);

  const phases: PhaseInfo[] = [
    {
      name: "Phase 1: Base Building",
      month: "May 2026",
      dateRange: "May 1–31, 2026",
      color: "bg-blue-50",
      colorDark: "dark:bg-blue-950/30",
      description: "Build aerobic foundation and gym strength foundation with 6 sessions/week",
      focusAreas: [
        "Establish aerobic base (Zone 2 endurance)",
        "Upper/lower body split at gym",
        "Hill work via Stairmaster (Fri gym)",
        "Moderate running volume: 45–60 min key runs, 90–180 min long runs",
      ],
    },
    {
      name: "Phase 2: Build",
      month: "June 2026",
      dateRange: "June 1–30, 2026",
      color: "bg-purple-50",
      colorDark: "dark:bg-purple-950/30",
      description: "Increase running volume, introduce second quality run, maintain gym strength",
      focusAreas: [
        "Add 4th running day (replace 1 gym with 2nd quality run or incline work)",
        "Continue 2 gym days (Mon upper+core, Wed lower)",
        "Build long run duration: up to 2.5–3h",
        "More consistent vert work via incline treadmill",
      ],
    },
    {
      name: "Phase 3: Peak / High Mileage",
      month: "July–Early Aug 2026",
      dateRange: "July 1 – Aug 7, 2026",
      color: "bg-orange-50",
      colorDark: "dark:bg-orange-950/30",
      description: "7 sessions/week with back-to-back weekend long runs, peak mileage",
      focusAreas: [
        "Back-to-back long runs (Sat & Sun) on fatigued legs",
        "5 running days + 2 gym days for injury prevention",
        "Long runs: 2–4+ hours, cumulative 4–5h+ vert per weekend",
        "Taper in final 2 weeks before race (Aug 7)",
      ],
    },
  ];

  const weeklySchedules: Record<number, SessionDay[]> = {
    0: [
      {
        day: "Mon",
        sessions: [
          { type: "gym", name: "Upper + Core", color: "bg-indigo-100 dark:bg-indigo-950" },
        ],
      },
      {
        day: "Tue",
        sessions: [
          {
            type: "run",
            name: "Key Run (Intervals/Tempo)",
            color: "bg-green-100 dark:bg-green-950",
            details: "45–60 min",
          },
        ],
      },
      {
        day: "Wed",
        sessions: [
          {
            type: "gym",
            name: "Lower Body (Race-specific)",
            color: "bg-indigo-100 dark:bg-indigo-950",
          },
        ],
      },
      {
        day: "Thu",
        sessions: [
          {
            type: "run",
            name: "Easy Run (Zone 2)",
            color: "bg-green-100 dark:bg-green-950",
            details: "45–60 min",
          },
        ],
      },
      {
        day: "Fri",
        sessions: [
          {
            type: "gym",
            name: "Full Body + Stairmaster",
            color: "bg-indigo-100 dark:bg-indigo-950",
            details: "Vert work",
          },
        ],
      },
      {
        day: "Sat",
        sessions: [
          {
            type: "run",
            name: "Long Run",
            color: "bg-green-100 dark:bg-green-950",
            details: "90–180 min",
          },
        ],
      },
      {
        day: "Sun",
        sessions: [
          { type: "rest", name: "Rest", color: "bg-slate-100 dark:bg-slate-800" },
        ],
      },
    ],
    1: [
      {
        day: "Mon",
        sessions: [
          { type: "gym", name: "Upper + Core", color: "bg-indigo-100 dark:bg-indigo-950" },
        ],
      },
      {
        day: "Tue",
        sessions: [
          {
            type: "run",
            name: "Key Run",
            color: "bg-green-100 dark:bg-green-950",
            details: "Intervals/Tempo",
          },
        ],
      },
      {
        day: "Wed",
        sessions: [
          {
            type: "gym",
            name: "Lower Body",
            color: "bg-indigo-100 dark:bg-indigo-950",
          },
        ],
      },
      {
        day: "Thu",
        sessions: [
          {
            type: "run",
            name: "Easy Run (Zone 2)",
            color: "bg-green-100 dark:bg-green-950",
            details: "45–60 min",
          },
        ],
      },
      {
        day: "Fri",
        sessions: [
          {
            type: "run",
            name: "Quality Run / Incline Treadmill",
            color: "bg-green-100 dark:bg-green-950",
            details: "2nd quality or vert work",
          },
        ],
      },
      {
        day: "Sat",
        sessions: [
          {
            type: "run",
            name: "Long Run",
            color: "bg-green-100 dark:bg-green-950",
            details: "120–180 min",
          },
        ],
      },
      {
        day: "Sun",
        sessions: [
          {
            type: "rest",
            name: "Rest or Easy",
            color: "bg-slate-100 dark:bg-slate-800",
          },
        ],
      },
    ],
    2: [
      {
        day: "Mon",
        sessions: [
          { type: "gym", name: "Upper + Core", color: "bg-indigo-100 dark:bg-indigo-950" },
        ],
      },
      {
        day: "Tue",
        sessions: [
          {
            type: "run",
            name: "Key Run",
            color: "bg-green-100 dark:bg-green-950",
            details: "Intervals/Tempo",
          },
        ],
      },
      {
        day: "Wed",
        sessions: [
          {
            type: "gym",
            name: "Lower Body",
            color: "bg-indigo-100 dark:bg-indigo-950",
          },
        ],
      },
      {
        day: "Thu",
        sessions: [
          {
            type: "run",
            name: "Easy Run (Zone 2)",
            color: "bg-green-100 dark:bg-green-950",
            details: "45–60 min",
          },
        ],
      },
      {
        day: "Fri",
        sessions: [
          {
            type: "run",
            name: "Quality Run / Vert Work",
            color: "bg-green-100 dark:bg-green-950",
            details: "Incline treadmill or outdoor",
          },
        ],
      },
      {
        day: "Sat",
        sessions: [
          {
            type: "run",
            name: "Long Run #1",
            color: "bg-green-100 dark:bg-green-950",
            details: "2–4+ hours",
          },
        ],
      },
      {
        day: "Sun",
        sessions: [
          {
            type: "run",
            name: "Long Run #2 (Fatigued)",
            color: "bg-amber-100 dark:bg-amber-950",
            details: "1–2+ hours on tired legs",
          },
        ],
      },
    ],
  };

  const currentPhase = phases[selectedPhase];
  const schedule = weeklySchedules[selectedPhase];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Training Plan Overview
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Swiss Alps 100K Ultra • Race Day: August 7, 2026
        </p>
      </div>

      {/* Timeline / Phase Selector */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Training Phases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {phases.map((phase, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPhase(idx)}
              className={`p-4 rounded-lg border-2 transition-all text-left cursor-pointer ${
                selectedPhase === idx
                  ? "border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/30"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <div className="font-semibold text-slate-900 dark:text-white">
                {phase.name}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {phase.dateRange}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                {phase.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Phase Details */}
      <div className={`card p-8 border-2 ${currentPhase.color} ${currentPhase.colorDark}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Phase Info */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {currentPhase.name}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {currentPhase.description}
            </p>

            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-white">Focus Areas:</h3>
              {currentPhase.focusAreas.map((area, idx) => (
                <div key={idx} className="flex gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700 dark:text-slate-300">{area}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Phase Stats */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Duration
                </span>
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {currentPhase.month}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <Dumbbell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Sessions / Week
                </span>
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {selectedPhase === 0 ? "6 sessions" : selectedPhase === 1 ? "6 sessions" : "7 sessions"}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <Footprints className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Run Days
                </span>
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {selectedPhase === 0 ? "3 days" : selectedPhase === 1 ? "4 days" : "5 days"}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Vert Work
                </span>
              </div>
              <p className="text-sm text-slate-900 dark:text-white">
                {selectedPhase === 0
                  ? "Stairmaster (Fri gym)"
                  : selectedPhase === 1
                    ? "Incline treadmill (Fri)"
                    : "Weekly back-to-back long runs"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Template */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          Weekly Schedule Template
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {schedule.map((dayData, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="font-semibold text-slate-900 dark:text-white mb-3 text-center">
                {dayData.day}
              </div>
              <div className="space-y-2">
                {dayData.sessions.map((session, sessionIdx) => (
                  <div
                    key={sessionIdx}
                    className={`p-3 rounded-lg border border-slate-200 dark:border-slate-700 ${session.color}`}
                  >
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      {session.name}
                    </div>
                    {session.details && (
                      <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        {session.details}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Constraints */}
      <div className="card p-6 border-amber-200 dark:border-amber-900/30 bg-amber-50 dark:bg-amber-950/20">
        <div className="flex gap-3">
          <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-3">
              Key Constraints & Adaptations
            </h3>
            <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-300">
              <li>
                <strong>Flat training location (Amsterdam):</strong> No access to hills during base
                building
              </li>
              <li>
                <strong>Vertical substitute work:</strong> Stairmaster (Phase 1, Fri gym) + Incline
                treadmill (Phase 2, Fri)
              </li>
              <li>
                <strong>Phase 3 vert:</strong> Cumulative 4–5+ hours of elevation per weekend via
                back-to-back long runs
              </li>
              <li>
                <strong>Race profile:</strong> Swiss Alps 100K with significant elevation gain —
                vert training essential
              </li>
              <li>
                <strong>Taper timeline:</strong> Reduce volume in final 10–14 days before Aug 7
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
            <span className="font-semibold text-slate-900 dark:text-white">Gym Sessions</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Strength and injury prevention. Mon: Upper+Core. Wed: Lower Body (race-specific quad
            focus).
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <span className="font-semibold text-slate-900 dark:text-white">Run Sessions</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Aerobic development and volume. Tue: Key runs (intervals). Thu: Easy (Zone 2). Sat/Sun:
            Long runs.
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-amber-600"></div>
            <span className="font-semibold text-slate-900 dark:text-white">Vert Work</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Hill simulation essential for ultra. Stairmaster (P1) → Incline treadmill (P2) →
            Back-to-back long runs (P3).
          </p>
        </div>
      </div>
    </div>
  );
}
