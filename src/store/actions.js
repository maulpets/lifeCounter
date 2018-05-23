import firebase from 'firebase'
import {db} from '../firebase'

import {gameDefaults} from '../defaults'
import {userDefaults} from '../defaults'
import {playerDefaults} from '../defaults'


export const changeGame = ({commit}, newGameInfo) => {
  commit('setGame', newGameInfo)
}

export const signUpUser = ({commit}, newUserInfo) => {
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
}

export const loginUser = ({commit}, loginUserInfo ) => {
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
        })
      }).catch( error =>{
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
}

export const createGame = ({commit}) => {
  commit('setLoading', true)
  commit('clearError')

  const newGameID = Math.random().toString(36).substr(2, 5);
  const gameInfo = {id: newGameID }
  db.ref('games/' + newGameID ).set(gameDefaults)
    .then(() => {
      commit('setLoading', false)
      commit('setGame', gameInfo)
      commit('clearPlayerList')
    }).catch(
      error =>{
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
}

export const createPlayGroup = ({commit, state, dispatch}) => {
  commit('setLoading', true)
  commit('clearError')
  commit('setActivePlayGroup', '')
  commit('clearPlayerList')
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
      })
}

export const makePlayGroup = ({commit, state}, newPlayGroup) => {
  commit('setLoading', true)
  commit('clearError')
  // console.log(newPlayGroup)
  db.ref('playgroups/' + newPlayGroup.id ).child('name').set( newPlayGroup.name )
  db.ref('playgroups/' + newPlayGroup.id ).child('status').set('active')
    .then(() => {
      db.ref('users/' + firebase.auth().currentUser.uid + '/playgroups/' ).child(newPlayGroup.id).set({name: newPlayGroup.name, id: newPlayGroup.id})

    }).catch(
      error =>{
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
}

export const addPlayerToGroup = ({commit, state}, newPlayerInfo) => {
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
      })
}

export const removePlayerFromGroup = ({commit, state}, playerID) => {
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
    })
}

export const loadPlayGroup = ({commit}, newActivePlayGroup) => {
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
      })
}



export const joinPlayGroup = ({commit, state, dispatch}, config) => {

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
        updateUserData()
    }).catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    else
      dispatch('addPlayerToGroup', newPlayerDetails)
        .then(()=>{
            updateUserData()
        }).catch(
            error => {
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            })


  function updateUserData(){

      const userData = {
          name: state.activePlayGroupName,
          id: state.activePlayGroup
      }

      db.ref('users/' + firebase.auth().currentUser.uid + '/playgroups/' ).child(state.activePlayGroup).set(userData)
      .then(() => {
        commit('setLoading', false)
      }).catch(error =>{
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
  }
}

export const claimPlayerInGroup = ({commit, state, dispatch}, payload) => {
  commit('setLoading', true)
  commit('clearError')

  console.log(payload)

  db.ref('playgroups/' + state.activePlayGroup + '/playerList/' + firebase.auth().currentUser.uid ).set( payload.newPlayerDetails )
    .then(() => {
      db.ref('playgroups/' + state.activePlayGroup + '/playerList/').child(payload.requestedPlayerID).remove()
        .then(() => {
          commit('setLoading', false)
          console.log('player claimed')
          if(payload.newPlayerDetails.isPlaying){
            const replaceData = {
              player: payload.requestedPlayerID,
              gameid: payload.newPlayerDetails.isPlaying
            }
            dispatch('replacePlayerInActiveGames', replaceData)
          }
        }).catch(
          error =>{
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          })
    }).catch(
      error =>{
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })


}

export const replacePlayerInActiveGames = ({commit, state}, replaceData) => {
  commit('setLoading', true)
  commit('clearError')
  // console.log(replaceData.player)
  const updates = { }
  const playerToReplace = replaceData['player']
  const activeGameID = replaceData['gameid']
  const playerNames = []

  db.ref('games/'+ activeGameID).once('value')
    .then((gameData) => {

      updates['/playgroups/' + state.activePlayGroup + '/activeGames/' + activeGameID + firebase.auth().currentUser.uid ] = state.user.id
      const activeGamePlayerData = gameData.val().players[playerToReplace]
      activeGamePlayerData['id'] = firebase.auth().currentUser.uid
      updates['games/' + activeGameID + '/players/' +  firebase.auth().currentUser.uid ] = activeGamePlayerData
      const activePlayers = gameData.val().players
      // console.log(activePlayers)
      for(let player in activePlayers){
        playerNames.push(activePlayers[player].name)
      }
      // console.log(playerNames)
      updates['users/' + firebase.auth().currentUser.uid + '/activeGames/' + activeGameID ] = {
        id: activeGameID,
        players: playerNames,
        playgroup: state.activePlayGroup,
        playgroupName: state.activePlayGroupName
      }

      db.ref().update(updates)
      .then(() => {
        commit('setLoading', false)
        db.ref('playgroups/' + state.activePlayGroup + '/activeGames/' + payload.activeGameID).child(playerToReplace).remove()
        db.red('games/' + activeGameID + '/players').child(playerToReplace).remove()
      }).catch(
        error =>{
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    }).catch(
      error =>{
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
    }

export const connectToGame = ({commit, state}, gameData) => {

    commit('setActivePlayGroup', gameData.playgroup)
    commit('setActivePlayGroupName', gameData.playgroupName)
    commit('setGame', {id: gameData.id})

  }

export const clearGame = ({commit}) => commit('clearGame')

export const clearPlayerList = ({commit}) => commit('clearPlayerList')

export const clearActivePlayGroup = ({commit}) => commit('clearActivePlayGroup')

export const clearActivePlayGroupName = ({commit}) => commit('clearActivePlayGroupName')

export const clearError =({commit}) => commit('clearError')
