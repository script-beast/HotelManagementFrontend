/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      keyframes: {
        highlightPulse: {
          '0%': { backgroundColor: '#fef9c3' }, // yellow-100
          '50%': { backgroundColor: '#fde68a' }, // yellow-300
          '100%': { backgroundColor: '#fef9c3' },
        },
      },
      animation: {
        highlight: 'highlightPulse 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
