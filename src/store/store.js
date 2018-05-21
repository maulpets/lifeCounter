import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase'
import {db} from '../firebase'

import {gameDefaults} from '../defaults'
import {userDefaults} from '../defaults'
import {playerDefaults} from '../defaults'


Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {
    gameInfo: {id: null},
    user: null,
    loading: false,
    error: null,
    activePlayGroup: '',
    activePlayGroupName: '',
    playgroups: null,
    playerList: { },
    gameHistory: null,

  },
  mutations: {
    changeGame(state, newGameInfo) {
      state.gameInfo = Object.assign({}, newGameInfo)
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
      Vue.set(state.playerList, playerInfo.id, playerInfo)
    },
    setPlayerList(state, newPlayerList){
      state.playerList = Object.assign({}, newPlayerList)
    },
    setActivePlayGroup(state, newActivePlayGroup){
      state.activePlayGroup = newActivePlayGroup
    },
    setActivePlayGroupName(state, newActivePlayGroupName){
      state.activePlayGroupName = newActivePlayGroupName
    },
    clearPlayerList(state){
      state.playerList = { }
    },
    clearActivePlayGroup(state){
      state.activePlayGroup = ''
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
          })
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
                  name: snapshot.val().name
                }
                commit('setUser', userData)
                if(snapshot.val().playgroups)
                commit('setPlaygroups', snapshot.val().playgroups )
                commit('setLoading', false)
              }).catch( error =>{
                commit('setLoading', false)
                commit('setError', error)
                console.log(error)
              });
            }).catch( error =>{
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            });
      },

      createGame({commit}){
        commit('setLoading', true)
        commit('clearError')
        const newGameID = Math.random().toString(36).substr(2, 5);
        const gameInfo = {id: newGameID }
        db.ref('games/' + newGameID ).set(gameDefaults)
          .then(() => {
            commit('setLoading', false)
            commit('changeGame', gameInfo)
          }).catch(
            error =>{
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            }
          )
      },

      createPlayGroup({commit, state, dispatch}){
        commit('setLoading', true)
        commit('clearError')
        commit('setActivePlayGroup', '')
        commit('setPlayerList', { })
        const newActivePlayGroup = Math.random().toString(36).substr(2, 9)
        db.ref('playgroups/' + newActivePlayGroup ).set({status: 'new'})
          .then(() => {
              commit('setLoading', false)
              commit('setActivePlayGroup', newActivePlayGroup)
              const newPlayerInfo = {
                ...playerDefaults,
                name: state.user.name,
                id: state.user.id
              }
              dispatch('addPlayerToGroup', newPlayerInfo)
          }).catch(
            error =>{
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            }
          )
      },
      makePlayGroup({commit, state}, groupName){
        commit('setLoading', true)
        commit('clearError')
        console.log(groupName)
        db.ref('playgroups/' + state.activePlayGroup ).child('name').set( groupName )
        db.ref('playgroups/' + state.activePlayGroup ).child('status').set('active')
          .then(() => {
            db.ref('users/' + firebase.auth().currentUser.uid + '/playgroups/' ).child(state.activePlayGroup).set({name: groupName, id: state.activePlayGroup})

          }).catch(
            error =>{
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            }
          )

      },

      addPlayerToGroup({commit, state}, newPlayerInfo){
        commit('setLoading', true)
        commit('clearError')
        let playerID

        if( newPlayerInfo.id )
          playerID = newPlayerInfo.id
          else{
            playerID = db.ref('playgroups/' + state.activePlayGroup + '/playerList'  ).push().key
            newPlayerInfo['id'] = playerID
            newPlayerInfo['temp'] = true
          }
        db.ref('playgroups/' + state.activePlayGroup + '/playerList/' + playerID ).set( newPlayerInfo )
          .then(() => {
            commit('setLoading', false)
            commit('addPlayer', newPlayerInfo)
          }).catch(
            error =>{
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            }
          )
      },

      removePlayerFromGroup({commit, state}, playerID){
        commit('setLoading', true)
        commit('clearError')

        db.ref('playgroups/' + state.activePlayGroup + '/playerList/').child(playerID).remove()
        .then(()=>{
          commit('setLoading', false)
          const newPlayerList = state.playerList
          console.log(newPlayerList)
          delete newPlayerList[playerID]
          console.log(newPlayerList)
          commit('setPlayerList', newPlayerList)
        }).catch(
          error =>{
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
      },

      loadPlayGroup({commit}, newActivePlayGroup){
        commit('setLoading', true)
        commit('clearError')
        commit('setActivePlayGroup', newActivePlayGroup)

        db.ref('playgroups/'+ newActivePlayGroup).once('value')
          .then((playgroup) => {

            const newPlayerList = playgroup.val().playerList
            const newActivePlayGroupName = playgroup.val().name

            commit('setActivePlayGroupName', newActivePlayGroupName)

            commit('setPlayerList', newPlayerList)
            commit('setLoading', false)
          }).catch(
            error =>{
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            }
          )
      },

      joinPlayGroup({commit, state, dispatch}, config){

        const playerDetails = ( config.replacePlayer ) ?  state.playerList[config.requestedPlayerID] : playerDefaults

        delete playerDetails.temp

        const newPlayerDetails = {
          ...playerDetails,
          name: state.user.name,
          id: firebase.auth().currentUser.uid
        }




        if( config.replacePlayer )
          dispatch('claimPlayerInGroup', {requestedPlayerID: config['requestedPlayerID'], newPlayerDetails: newPlayerDetails})
          .then(()=>{
              commit('setLoading', false)
              set()
          }).catch(
              error => {
                commit('setLoading', false)
                commit('setError', error)
                console.log(error)
              })
          else
            dispatch('addPlayerToGroup', newPlayerDetails)
              .then(()=>{
                  commit('setLoading', false)
                  set()
              }).catch(
                  error => {
                    commit('setLoading', false)
                    commit('setError', error)
                    console.log(error)
                  })

        function set(){
            db.ref('users/' + firebase.auth().currentUser.uid + '/playgroups/' ).child(state.activePlayGroup).set({name: state.activePlayGroupName, id: state.activePlayGroup})
            .then(() => {
              commit('setLoading', false)
            }).catch(error =>{
                commit('setLoading', false)
                commit('setError', error)
                console.log(error)
              })
        }
      },

      claimPlayerInGroup({commit, state}, payload){
        commit('setLoading', true)
        commit('clearError')

        console.log(payload)


        db.ref('playgroups/' + state.activePlayGroup + '/playerList/' + firebase.auth().currentUser.uid ).set( payload.newPlayerDetails )
          .then(() => {
            db.ref('playgroups/' + state.activePlayGroup + '/playerList/').child(payload.requestedPlayerID).remove()
              .then(() => {
                commit('setLoading', true)
                console.log('player claimed')

              }).catch(
                error =>{
                  commit('setLoading', false)
                  commit('setError', error)
                  console.log(error)
                }
              )
          }).catch(
            error =>{
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            }
          )

      },
      clearPlayerList({commit}){
        commit('clearPlayerList')
      },

      clearActivePlayGroup({commit}){
        commit('clearActivePlayGroup')
      },
      clearError({commit}){
        commit('clearError')
      }
    },




    getters:{
      loadedGame: (state) => {return state.gameInfo},
      user:  (state) => {return state.user},
      error: (state) => {return state.error},
      loading: (state) => {return state.loading},
      playgroups: (state) => {return state.playgroups},
      playerList: (state) => {return state.playerList},
      activePlayGroup: (state) => { return state.activePlayGroup},
      activePlayGroupName: (state) => { return state.activePlayGroupName}
    }
});
