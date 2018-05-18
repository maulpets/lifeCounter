
<template>
<transition name="slide">
  <div class="title-screen">
    <div class="title-menu">
      <h1>The<br>Life Counter</h1>

      <nav>
        <div class="" v-if="userIsLoggedIn">

          <router-link to="/create"  v-on:click.native="startGame">create game</router-link>

          <transition name="slide-up">
            <div class="join-game"  v-if="joinning">

              <div class="input-field">
                <input v-model="gameID" placeholder="enter game id"></input>
              </div>

              <div @click="enterGameID" class="close-join-game">
                <md-icon>close</md-icon>
              </div>
            </div>
          </transition>

          <transition name="fade-in">
            <router-link to="/remote"  style="position:absolute"v-on:click.native="joinGame(gameID)" class="join-game-button" v-if="joinning" >connect</router-link>
          </transition>

          <a @click="enterGameID" >join game</a>
        </div>

        <div class="" v-if="!userIsLoggedIn">
          <router-link to="/login">login</router-link>
          <router-link to="/signup">sign up</router-link>
        </div>


      </nav>
    </div>
  </div>
</transition>
</template>
<script>
import {db} from '../firebase'
import {gameDefaults} from '../defaults'
import signup from './signup.vue'

export default {
  name: 'splashscreen',
  components: {
    'signup': signup
  },
  data: function(){
    return {
      joinning: false,
      joinLabel: 'joing game',
      gameID: ''
     }
  },
  computed: {
    userIsLoggedIn (){
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userInfo (){
      return this.$store.getters.user
    }
  },
  methods: {
    startGame: function() {
        const newGameID = Math.random().toString(36).substr(2, 5);
        db.ref('games/' + newGameID ).set(gameDefaults);
        const gameInfo = {id: newGameID }
        this.$store.dispatch('changeGame', gameInfo);
    },
    joinGame: function(gameID){
      const gameInfo = {id: gameID }
      this.$store.dispatch('changeGame', gameInfo);
    },
    enterGameID: function (){
      this.$data.joinning = !this.$data.joinning;
      this.$data.gameID = '';
    }

  }
}
</script>

<style scoped lang="scss">

.title-screen{
  background-color: #282a2e;
  height: 100%;
  width: 100%;
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
        background-color: rgba(55, 59, 65, 1);
        z-index: 5;
      }
      .connect-to-game{
        position: absolute;
        bottom: 0;

      }
      .join-game{
        height: 85px;
        z-index: 1 !important;
        background-color:rgba(55, 59, 65, 1);
        position: relative;
        a{
            background-color:rgba(55, 59, 65, 1);
        }
        .input-field{
          width: 100%;
          margin: 12px auto;
          input{
            background-color: inherit;
            padding: 0;
            margin: 0;
            border: none;
            outline: none;
            text-align: right;
            padding: 4vh 1em;
            width: 100%;
            color: white;

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
      .join-game-button{
        z-index: 6;
        position: fixed;
        bottom: 0;
        background-color:rgba(55, 59, 65, 1);
        :hover{
          cursor: pointer;
        }
        .fade-in-enter-active {
          animation: fade-in ease-in-out 1s ;
        }
        .fade-in-leave-active {
          animation: fade-in ease-in-out 1s reverse;
        }

      }

      .close-join-game{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 5px;
        i{
          color: rgba(255,255,255,.125);
        }
      }
      .slide-up-enter-active {
        animation: slide-up ease-in-out 1s ;
          .input-field, .close-join-game{
            animation:  fade-in ease-in-out 1s ;
          }
      }
      .slide-up-leave-active {
        animation: slide-up ease-in-out 1s reverse;
        .input-field, .close-join-game{
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
