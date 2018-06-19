<template>
  <transition name="fade-in" mode="out-in">
  <div class="remote-page-wrapper">

    <v-container pa-2 class="remote-page remote-player-list">
      <v-layout row class="remote-page remote-header" py-2>
        <v-flex class="remote-header header-game-id">
          {{gameID}}
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex class="remote-header header-playgroup-name">
          {{playGroupName}}
        </v-flex>
      </v-layout>
      <v-divider light ></v-divider>
      <v-layout row wrap v-for="player of gameData.players" v-bind:key="player['.key']"  class="player-card" >
        <remote-player v-bind:gameStatus="gameData.status" v-bind:winner="gameData.winner" v-bind:player="player"></remote-player>
      </v-layout>
    </v-container>

    <div class="menu">
      <remote-menu v-bind:gameData="gameData" ></remote-menu>
    </div>
  </div>
  </transition>
</template>

<script>
import firebase from 'firebase'
import {db} from '../../../firebase'
import remotePlayerComponent from './player.vue'
import remoteMenu from './remoteMenu.vue'
export default {
  name: 'game',
  components: {
    'remote-player': remotePlayerComponent,
    'remote-menu': remoteMenu

  },
  firebase: function () {
    // return {
    //   gameData: {
    //     source: db.ref('games/'+ this.$store.getters.loadedGame.id ),
    //     asObject: true,
    //   }
    // }
  },
  data: function () {
    return{
      endGame: false,
      gameData: { }
    }
  },
  computed: {
    gameID(){
      return this.$store.getters.loadedGame.id
    },
    playGroupName(){
      return this.$store.getters.activePlayGroupName
    },
    gameStatus(){
      return this.$store.getters.gameInfo.status
    }

  },
  watch:{
    gameStatus:  function(newValue, oldValue){
      console.log(newValue)
      //watch status to repull game data when new game is started
      newValue === 'active' ? this.$bindAsObject('gameData', db.ref('games/'+ this.$store.getters.loadedGame.id )) : false
    },

  },
  methods: {
  },
  mounted(){
    this.$bindAsObject('gameData', db.ref('games/'+ this.$store.getters.loadedGame.id ))
  }
}
</script>

<style scoped lang="scss">

.remote-page-wrapper{
  position: fixed;
  display: flex;
  flex-flow: column;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
    .remote-header{
      font-size: 1.2em;
      opacity: .6;
      .header-game-id{
        text-align: left;
        font-weight: 200;
      }
      .header-playgroup-name{
        text-align: right;

      }
    }
    .remote-player-list{
      display: block;
      height: 100%;
      position: relative;
      overflow-y: scroll;
  }
.menu{
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
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
