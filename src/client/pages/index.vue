<template>
  <v-container fluid>
    <v-layout justify-center align-center>
      <v-flex xs12 sm10 md8 lg6 xl6>
        <v-container v-if="$store.state.user.isAuthenticated">
          Authenticated: <pre>{{ $store.state.user }}</pre>
          <img id="logo" :src="vueniverseLogo" alt="vueniverse_logo.svg">
        </v-container>
        <v-container v-else align="center">
          <h1 class="text-xs-center display-3">SC Builds</h1>
          <!-- <img id="logo" :src="vueniverseLogo" alt="vueniverse_logo.svg"> -->
          <v-btn 
            rounded 
            dark 
            color="purple lighten-1"
            to="/users/auth/sign-up">Sign Up</v-btn> 
          or 
          <v-btn 
            outline 
            color="purple"
            to="/users/auth/sign-in"
          >Sign In</v-btn>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import vueniverseLogo from '~/assets/img/vueniverse_logo.svg'
export default {
  data () {
    return {
      vueniverseLogo
    }
  }
}
</script>
