import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
import { Project } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (userId) {
      const projects = db.getProjectsByUser(userId);
      return NextResponse.json(projects);
    }

    const projects = db.getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { projectName, dueDate, assignedUsers } = body;
    if (!projectName || !dueDate || !assignedUsers || !Array.isArray(assignedUsers)) {
      return NextResponse.json(
        { error: 'Missing required fields: projectName, dueDate, assignedUsers (array)' },
        { status: 400 }
      );
    }

    const newProject = db.createProject({
      projectName,
      dueDate,
      status: body.status || 'active',
      progress: body.progress || 0,
      assignedUsers
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

