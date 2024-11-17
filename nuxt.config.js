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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'
      }
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
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv',
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
     baseURL: 'https://perkasa.miauwlan.com/api/'
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
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/profile', method: 'get' }
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
    middleware: ['admin'],
    extendRoutes(routes, resolve) {
      routes.forEach(route => {
        if (route.path.startsWith('/admin')) {
          route.middleware = ['admin']
        }
      })
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
