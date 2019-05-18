<template>
  <div class="app flex-row align-items-center">
    <div class="container d-flex justify-content-center">
      <h4>Proyecto Base Vue JS + Nuxt</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "Inicio",
  mounted: async function() {
    try {
      const resp = await this.$http.get(
        "https://pokeapi.co/api/v2/pokemon/ditto/"
      )
      console.log(resp.data)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
