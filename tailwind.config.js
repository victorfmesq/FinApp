import { theme } from './src/themes/index';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class', // Ativa o dark mode usando a classe `dark`
  theme: {
    extend: {
      colors: {
        light: theme.light,
        dark: theme.dark,
        finance: theme.finance,
      },
    },
  },
  plugins: [],
};
