/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          150: '#ffda44',
        },
      },
      zIndex: {
        999: '999',
        9999: '9999',
      },
      spacing: {
        18: '4.5rem',
      },
      height: {
        '11/12': '91.666667%;',
      },
      transitionProperty: {
        left: 'left',
        right: 'right',
        top: 'top',
        bottom: 'bottom',
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        '4xl': '0 40px 100px -30px rgba(0, 0, 0, 0.3)',
        card: '0 2px 12px 0 rgba(0, 0, 0, .1)',
      },
    },
  },
  plugins: [],
}

