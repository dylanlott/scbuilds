<template>
  <v-app dark id="inspire">
    <v-navigation-drawer
      fixed
      dark
      enable-resize-watcher
      disable-route-watcher
      persistent
      v-model="drawer"
      v-if="$store.state.user.isAuthenticated"
      app>
      <v-list class="main-list">
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ $store.state.user.email }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list dense>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/builds">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Builds</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark app fixed>
      <v-toolbar-side-icon dark color="purple lighten-1" v-if="$store.state.user.isAuthenticated" light @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{name}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom left>
        <v-btn icon="icon" slot="activator" light>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile ripple router to="/users/auth/sign-in" v-if="!$store.state.user.isAuthenticated">
            <v-list-tile-title>Sign In</v-list-tile-title>
          </v-list-tile>
          <v-list-tile ripple router to="/users/auth/sign-up" v-if="!$store.state.user.isAuthenticated">
            <v-list-tile-title>Sign Up</v-list-tile-title>
          </v-list-tile>
          <v-list-tile ripple router to="/users/auth/sign-out" v-if="$store.state.user.isAuthenticated">
            <v-list-tile-title>Sign Out</v-list-tile-title>
          </v-list-tile>
          <v-list-tile ripple router to="/users">
            <v-list-tile-title>Users</v-list-tile-title>
          </v-list-tile>
          <v-list-tile ripple router to="/admin" v-if="$store.state.user.admin">
            <v-list-tile-title>Admin</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content app clipped-left>
      <v-container fluid>
        <v-layout>
          <nuxt></nuxt>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer dark app>
      <span>&copy; 2017 - Powered by Hivemind Apps</span>
    </v-footer>
    <v-snackbar
      :timeout="3000"
      :bottom="true"
      :right="true"
      :multi-line="true"
      :color="snackbarColor"
      v-model="snackbar">
      {{ $store.state.notification.text }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
// search icons: https://material.io/icons/ asd
export default {
  props: {
    source: String
  },
  data () {
    return {
      drawer: null,
      name: 'Overlord',
      right: null
    }
  },
  computed: {
    snackbar: {
      get () {
        return this.$store.state.notification.snackbar
      },
      set (value) {
        this.$store.commit('notification/UPDATE_SNACKBAR', value)
      }
    },
    snackbarColor () {
      return this.$store.state.notification.context
    }
  }
}
</script>
