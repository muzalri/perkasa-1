export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'PERKASA',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS
  css: [
    '@/assets/css/tailwind.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Build modules
  buildModules: [
    ['@nuxtjs/tailwindcss', {
      configPath: '~/tailwind.config.js',
      cssPath: '~/assets/css/tailwind.css',
      exposeConfig: false
    }]
  ],

  // Axios configuration
  axios: {
    baseURL: 'http://localhost:8000'
  },

  // Auth configuration
  auth: {
    strategies: {
      local: {
        token: {
          property: 'data.token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'data.user',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/api/login', method: 'post' },
          logout: { url: '/api/logout', method: 'post' },
          user: { url: '/api/profile', method: 'get' }
        }
      }
    },
    redirect: {
      login: '/authentikasi/login',
      logout: '/authentikasi/login',
      home: '/dashboard',
      callback: '/authentikasi/login'
    },
    vuex: {
      namespace: 'auth'
    }
  },

  // Router configuration
  router: {
    middleware: [],
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/',
        redirect: '/authentikasi/login'
      })
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
