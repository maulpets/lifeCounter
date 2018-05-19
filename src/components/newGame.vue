<template lang="html">
  <div class="game-setup">
    <h1>Game Settings</h1>
    <h2>Game ID: <span id="gameID">{{gameInfo.id}}</span></h2>
    <h3 id="playerID">Players</h3>
    <ul>
      <li v-for="player of playerList" v-bind:key="player['.key']" >{{player.name}}</li>
    </ul>
    <field>
      <label>Player Name</label>
      <input v-model="playerName"></input>
      <button class="raised" @click="addPlayer">add</button>
    </field>


    <br>

    <router-link to="/">Back</router-link>
    <router-link to="/scoreboard">Start Game</router-link>

  </div>

</template>

<script>
import firebase from 'firebase'
import {db} from '../firebase'


export default {
  name: 'newGame',
  data: function() {
    return {
      playerName: ''
    }
  },
  firebase: function () {
    return {
      playerList:   db.ref('games/'+ this.$store.state.gameInfo.id + '/playerList/')
    }
  },
  computed: {
    gameInfo () {
      return this.$store.getters.loadedGame
    }
  },
  methods: {
    addPlayer: function() {
        console.log(this.$store.state.gameInfo.id)
          db.ref('games/'+ this.$store.state.gameInfo.id + '/playerList/' + this.playerName).set({name: this.playerName, life: 40, sideCounter1: 0, sideCounter2: 0, sideCounter3: 0});
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
