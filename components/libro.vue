<template>
  <div>
    <h2>{{ tituloFuncionalidad }}</h2>
    <hr>
    <div class="d-flex justify-content-end">
      <b-btn variant="primary" @click="crudSettings.showModal = !crudSettings.showModal">
        <i class="fa fa-plus" aria-hidden="true" /> Nuevo
      </b-btn>
    </div>
    <div class="mt-3">
      <b-alert show variant="primary" v-if="listaLibros.length <= 0">No hay registros</b-alert>
      <b-table
        responsive
        striped
        v-else
        :fields="fields"
        stacked="md"
        :per-page="perPage"
        :current-page="currentPage"
        :items="listaLibros"
      >
        <template slot="acciones" slot-scope="data">
          <b-btn variant="danger" size="sm" @click="eliminar(data.item.librId)" title="Eliminar">
            <i class="fa fa-trash" aria-hidden="true" />
          </b-btn>
        </template>
      </b-table>
      <pagination
        :total-rows="listaLibros.length"
        v-model="currentPage"
        :per-page="perPage"
        :list-per-page="listPerPage"
        @per-page-chaged="perPage = $event"
      />
    </div>
    <b-modal v-model="crudSettings.showModal" :title="tituloFuncionalidad">
      <b-form-group label="ISBN">
        <b-input
          placeholder="ISBN del libro"
          ref="librIsbn"
          @keydown.native="validarCantidadCaracteres($event, payload.form.librIsbn, 50)"
          v-model="payload.form.librIsbn"
        />
      </b-form-group>
      <b-form-group label="Nombre">
        <b-input
          v-model="payload.form.librNombre"
          placeholder="Nombre del libro"
          ref="librNombre"
          @keydown.native="validarCantidadCaracteres($event, payload.form.librNombre, 50)"
        />
      </b-form-group>
      <div slot="modal-footer">
        <b-btn class="float-right" variant="primary" @click="gestionar">{{ crudSettings.msgBtn }}</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { tableMixin } from '@/mixins/table-mixin'
import { crudMixin } from '@/mixins/crud-mixin'
import validarForm from '@/mixins/validarForm'
import Pagination from '@/components/pagination'
/* import _ from 'lodash' */

const FIELDS_LIBRO = [
  { key: 'librIsbn', label: 'ISBN' },
  { key: 'librNombre', label: 'Nombre' },
  { key: 'librCantejemplares', label: 'Ejemplares' },
  { key: 'acciones', label: 'Accciones' }
]

const PAYLOAD = {
  form: {
    librId: '',
    librIsbn: '',
    librNombre: '',
    librCantejemplares: ''
  },
  config: {
    librIsbn: {
      type: 'String',
      required: true,
      limite: 50,
      msg: 'Código ISBN del Libro'
    },
    librNombre: {
      type: 'String',
      limite: 50,
      required: true,
      msg: 'Nombre del Libro'
    }
  }
}

export default {
  name: 'Libro',
  components: {
    Pagination
  },
  mixins: [tableMixin, validarForm, crudMixin(PAYLOAD)],
  data: () => ({
    listaLibros: [],
    fields: FIELDS_LIBRO,
    tituloFuncionalidad: 'Gestionar Libros',
    payload: JSON.parse(JSON.stringify(PAYLOAD)),
    nombreSearch: ''
  }),
  created: function() {
    this.getLibrosWs()
  },
  methods: {
    getLibrosWs: async function() {
      try {
        this.listaLibros = (await this.$http.get('/api/libro/list')).data
      } catch (error) {
        this.$toast(error.response.data)
        this.listaLibros = []
      }
    },
    gestionar: async function() {
      if (!this.validarCampos(this.payload)) {
        return
      }

      try {
        let resp = (await this.$http.post(
          '/api/libro/register',
          this.payload.form
        )).data
        this.$toast.success(resp.message)
        await this.getLibrosWs()
        this.crudSettings.showModal = !this.crudSettings.showModal
      } catch (error) {
        this.$toast.error(error.response.data.error)
      }
    },
    eliminar: async function(librId) {
      const answer = await this.$bvModal.msgBoxConfirm(
          "¿Desea eliminar el libro?",
          {
            title: "Eliminar libro",
            size: "sm",
            buttonSize: "sm",
            okVariant: "primary",
            okTitle: "SI",
            cancelTitle: "NO",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true
          }
        )

        if(!answer) {
          return
        }

      try {
        let resp = (await this.$http.post('/api/libro/del', {
          librId: librId
        })).data
        this.$toast.success(resp.message)
      } catch (error) {
        this.$toast.error(error.response.data.error)
      }

      await this.getLibrosWs()
    }
  }
}
</script>

<style scoped>
</style>
