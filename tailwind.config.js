/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blueBG: "#011F62",
        lighterBlue: "#207ACA",
        lightBlue: "#052D73",
        linkColor: "#16A34A",
        lightGray: "#F0F0F0",
        lightYellow: "#FFF9C4",
        buttonText: "#011F62",
      },
      backgroundImage: {
        webBG: 'url("/src/assets/background.svg")',
        sidebarGradient:
          "linear-gradient(110deg, #104A97 0%, #052D73 50%, #011F62 100%)",
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      const newUtilities = {
        ".scrollbar-hide": {
          "scrollbar-width": "none" /* For Firefox */,
          "-ms-overflow-style": "none" /* For Internet Explorer and Edge */,
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none" /* For Chrome, Safari, and Opera */,
        },
        ".scrollbar-thin": {
          "scrollbar-width": "thin" /* For Firefox */,
        },
        ".taka-scrollbar": {
          "scrollbar-width": "thin",
          "scrollbar-color": "#23311ade transparent",
        },
        ".taka-scrollbar::-webkit-scrollbar": {
          width: "8px",
        },
        ".taka-scrollbar::-webkit-scrollbar-track": {
          background: "transparent",
        },
        ".taka-scrollbar::-webkit-scrollbar-thumb": {
          "background-color": "#23311ade",
          "border-radius": "10px",
          border: "3px solid transparent",
          "background-clip": "padding-box",
        },
        ".taka-scrollbar::-webkit-scrollbar-button": {
          display: "none",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
