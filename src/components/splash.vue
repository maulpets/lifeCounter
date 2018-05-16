<template lang="html">
  <div class="title-screen">
    <div class="title-menu">
      <h1>The<br>Life Counter</h1>
      <nav>
          <router-link to="/play"  v-on:click.native="startGame">create game</router-link>
          <a href="#">join game</a>
      </nav>
    </div>
  </div>
</template>
<script>
import {db} from '../firebase'
import {games} from '../firebase'
import {gameDefaults} from '../defaults'

export default {
  name: 'splashscreen',
  data: function(){
    return { }
  },
  methods: {
    startGame: function() {

        const newGameID = games.push().key;
        console.log(newGameID)
        // window.location.hash = 'play#' + newGameID;
        db.ref('games/' + newGameID ).set(gameDefaults);
        const gameInfo = {id: newGameID }
        console.log(gameInfo)
        console.log("startgame")
        this.$store.dispatch('changeGame', gameInfo);
    }
  }
}
</script>

<style scooped lang="scss">
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
