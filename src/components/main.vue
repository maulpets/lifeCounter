
<template>
<transition name="slide">
  <div class="title-screen">
          <div class="" style="position:absolute; right:0; padding: .5em; opacity: .3; font-size:1em;">
            <h3 style="text-align:right">{{userInfo.name}}</h3>
            <ul v-if="hasPlayGroup">
              <li  v-for="group in playGroups" :key="group['.key']">{{group.name}} - {{group['.key']}} </li>
            </ul>
          </div>
    <v-container class="title-wrapper" pa-1>
      <v-layout row class="title-text">
        <h1>The<br>Life Counter</h1>
      </v-layout>
<!--
      <v-flex style="width:100%">
        <v-layout row wrap v-for="game in activeGames" :key="game['.key']" ma-1>
          <v-flex xs12>
            <h3 >{{game.playgroupName}}</h3>
          </v-flex>
          <v-flex xs4 v-for="player in game.players" :key="player['.key']">
              {{player}}
          </v-flex>


          <v-flex xs12 pa-3>
            <v-btn block small color="primary" v-on:click="connectToGame(game)">
              join game : {{game.id}}
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex> -->


        <transition name="phade" mode="in-out">
        <div class="phade" style="width:100%">
        <v-container class="title-menu" >

          <v-layout row wrap  class="user-playgroup-menu">


            <!-- <v-flex xs12 class="create-playgroup user-option">
              <router-link to="/newPlayGroup"  v-on:click.native="createPlayGroup">create play group</router-link>
            </v-flex>
            <v-flex xs12 class="join-playgroup user-option">
              <v-btn @click="loadAllPlayGroups">test</v-btn>
              <router-link to="/joinPlayGroup">join play group</router-link>
            </v-flex> -->
            <v-flex xs12 class="join-playgroup user-option">
              <router-link to="/playgroups">playgroups</router-link>
            </v-flex>
            <!-- <v-flex xs12 class="user-create-game user-option">
              <router-link to="/newGame"  v-on:click.native="startGame">create game</router-link>
            </v-flex> -->
            <v-flex xs12 class="join-game user-option">
              <router-link to="/manageGames">games</router-link>
            </v-flex>


          </v-layout>

        </v-container>
        </div>
        </transition>
      </v-container>

  </div>
</transition>
</template>


<script>
import firebase from 'firebase'
import {db} from '../firebase'
import {gameDefaults} from '../defaults'



export default {
  name: 'splashscreen',
  components: {

  },
  firebase: function () {
    return {
      playGroups: db.ref('users/' + firebase.auth().currentUser.uid + '/playgroups/' ),
      activeGames: db.ref('users/' + firebase.auth().currentUser.uid + '/activeGames/' )
    }
  },
  data: function(){
    return {
      gameID: '',
     }
  },
  computed: {
    hasPlayGroup (){
      return this.$store.getters.playgroups !== null && this.$store.getters.playgroups !== undefined
    },
    userInfo (){
      return this.$store.getters.user
    }
  },
  watch: {
//CHANGE FIREBASE TO BIND TO OBJ THEN WATCH OBJECT
    playgroupData: {
      handler:  function(newValue, oldValue){
        console.log("test")
      },
      deep: true
    }
    // hasPlayGroup (value){
    //   if (value){
    //     this.$router.push('/newPlayGroup')
    //   }
    // }
  },
  methods: {
    startGame: function() {
      // this.$store.dispatch('createGame')
    },
    createPlayGroup: function(){
      this.$store.dispatch('createPlayGroup')
        .then( this.$router.push('/newPlayGroup') )

    },
    loadAllPlayGroups: function(){
      const myPlayGroups = this.playgroupData
      delete myPlayGroups['.key']
      console.log(myPlayGroups)
      this.$store.dispatch('allPlayGroups', myPlayGroups)

    }

    // connectToGame: function(gameData){
    //   console.log(gameData)
    //   this.$store.dispatch('connectToGame', gameData)
    // }
  },
  mounted(){

    this.$bindAsObject('playgroupData', db.ref('users/'+ firebase.auth().currentUser.uid + '/playgroups/'))
          // this.$store.dispatch('clearGame')
          // this.$store.dispatch('clearActivePlayGroup')
          // this.$store.dispatch('clearActivePlayGroupName')
  }



}
</script>

<style scoped lang="scss">

.title-screen{
  background-color: #282a2e;
  height: 100%;
  overflow: hidden;
  .title-wrapper{
    width: 67vw;
    min-height: 100vh;
    margin-left: 33vw;
    text-align: left;
    background-color: #373b41;
    display: flex;
    flex-flow: column;
      .title-text{
        width: 100%;
        h1{
          margin: auto 1vw;
          line-height: 1.01em;
          letter-spacing: .025em;
          font-size: 9vw;
          opacity: .8;
        }
      }
    .title-menu{
      display: block;
      margin: auto 0;
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
