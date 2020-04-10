<template>
  <div id="appDiv">
  <div id="app" ref="app">
    <keep-alive>
    <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
  }
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
</style>
