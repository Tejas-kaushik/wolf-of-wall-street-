import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        editorial: '0 28px 90px rgba(58, 36, 24, 0.14)',
        paper: '0 18px 60px rgba(58, 36, 24, 0.10)',
      },
    },
  },
  plugins: [],
} satisfies Config;