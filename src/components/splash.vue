
<template lang="html">
<transition name="slide">
  <div class="title-screen">
    <div class="title-menu">
      <h1>The<br>Life Counter</h1>
      <nav>
          <router-link to="/create"  v-on:click.native="startGame">create game</router-link>

          <transition name="slide-up">
          <div class="join-game"  v-if="joinning">
            <md-field>
              <label>Game ID</label>
              <md-input v-model="gameID"></md-input>
            </md-field>
            <div class="join-game-button">
              <router-link to="/remote"  v-on:click.native="joinGame(gameID)"><md-icon>send</md-icon></router-link>
            </div>
          </div>
          </transition>

        <a @click="joinning = !joinning">join game</a>
      </nav>
    </div>
  </div>
</transition>
</template>
<script>
import {db} from '../firebase'
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
        const newGameID = db.ref('games/').push().key;
        db.ref('games/' + newGameID ).set(gameDefaults);
        const gameInfo = {id: newGameID }
        this.$store.dispatch('changeGame', gameInfo);
    },
    joinGame: function(gameKey){
      const gameInfo = {id: gameKey }
      this.$store.dispatch('changeGame', gameInfo);
    }
  }
}
</script>

<style scoped lang="scss">

.title-screen{
  background-color: #282a2e;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: 1000;
  .title-menu{
    width: 66vw;
    height: 100vh;
    margin-left: 34vw;
    text-align: left;
    background-color: #373b41;
    display: flex;
    flex-flow: column;
    h1{
      margin: 25vh 3vw auto;
      line-height: 1.01em;
      letter-spacing: .025em;
      font-size: 9vw;
      opacity: .8;
    }
    nav{
      display: flex;
      flex-flow:column;
      position: relative;
      overflow: hidden;
      // margin-bottom: 10vh;
      width: 100%;

      a{
        color:#00897B;
        display: block;
        width: 100%;
        text-align: right;
        padding: 4vh 1em;
        background-color: rgba(255,255,255,.025);
        z-index: 5;
      }
      .join-game{
        height: 85px;
        z-index: 1 !important;
        background-color: rgba(255,255,255,.025);
        a{
            background-color: rgba(255,255,255,.0);
        }
        .md-field{
          max-width: 60%;
          margin: 12px auto;
            label{
              right: 20px;
              text-align: right;
            }
            &:after{
              height: 0;
              right:15%;
            }
          }

          .join-game-button{
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            right: 0;
            margin: 0;

          }

      }
      .slide-up-enter-active {
        animation: slide-up ease-in-out 1s ;
          .md-field{
            animation:  fade-in ease-in-out 1s ;
          }
      }
      .slide-up-leave-active {
        animation: slide-up ease-in-out 1s reverse;
        .md-field{
          animation: fade-in ease-in-out 1s reverse ;

        }
      }
      @keyframes slide-up {
        0% {
          height: 0px;
        }

        100% {
          height: 85px;
        }
      }
      @keyframes fade-in {
        0% {
          opacity: 0;
        }
        50% {
          opacity: 0;
        }

        100% {
          opacity: 1;
        }
      }
    }
  }
}



.slide-enter-active {
  animation: slide-in ease-in-out 1.5s ;
    a{
      opacity: 0;
    }
}
.slide-leave-active {
  animation: slide-in ease-in-out 1.5s reverse;
  a{
    opacity: 0;
  }
}
@keyframes slide-in {
  0% {
    position: absolute;
    top: 0;
    transform: translateX(-100vw);
    z-index: 10;
  }

  100% {
    position: absolute;
    top: 0;
    transform: translateX(0vw);
  }
}

</style>
