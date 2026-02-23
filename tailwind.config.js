/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfcfb',
          100: '#f9f7f4',
          200: '#f0ebe5',
          300: '#e5ddd3',
          400: '#d4c9b9',
        },
        sage: {
          50: '#f4f6f3',
          100: '#e8ebe5',
          200: '#d1d9ca',
          300: '#a8b89a',
          400: '#7d9370',
        },
        rose: {
          50: '#fdf6f5',
          100: '#f9e9e7',
          200: '#f2d5d2',
          300: '#e4b3ae',
          400: '#c98a82',
        },
        sand: {
          50: '#faf8f6',
          100: '#f5f0eb',
          200: '#e8dfd5',
          300: '#d4c4b5',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(0,0,0,0.06), 0 8px 16px -6px rgba(0,0,0,0.04)',
        'soft-lg': '0 12px 40px -8px rgba(0,0,0,0.08), 0 16px 24px -8px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
}
