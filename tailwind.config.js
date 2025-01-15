/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false, // Disable preflight if Ant Design is conflicting.
  },
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}", // Ensure no spaces after commas.
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
