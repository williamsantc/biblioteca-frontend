import Vue from 'vue'
import axios from 'axios'

// interceptores de peticiones

export default function ({
  store,
  app
}) {

  const httpInstance = axios.create({
    baseURL: process.env.rootUrl,
    rootURL: process.env.baseUrl,
  })

  httpInstance.interceptors.request.use(config => {
      config.headers.Authorization = store.state.accessToken
      return config
    },
    err => {
      return Promise.reject(err)
    })

  httpInstance.interceptors.response.use(null, async error => {
    const code = parseInt(error.response && error.response.status)

    if (code === 403 && httpInstance.history.current.name !== 'login') {
      store.dispatch('cerrarSesion')
      app.router.push('/login')

      Vue.toast.error('No se detectaron las credenciales', 'Inicie sesión')
    } else if (code === 401) {

      await store.dispatch('refreshToken')
      error.config.headers['Authorization'] = store.state.accessToken
      return httpInstance.request(error.config)
    }

    return Promise.reject(error)

  })

  Vue.http = httpInstance
  Vue.prototype.$http = httpInstance

}
