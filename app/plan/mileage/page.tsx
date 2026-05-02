'use client';

import { useMemo } from 'react';
import {
  trainingPlan,
  getPhaseStats,
  getTotalPlanKm,
  getPeakWeek,
  getCurrentWeek,
  type Phase,
} from '@/app/data/training-plan';

const phaseColors: Record<Phase, { bg: string; light: string; text: string }> = {
  base: { bg: '#6366f1', light: '#e0e7ff', text: 'text-indigo-900' },
  build: { bg: '#059669', light: '#d1fae5', text: 'text-green-900' },
  peak: { bg: '#dc2626', light: '#fee2e2', text: 'text-red-900' },
  down: { bg: '#f59e0b', light: '#fef3c7', text: 'text-amber-900' },
  taper: { bg: '#94a3b8', light: '#e2e8f0', text: 'text-slate-700' },
  race: { bg: '#dc2626', light: '#fee2e2', text: 'text-red-900' },
};

function getPhaseBadgeClass(phase: Phase): string {
  const baseClasses = 'badge inline-flex';
  switch (phase) {
    case 'base':
      return baseClasses + ' bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200';
    case 'build':
      return baseClasses + ' bg-green-100 text-green-900 dark:bg-green-950 dark:text-green-200';
    case 'peak':
      return baseClasses + ' bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200';
    case 'down':
      return baseClasses + ' bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200';
    case 'taper':
      return baseClasses + ' bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-200';
    case 'race':
      return baseClasses + ' bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200';
    default:
      return baseClasses;
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00Z');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function MileagePage() {
  const currentWeek = getCurrentWeek();
  const peakWeek = getPeakWeek();
  const maxKm = Math.max(...trainingPlan.map((w) => w.totalKm));

  const stats = useMemo(() => {
    return {
      baseStats: getPhaseStats('base'),
      buildStats: getPhaseStats('build'),
      peakStats: getPhaseStats('peak'),
      totalKm: getTotalPlanKm(),
    };
  }, []);

  // Calculate days until training starts
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const week1Start = new Date('2026-05-04T00:00:00Z');
  const daysUntilStart = Math.ceil(
    (week1Start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Mileage Plan
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          14-week training progression with weekly breakdown and volume progression.
        </p>
      </div>

      {/* Current Week Status */}
      {!currentWeek && daysUntilStart > 0 && (
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
          <p className="text-blue-900 dark:text-blue-200 font-medium">
            Training begins in {daysUntilStart} day{daysUntilStart !== 1 ? 's' : ''}{' '}
            {daysUntilStart === 1 ? '(May 4)' : ''}
          </p>
        </div>
      )}

      {/* Mileage Progression Chart */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Weekly Volume Progression
        </h2>
        <div className="space-y-4">
          <div className="flex items-end gap-2 h-64">
            {trainingPlan.map((week) => {
              const colors = phaseColors[week.phase];
              const heightPercent = (week.totalKm / maxKm) * 100;
              const isPeakWeek = week.week === peakWeek?.week;

              return (
                <div key={week.week} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center">
                    <div className="relative w-full h-48">
                      <div
                        className={`absolute bottom-0 left-0 right-0 rounded-t-md transition-all ${
                          isPeakWeek ? 'ring-2 ring-offset-2 ring-yellow-400' : ''
                        }`}
                        style={{
                          backgroundColor: colors.bg,
                          height: `${heightPercent}%`,
                          opacity: isPeakWeek ? 1 : 0.85,
                        }}
                      />
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-200 mt-2 text-center">
                      {week.totalKm}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">W{week.week}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: phaseColors.base.bg }}
            />
            <span className="text-slate-600 dark:text-slate-400">Base</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: phaseColors.build.bg }}
            />
            <span className="text-slate-600 dark:text-slate-400">Build</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: phaseColors.peak.bg }}
            />
            <span className="text-slate-600 dark:text-slate-400">Peak</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: phaseColors.down.bg }}
            />
            <span className="text-slate-600 dark:text-slate-400">Down</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: phaseColors.taper.bg }}
            />
            <span className="text-slate-600 dark:text-slate-400">Taper</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: phaseColors.race.bg }}
            />
            <span className="text-slate-600 dark:text-slate-400">Race</span>
          </div>
        </div>
      </div>

      {/* Weekly Breakdown Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                  Week
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                  Dates
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                  Phase
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white">
                  Tue
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white">
                  Thu
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white">
                  Fri
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white">
                  Sat
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white">
                  Sun
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white">
                  Total
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 dark:text-white">
                  Gym
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {trainingPlan.map((week) => {
                const isPeakWeek = week.week === peakWeek?.week;
                const isCurrent = week.week === currentWeek?.week;

                return (
                  <tr
                    key={week.week}
                    className={`transition-colors ${
                      isPeakWeek
                        ? 'bg-yellow-50 dark:bg-yellow-950/20'
                        : isCurrent
                          ? 'bg-blue-50 dark:bg-blue-950/20'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <td className="px-4 py-3 text-sm font-bold text-slate-900 dark:text-white">
                      {week.week}
                      {isPeakWeek && <span className="ml-1">★</span>}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                      {formatDate(week.startDate)}–{formatDate(week.endDate)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={getPhaseBadgeClass(week.phase)}>
                        {week.phaseLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-600 dark:text-slate-400">
                      {week.sessions.tuesday.km}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-600 dark:text-slate-400">
                      {week.sessions.thursday.km}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-600 dark:text-slate-400">
                      {week.sessions.friday ? week.sessions.friday.km : '—'}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-600 dark:text-slate-400">
                      {week.sessions.saturday ? week.sessions.saturday.km : '—'}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-600 dark:text-slate-400">
                      {week.sessions.sunday ? week.sessions.sunday.km : '—'}
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-bold text-slate-900 dark:text-white">
                      {week.totalKm}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-slate-600 dark:text-slate-400">
                      {week.gymDays}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-6 border border-slate-200 dark:border-slate-800">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            Base Phase Avg
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {stats.baseStats?.avgKm ?? 0}
            <span className="text-sm text-slate-600 dark:text-slate-400 ml-1">km/wk</span>
          </p>
        </div>

        <div className="card p-6 border border-slate-200 dark:border-slate-800">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            Build Phase Avg
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {stats.buildStats?.avgKm ?? 0}
            <span className="text-sm text-slate-600 dark:text-slate-400 ml-1">km/wk</span>
          </p>
        </div>

        <div className="card p-6 border border-slate-200 dark:border-slate-800">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            Peak Week Max
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {peakWeek?.totalKm ?? 0}
            <span className="text-sm text-slate-600 dark:text-slate-400 ml-1">km</span>
          </p>
        </div>

        <div className="card p-6 border border-slate-200 dark:border-slate-800">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            Total Plan
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {stats.totalKm}
            <span className="text-sm text-slate-600 dark:text-slate-400 ml-1">km</span>
          </p>
        </div>
      </div>
    </div>
  );
}
