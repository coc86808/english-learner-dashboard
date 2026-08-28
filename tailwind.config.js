/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#0e111a',
          card: '#141824',
          cardHover: '#1a2030',
          sidebar: '#0c0f17',
          surface: '#181e2e',
          border: '#1f2738'
        },
        brand: {
          green: '#00c569',
          greenDark: '#009e53',
          greenLight: '#26e889',
          yellow: '#f59e0b',
          red: '#ef4444',
          purple: '#8b5cf6',
          cyan: '#06b6d4',
          teal: '#14b8a6',
          orange: '#ff5722'
        }
      },
      fontFamily: {
        bengali: ['"Hind Siliguri"', '"Noto Sans Bengali"', 'sans-serif'],
        sans: ['Inter', '"Hind Siliguri"', 'sans-serif']
      },
      boxShadow: {
        'glow-green': '0 0 20px -5px rgba(0, 197, 105, 0.3)',
        'glow-purple': '0 0 20px -5px rgba(139, 92, 246, 0.3)',
        'glow-yellow': '0 0 20px -5px rgba(245, 158, 11, 0.3)',
        'glow-red': '0 0 20px -5px rgba(239, 68, 68, 0.3)',
        'card': '0 4px 20px 0 rgba(0, 0, 0, 0.35)',
      }
    },
  },
  plugins: [],
}
