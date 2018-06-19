<template>
  <transition name="fade-in" mode="out-in">
  <div class="join-game-page">
    <v-container pa-2>
      <v-layout>
        <v-flex><h1>active games</h1></v-flex>
      </v-layout>
      <v-layout>
        <v-flex style="width:100%">
          <v-layout row wrap v-for="game in activeGames" :key="game['.key']" ma-1>
            <v-flex xs12>
              <h3 >{{game.playgroupName}}</h3>
            </v-flex>
            <v-flex xs4 v-for="player in game.players" :key="player['.key']">
                {{player}}
            </v-flex>


            <v-flex xs12 py-3>
              <v-btn block small color="secondary" v-on:click="connectToGame(game)">
                join game : {{game.id}}
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

    </v-container>
    <v-container style="position: absolute; bottom: 0">
      <v-layout row py-1>
        <router-link class="back-button" to="/main"> <v-btn flat> back</v-btn></router-link>
        <v-spacer></v-spacer>
          <router-link to="/newGame" > <v-btn color="primary">create game</v-btn></router-link>
      </v-layout>
    </v-container>
  </div>
</transition>
</template>

<script>
import firebase from 'firebase'
import {db} from '../../firebase'

export default {
  name: 'join',
  firebase: function () {
    return {
      playGroups: db.ref('users/' + firebase.auth().currentUser.uid + '/playgroups/' ),
      activeGames: db.ref('users/' + firebase.auth().currentUser.uid + '/activeGames/' )
    }
  },
  data: function () {
    return{
      gameID: '',
      gamelist: []
    }
  },
  computed: {
    loadedGame (){
      return this.$store.getters.loadedGame
    },
    playgroups (){
      return this.$store.getters.playgroups
    }


  },
  watch: {
    // playGroups (value){
    //
    // }
  },
  methods: {
    connectToGame: function(gameData){
      console.log(gameData)
      this.$store.dispatch('connectToGame', gameData)
        .then( this.$router.push('/play') )
    }
  }
}
</script>

<style scoped lang="scss">
.join-game-page{
  height: 100%;
  width: 100%;

  .join-game-form-wrapper{
    margin: auto;
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
