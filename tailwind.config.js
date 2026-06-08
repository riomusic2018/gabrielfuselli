/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#D4B86A',
          lighter: '#E8D49A',
          dark: '#A8892D',
          muted: '#8A6F28',
        },
        dark: {
          DEFAULT: '#0A0A0A',
          800: '#111111',
          700: '#1A1A1A',
          600: '#222222',
          500: '#2A2A2A',
          400: '#333333',
          300: '#444444',
        },
        charcoal: '#2E2E2E',
        cream: '#F5F0E8',
        'warm-white': '#FAFAF8',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        'serif-alt': ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.3em',
        ultra: '0.5em',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #D4B86A 50%, #A8892D 100%)',
        'dark-gradient': 'linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.8) 60%, rgba(10,10,10,1) 100%)',
        'hero-overlay': 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.85) 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'slide-right': 'slideRight 0.6s ease forwards',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      transitionTimingFunction: {
        'elegant': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
};
