<template>
<transition name="fade-in" mode="out-in">
  <div class="manage-playgroups-wrapper" >
    <div class="active-group" v-if="makingGame">
      {{activePlayGroup}}
    </div>
    <v-container class="manage-playgroups playgroups-list" pa-2>

    <v-layout class="manage-playgroups playgroups-header">
      <v-spacer></v-spacer>
      <h1>playgroups</h1>
    </v-layout>


    <v-layout class="manage-playgroups users-playgroups" v-if="!isSearching && !makingGame">
      <v-flex xs12>
        <v-divider light ></v-divider>
        <play-group v-for="group in playgroupData" v-bind:playgroupID="group.id" :key="group.id"> </play-group>
      </v-flex>
    </v-layout>

    <v-layout class="manage-playgroups searched-playgroup" v-if="makingGame">
      <v-flex xs12>
        <create-group></create-group>
      </v-flex>
    </v-layout>


    <v-layout class="manage-playgroups searched-playgroup" v-if="isSearching">
      <v-flex xs12>
        <searched-group></searched-group>
      </v-flex>
    </v-layout>


    </v-container>
  <playgroup-menu></playgroup-menu>
  </div>
</transition>
</template>

<script>
import firebase from 'firebase'
import {db} from '../../firebase'

import playGroup from './playGroup.vue'
import searchedGroup from './searchedGroup.vue'
import playGroupMenu from './playGroupMenu.vue'
import createPlayGroup from './createPlayGroup.vue'

export default {
  name: 'playgroups',
  components:{
    'play-group': playGroup,
    'playgroup-menu': playGroupMenu,
    'searched-group':  searchedGroup,
    'create-group': createPlayGroup,
  },
  firebase: function () {

  },
  data: function () {
    return{
      groupCounter: 0,
      playgroupData: { },
      makingGame: false,
    }
  },
  computed: {
    playgroups(){
      return this.$store.getters.playgroups
    },
    isSearching(){
      return this.$store.getters.isSearching
    },
    activePlayGroup(){
      return this.$store.getters.activePlayGroup
    },

  },
  methods:{
    newPlayGroup(){
      console.log("new group")
    }
  },
  mounted(){
    this.$bindAsArray('playgroupData', db.ref('users/'+ firebase.auth().currentUser.uid + '/playgroups/'))

    this.$on('newPlayGroup', function(value){
      this.$store.dispatch('createPlayGroup')
        this.makingGame = !this.makingGame
    })

    this.$on('makePlayGroup', function(value){
        this.makingGame = false
    })
  }


}
</script>

<style scoped lang="scss">
.manage-playgroups-wrapper{
  position: fixed;
  display: flex;
  flex-flow: column;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .active-group{
    position: absolute;
    margin: 1em;
    opacity: .4
  }
    .playgroups-header{
      font-size: 1.2em;
      opacity: .6;

    }
    .playgroups-list{
      display: block;
      height: 100%;
      position: relative;
      overflow-y: scroll;
  }
}
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
