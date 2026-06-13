/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F6F1E8",
        parchment: "#EDE6D8",
        ink: "#14110F",
        charcoal: "#2A2420",
        gold: "#B8952E",
        goldlight: "#D4B85A",
        earth: "#5C4A3A",
        mist: "#9A8F82",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        gujarati: ['"Noto Sans Gujarati"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.18em",
        wide: "0.32em",
      },
      animation: {
        "fade-up": "fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
