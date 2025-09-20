import { NextRequest } from 'next/server';
import { db } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');
    const message = searchParams.get('message');

    if (!taskId) {
      return new Response('Task ID required', { status: 400 });
    }

    const task = db.getTaskById(taskId);
    if (!task) {
      return new Response('Task not found', { status: 404 });
    }

    const project = db.getProjectById(task.projectId);
    const user = db.getUserById(task.assignedUserId);

    // Generate SVG image for the frame
    const svg = generateFrameImage(task, project, user, message);

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    });

  } catch (error) {
    console.error('Frame image generation error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

function generateFrameImage(task: any, project: any, user: any, message?: string) {
  const statusColors = {
    pending: '#fbbf24', // yellow
    in_progress: '#3b82f6', // blue
    completed: '#10b981', // green
    delayed: '#ef4444' // red
  };

  const statusColor = statusColors[task.status as keyof typeof statusColors] || '#6b7280';

  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <!-- Background gradient -->
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>

      <!-- Header -->
      <rect x="0" y="0" width="1200" height="80" fill="#1e293b"/>
      <text x="40" y="50" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white">
        FlowMetric - Task Update
      </text>

      <!-- Main content -->
      <g transform="translate(40, 120)">
        <!-- Project info -->
        <text x="0" y="0" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#1e293b">
          Project: ${project?.projectName || 'Unknown Project'}
        </text>

        <!-- Task description -->
        <text x="0" y="50" font-family="Arial, sans-serif" font-size="20" fill="#475569">
          Task: ${task.description}
        </text>

        <!-- Assigned user -->
        <text x="0" y="90" font-family="Arial, sans-serif" font-size="18" fill="#64748b">
          Assigned to: ${user?.name || 'Unknown User'}
        </text>

        <!-- Status badge -->
        <rect x="0" y="120" width="120" height="30" rx="15" fill="${statusColor}"/>
        <text x="60" y="140" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">
          ${task.status.replace('_', ' ').toUpperCase()}
        </text>

        <!-- Message if provided -->
        ${message ? `
          <text x="0" y="190" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#059669">
            ${message}
          </text>
        ` : ''}

        <!-- Progress info -->
        <text x="0" y="${message ? 240 : 190}" font-family="Arial, sans-serif" font-size="16" fill="#64748b">
          Priority: ${task.priority || 'Medium'}
        </text>

        ${task.estimatedEffort ? `
          <text x="0" y="${message ? 270 : 220}" font-family="Arial, sans-serif" font-size="16" fill="#64748b">
            Estimated: ${task.estimatedEffort} hours
          </text>
        ` : ''}

        ${task.actualEffort ? `
          <text x="0" y="${message ? 300 : 250}" font-family="Arial, sans-serif" font-size="16" fill="#64748b">
            Actual: ${task.actualEffort} hours
          </text>
        ` : ''}
      </g>

      <!-- Footer -->
      <rect x="0" y="550" width="1200" height="80" fill="#f1f5f9"/>
      <text x="40" y="580" font-family="Arial, sans-serif" font-size="16" fill="#64748b">
        FlowMetric - Real-time SME Productivity Insights
      </text>
      <text x="40" y="605" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8">
        Powered by Base & Farcaster
      </text>
    </svg>
  `;

  return svg;
}

