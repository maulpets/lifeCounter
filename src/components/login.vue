<template lang="html">
<transition name="fade-in">
  <div class="sign-up-page">
    <div class="sign-up-form-wrapper">
      <h1>username</h1>
      <form class="" action="index.html" method="post" @submit.prevent="onLogin">
        <div class="input-field">
          <input v-model="email" id="email" placeholder="email" required></input>
        </div>
        <div class="input-field">
          <input v-model="password" id="password" placeholder="password" required></input>
        </div>
        <md-button class=" " type="submit" >login</md-button>
      </form>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'login',
  data: function () {
    return{
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    user (){
      return this.$store.getters.user
    }
  },
  watch: {
    user (value){
      if (value !== null && value !== undefined){
        this.$router.push('/')
      }
    }
  },
  methods: {
    onLogin () {
      this.$store.dispatch('loginUser', {email: this.email, password: this.password});
    }
  }
}
</script>

<style scoped lang="scss">

.fade-in-enter-active {
  animation: fade-in ease-in-out 2.5s ;
}
.fade-in-leave-active {
  animation: fade-in ease-in-out 2.5s reverse;
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
