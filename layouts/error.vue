<template>
  <div class="flex-row align-items-center mt-4 mt-md-5 pt-0 pt-md-5 mb-5 pb-3">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <div class="clearfix" style="text-align: center;">
            <h1 class="display-4 display-sm-3 font-weight-bold">¡Ups!</h1>
            <h4 class="pt-3">Error {{ error.statusCode }}</h4>
            <p class="text-muted">{{ message }}</p>
            <b-link to="/">Volver al inicio</b-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuxtError',
  layout: 'clean',
  props: {
    error: {
      type: Object,
      default: () => {},
    }
  },
  computed: {
    message () {
      switch (this.error.statusCode) {
        case 400: return 'Hubo un error en tu petición'
        case 401: return 'Acceso restringido'
        case 403: return 'Acceso denegado'
        case 404: return 'No encontramos el recurso que solicitas'
      }
      return 'Ocurrió un error en el servidor'
    }
  }
}
</script>