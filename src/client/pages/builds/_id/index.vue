<template>
  <v-container>
    <v-card>
      <v-card-title><h1 class="display-1">{{ build.name }}</h1>
        <v-spacer></v-spacer>
        <v-btn outline v-if="build.user === $store.state.user.email">edit</v-btn>
      </v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex>comments: {{ build.meta.comments.length }}</v-flex>
          <v-flex>upvotes: {{ build.meta.upvotes || 0}}</v-flex>
          <v-flex>downvotes: {{ build.meta.downvotes || 0 }}</v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex>
            <v-chip>{{ build.type }}</v-chip>
          </v-flex>
          <v-flex>
            <v-chip   
              :key="index" 
              v-for="(tag, index) in build.tags"
            >{{ tag }}
            </v-chip>
          </v-flex>
        </v-layout>
        <v-layout column>
          <v-flex><h2>Analysis</h2></v-flex>
          <v-flex v-html="build.analysis"></v-flex>
          <v-flex><h2>Build Order</h2></v-flex>
          <v-flex>
            <v-list dense>
              <v-list-tile
                v-for="(step, index) in build.steps"
                :key="index"
                >
                <v-list-tile-content>
                  <v-layout row wrap>
                    <v-flex>
                      {{ step.action }}
                    </v-flex>
                    &nbsp;
                    <v-flex>
                      @ {{ step.value }}
                    </v-flex>
                    &nbsp;
                    <v-flex>
                      {{ step.type }}
                    </v-flex>
                    &nbsp;
                    <v-flex>
                      {{ step.comment }}
                    </v-flex>
                  </v-layout>
                </v-list-tile-content>
                <v-list-tile-actions>

                </v-list-tile-actions>
              </v-list-tile>
            </v-list>
          </v-flex>
          <v-flex><h2>Comments</h2></v-flex>
          <v-flex>
            <v-list>
              <v-list-tile
                v-for="(comment, index) in build.meta.comments"
                :key="index"
                >
                {{ comment }}
              </v-list-tile>
              <v-list-tile v-if="build.meta.comments.length < 1">
                No comments have been added yet.
              </v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  fetch ({ store, params }) {
    store.dispatch('build/getOneBuild', params.id)
  },
  computed: {
    build () { return this.$store.state.build.details }
  }
}
</script>
