/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        text: 'var(--text)',
        primary: 'var(--primary)',
        border: 'var(--border)',
        'card-background': 'var(--card-background)',
      },
      borderRadius: {
        'lg': '0.5rem', // Defines the crisp, blocky corner radius
        'md': '0.375rem',
      },
    },
  },
  plugins: [],
};
