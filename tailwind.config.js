/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#fafafa',
          100: '#f5f5f5',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#404040',
          800: '#2d2d2d',
          900: '#1a1a1a',
          950: '#0a0a0a',
        },
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        accent: {
          100: '#fee2e2',
          200: '#fecaca',
          600: '#dc2626',
          700: '#b91c1c',
        },
        success: {
          600: '#16a34a',
          700: '#15803d',
        },
        amber: {
          50: '#fef3c7',
          200: '#fde68a',
          600: '#d97706',
          800: '#92400e',
          900: '#78350f',
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out',
        'float-slow': 'float-slow 3s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'fade-up': {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'float-slow': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'pulse-ring': {
          '0%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(1.5)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
};
