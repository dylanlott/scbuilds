import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.purple.lighten1,
    secondary: colors.grey.darken1,
    accent: colors.red.lighten1,
    error: colors.red.accent3
  }
})
