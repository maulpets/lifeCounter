<template>
      <div id="app">
        <v-app dark>
          <router-view></router-view>
        </v-app>
      </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: fixed;
  min-height: 100vh;
  width: 100vw;
  background-color: #373b41;
}


a {
  text-decoration: none;
}

.application .theme--dark.card, .theme--dark .card{
    background-color: #373b41 !important;
}

</style>
