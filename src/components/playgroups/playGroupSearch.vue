<template lang="html">
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-form action="index.html" method="post" @submit.prevent="search">
          <v-text-field
          v-model="searchInput"
          class="input-field"
          id="searchPlayGroups"
          label="Play Group ID"
          required>
          </v-text-field>
        </v-form>
      </v-flex>
      <v-flex xs2>
        <v-btn flat type="submit" @click="search" >search</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'playGroupSearch',
  data: function() {
    return {
      searchInput: '',
    }
  },
  methods: {
    search(){
      console.log('clicked search')
      this.$store.dispatch('setIsSearching', this.searchInput)
      this.$store.dispatch('loadPlayGroup', this.searchInput)
    }

  }



}
</script>

<style lang="css">
</style>
