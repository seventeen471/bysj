import Vue from 'vue'
import Vuex from 'vuex'
import { Toast } from 'vant';

Vue.use(Toast);

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    // isAnimate: false,
    shopCarArr: [],
  },
  mutations: {
    // isAnimateChange(state, is) {
    //   state.isAnimate = is;
    // },
    addShopCar(state,obj){
      let isHas = false;
      let oldMount;
      for (let i=0 ; i<state.shopCarArr.length; i++) {
        isHas = (state.shopCarArr[i].id === obj.id);
        if (isHas) {
          oldMount = state.shopCarArr[i].myMount;
          state.shopCarArr.splice(i,1);
          break;
        }
      }
      if (!isHas) {
        obj['myMount'] = 1;
        state.shopCarArr.push(obj);
      } else {
        obj['myMount'] = oldMount + 1;
        state.shopCarArr.push(obj);
      }
      Toast.success('添加成功');
    },
    subShopCar(state,obj){
      for (let i=0 ; i<state.shopCarArr.length; i++) {
        if (state.shopCarArr[i].id === obj.id) {
          let oldMount = obj.myMount;
          state.shopCarArr.splice(i,1);
          if (oldMount !== 1) {
            obj['myMount'] = oldMount - 1;
            state.shopCarArr.push(obj);
          }
          break;
        }
      }
    }
  },
  getters: {},
  actions: {},
});
export default store
