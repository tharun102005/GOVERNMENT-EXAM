module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#10B981",
        accent: "#F59E0B",
        background: "#F8FAFC",
        card: "#FFFFFF",
      },
      borderRadius: {
        lg: "20px",
      },
    },
  },
  plugins: [],
};
