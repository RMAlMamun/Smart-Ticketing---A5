/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extends: {},
    },
    plugins: [
      require("daisyui"),
      // Other plugins...
    ],
  };