import { DashboardData, User, Project, Task, Resource, EfficiencyMetrics, TimeSeriesData } from './types';

export const mockUsers: User[] = [
  {
    userId: '1',
    farcasterId: 'alice.eth',
    name: 'Alice Johnson',
    role: 'Project Manager',
    skills: ['Leadership', 'Planning', 'Communication'],
    avatar: '/avatars/alice.jpg'
  },
  {
    userId: '2',
    farcasterId: 'bob.dev',
    name: 'Bob Smith',
    role: 'Developer',
    skills: ['React', 'TypeScript', 'Node.js'],
    avatar: '/avatars/bob.jpg'
  },
  {
    userId: '3',
    farcasterId: 'carol.design',
    name: 'Carol Davis',
    role: 'Designer',
    skills: ['UI/UX', 'Figma', 'Prototyping'],
    avatar: '/avatars/carol.jpg'
  }
];

export const mockProjects: Project[] = [
  {
    projectId: '1',
    projectName: 'Mobile App Redesign',
    dueDate: '2024-02-15',
    status: 'active',
    progress: 75,
    assignedUsers: ['1', '2', '3']
  },
  {
    projectId: '2',
    projectName: 'API Integration',
    dueDate: '2024-01-30',
    status: 'completed',
    progress: 100,
    assignedUsers: ['2']
  },
  {
    projectId: '3',
    projectName: 'Marketing Campaign',
    dueDate: '2024-03-01',
    status: 'delayed',
    progress: 45,
    assignedUsers: ['1']
  }
];

export const mockTasks: Task[] = [
  {
    taskId: '1',
    projectId: '1',
    assignedUserId: '3',
    description: 'Create wireframes for new dashboard',
    status: 'completed',
    estimatedEffort: 8,
    actualEffort: 6,
    priority: 'high'
  },
  {
    taskId: '2',
    projectId: '1',
    assignedUserId: '2',
    description: 'Implement user authentication',
    status: 'in-progress',
    estimatedEffort: 16,
    actualEffort: 12,
    priority: 'high'
  },
  {
    taskId: '3',
    projectId: '2',
    assignedUserId: '2',
    description: 'Set up API endpoints',
    status: 'completed',
    estimatedEffort: 12,
    actualEffort: 10,
    priority: 'medium'
  }
];

export const mockResources: Resource[] = [
  {
    resourceId: '1',
    resourceName: 'Alice Johnson',
    resourceType: 'human',
    availability: 85,
    currentAssignments: ['1', '3'],
    skills: ['Leadership', 'Planning']
  },
  {
    resourceId: '2',
    resourceName: 'Bob Smith',
    resourceType: 'human',
    availability: 95,
    currentAssignments: ['1', '2'],
    skills: ['React', 'TypeScript']
  },
  {
    resourceId: '3',
    resourceName: 'Carol Davis',
    resourceType: 'human',
    availability: 70,
    currentAssignments: ['1'],
    skills: ['UI/UX', 'Design']
  }
];

export const mockEfficiencyMetrics: EfficiencyMetrics[] = [
  {
    userId: '1',
    score: 88,
    tasksCompleted: 12,
    averageCompletionTime: 6.5,
    utilizationRate: 85,
    trend: 'up'
  },
  {
    userId: '2',
    score: 92,
    tasksCompleted: 18,
    averageCompletionTime: 5.2,
    utilizationRate: 95,
    trend: 'up'
  },
  {
    userId: '3',
    score: 76,
    tasksCompleted: 8,
    averageCompletionTime: 8.1,
    utilizationRate: 70,
    trend: 'stable'
  }
];

export const mockDashboardData: DashboardData = {
  totalTasks: 45,
  completedTasks: 32,
  activeProjects: 8,
  teamEfficiency: 85.3,
  resourceUtilization: 83.3,
  alerts: [
    {
      id: '1',
      type: 'shortage',
      resourceId: '3',
      severity: 'medium',
      message: 'Design team approaching capacity limit',
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      type: 'underutilized',
      resourceId: '4',
      severity: 'low',
      message: 'Development server has low utilization',
      timestamp: '2024-01-15T09:15:00Z'
    }
  ],
  recentActivity: [
    {
      id: '1',
      type: 'task_completed',
      description: 'Wireframes completed by Carol Davis',
      timestamp: '2024-01-15T14:30:00Z',
      userId: '3',
      projectId: '1'
    },
    {
      id: '2',
      type: 'project_started',
      description: 'New project "Mobile App Redesign" started',
      timestamp: '2024-01-15T09:00:00Z',
      projectId: '1'
    }
  ]
};

export const mockTimeSeriesData: TimeSeriesData[] = [
  { date: '2024-01-01', value: 78 },
  { date: '2024-01-02', value: 82 },
  { date: '2024-01-03', value: 85 },
  { date: '2024-01-04', value: 79 },
  { date: '2024-01-05', value: 88 },
  { date: '2024-01-06', value: 91 },
  { date: '2024-01-07', value: 85 },
  { date: '2024-01-08', value: 89 },
  { date: '2024-01-09', value: 93 },
  { date: '2024-01-10', value: 87 },
  { date: '2024-01-11', value: 90 },
  { date: '2024-01-12', value: 94 },
  { date: '2024-01-13', value: 88 },
  { date: '2024-01-14', value: 92 },
  { date: '2024-01-15', value: 95 }
];
