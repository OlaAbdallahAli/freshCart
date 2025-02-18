const flowbite = "flowbite-react/tailwind";
/** @type {import ("tailwindcss").Config}*/
export default {
  content: [flowbite.content()],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#0aad0a",
      },
      container: {
        center: true,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
};
