module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
  

      colors: {
        'perkasa': {
          blue: '#34BCC2',
        },
        'dark-green': '#0A585B',
        'background': '#F5F7FA',
      },
    },
  },
  plugins: [],
} 