<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title><h1>edit build</h1></v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                outline
                label="name"
                :value="build.name"
                v-model="build.name"
                prepend-icon="place">
              </v-text-field>
            <v-flex>
              <v-layout row wrap justify-space-between>
                <v-flex xs12 sm4>
                  <v-select
                    outline
                    :items="races"
                    label="player race"
                    v-model="build.races.player"
                    :menu-props="build.races.player"
                    prepend-icon="person"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-select
                    outline
                    :items="races"
                    label="opponent race"
                    v-model="build.races.opponent"
                    :menu-props="build.races.opponent"
                    prepend-icon="arrow_right_alt person"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-select
                    outline
                    label="type"
                    :items="buildTypes"
                    :menu-props="build.type"
                    v-model="build.type"
                    prepend-icon="list"
                    ></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-card width="100%">
              <v-card-text>
              <v-toolbar>
                <v-toolbar-title>Build Order</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn raised primary>add step</v-btn>
              </v-toolbar>
              <BuildOrder :steps="build.steps"></BuildOrder>
              </v-card-text>
            </v-card>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            @click="update(build)" 
            color="primary">
            Save
          </v-btn>
        </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <code>
      {{ build }}
    </code>
  </v-container>
</template>
<script>
import BuildOrder from '../../../../components/builds/BuildOrder.vue'

export default {
  data () {
    return {
      redirect: { name: 'builds' },
      races: [
        { text: 'zerg', value: 'zerg'},
        { text: 'protoss', value: 'protoss'},
        { text: 'terran', value: 'terran'},
        { text: 'any', value: 'any'}
      ],
      buildInfo: {
        name: '',
        analysis: '',
        races: {
          player: '',
          opponent: ''
        }
      },
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
    }
  },
  fetch({ store, params }) {
    return store.dispatch('build/getOneBuild', params.id)
  },
  computed: {
    build () { 
      return this.$store.state.build.details 
    }
  },
  components: {
    BuildOrder
  },
  methods: {
    update (build) {
      this.$store.dispatch('build/updateBuild', build)
        .then(() => {
          this.$router.replace(this.redirect)
          // if (this.$store.state.notification.success) {
          //   this.$router.replace(this.redirect)
          // }
        })
    },

  }
}
</script>
