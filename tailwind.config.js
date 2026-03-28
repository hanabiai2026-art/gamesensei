/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a12',
        surface: '#12121f',
        'surface-elevated': '#1a1a2e',
        border: '#1e1e35',
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
