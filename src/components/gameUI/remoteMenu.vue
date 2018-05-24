<template>
  <v-container class="menu" pa-0>
    <v-layout row justify-space-between  pa-0>
      <v-flex xs6>
        <router-link to="/main"> <v-btn flat> home</v-btn></router-link>
      </v-flex>
      <v-flex xs6>
        <router-link to="/main"><v-btn>view</v-btn></router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
}
</script>

<style lang="css">
.menu {
  flex: 0 0 0;
  margin-top: auto;
  position: relative;
}
</style>
