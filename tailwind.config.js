/** @type {import('tailwindcss').Config} */

const twColors = require('tailwindcss/colors')
const themeColors = require('./src/styles/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components.tsx',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: twColors.black,
      white: twColors.white,
      gray: themeColors.gray,
      foreground: {
        DEFAULT: themeColors.gray[800],
        hover: themeColors.gray[700],
      },
      background: twColors.white,
      muted: {
        DEFAULT: themeColors.gray[400],
      },
      border: themeColors.gray[200],
      pre: themeColors.gray[600],
      input: themeColors.gray[100],
      primary: {
        DEFAULT: themeColors.green[500],
        hover: themeColors.green[400],
        foreground: twColors.white,
      },
      danger: {
        DEFAULT: twColors.red[500],
        hover: twColors.red[400],
        foreground: twColors.white,
      },
      success: {
        DEFAULT: themeColors.green[500],
        hover: themeColors.green[500],
        foreground: twColors.white,
      },
      google: { DEFAULT: '#DB4437', foreground: twColors.white, hover: '#EA6155' },
    },
    fontFamily: {
      body: ['Lato'],
      display: ['Poppins'],
      mono: ['Roboto Mono'],
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
