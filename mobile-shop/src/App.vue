<template>
  <div id="appDiv">
  <div id="app" ref="app">
<!--    <div v-if="!$route.meta.isAnimation">-->
<!--    <keep-alive>-->
<!--    <router-view v-if="$route.meta.keepAlive"/>-->
<!--    </keep-alive>-->
<!--    <router-view v-if="!$route.meta.keepAlive"/>-->
<!--    </div>-->
<!--    <div v-if="$route.meta.isAnimation">-->
    <transition :name="animateName">
      <keep-alive>
        <router-view class="Router" :style="'height:'+h" v-if="$route.meta.keepAlive"/>
      </keep-alive>
    </transition>
      <transition :name="animateName">
      <router-view class="Router" :style="'height:'+h" v-if="!$route.meta.keepAlive"/>
      </transition>
<!--    </div>-->
  </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import axios from 'axios'
  import { Dialog } from 'vant';
  import { Indicator } from 'mint-ui';
  Vue.use(Dialog);
export default {
  name: 'App',
  data() {
    return {
      animateName: '',
      h: '',
      myAddressList: [],
    }
  },
  methods:{
    getMyAddress(){
      let param = new URLSearchParams();
      param.append('user', this.$store.state.userInfo.tel);
      axios.post(this.$url + 'shop/getAddress.php',param).then((data) => {
        this.myAddressList = data.data.data;
        this.$store.commit('setMyAddressList',data.data.data);
        this.myAddressList.forEach(e => {
          if (e.isDefault === 'true') {
            this.$store.commit('setPlace',e);
          }
        });
      });
    },
  },
  created(){
    Indicator.open('请稍候...');
    axios.get(this.$url + 'shop/getHotRecommend.php').then((data) => {
      Indicator.close();
    }).catch(() => {
      Indicator.close();
      Dialog.alert({
        message: '连接服务器失败',
      }).then(() => {
        plus.runtime.quit();
      });
    });
  },
  beforeMount(){
    const token = window.localStorage.getItem('token');
    if (token) {
      let param = new URLSearchParams();
      param.append('token', token);
      axios.post(this.$url + 'shop/login.php',param).then((data) => {
        this.$store.commit('setUserInfo', data.data.data[0]);
        this.$store.commit('setIsLogin', true);
        this.getMyAddress();
      })
    }
  },
  mounted() {
    // this.h = document.documentElement.clientHeight || document.body.clientHeight + 'px';
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.animateName = 'turn-left';
      } else if (to.meta.index < from.meta.index){
        this.animateName = 'turn-right';
      } else {
        this.animateName = '';
      }
      if (from.path === '/shopCar2' && (to.path === '/detailPage' || to.path === '/search')) {
        this.animateName = 'turn-right';
      }
      if (window.sessionStorage.getItem('isShopCar2ToDe') === 'true') {
        this.animateName = 'turn-left';
      }
      if (window.sessionStorage.getItem('toCar2Left') === 'true') {
        this.animateName = 'turn-left';
      }
      if (from.path === '/detailPage' && to.path === '/shopCar2' && window.sessionStorage.getItem('isShopCar2ToDe') === 'true') {
        this.animateName = 'turn-right';
      }
      if (from.path === '/dealResult' && to.path === '/makeDeal' && window.sessionStorage.getItem('isAgain') === 'true') {
        this.animateName = 'turn-left';
      }
      if (from.path === '/makeDeal' && to.path === '/dealResult' && window.sessionStorage.getItem('isAgain') === 'false') {
        this.animateName = 'turn-right';
      }
      // if (window.sessionStorage.getItem('continuePay') === 'true') {
      //   this.animateName = 'turn-left';
      // }
    }
  }
}
</script>

<style lang="less">
  #app{
    width: 10rem;
  }
  .Router {
    position: absolute;
    /*height: 100vh;*/
    /*transition: all .8s ease;*/
    /*animation: left-in 0.8s ease;*/
    /*will-change: transform;*/
    /*overflow: hidden;*/
    top: 0;
    /*backface-visibility: hidden;*/
    /*perspective: 1000;*/
    /*z-index: 9999;*/
  }
  @keyframes left-in {
    from{
      transform: translateX(10rem);
    }
    to{
      transform: translateX(0);
    }
  }
  @keyframes left-out {
    from{
      transform: translateX(0);
    }
    to{
      transform: translateX(10rem);
    }
  }
  @keyframes right-in {
    from{
      transform: translateX(-10rem);
    }
    to{
      transform: translateX(0);
    }
  }
  @keyframes right-out {
    from{
      transform: translateX(0);
    }
    to{
      transform: translateX(-10rem);
    }
  }
  .turn-left-enter-active{
    animation: left-in 0.4s ease;
  }
  .turn-left-leave-active{
    animation: right-out 0.4s ease;
  }
  .turn-right-enter-active{
    animation: right-in 0.4s ease;
  }
  .turn-right-leave-active{
    animation: left-out 0.4s ease;
  }
</style>
