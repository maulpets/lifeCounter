<template lang="html">
  <div class="title-screen">
    <div class="title-menu">
      <h1>The<br>Life Counter</h1>
      <nav>
          <router-link to="/create"  v-on:click.native="startGame">create game</router-link>
          <a @click="joinning=true">join game</a>

          <div class=""  v-if="joinning">
            <md-field>
              <label>Game ID</label>
              <md-input v-model="gameID"></md-input>
              <md-button><router-link to="/remote"  v-on:click.native="joinGame(gameID)">join game</router-link> </md-button>
            </md-field>
          </div>

      </nav>
    </div>
  </div>
</template>
<script>
import {db} from '../firebase'
import {game} from '../firebase'
import {gameDefaults} from '../defaults'

export default {
  name: 'splashscreen',
  data: function(){
    return {
      joinning: false,
      gameID: ''
     }
  },
  methods: {
    startGame: function() {
      console.log(game)
        const newGameID = db.ref('games/').push().key;
        db.ref('games/' + newGameID ).set(gameDefaults);
        const gameInfo = {id: newGameID }
        console.log(newGameID)
        this.$store.dispatch('changeGame', gameInfo);
    },
    joinGame: function(gameID){
      const gameInfo = {id: gameID }
      this.$store.dispatch('changeGame', gameInfo);
    }
  }
}
</script>

<style scoped lang="scss">
.title-screen{
  background-color: rgba(96,145,129,1);
  height: 100vh;
  width: 100vw;
  .title-menu{
    width: 66vw;
    height: 100vh;
    margin-left: 34vw;
    text-align: left;
    background: black;
    display: flex;
    flex-flow: column;
    h1{
      margin: 25vh 1vw auto;
      line-height: 1.01em;
      letter-spacing: .025em;
      font-size: 10vw;
    }
    nav{
      display: flex;
      flex-flow:column;
      // margin-bottom: 10vh;
      width: 100%;
      a{
        color:rgb(96,168,168);
        display: block;
        width: 100%;
        text-align: right;
        padding: 4vh 1em;
        background-color: rgba(255,255,255,.1);
      }
    }
  }
}

</style>
