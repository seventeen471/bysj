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
    pageY: '',
    isDeleteChoosed: false,
    detailObj: {},
    place: {
    },
    userInfo: {},
    isLogin: false,
    chooseAddress: {},
    myAddressList: [],
    dealObj: {},
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
          if (state.isDeleteChoosed) {
            continue;
          }
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
    },
    changeIsDeleteChoosed(state,value) {
      state.isDeleteChoosed = value;
    },
    setDetaliObj(state,obj){
      state.detailObj = obj;
    },
    setPlace(state,obj){
      state.place = obj;
    },
    setUserInfo(state,obj){
      state.userInfo = obj;
    },
    setIsLogin(state,value){
      state.isLogin = value;
    },
    setChooseAddress(state,value){
      state.chooseAddress = value;
    },
    setMyAddressList(state,value){
      state.myAddressList = value;
    },
    setDealObj(state,value){
      state.dealObj = value;
    },
  },
  getters: {},
  actions: {},
});
export default store
