<template>
<transition name="fade-in" mode="out-in">
    <v-container class="player-list-wrapper" ma-0 pa-0>
      <v-layout row>
        <v-flex xs12>
          <h1>{{playGroupName}}</h1>
        </v-flex>
      </v-layout>
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

      <v-layout row  v-for="(player, playerKey) in playerList" :key="player.id" align-center class="player-list"  v-bind:class="{ 'is-selected': isClaimed(playerKey) }"  >
        <v-flex xs6 class="pa-2 player-list player-name" >
          {{player.name}}
        </v-flex>
        <v-flex xs2>
          {{player.wins}}
        </v-flex>
        <v-flex xs4>
          <v-btn flat v-if="player.temp" @click.stop="claimConfirmed = false; dialog = true; requestClaimKey = playerKey;" class="claim-button"> claim</v-btn>
        </v-flex>
      </v-layout>

      <v-layout pt-3>
        <v-flex xs8 offset-xs2>
          <v-btn style="width: 100%"  v-on:click.native="joinGroup">join group</v-btn>
        </v-flex>
      </v-layout>

     <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
        >
        <v-card style="background-color:#282a2e">
        <v-container fill-height>
          <v-layout row justify-center>
            <v-flex style="margin: auto">
              <h1>woah. are you sure that you are {{requestedPlayer}} ?</h1>
              <v-flex>
              <v-btn flat  @click.stop="claimConfirmed = true; dialog = false;"> YES</v-btn>
              <v-btn flat style="text-transform:lowercase; font-weight:300;"  @click.stop="dialog = !dialog; requestClaimKey = ''; claimConfirmed = false;"> nevermind</v-btn>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-container>
        </v-card>
      </v-dialog>

    </v-container>
</transition>
</template>

<script>
import firebase from 'firebase'
import {db} from '../../firebase'
import topWinners from './wins.vue'

export default {
  name: 'playGroupSearchResults',
  components:{
    'top-winners': topWinners
  },
  data: function(){
    return{
      dialog: false,
      requestClaimKey: '',
      claimConfirmed: false,
    }
  },
  computed: {
    playerList (){
      return this.$store.getters.playerList
    },
    playGroupName (){
      return this.$store.getters.activePlayGroupName
    },
    requestedPlayer(){
      if(this.requestClaimKey){
        return this.playerList[this.requestClaimKey].name
      } else return ''
    }
  },
  methods: {
    isClaimed(playerKey){
      return this.claimConfirmed && playerKey == this.requestClaimKey
    },
    joinGroup() {
      const joinConfig = {
        replacePlayer: this.claimConfirmed && this.requestClaimKey,
        requestedPlayerID: this.requestClaimKey
      }
      this.$store.dispatch('joinPlayGroup', joinConfig)
    }
  },

  beforeMount(){
      this.$bindAsObject('groupData', db.ref('playgroups/'+ this.playGroupSearchInput), () => console.log("data ready"))
  },

}
</script>

<style scoped lang="scss">
.fade-in-enter-active {
  animation: fade-in ease-in-out 1.5s ;
}
.fade-in-leave-active {
  position: absolute;
  top: 0;
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
