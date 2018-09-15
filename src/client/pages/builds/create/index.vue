<template>
  <v-container fluid>
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
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-select 
                outline
                :items="buildTypes"
                label="build type"
                v-model="build.type"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6>
              <v-layout row justify-center align-center fill-height>
                <v-flex class="mr-3">
                  <v-select
                    :items="races"
                    label="player race"
                    v-model="build.races.player"
                    outline>
                  </v-select>
                </v-flex>
                <v-flex>
                  <v-select
                    :items="races"
                    label="opponent race"
                    v-model="build.races.opponent"
                    outline
                    ></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 my-3>
              <h2 class="font-weight-bold display-1">Steps</h2>
              <p class="font-weight-thin">Add timings, make notes on supply, and walk through each step</p>
              <p class="font-weight-thin">Hit enter after filling out each step to add it.</p>
            </v-flex>
            <v-flex>
              <v-layout row wrap>
                <v-flex xs12 sm6 md3 lg2 mr-3>
                  <v-text-field 
                    box
                    @keyup.enter="addStep(step)"
                    label="action"
                    :rules="actionRules"
                    v-model="step.action"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm5 md3 lg2 mr-3>
                  <v-text-field 
                    box
                    @keyup.enter="addStep(step)"
                    :rules="valueRules"
                    label="value" 
                    v-model="step.value"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm5 md3 lg2 mr-3>
                  <v-select
                    box
                    label="type"
                    :rules="typeRules"
                    v-model="step.type"
                    :items="types"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md3 lg2 mr-3>
                  <v-text-field 
                    box
                    @keyup.enter="addStep(step)"
                    label="comment" 
                    v-model="step.comment"
                  ></v-text-field>
              </v-flex>
              <v-flex>
                <v-btn color="purple lighten-1" outline large @click="addStep(step)">add step</v-btn>
              </v-flex>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-layout row wrap>
                <v-flex>
                  <h3>Build Order</h3>
                  <v-card dense v-for="(step, index) in steps" :key="index">
                    <v-card-text>
                      <v-layout column>
                        <v-flex v-if="step.action" class="font-weight-bold">
                          <v-icon small color="purple lighten-1">star</v-icon>
                          {{ step.action }} 
                          @ {{step.value}} 
                          {{step.type}}
                        </v-flex>
                        <v-flex v-if="step.comment !== ''" class="font-weight-thin">{{ step.comment }}</v-flex>
                        <v-flex v-if="steps.length === 0 || !steps">No steps added yet.</v-flex>
                        <v-divider></v-divider>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex>
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
            </v-layout>
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
  </v-container>
</template>
<script>
import _ from 'lodash'
import marked from 'marked'

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
      tag: '',
      tags: [],
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
      actions: [],
    }
  },
  methods: {
    addBlankStep () {
      this.steps.push(this.stepTemplate)
    },
    submit () {
      const _build = this.build
      _build.steps = this.steps
      console.log('Creating build...', _build)
      this.$store.dispatch('build/createBuild', _build)
        .then(() => {
          if (this.$store.state.notification.success) {
            this.$router.replace({ name: 'index' })
          }
        })
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
  computed: {
    compiledMarkdown: function () {
      return marked(this.build.analysis, { sanitize: true })
    }
  }
}
</script>
