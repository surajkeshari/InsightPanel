

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'], // Enable dark mode based on data attribute
  theme: {
    extend: {
      colors: {
        // Match design tokens to CSS variables (optional but good practice)
        'accent': 'var(--accent-color)',
        'background': 'var(--bg-default)',
        'foreground': 'var(--text-primary)',
        'muted': 'var(--text-secondary)',
        'card': 'var(--bg-default)',
        'border': 'var(--border-color)',
      },
    },
  },
  plugins: [],
}