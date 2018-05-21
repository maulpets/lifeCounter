<template>
  <transition name="fade-in" mode="out-in">
  <div class="join-game-page">
    <v-container>
      <v-layout row wrap class="join-game-form-wrapper">
        <v-flex xs8 offset-xs2  >
          <h1>join active game</h1>
          <v-form action="index.html" method="post" @submit.prevent="onConnect">
          <v-text-field
          v-model="gameID"
          class="input-field"
          id="gameID"
          label="gameID"
          required>
          </v-text-field>
          <v-btn flat type="submit" >connect</v-btn>
          <v-btn flat @click="joinableGames" >connect</v-btn>
        </v-form>
        </v-flex>
      </v-layout>


<v-layout row v-for="allGroups in activeGroups" v-bind:key="allGroups['.key']">
  {{allGroups.activeGame}}
</v-layout>
      <!-- <v-layout row v-for="allGroups in activeGroups" v-bind:key="allGroups['.key']">
        <v-flex v-for="groups in playGroups">
        {{groups.id}}

          <v-flex v-if="allGroups['.key'] = groups.id">
            {{allGroups.activeGame}}
        {{allGroups}}
          </v-flex>
        </v-flex>
      </v-layout> -->

    </v-container>
  </div>
</transition>
</template>

<script>
import firebase from 'firebase'
import {db} from '../firebase'

export default {
  name: 'join',
  firebase: function () {
    return {
      activeGroups: db.ref( 'playgroups')
    }
  },
  data: function () {
    return{
      gameID: '',
      gamelist: []
    }
  },
  computed: {
    loadedGame (){
      return this.$store.getters.loadedGame
    },
    playGroups (){
      return this.$store.getters.playgroups
    }
    // allGroups(){
    //     return this.$firebaseRefs.activeGroups
    // }

  },
  watch: {
    playGroups (value){

    }
  },
  methods: {
    joinableGames(){
      //
      // let data;
      // db.ref().child('playgroups').once('value')
      // .then(function(snap){
      //   data = snap.val();
      //
      //   console.log(data)
      //   })


    }
  }
}
</script>

<style scoped lang="scss">
.join-game-page{
  height: 100%;
  width: 100%;
  display: flex;

  .join-game-form-wrapper{
    margin: auto;
  }
}



.fade-in-enter-active {
  animation: fade-in ease-in-out 1.5s ;
}
.fade-in-leave-active {
  animation: fade-in ease-in-out 1.5s reverse;
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
