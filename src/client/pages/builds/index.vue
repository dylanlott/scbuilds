<template>
  <v-container fluid>
    <v-layout justify-center align-center>
      <v-flex xs12 xl6>
        <v-card>
          <v-toolbar>
            <v-toolbar-title><h1>New Builds</h1></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn flat to="/builds/create" color="purple">Create A Build</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card>
            <v-card-title><v-icon>sort</v-icon><h3>Filter</h3></v-card-title>
            <v-btn outline color="primary lighten-1" @click="clear()">clear filter</v-btn>
              <v-layout row wrap justify-center>
                <v-flex mx-2>
                <v-select
                  :items="races"
                  label="player race"
                  v-model="filter.player"
                  v-on:change="updateBuilds()"
                  ></v-select>
              </v-flex>
              <v-flex mx-2>
                <v-select
                  :items="races"
                  label="opponent race"
                  v-model="filter.opponent"
                  v-on:change="updateBuilds()"
                  ></v-select>
              </v-flex>
              <v-flex mx-2>
                <v-select
                  :items="buildTypes"
                  label="build type"
                  v-model="filter.type"
                  v-on:change="updateBuilds()"
                ></v-select>
              </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
          <v-card :key="index" v-for="(build, index) in $store.state.lists.builds">
            <v-card-title class="font-weight-black">
              <h2><nuxt-link
                  class="routerlink"
                  :to="url(build)"
              >{{ build.name }}</nuxt-link></h2>
            </v-card-title>
          </v-card>
          <v-card v-if="$store.state.lists.builds.length < 1">
            <v-card-title>
              <h2>No builds match your filtering criteria. Try widening your filter.</h2>
            </v-card-title>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import BuildList from '../../components/builds/BuildList.vue'

export default {
  data () {
    return {
      races: [
        { text: 'zerg', value: 'zerg'},
        { text: 'protoss', value: 'protoss'},
        { text: 'terran', value: 'terran'},
        { text: 'any', value: 'any'}
      ],
      buildTypes: [
        'economy',
        'rush',
        'all-in',
        'max-out',
        'aggressive',
        'fast-expand',
        'general',
        'timing'
      ],
      filter: {
        player: '',
        opponent: '',
        type: '',
      }
    }
  },
  fetch ({ store }) {
    return store.dispatch('fetchAllBuilds')
  },
  methods: {
    url: function (build) {
      return `/builds/${build._id}`
    },
    updateBuilds: function () {
      console.log('gettings builds with filter', this.filter)
      this.$store.dispatch('fetchAllBuilds', this.filter)
    },
    clear: function () {
      this.filter = {}
    }
  },
  components: {
    BuildList
  }
}
</script>
<style lang="stylus">
  .routerlink
    color: #fff
    font-size: 20px
    text-decoration: none
</style>
