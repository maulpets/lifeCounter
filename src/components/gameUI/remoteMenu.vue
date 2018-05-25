<template>
  <v-container class="menu" pa-0>
    <v-layout row justify-space-between  pa-0  v-if="gameStatus == 'active'">
      <v-flex xs4>
        <router-link to="/main"> <v-btn flat> home</v-btn></router-link>
      </v-flex>
      <v-flex xs4>
        <v-btn @click="moveToEndStep"> end game</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row justify-space-between  pa-0 v-if="gameStatus == 'ending'">
      <v-flex xs4 >
          <v-btn @click="cancelEndStep">cancel</v-btn>
      </v-flex>
      <v-flex xs4>
      <v-btn flat :disabled="winner == ''"><router-link to="/main" style="color:inherit !important; background-color: transparent">home</router-link></v-btn>
      </v-flex>
      <v-flex xs4>
        <!-- <router-link to="/main"><v-btn>view</v-btn></router-link> -->
        <v-btn @click="endGame" :disabled="winner == ''"> new game</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props:['gameStatus', 'winner'],
  methods: {
        moveToEndStep(){
          return this.$store.dispatch('moveToEndStep')
        },
        cancelEndStep(){
          return this.$store.dispatch('cancelEndStep')
        },
        endGame(){
          return this.$store.dispatch('closeGame', this.winner)
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
