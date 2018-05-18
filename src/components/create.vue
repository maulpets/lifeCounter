<template lang="html">
<transition name="fade-in">
  <div class="game-setup">
    <!-- <h1>add players</h1> -->
    <div class="game-id">
      <h2>game id: <span id="gameID">{{gameInfo.id}}</span></h2>
    </div>

    <!-- <div class="player-list-wrapper">
      <h3 id="playerID">Players</h3>
      <ul class="player-list">
        <li v-for="player of playerList" v-bind:key="player['.key']" >{{player.name}}</li>
      </ul>
      <div class="input-field">
        <input v-model="playerName" placeholder="player name"></input>
        <md-button class="" @click="addPlayer">add</md-button>
      </div>
    </div> -->
    <div class="game-setup-wrapper">
      <div class="game-setup-player-count">
        <h1>players</h1>
        <ul class="player-count-select">
          <li v-for="option in playerCountOptions" v-bind:class="{ 'is-selected': playerCount(option) }" v-on:click="addPlayers(option)">{{option}}</li>
        </ul>
      </div>
    </div>

    <nav>
      <router-link class="back-button" to="/">Back</router-link>
      <router-link class="start-game-button" to="/scoreboard">start</router-link>
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
      playerName: '',
      activePlayers: 0,
      playerCountOptions: [2,3,4,5,6]
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
    addPlayers: function(number) {
        console.log(this.$store.state.gameInfo.id)
        this.activePlayers = number;
        db.ref('games/'+ this.$store.state.gameInfo.id).set({activePlayers: number})
          db.ref('games/'+ this.$store.state.gameInfo.id + '/playerList/' + this.playerName).set({name: this.playerName + number, life: 40, sideCounter1: 0, sideCounter2: 0, sideCounter3: 0});
          this.playerName = '';
    },
    playerCount: function(number){
      return number == this.activePlayers
    }
  }
}
</script>

<style scooped lang="scss">
  .game-setup{
    width: 100%;
    min-height: 100%;
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
    .game-id{
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      padding: 0 1em;
      h2{
        font-weight: 200;
        span{
          font-weight: 400;
        }
      }
    }
    .game-setup-wrapper{
      display: flex;
      flex-flow: column;
      position: relative;
      margin: 1em 0 0 0;
      h1{
        color: #282a2e;
        font-size: 15vw;
        line-height: .52em;
        text-align: right;
        margin: 0 0 .5em;
      }
      .game-setup-player-count{
        .player-count-select{
          display: flex;
          justify-content: space-around;
          font-size: 8vw;
          font-weight: 700;
          color: rgba(155,157,160,1);
          .is-selected{
            color: white;
          }
        }


      }
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
