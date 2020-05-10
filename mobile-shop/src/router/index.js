import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/home'
import Classify from '../components/classify/classify'
import ShopCar from '../components/shop-car/shopCar'
import Mine from '../components/mine/mine'
// import search from "../components/common/search";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      meta: {
        keepAlive: true,
        who: 'homeScrollTop',
      }
    },
    {
      path: '/classify',
      component: Classify,
      meta: {
        keepAlive: true,
      }
    },
    {
      path: '/shopCar',
      component: ShopCar,
      meta: {
        keepAlive: true,
      }
    },
    {
      path: '/mine',
      component: Mine,
      meta: {
        keepAlive: true,
      }
    },
    {
      path: '/search',
      component: () => import("../components/common/search/search"),
      meta: {
        keepAlive: false
      },
      // children: [
      //   {
      //     path: 'result',
      //     component: () => import('../components/common/search/result')
      //   }
      // ]
    },
    {
      path: '/detailPage',
      component: () => import("../components/common/detailPage"),
      meta: {
        keepAlive: true,
      }
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    // let top = parseFloat(window.sessionStorage.getItem(to.meta.who));
    // return { x: 0, y: top };
  //   // if (savedPosition) {
    //   return savedPosition
    // } else {
    //   return { x: 0, y: 0 }
    // }
  }
});
router.beforeEach((to, from, next) => {
  if (from.meta.keepAlive) {
    let scrollTop = document.getElementById('app').scrollTop;
    window.sessionStorage.setItem(from.meta.who, scrollTop.toString());
  }
  next();
});
router.afterEach((to, from) => {
  if (to.meta.keepAlive) {
  }
});
export default router;
