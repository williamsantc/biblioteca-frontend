<template>
  <div v-if="totalRows > 0" class="d-flex justify-content-end align-items-center flex-column flex-md-row">
    <b-pagination
      :total-rows="totalRows"
      v-model="auxCurrentPage"
      class="mx-1 mb-0 danger"
      :per-page="perPage"
    ></b-pagination>
    <div class="mx-2 text-center my-3 my-md-0">
      <b>{{currentRowsShowing()}}</b>
    </div>
    <div class="mx-1">
      <b-form inline class="d-flex justify-content-center">
        <label for="selectorPages" class="mr-2">Filas Por Página:</label>
        <b-select id="selectorPages" :options="listPerPage" v-model="auxPerPage"></b-select>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    value: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    listPerPage: {
      type: Array,
      required: true
    },
    totalRows: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {
      auxCurrentPage: null,
      auxPerPage: null
    }
  },
  watch: {
    auxPerPage: function (newValue) {
      this.auxCurrentPage = 1
      this.$emit('per-page-chaged', newValue)
    },
    auxCurrentPage: function (newValue) {
      this.$emit('input', newValue)
    }
  },
  methods: {
    currentRowsShowing: function () {
      let lastRowShowing = this.value * this.perPage
      let firstRowShowing = lastRowShowing - this.perPage + 1
      lastRowShowing = lastRowShowing < this.totalRows ? lastRowShowing : this.totalRows
      return firstRowShowing + ' - ' + lastRowShowing + ' de ' + this.totalRows
    }
  },
  created: function () {
    this.auxCurrentPage = this.value
    this.auxPerPage = this.perPage
  }
}
</script>

<style scoped>
</style>
