import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    // footerIndex: 'home',
    // isAnimate: false,
    classIndex: 1,
  },
  mutations: {
    // footerIndexChange(state, aim) {
    //   state.footerIndex = aim;
    // },
    // isAnimateChange(state, is) {
    //   state.isAnimate = is;
    // },
    classIndexChange(state, value) {
      state.classIndex = value;
    },
  },
  getters: {},
  actions: {},
});
export default store
