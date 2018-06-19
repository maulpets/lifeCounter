import Vue from 'vue'


export const setGame = (state, newGameInfo) => {
  state.gameInfo = Object.assign({}, newGameInfo)
}

export const updateGameStatus = (state, newStatus) => {
  state.gameInfo = Object.assign({id: state.gameInfo.id}, newStatus)
}

export const setUser = (state, userInfo) => {
  state.user = userInfo
}

export const setPlaygroups = (state, playgroups) => {
  state.playgroups = playgroups
}

export const setLoading = (state, isLoading) => {
  state.loading = isLoading
}

export const setError = (state, hasError) => {
  state.error = hasError
}

export const addPlayer = (state, playerInfo) => {
  Vue.set(state.playerList, playerInfo.id, playerInfo)
}

export const setPlayerList = (state, newPlayerList) => {
  state.playerList = Object.assign({}, newPlayerList)
}

export const setActivePlayGroup = (state, newActivePlayGroup) => {
  state.activePlayGroup = newActivePlayGroup
}

export const setActivePlayGroupName = (state, newActivePlayGroupName) => {
  state.activePlayGroupName = newActivePlayGroupName
}
export const clearPlayerList = (state) => {
  state.playerList = { }
}

export const clearActivePlayGroup = (state) => {
  state.activePlayGroup = ''
}

export const clearActivePlayGroupName = (state) => {
  state.activePlayGroupName = ''
}

export const clearGame = (state) => {
  state.gameInfo = Object.assign({}, {id: null})
}

export const setIsSearching = (state, groupID) => {
  state.searchStatus = true
  state.searchedGroupID = groupID
  console.log(groupID)
}

export const setNotSearching = (state) => {
  state.searchStatus = false
}

export const clearError = (state) => {
  state.error = null
}
