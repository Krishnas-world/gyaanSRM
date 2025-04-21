import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "wave": {
          "0%": { transform: "rotate(0deg)" },
          "15%": { transform: "rotate(15deg)" },
          "30%": { transform: "rotate(0deg)" },
          "45%": { transform: "rotate(-15deg)" },
          "60%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "wave": "wave 1.5s ease-in-out infinite",
      },
      colors:{
        customColor:{
          1:'#fbc670',
          2:'#ffe4ad',
          3:'#d0f0e4',
          4:'#418bf9',
          5:'#f56225',
          6:'#fef6e2',
          7:'#effffa',
          8:'#f3fffb',
          9:'#ffd48f'
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config