import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: {  },
    gameInfo: { id:"na" }
  },
  mutations: {
    changeGame(state, newGameInfo){
      state.gameInfo = newGameInfo;
      }
    },
    actions: {
      changeGame({commit}, newGameInfo){
        commit('changeGame', newGameInfo);
      }
    },
    getter:{
      loadedGame: state => {
        return gameInfo
      }
    }
});
