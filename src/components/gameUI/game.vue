<template>
  <transition name="fade-in" mode="out-in">
  <div class="scorebaord-page-wrapper">
    <v-container pa-2>
      <!-- <h1>game id: {{loadedGame.id}}</h1> -->

      <v-layout row wrap v-for="player of playerList" v-bind:key="player['.key']"  class="player-card" ma-1>
        <remote-player :player="player"></remote-player>
        <v-divider light ></v-divider>
      </v-layout>


    </v-container>
  </div>
  </transition>
</template>

<script>
import firebase from 'firebase'
import {db} from '../../firebase'
import remotePlayerComponent from './remote/player.vue'

export default {
  name: 'game',
  components: {
    'remote-player': remotePlayerComponent,

  },
  firebase: function () {
    return {
      playerList:   db.ref('games/'+ this.$store.getters.loadedGame.id + '/players/')
    }
  },
  data: function () {
    return{

    }
  }
}
</script>

<style scoped lang="scss">

.scorebaord-page-wrapper{
  height: 100%;
  width: 100%;
  .player-card{

  }
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
