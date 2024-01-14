/** @type {import('tailwindcss').Config} */

const twColors = require('tailwindcss/colors')
const themeColors = require('./src/styles/colors')
const themeSwapper = require('tailwindcss-theme-swapper')
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
    fontFamily: {
      body: ['Lato'],
      display: ['Poppins'],
      mono: ['Roboto Mono'],
    },

    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: twColors.black,
        white: twColors.white,
        gray: themeColors.gray,
        // foreground: {
        //   DEFAULT: themeColors.gray[800],
        //   hover: themeColors.gray[700],
        // },
        // background: twColors.white,
        muted: {
          DEFAULT: themeColors.gray[400],
        },
        border: themeColors.gray[200],
        pre: themeColors.gray[600],
        input: { DEFAULT: themeColors.gray[100], hover: themeColors.gray[50] },
        // primary: {
        //   DEFAULT: themeColors.green[500],
        //   hover: themeColors.green[400],
        //   foreground: twColors.white,
        // },
        danger: {
          DEFAULT: twColors.red[500],
          hover: twColors.red[400],
          foreground: twColors.white,
        },
        success: {
          DEFAULT: themeColors.green[500],
          hover: themeColors.green[400],
          foreground: twColors.white,
        },
        warning: {
          ...twColors.amber,
        },

        google: { DEFAULT: '#DB4437', foreground: twColors.white, hover: '#EA6155' },
        card: twColors.white,
        popover: { DEFAULT: twColors.white, foreground: themeColors.gray[800] },
        accent: { DEFAULT: themeColors.gray[100], foreground: themeColors.gray[800] },
        border: themeColors.gray[200],
      },
      maxWidth: {
        layout: '64rem',
        content: '48rem',
      },
    },
  },
  plugins: [
    themeSwapper({
      themes: [
        {
          name: 'base',
          selectors: [':root', '.theme-light'],
          theme: {
            colors: {
              foreground: {
                DEFAULT: themeColors.gray[800],
                hover: themeColors.gray[700],
              },
              background: twColors.white,
              muted: {
                DEFAULT: themeColors.gray[400],
              },
              primary: {
                DEFAULT: themeColors.green[500],
                hover: themeColors.green[400],
                foreground: twColors.white,
              },
              border: themeColors.gray[200],
              pre: themeColors.gray[600],
              input: { DEFAULT: themeColors.gray[100], hover: themeColors.gray[50] },
              card: twColors.white,
              muted: themeColors.gray[400],
              popover: { DEFAULT: twColors.white, foreground: themeColors.gray[800] },
              accent: { DEFAULT: themeColors.gray[100], foreground: themeColors.gray[800] },
              border: themeColors.gray[200],
            },
          },
        },
        {
          name: 'dark',
          selectors: ['[data-theme="dark"]', '.theme-dark'],

          theme: {
            colors: {
              foreground: {
                DEFAULT: themeColors.gray[200],
                hover: themeColors.gray[300],
              },
              background: themeColors.gray[800],
              muted: {
                DEFAULT: themeColors.gray[400],
              },
              primary: {
                DEFAULT: themeColors.green[600],
                hover: themeColors.green[500],
                foreground: twColors.white,
              },
              border: themeColors.gray[800],
              pre: themeColors.gray[600],
              input: { DEFAULT: themeColors.gray[700], hover: themeColors.gray[600] },

              popover: { DEFAULT: themeColors.gray[800], foreground: themeColors.gray[200] },
              accent: { DEFAULT: themeColors.gray[900], foreground: themeColors.gray[800] },
              border: themeColors.gray[800],
            },
          },
        },
        {
          name: 'green',
          selectors: ['[data-theme="green"]', '.theme-green'],
          theme: {
            colors: {
              foreground: {
                DEFAULT: themeColors.gray[800],
                hover: themeColors.gray[700],
              },
              background: twColors.white,
              muted: {
                DEFAULT: themeColors.gray[400],
              },

              border: themeColors.gray[200],
              input: { DEFAULT: themeColors.green[500], hover: themeColors.green[400] },

              card: twColors.white,
              popover: { DEFAULT: twColors.white, foreground: themeColors.gray[800] },
              accent: { DEFAULT: themeColors.gray[100], foreground: themeColors.gray[800] },
              border: themeColors.gray[200],
            },
          },
        },
        {
          name: 'pink',
          selectors: ['[data-theme="pink"]', '.theme-pink'],
          theme: {
            colors: {
              foreground: {
                DEFAULT: twColors.stone[900],
                hover: twColors.stone[800],
              },
              background: twColors.white,
              muted: {
                DEFAULT: twColors.stone[500],
              },
              primary: {
                DEFAULT: twColors.pink[500],
                hover: twColors.pink[400],
                foreground: twColors.white,
              },
              border: twColors.stone[200],
              input: { DEFAULT: twColors.pink[50], hover: twColors.pink[50] },

              card: twColors.white,
              popover: { DEFAULT: twColors.pink[50], foreground: twColors.stone[800] },
              accent: { DEFAULT: twColors.stone[100], foreground: twColors.stone[800] },
              border: twColors.stone[200],
            },
          },
        },
      ],
    }),
  ],
}
