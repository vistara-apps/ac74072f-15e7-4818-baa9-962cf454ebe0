'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  children: ReactNode;
  variant?: 'active' | 'completed' | 'delayed' | 'idle';
  className?: string;
}

export function StatusBadge({ 
  children, 
  variant = 'active',
  className 
}: StatusBadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'delayed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'idle':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
      getVariantStyles(),
      className
    )}>
      {children}
    </span>
  );
}
