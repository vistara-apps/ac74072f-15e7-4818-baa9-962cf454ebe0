'use client';

import { useState } from 'react';
import { Task, User, Project } from '@/lib/types';
import { StatusBadge } from './StatusBadge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { CheckCircle, Clock, User as UserIcon, Calendar, Play, Pause } from 'lucide-react';
import { formatDate, formatTime } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  user?: User;
  project?: Project;
  onStatusUpdate?: (taskId: string, status: Task['status']) => void;
  compact?: boolean;
}

export function TaskCard({ task, user, project, onStatusUpdate, compact = false }: TaskCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (newStatus: Task['status']) => {
    if (!onStatusUpdate) return;

    setIsUpdating(true);
    try {
      await onStatusUpdate(task.taskId, newStatus);
    } catch (error) {
      console.error('Failed to update task status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getNextStatus = (currentStatus: Task['status']): Task['status'] | null => {
    switch (currentStatus) {
      case 'pending':
        return 'in_progress';
      case 'in_progress':
        return 'completed';
      case 'completed':
        return 'pending';
      default:
        return null;
    }
  };

  const getStatusButtonText = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return 'Start Task';
      case 'in_progress':
        return 'Complete';
      case 'completed':
        return 'Reopen';
      default:
        return 'Update';
    }
  };

  const getStatusButtonIcon = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return <Play className="w-4 h-4" />;
      case 'in_progress':
        return <CheckCircle className="w-4 h-4" />;
      case 'completed':
        return <Pause className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (compact) {
    return (
      <div className="flex items-center space-x-4 p-4 bg-dashboard-surface rounded-lg hover:bg-dashboard-surface/80 transition-colors">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="text-sm font-medium text-dashboard-text truncate">
              {task.description}
            </h4>
            <StatusBadge status={task.status} />
          </div>
          <div className="flex items-center space-x-4 text-xs text-dashboard-textSecondary">
            {user && (
              <div className="flex items-center space-x-1">
                <UserIcon className="w-3 h-3" />
                <span>{user.name}</span>
              </div>
            )}
            {project && (
              <span className="truncate">{project.projectName}</span>
            )}
          </div>
        </div>
        {onStatusUpdate && (
          <Button
            size="sm"
            onClick={() => handleStatusUpdate(getNextStatus(task.status) || 'pending')}
            disabled={isUpdating}
            className="shrink-0"
          >
            {isUpdating ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
            ) : (
              getStatusButtonIcon(task.status)
            )}
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-dashboard-text mb-2">
              {task.description}
            </h3>
            <div className="flex items-center space-x-2 mb-3">
              <StatusBadge status={task.status} />
              {task.priority && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
              )}
            </div>
          </div>
          {onStatusUpdate && (
            <Button
              onClick={() => handleStatusUpdate(getNextStatus(task.status) || 'pending')}
              disabled={isUpdating}
              className="shrink-0 ml-4"
            >
              {isUpdating ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
              ) : (
                getStatusButtonIcon(task.status)
              )}
              {getStatusButtonText(task.status)}
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-dashboard-textSecondary">
          {user && (
            <div className="flex items-center space-x-2">
              <UserIcon className="w-4 h-4" />
              <span>{user.name}</span>
            </div>
          )}
          {project && (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-dashboard-accent rounded" />
              <span className="truncate">{project.projectName}</span>
            </div>
          )}
          {task.estimatedEffort && (
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{task.estimatedEffort}h estimated</span>
            </div>
          )}
          {task.startTime && (
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Started {formatDate(task.startTime)}</span>
            </div>
          )}
        </div>

        {task.actualEffort && (
          <div className="mt-4 pt-4 border-t border-dashboard-surface">
            <div className="text-sm text-dashboard-textSecondary">
              Actual effort: {task.actualEffort} hours
              {task.endTime && ` (completed ${formatDate(task.endTime)})`}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

