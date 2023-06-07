const withMT = require("@material-tailwind/react/utils/withMT");
const fontFamily = {
  sans: ["Roboto", "sans-serif"],
  serif: ["Roboto Slab", "serif"],
  body: ["Roboto", "sans-serif"],
};

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    darkMode: 'media',
    extend: {},
    fontFamily,
  },
  plugins: [],
});