import { createRequire } from "module";

const require = createRequire(import.meta.url);

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",
        secondary: "#F59E0B",
        black: "#0D0D0E",
        "body-text": "#9E9E9E",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), linear-gradient(94deg, #66F9E6 7.78%, #305BC9 100%)",
      },
      boxShadow: {
        glow: "0 0 25px rgba(59,130,246,0.5)",
      },
    },
  },
  plugins: [],
};