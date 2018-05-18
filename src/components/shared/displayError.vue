<template lang="html">
  <div class="app-error" @click="onClose" :value="true">
    {{text}}
  </div>
</template>

<script>
export default {
  props: ['text'],
  data: function (){
    return {
      isActive: true
    }
  },
  methods: {
    onClose() {
      this.isActive = false
      this.$emit('dismissed')
    }
  }
}
</script>

<style lang="scss">
.app-error{
  padding: 1em;
  width: 100%;
  background-color: rgb(119,31,31);
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all ease-in-out 200ms;
}
</style>
