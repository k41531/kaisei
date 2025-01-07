import type { Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial":
          "linear-gradient(131deg, rgba(255, 255, 255, 0.10) 0%, rgba(228, 228, 228, 0.00) 100%)",
      },
      backdropFilter: {
        blur: "blur(12px)",
      },
      colors: {
        primary: "#252525",
      },
    },
  },
} satisfies Config;