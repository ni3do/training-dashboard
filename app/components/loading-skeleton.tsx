export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="card p-6 animate-pulse">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-4"></div>
          <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
      ))}
    </div>
  );
}

export function MetricSkeletons() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="card p-4 animate-pulse">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2"></div>
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
      ))}
    </div>
  );
}
