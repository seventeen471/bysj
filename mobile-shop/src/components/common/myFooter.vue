<template>
    <div>
      <div class="footer">
        <router-link to="home">
          <div :style="$route.path === '/home' ? yellow : grey">
            <van-icon v-if="$route.path !== '/home'" name="shop-o" size="0.9rem" color="#bfbfbf"/>
            <van-icon v-if="$route.path === '/home'" name="shop" color="#FA8072" size="0.9rem"/>
            <p style="margin-left: 0.1rem">首页</p>
          </div>
        </router-link>
        <router-link to="classify">
          <div class="classify" :style="$route.path === '/classify' ? yellow : grey">
            <img src="../../assets/classify1.png" v-if="$route.path !== '/classify'">
            <img src="../../assets/classify2.png" v-if="$route.path === '/classify'">
            <p>分类</p>
          </div>
        </router-link>
        <router-link to="shopCar">
          <div :style="$route.path === '/shopCar' ? yellow : grey" class="shopCar">
            <van-icon name="shopping-cart-o" size="0.9rem" color="#bfbfbf" v-if="$route.path !== '/shopCar'"/>
            <van-icon name="shopping-cart" color="#FA8072" size="0.9rem" v-if="$route.path === '/shopCar'"/>
            <p>购物车</p>
          </div>
        </router-link>
        <router-link to="mine">
          <div :style="$route.path === '/mine' ? yellow : grey">
            <van-icon name="manager-o" size="0.9rem" color="#bfbfbf" v-if="$route.path !== '/mine'"/>
            <van-icon name="manager" color="#FA8072" size="0.9rem" v-if="$route.path === '/mine'"/>
            <p style="margin-left: 0.1rem">我的</p>
          </div>
        </router-link>
      </div>
    </div>
</template>

<script>
    export default {
        name: "myFooter",
        data() {
          return {
            yellow: 'color: #FA8072',
            grey: 'color: #bfbfbf',
          }
      },
      methods: {
      }
    }
</script>

<style lang="less" scoped>
  .footer{
    display: flex;
    width: 100%;
    justify-content: space-around;
    /*top: 19.7rem;*/
    bottom: 0;
    /*top: 91.5%;*/
    font-size: 0.35rem;
    /*transform: translateY(19.8rem);*/
    position: fixed;
    background-color: #fff;
    padding-top: 0.267rem;
    padding-bottom: 1%;
    z-index: 2;
    p{
      margin-top: 0;
    }
  }

  .classify{
    transform: translateX(0.113rem);
    img {
      width: 0.78rem;
      margin-top: 0.12rem;
    }
  }
  .shopCar{
    transform: translateX(0.213rem);
  }
</style>
