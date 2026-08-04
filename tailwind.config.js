/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50:  '#fafafa',
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
        // Brand = Blue anchor (#448cfd) — tiếp tục dùng cho icon, ring, shadow
        brand: {
          50:  '#eef5ff',
          100: '#d6e9ff',
          200: '#aed3ff',
          300: '#76b6fe',
          400: '#448cfd',
          500: '#2272e8',
          600: '#448cfd',   // dùng như màu primary
          700: '#2272e8',
          800: '#1658cc',
          900: '#1045a4',
        },
        accent: {
          50:  '#fff0f0',
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
          50:  '#fef3c7',
          200: '#fde68a',
          600: '#d97706',
          800: '#92400e',
          900: '#78350f',
        },
      },
      backgroundImage: {
        // Gradient chủ đạo 3 màu — dùng cho nút, background, icon
        'g3':      'linear-gradient(135deg, #448cfd 0%, #ff8720 50%, #ff8de4 100%)',
        'g3-r':    'linear-gradient(90deg,  #448cfd 0%, #ff8720 50%, #ff8de4 100%)',
        'g3-blue': 'linear-gradient(135deg, #448cfd 0%, #2272e8 100%)',
        'g3-warm': 'linear-gradient(135deg, #ff8720 0%, #ff8de4 100%)',
        'g3-cool': 'linear-gradient(135deg, #448cfd 0%, #ff8de4 100%)',
        // Hero section bg
        'hero-bg': 'linear-gradient(160deg, #eef5ff 0%, #fff4e6 50%, #fff0fc 100%)',
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
