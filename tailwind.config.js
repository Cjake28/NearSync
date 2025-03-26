/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#10B981",   // Emerald Green
        secondary: "#3B82F6", // Sky Blue
        accent: "#F59E0B",    // Amber
        text: "#1E293B",      // Slate Gray
        background: "#F5F5F5" // Light Gray
      },
    },
  },
  plugins: [],
}