# FlowMetric - Base Mini App

FlowMetric is a productivity platform for SMEs to gain real-time visibility into resource allocation and workforce efficiency using IoT and AI, accessible via Base Wallet MiniApps.

## Features

- **Real-time Task Tracking**: Visualize task completion and progress status instantly across all team members
- **Workforce Efficiency Score**: Quantify team productivity based on logged activity and task completion rates
- **Automated Resource Allocation Alerts**: Receive intelligent notifications about resource utilization
- **Predictive Resource Forecasting**: Anticipate future resource needs based on current project pipelines

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Base Integration**: MiniKit for Farcaster authentication
- **TypeScript**: Full type safety

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Copy `.env.local` and add your API keys:
   ```bash
   NEXT_PUBLIC_MINIKIT_API_KEY=your_minikit_api_key_here
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key_here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main dashboard page
│   ├── providers.tsx      # MiniKit provider setup
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Dashboard.tsx      # Main dashboard component
│   ├── AppShell.tsx       # App layout shell
│   ├── DashboardCard.tsx  # Reusable card component
│   └── ...               # Other UI components
├── lib/                   # Utilities and types
│   ├── types.ts          # TypeScript type definitions
│   ├── utils.ts          # Utility functions
│   └── mockData.ts       # Mock data for development
└── public/               # Static assets
```

## Key Components

### Dashboard
The main dashboard displays:
- Key performance metrics
- Real-time efficiency charts
- Task management interface
- Resource allocation status
- Activity feed

### MiniKit Integration
- Farcaster authentication via Base MiniKit
- Wallet connection for Web3 features
- Social-native user experience

### Responsive Design
- Mobile-first approach
- Dark theme optimized for productivity
- Accessible UI components

## Development

### Adding New Features
1. Define TypeScript types in `lib/types.ts`
2. Create reusable components in `components/`
3. Update mock data in `lib/mockData.ts`
4. Implement in the main Dashboard component

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow the established color palette
- Maintain consistent spacing and typography
- Ensure mobile responsiveness

## Deployment

The app is optimized for deployment on Vercel or similar platforms that support Next.js 15.

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
