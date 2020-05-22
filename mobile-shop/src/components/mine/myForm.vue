<template>
    <div id="myForm">
      <div class="header">
        <div class="topDiv"></div>
        <van-icon name="arrow-left" color="rgba(0,0,0,0.6)" size="0.6rem" style="position: absolute;top: 57%;left: 1%" @click="back()"/>
        <p>我的订单</p>
      </div>
      <div class="body">
        <van-tabs v-model="active" animated swipeable color="#FA8072">
          <van-tab title="全部" name="a">
            <div class="one" @click="gotoResult()">
              <div><span>2020-05-18 15:23:19</span><span>已签收</span></div>
              <div class="goodsDiv">
                <img v-for="item in $store.state.dealObj.dealGoods" :key="item.id" :src="item.src">
              </div>
              <div><span>共5件 实付：￥</span><span>45.1</span></div>
              <div>
                <span>再来一单</span>
                <span>去评价</span>
              </div>
            </div>
<!--            <van-empty style="margin-top: 35%" description="没有更多订单了" />-->
            <p class="noMore">没有更多订单了</p>
          </van-tab>
          <van-tab title="待支付" name="b">
            <van-empty style="margin-top: 35%" description="还没有相关订单" />
          </van-tab>
          <van-tab title="待收货" name="c">
            <van-empty style="margin-top: 35%" description="还没有相关订单" />
          </van-tab>
          <van-tab title="待评价" name="d">
            <van-empty style="margin-top: 35%" description="还没有相关订单" />
          </van-tab>
        </van-tabs>
      </div>
    </div>
</template>

<script>
    export default {
        name: "myForm",
      data(){
        return{
          active: 'a'
        }
      },
      methods:{
        back(){
          this.$router.go(-1);
        },
        gotoResult(){
          this.$router.push('/dealResult');
          const obj = {
            status: '2',
            dikou: '3.6',
            postFee: '4.5',
            total: '102.5'
          };
          this.$store.commit('setFormObj',obj);
        }
      },
      beforeMount() {
          this.active = this.$route.query.index;
      },
      watch:{
          $route(to,from){
            if (from.path==='/mine'){
              this.active = this.$route.query.index;
            }
          }
      }
    }
</script>

<style lang="less" scoped>
  .header {
    position: fixed;
    width: 100vw;
    height: 2.161rem;
    /*height: 10%;*/
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
  .body{
    width: 10rem;
    height: 89.6vh;
    position: absolute;
    top: 2.18rem;
  }
  .one{
    width: 10rem;
    height: 28vh;
    background-color: #fff;
    position: relative;
    margin-top: 2%;
    padding-bottom: 3%;
    div:nth-child(1){
      height: 17%;
      font-size: 0.38rem;
      opacity: 0.5;
      display: flex;
      align-items: center;
      padding-left: 4%;
      span:nth-child(2){
        position: absolute;
        right: 4%;
      }
    }
    .goodsDiv{
      height: 50%;
      width: 95%;
      margin: 0 auto;
      border-bottom: 2px solid #f5f5f5;
      border-top: 2px solid #f5f5f5;
      overflow-y: hidden;
      overflow-x: scroll;
      display: flex;
      align-items: center;
      img{
        width: 2rem;
        margin-right: 3%;
      }
    }
    div:nth-child(3){
      /*display: inline-block;*/
      height: 17%;
      float: right;
      margin-right: 3%;
      margin-top: 2%;
      span:nth-child(1){
        font-size: 0.4rem;
        opacity: 0.8;
      }
      span:nth-child(2){
        font-size: 0.4rem;
        opacity: 0.8;
        font-weight: bold;
      }
    }
    div:nth-child(4){
      height: 13%;
      width: 55%;
      /*float: right;*/
      margin-right: 3%;
      margin-top: 2%;
      position: absolute;
      bottom: 6%;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        width: 40%;
        height: 80%;
        border-radius: 0.1rem;
        font-size: 0.35rem;
        opacity: 0.8;
        border: 1px solid lightgray;
        text-align: center;
        padding-top: 2%;
      }
      span:nth-child(1){
        transform: translateX(30%);
      }
    }
  }
  .noMore{
    text-align: center;
    font-size: 0.4rem;
    opacity: 0.5;
    margin-top: 20%;
  }
</style>
