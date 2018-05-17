<template lang="html">
<transition name="fade-in">
  <div class="game-setup">
    <!-- <h1>add players</h1> -->
    <h2>Game ID<br><span id="gameID">{{gameInfo.id}}</span></h2>
    <div class="player-list-wrapper">
      <h3 id="playerID">Players</h3>
      <ul class="player-list">
        <li v-for="player of playerList" v-bind:key="player['.key']" >{{player.name}}</li>
      </ul>
      <div class="input-field">
        <!-- <label id="playername">Player Name</label> -->
        <input v-model="playerName" placeholder="player name"></input>
        <md-button class="" @click="addPlayer">add</md-button>
      </div>
    </div>

    <nav>
      <router-link class="back-button" to="/">Back</router-link>
      <router-link class="start-game-button" to="/scoreboard">Start</router-link>
    </nav>


  </div>
</transition>
</template>

<script>
import firebase from 'firebase'
import {db} from '../firebase'


export default {
  name: 'create',
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
    width: 100%;
    height: 100%;
    padding: 2em;
    margin: auto;
    z-index: 10;
    position: relative;
    nav{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-around;
      .back-button, .start-game-button{
        color:#00897B;
        text-transform: lowercase;
        font-size: 3em;
        line-height: 1em;
      }

    }
    h1,h2{

    }
    h2{
      margin: 0;
      text-align: right;
      font-size: 5vw;
      line-height: .5em;
      position: absolute;
      right: 2vw;

      color: rgba(255,255,255,.3);
      span{
        font-size: 3vw;
        font-weight: 100;
      }
    }
    h1{
      color: #282a2e;
      font-size: 20vw;
      line-height: .52em;
      text-align: right;
      bottom: 2vh;
      margin: 0;

      position: absolute;
    }

    .player-list-wrapper{

      position: absolute;
      top: 0;
      right: 5vw;
      left: 5vw;
      h3{
        font-size: 5vw;
        text-align: left;

      }
    .player-list{
      font-size: 5vw;
      font-weight: 100;
      line-height: 1.1em;
      text-transform: lowercase;
    }
    #playername{
      font-weight: 100;
      color: rgba(255,255,255,1);
    }
    .input-field{
      width: 100%;
      margin: 12px auto;
      display: flex;
      align-items: center;
      input{
        background-color: rgba(0,0,0,0);
        padding: 0;
        margin: 0;
        border: none;
        outline: none;
        text-align: left;
        width: 100%;
        color: white;
        font-size: 1.5em;
      }
        label{
          right: 20px;
          text-align: right;
        }
        &:after{
          height: 0;
          right:15%;
        }
      }
  }
}







  .fade-in-enter-active {
    animation: fade-in ease-in-out 2.5s ;
      a{
        opacity: 0;
      }
  }
  .fade-in-leave-active {
    position: absolute;
    top: 0;
    animation: fade-in ease-in-out 2.5s reverse;
    a{
      opacity: 0;
    }
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
