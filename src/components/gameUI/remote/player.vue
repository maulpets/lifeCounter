<template>
  <v-container pa-0 style="position: relative;">
    <div class="winner-select" ref="winnerSelect">
      <winner-select  v-bind:gameWinner="winner" :thisID="player['id']" ></winner-select>
    </div>

    <v-layout row py-2 align-content-center class="remote-player" ref="playerCard" >
      <v-flex xs4 class="remote-player player-name">

        {{player.name}}
      </v-flex>
      <v-flex xs2>
        <v-icon @click="add(player, 1)"> add</v-icon>
      </v-flex>

      <v-flex xs2>
        <v-flex class="remote-player life-display" v-show="isEditting" @click="editLife">
          {{player.life}}
        </v-flex>
        <v-flex class="remote-player life-input"  v-show="!isEditting" >
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
        <v-divider light ></v-divider>
  </v-container>
</template>

<script>

// require('../../../assets/particles/particles.js')
import anime from 'animejs';
// import Particles  from '../../../assets/particles/particles.js'

import commanderDamage from './commanderDamage.vue'
import winnerSelect from './winnerSelect.vue'
import firebase from 'firebase'
import {db} from '../../../firebase'

export default {
  name: 'game',
  props: ['gameStatus','player', 'winner'],
  components: {
    'commander-damage': commanderDamage,
    'winner-select': winnerSelect
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


      if(newValue === 'ending'){
        this.isCollapsed = true
        const target = '#player' + this.player['id']
        anime({
            targets: target,
            duration: 550,
            maxHeight: 0,
            easing: 'easeInOutQuad',
          })
    }



      const target = this.$refs.winnerSelect

      this.$refs.playerCard.classList.toggle('voting')
      this.$refs.winnerSelect.classList.toggle('voting')
      const animation = anime({
          targets: target,
          duration: 800,
          delay: this.$refs.winnerSelect.getBoundingClientRect().top * 4 * fade,
          opacity: fade,
          translateX: fade * 4,
          easing: 'easeInOutQuad',
          complete: function(anim){

          }

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
    subtract (player, amountToChange){
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
            anime({
                targets: target,
                duration: 550,
                maxHeight: height,
                easing: 'easeInOutQuad',
              })
    },
    // test (){

    // console.log( this.$refs.buttons.$el.getBoundingClientRect() )
    //
    //   anime({
    //       targets: this.$refs.buttons.$el,
    //       duration: 550,
    //       opacity: 0,
    //       easing: 'easeInOutQuad',
    //       complete: function(anim) {
    //               console.log("finished")
    //             }
    //     })
    // }
  },
  mounted(){

  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/particles/particles.css';

.winner-select{
  position: absolute;
  height:100%;
  width:100%;
  opacity: 0;
  z-index: -1;
  &.voting{
      z-index: 100;
  }
}

.remote-player{
    align-items: center;
    transition: all 500ms ease-in-out;
    opacity: 1;
    &.voting{
      opacity: .1
    }
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
