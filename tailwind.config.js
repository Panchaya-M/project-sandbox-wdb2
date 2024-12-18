/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      container: {
        padding: "16px",
        screens: {
          // sm: "1500px",
          // md: "1500px",
          lg: "1192px",
          xl: "1600px",
        },
      },
      containerNoPadding: {
        screens: {
          lg: "1192px",
          xl: "1600px",
        },
      },
      colors: {
        limeGreen: {
          50: "#FBFFE7",
          100: "#F6FCC3",
          300: "#E5F96E",
          400: "#DFF547",
          700: "#DEF81C",
          900: "#C1CD00",
          DEFAULT: "#DEF81C",
        },
        black: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          300: "#E1E1E1",
          500: "#9F9F9F",
          700: "#626262",
          900: "#222222",
          DEFAULT: "#222222",
        },
        white: "#FFFF",
        success: "#13CE66",
        info: "#3366FF",
        warning: "#FFB020",
        danger: "#FF000D",
      },
      fontSize: {
        h1Bold: [
          "96px",
          {
            fontWeight: 700,
            lineHeight: "116px",
          },
        ],
        h2Bold: [
          "64px",
          {
            fontWeight: 700,
            lineHeight: "92px",
          },
        ],
        h3Bold: [
          "48px",
          {
            fontWeight: 700,
            lineHeight: "72px",
          },
        ],
        h4Bold: [
          "40px",
          {
            fontWeight: 700,
            lineHeight: "60px",
          },
        ],
        h5Bold: [
          "32px",
          {
            fontWeight: 700,
            lineHeight: "48px",
          },
        ],
        h6Bold: [
          "24px",
          {
            fontWeight: 700,
            lineHeight: "32px",
          },
        ],
        subHeading: [
          "18px",
          {
            fontWeight: 600,
            lineHeight: "24px",
          },
        ],
        bodyText: [
          "16px",
          {
            fontWeight: 400,
            lineHeight: "20px",
          },
        ],
        subTitle: [
          "14px",
          {
            fontWeight: 400,
            lineHeight: "20px",
          },
        ],
        caption: [
          "12px",
          {
            fontWeight: 400,
            lineHeight: "16px",
          },
        ],
      },
      screens: {
        sx: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1440px",
        "3xl": "1920px",
        "4xl": "2560px",
      },
    },
  },
  plugins: [],
};
