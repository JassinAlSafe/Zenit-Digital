module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // For Next.js App Directory
    "./components/**/*.{js,ts,jsx,tsx}", // For Components Directory
    "./pages/**/*.{js,ts,jsx,tsx}", // If you're using Pages Directory
  ],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#061B29",
        "custom-pink": "#82A4FF",
        "custom-green": "#061B29",
        "custom-lightGreen": "#82A4FF",
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondary: {
          50: "#f9fafb",
          75: "#f2f4f7",
          200: "#e5e7eb",
          300: "#333333", // Dark gray line
          400: "#0e0e0e", // Nearly black background
        },
        accent: {
          400: "#eaeaea", // Off-white text
          500: "#f59e0b",
        },
      },
      fontSize: {
        "super-large": "20rem",
        "base-large": ["18px", { lineHeight: "28px" }],
        "heading-2": ["32px", { lineHeight: "40px", fontWeight: "600" }],
        "heading-4": ["20px", { lineHeight: "28px", fontWeight: "500" }],
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
      fontFamily: {
        mono: ['"Fira Code"', "monospace"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
