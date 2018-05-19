<template>
  <transition name="fade-in" mode="out-in">
  <div class="sign-in-page">
    <v-container>
      <v-layout row wrap class="sign-in-form-wrapper">
        <v-flex xs8 offset-xs2  >
          <h1>username</h1>
          <v-form action="index.html" method="post" @submit.prevent="onLogin">
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


          <v-btn flat type="submit" >login</v-btn>
        </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</transition>
</template>

<script>
export default {
  name: 'login',
  props:[

  ],
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
  },
  created: function(){
    console.log("created")
    this.$data.show = true
  },
  destroyed: function(){
    console.log("boom")
    this.$data.show = false
  }
}
</script>

<style scoped lang="scss">
.sign-in-page{
  height: 100%;
  width: 100%;
  display: flex;

  .sign-in-form-wrapper{
    margin: auto;
  }
}



.fade-in-enter-active {
  animation: fade-in ease-in-out 1.5s ;
}
.fade-in-leave-active {
  animation: fade-in ease-in-out 1.5s reverse;
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
