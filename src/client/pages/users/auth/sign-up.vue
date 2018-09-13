<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex xs12 sm10 md8 lg6 xl6>
        <h1 class="font-weight-black">Sign Up</h1>
        <sign-up-form :redirect="{ name: 'users-auth-sign-in' }"/>
        <br>
        <p class="text-xs-center">Already have an account? <nuxt-link :to="{ name: 'users-auth-sign-in' }"><b>Sign in!</b></nuxt-link></p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import signUpForm from '~/components/auth/sign-up-form.vue'
export default {
  components: { signUpForm }
}
</script>
