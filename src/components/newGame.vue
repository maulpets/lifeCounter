<template lang="html">
  <div class="game-setup">
    <h1>Game Settings</h1>
    <h2>Game ID: <span id="gameID">{{gameInfo.id}}</span></h2>
    <h3 id="playerID">Players</h3>
    <ul>
      <li v-for="playerNames of players" v-bind:key="playerNames['.key']" >{{playerNames.name}}</li>
    </ul>
    <md-field>
      <label>Player Name</label>
      <md-input v-model="playerName"></md-input>
      <md-button class="md-raised" @click="addPlayer">add</md-button>
    </md-field>


    <br>
    <md-button class="md-raised" @click="addPlayer">StartGame</md-button>

    <router-link to="/">create game</router-link>
  </div>

</template>

<script>
import firebase from 'firebase'
import {db} from '../firebase'
import {games} from '../firebase'
import {gameDefaults} from '../defaults'
import { store } from '../store/store'

const gameKey = store.state.gameInfo.id;

export default {
  name: 'newGame',
  data: function() {
    return {
      playerName: ''
    }
  },
  firebase: {
    players: db.ref('games/'+ gameKey + '/players')
  },
  computed: {
    gameInfo () {
      return this.$store.state.gameInfo
    }
  },
  methods: {
    addPlayer: function() {
          db.ref('games/'+ gameKey + '/players/' + this.playerName).set({name: this.playerName, life: 40});
          this.playerName = '';
    }
  }
}
</script>

<style scooped lang="scss">
  .game-setup{
    max-width: 80%;
    margin: auto;
  }
</style>
