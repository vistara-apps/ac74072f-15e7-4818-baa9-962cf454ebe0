'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  variant?: 'task' | 'project';
  label?: string;
  className?: string;
}

export function ProgressBar({ 
  progress, 
  variant = 'task', 
  label,
  className 
}: ProgressBarProps) {
  const getProgressColor = () => {
    if (progress >= 80) return 'bg-green-400';
    if (progress >= 60) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        {label && (
          <span className="text-sm text-dashboard-textSecondary">{label}</span>
        )}
        <span className="text-sm font-medium text-dashboard-text">
          {progress.toFixed(1)}%
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className={cn(
            'h-2 rounded-full transition-all duration-300',
            getProgressColor()
          )}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}
