// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
// import '../static/normalize.css'
import '../static/flexible.min'
import store from './store'
import '../static/animate.css'
import axios from 'axios'

Vue.use(Vant);
Vue.config.productionTip = false;

// axios.get('http://192.168.43.218/shop/getHotRecommend.php').then(data => {
// }).catch(() => {
//   alert('123');
// });

document.addEventListener('plusready', () => {
  let now = false;
  let time = null;
  plus.key.addEventListener('backbutton', () => {
    if (
      router.currentRoute.path === '/home' ||
      router.currentRoute.path === '/classify' ||
      router.currentRoute.path === '/shopCar' ||
      router.currentRoute.path === '/mine'
    ) {
      time = null;
      if (now) {
        now = false;
        plus.runtime.quit();
      } else {
        now = true;
        plus.nativeUI.toast('再按一次退出', { duration: 'short' });
        time = setTimeout(() => {
          now = false
        }, 1000)
      }
    } else {
      setTimeout(() => {
        router.go(-1);
      },150)
    }
  },false);
  var height = document.documentElement.clientHeight || document.body.clientHeight;
  plus.webview.currentWebview().setStyle({
    height: height
  });
  window.onresize = function() {
    plus.webview.currentWebview().setStyle({
      height: height
    })
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
