<template>
  <v-container fluid>
    <v-flex xs12 xl6>
      {{ $store.state.build.details }}
    </v-flex>
  </v-container>
</template>
<script>
import { Route } from 'vue-router'

export default {
  data () {
    return {
      build: {}
    }
  },
  fetch ({ store, params }) {
    store.dispatch('build/getOneBuild', params.id)
  },
}
</script>
