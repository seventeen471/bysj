import Vue from 'vue'
import Vuex from 'vuex'
import { Toast } from 'vant';

Vue.use(Toast);

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    // isAnimate: false,
    shopCarArr: [],
    pageX: '',
    pageY: ''
  },
  mutations: {
    // isAnimateChange(state, is) {
    //   state.isAnimate = is;
    // },
    addShopCar(state,obj){
      let isHas = false;
      if (state.shopCarArr.length) {
        let newArr = [];
        for (let i = 0; i < state.shopCarArr.length; i++) {
          if (state.shopCarArr[i].id === obj.id) {
            isHas = true;
            obj.myMount = state.shopCarArr[i].myMount + 1;
            newArr.push(obj);
          } else {
            newArr.push(state.shopCarArr[i]); //放进去原有的
          }
        }
        if (!isHas) {
          obj.myMount = 1;
          newArr.push(obj);
        }
        state.shopCarArr = newArr;
      } else {
        obj.myMount = 1;
        state.shopCarArr.push(obj);
      }
    },
    subShopCar(state,obj){
      // for (let i=0 ; i<state.shopCarArr.length; i++) {
      //   if (state.shopCarArr[i].id === obj.id) {
      //     let oldMount = obj.myMount;
      //     if (oldMount === 1) {
      //
      //     }
      //     state.shopCarArr.splice(i,1);
      //     if (oldMount !== 1) {
      //       obj['myMount'] = oldMount - 1;
      //       state.shopCarArr.push(obj);
      //     }
      //     break;
      //   }
      // }
      let newArr = [];
      for (let i = 0; i < state.shopCarArr.length; i++) {
        if (state.shopCarArr[i].id === obj.id) {
          obj.myMount = state.shopCarArr[i].myMount - 1;
          if (obj.myMount !== 0) {
            newArr.push(obj);
          }
        } else {
          newArr.push(state.shopCarArr[i]); //放进去原有的
        }
      }
      state.shopCarArr = newArr;
    },
    changePageX(state,value){
      state.pageX = value;
    },
    changePageY(state,value){
      state.pageY = value;
    }
  },
  getters: {},
  actions: {},
});
export default store
