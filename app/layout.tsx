import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'FlowMetric - Unlock Peak SME Productivity',
  description: 'Real-time visibility into resource allocation and workforce efficiency using IoT and AI',
  keywords: ['productivity', 'SME', 'workforce', 'efficiency', 'Base', 'MiniApp'],
  authors: [{ name: 'FlowMetric Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
