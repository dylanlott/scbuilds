<template>
  <v-container fluid>
    <v-flex xs12 xl6>
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Builds</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn flat to="/builds/create" color="purple">Create A Build</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card :key="build._id" v-for="build in $store.state.lists.builds">
          <v-card-title class="font-weight-black">
            <v-icon color="purple lighten-1">play_arrow</v-icon>
            <h2><nuxt-link
                class="routerlink"
                :to="url(build)"
            >{{ build.name }}</nuxt-link></h2>
          </v-card-title>
        </v-card>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
export default {
  data () {
    return {}
  },
  fetch ({ store }) {
    return store.dispatch('fetchAllBuilds')
  },
  methods: {
    url: function (build) {
      return `/builds/${build._id}`
    }
  }
}
</script>
<style lang="stylus">
  .routerlink
    color: #fff
    font-size: 20px
    text-decoration: none
</style>
