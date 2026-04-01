/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-teal': '#0D5C63',
        'soft-sage': '#E8F4F3',
        'warm-coral': '#E07A5F',
        'charcoal': '#1A1A2E',
        'slate-text': '#64748B',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
