import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    footerIndex: 'home',
  },
  mutations: {
    footerIndexChange(state, aim) {
      state.footerIndex = aim;
    },
  },
  getters: {},
  actions: {},
});
export default store
