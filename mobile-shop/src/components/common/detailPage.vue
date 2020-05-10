<template>
    <div id="detailDiv">
      <div class="header">
        <div class="topDiv"></div>
        <van-icon name="arrow-left" color="rgba(0,0,0,0.6)" size="0.6rem" style="position: absolute;top: 57%;left: 1%" @click="back()"/>
        <p>商品详情</p>
      </div>
      <div class="body">
        <div class="imgDiv">
        <img :src="$store.state.detailObj['src']">
        </div>
        <div class="wordDiv">
          <p>{{$store.state.detailObj['big_title']}}</p>
          <p>{{$store.state.detailObj['small_title']}}</p>
          <span class="charge"><span style="font-size: 0.38rem">￥</span>{{$store.state.detailObj['charge']}}<span style="color: rgba(0,0,0,0.8);font-size: 0.34rem">/份</span></span>
          <span class="saleMount">月销量 {{0}}件</span>
        </div>
        <img :src="$store.state.detailObj['src_d']">
      </div>
      <div class="footer">
        <van-icon class="shopCar" name="shopping-cart-o" size="0.9rem" color="#bfbfbf" :info="info"/>
        <van-button type="primary" color="#FA8072" class="addToCar" @click.stop="addThis($store.state.detailObj)">加入购物车</van-button>
      </div>
    </div>
</template>

<script>
  import { Toast } from 'vant';
    export default {
        name: "detailPage",
      methods: {
          back(){
            this.$router.go(-1);
          },
        addThis(item){
          this.$store.commit('addShopCar',item);
          Toast.success('添加成功');
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
    }
</script>

<style lang="less" scoped>
  .header {
    position: fixed;
    width: 100vw;
    height: 10vh;
    background-color: #fff;
    border-bottom: 1px solid #f5f5f5;
  .topDiv {
    width: 100vw;
    height: 46%;
    background-color: rgba(0, 0, 0, 0.12);
  }
  p{
    text-align: center;
    margin-top: 2.5%;
    font-size: 0.47rem;
    color: rgba(0,0,0,0.8);
  }
  span{
    position: absolute;
    top: 57%;
    right: 4%;
    font-size: 0.44rem;
    color: rgba(0,0,0,0.8);
  }
  }
  .body{
    height: 80.8vh;
    width: 100%;
    position: absolute;
    top: 10vh;
    overflow-y: scroll;
    overflow-x: hidden;
    .imgDiv {
      background-color: #fff;
      display: flex;
      justify-content: center;
      img {
        width: 70%;
      }
    }
    .wordDiv{
      width: 100%;
      height: 18%;
      background-color: #fff;
      padding-left: 3%;
      p:nth-child(1){
        font-size: 0.45rem;
        opacity: 0.8;
      }
      p:nth-child(2){
        font-size: 0.38rem;
        opacity: 0.4;
        margin-top: 2%;
        margin-bottom: 5%;
      }
      .charge{
        color: #FF6347;
        font-size: 0.55rem;
        float: left;
      }
      .saleMount{
        font-size: 0.4rem;
        opacity: 0.4;
        float: right;
        margin-right: 8%;
        margin-top: 1%;
      }
    }
    img{
      margin-top: 2%;
      width: 100%;
    }
  }
  .footer{
    width: 100%;
    height: 9vh;
    position: absolute;
    background-color: #fff;
    bottom: 0;
    .shopCar{
      position: absolute;
      top: 30%;
      left: 7%;
    }
    .addToCar{
      position: absolute;
      top: 20%;
      right: 5%;
      width: 70%;
      font-size: 0.42rem;
      font-weight: bold;
      border-radius: 0.25rem;
    }
  }
</style>
