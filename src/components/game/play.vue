<template>
  <transition name="fade-in" mode="out-in">
  <div class="select-device">
    <v-container>
      <v-layout row wrap justify-space-between class="menu" pa-3 >
        <v-flex xs12>
          <h1>game id: {{loadedGame.id}}</h1>
        </v-flex>
        <v-flex xs6>
          <router-link class="back-button" to="/remote"><v-btn>remote</v-btn></router-link>
        </v-flex>
        <v-flex xs6>
          <router-link class="create-group" to="/scoreboard"><v-btn> scoreboard </v-btn></router-link>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'play',
  props:[

  ],
  data: function () {
    return{
      gameID: '',
    }
  },
  computed: {
    loadedGame (){
      return this.$store.getters.loadedGame
    }
  },
  watch: {

  },
  methods: {
    // onConnect () {
    //   this.$store.dispatch('changeGame', {id: this.gameID});
    // }
  },
  mounted(){
    this.$store.dispatch('loadActivePlayGroupPlayers')
  }
}
</script>

<style scoped lang="scss">
.select-device{
  height: 100%;
  width: 100%;

}

.fade-in-enter-active {
  animation: fade-in ease-in-out 1.5s ;
}
.fade-in-leave-active {
  position: absolute;
  top: 0;
  animation: fade-in ease-in-out 1.5s reverse;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  50%{
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
