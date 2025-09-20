'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dashboard-bg to-dashboard-card flex items-center justify-center">
      <div className="text-center p-8 bg-dashboard-card rounded-lg shadow-card">
        <h2 className="text-2xl font-bold text-dashboard-text mb-4">
          Something went wrong!
        </h2>
        <p className="text-dashboard-textSecondary mb-6">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={reset}
          className="bg-dashboard-accent text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
