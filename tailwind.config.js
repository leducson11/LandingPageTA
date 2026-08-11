/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      colors: {
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
        // Brand = LadiPage violet (#6d28d9)
        brand: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#6d28d9',   // primary
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#29124d',   // deep violet dùng cho khối tối
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
          50:  '#fff3ec',
          100: '#ffe3d4',
          200: '#ffc9ad',
          300: '#ffb489',
          400: '#ff9761',
          500: '#f97b41',
          600: '#f36e36',
          700: '#d1541f',
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
        // Gradient chủ đạo của theme — violet
        'g3':      'linear-gradient(135deg, #6d28d9 0%, #5b21b6 55%, #29124d 100%)',
        'g3-r':    'linear-gradient(90deg,  #6d28d9 0%, #5b21b6 55%, #29124d 100%)',
        'g3-blue': 'linear-gradient(135deg, #365dff 0%, #1c00c2 100%)',
        'g3-warm': 'linear-gradient(135deg, #6d28d9 0%, #f36e36 100%)',
        'g3-cool': 'linear-gradient(135deg, #6d28d9 0%, #00dcdc 100%)',
        // Hero section bg
        'hero-bg': 'linear-gradient(160deg, #ffffff 0%, #f5f3ff 55%, #ede9fe 100%)',
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
