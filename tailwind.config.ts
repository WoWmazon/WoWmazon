import type { Config } from "tailwindcss";
import { COLORS } from "./src/css/color";
import { FONT_SIZE } from "./src/css/fonts";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...COLORS,
      },
      fontFamily: {
        pretendard: ["Pretendard"],
      },
      fontSize: {
        ...FONT_SIZE,
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        slideUp: "slideUp .5s ease-out",
        slideDown: "slideDown .5s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
