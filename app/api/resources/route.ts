import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
import { Resource } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const resources = db.getResources();
    return NextResponse.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { resourceName, resourceType, availability } = body;
    if (!resourceName || !resourceType || typeof availability !== 'number') {
      return NextResponse.json(
        { error: 'Missing required fields: resourceName, resourceType, availability' },
        { status: 400 }
      );
    }

    const newResource = db.createResource({
      resourceName,
      resourceType,
      availability,
      currentAssignments: body.currentAssignments || [],
      skills: body.skills
    });

    return NextResponse.json(newResource, { status: 201 });
  } catch (error) {
    console.error('Error creating resource:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

