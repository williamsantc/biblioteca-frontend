import Vue from 'vue'

export const GET_TOKEN = 'GET_TOKEN'
export const REFRESH_TOKEN = 'REFRESH_TOKEN'
export const CLEAR_TOKEN = 'CLEAR_TOKEN'

export const state = () => {
  return {
    accessToken: ''
  }
}

export const mutations = {
  [GET_TOKEN]: function (state, data) {
    state.accessToken = 'Bearer ' + data.accessToken
    state.dataUsuario = data.dataUsuario
  },
  [CLEAR_TOKEN]: function (state) {
    Object.assign(state, state())
  },
  [REFRESH_TOKEN]: function (state, token) {
    state.accessToken = 'Bearer ' + token
  }
}

export const actions = {
  login: async function (context, payload) {
    try {
      const resp = await this.$axios.post('API', payload)
      context.commit('GET_TOKEN', resp.data)
    } catch (error) {
      Vue.toast.error(error.response.data, 'Error de credenciales')
    }
  },
  cerrarSesion: function (context) {
    context.commit('CLEAR_TOKEN')
  },
  refreshToken: async function (context) {
    try {
      const resp = await this.$axios.post('API', {
        accessToken: context.state.accessToken
        //something else
      })
      if (resp.data.accessToken) {
        context.commit('REFRESH_TOKEN', resp.data.accessToken)
      }
    } catch (error) {
      console.log(error.response)
    }

  }
}

export const getters = {
  accessToken: state => state.accessToken
}
