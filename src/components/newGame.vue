<template>
  <transition name="fade-in" mode="out-in">
  <div class="game-setup">
  <v-container >
    <v-flex xs12 sm8 offset-sm2>
    <!-- <v-layout v-for="group in playGroups" :key="group['.key']">
      <p>{{group.name}}</p>
    </v-layout> -->
    <v-layout>
      <v-flex>

        <v-select
        :items="playGroups"
        v-model="playGroupID"
        item-text="name"
        item-value="id"
        label="Select Play Group"
        single-line
          >
        </v-select>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs4  v-for="player in playerList" :key="player.id" >
        <v-switch v-model="activePlayers" :label="player.name" :value="player.id" :disabled="!activePlayers.includes(player.id) && playerMax"></v-switch>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12> <h2>starting life total</h2></v-flex>

      <!-- <v-flexv-for="option in playerCountOptions" v-bind:class="{ 'is-selected': playerCount(option) }" v-on:click="addPlayers(option)"> -->
      <v-flex v-for="option in playerCountOptions" :key="option" ma-2>
        <v-btn :flat="!(isSelected === option)" @click="isSelected = option">{{option}}</v-btn>
      </v-flex>

    </v-layout>
    </v-flex>
    <v-layout row justify-space-between class="menu" pa-3 >
      <v-flex xs6>
        <router-link class="back-button" to="/main" v-on:click.native="clearGame"><v-btn flat>back</v-btn></router-link>
      </v-flex>
      <v-flex xs6>
        <router-link class="create-group" to="/play"  v-on:click.native="startGame"> <v-btn :disabled="false" > play </v-btn></router-link>
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
  name: 'newGame',

  data: function() {
    return {
      playerMax: false,
      isSelected: '',
      playGroupID: '',
      playerCountOptions: [20,40,100],
      activePlayers: [ ]
    }
  },
  firebase: function () {
    return {
      playGroups: db.ref('users/' + firebase.auth().currentUser.uid + '/playgroups/' )
    }
  },
  computed: {
    playerList (){
      return this.$store.getters.playerList
    },
    activePlayGroup (){
      return this.$store.getters.activePlayGroup
    },
    activePlayGroupName (){
      return this.$store.getters.activePlayGroupName
    },
    gameID(){
      return this.$store.getters.loadedGame.id
    }
  },
  watch: {
    playGroupID(value){
      this.$store.dispatch('loadPlayGroup', value)
      .then( this.activePlayers = [])
    },
    activePlayers(value){
      if(value.length > 5)
        this.playerMax = true
        else
          this.playerMax = false

    }
  },
  methods: {
    startGame(){

      const updates = { }
      const selectedPlayers = [ ]
      const playerSetup = { }
      const setValues = { }

      this.activePlayers.forEach((key) => {
      setValues[this.playerList[key].name] = 0
      selectedPlayers.push(this.playerList[key].name)
      })

      this.activePlayers.forEach((key) => {
          updates['/playgroups/' + this.activePlayGroup + '/activeGames/' + this.gameID + '/players/' + this.playerList[key].id ] =
          {
            name: this.playerList[key].name,
            id: this.playerList[key].id,
          }

          updates['/playgroups/' + this.activePlayGroup + '/playerList/' + this.playerList[key].id + '/isPlaying' ] = this.gameID


          updates['/games/' + this.gameID + '/players/' + this.playerList[key].id ] =
          {
            name: this.playerList[key].name,
            id: this.playerList[key].id,
            life: this.isSelected,
            cmd: setValues
          }

          if(!this.playerList[key].temp)
            updates['/users/'+ this.playerList[key].id + '/activeGames/' + this.gameID ] = {
              id: this.gameID,
              playgroup: this.activePlayGroup,
              playgroupName: this.activePlayGroupName,
              players: selectedPlayers
            }
      })

      updates['/games/' + this.gameID + '/playgroup' ] = this.activePlayGroup
      updates['/games/' + this.gameID + '/status' ] = 'active'
      updates['/playgroups/' + this.activePlayGroup + '/status'] = 'playing'
      updates['/playgroups/' + this.activePlayGroup + '/activeGames/' + this.gameID + '/id'] = this.gameID

      return db.ref().update(updates)
      .then().catch(
        error => {

        console.log(error)
      })
    },
    clearGame(){
        //remove game from games database on exit IF status = setup
    }
  }
}
</script>

<style scooped lang="scss">
  .game-setup{
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;

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
