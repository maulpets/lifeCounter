<template>
  <v-container class="menu" px-0 py-2>

    <v-layout row v-if="gameData.status === 'active'">
      <v-flex>
        <router-link to="/main"><v-btn flat>home</v-btn></router-link>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex>
        <v-btn @click="moveToEndStep" color="secondary"> end game</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row v-if="gameData.status === 'ending'">
      <v-flex>
        <v-btn @click="cancelEndStep">cancel</v-btn>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex>
        <v-btn @click="endGame" :disabled="gameData.winner == ''"> done playing</v-btn>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex>
        <v-btn @click="newGame" :disabled="gameData.winner == ''"> new game</v-btn>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {
  props:['gameData'],
  data: function () {
    return{
      test: false,
      gameConfig: { },
      donePlaying: false
    }
  },
  watch:{
    gameStatus:  function(newValue, oldValue){
      console.log(newValue)
      console.log(this.donePlaying)
      !this.donePlaying && newValue === 'closed' ? this.$store.dispatch('createGame', this.donePlaying) : false

      !this.donePlaying && newValue === 'setup' ? this.$store.dispatch('startGame', this.gameConfig) : false

      console.log(this.gameConfig)

    }
  },
  computed: {
    gameStatus(){
      return this.$store.getters.gameInfo.status
    }
  },
  methods: {
    moveToEndStep(){
      return this.$store.dispatch('moveToEndStep')
    },
    cancelEndStep(){
      return this.$store.dispatch('cancelEndStep')
    },
    endGame(){
      // this.donePlaying = true
      return this.$store.dispatch('closeGame', this.gameData.winner)
      .then( this.$router.push('/main'))
    },
    newGame(){
      const activePlayers = []
      Object.keys(this.gameData.players ).forEach((playerID) => activePlayers.push(playerID))

      this.gameConfig = Object.assign({selectedPlayers: activePlayers, startingLifeTotal: this.gameData.startingLife})
      return this.$store.dispatch('closeGame', this.gameData.winner)
    }
  }
}
</script>

<style lang="css">

</style>
