<template>
  <div class="scoreboard">
    <div class="title-bar">
      <h2>Game ID: <span id="gameID">{{gameInfo.id}}</span></h2>
    </div>

    <div class="player-card-wrapper">
      <div class="player-card" v-for="player of playerList" v-bind:key="player['.name']" >
        <ul>
          <li><div class="player-name"> {{player.name}}
          </div></li>
          <li class="life-counter">
            <div class="left-side-button" @click="add(player, 1, 'life')"></div>
            <div class="left-floating-button" @click="add(player, 5, 'life')"> <md-icon>add</md-icon> </div>
            <div class="life-total"> {{player.life}} </div>
            <div class="right-floating-button" @click="subtract(player, 5, 'life')"> <md-icon>remove</md-icon> </div>
            <div class="right-side-button" @click="subtract(player, 1, 'life')"></div>
          </li>
          <ul class="side-counters">
            <li>
              <div class="" @click="add(player, 1,'sideCounter1')"><md-icon>add</md-icon></div>
              <p>{{player.sideCounter1}}</p>
              <div class="" @click="subtract(player, 1,'sideCounter1')"><md-icon>remove</md-icon></div>
            </li>
            <li>
              <div class="" @click="add(player, 1,'sideCounter2')"><md-icon>add</md-icon></div>
              <p>{{player.sideCounter2}}</p>
              <div class="" @click="subtract(player, 1,'sideCounter2')"><md-icon>remove</md-icon></div>
            </li>
            <li>
              <div class="" @click="add(player, 1,'sideCounter3')"><md-icon>add</md-icon></div>
               <p>{{player.sideCounter3}}</p>
              <div class="" @click="subtract(player, 1,'sideCounter3')"><md-icon>remove</md-icon></div>
            </li>

          </ul>
        </ul>
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
      playerList:   db.ref('games/'+ this.$store.state.gameInfo.id + '/playerList/')
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
      db.ref('games/'+ this.$store.state.gameInfo.id + '/playerList/' + player.name ).child(valueToChange).set(newValue)
    },
    subtract: function (player, amountToChange, valueToChange){
      const newValue = player[valueToChange] - amountToChange;
      db.ref('games/'+ this.$store.state.gameInfo.id + '/playerList/' + player.name ).child(valueToChange).set(newValue)
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
  flex-flow: column;
  justify-content: space-around;
}

.player-card{
  width: 100%;
  height: 100px;
  position: relative;
  background-color: rgba(255,255,255,.1);

  ul{
    display: flex;
    flex-flow: row;
    text-align: center;

    .player-name{
      text-align: center;
      padding: .5em;
      font-size: 2em;
      font-weight: 300;
    }

    .life-counter{
      margin: auto;
      padding: 1em;
      display: flex;
      align-items: center;

      .left-floating-button{
        z-index: 5;
        background-color: rgba(255,255,255,.2);
        padding: .2em;
        font-weight: 600;
      }
      .right-floating-button{
        z-index: 5;
        background-color: rgba(255,255,255,.2);
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

  .side-counters{
    display: flex;
    flex-flow: row;
    justify-content: space-around;
    position: absolute;
    opacity: .4;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
    li{
      align-items: center;
      display: flex;
      p {
        font-size: 25px;

      }
      i{
        font-size: 15px !important;
      }
    }
  }



  }
}

</style>
