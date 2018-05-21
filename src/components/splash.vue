
<template>
<transition name="slide">
  <div class="title-screen">
    <div class="title-wrapper">
      <div class="" style="position:absolute; right:0; padding: .5em; opacity: .3; font-size:2em;"v-if="userIsLoggedIn">
        <h3>{{userInfo.name}}</h3>
      </div>
      <h1>The<br>Life Counter</h1>

      <transition name="phade" mode="in-out">
      <div class="phade">


      <v-container class="title-menu" >


          <v-layout row wrap v-if="!userIsLoggedIn" class="user-login-menu">
            <v-flex xs12 class="user-sign-in user-option">
              <router-link to="/login">login</router-link>
            </v-flex>
            <v-flex xs12 class="user-sign-up user-option">
              <router-link to="/signup">sign up</router-link>
            </v-flex>
          </v-layout>

<!-- v-if="userIsLoggedIn && !hasPlayGroup" -->
        <v-container v-if="userIsLoggedIn">
          <v-layout row wrap  class="user-playgroup-menu">
            <v-flex xs12 class="create-playgroup user-option">
              <!-- <a v-on:click="createPlayGroup">create play group</a> -->
              <router-link to="/newPlayGroup"  v-on:click.native="createPlayGroup">create play group</router-link>
            </v-flex>
            <v-flex xs12 class="join-playgroup user-option">
              <router-link to="/joinPlayGroup">join play group</router-link>
            </v-flex>
          </v-layout>

<!-- v-if="hasPlayGroup && userIsLoggedIn" -->
          <v-layout row wrap class="game-">
            <v-flex xs12 class="user-create-game user-option">
              <router-link to="/create"  v-on:click.native="startGame">create game</router-link>
            </v-flex>
            <v-flex class="user-join-game user-option">
              <router-link to="/join">join game</router-link>
            </v-flex>
          </v-layout>
        </v-container>

      </v-container>
      </div>
      </transition>

    </div>
  </div>
</transition>
</template>

<!-- <v-flex class="user-join-game user-option"  v-if="joinning">
  <div class="input-field">
    <input v-model="gameID" placeholder="enter game id"></input>
  </div>

  <div @click="enterGameID" class="close-join-game">
    <v-icon>close</v-icon>
  </div>
  <router-link to="/remote"  style="position:absolute"v-on:click.native="joinGame(gameID)" class="join-game-button" v-if="joinning" >connect</router-link>
</v-flex>

<v-flex xs12 class="user-create-game user-option">
  <a @click="enterGameID" >join game</a>
</v-flex>
 -->

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
      gameID: ''
     }
  },
  computed: {
    userIsLoggedIn (){
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    hasPlayGroup (){
      return this.$store.getters.playgroups !== null && this.$store.getters.playgroups !== undefined
    },
    userInfo (){
      return this.$store.getters.user
    }
  },
  watch: {
    // hasPlayGroup (value){
    //   if (value){
    //     this.$router.push('/newPlayGroup')
    //   }
    // }
  },
  methods: {
    startGame: function() {
        this.$store.dispatch('createGame');
    },
    createPlayGroup: function(){
        this.$store.dispatch('createPlayGroup');
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
  .title-wrapper{
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
    .title-menu{
      display: block;
      margin: auto 0 15vh 0;
      flex: none;
      .user-option{
        text-align: right;
        padding: 1em;
        font-size: 1.3em;
      }
    }
  }
}




.slide-enter-active {
  animation: slide-in ease-in-out 1.5s ;
  .phade{
    animation: phade-in ease-in-out 1.5s ;
  }

}
.slide-leave-active {
  animation: slide-in ease-in-out 1.5s reverse;
  .phade{
    animation: phade-in ease-in-out 1.5s reverse;
  }
}
@keyframes slide-in {
  0% {
    position: absolute;
    top: 0;
    transform: translateX(-100vw);

  }

  100% {
    position: absolute;
    top: 0;
    transform: translateX(0vw);
  }
}
@keyframes phade-in {
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

</style>
