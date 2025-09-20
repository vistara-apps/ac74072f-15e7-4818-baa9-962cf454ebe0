import { Dashboard } from '@/components/Dashboard';
import { AuthGuard } from '@/components/AuthGuard';

export default function Home() {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-gradient-to-br from-dashboard-bg to-dashboard-card">
        <Dashboard />
      </main>
    </AuthGuard>
  );
}
