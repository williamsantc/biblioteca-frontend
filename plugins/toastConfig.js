import Vue from 'vue'
import 'vue-toastr-2/src/jquery.min.js'
import toastr from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'

import {
  isEmptyString
} from '../util/string-utils'
toastr.options = {
  preventDuplicates: true,
  progressBar: true
}

Vue.toast = {}
Vue.toast.warning = (
  message = '',
  title = 'Alerta',
  optionsOverride = {}
) => {
  toastr.warning(message, title, optionsOverride)
}
Vue.toast.success = (
  message = '',
  title = 'Éxito',
  optionsOverride = {}
) => {
  if (isEmptyString(message)) {
    console.error('Dev-alert: mensaje de toast vacío.')
    return
  }
  toastr.success(message, title, optionsOverride)
}
Vue.toast.error = (
  message = '',
  title = 'Error',
  optionsOverride = {}
) => {
  if (isEmptyString(message)) {
    console.error('Dev-alert: mensaje de toast vacío.')
    return
  }
  toastr.error(message, title, optionsOverride)
}
Vue.toast.info = (
  message = '',
  title = 'Información',
  optionsOverride = {}
) => {
  if (isEmptyString(message)) {
    console.error('Dev-alert: mensaje de toast vacío.')
    return
  }
  toastr.info(message, title, optionsOverride)
}
Vue.toast.remove = () => {
  toastr.remove()
}
Vue.toast.clear = () => {
  toastr.clear()
}

Vue.prototype.$toast = Vue.toast
