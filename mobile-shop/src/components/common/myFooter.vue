<template>
    <div class="footerDiv">
      <div class="footer">
        <router-link to="home">
          <div :style="$route.path === '/home' ? yellow : grey">
            <van-icon v-if="$route.path !== '/home'" name="shop-o" size="0.7rem" color="#bfbfbf"/>
            <van-icon v-if="$route.path === '/home'" name="shop" color="#FA8072" size="0.7rem"/>
            <p>首页</p>
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
            <van-icon name="shopping-cart-o" size="0.7rem" color="#bfbfbf" v-if="$route.path !== '/shopCar' && !$store.state.shopCarArr.length"/>
            <van-icon name="shopping-cart" color="#FA8072" size="0.7rem" v-if="$route.path === '/shopCar' && !$store.state.shopCarArr.length"/>
            <van-icon name="shopping-cart-o" size="0.7rem" color="#bfbfbf" :info="info" v-if="$route.path !== '/shopCar' && $store.state.shopCarArr.length"/>
            <van-icon name="shopping-cart" color="#FA8072" size="0.7rem" :info="info" v-if="$route.path === '/shopCar' && $store.state.shopCarArr.length"/>
            <p style="transform: translateX(-0.1rem)">购物车</p>
          </div>
        </router-link>
        <router-link to="mine">
          <div :style="$route.path === '/mine' ? yellow : grey">
            <van-icon name="manager-o" size="0.7rem" color="#bfbfbf" v-if="$route.path !== '/mine'"/>
            <van-icon name="manager" color="#FA8072" size="0.7rem" v-if="$route.path === '/mine'"/>
            <p>我的</p>
          </div>
        </router-link>
      </div>
        <img :style="'left:'+$store.state.pageX+'px;'+'top:'+$store.state.pageY+'px'" class="transitionImg">
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
      computed: {
        info() {
          let sum = 0;
          for (let item of this.$store.state.shopCarArr) {
            sum += item.myMount;
          }
          return sum;
        }
      },
      methods: {
      },
      mounted(){
        // const h = document.documentElement.clientHeight || document.body.clientHeight;
        // document.getElementsByClassName('footerDiv')[0].style.height = h * 7.6 + 'px';
        // setInterval(() => {
        //   console.log(document.getElementsByClassName('footerDiv')[0].style.height);
        //   console.log(document.getElementsByClassName('footerDiv')[0].clientHeight);
        // },2000);
      },
      watch: {
        $route() {
          try {
            document.getElementsByClassName('transitionImg')[0].style.display = 'none';
          } catch (e) {
          }

        }
      }
    }
</script>

<style lang="less" scoped>
  .footer{
    display: flex;
    width: 100%;
    height: 1.4rem;
    padding-top: 0.24rem;
    position: absolute;
    bottom: 0;
    justify-content: space-around;
    font-size: 0.35rem;
    background-color: #fff;
    p{
      margin-top: 0;
    }
  }

  .classify{
    transform: translateX(0.113rem);
    img {
      width: 0.65rem;
    }
  }
  .shopCar{
    transform: translateX(0.213rem);
  }
  .transitionImg{
    display: none;
    width: 2.5rem;
    position: absolute;
    z-index: 9999;
    animation: img 1s ease;
  }
  @keyframes img {
    0%{
      opacity: 1;
      transform: scale(1);
    }
    25%{
      opacity: 1;
      transform: scale(1);
    }
    50%{
      opacity: 1;
    }
    100%{
      opacity: 0;
      transform: scale(0);
      top: 88%;
      left: 51%;
    }
  }
</style>
