<template>
  <v-list>
    <draggable>
      <transition-group>
        <v-list-tile
          v-for="(step, index) in steps" :key="step.id">
          <v-list-tile fill-height avatar @click="">
            <v-list-tile-action>
              ::
            </v-list-tile-action>
            <v-list-tile-content>
              <v-layout row wrap>
                <v-flex x12 sm3>
                  <v-text-field 
                    single-line 
                    label="action" 
                    v-model="step.action" 
                    :value="step.action" ></v-text-field>
                </v-flex>
                <v-flex xs12 sm2>
                  <v-text-field 
                    single-line 
                    label="value" 
                    v-model="step.value" 
                    :value="step.value"></v-text-field>
                </v-flex>
                <v-flex xs12 sm3>
                  <v-select 
                    single-line 
                    label="type" 
                    :items="types" 
                    v-model="step.type" 
                    :menu-props="step.type"></v-select>
                </v-flex>
                <v-flex xs12 sm2>
                  <v-text-field single-line 
                    label="comment" 
                    v-model="step.comment" 
                    :value="step.comment"
                    @keyup.enter="addStep()"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm2>
                  <v-btn 
                    @click="remove(index)" 
                    small 
                    icon 
                    outline 
                    round 
                    class="mt-2" 
                    color="red lighten-1">
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
    <v-btn 
      outline 
      color="primary" 
      @click="addStep()">add step</v-btn>
  </v-list>
</template>
<script>
import draggable from 'vuedraggable'

export default {
  data () {
    return {
      types: [
        'minerals',
        'gas',
        'supply',
        'time',
        'units'
      ],
      valid: {
        required: v => !!v || 'can\'t be blank.'
      }
    } 
  },
  components: {
    draggable
  },
  props: {
    steps: Array
  }, 
  methods: {
    addStep() {
      this.steps.push({
        id: Date.now(),
        action: '',
        value: '',
        type: '',
        comment: ''
      })
    },

    remove (index) {
      this.steps.splice(index, 1)
    }
  }
}
</script>
