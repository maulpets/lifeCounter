<template>
  <transition name="fade-in" mode="out-in">
  <div class="scorebaord-page-wrapper">
    <v-container>
      <h1>game id: {{loadedGame.id}}</h1>

      <v-layout row wrap v-for="player of playerList" v-bind:key="player['.key']"  >
        <v-flex xs3>
          <h1>{{player.name}}</h1>
        </v-flex>
        <v-flex  xs2>
          <v-btn small @click="add(player, 1, 'life')" >+</v-btn>
        </v-flex>
        <v-flex  xs2>
          <h1>{{player.life}}</h1>
        </v-flex>
        <v-flex  xs3>
          <v-btn small @click="subtract(player, 1, 'life')">-</v-btn>
        </v-flex>
        <v-flex  xs2>
          <v-btn small @click="showCMD = !showCMD">cmd</v-btn>
        </v-flex>
        <v-layout row  v-for="(cmdDMG, playerName) of player['cmd']" v-if="showCMD">
          <v-flex>
            {{playerName}}
            <v-btn flat fab small @click="addCMD(player, 1, playerName)" >
              <v-icon>add</v-icon>
            </v-btn>
            {{cmdDMG}}
            <v-btn flat fab small @click="subtractCMD(player, 1, playerName)">
              <v-icon>remove</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>

      </v-layout>

    </v-container>
  </div>
  </transition>
</template>

<script>
import firebase from 'firebase'
import {db} from '../firebase'

export default {
  name: 'game',
  firebase: function () {
    return {
      playerList:   db.ref('games/'+ this.$store.getters.loadedGame.id + '/players/')

    }
  },
  data: function () {
    return{
      gameID: '',
      showCMD: false
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
    add: function( player, amountToChange, valueToChange ) {
      const newValue = player[valueToChange] + amountToChange;
      db.ref('games/'+ this.$store.state.gameInfo.id + '/players/' + player.id ).child(valueToChange).set(newValue)
    },
    subtract: function (player, amountToChange, valueToChange){
      const newValue = player[valueToChange] - amountToChange;
      db.ref('games/'+ this.$store.state.gameInfo.id + '/players/' + player.id ).child(valueToChange).set(newValue)
    },
    isCounting: function (player, valueThatsCounting){
      return player[valueThatsCounting] > 0;
    },
    addCMD: function( player, amountToChange, valueToChange ) {
      const newLife = player['life'] + amountToChange;
      const newCmd = player['cmd'][valueToChange] + amountToChange;

      db.ref('games/'+ this.$store.state.gameInfo.id + '/players/' + player.id ).child( 'life' ).set(newLife)
      db.ref('games/'+ this.$store.state.gameInfo.id + '/players/' + player.id + '/cmd' ).child(valueToChange).set(newCmd)
    },
    subtractCMD: function (player, amountToChange, valueToChange){
      const newLife = player['life'] - amountToChange;
      const newCmd = player['cmd'][valueToChange] - amountToChange;

      db.ref('games/'+ this.$store.state.gameInfo.id + '/players/' + player.id ).child( 'life' ).set(newLife)
      db.ref('games/'+ this.$store.state.gameInfo.id + '/players/' + player.id + '/cmd' ).child(valueToChange).set(newCmd)
    }
  }
}
</script>

<style scoped lang="scss">

.scorebaord-page-wrapper{
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
