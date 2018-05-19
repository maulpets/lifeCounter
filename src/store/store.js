import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase'
import {db} from '../firebase'

import {gameDefaults} from '../defaults'
import {userDefaults} from '../defaults'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    gameInfo: {id: null},
    user: null,
    loading: false,
    error: null,
    playgroups: null,
    playerList: null,
    gameHistory: null
  },
  mutations: {
    changeGame(state, newGameInfo) {
      state.gameInfo = newGameInfo
    },
    setUser(state, userInfo){
      state.user = userInfo
    },
    setPlaygroups(state, playgroups){
      state.playgroups = playgroups
    },
    setLoading(state, isLoading){
      state.loading = isLoading
    },
    setError(state, hasError){
      state.error = hasError
    },
    addPlayer(state, playerInfo){
      state.playerList.push(playerInfo)
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
              const newUser = { id: user.user.uid,
                                name: newUserInfo.username }
              const newUserDefaults ={
                ...userDefaults,
                name: newUserInfo.username
              }
              db.ref('users/' + user.user.uid ).set(newUserDefaults)
              .then(()=>{
                  commit('setLoading', false)
                  commit('setUser', newUser)
                  commit('setPlaygroups', userDefaults.playgroups )
                }
              ).catch(
                error => {
                commit('setLoading', false)
                commit('setError', error)
                console.log(error)
              }
              )
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
          .then(user => {
              db.ref('users/' + firebase.auth().currentUser.uid ).once('value')
              .then((snapshot) => {
                const userData ={
                  id: firebase.auth().currentUser.uid,
                  name: snapshot.val().name,
                  wins: snapshot.val().wins
                }
                commit('setUser', userData)
                commit('setPlaygroups', snapshot.val().playgroups )
                commit('setLoading', false)
              }
            ).catch(
              error =>{
                commit('setLoading', false)
                commit('setError', error)
                console.log(error)
              });

          }).catch(
            error =>{
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            }
          )
      },

      createGame({commit}){
        commit('setLoading', true)
        commit('clearError')
        const newGameID = Math.random().toString(36).substr(2, 5);
        const gameInfo = {id: newGameID }
        db.ref('games/' + newGameID ).set(gameDefaults)
          .then(() => {
            commit('setLoading', false)
            commit('changeGame', gameInfo);
          }).catch(
            error =>{
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            }
          )
      },

      createPlayGroup({commit, state}){
        commit('setLoading', true)
        const newPlayGroup = {
          active: Math.random().toString(36).substr(2, 9)
        }
        db.ref('playgroups/' + newPlayGroup.active +'/playerList/' + state.user.id ).set(state.user)
          .then(() => {
            db.ref('users/' + firebase.auth().currentUser.uid + '/playgroups/').set(newPlayGroup)
            .then(() => {
              commit('setLoading', false)
              commit('setPlaygroups', newPlayGroup)
            }).catch(error =>{
                commit('setLoading', false)
                commit('setError', error)
                console.log(error)
              });

          }).catch(
            error =>{
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            }
          )
      },

      addPlayerToGroup({commit, state}, newPlayerInfo){
        const newKey = db.ref('playgroups/' + state.playgroups.active + '/playerList'  ).push().key
        db.ref('playgroups/' + state.playgroups.active + '/playerList/' + newKey   ).set(newPlayerInfo)
      },


      clearError({commit}){
        commit('clearError')
      }
    },




    getters:{
      loadedGame: (state) => {return state.gameInfo;},
      user:  (state) => {return state.user;},
      error: (state) => {return state.error},
      loading: (state) => {return state.loading},
      playgroups: (state) => {return state.playgroups}
    }
});
