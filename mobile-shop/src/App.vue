<template>
  <div id="appDiv">
  <div id="app" ref="app">
    <div v-if="!$route.meta.isAnimation">
    <keep-alive>
    <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    </div>
    <div v-if="$route.meta.isAnimation">
      <keep-alive>
        <transition name="left">
        <router-view v-if="$route.meta.keepAlive"/>
        </transition>
      </keep-alive>
      <transition name="left">
      <router-view v-if="!$route.meta.keepAlive"/>
      </transition>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // transitionType: ''
    }
  },
  mounted() {
  },
  // watch: {//使用watch 监听$router的变化
  //   $route(to, from) {
  //     //如果to索引大于from索引,判断为前进状态,反之则为后退状态
  //     if (to.meta.index > from.meta.index) {
  //       //设置动画名称
  //       this.transitionType = 'left';
  //     } else {
  //       this.transitionType = 'right';
  //     }
  //   }
  // }
}
</script>

<style lang="less">
  #app {
  width: 10rem;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
}
  #appDiv{
    width: 10rem;
    overflow-x: hidden;
  }
  .left-enter{
    opacity: 1;
    transform: translateX(10rem);
  }
  .right-enter{
    opacity: 1;
    transform: translateX(-10rem);
  }
  .left-leave,.right-leave{
    opacity: 0;
  }
  .left-leave-to,.right-leave-to{
    opacity: 0;
    transform: translateX(0);
  }
  .left-enter-active, .left-leave-active, .right-enter-active, .right-leave-active{
    transition: transform 0.2s ease;
  }
  .v-enter, .v-leave-to{
    transform: translateX(10rem);
  }
  .v-enter-active, .v-leave-active{
    transition: all 0.2s ease;
  }
</style>
