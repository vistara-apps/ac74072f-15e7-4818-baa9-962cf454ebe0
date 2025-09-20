import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';

// Simple frame verification (in production, use proper Farcaster verification)
function verifyFrameSignature(request: NextRequest): boolean {
  // For now, we'll trust the request - in production, verify the signature
  // using the Farcaster frame verification protocol
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Verify frame signature (placeholder for now)
    if (!verifyFrameSignature(request)) {
      return NextResponse.json({ error: 'Invalid frame signature' }, { status: 401 });
    }

    const body = await request.json();
    const { action, taskId, farcasterId } = body;

    if (!action || !taskId || !farcasterId) {
      return NextResponse.json(
        { error: 'Missing required fields: action, taskId, farcasterId' },
        { status: 400 }
      );
    }

    // Verify user exists
    const user = db.getUserByFarcasterId(farcasterId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get the task
    const task = db.getTaskById(taskId);
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Verify user is assigned to the task
    if (task.assignedUserId !== user.userId) {
      return NextResponse.json({ error: 'User not assigned to this task' }, { status: 403 });
    }

    let updatedTask;
    let message;

    switch (action) {
      case 'mark_complete':
        updatedTask = db.updateTask(taskId, {
          status: 'completed',
          endTime: new Date().toISOString()
        });
        message = `✅ Task "${task.description}" marked as completed!`;
        break;

      case 'mark_in_progress':
        updatedTask = db.updateTask(taskId, {
          status: 'in_progress',
          startTime: new Date().toISOString()
        });
        message = `🚀 Started working on "${task.description}"`;
        break;

      case 'mark_pending':
        updatedTask = db.updateTask(taskId, {
          status: 'pending',
          startTime: undefined,
          endTime: undefined
        });
        message = `⏸️ Task "${task.description}" marked as pending`;
        break;

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    if (!updatedTask) {
      return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
    }

    // Create activity log
    db.createActivity({
      type: 'task_update',
      description: message,
      userId: user.userId,
      taskId: taskId,
      projectId: task.projectId
    });

    // Return frame response
    const frameResponse = {
      frames: [
        {
          version: 'vNext',
          image: {
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frames/image?taskId=${taskId}&message=${encodeURIComponent(message)}`,
            aspectRatio: '1.91:1'
          },
          buttons: [
            {
              label: 'View Dashboard',
              action: 'link',
              target: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
            },
            {
              label: 'Update Another Task',
              action: 'post',
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frames`
            }
          ],
          postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frames`
        }
      ]
    };

    return NextResponse.json(frameResponse);

  } catch (error) {
    console.error('Frame action error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET endpoint for frame metadata
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');

    if (!taskId) {
      return NextResponse.json({ error: 'Task ID required' }, { status: 400 });
    }

    const task = db.getTaskById(taskId);
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    const project = db.getProjectById(task.projectId);
    const user = db.getUserById(task.assignedUserId);

    const frameData = {
      version: 'vNext',
      image: {
        src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frames/image?taskId=${taskId}`,
        aspectRatio: '1.91:1'
      },
      buttons: [
        {
          label: task.status === 'completed' ? 'Mark Pending' : 'Mark Complete',
          action: 'post',
          target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frames`
        },
        {
          label: 'View Details',
          action: 'link',
          target: `${process.env.NEXT_PUBLIC_BASE_URL}/task/${taskId}`
        }
      ],
      postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frames`
    };

    return NextResponse.json(frameData);

  } catch (error) {
    console.error('Frame metadata error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

