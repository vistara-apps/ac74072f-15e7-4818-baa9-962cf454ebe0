'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  children: ReactNode;
  variant?: 'default';
  className?: string;
}

export function DashboardCard({ 
  children, 
  variant = 'default',
  className 
}: DashboardCardProps) {
  return (
    <div className={cn(
      'bg-dashboard-card rounded-lg p-6 shadow-card border border-gray-700',
      'hover:shadow-lg transition-shadow duration-200',
      className
    )}>
      {children}
    </div>
  );
}
