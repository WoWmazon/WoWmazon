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
    },
  },
  plugins: [],
};

export default config;
