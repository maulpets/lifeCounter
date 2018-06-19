<template>
      <div id="app">
        <div class="overlay">
          <h5>_tlc-0.3</h5>
        </div>
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
.overlay{
  position: absolute;
      font-family: Roboto,sans-serif;
      text-align: left;
      opacity: .3;
      color: white;
      letter-spacing: 1px;
      font-weight: 100;
      bottom: 0;
}

a {
  text-decoration: none;
}

.application .theme--dark.card, .theme--dark .card{
    background-color: #373b41 !important;
}

</style>
