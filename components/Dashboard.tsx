'use client';

import { useState, useEffect } from 'react';
// import { useMiniKit } from '@coinbase/onchainkit';
import { AppShell } from './AppShell';
import { DashboardCard } from './DashboardCard';
import { ProgressBar } from './ProgressBar';
import { StatusBadge } from './StatusBadge';
import { NotificationBanner } from './NotificationBanner';
import { ResourceCard } from './ResourceCard';
import { EfficiencyChart } from './EfficiencyChart';
import { TaskList } from './TaskList';
import { mockDashboardData, mockUsers, mockProjects, mockEfficiencyMetrics, mockTimeSeriesData } from '@/lib/mockData';
import { formatNumber, formatPercentage } from '@/lib/utils';
import { Activity, BarChart3, Users, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

export function Dashboard() {
  // const { context } = useMiniKit();
  const [dashboardData, setDashboardData] = useState(mockDashboardData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dashboard-accent"></div>
        </div>
      </AppShell>
    );
  }

  const completionRate = (dashboardData.completedTasks / dashboardData.totalTasks) * 100;

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dashboard-text">
              Welcome back, Team Lead
            </h1>
            <p className="text-dashboard-textSecondary mt-1">
              Here's what's happening with your team today
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <StatusBadge variant="active">
              System Online
            </StatusBadge>
          </div>
        </div>

        {/* Alerts */}
        {dashboardData.alerts.length > 0 && (
          <div className="space-y-2">
            {dashboardData.alerts.map((alert) => (
              <NotificationBanner
                key={alert.id}
                variant={alert.severity === 'high' ? 'error' : alert.severity === 'medium' ? 'warning' : 'info'}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                {alert.message}
              </NotificationBanner>
            ))}
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dashboard-textSecondary text-sm">Total Tasks</p>
                <p className="text-2xl font-bold text-dashboard-text">
                  {formatNumber(dashboardData.totalTasks)}
                </p>
              </div>
              <Activity className="w-8 h-8 text-dashboard-accent" />
            </div>
            <div className="mt-4">
              <ProgressBar 
                variant="task" 
                progress={completionRate}
                label={`${dashboardData.completedTasks} completed`}
              />
            </div>
          </DashboardCard>

          <DashboardCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dashboard-textSecondary text-sm">Active Projects</p>
                <p className="text-2xl font-bold text-dashboard-text">
                  {dashboardData.activeProjects}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-400" />
            </div>
            <div className="mt-4">
              <p className="text-sm text-green-400">
                +2 from last week
              </p>
            </div>
          </DashboardCard>

          <DashboardCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dashboard-textSecondary text-sm">Team Efficiency</p>
                <p className="text-2xl font-bold text-dashboard-text">
                  {formatPercentage(dashboardData.teamEfficiency)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="mt-4">
              <p className="text-sm text-green-400">
                +5.2% from last month
              </p>
            </div>
          </DashboardCard>

          <DashboardCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dashboard-textSecondary text-sm">Resource Utilization</p>
                <p className="text-2xl font-bold text-dashboard-text">
                  {formatPercentage(dashboardData.resourceUtilization)}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <div className="mt-4">
              <ProgressBar 
                variant="project" 
                progress={dashboardData.resourceUtilization}
                label="Optimal range: 70-90%"
              />
            </div>
          </DashboardCard>
        </div>

        {/* Charts and Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-dashboard-text">
                Efficiency Trends
              </h3>
              <StatusBadge variant="active">
                Live Data
              </StatusBadge>
            </div>
            <EfficiencyChart data={mockTimeSeriesData} />
          </DashboardCard>

          <DashboardCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-dashboard-text">
                Team Performance
              </h3>
              <Clock className="w-5 h-5 text-dashboard-textSecondary" />
            </div>
            <div className="space-y-4">
              {mockEfficiencyMetrics.map((metric, index) => {
                const user = mockUsers.find(u => u.userId === metric.userId);
                return (
                  <div key={metric.userId} className="flex items-center justify-between p-3 bg-dashboard-bg rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-dashboard-accent rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {user?.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-dashboard-text font-medium">{user?.name}</p>
                        <p className="text-dashboard-textSecondary text-sm">{user?.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-dashboard-text font-semibold">{metric.score}%</p>
                      <p className="text-dashboard-textSecondary text-sm">
                        {metric.tasksCompleted} tasks
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </DashboardCard>
        </div>

        {/* Resource Cards and Task List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DashboardCard>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-dashboard-text">
                  Recent Tasks
                </h3>
                <button className="text-dashboard-accent hover:text-blue-300 text-sm font-medium">
                  View All
                </button>
              </div>
              <TaskList />
            </DashboardCard>
          </div>

          <div>
            <DashboardCard>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-dashboard-text">
                  Resource Status
                </h3>
                <Users className="w-5 h-5 text-dashboard-textSecondary" />
              </div>
              <div className="space-y-4">
                {mockUsers.slice(0, 3).map((user) => (
                  <ResourceCard key={user.userId} user={user} />
                ))}
              </div>
            </DashboardCard>
          </div>
        </div>

        {/* Recent Activity */}
        <DashboardCard>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-dashboard-text">
              Recent Activity
            </h3>
            <Activity className="w-5 h-5 text-dashboard-textSecondary" />
          </div>
          <div className="space-y-3">
            {dashboardData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-dashboard-bg rounded-lg">
                <div className="w-2 h-2 bg-dashboard-accent rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-dashboard-text">{activity.description}</p>
                  <p className="text-dashboard-textSecondary text-sm">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </AppShell>
  );
}
