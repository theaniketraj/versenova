const { COLOR_THEMES } = require('./themes');

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: Object.keys(COLOR_THEMES).map(theme => `theme-${theme}`),
  darkMode: 'class',
  presets: [require('./utils/tailwind-preset')],
};
