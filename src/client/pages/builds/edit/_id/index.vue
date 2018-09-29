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
                    :v-model="build.races.player"
                    :value="build.races.player"
                    prepend-icon="person"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-select
                    outline
                    :items="races"
                    label="opponent race"
                    :v-model="build.races.opponent"
                    :value="build.races.opponent"
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

            <!-- actions -->  
              <v-card width="100%">
                <v-card-text>
                <v-toolbar>
                  <v-toolbar-title>Build Order</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn raised primary>add step</v-btn>
                </v-toolbar>
                <v-list>
                  <draggable v-model="build.steps">
                    <transition-group>
                      <v-list-tile
                        v-for="(step, index) in build.steps" 
                        :key="index">
                        <v-list-tile fill-height avatar @click="">
                          <v-list-tile-action>
                            ::
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-layout row wrap>
                              <v-flex x12 sm3>
                                <v-text-field single-line label="action" v-model="step.action" :value="step.action" ></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm2>
                                <v-text-field single-line label="value" v-model="step.value" :value="step.value"></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm3>
                                <v-select single-line label="type" :items="types" v-model="step.type" :value="step.type"></v-select>
                              </v-flex>
                              <v-flex xs12 sm2>
                                <v-text-field single-line label="comment" :v-model="step.comment" :value="step.comment"></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm2>
                                <v-btn @click="remove(index)" small icon outline round class="mt-2" color="red lighten-1">
                                  <v-icon small>delete_outline</v-icon>
                                </v-btn>
                              </v-flex>
                            </v-layout>
                          </v-list-tile-content>
                          <v-divider></v-divider>
                        </v-list-tile>
                      </v-list-tile>
                    </transition-group>
                  </draggable>
                  <v-btn outline color="primary" @click="addStep()">add step</v-btn>
                </v-list>
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
import _ from 'lodash'
import draggable from 'vuedraggable'

export default {
  data () {
    return {
      headers: [
        { text: 'drag', sortable: false },
        {
          text: 'action',
          align: 'left',
          sortable: false,
          value: 'action'
        },
        {
          text: 'value',
          align: 'center',
          sortable: false,
          value: 'value'
        },
        {
          text: 'type',
          align: 'center',
          sortable: false,
          value: 'type'
        },
        {
          text: 'comment',
          align: 'center',
          sortable: false,
          value: 'comment'
        },
        {
          text: 'edit',
          align: 'center',
          sortable: false,
          value: 'edit'
        },
      ],
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
      types: [
        'minerals',
        'gas',
        'supply',
        'time',
        'units'
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
    draggable
  },
  methods: {
    addStep() {
      this.$store.dispatch('build/addStep', {
        action: '',
        value: '',
        type: '',
        comment: ''
      })
      console.log(this.build.steps)
    },

    toggle (item) {
      console.log(!!item.disabled)
      return !!item.disabled 
    },

    update (build) {
      console.log('updating build: ', build)
    },

    remove (index) {
      this.build.steps.splice(index, 1)
    }
  }
}
</script>
