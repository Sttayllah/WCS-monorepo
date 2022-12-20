/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        yeahbuddy: '#cc987a',
        ronniecolman: '#111211',
        lightweight: '#f8f8f8',
        mediumweight: '#bababa',
      },
      width: {
        '1/2': '50%',
        '1/3': '33.33333%',
        '1/4': '25%',
        '1/5': '20%',
        '1/6': '16.666667%',
        '1/7': '14.28%',
        '1/8': '12.5%',
        '1/9': '11.111%',
        '1/10': '10%',
        '1/11': '9.0909%',
      },
      boxShadow: {
        sectionHomePage: 'inset 0px 0px 10px 2px black',
      },
      zIndex: {
        behind: '-1',
      },
      minHeight: {
        10: '2.5rem',
      },
    },
  },
  plugins: [],
};
