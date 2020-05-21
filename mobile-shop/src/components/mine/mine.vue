<template>
  <div>
    <div id="mine">
      <div class="header">
        <div class="top">
          <router-link to="/myNews">
        <van-icon name="bell" color="#fff" size="0.6rem" class="message"/>
          </router-link>
        </div>
        <div class="info">
          <img src="../../assets/touxiang.jpg">
          <div v-if="$store.state.isLogin">
          <span>{{$store.state.userInfo.user_name}}</span>
          <p>普通用户</p>
          </div>
          <router-link to="/login">
          <span v-if="!$store.state.isLogin" style="top: 52%;">立即登录</span>
          </router-link>
<!--          <van-icon name="calender-o" size="1rem" style="position: absolute;top: 50%;right: 16%;opacity: 0.8" />-->
<!--          <span style="position: absolute;top: 53%;left: 85%;color: rgba(0,0,0,0.8)">签到</span>-->
        </div>
      </div>
      <div class="rich">
        <div>{{0}}<p>余额</p></div>
        <div>{{0}}<p>优惠券</p></div>
        <div>{{0}}<p>积分</p></div>
      </div>
      <div class="oder-form-div" style="height: 3.5rem;">
        <p>我的订单</p>
        <div class="all" @click="goUrl('myForm?index=0')">
          <span>全部订单</span>
          <van-icon name="arrow" color="#ccc" size="0.36rem" style="transform: translate(-0.15rem,0.04rem)"/>
        </div>
        <div class="oder-form" style="height: 3.5rem">
          <div @click="goUrl('myForm?index=1')">
            <van-icon name="credit-pay" color="#bfbfbf" size="0.85rem" style="transform: translateX(0.65rem)"/>
            <p>待支付</p>
          </div>
          <div @click="goUrl('myForm?index=2')">
            <van-icon name="send-gift-o" color="#bfbfbf" size="0.85rem" style="transform: translateX(0.65rem)"/>
            <p>待收货</p>
          </div>
          <div @click="goUrl('myForm?index=3')">
            <van-icon name="comment-o" color="#bfbfbf" size="0.85rem" style="transform: translateX(0.65rem)"/>
            <p>待评价</p>
          </div>
          <div @click="goUrl('afterSale')">
            <van-icon name="after-sale" color="#bfbfbf" size="0.85rem" style="transform: translateX(0.65rem)"/>
            <p>售后/退款</p>
          </div>
        </div>
      </div>
      <div class="functionDiv">
        <p>常用功能</p>
      <div class="function">
        <div>
          <van-icon name="vip-card-o" color="#bfbfbf" size="0.85rem" style="transform: translateX(0.65rem)"/>
          <p>会员中心</p>
        </div>
        <div @click="goUrl('myAddress')">
          <van-icon name="notes-o" color="#bfbfbf" size="0.85rem" style="transform: translateX(0.65rem)"/>
          <p>收货地址</p>
        </div>
        <div>
          <van-icon name="gift-o" color="#bfbfbf" size="0.85rem" style="transform: translateX(0.65rem)"/>
          <p>邀请有礼</p>
        </div>
        <div>
          <van-icon name="service-o" color="#bfbfbf" size="0.85rem" style="transform: translateX(0.65rem)"/>
          <p>联系客服</p>
        </div>
        <div>
          <van-icon name="balance-o" color="#bfbfbf" size="0.85rem" style="transform: translateX(0.65rem)"/>
          <p>我的余额</p>
        </div>
        <div>
          <van-icon name="refund-o" color="#bfbfbf" size="0.85rem" style="transform: translateX(0.65rem)"/>
          <p>我的积分</p>
        </div>
        <div>
          <van-icon name="envelop-o" color="#bfbfbf" size="0.85rem" style="transform: translateX(0.65rem)"/>
          <p>意见反馈</p>
        </div>
        <div @click="goUrl('set')">
          <van-icon name="setting-o" color="#bfbfbf" size="0.85rem" style="transform: translateX(0.78em)"/>
          <p>设置</p>
        </div>
      </div>
      </div>
    </div>
      <myFooter></myFooter>
    </div>
</template>

<script>
  import myFooter from '../common/myFooter'
    export default {
        name: "mine",
        components: {
          myFooter
        },
      methods: {
          goUrl(url){
            this.$router.push('/' + url);
          }
      }
    }
</script>
<style lang="less" scoped>
  #mine {
    width: 10rem;
    height: 92vh;
    overflow-x: hidden;
    overflow-y: scroll;
    .header {
      width: 100%;
      height: 4.8rem;
      background-color: #FA8072;
      position: relative;

      .message {
        position: absolute;
        top: 27.2%;
        right: 6.5%;
      }

      .info {
        img {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          position: absolute;
          top: 40%;
          left: 8%;
        }
        span {
          display: inline-block;
          width: 5rem;
          height: 0.5rem;
          position: absolute;
          top: 45%;
          left: 35%;
          font-size: 0.45rem;
          color: #fff;
          font-weight: bold;
        }
        p{
          position: absolute;
          top: 65%;
          left: 35%;
          font-size: 0.38rem;
          color: #cccccc;
          font-weight: bold;
          border: 1px solid #cccccc;
          border-radius: 0.5rem;
          padding: 0 2%;
        }
      }
    }
    .functionDiv, .oder-form-div {
      width: 10rem;
      height: 6.2rem;
      background-color: #fff;
      margin-top: 5%;
      padding-top: 5%;
      position: relative;
      p{
        font-weight: bolder;
        font-size: 0.43rem;
        color: rgba(0,0,0,0.8);
        padding-left: 3%;
      }
      .function, .oder-form {
        width: 10rem;
        height: 5rem;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        align-content: space-around;
        margin-top: 3%;
        div {
          width: 2.1rem;
          height: 2.1rem;
          padding-top: 2%;
          p{
            font-weight: normal;
            font-size: 0.36rem;
            color: rgba(0,0,0,0.6);
            text-align: center;
          }
        }
      }
    }
  }
  .oder-form {
    transform: translateY(-0.3rem);
    div {
      padding-top: 0;
    }
  }
  .all{
    position: absolute;
    top: 7.5%;
    right: 1.5%;
    span{
      color: #cccccc;
      font-size: 0.36rem;
    }
  }
  .rich{
    width: 10rem;
    height: 12%;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    div{
      width: 20%;
      text-align: center;
      font-size: 0.4rem;
      color: rgba(0,0,0,0.8);
      padding-top: 6%;
      p{
        transform: translateY(10%);
      }
    }
  }
</style>
