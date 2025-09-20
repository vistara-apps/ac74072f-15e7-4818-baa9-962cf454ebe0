import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div className={cn("animate-pulse", className)}>
      <div className="bg-dashboard-surface rounded h-full w-full"></div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dashboard-bg to-dashboard-card">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="space-y-2">
            <LoadingSkeleton className="h-8 w-64" />
            <LoadingSkeleton className="h-4 w-96" />
          </div>
          <LoadingSkeleton className="h-10 w-32 mt-4 sm:mt-0" />
        </div>

        {/* Key metrics skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-dashboard-surface p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <LoadingSkeleton className="h-4 w-24" />
                <LoadingSkeleton className="h-8 w-8 rounded" />
              </div>
              <LoadingSkeleton className="h-8 w-16 mb-2" />
              <LoadingSkeleton className="h-4 w-20" />
            </div>
          ))}
        </div>

        {/* Charts skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-dashboard-surface p-6 rounded-lg shadow-sm">
              <LoadingSkeleton className="h-6 w-48 mb-4" />
              <LoadingSkeleton className="h-64 w-full" />
            </div>
          ))}
        </div>

        {/* Tasks and resources skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-dashboard-surface p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <LoadingSkeleton className="h-6 w-32" />
              <LoadingSkeleton className="h-8 w-20" />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 bg-dashboard-bg rounded-lg">
                  <LoadingSkeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <LoadingSkeleton className="h-4 w-48" />
                    <LoadingSkeleton className="h-3 w-32" />
                  </div>
                  <LoadingSkeleton className="h-6 w-16" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-dashboard-surface p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <LoadingSkeleton className="h-6 w-32" />
              <LoadingSkeleton className="h-5 w-5" />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-3 p-3 bg-dashboard-bg rounded-lg">
                  <LoadingSkeleton className="h-8 w-8 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <LoadingSkeleton className="h-4 w-20" />
                    <LoadingSkeleton className="h-3 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

