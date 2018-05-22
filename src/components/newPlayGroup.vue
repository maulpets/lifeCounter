<template>
  <transition name="fade-in" mode="out-in">
  <div class="new-playgroup-page">
    <v-container pa-0>
      <v-layout row wrap class="new-playgroup-form-wrapper">
        <v-flex xs12 sm10 offset-sm1 >

          <v-container pa-3>

            <v-layout row>
              <v-flex xs12>
               <h1>New Play Group</h1>
               <h3>group id: {{activePlayGroup}}</h3>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs12>
                <v-text-field
                v-model="groupName"
                class="input-field"
                id="groupName"
                label="Play Group Name"
                required>
                </v-text-field>
              </v-flex>
            </v-layout>

          </v-container>

          <v-container class="player-list-wrapper" pa-3>

            <v-layout row>
              <v-flex xs12>
               <h2>Players</h2>
              </v-flex>
            </v-layout>

            <v-layout row wrap v-for="(player, playerID) in playerList"  align-center class="player-list" :key="player.id" >

              <v-flex xs3 class="pa-2 player-list player-name" >
                {{player.name}}
              </v-flex>
              <v-flex xs6>
                {{player.wins}}
              </v-flex>
              <v-flex xs3>
                <v-btn flat v-if="player.temp" @click.stop="removePlayer(playerID)" class="claim-button">remove</v-btn>
              </v-flex>

            </v-layout>

            <v-layout row>
              <v-flex xs12>
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


          </v-container>

        </v-flex>
      </v-layout>


      <v-layout row justify-space-between class="menu" pa-3>
        <v-flex xs6>
          <router-link class="back-button" to="/main"><v-btn flat>back</v-btn></router-link>
        </v-flex>
        <v-flex xs6>
           <v-btn :disabled="playGroupName" @click="makePlayGroup" > Make group </v-btn>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</transition>
</template>

<script>
import firebase from 'firebase'
import {db} from '../firebase'
import {playerDefaults} from '../defaults'

export default {
  name: 'newPlayGroup',
  data: function () {
    return{
      playerName: '',
      groupName: '',
      claimPlayer: '',
      livePlayerList: []
    }
  },
  firebase: function () {
    return {

    }
  },
  computed: {
    activePlayGroup (){
      return this.$store.getters.activePlayGroup
    },
    playerList (){
      return this.$store.getters.playerList
    },
    playGroupName(){
      if( this.$data.groupName !== '' )
      return false
      else
      return true
    }
  },

  methods: {
    addPlayer() {
      const newPlayerInfo = {
        ...playerDefaults,
        name: this.playerName,
      }
      this.$store.dispatch('addPlayerToGroup', newPlayerInfo )
      this.playerName = ''
    },
    removePlayer(playerID){
      this.$store.dispatch('removePlayerFromGroup', playerID )
    },
    makePlayGroup(){
      const groupName = this.groupName
      this.$store.dispatch('makePlayGroup', groupName)
      .then(this.$router.push('/main'))
    }

  }
}
</script>

<style scoped lang="scss">
.new-playgroup-page{
  height: 100%;
  width: 100%;


  .new-playgroup-form-wrapper{

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
    margin: 0;
    form{
      display: flex;
    }

  }
  .menu{
    position: absolute;
    bottom: 0;
    width: 100%;
    .create-group{
      color: inherit;
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
