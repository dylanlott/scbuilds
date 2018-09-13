<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex xs12>
        <v-container v-if="$store.state.user.isAuthenticated">
          <h1>Welcome {{ $store.state.user.username }}!</h1>
        </v-container>
        <v-container v-else align-center>
           <v-card>
      <v-responsive :aspect-ratio="16/9">
        <v-card-text>
          <div class="text-xs-center">
          <h1 class="text-xs-center display-3">Overlord</h1>
          <h3 class="subtitle">the starcraft build tracker, creator, and explorer.</h3>
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
          </div>
        </v-card-text>
      </v-responsive>
    </v-card>

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
