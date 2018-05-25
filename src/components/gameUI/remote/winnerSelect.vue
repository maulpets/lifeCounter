<template>
  <v-container pa-0>
    <v-layout  v-bind:class="{ 'is-winner': isWinner() }" >
      <v-spacer></v-spacer>
      <!-- {{thisID}}
      {{gameWinner}} -->
        <v-btn flat style="opacity:.8;text-shadow: 0px 0px 7px #0000; " @click="selectWinner">select winner</v-btn>
        <v-icon style="opacity:.8;text-shadow: 0px 0px 7px #0000, 0px 0px 2px #0000; " >grade</v-icon>
        <!-- <img src="../../../assets/cmd.svg" width="20px"   /> -->
        <!-- style="filter: blur(4px); background-color:rgba(0,0,0,.1);" -->
      </v-layout>
  </v-container>
</template>
<script>
// import firebase from 'firebase'
// import {db} from '../../../firebase'

export default {
  props: ['thisID', 'gameWinner' ],
  computed: {


  },
  methods: {
    selectWinner(){
      return this.$store.dispatch('selectWinner',this.thisID)
      console.log(this.thisID)
    },
    isWinner(){
      return this.thisID === this.gameWinner
    }

  }
}
</script>

<style lang="scss">

.is-winner{
  button, i{
      color:#FDD835 !important;
  }

}
</style>
