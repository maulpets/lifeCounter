import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase'
import {db} from '../firebase'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    gameInfo: { id: "na" },
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    changeGame(state, newGameInfo) {
      state.gameInfo = newGameInfo;
    },
    setUser(state, userInfo){
      state.user = userInfo;
    },
    setLoading(state, isLoading){
      state.loading = isLoading
    },
    setError(state, hasError){
      state.error = hasError
    },
    clearError(state){
      state.error = null
    }
    },
    actions: {
      changeGame({commit}, newGameInfo) {
        commit('changeGame', newGameInfo);
      },
      signUpUser({commit}, newUserInfo) {
        commit('setLoading', true)
        commit('clearError')
        firebase.auth().createUserWithEmailAndPassword(newUserInfo.email, newUserInfo.password)
          .then(
            user => {
              commit('setLoading', false)
              const newUser = { id: user.user.uid }
              commit('setUser', newUser)
            }
          ). catch(
            error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
          )
      },
      loginUser({commit}, loginUserInfo ){
        commit('setLoading', true)
        commit('clearError')
        firebase.auth().signInWithEmailAndPassword(loginUserInfo.email, loginUserInfo.password)
          .then(
            user => {
              commit('setLoading', false)
              const newUser = { id: user.user.uid }
              commit('setUser', newUser)
            }
          ).catch(
            error =>{
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            }
          )
      },
      clearError({commit}){
        commit('clearError')
      }
    },
    getters:{
      loadedGame: (state) => {return state.gameInfo;},
      user:  (state) => {return state.user;},
      error: (state) => {return state.error},
      loading: (state) => {return state.loading}
    }
});
