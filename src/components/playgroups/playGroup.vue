<template>
  <v-container pa-0>
      <v-container py-4 px-0>
        <v-layout row>
          <v-flex xs9>
            <v-layout>
              <v-flex style="text-align:left">
                <h1 style="font-weight:300" > {{groupData.name}}</h1>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex align-content-bottom pt-2>
                <h4 style="opacity:.6">{{groupData['.key']}}</h4>
              </v-flex>
            </v-layout>
            <v-layout>
              <top-winners v-bind:players="groupData.playerList"> </top-winners>
            </v-layout>
          </v-flex>

          <v-flex xs3>
            <v-btn flat small @click="test" disabled>edit</v-btn>
          </v-flex>
        </v-layout>
    </v-container>
    <v-divider light ></v-divider>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import {db} from '../../firebase'
import topWinners from './wins.vue'

export default {
  name: 'playgroup',
  props: ['playgroupID'],
  components:{
    'top-winners': topWinners
  },
  data: function(){
    return{
      limitationList: 3
    }
  },
  computed: {
    // groupInfo: function(){
        //   const playerWins = [ ]
        //   Object.keys(this.groupData.playerList ).forEach((playerID) =>{
        //       playerWins.push({name: this.groupData.playerList[playerID].name,
        //                        wins:this.groupData.playerList[playerID].wins})
        //       })
        //
        //   playerWins.sort(function (b, a) {
        //     return a.wins - b.wins;
        //   })
        // return playerWins
    // },
    // playersWins: function(playerID){
    //   const value = {name: this.groupData.playerList[playerID].name,
    //                    wins:this.groupData.playerList[playerID].wins}
    //
    //   return value
    // }

  },
  methods: {
    test(){
          // const playerWins = []
          // Object.keys(this.groupData.playerList ).forEach((playerID) =>{
          //     playerWins.push({name: this.groupData.playerList[playerID].name,
          //                      wins:this.groupData.playerList[playerID].wins})
          //     })
          //
          // playerWins.sort(function (b, a) {
          //   return a.wins - b.wins;
          // })
          // return playerWins
          // console.log(playerWins)
    }

  },

  beforeMount(){
      // this.$bindAsObject('gameData', db.ref('playgroups/c8zzfx56n'))
      //binds firebase data to groupData


      this.$bindAsObject('groupData', db.ref('playgroups/'+ this.playgroupID), () => console.log("data ready"))
  },

}
</script>

<style scoped lang="scss">

</style>
