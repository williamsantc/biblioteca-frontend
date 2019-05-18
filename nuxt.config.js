import pkg from  './package'
import environmentConfig from './config/env.config.js'

let envConfig = environmentConfig[process.env.NODE_ENV]
console.log(envConfig)
// console.log(process.env)

export default {
  mode: 'spa',
  env: envConfig,

  /*
   ** Headers of the page
   */
  head: {
    title: envConfig.appName,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '~/node_modules/font-awesome/css/font-awesome.min.css',
    '~/node_modules/simple-line-icons/css/simple-line-icons.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/axios.js', ssr: false },
    { src: '~/plugins/installer.js', ssr: false },
    { src: '~/plugins/toastConfig.js', ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa'
  ],
  manifest: {
    name: 'Bilbioteca Frontend',
    short_name: 'Biblioteca Frontend',
    lang: 'es',
    theme_color: '#e8e8e8'
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    babel: {
      plugins: [
        // instalar babel-plugin-wildcard para usar el import * as n from ./ruta
        /* ["wildcard", {
          "exts": ["js", "es6", "es", "jsx", "javascript", "vue"]
        }] */
      ]
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  },
  router: {
    // es opcional
    base: envConfig.appBaseDir
  }
}
