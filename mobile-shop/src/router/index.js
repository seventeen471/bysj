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
        isAnimation: true,
        index: 1
      }
    },
    {
      path: '/classify',
      component: Classify,
      meta: {
        keepAlive: true,
        isAnimation: true,
        index: 1
      }
    },
    {
      path: '/shopCar',
      component: ShopCar,
      meta: {
        keepAlive: true,
        isAnimation: true,
        index: 1
      },
    },
    {
      path: '/shopCar2',
      component: () => import('../components/shop-car/shopCar2'),
      meta: {
        keepAlive: true,
        isAnimation: true,
        index: 3
      },
    },
    {
      path: '/mine',
      component: Mine,
      meta: {
        keepAlive: true,
        isAnimation: true,
        index: 1
      }
    },
    {
      path: '/search',
      component: () => import("../components/common/search/search"),
      meta: {
        keepAlive: true,
        isAnimation: false,
        index: 2
      },
      // beforeEnter(to,from,next){
      //   if (from.path === '/detailPage'){
      //     to.meta.isAnimation = false;
      //   }
      //   next();
      // }
      // children: [
      //   {
      //     path: '/',
      //     redirect: 'beforeSearch'
      //   },
      //   {
      //     path: 'beforeSearch',
      //     component: () => import('../components/common/search/search1'),
      //     meta: {
      //       keepAlive: true,
      //       index: 2
      //     },
      //   },
      //   {
      //     path: 'afterSearch',
      //     component: () => import('../components/common/search/search2'),
      //     meta: {
      //       keepAlive: true,
      //       index: 3
      //     },
      //   }
      // ]
    },
    {
      path: '/detailPage',
      component: () => import("../components/common/detailPage"),
      meta: {
        keepAlive: true,
        isAnimation: true,
        index: 999
      }
    },
    {
      path: '/choosePlace',
      component: () => import("../components/choosePlace"),
      meta: {
        keepAlive: true,
        isAnimation: true,
        index: 2
      }
    }
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
    // let scrollTop = document.getElementById('app').scrollTop;
    // window.sessionStorage.setItem(from.meta.who, scrollTop.toString());
  }
  next();
});
router.afterEach((to, from) => {
  if (to.meta.keepAlive) {
  }
});
export default router;
