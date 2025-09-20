import { db } from './database';
import { User } from './types';

export interface AuthenticatedUser extends User {
  isAuthenticated: true;
}

export interface UnauthenticatedUser {
  isAuthenticated: false;
  farcasterId: null;
}

export type AuthUser = AuthenticatedUser | UnauthenticatedUser;

/**
 * Authenticate a user based on their Farcaster ID from MiniKit context
 */
export async function authenticateUser(farcasterId: string): Promise<AuthUser> {
  if (!farcasterId) {
    return { isAuthenticated: false, farcasterId: null };
  }

  try {
    // Check if user exists in database
    let user = db.getUserByFarcasterId(farcasterId);

    if (!user) {
      // User doesn't exist, return unauthenticated
      return { isAuthenticated: false, farcasterId: null };
    }

    return {
      ...user,
      isAuthenticated: true
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return { isAuthenticated: false, farcasterId: null };
  }
}

/**
 * Create a new user account
 */
export async function createUserAccount(
  farcasterId: string,
  displayName: string,
  profilePicture?: string
): Promise<AuthenticatedUser> {
  try {
    // Check if user already exists
    const existingUser = db.getUserByFarcasterId(farcasterId);
    if (existingUser) {
      return { ...existingUser, isAuthenticated: true };
    }

    // Create new user
    const newUser = db.createUser({
      farcasterId,
      name: displayName,
      role: 'Team Member', // Default role
      skills: [],
      avatar: profilePicture
    });

    return { ...newUser, isAuthenticated: true };
  } catch (error) {
    console.error('Error creating user account:', error);
    throw new Error('Failed to create user account');
  }
}

/**
 * Get current user from MiniKit context
 */
export async function getCurrentUser(context: any): Promise<AuthUser> {
  if (!context?.user?.fid) {
    return { isAuthenticated: false, farcasterId: null };
  }

  const farcasterId = context.user.fid.toString();
  return authenticateUser(farcasterId);
}

/**
 * Middleware helper to require authentication
 */
export function requireAuth(user: AuthUser): asserts user is AuthenticatedUser {
  if (!user.isAuthenticated) {
    throw new Error('Authentication required');
  }
}

/**
 * Check if user has required role
 */
export function hasRole(user: AuthenticatedUser, requiredRole: string): boolean {
  // Simple role check - can be extended with more complex role-based access
  return user.role.toLowerCase() === requiredRole.toLowerCase() ||
         user.role.toLowerCase() === 'admin';
}

