<template>
  <v-list dense two-line>
    <v-list-tile v-for="(build, index) in builds" :key="index">
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
