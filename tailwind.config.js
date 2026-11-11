/* eslint-disable import/no-extraneous-dependencies, global-require */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}',
    './node_modules/astro-boilerplate-components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Storm front palette: deep navy surfaces, one lightning accent.
        storm: {
          950: '#0b1220',
          900: '#131d33',
          800: '#1a2540',
          700: '#2a3759',
        },
        ink: '#e8eefc',
        mist: '#8a97b4',
        bolt: '#ffd84a',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
};
