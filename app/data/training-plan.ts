export type Phase = 'base' | 'build' | 'peak' | 'down' | 'taper' | 'race';

export interface Session {
  type: string;
  km: number;
  description: string;
  workoutType?: string;
}

export interface TrainingWeek {
  week: number;
  startDate: string; // ISO date
  endDate: string;
  phase: Phase;
  phaseLabel: string;
  gymDays: number;
  sessions: {
    tuesday: Session;
    thursday: Session;
    friday: Session | null;
    saturday: Session | null;
    sunday: Session | null;
  };
  totalKm: number;
  notes?: string;
}

export const trainingPlan: TrainingWeek[] = [
  {
    week: 1,
    startDate: '2026-05-04',
    endDate: '2026-05-10',
    phase: 'base',
    phaseLabel: 'Base',
    gymDays: 3,
    sessions: {
      tuesday: { type: 'key run', km: 10, description: 'Key run', workoutType: 'tempo' },
      thursday: { type: 'easy', km: 8, description: 'Easy recovery run' },
      friday: null,
      saturday: { type: 'long', km: 24, description: 'Long run' },
      sunday: null,
    },
    totalKm: 42,
  },
  {
    week: 2,
    startDate: '2026-05-11',
    endDate: '2026-05-17',
    phase: 'base',
    phaseLabel: 'Base',
    gymDays: 3,
    sessions: {
      tuesday: { type: 'key run', km: 11, description: 'Key run', workoutType: 'tempo' },
      thursday: { type: 'easy', km: 8, description: 'Easy recovery run' },
      friday: null,
      saturday: { type: 'long', km: 27, description: 'Long run' },
      sunday: null,
    },
    totalKm: 46,
  },
  {
    week: 3,
    startDate: '2026-05-18',
    endDate: '2026-05-24',
    phase: 'base',
    phaseLabel: 'Base',
    gymDays: 3,
    sessions: {
      tuesday: { type: 'key run', km: 12, description: 'Key run', workoutType: 'tempo' },
      thursday: { type: 'easy', km: 9, description: 'Easy recovery run' },
      friday: null,
      saturday: { type: 'long', km: 30, description: 'Long run' },
      sunday: null,
    },
    totalKm: 51,
  },
  {
    week: 4,
    startDate: '2026-05-25',
    endDate: '2026-05-31',
    phase: 'down',
    phaseLabel: 'Down',
    gymDays: 3,
    sessions: {
      tuesday: { type: 'key run', km: 9, description: 'Key run', workoutType: 'tempo' },
      thursday: { type: 'easy', km: 7, description: 'Easy recovery run' },
      friday: null,
      saturday: { type: 'long', km: 22, description: 'Long run' },
      sunday: null,
    },
    totalKm: 38,
  },
  {
    week: 5,
    startDate: '2026-06-01',
    endDate: '2026-06-07',
    phase: 'build',
    phaseLabel: 'Build',
    gymDays: 2,
    sessions: {
      tuesday: { type: 'key run', km: 12, description: 'Key run', workoutType: 'tempo' },
      thursday: { type: 'easy', km: 8, description: 'Easy recovery run' },
      friday: { type: 'quality/vert', km: 10, description: 'Quality run with vertical' },
      saturday: { type: 'long', km: 26, description: 'Long run' },
      sunday: null,
    },
    totalKm: 56,
  },
  {
    week: 6,
    startDate: '2026-06-08',
    endDate: '2026-06-14',
    phase: 'build',
    phaseLabel: 'Build',
    gymDays: 2,
    sessions: {
      tuesday: { type: 'key run', km: 12, description: 'Key run', workoutType: 'tempo' },
      thursday: { type: 'easy', km: 9, description: 'Easy recovery run' },
      friday: { type: 'quality/vert', km: 10, description: 'Quality run with vertical' },
      saturday: { type: 'long', km: 30, description: 'Long run' },
      sunday: null,
    },
    totalKm: 61,
  },
  {
    week: 7,
    startDate: '2026-06-15',
    endDate: '2026-06-21',
    phase: 'build',
    phaseLabel: 'Build',
    gymDays: 2,
    sessions: {
      tuesday: { type: 'key run', km: 13, description: 'Key run', workoutType: 'tempo' },
      thursday: { type: 'easy', km: 9, description: 'Easy recovery run' },
      friday: { type: 'quality/vert', km: 11, description: 'Quality run with vertical' },
      saturday: { type: 'long', km: 34, description: 'Long run' },
      sunday: null,
    },
    totalKm: 67,
  },
  {
    week: 8,
    startDate: '2026-06-22',
    endDate: '2026-06-28',
    phase: 'down',
    phaseLabel: 'Down',
    gymDays: 2,
    sessions: {
      tuesday: { type: 'key run', km: 10, description: 'Key run', workoutType: 'tempo' },
      thursday: { type: 'easy', km: 8, description: 'Easy recovery run' },
      friday: { type: 'quality/vert', km: 8, description: 'Quality run with vertical' },
      saturday: { type: 'long', km: 24, description: 'Long run' },
      sunday: null,
    },
    totalKm: 50,
  },
  {
    week: 9,
    startDate: '2026-06-29',
    endDate: '2026-07-05',
    phase: 'peak',
    phaseLabel: 'Peak',
    gymDays: 2,
    sessions: {
      tuesday: { type: 'key run', km: 13, description: 'Key run', workoutType: 'tempo' },
      thursday: { type: 'easy', km: 9, description: 'Easy recovery run' },
      friday: { type: 'vert', km: 10, description: 'Vertical run' },
      saturday: { type: 'long', km: 28, description: 'Long run #1' },
      sunday: { type: 'long', km: 16, description: 'Long run #2' },
    },
    totalKm: 76,
  },
  {
    week: 10,
    startDate: '2026-07-06',
    endDate: '2026-07-12',
    phase: 'peak',
    phaseLabel: 'Peak',
    gymDays: 2,
    sessions: {
      tuesday: { type: 'key run', km: 14, description: 'Key run', workoutType: 'tempo' },
      thursday: { type: 'easy', km: 10, description: 'Easy recovery run' },
      friday: { type: 'vert', km: 10, description: 'Vertical run' },
      saturday: { type: 'long', km: 32, description: 'Long run #1' },
      sunday: { type: 'long', km: 20, description: 'Long run #2' },
    },
    totalKm: 86,
  },
  {
    week: 11,
    startDate: '2026-07-13',
    endDate: '2026-07-19',
    phase: 'peak',
    phaseLabel: 'Peak',
    gymDays: 2,
    sessions: {
      tuesday: { type: 'key run', km: 14, description: 'Key run', workoutType: 'tempo' },
      thursday: { type: 'easy', km: 10, description: 'Easy recovery run' },
      friday: { type: 'vert', km: 11, description: 'Vertical run' },
      saturday: { type: 'long', km: 35, description: 'Long run #1' },
      sunday: { type: 'long', km: 22, description: 'Long run #2' },
    },
    totalKm: 92,
    notes: 'Highest volume week of training plan',
  },
  {
    week: 12,
    startDate: '2026-07-20',
    endDate: '2026-07-26',
    phase: 'down',
    phaseLabel: 'Down',
    gymDays: 2,
    sessions: {
      tuesday: { type: 'key run', km: 11, description: 'Key run', workoutType: 'tempo' },
      thursday: { type: 'easy', km: 8, description: 'Easy recovery run' },
      friday: { type: 'vert', km: 8, description: 'Vertical run' },
      saturday: { type: 'long', km: 25, description: 'Long run #1' },
      sunday: { type: 'long', km: 14, description: 'Long run #2' },
    },
    totalKm: 66,
  },
  {
    week: 13,
    startDate: '2026-07-27',
    endDate: '2026-08-02',
    phase: 'taper',
    phaseLabel: 'Taper',
    gymDays: 1,
    sessions: {
      tuesday: { type: 'key run', km: 10, description: 'Key run', workoutType: 'tempo' },
      thursday: { type: 'easy', km: 7, description: 'Easy recovery run' },
      friday: { type: 'easy', km: 6, description: 'Easy run' },
      saturday: { type: 'long', km: 18, description: 'Long run' },
      sunday: null,
    },
    totalKm: 41,
  },
  {
    week: 14,
    startDate: '2026-08-03',
    endDate: '2026-08-07',
    phase: 'race',
    phaseLabel: 'Race',
    gymDays: 0,
    sessions: {
      tuesday: { type: 'shakeout', km: 5, description: 'Shakeout run' },
      thursday: { type: 'easy jog', km: 3, description: 'Easy jog' },
      friday: { type: 'RACE DAY', km: 0, description: 'Race day' },
      saturday: null,
      sunday: null,
    },
    totalKm: 8,
    notes: 'Race week - focus on recovery and preparation',
  },
];

// Helper functions
export function getWeekByDate(date: Date): TrainingWeek | undefined {
  return trainingPlan.find((week) => {
    const start = new Date(week.startDate);
    const end = new Date(week.endDate);
    return date >= start && date <= end;
  });
}

export function getCurrentWeek(): TrainingWeek | undefined {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return getWeekByDate(today);
}

export function getPhaseStats(phase: Phase) {
  const weeksInPhase = trainingPlan.filter((w) => w.phase === phase);
  if (weeksInPhase.length === 0) return null;

  const totalKm = weeksInPhase.reduce((sum, w) => sum + w.totalKm, 0);
  const avgKm = totalKm / weeksInPhase.length;

  return {
    weeks: weeksInPhase.length,
    totalKm,
    avgKm: Math.round(avgKm),
  };
}

export function getTotalPlanKm(): number {
  return trainingPlan.reduce((sum, week) => sum + week.totalKm, 0);
}

export function getPeakWeek(): TrainingWeek | undefined {
  return trainingPlan.reduce((max, week) =>
    week.totalKm > max.totalKm ? week : max
  );
}
