/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components.tsx',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      foreground: {
        DEFAULT: '#202823',
        inactive: '#5B6B6C',
        hover: '#363d39',
      },
      background: colors.white,
      muted: {
        DEFAULT: '#8CA3A4',
      },
      border: '#DAE3E4',
      gray: colors.slate,
      input: '#F2F7F7',
      primary: {
        DEFAULT: '#41BB72',
        hover: '#5FD58E',
        foreground: colors.white,
      },
      danger: {
        DEFAULT: colors.red[500],
        hover: colors.red[400],
        foreground: colors.white,
      },
      google: { DEFAULT: '#DB4437', foreground: colors.white, hover: '#EA6155' },
    },
    fontFamily: {
      body: ['Lato'],
      display: ['Poppins'],
    },

    extend: {
      maxWidth: {
        layout: '64rem',
        content: '48rem',
      },
    },
  },
  plugins: [],
}
