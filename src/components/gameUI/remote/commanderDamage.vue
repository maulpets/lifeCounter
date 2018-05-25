<template>
  <transition name="slide-in" mode="in-out">
  <v-container pa-3  style="position:relative">
    <v-layout row wrap justify-space-around>
      <v-flex xs4 v-if="!(playerName === opponent)" v-for="(damageTaken, opponent) in opponents" @click="add(damageTaken, opponent, 1)" class="commander-beats" :key="opponent" pa-3>
        <div class="commander-beats commander-damage-taken">{{damageTaken}}</div>
        <div class="commander-beats commander-opponent-name">{{opponent}}</div>
      </v-flex>
      <v-icon style="position:absolute; left:5px; bottom:5px; opacity:.1" @click="resetCMD">refresh</v-icon>
    </v-layout>
  </v-container>
  </transition>
  </template>
<script>
import firebase from 'firebase'
import {db} from '../../../firebase'
import anime from 'animejs'


export default {
  name:'commanderDamage',
  props: ['opponents', 'life', 'id', 'playerName'],
  data(){
    return{
      // isCollapsed: false
    }
  },
  computed:{
      // playerName(){
      //   return this.$store.getters.user.name
      // }
  },
  methods: {
    // collapse(){
    //   this.isCollapsed = !this.isCollapsed
    // }
    add( currentValue, valueToChange , amountToChange ) {
      const newLife = this.life - amountToChange
      const newCmd = currentValue + amountToChange

      db.ref('games/'+ this.$store.state.gameInfo.id + '/players/' + this.id ).child( 'life' ).set(newLife)
      db.ref('games/'+ this.$store.state.gameInfo.id + '/players/' + this.id + '/cmd' ).child(valueToChange).set(newCmd)
    },
    resetCMD(){
      Object.keys(this.opponents).forEach((key) => this.opponents[key] = 0)
      db.ref('games/'+ this.$store.state.gameInfo.id + '/players/' + this.id + '/cmd' ).set(this.opp)
    }
  }
}
</script>

<style lang="scss">

.commander-beats{
  flex-flow: column;
  font-weight: 200;


  .commander-damage-taken{
    font-size: 5vh;

  }
  .commander-opponent-name{
    font-size: 3vh;
  }

}
// .slide-in-enter-active {
//
//   animation: fade-in ease-in-out 1.5s ;
// }
// .slide-in-leave-active {
//   animation: fade-in ease-in-out 1.5s reverse;
// }
// @keyframes fade-in {
//   0% {
//     max-height: 0px;
//     opacity: 0;
//   }
//   100% {
//     max-height: 2em;
//     opacity: 1;
//   }
// }
</style>
