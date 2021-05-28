<template>
  <div>
    <shop-car></shop-car>
  </div>
</template>

<script>
  import shopCar from "./shopCar";
  export default {
    name: "shopCar2",
    components: {shopCar},
    beforeRouteEnter (to, from, next) {
      if (from.path === '/detailPage'||from.path === '/search'){
        window.sessionStorage.setItem('notFirst','true');
      } else{
        window.sessionStorage.setItem('notFirst','false');
      }
        next();
    },
    beforeRouteLeave(to,from,next){
      window.sessionStorage.setItem('notFirst','false');
      window.sessionStorage.setItem('toCar2Left','false');
      // if (to.path === '/detailPage' && window.sessionStorage.getItem('notFirst') === 'true') {
      //   window.sessionStorage.setItem('carToDetail','true');
      // } else {
      //   window.sessionStorage.setItem('carToDetail','false');
      // }
      next();
    },
    // beforeRouteEnter(to,from,next){
      // if (from.path === '/detailPage' || from.path === '/search') {
      //   window.sessionStorage.setItem('notFirst','true');
      // } else {
      //   window.sessionStorage.setItem('notFirst','false');
      // }
      // next();
    // },
    // destroyed() {
    //   document.getElementsByClassName('shopCarBody')[0].removeEventListener('scroll', () => {
    //     this.bodyScroll = document.getElementsByClassName('shopCarBody')[0].scrollTop.toString();
    //   }, false);
    // }
  }
</script>

<style lang="less" scoped>
</style>
