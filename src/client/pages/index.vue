<template>
    <v-img
      :src="header"
      alt="overlord - the starcraft build order tool"
      width="100%">
      <v-layout justify-center align-center>
        <v-flex xs12>
          <v-container v-if="$store.state.user.isAuthenticated">
            <v-flex my-3>
              <h1>welcome {{ $store.state.user.username }}!</h1>
            </v-flex>
            <v-layout row align-left>
              <v-flex xs12 sm3>
                <v-btn
                  large
                  outline
                  color="primary lighten-1"
                  router
                  to="/builds/create"
                  >
                  create a build
                </v-btn>
              </v-flex xs12 sm3>
              <v-flex>
                <v-btn
                  router
                  to="/builds"
                  large
                  outline
                  color="primary lighten-1"
                  >
                  find new builds
                </v-btn>
              </v-flex>
            </v-layout>
            <v-toolbar card>
              <v-toolbar-title>your builds</v-toolbar-title>
            </v-toolbar>
            <v-list>
              <v-list-tile v-if="$store.state.user.builds.length === 0">
                <v-list-tile-title>You haven't created a build yet! <nuxt-link to="/builds/create">Make now now</nuxt-link></v-list-tile-title>
              </v-list-tile>
              <v-list-tile
                v-for="(build, index) in $store.state.user.builds"
                :key="index">
                <v-list-tile-avatar>
                  <v-icon>more_horiz</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>
                  <nuxt-link class="routerlink" :to="url(build)">{{ build.name }}</nuxt-link>
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-container>
          <v-container fluid v-else align-center>
            <div class="text-xs-center pt-4">
              <v-flex>
                <h1 class="text-xs-center display-4 font-weight-black">overlord</h1>
                <h1 class="display-1">the starcraft build tracker, creator, and explorer.</h1>
              </v-flex>
              <v-flex>
                <v-btn
                  rounded
                  dark
                  color="purple lighten-1"
                  large
                  to="/users/auth/sign-up">Sign Up
                </v-btn>
                <v-btn
                  dark
                  color="grey darken-1"
                  large
                  to="/users/auth/sign-in">Sign In
                </v-btn>
              </v-flex>
            </div>
          </v-container>
        </v-flex>
      </v-layout>
    </v-img>
</template>
<script>
import header from '~/assets/img/header.jpg'

export default {
  data () {
    return {
      header
    }
  },
  fetch ({ store }) {
    return store.dispatch('fetchBuildsByUser')
  },
  methods: {
    url: function (build) {
      return `/builds/${build._id}`
    }
  }
}
</script>
