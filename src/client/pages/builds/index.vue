<template>
  <v-container fluid>
    <v-flex xs12 xl6>
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Builds</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn outline to="/builds/create" color="purple">Create A Build</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-list>
            <template 
              v-for="(item, index) in $store.state.lists.bands">
              <v-list-tile>{{ item }}</v-list-tile>
            </template>
          </v-list>
        </v-card-text>
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
  }
}
</script>
