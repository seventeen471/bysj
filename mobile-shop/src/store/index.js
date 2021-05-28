import Vue from 'vue'
import Vuex from 'vuex'
import { Toast } from 'vant';

Vue.use(Toast);

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    // isAnimate: false,
    shopCarArr: [],
    checkArr: [],
    pageX: '',
    pageY: '',
    isDeleteChoosed: false,
    detailObj: {},
    place: {
    },
    place_receipt: {
    },
    userInfo: {},
    isLogin: false,
    chooseAddress: {},
    myAddressList: [],
    dealObj: {},
    formObj: {
      status: '1',
      dikou: '3.6',
      postFee: '4.5',
      total: ''
    }
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
    subShopCar(state,id){
      let newArr = [];
      state.shopCarArr.forEach(e => {
        if (e.id === id) {
          if (!state.isDeleteChoosed) {
            e.myMount -= 1
            if (e.myMount !== 0) {
              newArr.push(e);
            } else {
              setTimeout(() => {
                state.checkArr.splice(1, state.checkArr.indexOf(id))
              })
            }
          } else {
            setTimeout(() => {
              state.checkArr.splice(1, state.checkArr.indexOf(id))
            })
          }
        } else {
          newArr.push(e); //放进去原有的
        }
      })
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
      state.detailObj.src_d = ''
      setTimeout(() => {
        state.detailObj = obj;
      })
    },
    setPlace(state,obj){
      state.place = obj;
    },
    setPlace_receipt(state,obj){
      state.place_receipt = obj;
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
    setFormObj(state,value){
      state.formObj = value;
    },
  },
  getters: {},
  actions: {},
});
export default store
