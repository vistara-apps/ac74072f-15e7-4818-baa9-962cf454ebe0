import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
import { User } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const farcasterId = searchParams.get('farcasterId');

    if (farcasterId) {
      const user = db.getUserByFarcasterId(farcasterId);
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json(user);
    }

    const users = db.getUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { farcasterId, name, role } = body;
    if (!farcasterId || !name || !role) {
      return NextResponse.json(
        { error: 'Missing required fields: farcasterId, name, role' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = db.getUserByFarcasterId(farcasterId);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this Farcaster ID already exists' },
        { status: 409 }
      );
    }

    const newUser = db.createUser({
      farcasterId,
      name,
      role,
      skills: body.skills || [],
      avatar: body.avatar
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

