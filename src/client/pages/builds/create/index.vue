<template>
  <v-container fluid>
    <v-layout justify-center align-center>
      <v-flex xs12 xl6>
        <v-card>
          <v-card-title>
            <h1 class="font-weight-bold display-2 ">Create a build</h1>
          </v-card-title>
          <v-card-text>
            <p class="font-weight-medium">Name your build and give it a type.</p>
            <v-form>
              <v-flex>
                <v-text-field
                  outline
                  label="name" 
                  v-model="build.name"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex>
                <v-select 
                  outline
                  :items="buildTypes"
                  label="build type"
                  v-model="build.type"
                  :rules="[rules.required]"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-layout row justify-center align-center fill-height>
                  <v-flex class="mr-3">
                    <v-select
                      :items="races"
                      label="player race"
                      v-model="build.races.player"
                      :rules="[rules.required]"
                      outline>
                    </v-select>
                  </v-flex>
                  <v-flex>
                    <v-select
                      :items="races"
                      label="opponent race"
                      v-model="build.races.opponent"
                      :rules="[rules.required]"
                      outline
                      ></v-select>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 my-3>
                <h2 class="font-weight-bold display-1">Build Order</h2>
                <p class="font-weight-thin">Add timings, make notes on supply, and walk through each step of your build order.</p>
                <p class="font-weight-thin">Hit enter after filling out each step to add it.</p>
              </v-flex>
              <v-flex my-3>
                <BuildOrder :steps="build.steps"></BuildOrder>
              </v-flex>
              <v-flex my-3>
                <h3 class="font-weight-bold display-1">Analysis & Details</h3>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  outline
                  @input="updateAnalysis"
                  label="analysis" 
                  v-model="build.analysis"
                ></v-textarea>
              </v-flex>
              <v-flex>
                <template>
                  <v-expansion-panel>
                    <v-expansion-panel-content>
                      <div slot="header" class="font-weight-medium">formatted preview</div>
                      <v-card>
                        <v-card-text v-html="compiledMarkdown"></v-card-text>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </template>
              </v-flex>
              <v-flex xs12 mt-4>
                <v-btn 
                  @click="submit(build)"
                  color="purple lighten-1" 
                  block
                  dark>
                  create
                  <v-icon dark right>check_circle</v-icon>
                </v-btn>
              </v-flex>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import _ from 'lodash'
import marked from 'marked'
import BuildOrder from '../../../components/builds/BuildOrder.vue'

export default {
  middleware: 'authenticated',
  data () {
    return {
      races: [
        { text: 'zerg', value: 'zerg'},
        { text: 'protoss', value: 'protoss'},
        { text: 'terran', value: 'terran'},
        { text: 'any', value: 'any'}
      ],
      build: {
        name: '',
        analysis: '',
        races: {
          player: '',
          opponent: ''
        },
        steps: [],
        type: '',
        tags: []
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
      tag: '',
      stepTemplate: {
        action: '',
        value: '',
        at: '',
        comment: ''
      },
      types: [
        'minerals',
        'gas',
        'supply',
        'time',
        'units'
      ],
      step: {
        action: '',
        type: '',
        value: '',
        comment: ''
      },
      steps: [],
      stepRules: [v => v.length > 0 || 'At least one step is required'],
      actionRules: [v => !!v || 'action is required.'],
      typeRules: [v => !!v || 'type is required.'],
      valueRules: [v => !!v || 'value is required.'],
      rules: {
        required: v => !!v || 'this field is required',
        length: v => !!v && v.length > 1 || 'must be longer than 1 character',
        steps: v => !!v && v.length > 5 || 'build orders must have at least 5 steps.'
      },
      actions: [],
    }
  },
  methods: {
    addBlankStep () {
      this.steps.push(this.stepTemplate)
    },
    submit () {
      console.log('Creating build...', build)
      // this.$store.dispatch('build/createBuild', build)
      //   .then(() => {
      //     if (this.$store.state.notification.success) {
      //       this.$router.replace({ name: 'builds' })
      //     }
      //   })
    },
    updateAnalysis () {
      _.debounce(function (e) {
        this.input = e.target.value
      }, 300)
    },
    removeStep (index) {
      return this.steps.splice(index, 1)
    },
    addStep (step) {
      this.steps.push(step)
      this.step = {
        action: '',
        type: '',
        value: '',
        comment: ''
      }
    }
  },
  components: {
    BuildOrder
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.build.analysis, { sanitize: true })
    }
  }
}
</script>
