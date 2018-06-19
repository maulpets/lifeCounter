<template>
  <transition name="fade-in" mode="out-in">
  <div class="new-playgroup-page">
    <v-container pa-0 class="new-playgroup-form-wrapper">
      <v-layout row wrap class="player-list-wrapper">

        <v-flex xs12 my-3>
         <h4>Players</h4>
        </v-flex>

        <v-flex xs12 v-for="(player, playerID) in playerList"  align-center class="player-list" :key="player.id" mb-2>
          <v-flex class="pa-2 player-list player-name" >
            {{player.name}}
          </v-flex>
          <!-- <v-flex xs6>
            {{player.wins}}
          </v-flex> -->
          <v-flex xs3>
            <v-btn flat v-if="player.temp" @click.stop="removePlayer(playerID)" class="claim-button">remove</v-btn>
          </v-flex>
        </v-flex>

        <v-flex xs12>
          <v-form action="index.html" method="post" @submit.prevent="addPlayer">
            <v-text-field
            v-model="playerName"
            class="input-field"
            id="playerName"
            label="player name"
            required>
            </v-text-field>

            <v-btn type="submit" small >add</v-btn>
          </v-form>
        </v-flex>
        <v-flex xs12>
          <v-text-field
          v-model="groupName"
          class="input-field"
          id="groupName"
          label="Play Group Name"
          required>
          </v-text-field>
        </v-flex>
        <v-btn style="width:100%" mt-4 :disabled="playGroupName" @click="makePlayGroup" > Make group </v-btn>
      </v-layout>
    </v-container>
  </div>
</transition>
</template>


<script>
import firebase from 'firebase'
import {db} from '../../firebase'
import {playerDefaults} from '../../defaults'

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
      const newPlayGroup ={
        name:this.groupName,
        id: '' + this.activePlayGroup
      }

      console.log (newPlayGroup)
      this.$store.dispatch('makePlayGroup', newPlayGroup)
      this.$parent.$emit('makePlayGroup');
    }

  }
}
</script>

<style scoped lang="scss">
.new-playgroup-page{
  height: 100%;
  width: 100%;
  position: relative;

  .new-playgroup-form-wrapper{

  .player-list-wrapper{
      font-size: 1.3em;

    .player-list-header{
      font-weight: 500;
    }
    .player-list{
      display: inline-flex;
      .player-name{
        text-align: left;
        font-size: 1.1em;
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
