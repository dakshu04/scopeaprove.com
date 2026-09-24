export default function DashboardLoading() {
  return (
    <div
      className="space-y-6 animate-pulse"
      aria-busy="true"
      aria-label="Loading dashboard content"
    >
      <div className="space-y-3">
        <div className="h-7 w-56 rounded-lg bg-muted" />
        <div className="h-4 w-80 max-w-full rounded bg-muted" />
      </div>

      <div className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="space-y-4 border-b border-border px-5 py-6 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
          >
            <div className="h-4 w-20 bg-muted" />
            <div className="h-8 w-12 bg-muted" />
            <div className="h-4 w-32 bg-muted" />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="h-5 w-28 bg-muted" />
            <div className="h-4 w-64 max-w-full bg-muted" />
          </div>

          <div className="h-9 w-28 bg-muted" />
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="grid gap-3 border-b border-border px-5 py-4 last:border-b-0"
            >
              <div className="h-4 w-48 max-w-full bg-muted" />
              <div className="h-3 w-72 max-w-full bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
