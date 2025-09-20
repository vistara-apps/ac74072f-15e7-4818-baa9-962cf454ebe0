'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface NotificationBannerProps {
  children: ReactNode;
  variant?: 'info' | 'warning' | 'error';
  onDismiss?: () => void;
  className?: string;
}

export function NotificationBanner({ 
  children, 
  variant = 'info',
  onDismiss,
  className 
}: NotificationBannerProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'info':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'error':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className={cn(
      'flex items-center justify-between p-4 rounded-lg border',
      getVariantStyles(),
      className
    )}>
      <div className="flex items-center">
        {children}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-4 text-current hover:opacity-70 transition-opacity duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
