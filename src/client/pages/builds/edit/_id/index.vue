<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title><h1>edit build</h1></v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="name"
                :value="build.name"
                prepend-icon="place">
              </v-text-field>
              <v-select
                label="type"
                :items="buildTypes"
                :value="build.type"
                prepend-icon="list"
                ></v-select>
            <v-flex xs12 sm6>
              <v-layout row justify-center align-center fill-height>
                <v-flex class="mr-3">
                  <v-select
                    :items="races"
                    label="player race"
                    :v-model="build.races.player"
                    :value="build.races.player"
                    prepend-icon="person"
                  outline></v-select>
              </v-flex>
              <v-flex align-center justify-center fill-height>
                vs
              </v-flex>
                <v-flex>
                  <v-select
                    :items="races"
                    label="opponent race"
                    v-model="build.races.opponent"
                    value="build.races.opponent"
                    prepend-icon="person"
                    outline
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-flex>

            <!-- actions -->  
            <v-flex>
              <template> 
                <v-data-table
                  :headers="headers"
                  :items="build.steps"
                  hide-actions
                  class="elevation-1">
                  <template slot="items" slot-scope="props">
                    <td class="handle" style="max-width: 28px;">::</td>
                    <td>{{ props.item.action }}</td>
                    <td class="text-xs-center">{{ props.item.value }}</td>
                    <td class="text-xs-center">{{ props.item.type }}</td>
                    <td class="text-xs-center">{{ props.item.comment }}</td>
                  </template>
                </v-data-table>
              </template>
            </v-flex>
          </v-form>
          <code>
            {{ build }}
          </code>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import _ from 'lodash'
import Sortable from 'sortablejs'

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
  mounted () {
    console.log('mounted')
    let table = document.querySelector(".v-datatable tbody")
    let _self = this
    Sortable.create(table, {
      handle: ".handle",
      onEnd({ newIndex, oldIndex }) {
        const rowSelected = _self.build.steps.splice(oldIndex, 1)[0]
        _self.build.steps.splice(newIndex, 0, rowSelected)
      }
    })
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
    }
  }
}
</script>
