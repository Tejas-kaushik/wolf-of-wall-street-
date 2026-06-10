import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F7EFE3',
        cream: '#FFF8EC',
        ink: '#241812',
        muted: '#7A665A',
        coffee: '#4B2E1F',
        sage: '#84966D',
        terracotta: '#B97457',
        pastry: '#D7B58A',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        float: '0 26px 80px rgba(75, 46, 31, 0.12)',
        soft: '0 16px 48px rgba(75, 46, 31, 0.10)',
        warm: '0 22px 60px rgba(75, 46, 31, 0.24)',
      },
      keyframes: {
        'fade-rise': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'soft-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.52' },
          '50%': { transform: 'scale(1.08)', opacity: '0.78' },
        },
      },
      animation: {
        'fade-rise': 'fade-rise 0.8s ease-out both',
        'fade-rise-delay': 'fade-rise 0.8s ease-out 0.2s both',
        'fade-rise-delay-2': 'fade-rise 0.8s ease-out 0.4s both',
        'soft-pulse': 'soft-pulse 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
