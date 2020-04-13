<template>
    <div id="shopCar">
      <div class="header">
        <div class="topDiv"></div>
        <p>购物车</p>
      </div>
      <div class="shopCarBody">
        <div class="emptyDiv" v-if="goodsArr.length===0">
        <div class="empty">
         <img src="../assets/shopCar.png">
        </div>
          <p>购物车里空空如也</p>
          <van-button type="primary" size="small" color="#FA8072" class="goSeeSee">去逛逛</van-button>
        </div>
        <div class="goodsDiv">
          <van-checkbox-group v-model="result">
            <van-checkbox class="goods" checked-color="#FA8072" icon-size="0.55rem" v-for="(item,i) in goodsArr" :name="item.id" :key="item.id">
              <img :src="item.img">
              <div class="goodsInfo">
              <span class="name">{{item.name}}</span>
              <span class="charge">￥{{item.charge}}</span>
              <span class="do">
                <span>-</span>
                <span>{{item.mount}}</span>
                <span>+</span>
              </span>
              </div>
            </van-checkbox>
          </van-checkbox-group>
        </div>
        <div class="recommend">
          <header> -- 猜你喜欢 --</header>
          <div class="recommendBody">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div style="text-align: center;color: #bfbfbf;font-size:0.4rem;margin-bottom:5%;padding-top:0.6rem;background-color: #F5F5F5"> -- 已经到底了 -- </div>
        </div>
      </div>
      <div class="bottomDiv">
        <van-checkbox v-model="allChecked" checked-color="#FA8072" icon-size="0.55rem" class="allCheck">全选</van-checkbox>
        <div>
        <span>不含运费</span>
        <span>合计：</span>
        <span>￥</span>
        <span>34.8</span>
        </div>
        <van-button type="primary" color="#FA8072" class="goPay">去结算 ({{3}})</van-button>
      </div>
      <my-footer></my-footer>
    </div>
</template>

<script>
  import myFooter from './myFooter'
    export default {
        name: "shopCar",
        data() {
          return {
            allChecked: false,
            bodyScroll: 0,
            result: ['a', 'b'],
            goodsArr: [{id:'a',img: 'http://192.168.43.218/shop/img/goods1.jpg',name:'进口香蕉 约500g',charge:5.9,mount:1},
              {id:'b',img: 'http://192.168.43.218/shop/img/goods2.jpg',name:'恒都精选冷冻肥牛卷 300g',charge:23.8,mount:1},
              {id:'c',img: 'http://192.168.43.218/shop/img/goods3.jpg',name:'可口可乐 2L/瓶',charge:6.9,mount:2}],
          }
        },
      mounted(){
        document.getElementsByClassName('shopCarBody')[0].addEventListener('scroll', () => {
          this.bodyScroll = document.getElementsByClassName('shopCarBody')[0].scrollTop.toString();
        }, false);
      },
      watch: {
        $route(){
          try {
            document.getElementsByClassName('shopCarBody')[0].scrollTop = parseFloat(this.bodyScroll);
          } catch (e) {
          }
        }
      },
        components: {
          myFooter
        },
      destroyed() {
        document.getElementsByClassName('shopCarBody')[0].removeEventListener('scroll', () => {
          this.bodyScroll = document.getElementsByClassName('shopCarBody')[0].scrollTop.toString();
        }, false);
      }
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
  }
  .shopCarBody{
    width: 100vw;
    height: 72.5vh;
    position: absolute;
    top: 10.216%;
    overflow-y: scroll;
    overflow-x: hidden;
    .emptyDiv {
      width: 100vw;
      height: 45%;
      background-color: #fff;
      padding-top: 10%;
      p{
        text-align: center;
        font-size: 0.38rem;
        color: rgba(0,0,0,0.6);
        margin-top: 5%;
      }
      .goSeeSee{
        display: block;
        font-size: 0.38rem;
        border-radius: 0.2rem;
        margin: 5% auto;
      }
      .empty {
        width: 4rem;
        height: 4rem;
        background-color: rgba(0,0,0,0.05);
        margin: 0 auto;
        border-radius: 50%;
        img {
          width: 2rem;
          opacity: 0.2;
          transform: translate(42%,45%);
        }
      }
    }
    .goodsDiv{
      width: 10rem;
      background-color: #fff;
      .goods{
        width: 10rem;
        height: 2.8rem;
        border-bottom: 2px solid #f5f5f5;
        padding-left: 3%;
        position: relative;
          img {
            width: 2.8rem;
            height: 2.8rem;
          }
        .goodsInfo {
          position: absolute;
          right: 5%;
          top: 0;
          width: 55%;
          height: 90%;
          .name {
            display: inline-block;
            width: 100%;
            height: 40%;
            padding-top: 6%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: rgba(0, 0, 0, 0.9);
            font-size: 0.35rem;
          }

          .charge {
            display: inline-block;
            color: rgba(0, 0, 0, 0.9);
            font-size: 0.35rem;
            padding-top: 5%;
          }

          .do {
            display: inline-block;
            color: rgba(0, 0, 0, 0.9);
            font-size: 0.42rem;
            position: absolute;
            right: 5%;
            top: 62%;

            span:nth-child(1) {
              display: inline-block;
              font-size: 0.8rem;
              font-weight: bolder;
              transform: translate(-60%,8%);
            }

            span:nth-child(2) {
              display: inline-block;
              width: 0.7rem;
              text-align: center;
              background-color: #f5f5f5;
              transform: translateY(-3%);
            }

            span:nth-child(3) {
              display: inline-block;
              font-size: 0.6rem;
              font-weight: bolder;
              transform: translateX(30%);
            }
          }
        }
      }
    }
  }
  .bottomDiv{
    width: 100vw;
    height: 8vh;
    background-color: #fff;
    border-bottom: 1px solid #f5f5f5;
    position: fixed;
    bottom: 8.5vh;
    .allCheck{
     font-size: 0.45rem;
      color: rgba(0,0,0,0.7);
     position: absolute;
      top: 35%;
      left: 4%;
    }
    .goPay{
      width: 24vw;
      height: 2vh;
      position: absolute;
      top: 12.5%;
      right: 4%;
      font-size: 0.45rem;
      padding: 0 0 12%;
      border-radius: 0.2rem;
    }
    div{
      position: absolute;
      right: 28%;
      top: 28%;
      span:nth-child(1), span:nth-child(2){
        font-size: 0.35rem;
        color: rgba(0,0,0,0.5);
      }
      span:nth-child(3){
        font-size: 0.5rem;
        color: #FA8072;
        margin-left: -8%;
      }
      span:nth-child(4){
        font-size: 0.5rem;
        font-weight: bold;
        color: #FA8072;
        margin-left: -3%;
      }
    }
  }
  .recommend{
    width: 99%;
    background-color: #F5F5F5;
    z-index: -1;
    margin-top: 5%;
    header{
      text-align: center;
      font-size: 0.4rem;
      padding-top: 0.35rem;
      margin-bottom: 0.3rem;
      font-weight: bold;
    }
    .recommendBody{
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      background-color: #f5f5f5;
      div{
        width: 47.5%;
        height: 6.2rem;
        background-color: #fff;
        border-radius: 0.2rem;
        margin-top: 0.2rem;
        z-index: 1;
      }
    }
  }
</style>
