import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#EAF3DE',
          100: '#C0DD97',
          200: '#97C459',
          400: '#639922',
          600: '#3B6D11',
          800: '#27500A',
          900: '#173404',
        },
        amber: {
          50:  '#FAEEDA',
          100: '#FAC775',
          400: '#BA7517',
          600: '#854F0B',
          900: '#412402',
        },
        stone: {
          50:  '#F1EFE8',
          100: '#D3D1C7',
          400: '#888780',
          700: '#5F5E5A',
          900: '#2C2C2A',
        },
        cream: '#FFFDF7',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
