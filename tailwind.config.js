/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",      // Next.js App Directory
    "./Components/**/*.{js,ts,jsx,tsx}", // Your custom Components
    "./pages/**/*.{js,ts,jsx,tsx}",      // Pages Directory (if using)
  ],
  theme: {
    extend: {
      screens: {
        xs: { max: "400px" }, // Custom small breakpoint
      },
      colors: {
        "custom-blue": "#00002E",
        "custom-pink": "#A494F3",
        "custom-green": "#09282A",
        "custom-lightGreen": "#0FB190",
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondary: {
          50: "#f9fafb",
          75: "#f2f4f7",
          200: "#e5e7eb",
          300: "#333333",
          400: "#0e0e0e",
        },
        accent: {
          400: "#eaeaea",
          500: "#f59e0b",
        },
      },
      spacing: {
        "space-lg": "32px",
        "space-md": "24px",
        "space-sm": "16px",
        "space-xs": "12px",
        "space-2xs": "8px",
        "space-3xs": "4px",
        fluid: "2rem",
      },
      fontSize: {
        "super-large": "20rem",
        "base-large": ["18px", { lineHeight: "28px" }],
        "heading-2": ["32px", { lineHeight: "40px", fontWeight: "600" }],
        "heading-4": ["20px", { lineHeight: "28px", fontWeight: "500" }],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
