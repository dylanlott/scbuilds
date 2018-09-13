<template>
  <v-container fluid>
    <v-flex xs12 xl6>
      {{ $store.state.build.details }}
    </v-flex>
  </v-container>
</template>
<script>
export default {
  fetch ({ store, params }) {
    store.dispatch('build/getOneBuild', params.id)
  },
}
</script>
