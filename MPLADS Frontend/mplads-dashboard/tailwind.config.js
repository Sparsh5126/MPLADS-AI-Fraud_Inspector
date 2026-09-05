/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        sidebar: '#0F1B2D',
        'sidebar-hover': '#1A2D4A',
        'sidebar-active': '#1E3A5F',
        primary: '#2563EB',
        'primary-light': '#3B82F6',
        'bg-main': '#F7F9FC',
        'border-subtle': '#E5E7EB',
        critical: '#EF4444',
        'critical-light': '#FEF2F2',
        high: '#F97316',
        'high-light': '#FFF7ED',
        medium: '#F59E0B',
        'medium-light': '#FFFBEB',
        low: '#22C55E',
        'low-light': '#F0FDF4',
      },
      borderRadius: {
        card: '10px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 4px 12px 0 rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
