import firebase from 'firebase'
import {db} from '../firebase'

import {gameDefaults} from '../defaults'
import {userDefaults} from '../defaults'
import {playerDefaults} from '../defaults'


//USER ACCOUNT STUFF


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





//PLAYGROUP STUFF
export const setIsSearching = ({commit}, searchedGroupID) =>  commit('setIsSearching', searchedGroupID)

export const setNotSearching = ({commit}) =>  commit('setNotSearching')

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
      // newPlayerInfo['gameHistory'] = ''
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
    // console.log(newPlayerList)
    delete newPlayerList[playerID]
    // console.log(newPlayerList)
    commit('setPlayerList', newPlayerList)
  }).catch(
    error =>{
      commit('setLoading', false)
      commit('setError', error)
      console.log(error)
    })
}

export const allPlayGroups = ({commit}, payload) => {
  console.log(payload)
    commit('setPlaygroups', payload )

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

export const loadActivePlayGroupPlayers = ({commit, state}) => {
  commit('setLoading', true)
  commit('clearError')

  db.ref('playgroups/'+ state.activePlayGroup).once('value')
    .then((playgroup) => {

      const newPlayerList = playgroup.val().playerList

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

  //if in the payload we see that someone is requesting a player to claim
  const playerDetails = ( config.replacePlayer ) ?  state.playerList[config.requestedPlayerID] : playerDefaults

  //remove the temp flag from account
  delete playerDetails.temp

  //new user defaults + user name and ID
  const newPlayerDetails = {
    ...playerDetails,
    name: state.user.name,
    id: firebase.auth().currentUser.uid
  }

  //if we want to replace a player dispatch this action
  if( config.replacePlayer )
    dispatch('claimPlayerInGroup', {requestedPlayerID: config['requestedPlayerID'], newPlayerDetails: newPlayerDetails})
    .then(()=>{
        console.log('join group - claim player promise')
        updateUserData()
    })
    else
      dispatch('addPlayerToGroup', newPlayerDetails)
        .then(()=>{
            updateUserData()
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
  // commit('setLoading', true)
  // commit('clearError')

  console.log('claim player in group')

  //add the new player to the play group playerslist with the stats of the claimed player
  db.ref('playgroups/' + state.activePlayGroup + '/playerList/' + firebase.auth().currentUser.uid ).set( payload.newPlayerDetails )
    .then(() => {

      console.log(payload.requestedPlayerID)
      db.ref('playgroups/' + state.activePlayGroup + '/playerList/' + payload.requestedPlayerID).remove()

      console.log('player claimed')

      if(payload.newPlayerDetails.isPlaying){
        const replaceData = {
            player: payload.requestedPlayerID,
            gameid: payload.newPlayerDetails.isPlaying
          }
            dispatch('replacePlayerInActiveGames', replaceData)
      }
    }).catch(error =>{
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })


}

export const replacePlayerInActiveGames = ({commit, state}, replaceData) => {
  // console.log(replaceData.player)
  const updates = { }
  const playerToReplace = replaceData['player']
  const activeGameID = replaceData['gameid']
  const playerNames = []

  //gets the game data that temp player is currently in
  db.ref('games/'+ activeGameID).once('value')
    .then((gameData) => {

      //add this user to the activeGame players list within the play group
      updates['/playgroups/' + state.activePlayGroup + '/activeGames/' + activeGameID + '/players/' + firebase.auth().currentUser.uid ] = state.user

      //sets the game data (hp / cmd dmg) from temp user to variable
      const activeGamePlayerData = gameData.val().players[playerToReplace]

      //changes the ID from temp to User's ID
      activeGamePlayerData['id'] = firebase.auth().currentUser.uid

      //adds the User to the game with the stats from temp players
      updates['games/' + activeGameID + '/players/' +  firebase.auth().currentUser.uid ] = activeGamePlayerData

      //stores list of all players
      const activePlayers = gameData.val().players
      // console.log(activePlayers)
      //loops thru players and adds their names to an array
      for(let player in activePlayers){
        playerNames.push(activePlayers[player].name)
      }
      // console.log(playerNames)

      //adds the active game to the users list of active games
      updates['users/' + firebase.auth().currentUser.uid + '/activeGames/' + activeGameID ] = {
        id: activeGameID,
        players: playerNames,
        playgroup: state.activePlayGroup,
        playgroupName: state.activePlayGroupName
      }

      //pushs all updates to server
      db.ref().update(updates)
      .then(() => {
        commit('setLoading', false)
        //removes temp player from active game in playgroup
        console.log(playerToReplace)
        console.log(activeGameID)
        db.ref('playgroups/' + state.activePlayGroup + '/activeGames/' + activeGameID + '/players/' + playerToReplace ).remove()
        //removes temp player from live game
        db.ref('games/' + activeGameID + '/players/' + playerToReplace).remove()
      }).catch(
        error =>{
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    }).catch(error =>{
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
    }


    //GAME STUFF

  export const createGame = ({commit, dispatch}, isNewGame) => {
    commit('setLoading', true)
    commit('clearError')

    if(isNewGame){
      dispatch('clearActivePlayGroup')
      dispatch('clearActivePlayGroupName')
      dispatch('clearPlayerList')
    }

    dispatch('clearGame')

    const newGameID = Math.random().toString(36).substr(2, 5);
    const gameInfo = {
                ...gameDefaults,
                id: newGameID
              }

    db.ref('games/' + newGameID ).set(gameDefaults)
      .then(() => {
        commit('setLoading', false)
        commit('setGame', gameInfo)
      }).catch(
        error =>{
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
  }



export const startGame = ({commit, state, dispatch}, gameConfig ) => {
  commit('setLoading', true)
  commit('clearError')

  const updates = { }
  const startingLifeTotal = gameConfig.startingLifeTotal
  const selectedPlayers = gameConfig.selectedPlayers


  selectedPlayers.forEach((playerID) => {
    //used to store list of player names in user data.
    //so we can display the list of player names before you join the game
    // **** THINK ABOUT REMOVING THIS
    let playersNames = [ ]

    //value of Commander Damage taken.
    let setCommanderDamage = { }

    selectedPlayers.forEach((key) => {
      //array of all players names
      // console.log(state.playerList[key].name)
      playersNames.push(state.playerList[key].name)

      //object array, {PLAYERNAME : 00 (Amount of CMD DAMAGE)} only need values for opponents
      playerID === key ?  console.log(" ") : (setCommanderDamage[state.playerList[key].name] = 0)
    })


    //adds this player to the active games list in the play group
    updates['/playgroups/' + state.activePlayGroup + '/activeGames/' + state.gameInfo.id + '/players/' + state.playerList[playerID].id ] = state.playerList[playerID].name

    //flags this player in the playgroup as playing =  this is used when trying to claim a player in a playgroup
    updates['/playgroups/' + state.activePlayGroup + '/playerList/' + state.playerList[playerID].id + '/isPlaying' ] = state.gameInfo.id

    //add player to the game
    updates['/games/' + state.gameInfo.id + '/players/' + state.playerList[playerID].id ] =
    {
      name: state.playerList[playerID].name,
      id: state.playerList[playerID].id,
      life: startingLifeTotal,
      cmd: setCommanderDamage
    }
    //if the player is a user add this game data to there account info for quick joining
    if(!state.playerList[playerID].temp)
      updates['/users/'+ state.playerList[playerID].id + '/activeGames/' +  state.gameInfo.id ] = {
        id: state.gameInfo.id,
        playgroup: state.activePlayGroup,
        playgroupName: state.activePlayGroupName,
        players: playersNames
      }
    })  //end of player loop

    //add playgroup id to active game
    updates['/games/' +  state.gameInfo.id + '/playgroup' ] = state.activePlayGroup
    //change status from setup to active
    updates['/games/' +  state.gameInfo.id + '/status' ] = 'active'
    //store staring life total  (could be game mode)
    updates['/games/' +  state.gameInfo.id + '/startingLife' ] = startingLifeTotal
    //set flag on playgroup that there is an active game
    updates['/playgroups/' + state.activePlayGroup + '/status'] = 'playing'
    //adds game id to feild in playgroups / activegmaes/
    updates['/playgroups/' + state.activePlayGroup + '/activeGames/' +  state.gameInfo.id + '/id'] =  state.gameInfo.id

    //commit changes to database
    return db.ref().update(updates)
    .then(() => {
      commit('setLoading', false)
      dispatch('updateGameStatus', 'active')
    }).catch(
      error =>{
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
}


  export const changeGame = ({commit}, newGameInfo) => {
    commit('setGame', newGameInfo)
  }


export const connectToGame = ({commit, state}, gameData) => {

    commit('setActivePlayGroup', gameData.playgroup)
    commit('setActivePlayGroupName', gameData.playgroupName)
    commit('setGame', {id: gameData.id, status: 'active'})

  }

  export const moveToEndStep = ({commit, state, dispatch}) => {
    commit('setLoading', true)
    commit('clearError')
    db.ref('games/' + state.gameInfo.id + '/status').set('ending')
    .then(() => {
      commit('setLoading', false)
      dispatch('updateGameStatus', 'ending')
    }).catch(error =>{
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
    })
  }

  export const cancelEndStep = ({commit, state, dispatch}) => {
    commit('setLoading', true)
    commit('clearError')
    const updates = { }
    updates['games/' + state.gameInfo.id + '/status'] = 'active'
    updates['games/' + state.gameInfo.id + '/winner'] = ''

      return db.ref().update(updates)
      .then(() => {
        dispatch('updateGameStatus', 'ending')
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        console.log(error)
      })
  }

  export const selectWinner = ({commit, state}, winnerID) => {
    commit('setLoading', true)
    commit('clearError')
    db.ref('games/' + state.gameInfo.id + '/winner').set(winnerID)
    .then(() => {
      commit('setLoading', false)
    }).catch(error =>{
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
    })
  }

  export const closeGame = ({commit, state, dispatch }, winnerID) => {
    commit('setLoading', true)
    commit('clearError')
    const updates = { }
    const playersInGame = [ ]
    const completedGameData = { }

    //get game info from server
    db.ref('games/' + state.gameInfo.id  ).once('value')
    .then((gameData) => {

      //archive game in completedGames
      updates['completedGames/' + state.gameInfo.id ] = gameData.val()


      // completedGameData['players'] = gameData.val().players
      // completedGameData['playgroup'] = gameData.val().playgroup

      //turn player IDs into an array
      Object.keys(gameData.val().players ).forEach(function(playerID) {
        playersInGame.push(gameData.val().players[playerID].id)
      })

      // console.log(completedGameData)
      // console.log(playersInGame)

      //get playgroup data
      db.ref('playgroups/' + state.activePlayGroup  ).once('value')
      .then((playGroupData) => {

        //console.log(playGroupData.val())

        //loop thru all the player IDs in the game
        playersInGame.forEach((player) => {
          //console.log(player)
          //if the player was the winner get his win count and add 1
          if ( player === winnerID ){
            const wins = playGroupData.val().playerList[player].wins + 1
            updates['playgroups/' + state.activePlayGroup + '/playerList/' + winnerID + '/wins/'] = wins
          }

          //if it is a tempory non-user account game history is stored at in the playGroups
          if(playGroupData.val().playerList[player].temp){
            // console.log(history)
            //GAME STATS TO SAVE
            //save game in history
            updates['playgroups/' + state.activePlayGroup + '/playerList/' + player + '/gameHistory/' + state.gameInfo.id ] = state.gameInfo.id
            //set is playing to false
            updates['playgroups/' + state.activePlayGroup + '/playerList/' + player + '/isPlaying/'] = false
            //console.log("is temp player")

          } else {

            //let history = playGroupData.val().playerList[player].gameHistory !== '' ? (playGroupData.val().playerList[player].gameHistory + ',' + state.gameInfo.id) : state.gameInfo.id
            // console.log(history)

            //store game history in users info
            updates['users/' + player + '/gameHistory/' + state.gameInfo.id ] = state.gameInfo.id
            //remove active game from users list
            updates['users/' + player + '/activeGames/' + state.gameInfo.id] = null
          }
        })

        //remove active game from playgroup and games list
        updates['playgroups/' +  state.activePlayGroup + '/activeGames/' + state.gameInfo.id] = null
        updates['games/' + state.gameInfo.id] = null

        // send updates to server
        return db.ref().update(updates)
        .then(() => {
          db.ref('completedGames/' + state.gameInfo.id + '/status/').set('closed')
          commit('setLoading', false)
          console.log("game data recorded")
          dispatch('updateGameStatus', 'closed')

        }).catch(error => {
          commit('setLoading', false)
          console.log(error)
        })

        //get playgroup data catch
      }).catch(error =>{
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
      })

      //get game data catch
    }).catch(error =>{
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
    })

  }




export const updateGameStatus = ({commit}, newStatus) => commit('updateGameStatus', {status: newStatus})

export const clearGame = ({commit}) => commit('clearGame')

export const clearPlayerList = ({commit}) => commit('clearPlayerList')

export const clearActivePlayGroup = ({commit}) => commit('clearActivePlayGroup')

export const clearActivePlayGroupName = ({commit}) => commit('clearActivePlayGroupName')

export const clearError =({commit}) => commit('clearError')
