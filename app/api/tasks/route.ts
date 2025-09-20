import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
import { Task } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const userId = searchParams.get('userId');

    if (projectId) {
      const tasks = db.getTasksByProject(projectId);
      return NextResponse.json(tasks);
    }

    if (userId) {
      const tasks = db.getTasksByUser(userId);
      return NextResponse.json(tasks);
    }

    const tasks = db.getTasks();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { projectId, assignedUserId, description, estimatedEffort } = body;
    if (!projectId || !assignedUserId || !description || typeof estimatedEffort !== 'number') {
      return NextResponse.json(
        { error: 'Missing required fields: projectId, assignedUserId, description, estimatedEffort' },
        { status: 400 }
      );
    }

    const newTask = db.createTask({
      projectId,
      assignedUserId,
      description,
      status: body.status || 'pending',
      estimatedEffort,
      actualEffort: body.actualEffort,
      startTime: body.startTime,
      endTime: body.endTime,
      priority: body.priority || 'medium'
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

