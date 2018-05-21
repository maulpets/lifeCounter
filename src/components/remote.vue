<template>
  <div class="scoreboard">
    <div class="title-bar">
      <h2>Game ID: <span id="gameID">{{gameInfo.id}}</span></h2>
    </div>

    <div class="player-card-wrapper">
      <div class="player-card" v-for="player of playerList" v-bind:key="player['.name']" >
        <div class="player-name"> {{player.name}}</div>

        <div class="life-counter">
          <div class="left-side-button" @click="add(player, 1, 'life')"></div>
          <div class="left-floating-button" @click="add(player, 5, 'life')"> <v-icon>add</v-icon> </div>
          <div class="life-total"> {{player.life}} </div>
          <div class="right-floating-button" @click="subtract(player, 5, 'life')"> <v-icon>remove</v-icon> </div>
          <div class="right-side-button" @click="subtract(player, 1, 'life')"></div>
        </div>

        <div class="side-counter-wrapper">
          <div class="side-counter" v-bind:class="{ 'is-counting': isCounting(player, 'sideCounter1') }">
            <div class="" @click="add(player, 1,'sideCounter1')" ><v-icon>add</v-icon></div>
            <p>{{player.sideCounter1}}</p>
            <div class="" @click="subtract(player, 1,'sideCounter1')"><v-icon>remove</v-icon></div>
          </div>
          <div class="side-counter" v-bind:class="{ 'is-counting': isCounting(player, 'sideCounter2') }">
              <div class="" @click="add(player, 1,'sideCounter2')"><v-icon>add</v-icon></div>
              <p>{{player.sideCounter2}}</p>
              <div class="" @click="subtract(player, 1,'sideCounter2')"><v-icon>remove</v-icon></div>
          </div>
          <div class="side-counter" v-bind:class="{ 'is-counting': isCounting(player, 'sideCounter3') }">
            <div class="" @click="add(player, 1,'sideCounter3')"><v-icon>add</v-icon></div>
             <p>{{player.sideCounter3}}</p>
            <div class="" @click="subtract(player, 1,'sideCounter3')"><v-icon>remove</v-icon></div>
          </div>
        </div>
      </div>
    </div>



  </div>
</template>


<script>
import firebase from 'firebase'
import {db} from '../firebase'


export default {
  name: 'remote',
  data: function() {
    return {
      playerName: ''
    }
  },
  firebase: function () {
    return {
      playerList:   db.ref('games/'+ this.$store.getters.loadedGame.id + '/players/')
    }
  },
  computed: {
    gameInfo () {
      return this.$store.getters.loadedGame
    }
  },
  methods: {
    add: function( player, amountToChange, valueToChange ) {
      const newValue = player[valueToChange] + amountToChange;
      db.ref('games/'+ this.$store.state.gameInfo.id + '/players/' + player.name ).child(valueToChange).set(newValue)
    },
    subtract: function (player, amountToChange, valueToChange){
      const newValue = player[valueToChange] - amountToChange;
      db.ref('games/'+ this.$store.state.gameInfo.id + '/players/' + player.name ).child(valueToChange).set(newValue)
    },
    isCounting: function (player, valueThatsCounting){
      return player[valueThatsCounting] > 0;
    }


  }
}
</script>


<style scoped lang="scss">
.title-bar {
  background-color: rgba(96,145,129,1);
  padding: 1em;
  h2{
    margin: 0;
  }
}
.player-card-wrapper{
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.player-card{
  width: 100%;
  height: 150px;
  position: relative;
  display: flex;

  .player-name{
    text-align: center;
    padding: .5em;
    font-size: 2em;
    font-weight: 300;
    position: absolute;
  }

  .life-counter{
    margin: auto;
    padding: 1em;
    display: flex;
    align-items: center;
    height: auto;
    width: auto;

    .left-floating-button{
      z-index: 5;
      padding: .2em;
      font-weight: 600;
    }
    .right-floating-button{
      z-index: 5;
      padding: .2em;
      font-weight: 600;
    }

    .left-side-button{
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      right: 50%;
      z-index: 1;
    }


    .right-side-button{
      position: absolute;
      right: 0;
      bottom: 0;
      top: 0;
      left: 50%;
      z-index: 1;
    }

    .life-total{
      font-size: 15vw;
      padding: 5px;
    }
  }


  .side-counter-wrapper{
    display: flex;
    flex-flow: column;
    z-index: 5;
    align-items: flex-end;
    .side-counter{
      display: flex;
      align-items: center;
      opacity: .3;
      &.is-counting{
        opacity: 1;
      }
      }

        p {
          font-size: 25px;

        }
        i{
          font-size: 15px !important;
        }
      }
    }


</style>
