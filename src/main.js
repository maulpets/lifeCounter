// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex';
import App from './App'
import VueFire from 'vuefire'

import './firebase'
import router from './router'

import store from './store'


import Vuetify from 'vuetify'


import AlertCmp from './components/shared/displayError.vue'


import 'vuetify/dist/vuetify.min.css'



// Helpers
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: '#00897B', // #E53935
    secondary: '#282a2e', // #FFCDD2
    accent: '#00897B',
    background:  '#373b41' // #3F51B5
  }
})

Vue.use(VueFire)
Vue.use(Vuex)

Vue.component('app-alert', AlertCmp)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router: router,
  render: h => h(App)
})
