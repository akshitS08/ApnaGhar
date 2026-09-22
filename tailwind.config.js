/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik-Regular", "sans-serif"],
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#BFE8D7",
          200: "#22B27E",
          300: "#009B6A", // 👑 Royal Emerald
        },

        accent: {
          100: "#F1EDE2", // Soft cream
        },

        black: {
          DEFAULT: "#000000",
          100: "#8C8E86", // Muted text
          200: "#666861", // Secondary text
          300: "#1B1B1D", // Main dark text
        },

        danger: "#F75555",

        gold: {
          100: "#F4E7C1", // Light gold
          200: "#DFC47A", // Soft gold
          300: "#C9A24B", // Main gold
        },
      },
    },
  },
  plugins: [],
};
