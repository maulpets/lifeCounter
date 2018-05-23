<template>
  <v-container pa-2>
    <v-layout row>
      <v-flex xs3>
        <h1>{{player.name}}</h1>
      </v-flex>
      <v-flex xs2>
        <v-icon @click="add(player, 1)"> add</v-icon>
      </v-flex>
      <v-flex  xs2>
        <h1>{{player.life}}</h1>
      </v-flex>
      <v-flex  xs3>
        <v-btn small @click="subtract(player, 1)">-</v-btn>
      </v-flex>
      <v-flex xs2>
        <img src="../../../assets/cmd.svg" width="20px"  @click="animate" />
      </v-flex>
    </v-layout>
    <div :id="player['id']" class="drop-down" >
        <commander-damage :opponents="player['cmd']" :life="player['life']" :id="player['id']" ref="cmdDmg"></commander-damage>
    </div>

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
      isCollapsed: true
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
    add: function( player, amountToChange ) {
      const newValue = player['life'] + amountToChange
      db.ref('games/'+ this.$store.state.gameInfo.id + '/players/' + player.id ).child('life').set(newValue)
    },
    subtract: function (player, amountToChange, valueToChange){
      const newValue = player['life'] - amountToChange
      db.ref('games/'+ this.$store.state.gameInfo.id + '/players/' + player.id ).child('life').set(newValue)
    },
    toggleCollapsation: function (){
      this.isCollapsed = !this.isCollapsed
    },
     animate: function() {
              const height = (this.isCollapsed ? this.$refs.cmdDmg.$el.clientHeight : 0) + 'px'

              this.isCollapsed = !this.isCollapsed
              console.log(this.$refs.cmdDmg.$el.clientHeight)
              const target = '#' + this.player['id']
                anime({
                    targets: target,
                    duration: 250,
                    maxHeight: height,
                    easing: 'linear'
                  })

        }
  }
}
</script>

<style scoped lang="scss">
.drop-down{
  transition: all .5s;
  max-height: 0px;
  overflow: hidden;
}

</style>
