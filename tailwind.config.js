/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Geist Pixel"', '"Geist Mono"', 'monospace'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['"Geist"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        g50: 'rgb(var(--g50) / <alpha-value>)',
        g100: 'rgb(var(--g100) / <alpha-value>)',
        g200: 'rgb(var(--g200) / <alpha-value>)',
        g300: 'rgb(var(--g300) / <alpha-value>)',
        g400: 'rgb(var(--g400) / <alpha-value>)',
        g500: 'rgb(var(--g500) / <alpha-value>)',
        g600: 'rgb(var(--g600) / <alpha-value>)',
        g700: 'rgb(var(--g700) / <alpha-value>)',
        g800: 'rgb(var(--g800) / <alpha-value>)',
        g900: 'rgb(var(--g900) / <alpha-value>)',
        g950: 'rgb(var(--g950) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
