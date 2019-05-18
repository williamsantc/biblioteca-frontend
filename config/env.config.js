// habilitar el acceso a la app por red
import ip from '../util/get-development-ip'

const production = {
  appName: 'Biblioteca Frontend', // Nombre de la aplicación html - title
  appBaseDir: '/biblioteca-front/', // Directorio de despliegue de la aplicación
  rootUrl: '../../../', // Url del servidor del api
  baseUrl: '../../../biblioteca-backend/', //Url del apí por default
}

const development = {
  ...production, // spread,
  rootUrl: `http://${ip}:8090/`,
  baseUrl: `http://${ip}:8090/biblioteca-backend/`
}

export default {
  development,
  production
}
