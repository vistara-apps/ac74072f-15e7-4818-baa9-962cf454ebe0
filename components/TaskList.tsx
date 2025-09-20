'use client';

import { useState, useEffect } from 'react';
import { Task, User, Project } from '@/lib/types';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  limit?: number;
  userId?: string;
  projectId?: string;
  showControls?: boolean;
}

export function TaskList({ limit, userId, projectId, showControls = false }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Build query parameters
        const params = new URLSearchParams();
        if (userId) params.append('userId', userId);
        if (projectId) params.append('projectId', projectId);

        const tasksResponse = await fetch(`/api/tasks?${params}`);
        if (!tasksResponse.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const tasksData = await tasksResponse.json();

        // Fetch users and projects for enrichment
        const [usersResponse, projectsResponse] = await Promise.all([
          fetch('/api/users'),
          fetch('/api/projects')
        ]);

        const usersData = usersResponse.ok ? await usersResponse.json() : [];
        const projectsData = projectsResponse.ok ? await projectsResponse.json() : [];

        setTasks(limit ? tasksData.slice(0, limit) : tasksData);
        setUsers(usersData);
        setProjects(projectsData);

      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError(err instanceof Error ? err.message : 'Failed to load tasks');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [limit, userId, projectId]);

  const handleStatusUpdate = async (taskId: string, newStatus: Task['status']) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update task status');
      }

      const updatedTask = await response.json();

      // Update local state
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.taskId === taskId ? updatedTask : task
        )
      );

    } catch (err) {
      console.error('Error updating task status:', err);
      throw err; // Re-throw to let TaskCard handle the error
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: limit || 5 }).map((_, i) => (
          <div key={i} className="p-4 bg-dashboard-surface rounded-lg animate-pulse">
            <div className="h-4 bg-dashboard-bg rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-dashboard-bg rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-dashboard-textSecondary mb-4">Failed to load tasks</p>
        <button
          onClick={() => window.location.reload()}
          className="text-dashboard-accent hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-dashboard-textSecondary">No tasks found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => {
        const user = users.find(u => u.userId === task.assignedUserId);
        const project = projects.find(p => p.projectId === task.projectId);

        return (
          <TaskCard
            key={task.taskId}
            task={task}
            user={user}
            project={project}
            onStatusUpdate={showControls ? handleStatusUpdate : undefined}
            compact
          />
        );
      })}
    </div>
  );
}
