
<template>
<transition name="slide">
  <div class="title-screen">
    <div class="title-wrapper">
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
          <v-layout row wrap v-if="userIsLoggedIn" class="user-login-menu">
            <v-flex xs12 class="user-sign-in user-option">
              <router-link to="/main">home</router-link>
            </v-flex>
          </v-layout>

      </v-container>
      </div>
      </transition>

    </div>
  </div>
</transition>
</template>

<script>
import firebase from 'firebase'
import {db} from '../firebase'
import {gameDefaults} from '../defaults'
import signup from './signup.vue'

export default {
  name: 'splashscreen',
  components: {

  },
  firebase: function () {
  },
  data: function(){
    return {
      gameID: ''
     }
  },
  computed: {
    userIsLoggedIn (){
      return this.$store.getters.user
    }
  },
  watch: {
    userIsLoggedIn (value){
      if (value !== null && value !== undefined){
        this.$router.push('/main')
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">

.title-screen{
  background-color: #282a2e;
  height: 100%;
  width: 100%;

  .title-wrapper{
    width: 66vw;
    min-height: 100vh;
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
        font-size: 1.1em;
      }
    }
  }
}

ul{
  list-style: none;
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
