<template>
  <v-container pa-0>
    <v-layout row py-2 align-content-center class="remote-player">
      <v-flex xs4 class="remote-player player-name">
        {{player.name}}
      </v-flex>

      <v-flex xs2>
        <v-icon @click="add(player, 1)"> add</v-icon>
      </v-flex>

      <v-flex xs2>
        <v-flex class="remote-player life-display" v-if="isEditting" @click="editLife">
          {{player.life}}
        </v-flex>
        <v-flex v-else class="remote-player life-input">
              <input type="number" name="" ref="lifetotal" v-model="player.life" @blur="saveHP(player)">                <!-- {{player.life}}</h1> -->
        </v-flex>
      </v-flex>

      <v-flex xs2>
        <v-icon small @click="subtract(player, 1)">remove</v-icon>
      </v-flex>


      <v-flex xs2>
        <v-icon style="opacity:.3;" @click="animate">security</v-icon>
        <!-- <img src="../../../assets/cmd.svg" width="20px"   /> -->
      </v-flex>
    </v-layout>
    <div :id="player['id']" class="drop-down" >
        <commander-damage :opponents="player['cmd']" :life="player['life']" :id="player['id']" ref="cmdDmg"></commander-damage>
    </div>
        <v-divider light ></v-divider>
  </v-container>
</template>

<script>
import anime from 'animejs';
import firebase from 'firebase'
import {db} from '../../../firebase'
import commanderDamage from './commanderDamage.vue'

export default {
  name: 'game',
  props: ['player'],
  components: {
    'commander-damage': commanderDamage
  },
  firebase: function () {
    return {
      playerList:   db.ref('games/'+ this.$store.getters.loadedGame.id + '/players/')
    }
  },
  data: function () {
    return{
      gameID: '',
      isCollapsed: true,
      isEditting: true
    }
  },
  computed: {
    loadedGame (){
      return this.$store.getters.loadedGame
    }
  },
  watch: {

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
    toggleCollapsation (){
      this.isCollapsed = !this.isCollapsed
    },
     animate () {
              const height = (this.isCollapsed ? this.$refs.cmdDmg.$el.clientHeight : 0) + 'px'
              this.isCollapsed = !this.isCollapsed
              const target = '#' + this.player['id']
                anime({
                    targets: target,
                    duration: 550,
                    maxHeight: height,
                    easing: 'easeInOutQuad'
                  })
        }
  }
}
</script>

<style scoped lang="scss">
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
