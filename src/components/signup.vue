<template lang="html">
<transition name="fade-in">
  <div class="sign-up-page">
    <transition name="slide-down">
    <div class="error-wrapper" v-if="error">
      <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
    </div>
  </transition>
    <div class="sign-up-form-wrapper">
      <h1>username</h1>
      <form class="" action="index.html" method="post" @submit.prevent="onSignUp">
        <md-field>
          <label>Initial Value</label>
          <md-input></md-input>
        </md-field>
        <div class="input-field">
          <input v-model="email" id="email" placeholder="email" required></input>
        </div>
        <div class="input-field">
          <input v-model="password" id="password" placeholder="password" required></input>
        </div>
        <div class="input-field">
          <input v-model="confirmPassword" placeholder="confirm"></input>
        </div>
        <md-button class=" " type="submit"  v-bind:disabled="validatePassword">signup</md-button>
      </form>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'signup',
  data: function () {
    return{
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    validatePassword () {
      return this.password == this.confirmPassword && this.confirmPassword !== '' ? false : true
    },
    user (){
      return this.$store.getters.user
    },
    error (){
      return this.$store.getters.error
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
    onSignUp () {
      this.$store.dispatch('signUpUser', {email: this.email, password: this.password});
    },
    onDismissed () {
      this.$store.dispatch('clearError');
    }
  }
}
</script>

<style scooped lang="scss">
.sign-up-page{

  .input-field{
    width: 100%;
    margin: 12px auto;
    input{
      background-color: inherit;
      padding: 0;
      margin: 0;
      border: none;
      outline: none;
      text-align: right;
      padding: 4vh 1em;
      width: 100%;
      color: white;

    }
      label{
        right: 20px;
        text-align: right;
      }
      &:after{
        height: 0;
        right:15%;
      }
    }
  .slide-down-enter-active {
    animation: slide-down ease-in-out .5s ;
  }
  .slide-down-leave-active {
    animation: slide-down ease-in-out .5s reverse;
  }
  @keyframes slide-down {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0%);
    }
  }
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
}

</style>
