'use client';

import { User } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Clock, CheckCircle } from 'lucide-react';

interface ResourceCardProps {
  user: User;
  variant?: 'default';
  className?: string;
}

export function ResourceCard({ 
  user, 
  variant = 'default',
  className 
}: ResourceCardProps) {
  // Mock availability data
  const availability = Math.floor(Math.random() * 40) + 60; // 60-100%
  const tasksToday = Math.floor(Math.random() * 5) + 1;

  return (
    <div className={cn(
      'p-4 bg-dashboard-bg rounded-lg border border-gray-700',
      'hover:border-dashboard-accent transition-colors duration-200',
      className
    )}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-dashboard-accent rounded-full flex items-center justify-center text-white font-medium">
            {user.name.charAt(0)}
          </div>
          <div>
            <h4 className="text-dashboard-text font-medium">{user.name}</h4>
            <p className="text-dashboard-textSecondary text-sm">{user.role}</p>
          </div>
        </div>
        <div className={cn(
          'w-3 h-3 rounded-full',
          availability >= 80 ? 'bg-green-400' : 
          availability >= 60 ? 'bg-yellow-400' : 'bg-red-400'
        )} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-dashboard-textSecondary">Availability</span>
          <span className="text-dashboard-text font-medium">{availability}%</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3 text-dashboard-textSecondary" />
            <span className="text-dashboard-textSecondary">Tasks Today</span>
          </div>
          <span className="text-dashboard-text font-medium">{tasksToday}</span>
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {user.skills.slice(0, 2).map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-dashboard-accent/20 text-dashboard-accent text-xs rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
