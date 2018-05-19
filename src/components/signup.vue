<template>
  <transition name="fade-in" mode="out-in">
  <div class="sign-up-page">

    <transition name="zlide-down">
      <div class="error-wrapper" v-if="error">
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </div>
    </transition>

    <v-container>
      <v-layout row wrap class="sign-up-form-wrapper">
        <v-flex xs8 offset-xs2  >
          <h1>username</h1>
          <v-form action="index.html" method="post" @submit.prevent="onSignUp">
          <v-text-field
          v-model="email"
          class="input-field"
          id="email"
          label="email"
          required>
          </v-text-field>

          <v-text-field
          v-model="password"
          class="input-field"
          id="password"
          type="password"
          label="password"
          required>
          </v-text-field>

          <v-text-field
          v-model="confirmPassword"
          class="input-field"
          id="confirmPassword"
          type="password"
          label="confirm"
          required>
          </v-text-field>


          <v-btn flat type="submit" v-bind:disabled="validatePassword">login</v-btn>
        </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</transition>
</template>


<!-- <template>
    <transition name="phade-in" mode="out-in">
    <v-content class="sign-up-page">

      <transition name="zlide-down">
        <div class="error-wrapper" v-if="error">
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </div>
      </transition>

      <v-container>
        <v-layout row>
          <v-flex xs12 m6>
            <div class="sign-up-form-wrapper">
                <h1>username</h1>
                <form class="" action="index.html" method="post" @submit.prevent="onSignUp">
                  <div class="input-field">
                    <input v-model="email" id="email" placeholder="email" required></input>
                  </div>
                  <div class="input-field">
                    <input v-model="password" id="password" placeholder="password" required></input>
                  </div>
                  <div class="input-field">
                    <input v-model="confirmPassword" placeholder="confirm"></input>
                  </div>
                  <button class=" " type="submit"  v-bind:disabled="validatePassword">signup</button>
                </form>
              </div>
           </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    </transition>
</template> -->

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

<style scoped lang="scss">


.sign-up-page{
  height: 100%;
  width: 100%;
  display: flex;
  .error-wrapper{
    position: absolute;
    width: 100%;
  }

  .sign-in-form-wrapper{
    margin: auto;
  }

  .zlide-down-enter-active {
    animation: slide-down ease-in-out .5s ;
  }
  .zlide-down-leave-active {
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
}
  .phade-in-enter-active {
    animation: phade-in ease-in-out 1.5s ;
  }
  .phade-in-leave-active {
    animation: phade-in ease-in-out 1.5s reverse;
  }
  @keyframes phade-in {
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
