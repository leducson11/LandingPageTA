/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      colors: {
        blue: {
          50:  '#F1F2FC',
          100: '#E1E4F5',
          600: '#2C3481',
          800: '#2C3481',
        },
        indigo: {
          900: '#2C3481',
        },
        orange: {
          500: '#F68C1F',
          600: '#F68C1F',
        },
        ink: {
          50:  '#f8f8f9',
          100: '#f1f3f4',
          200: '#e3e3e5',
          300: '#c4c4c6',
          400: '#a6a6a6',
          500: '#8a8a8d',
          600: '#717174',
          700: '#3f3f42',
          800: '#1c1c1e',
          900: '#000000',
          950: '#000000',
        },
        // Brand palette
        brand: {
          50:  '#F1F2FC',
          100: '#E1E4F5',
          200: '#C5CAEA',
          300: '#9FA7D5',
          400: '#737CBF',
          500: '#4E579F',
          600: '#2C3481',
          700: '#242A6B',
          800: '#1D2358',
          900: '#171B45',
        },
        // Accent phụ của theme: xanh dương, teal, cam
        azure: {
          500: '#365dff',
          600: '#1c00c2',
        },
        teal: {
          400: '#00dcdc',
          500: '#14b8a6',
          600: '#05a6a6',
        },
        accent: {
          50:  '#FFF4E8',
          100: '#FFE5C7',
          200: '#FFCB91',
          300: '#FFB15A',
          400: '#F99D3D',
          500: '#F68C1F',
          600: '#F68C1F',
          700: '#D86F0C',
        },
        success: {
          600: '#16a34a',
          700: '#15803d',
        },
        amber: {
          50:  '#fef3c7',
          200: '#fde68a',
          600: '#d97706',
          800: '#92400e',
          900: '#78350f',
        },
      },
      backgroundImage: {
        // Brand gradients
        'g3':      'linear-gradient(135deg, #2C3481 0%, #242A6B 55%, #171B45 100%)',
        'g3-r':    'linear-gradient(90deg,  #2C3481 0%, #242A6B 55%, #171B45 100%)',
        'g3-blue': 'linear-gradient(135deg, #2C3481 0%, #171B45 100%)',
        'g3-warm': 'linear-gradient(135deg, #2C3481 0%, #F68C1F 100%)',
        'g3-cool': 'linear-gradient(135deg, #2C3481 0%, #737CBF 100%)',
        // Hero section bg
        'hero-bg': 'linear-gradient(160deg, #ffffff 0%, #F1F2FC 55%, #E1E4F5 100%)',
      },
      animation: {
        'fade-up':    'fade-up 0.6s ease-out',
        'float-slow': 'float-slow 3s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer':    'shimmer 2.5s linear infinite',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(1)',   opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
      },
    },
  },
  plugins: [],
};
