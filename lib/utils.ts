import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function formatPercentage(num: number): string {
  return `${num.toFixed(1)}%`;
}

export function formatCurrency(num: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'completed':
    case 'active':
      return 'text-green-400';
    case 'in-progress':
      return 'text-blue-400';
    case 'delayed':
    case 'blocked':
      return 'text-red-400';
    case 'pending':
    case 'idle':
      return 'text-yellow-400';
    default:
      return 'text-gray-400';
  }
}

export function getEfficiencyTrend(score: number): 'up' | 'down' | 'stable' {
  if (score >= 85) return 'up';
  if (score <= 60) return 'down';
  return 'stable';
}

export function calculateResourceUtilization(resources: any[]): number {
  if (resources.length === 0) return 0;
  const totalUtilization = resources.reduce((sum, resource) => sum + resource.availability, 0);
  return totalUtilization / resources.length;
}
