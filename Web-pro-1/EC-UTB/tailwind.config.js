/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/views/**/*.{php,html}",
    "./public/**/*.{js,html}",
  ],
  safelist: [
    'bg-ec-blue', 'text-ec-blue', 'border-ec-blue', 'border-b-ec-blue', 'border-l-4-ec-blue', 'border-t-4-ec-blue',
    'bg-ec-red', 'text-ec-red', 'border-ec-red', 'border-b-ec-red', 'border-l-4-ec-red', 'border-t-4-ec-red',
    'hover:bg-ec-blue', 'hover:text-ec-blue',
    'hover:bg-ec-red', 'hover:text-ec-red',
    'from-ec-blue', 'to-ec-red',
    'bg-ec-blue/5', 'bg-ec-blue/10', 'bg-ec-blue/20', 'bg-ec-blue/90',
    'bg-ec-red/5', 'bg-ec-red/10', 'bg-ec-red/90',
  ],
  theme: {
    extend: {
      colors: {
        'ec-blue': '#001452',
        'ec-red': '#D81B2B',
      },
    },
  },
  plugins: [],
}
