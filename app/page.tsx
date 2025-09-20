import { Dashboard } from '@/components/Dashboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-dashboard-bg to-dashboard-card">
      <Dashboard />
    </main>
  );
}
