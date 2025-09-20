'use client';

import { mockTasks, mockUsers, mockProjects } from '@/lib/mockData';
import { StatusBadge } from './StatusBadge';
import { formatTime } from '@/lib/utils';
import { Clock, User, CheckCircle2, AlertCircle } from 'lucide-react';

export function TaskList() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'completed';
      case 'in-progress':
        return 'active';
      case 'blocked':
        return 'delayed';
      default:
        return 'idle';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'blocked':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-3">
      {mockTasks.map((task) => {
        const user = mockUsers.find(u => u.userId === task.assignedUserId);
        const project = mockProjects.find(p => p.projectId === task.projectId);
        
        return (
          <div
            key={task.taskId}
            className="p-4 bg-dashboard-bg rounded-lg border border-gray-700 hover:border-dashboard-accent transition-colors duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="text-dashboard-text font-medium mb-1">
                  {task.description}
                </h4>
                <p className="text-dashboard-textSecondary text-sm">
                  {project?.projectName}
                </p>
              </div>
              <StatusBadge variant={getStatusVariant(task.status)}>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(task.status)}
                  <span className="capitalize">{task.status.replace('-', ' ')}</span>
                </div>
              </StatusBadge>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3 text-dashboard-textSecondary" />
                  <span className="text-dashboard-textSecondary">{user?.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-dashboard-textSecondary" />
                  <span className="text-dashboard-textSecondary">
                    {task.actualEffort || task.estimatedEffort}h
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                  task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {task.priority}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
