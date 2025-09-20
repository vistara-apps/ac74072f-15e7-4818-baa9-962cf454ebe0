'use client';

import { useEffect, useState } from 'react';
import { useMiniKit } from '@coinbase/minikit';
import { authenticateUser, createUserAccount, AuthUser } from '@/lib/auth';
import { LoadingSkeleton } from './LoadingSkeleton';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { context } = useMiniKit();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!context?.user?.fid) {
        setUser({ isAuthenticated: false, farcasterId: null });
        setIsLoading(false);
        return;
      }

      try {
        const farcasterId = context.user.fid.toString();
        let authUser = await authenticateUser(farcasterId);

        // If not authenticated but we have context, try to create account
        if (!authUser.isAuthenticated && context.user) {
          authUser = await createUserAccount(
            farcasterId,
            context.user.displayName || `User ${farcasterId}`,
            context.user.pfpUrl
          );
        }

        setUser(authUser);
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser({ isAuthenticated: false, farcasterId: null });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [context]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!user?.isAuthenticated) {
    return fallback || (
      <div className="min-h-screen bg-gradient-to-br from-dashboard-bg to-dashboard-card flex items-center justify-center">
        <div className="bg-dashboard-surface p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-dashboard-text mb-4">
              Welcome to FlowMetric
            </h2>
            <p className="text-dashboard-textSecondary mb-6">
              Connect your Farcaster account to access real-time productivity insights.
            </p>
            <div className="text-sm text-dashboard-textSecondary">
              This app requires Farcaster authentication via Base MiniKit.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

