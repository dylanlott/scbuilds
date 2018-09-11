<template>
  <v-container fluid>
    <v-flex xs12 xl6>
      <v-card>
        <v-card-title>
          <h1 class="display-2">Create a build</h1>
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
                label="Build type"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6>
              <v-layout row justify-center align-center fill-height>
                <v-flex class="mr-3">
                  <v-select
                    :items="races"
                    label="player race"
                    outline
                    >
                  </v-select>
                </v-flex>
                <v-flex>
                  <v-select
                    :items="races"
                    label="opponent race"
                    outline
                    >
                  </v-select>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 my-3>
              <h2>Steps</h2>
              <p>Add timings, make notes on supply, and walk through each step.</p>
              <v-tooltip top open-delay="500">
                <v-btn color="purple lighten-2" slot="activator" outline @click="addBlankStep()">
                  Add A Step
                </v-btn>
                <span>Pro Tip: Hit `enter` while typing in the form to spawn another action.</span>
              </v-tooltip>

              <!-- Steps Component -->
              <v-card
                :key="index" 
                v-model="build.steps" 
                @keyup.enter="addBlankStep()" 
                v-for="(step, index) in steps">
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs-3 class="mx-1">
                      <v-text-field 
                        :label="step.action || 'Action name'" 
                        :v-model="step.action">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs-3 class="mx-1">
                      <v-text-field 
                        label="@" 
                        :v-model="step.value">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs-3 class="mx-1">
                      <v-select
                        :items="types"
                        label="Types"
                      ></v-select>
                    </v-flex>
                    <v-flex xs-3 class="mx-1">
                      <v-text-field
                        :label="step.comment || 'Comment'"
                        :v-model="step.comment"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <v-btn small icon color="red"><v-icon>delete</v-icon></v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                outline
                @input="updateDescription"
                label="description" 
                v-model="build.analysis"
              ></v-textarea>
            </v-flex>
            <v-flex>
              <template>
                <v-expansion-panel>
                  <v-expansion-panel-content>
                    <div slot="header" class="font-weight-medium">preview</div>
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
      },
      buildTypes: [
        'economy',
        'rush',
        'all-in',
        'max-out',
        'aggressive',
        'fast-expand',
        'general'
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
        'mineral',
        'gas',
        'supply',
        'time',
        'units'
      ],
      steps: []
    }
  },
  methods: {
    addBlankStep () {
      this.steps.push(this.stepTemplate)
    },
    submit () {
      const _build = this.build
      console.log('Creating build...', _build)
      // this.$store.dispatch('builds/create')
    },
    updateDescription () {
      _.debounce(function (e) {
        this.input = e.target.value
      }, 300)
    }
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.build.analysis, { sanitize: true })
    }
  }
}
</script>
