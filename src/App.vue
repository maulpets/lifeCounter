<template>
      <div id="app">
        <router-view></router-view>
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
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  background-color: #373b41;
}
#app ul {
  list-style: none;
  text-align: left;
  margin: 0;
  padding: 0;
}

a:hover {
  text-decoration: none !important;
}

.error-wrapper{
  position: absolute;
  background-color: white;
  top: 0;
  left: 0;
  right: 0;
}

</style>
