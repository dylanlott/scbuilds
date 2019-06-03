<template>
  <v-list dense two-line>
    <v-list-tile v-for="(build) in builds" :key="build.name">
      {{ build }}
    </v-list-tile>
  </v-list>
</template>
<script>
export default {
  props: {
    builds: Array
  }
}
</script>
