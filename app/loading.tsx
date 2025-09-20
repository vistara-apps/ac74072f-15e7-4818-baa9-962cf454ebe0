export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dashboard-bg to-dashboard-card flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dashboard-accent"></div>
    </div>
  );
}
