// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex';
import App from './App'
import VueFire from 'vuefire'

import './firebase'
import router from './router'

import { store } from './store/store'


import Vuetify from 'vuetify'


import AlertCmp from './components/shared/displayError.vue'


import 'vuetify/dist/vuetify.min.css'


// Helpers
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.blue.base, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
})

Vue.use(VueFire)
Vue.use(Vuex)

Vue.component('app-alert', AlertCmp)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h => h(App)
})
