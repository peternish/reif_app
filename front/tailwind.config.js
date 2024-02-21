const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'header': '#41BA6E',
        'primary': '#4bca78'
      }
    },
  },
  plugins: [],
});


