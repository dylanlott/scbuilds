<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex xs12 sm10 md8 lg6 xl6>
        <h1>Sign In</h1>
        <sign-in-form :redirect="redirect"></sign-in-form>
        <br>
        <p>Don't have an account? <nuxt-link :to="{ name: 'users-auth-sign-up' }"><b>Sign up!</b></nuxt-link></p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import signInForm from '~/components/auth/sign-in-form.vue'
export default {
  components: { signInForm },
  data () {
    return {
      redirect: { name: 'index' }
    }
  }
}
</script>
