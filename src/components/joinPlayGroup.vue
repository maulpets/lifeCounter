<template>
  <transition name="fade-in" mode="out-in">
  <div class="join-playgroup-page">
    <v-container>
      <v-layout row wrap class="join-playgroup-form-wrapper">
        <v-flex xs12>
          <h1>Search Groups</h1>

          <v-form action="index.html" method="post" @submit.prevent="searchGroups">
            <v-text-field
            v-model="playGroupID"
            class="input-field"
            id="searchPlayGroups"
            label="Play Group ID"
            required>
            </v-text-field>
            <v-btn flat type="submit" >search</v-btn>
          </v-form>

          <div class="player-list-wrapper"  v-if="">
            <v-layout row align-center class="player-list-header" >
              <v-flex xs6 class="pa-2 player-list player-name" >
                Player Name
              </v-flex>
              <v-flex xs2>
                Wins
              </v-flex>
              <v-flex xs4>
              </v-flex>
            </v-layout>
            <v-layout row v-if="" v-for="player in livePlayerList" v-bind:key="player['.key']" align-center class="player-list" >
              <v-flex xs6 class="pa-2 player-list player-name" >
                {{player.name}}
              </v-flex>
              <v-flex xs2>
                {{player.wins}}
              </v-flex>
              <v-flex xs4>
                <v-btn flat v-if="!player.id"> claim</v-btn>
              </v-flex>
            </v-layout>
          </div>



        </v-flex>
      </v-layout>
    </v-container>
  </div>
</transition>
</template>

<script>
import firebase from 'firebase'
import {db} from '../firebase'

export default {
  name: 'joinPlayGroup',
  data: function () {
    return{
      playGroupID: '0ysi3in0j'
    }
  },
  firebase: function () {
    return {
      livePlayerList: db.ref('playgroups/'+ this.playGroupID + '/playerList/')
    }
  },
  computed: {
    user (){
      return this.$store.getters.user
    }
  },
  watch: {
    user (value){
      if (value !== null && value !== undefined){
        this.$router.push('/')
      }
    }
  },
  methods: {
    onLogin () {
      this.$store.dispatch('loginUser', {email: this.email, password: this.password});
    }
  }
}
</script>

<style scoped lang="scss">
.join-playgroup-page{
  height: 100%;
  width: 100%;

  .join-playgroup-form-wrapper{
    margin: auto;
    form{
      display: flex;
    }
  }

  .player-list-wrapper{
      font-size: 1.3em;

    .player-list-header{
      font-weight: 500;
    }
    .player-list{
      .player-name{
        font-size: 1.4em;
        font-weight: 200;
      }
    }
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
