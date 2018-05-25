<template>
  <v-container class="menu" pa-0>
    <v-layout row justify-space-between  pa-0>
      <v-flex xs4>
        <router-link to="/main"> <v-btn flat> home</v-btn></router-link>
      </v-flex>
      <v-flex xs4>
        <!-- <router-link to="/main"><v-btn>view</v-btn></router-link> -->
        <v-btn @click="moveToEndStep"> end</v-btn>

      </v-flex>

      <v-flex xs4>
                <v-btn @click="cancelEndStep"> cancel</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    methods: {
        moveToEndStep(){
          return this.$store.dispatch('moveToEndStep')
        },
        cancelEndStep(){
          return this.$store.dispatch('cancelEndStep')
        }
    }
}
</script>

<style lang="css">
.menu {
  flex: 0 0 0;
  margin-top: auto;
  position: relative;
}
</style>
