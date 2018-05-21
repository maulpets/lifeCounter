<template>
  <transition name="fade-in" mode="out-in">
  <div class="join-playgroup-page">


          <v-container class="join-playgroup-form-wrapper">
            <v-layout row>
              <v-flex xs12>
                <!-- <h3 style="text-align:left; margin-bottom:5px;" >Search Groups</h3> -->
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
              </v-flex>

            </v-layout>
          </v-container>

          <v-fade-transition>
            <v-container class="player-list-wrapper" v-show="displayResults">
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

              <v-layout row  v-for="(player, playerKey) in playerList" align-center class="player-list"  v-bind:class="{ 'is-selected': isClaimed(playerKey) }"  >
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
            </v-container>
          </v-fade-transition>

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

      <v-container>
        <v-layout row justify-space-between class="menu" pa-3>
          <v-flex xs6>
            <router-link class="back-button" to="/"> <v-btn flat> back</v-btn></router-link>
          </v-flex>
          <v-flex xs6>
            <router-link class="create-game-button" to="/" v-on:click.native="joinGroup(playGroupID)"><v-btn>join</v-btn></router-link>
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
  name: 'joinPlayGroup',
  data: function () {
    return{
      displayResults: false,
      playGroupID: 'aj05730m1',
      dialog: false,
      requestClaimKey: '',
      claimConfirmed: false,
      headers: [
        {
          text: 'player name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'wins' }
      ]

    }
  },
  firebase: function () {

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
  watch: {
    // user (value){
    //   if (value !== null && value !== undefined){
    //     this.$router.push('/')
    //   }
    // }
  },
  methods: {
    searchGroups () {
      this.displayResults = false;
      this.$store.dispatch('loadPlayGroup', this.playGroupID)
      .then(() => this.displayResults = true)
    },
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
      &.is-selected{
        color: #00897B;
        font-weight: 400;
        .claim-button{
          opacity: 0;
          color: #00897B;
        }
      }
    }
  }
}
  .menu{
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  //
  // .confirm-claim-wrapper{
  //   background-color: red;
  //   background: red;
  // }

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
