/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: '#0a0b14',
        surface: '#0f1020',
        'surface-elevated': '#161728',
        border: '#1e2035',
        accent: '#3b82f6',
        'accent-secondary': '#f59e0b',
        success: '#22c55e',
        'text-primary': '#ffffff',
        'text-secondary': '#a1a1aa',
        'text-muted': '#6b7280',
      },
    },
  },
  plugins: [],
};
