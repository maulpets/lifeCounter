<template>
  <v-container class="menu" px-0 py-2>
    <v-layout row>
      <router-link to="/main"> <v-btn color="secondary"> home</v-btn></router-link>
      <v-spacer></v-spacer>
      <v-btn @click="search" color="secondary" v-show="isCollapsed">
        search
      </v-btn>
      <v-btn @click="cancelSearch" v-show="!isCollapsed">
        cancel
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="newPlayGroup" >new group</v-btn>
    </v-layout>
    <div class="drop-down" id="search-bar">
      <playgroup-search ref="searchBar"></playgroup-search>
    </div>
  </v-container>
</template>

<script>
import playGroupSearch from './playGroupSearch.vue'
import anime from 'animejs';

export default {
  name: 'playGroupMenu',
  data: function () {
    return{
      isCollapsed: true,
    }
  },
  components:{
    'playgroup-search' : playGroupSearch
  },
  computed: {
    isSearching(){
      return this.$store.getters.isSearching
    }
  },
  methods:{
   search () {

      const height = (this.isCollapsed ? this.$refs.searchBar.$el.clientHeight : 0) + 'px'
      this.isCollapsed = !this.isCollapsed
      const target = '#search-bar'
      anime({
          targets: target,
          duration: 550,
          maxHeight: height,
          easing: 'easeInOutQuad',
        })
    },
    cancelSearch(){
      this.$store.dispatch('setNotSearching')
      const height = (this.isCollapsed ? this.$refs.searchBar.$el.clientHeight : 0) + 'px'
      this.isCollapsed = !this.isCollapsed
      const target = '#search-bar'
      anime({
        targets: target,
        duration: 550,
        maxHeight: height,
        easing: 'easeInOutQuad',
      })
    },
    newPlayGroup(){
      this.$parent.$emit('newPlayGroup');
    }
  }
}
</script>

<style scoped lang="scss">
.menu {
  flex: 0 0 0;
  margin-top: auto;
  position: relative;

  .drop-down{
    max-height: 0px;
    overflow: hidden;
  }
}
</style>
