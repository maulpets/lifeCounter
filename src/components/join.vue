<template>
  <transition name="fade-in" mode="out-in">
  <div class="join-game-page">
    <v-container>
      <v-layout row wrap class="join-game-form-wrapper">
        <v-flex xs8 offset-xs2  >
          <h1>join active game</h1>
          <v-form action="index.html" method="post" @submit.prevent="onConnect">
          <v-text-field
          v-model="gameID"
          class="input-field"
          id="gameID"
          label="gameID"
          required>
          </v-text-field>
          <v-btn flat type="submit" >connect</v-btn>
        </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</transition>
</template>

<script>
export default {
  name: 'join',
  props:[

  ],
  data: function () {
    return{
      gameID: '',
    }
  },
  computed: {
    loadedGame (){
      return this.$store.getters.loadedGame
    }
  },
  watch: {
    loadedGame (value){
      if (value !== null && value !== undefined){
        this.$router.push('/scoreboard')
      }
    }
  },
  methods: {
    onConnect () {
      this.$store.dispatch('changeGame', {id: this.gameID});
    }
  }
}
</script>

<style scoped lang="scss">
.join-game-page{
  height: 100%;
  width: 100%;
  display: flex;

  .join-game-form-wrapper{
    margin: auto;
  }
}



.fade-in-enter-active {
  animation: fade-in ease-in-out 1.5s ;
}
.fade-in-leave-active {
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
