/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        benext: {
          navy: '#223361',
          orange: '#f9b049',
          blue: '#4092cf',
          gray: '#cbdaeb'
        }
      },
      fontFamily: {
        modak: ['Modak', 'cursive'],
      },
    },
  },
  plugins: [],
};