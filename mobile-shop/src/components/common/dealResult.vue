<template>
    <div id="dealResult">
      <div class="header">
        <div class="topDiv"></div>
        <van-icon name="arrow-left" color="rgba(0,0,0,0.6)" size="0.6rem" style="position: absolute;top: 57%;left: 1%" @click="back()"/>
        <van-icon name="service-o" color="rgba(0,0,0,0.6)" size="0.58rem" style="position: absolute;top: 57%;right: 3%" />
        <p>订单详情</p>
      </div>
      <div class="body">
        <div class="state">
          <div><van-icon name="checked" color="#FA8072" size="1.2rem" />
            <span v-if="$store.state.formObj.status==='1'">下单成功</span>
            <span v-if="$store.state.formObj.status==='2'">已签收</span>
          </div>
        </div>
        <div class="wordDiv">
<!--          <p>感谢您对我们的信任，祝您生活愉快</p>-->
<!--          <p>已收到您的订单信息，我们将尽快为您配送</p>-->
          <div v-if="$store.state.formObj.status==='1'">
            <van-button type="primary" color="#FA8072" class="button" @click="goHome()">回到首页</van-button>
            <van-button type="primary" color="lightGrey" class="button" @click="cancelDeal()">取消订单</van-button>
          </div>
          <div v-if="$store.state.formObj.status==='2'">
            <van-button type="primary" color="#FA8072" class="button" @click="goHome()">再来一单</van-button>
            <van-button type="primary" color="lightGrey" class="button" @click="cancelDeal()">申请售后</van-button>
          </div>
        </div>
        <div class="address">
          <div><span>收货地址</span><span>{{$store.state.place['small_address']+$store.state.place['door_no']}}</span></div>
          <div><span>{{$store.state.place['name']+' '+$store.state.place['phone']}}</span></div>
        </div>
        <div class="myGoods">
          <div class="goodsOne" v-for="item in $store.state.dealObj.dealGoods" :key="item.id">
            <div>
              <img :src="item.src"/>
            </div>
            <div>{{item.big_title}}</div>
            <div><div><span>￥</span><span style="color: #FA8072;font-size: 0.48rem;">{{item.charge}}</span></div><div><span>x</span><span>{{item.myMount}}</span></div></div>
          </div>
        </div>
        <div class="afterList">
          <div><span>商品总额</span><span>￥{{$store.state.dealObj.allCharge}}</span></div>
          <div><span>优惠券抵扣</span><span>-￥{{$route.query.dikou}}<van-icon class="icon" name="arrow" color="rgba(0,0,0,0.5)" size="0.4rem"/></span></div>
          <div><span>配送费</span><span>￥{{$route.query.postFee}}</span></div>
          <div style="width: 30%;float: right;text-align: right;margin-right: 3%;"><span>实付款</span><span>￥{{$route.query.total}}</span></div>
        </div>
        <div class="info">
          <div><span>订单编号：</span><span class="copytxt">2004181523184963419</span><button @click="copy()">复制</button></div>
          <div>下单时间：2020-05-18 15:23:19</div>
          <div>支付方式：微信支付</div>
        </div>
        <p class="foot">如收到的商品出现质量、错发、漏发等问题，可申请售后/退款</p>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue';
  import { Toast } from 'vant';
  import { Dialog } from 'vant';
  Vue.use(Dialog);

  Vue.use(Toast);
    export default {
        name: "dealResult",
      methods: {
        back() {
          this.$router.go(-1);
        },
        goHome(){
          this.$router.push('/home');
        },
        cancelDeal(){
          Dialog.confirm({
            title: '提示',
            message: '下单五分钟内可以取消订单，确认取消吗？',
          })
            .then(() => {
              Toast.success('取消成功');
              setTimeout(()=>{
                this.$router.push('/home');
              },2000);
            })
            .catch(() => {
            });
        },
        copy(){
          const range = document.createRange();
          range.selectNode(document.querySelector(".copytxt"));

          const selection = window.getSelection();
          if(selection.rangeCount > 0) selection.removeAllRanges();
          selection.addRange(range);
          document.execCommand('Copy');
          Toast("复制成功！");
        }
      },
      mounted() {
    },
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
    height: 89.8vh;
    position: absolute;
    top: 2.2rem;
    overflow-x: hidden;
    overflow-y: scroll;
    .state{
      margin-top: 10%;
      div{
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          margin-left: 3%;
          font-size: 0.5rem;
          /*font-weight: bold;*/
        }
      }
    }
    .wordDiv{
      height: 10%;
      /*background-color: #fff;*/
      margin-top: 5%;
      flex-direction: column;
      display: flex;
      justify-content: space-around;
      align-items: center;
      p{
        font-size: 0.47rem;
      }
      div{
        .button{
          height: 0.8rem;
        }
      }
    }
  }
  .address{
    height: 9%;
    background-color: #fff;
    margin-top: 3%;
    border-bottom: 1px solid #f5f5f5;
    div:nth-child(1){
      display: flex;
      justify-content: space-between;
      padding-top: 2.5%;
      padding-left: 3%;
      span:nth-child(1){
        width: 30%;
        font-size: 0.4rem;
        opacity: 0.6;
      }
      span:nth-child(2){
        text-align: right;
        width: 70%;
        font-size: 0.4rem;
        opacity: 0.8;
        margin-right: 3%;
      }
    }
    div:nth-child(2){
      margin-top: 1%;
      span{
        float: right;
        font-size: 0.4rem;
        opacity: 0.8;
        margin-right: 3%;
      }
    }
  }
  .myGoods{
    width: 10rem;
    /*height: 65%;*/
    background-color: #fff;
    .goodsOne{
      width: 100%;
      height: 2.2rem;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div:nth-child(1),div:nth-child(3){
        width: 25%;
        height: 70%;
        img{
          width: 1.5rem;
          margin-left: 14%;
        }
      }
      div:nth-child(2){
        width: 50%;
        height: 70%;
        font-size: 0.41rem;
        opacity: 0.8;
      }
      div:nth-child(3){
        text-align: right;
        div{
          width: 86%;
          height: 50%;
          span:nth-child(1){
            font-size: 0.35rem;
          }
        }
      }
    }
  }
  .afterList{
    width: 10rem;
    height: 28%;
    background-color: #fff;
    /*padding-left: %;*/
    /*padding-right: 3%;*/
    div{
      height: 24.5%;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      width: 93%;
      justify-content: space-between;
      margin: 0 auto;
      span{
        font-size: 0.4rem;
        opacity: 0.7;
      }
    }
    div:nth-child(2){
      span:nth-child(2){
        color: red;
      }
    }
    div:nth-child(5){
      /*width: 30%;*/
      float: right;
      text-align: right;
      margin-right: 3%;
    }
  }
  .info{
    width: 10rem;
    height: 15%;
    background-color: #fff;
    margin-top: 3%;
    padding-top: 4%;
    div{
      height: 32%;
      padding-left: 3%;
      font-size: 0.4rem;
      opacity: 0.5;
    }
    button{
      float: right;
      margin-right: 4%;
      font-size: 0.4rem;
      width: 12%;
      margin-top: -1%;
    }
  }
  .foot{
    height: 5%;
    font-size: 0.3rem;
    opacity: 0.5;
    text-align: center;
    padding-top: 3%;
  }
</style>
