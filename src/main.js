// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex';
import App from './App'
import VueFire from 'vuefire'

import './firebase'
import router from './router'

import { store } from './store/store'

import VueMaterial from 'vue-material'
import { MdField } from 'vue-material/dist/components'

import Vuetify from 'vuetify'


import AlertCmp from './components/shared/displayError.vue'


import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import 'vuetify/dist/vuetify.min.css'



Vue.use(Vuetify)
Vue.use(VueMaterial)
Vue.use(MdField)
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
