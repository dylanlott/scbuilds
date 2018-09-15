<template>
    <v-img
      :src="header"
      alt="overlord - the starcraft build order tool" 
      width="100%">
      <v-layout justify-center align-center>
        <v-flex xs12>
          <v-container v-if="$store.state.user.isAuthenticated">
            <h1>Welcome {{ $store.state.user.username }}!</h1>
          </v-container>
          <v-container fluid v-else align-center>

            <div class="text-xs-center">
            <!-- <img id="logo" :src="vueniverseLogo" alt="vueniverse_logo.svg"> -->
            <h1 class="text-xs-center display-3">Overlord</h1>
            <h2>the starcraft build tracker, creator, and explorer.</h2>
              <v-btn
                rounded
                dark
                color="purple lighten-1"
                to="/users/auth/sign-up">Sign Up
              </v-btn>
              or
              <v-btn
                outline
                color="purple"
                to="/users/auth/sign-in">Sign In
              </v-btn>
            </div>
          </v-container>
        </v-flex>
      </v-layout>
    </v-img>
</template>

<script>
import vueniverseLogo from '~/assets/img/vueniverse_logo.svg'
import header from '~/assets/img/header.jpg'

export default {
  data () {
    return {
      vueniverseLogo,
      header
    }
  }
}
</script>
