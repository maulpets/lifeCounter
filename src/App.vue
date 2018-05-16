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

<style >
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#app ul {
  list-style: none;
  text-align: left;
  margin: 0;
  padding: 0;
}
</style>
