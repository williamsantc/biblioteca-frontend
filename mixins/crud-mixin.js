import Vue from 'vue'

export const crudMixin = (PAYLOAD, customShowModal = () => {}, customSendModificar = () => {}) => ({
  data: () => ({
    crudSettings: {
      showModal: false,
      msgBtn: 'Registrar',
      toogleFilter: false
    }
  }),
  watch: {
    'crudSettings.showModal': function (newValue) {
      if (newValue) {
        return
      }
      Vue.nextTick(() => {
        this.payload = JSON.parse(JSON.stringify(PAYLOAD))
        this.crudSettings.msgBtn = 'Registrar'
        this.customShowModal()
      })
    }
  },
  methods: {
    customShowModal,
    customSendModificar,
    sendModificar: function (payload) {
      this.payload.form = JSON.parse(JSON.stringify(payload))
      this.crudSettings.msgBtn = 'Guardar Cambios'
      this.crudSettings.showModal = !this.crudSettings.showModal
      this.customSendModificar()
    }
  }
})

export default crudMixin
