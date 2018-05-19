<template>
  <transition name="fade-in" mode="out-in">
  <div class="new-playgroup-page">
    <v-container>
      <v-layout row wrap class="new-playgroup-form-wrapper">
        <v-flex xs12  >
          <h1>Players</h1>
          <v-flex v-if="" v-for="player in livePlayerList" v-bind:key="player['.key']" >
            {{player.name}}
          </v-flex>

          <v-form action="index.html" method="post" @submit.prevent="addPlayer">
            <v-text-field
            v-model="playerName"
            class="input-field"
            id="playerName"
            label="player name"
            required>
            </v-text-field>
            <v-btn flat type="submit" >add</v-btn>
          </v-form>
        </v-flex>
      </v-layout>

      <v-layout row justify-space-between class="menu">
        <v-flex xs6>
          <router-link class="back-button" to="/">Back</router-link>
        </v-flex>
        <v-flex xs6>
          <router-link class="create-game-button" to="/create">new game</router-link>
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
  name: 'newPlayGroup',
  data: function () {
    return{
      playerName: ''
    }
  },
  firebase: function () {
    return {
      livePlayerList: db.ref('playgroups/'+ this.$store.state.playgroups.active + '/playerList/')
    }
  },
  computed: {
    activePlayGroup (){
      return this.$store.getters.playgroups
    }
  },

  methods: {
    addPlayer() {
      const newPlayInfo = {
        name: this.playerName,
        wins: 0
      }
      this.$store.dispatch('addPlayerToGroup', newPlayInfo);
      this.playerName = ''
    }

  }
}
</script>

<style scoped lang="scss">
.new-playgroup-page{
  height: 100%;
  width: 100%;


  .new-playgroup-form-wrapper{
    margin: 0;
    form{
      display: flex;
    }

  }
  .menu{
    position: absolute;
    bottom: 0;
    width: 100%;
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
