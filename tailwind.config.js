/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accentColor: "#4B40EE",
        darkGrayColor: "#1A243A",
        grayColor: "#6F7177",
        lightGrayColor: "#BDBEBF",
        veryLightGrayColor: "#EFF1F3",
      },
    },
  },
  plugins: [],
};
