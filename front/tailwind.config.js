const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'header': '#41BA6E',
        'primary': '#4bca78',
        'secondary': '#1a1462',
        'tertiary': '#ed1c24'
      },
      width: {
        'container': '70%',
      },
      screens: {
        'sm': '500px',
        "md": '1200px',
        'lg': '1500px'
      },
    },
  },
  plugins: [],
});


