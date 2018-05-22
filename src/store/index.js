import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

import firebase from 'firebase'
import {db} from '../firebase'

import {gameDefaults} from '../defaults'
import {userDefaults} from '../defaults'
import {playerDefaults} from '../defaults'





Vue.use(Vuex);


const state = {
    gameInfo: {id: null},
    user: null,
    loading: false,
    error: null,
    activePlayGroup: '',
    activePlayGroupName: '',
    playgroups: null,
    playerList: { },
    gameHistory: null,

  }

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations'
  ], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations')
    })
  })
}

export default store
