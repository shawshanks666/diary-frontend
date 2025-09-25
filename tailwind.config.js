/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  purge:[    "./src/**/*.{js,jsx,ts,tsx}",
],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: { white: {
        DEFAULT: '#E0E0E0',
        50: '#F9F9F9',
        100: '#F5F5F5',
        200: '#EDEDED',
        300: '#E0E0E0', // Default
        400: '#C1C1C1',
        500: '#A2A2A2',
        600: '#838383',
        700: '#646464',
        800: '#464646',
        900: '#2C2C2C',
      },
      yellow: {
        DEFAULT: '#F3E5AB',
        50: '#FFFDEA',
        100: '#FEFAD1',
        200: '#FBF5A7',
        300: '#F7F091',
        400: '#F3E5AB', // Default
        500: '#F0D970',
        600: '#EAC949',
        700: '#D9A83F',
        800: '#B88735',
        900: '#98692C',
      },
      green: {
        DEFAULT: '#91C9A6',  // Darker version of #A8D5BA
        50: '#EAF5ED',       // Darker version of #F2FAF5
        100: '#CFEADC',      // Darker version of #E2F5EB
        200: '#A8D1BC',      // Darker version of #C5ECD7
        300: '#91C9A6',      // Darker version of #A8D5BA
        400: '#6DAE8A',      // Darker version of #82C1A1
        500: '#4A9370',      // Darker version of #5CAE87
        600: '#307556',      // Darker version of #3B9272
        700: '#225A47',      // Darker version of #28745A
        800: '#143F31',      // Darker version of #1B5641
        900: '#0A271E',      // Darker version of #0F3928
      }
      ,
      pink: {
        DEFAULT: '#D5A8C8',
        '50': '#F9E6F1',   // Lightest shade
        100: '#F3D0E0',  // Lighter had
        200: '#E9B8C6',  // Lighter had
        300: '#E3A1B0',  // Light had
        400: '#D58A99',  // Base olo
        500: '#C57384',  // Darker had
        600: '#B85B6D',  // Darker had
        700: '#A94456',
      },
      purple: {
        DEFAULT: '#D7A9E1',
        50: '#F6EAFB',
        100: '#EED4F6',
        200: '#DFABE9',
        300: '#D7A9E1', // Default
        400: '#BB7EC7',
        500: '#A252AE',
        600: '#863792',
        700: '#682978',
        800: '#4A1A5A',
        900: '#2D0D3D',
      },
      grey: {
        DEFAULT: '#2C2C2C',
        50: '#E6E6E6',
        100: '#CCCCCC',
        200: '#999999',
        300: '#666666',
        400: '#4D4D4D',
        500: '#333333',
        600: '#2C2C2C', // Default
        700: '#1A1A1A',
        800: '#121212',
        900: '#0A0A0A',
      },
    },
  },
  plugins: [],
  }}