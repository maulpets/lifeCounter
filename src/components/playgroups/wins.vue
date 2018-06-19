<template>
  <v-container pa-0>
    <v-layout row>
      <v-flex xs4 v-for="(player, index) in playerList" :key="index" v-if="index < 3" py-1>
        {{player.wins}}
        <v-icon small>star</v-icon>
        {{player.name}}
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'topWinners',
  props: ['players'],
  data: function(){
    return{
      playerList: [ ]
    }
  },
  watch:{
    players: function(newValue, oldValue){
      console.log(newValue)
      if(newValue !== undefined){
      const playerWins = [ ]
      Object.keys(this.players ).forEach((playerID) =>{
          playerWins.push({name: this.players[playerID].name,
                           wins:this.players[playerID].wins})
        })
        playerWins.sort((b, a) => { return a.wins - b.wins })
        this.playerList = playerWins
      }
    }
  }
}
</script>

<style lang="css">
</style>
