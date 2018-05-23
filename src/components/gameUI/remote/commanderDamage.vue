<template>
  <transition name="slide-in" mode="in-out">
  <v-container pa-3 >
    <v-layout row>
      <v-flex xs12 v-for="(damageTaken, opponent) in opponents" @click="add(damageTaken, opponent, 1)" class="commander-beats" key="opponents">
        <div class="commander-beats commander-damage-taken">{{damageTaken}}</div>
        <div class="commander-beats commander-opponent-name">{{opponent}}</div>

      </v-flex>
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
  props: ['opponents', 'life', 'id'],
  data(){
    return{
      // isCollapsed: false
    }
  },
  methods: {
    // collapse(){
    //   this.isCollapsed = !this.isCollapsed
    // }
    add: function( currentValue, valueToChange , amountToChange ) {
      const newLife = this.life - amountToChange
      const newCmd = currentValue + amountToChange

      db.ref('games/'+ this.$store.state.gameInfo.id + '/players/' + this.id ).child( 'life' ).set(newLife)
      db.ref('games/'+ this.$store.state.gameInfo.id + '/players/' + this.id + '/cmd' ).child(valueToChange).set(newCmd)
    },
  }
}
</script>

<style lang="scss">

.commander-beats{
  flex-flow: column;
  font-weight: 200;
  font-size: 5vh;
  .commander-damage-taken{

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
