<template>
  <v-container pa-0 style="position: relative;">
    <v-layout pa-2 style="position: absolute; top: 0; bottom: 0; left: 0; right:0; background-color:rgba(0,0,0,.0); align-content: center; z-index: 20;" ref="buttons" @click="">
      <v-spacer></v-spacer>
        <v-btn flat style="opacity:.8;text-shadow: 0px 0px 7px #0000; ">select winner</v-btn>


        <v-icon style="opacity:.8;text-shadow: 0px 0px 7px #0000, 0px 0px 2px #0000; " @click="test">grade</v-icon>
        <!-- <img src="../../../assets/cmd.svg" width="20px"   /> -->
        <!-- style="filter: blur(4px); background-color:rgba(0,0,0,.1);" -->
      </v-layout>
    <v-layout row py-2 align-content-center class="remote-player test" >
      <v-flex xs4 class="remote-player player-name">
        {{player.name}}
      </v-flex>

      <v-flex xs2>
        <v-icon @click="add(player, 1)"> add</v-icon>
      </v-flex>

      <v-flex xs2>
        <v-flex class="remote-player life-display test" v-if="isEditting" @click="editLife">
          {{player.life}}
        </v-flex>
        <v-flex v-else class="remote-player life-input test">
              <input type="number" name="" ref="lifetotal" v-model="player.life" @blur="saveHP(player)">                <!-- {{player.life}}</h1> -->
        </v-flex>
      </v-flex>

      <v-flex xs2>
        <v-icon small @click="subtract(player, 1)">remove</v-icon>
      </v-flex>
<!-- v-show="(gameStatus === 'active')" -->
      <v-flex xs2  >
        <v-icon style="opacity:.3;" @click="animate">security</v-icon>
        <!-- <img src="../../../assets/cmd.svg" width="20px"   /> -->
      </v-flex>
<!-- v-show="(gameStatus === 'ending')" -->


    </v-layout>
    <div :id="'player' + player['id']" class="drop-down" >
        <commander-damage :playerName="player['name']" :opponents="player['cmd']" :life="player['life']" :id="player['id']" ref="cmdDmg"></commander-damage>
    </div>
        <v-divider light class="test" ></v-divider>
  </v-container>
</template>

<script>

// require('../../../assets/particles/particles.js')
import anime from 'animejs';
// import Particles  from '../../../assets/particles/particles.js'

import firebase from 'firebase'
import {db} from '../../../firebase'
import commanderDamage from './commanderDamage.vue'

export default {
  name: 'game',
  props: ['gameStatus','player'],
  components: {
    'commander-damage': commanderDamage
  },
  firebase: function () {
    return {

    }
  },
  data: function () {
    return{
      gameID: '',
      isCollapsed: true,
      isEditting: true,

    }
  },
  computed: {
    loadedGame (){
      return this.$store.getters.loadedGame
    }
  },
  watch: {
    gameStatus: function(newValue, oldValue){
        //
        // this.$refs.buttons.$el.getBoundingClientRect()
        const fade = newValue === 'active' ? 0 : 1
      console.log('changed' + newValue + 'from' + oldValue)
      anime({
          targets: '.test',
          duration: 1000,
          delay: this.$refs.buttons.getBoundingClientRect().top * 2,


          filterBlur: (fade * -4),
          easing: 'easeInOutQuad'
        })

    }
  },
  methods: {
    editLife(){
      this.isEditting = !this.isEditting
      this.$nextTick(() => this.$refs.lifetotal.focus())
    },
    saveHP (player) {
      console.log(player.life)
        db.ref('games/'+ this.$store.state.gameInfo.id + '/players/' + player.id ).child('life').set(player.life)
        this.isEditting = !this.isEditting
    },
    add ( player, amountToChange ) {
      const newValue = player['life'] + amountToChange
      db.ref('games/'+ this.$store.state.gameInfo.id + '/players/' + player.id ).child('life').set(newValue)
    },
    subtract (player, amountToChange, valueToChange){
      const newValue = player['life'] - amountToChange
      db.ref('games/'+ this.$store.state.gameInfo.id + '/players/' + player.id ).child('life').set(newValue)
    },
    // toggleCollapsation (){
    //   this.isCollapsed = !this.isCollapsed
    // },
   animate () {
            const height = (this.isCollapsed ? this.$refs.cmdDmg.$el.clientHeight : 0) + 'px'
            this.isCollapsed = !this.isCollapsed
            const target = '#player' + this.player['id']

            console.log("evetns")
              anime({
                  targets: target,
                  duration: 550,
                  maxHeight: height,
                  easing: 'easeInOutQuad',

                })
    },
    test (){

    console.log( this.$refs.buttons.$el.getBoundingClientRect() )

      anime({
          targets: this.$refs.buttons.$el,
          duration: 550,
          opacity: 0,
          easing: 'easeInOutQuad',
          complete: function(anim) {
                  console.log("finished")
                }
        })
    }
  },
  mounted(){

  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/particles/particles.css';

.remote-player{
    align-items: center;
    .player-name{
      text-align: left;
      font-size: 2em;
      letter-spacing: .0125em;
    }
    .life-display{
      letter-spacing: .025em;
      outline: none;
      text-align: center;
      font-size: 2em;
      font-weight: 600;
    }
    .life-input{

      input{
        letter-spacing: .025em;
        outline: none;
        text-align: center;
        font-size: 2em;
        font-weight: 600;
        max-width: 100%;
        color: transparent;
        text-shadow: 0 0 0 #00897B;
      }
    }
  }
  .drop-down{
    max-height: 0px;
    overflow: hidden;
  }





</style>
