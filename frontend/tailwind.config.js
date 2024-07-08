/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'skeleton-pulse': 'skeleton-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'skeleton-pulse': {
          '0%': { transform: 'translate(-100%, -10%) rotate(-3deg)' },
          '50%': { transform: 'translate(100%, 10%) rotate(3deg)' },
          '100%': { transform: 'translate(-100%, -10%) rotate(-3deg)' },
        },
      },
    },
  },
}