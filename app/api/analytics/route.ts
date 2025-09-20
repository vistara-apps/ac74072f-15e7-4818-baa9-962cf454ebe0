import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
import { calculateResourceUtilization } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    switch (type) {
      case 'dashboard':
        return getDashboardData();
      case 'tasks-status':
        return getTasksByStatus();
      case 'projects-progress':
        return getProjectsProgress();
      case 'resources-utilization':
        return getResourcesUtilization();
      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function getDashboardData() {
  const tasks = db.getTasks();
  const projects = db.getProjects();
  const resources = db.getResources();
  const activities = db.getActivities(10);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const activeProjects = projects.filter(project => project.status === 'active').length;

  const teamEfficiency = calculateTeamEfficiency(tasks);
  const resourceUtilization = calculateResourceUtilization(resources);

  // Generate alerts based on current data
  const alerts = generateAlerts(tasks, resources, projects);

  const dashboardData = {
    totalTasks,
    completedTasks,
    activeProjects,
    teamEfficiency,
    resourceUtilization,
    alerts,
    recentActivity: activities
  };

  return NextResponse.json(dashboardData);
}

function getTasksByStatus() {
  const statusCounts = db.getTasksByStatus();
  return NextResponse.json(statusCounts);
}

function getProjectsProgress() {
  const progress = db.getProjectProgress();
  return NextResponse.json(progress);
}

function getResourcesUtilization() {
  const utilization = db.getResourceUtilization();
  return NextResponse.json(utilization);
}

function calculateTeamEfficiency(tasks: any[]): number {
  if (tasks.length === 0) return 0;

  const completedTasks = tasks.filter(task => task.status === 'completed');
  const onTimeTasks = completedTasks.filter(task => {
    if (!task.endTime || !task.estimatedEffort) return false;
    const actualTime = new Date(task.endTime).getTime() - new Date(task.startTime || task.endTime).getTime();
    const estimatedMs = task.estimatedEffort * 60 * 60 * 1000; // Convert hours to ms
    return actualTime <= estimatedMs * 1.2; // Within 20% of estimate
  });

  return completedTasks.length > 0 ? (onTimeTasks.length / completedTasks.length) * 100 : 0;
}

function generateAlerts(tasks: any[], resources: any[], projects: any[]) {
  const alerts = [];

  // Check for overdue tasks
  const overdueTasks = tasks.filter(task => {
    if (task.status === 'completed') return false;
    const project = projects.find(p => p.projectId === task.projectId);
    if (!project?.dueDate) return false;
    return new Date(project.dueDate) < new Date();
  });

  if (overdueTasks.length > 0) {
    alerts.push({
      id: 'overdue_tasks',
      type: 'shortage',
      severity: 'high',
      message: `${overdueTasks.length} tasks are overdue`,
      timestamp: new Date().toISOString()
    });
  }

  // Check for resource utilization issues
  const lowUtilization = resources.filter(r => r.availability < 30);
  if (lowUtilization.length > 0) {
    alerts.push({
      id: 'low_utilization',
      type: 'underutilized',
      severity: 'medium',
      message: `${lowUtilization.length} resources have low utilization`,
      timestamp: new Date().toISOString()
    });
  }

  const highUtilization = resources.filter(r => r.availability > 90);
  if (highUtilization.length > 0) {
    alerts.push({
      id: 'high_utilization',
      type: 'overallocated',
      severity: 'medium',
      message: `${highUtilization.length} resources are overutilized`,
      timestamp: new Date().toISOString()
    });
  }

  return alerts;
}

