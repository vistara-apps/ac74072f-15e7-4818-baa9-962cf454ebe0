/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(210 36% 96%)',
        surface: 'hsl(210 36% 99%)',
        primary: 'hsl(210 40% 36%)',
        accent: 'hsl(190 60% 50%)',
        success: 'hsl(160 50% 45%)',
        warning: 'hsl(30 80% 50%)',
        danger: 'hsl(0 70% 50%)',
        textPrimary: 'hsl(210 36% 15%)',
        textSecondary: 'hsl(210 36% 40%)',
        dashboard: {
          bg: '#1a2332',
          card: '#243447',
          accent: '#3b82f6',
          text: '#e2e8f0',
          textSecondary: '#94a3b8',
        }
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
      },
      spacing: {
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(210, 36%, 12%, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 0.25s cubic-bezier(0.22,1,0.36,1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
