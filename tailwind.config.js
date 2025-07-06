/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#7c4dff', // Vibrant purple for buttons and interactive elements
        secondary: '#4F527D', // Kept for secondary elements if needed
        accent: '#FF00FF', // Magenta for special highlights
        background: '#1a1a2e', // Deep dark purple
        text: '#F0F0F0', // Soft white/light gray
        textSecondary: '#A9A9A9',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
};
