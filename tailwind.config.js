/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
          "light-peach" : "#60a5fa",
          "dark-peach" : "#2563eb",
          "light-blue": "#bfdbfe",
          "dark-green-s": "#14532d",
          "text-dark-yellow": "#fbbf24",
          "text-dark-pink": "#dc2626",
          "dark-blue-n": "#1976d2",
          "light-blue-s" : "#60a5fa",

          "dark-gray-7" : "#be7f89",
          "dark-layer-1": "rgb(40,40,40)",
          "dark-layer-2": "rgb(26,26,26)",
          "dark-label-2": "rgba(239, 241, 246, 0.75)",
          "dark-divider-border-2": "rgb(61, 61, 61)",
          "dark-fill-2": "hsla(0,0%,100%,.14)",
          "dark-fill-3": "hsla(0,0%,100%,.1)",
          "dark-gray-6": "rgb(138, 138, 138)",
          "dark-gray-7": "rgb(179, 179, 179)",
          "gray-8": "rgb(38, 38, 38)",
          "dark-gray-8": "rgb(219, 219, 219)",
          "dark-yellow": "rgb(255 192 30)",
          "dark-pink": "rgb(255 55 95)",
          "olive": "rgb(0, 184, 163)",
          "dark-green-s": "rgb(44 187 93)",
          "dark-blue-s": "rgb(10 132 255)",

      },
      
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'focus-within'],
  },
  plugins: [],
}