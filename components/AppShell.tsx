'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { BarChart3, Settings, Bell, User } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
  variant?: 'default' | 'glass';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  return (
    <div className={cn(
      'min-h-screen',
      variant === 'glass' && 'backdrop-blur-sm'
    )}>
      {/* Header */}
      <header className="bg-dashboard-card border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-8 h-8 text-dashboard-accent" />
                <h1 className="text-xl font-bold text-dashboard-text">FlowMetric</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-dashboard-textSecondary hover:text-dashboard-text transition-colors duration-200">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-dashboard-textSecondary hover:text-dashboard-text transition-colors duration-200">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-dashboard-textSecondary hover:text-dashboard-text transition-colors duration-200">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
