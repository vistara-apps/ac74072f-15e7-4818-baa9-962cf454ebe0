export interface User {
  userId: string;
  farcasterId?: string;
  name: string;
  role: string;
  skills: string[];
  avatar?: string;
}

export interface Project {
  projectId: string;
  projectName: string;
  dueDate: string;
  status: 'active' | 'completed' | 'delayed' | 'idle';
  progress: number;
  assignedUsers: string[];
}

export interface Task {
  taskId: string;
  projectId: string;
  assignedUserId: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  startTime?: string;
  endTime?: string;
  estimatedEffort: number;
  actualEffort?: number;
  priority: 'low' | 'medium' | 'high';
}

export interface Resource {
  resourceId: string;
  resourceName: string;
  resourceType: 'human' | 'equipment' | 'software' | 'space';
  availability: number; // percentage
  currentAssignments: string[];
  skills?: string[];
}

export interface EfficiencyMetrics {
  userId: string;
  score: number;
  tasksCompleted: number;
  averageCompletionTime: number;
  utilizationRate: number;
  trend: 'up' | 'down' | 'stable';
}

export interface ResourceAlert {
  id: string;
  type: 'shortage' | 'underutilized' | 'overallocated';
  resourceId: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
}

export interface DashboardData {
  totalTasks: number;
  completedTasks: number;
  activeProjects: number;
  teamEfficiency: number;
  resourceUtilization: number;
  alerts: ResourceAlert[];
  recentActivity: Activity[];
}

export interface Activity {
  id: string;
  type: 'task_completed' | 'project_started' | 'resource_allocated' | 'alert_generated';
  description: string;
  timestamp: string;
  userId?: string;
  projectId?: string;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface TimeSeriesData {
  date: string;
  value: number;
  category?: string;
}
