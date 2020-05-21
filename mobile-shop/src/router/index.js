import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/home'
import Classify from '../components/classify/classify'
import ShopCar from '../components/shop-car/shopCar'
import Mine from '../components/mine/mine'
import store from '../store/index'
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
        index: 1
      }
    },
    {
      path: '/classify',
      component: Classify,
      meta: {
        keepAlive: true,
        index: 1
      }
    },
    {
      path: '/shopCar',
      component: ShopCar,
      meta: {
        keepAlive: true,
        index: 1
      },
    },
    {
      path: '/shopCar2',
      component: () => import('../components/shop-car/shopCar2'),
      meta: {
        keepAlive: true,
        index: 3
      },
    },
    {
      path: '/mine',
      component: Mine,
      meta: {
        keepAlive: true,
        index: 1
      },
    },
    {
      path: '/search',
      component: () => import("../components/common/search/search"),
      meta: {
        keepAlive: true,
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
        index: 999
      }
    },
    {
      path: '/choosePlace',
      component: () => import("../components/choosePlace"),
      meta: {
        keepAlive: true,
        index: 8
      }
    },
    {
      path: '/login',
      component: () => import("../components/login/login"),
      meta: {
        keepAlive: true,
        index: 999
      }
    },
    {
      path: '/set',
      component: () => import('../components/mine/set'),
      meta: {
        keepAlive: true,
        index: 2
      }
    },
    {
      path: '/myNews',
      component: () => import('../components/common/myNews'),
      meta: {
        keepAlive: true,
        index: 2,
        needLogin: true
      }
    },
    {
      path: '/makeDeal',
      component: () => import('../components/shop-car/makeDeal'),
      meta: {
        keepAlive: true,
        index: 4,
        needLogin: true
      }
    },
    {
      path: '/myForm',
      component: () => import('../components/mine/myForm'),
      meta: {
        keepAlive: true,
        index: 2,
        needLogin: true
      }
    },
    {
      path: '/myAddress',
      component: () => import('../components/mine/myAddress'),
      meta: {
        keepAlive: true,
        index: 5,
        needLogin: true
      }
    },
    {
      path: '/addAddress',
      component: () => import('../components/mine/addAddress'),
      meta: {
        keepAlive: true,
        index: 6,
        needLogin: true
      }
    },
    {
      path: '/afterSale',
      component: () => import('../components/mine/afterSale'),
      meta: {
        keepAlive: true,
        index: 2,
        needLogin: true
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
  if (to.meta.needLogin) {
    if (!store.state.isLogin) {
      next('/login');
      return;
    }
  }
  next();
});
router.afterEach((to, from) => {
  if (to.meta.keepAlive) {
  }
});
export default router;
