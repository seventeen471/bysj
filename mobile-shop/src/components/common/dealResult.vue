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
            <span>{{formObj.status | statusName}}</span>
          </div>
        </div>
        <div class="wordDiv">
<!--          <p>感谢您对我们的信任，祝您生活愉快</p>-->
<!--          <p>已收到您的订单信息，我们将尽快为您配送</p>-->
          <div v-if="formObj.status==='0'">
            <van-button type="primary" color="#FA8072" class="button" @click="goPay()">继续付款</van-button>
            <van-button type="primary" color="lightGrey" class="button" @click="cancelDeal(formObj.form_id)">取消订单</van-button>
          </div>
          <div v-if="formObj.status==='1'">
            <van-button type="primary" color="#FA8072" class="button" @click="goHome()">回到首页</van-button>
            <van-button type="primary" color="lightGrey" class="button" @click="cancelDeal(formObj.form_id)">取消订单</van-button>
          </div>
          <div v-if="formObj.status==='2' || formObj.status==='3'">
            <van-button type="primary" color="#FA8072" class="button" @click="again(JSON.parse(formObj.goods_obj),formObj.all_mount,formObj.all_fee)">再来一单</van-button>
            <van-button type="primary" color="lightGrey" class="button" @click="beAfterSale()">申请售后</van-button>
          </div>
          <div v-if="formObj.status==='6' || formObj.status==='4' || formObj.status==='5'">
            <van-button type="primary" color="#FA8072" class="button" @click="goHome()">回到首页</van-button>
            <van-button type="primary" color="#FA8072" class="button" @click="again(JSON.parse(formObj.goods_obj),formObj.all_mount,formObj.all_fee)">再来一单</van-button>
          </div>
        </div>
        <div class="address">
          <div><span>收货地址</span><span>{{formObj['small_address']+formObj['door_no']}}</span></div>
          <div><span>{{formObj['name']+' '+formObj['phone']}}</span></div>
        </div>
        <div class="myGoods">
          <div class="goodsOne" v-for="item in goodsArr" :key="item.id">
            <div>
              <img :src="item.src"/>
            </div>
            <div>{{item.big_title}}</div>
            <div><div><span>￥</span><span style="color: #FA8072;font-size: 0.48rem;">{{item.charge}}</span></div><span class="x-mount"><span>x</span><span>{{item.myMount}}</span></span></div>
          </div>
        </div>
        <div class="afterList">
          <div><span>商品总额</span><span>￥{{formObj.all_fee}}</span></div>
          <div><span>优惠券抵扣</span><span>-￥{{formObj.sub_fee}}<van-icon class="icon" name="arrow" style="transform: translateY(0.06rem)" color="rgba(0,0,0,0.5)" size="0.4rem"/></span></div>
          <div><span>配送费</span><span>￥{{formObj.post_fee}}</span></div>
          <div><span>订单备注</span><span style="opacity: 0.4">查看备注<van-icon class="icon" name="arrow" color="rgba(0,0,0,0.5)" style="transform: translateY(0.06rem)" size="0.4rem"/></span></div>
          <div class="calc"><span>{{formObj.status==='0'?'待付款':'实付款'}} &nbsp;￥{{formObj.true_pay}}</span></div>
        </div>
        <div class="info">
          <div><span>订单编号：</span><span class="copytxt">{{formObj.form_id}}</span><button @click="copy()">复制</button></div>
          <div>下单时间：{{formObj.time}}</div>
          <div>支付方式：{{formObj.pay_type | payTypeName}}</div>
        </div>
        <p class="foot">如收到的商品出现质量、错发、漏发等问题，可申请售后/退款</p>
      </div>
      <myDialog v-if="isVisible" title="付款成功?" left="否" right="是" @fnLeft="fnLeft(formObj.form_id)" @fnRight="fnRight(formObj.form_id)"></myDialog>
    </div>
</template>

<script>
  import Vue from 'vue';
  import { Toast } from 'vant';
  import { Dialog } from 'vant';
  import axios from 'axios';
  import myDialog from '../common/myDialog'
  Vue.use(Dialog);

  Vue.use(Toast);
    export default {
        name: "dealResult",
      data() {
          return {
            formObj: {},
            goodsArr: {},
            isVisible: false
          }
      },
      methods: {
        back() {
          this.$router.go(-1);
        },
        goHome(){
          this.$router.push('/home');
        },
        cancelDeal(id){
          Dialog.confirm({
            title: '提示',
            message: '下单五分钟内可以取消订单，确认取消吗？',
          })
            .then(() => {
                let param = new URLSearchParams();
                param.append('type', '2'); // 1新增2更新3删除
                param.append('id', id);
                param.append('status', '6'); // 0待付款，1待签收，2已签收,3已评价，4退款中，5已退款，6已取消
                axios.post(this.$url + '/shop/editForm.php',param).then((data) => {
                  if (data.data.isSucc) {
                    Toast.success('取消成功');
                  }
                });
              setTimeout(()=>{
                this.$router.push('/home');
              },2000);
            })
            .catch(() => {
            });
        },
        goPay(){
          this.isVisible = true;
          window.sessionStorage.setItem('continuePay', 'true');
        },
        again(obj,allMount,allFee){
          let dealObj = {};
          dealObj['dealGoods'] = obj;
          dealObj['allCharge'] = allFee;
          dealObj['allMount'] = allMount;
          this.$store.commit('setDealObj',dealObj);
          window.sessionStorage.setItem('isAgain', 'true');
          this.$router.push('/makeDeal');
        },
        beAfterSale(){},
        fnLeft(id){
          this.isVisible = false;
          this.$router.push('/dealResult?id=' + id);
        },
        fnRight(id){
          this.isVisible = false;
          this.$router.push('/payResult?id=' + id);
        },
        copy(){
          const range = document.createRange();
          range.selectNode(document.querySelector(".copytxt"));

          const selection = window.getSelection();
          if(selection.rangeCount > 0) selection.removeAllRanges();
          selection.addRange(range);
          document.execCommand('Copy');
          Toast("复制成功！");
        },
        queryForm(){
          if (!this.$route.query.id) {
            return;
          }
          let param = new URLSearchParams();
          param.append('id', this.$route.query.id);
          axios.post(this.$url + '/shop/queryForm.php',param).then((data) => {
            this.formObj = data.data.data[0];
            this.goodsArr = JSON.parse(this.formObj.goods_obj);
          });
        }
      },
      beforeMount(){
          this.queryForm();
      },
      mounted() {
    },
      components: {
        myDialog
      },
      watch: {
          $route(){
            this.queryForm();
          }
      },
      filters: {
        statusName(code){
          let name = '';
          switch (code) {
            case '0':
              name = '待支付';break;
            case '1':
              name = '待收货';break;
            case '2':
              name = '已收货';break;
            case '3':
              name = '已评价';break;
            case '4':
              name = '退款中';break;
            case '5':
              name = '已退款';break;
            case '6':
              name = '已取消';break;
          }
          return name;
        },
        payTypeName(code){
          let name = '';
          switch (code) {
            case '1':
              name = '余额支付';
              break;
            case '2':
              name = '微信支付';
              break;
            case '3':
              name = '支付宝支付';
              break;
          }
          return name;
        }
      },
      beforeRouteEnter(to,from,next){
        window.sessionStorage.setItem('isAgain', 'false');
        window.sessionStorage.setItem('continuePay', 'false');
        next();
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
          opacity: 0.8;
        }
      }
    }
    .wordDiv{
      height: 10%;
      /*background-color: #fff;*/
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
    height: 1.7rem;
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
        img{
          width: 1.5rem;
          margin-left: 14%;
        }
      }
      div:nth-child(2){
        width: 50%;
        height: 70%;
        font-size: 0.38rem;
        display: flex;
        align-items: center;
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
        .x-mount{
          margin-right: 0.4rem;
          display: inline-block;
          transform: translateY(-0.5rem);
          font-size: 0.35rem;
        }
      }
    }
  }
  .afterList{
    width: 10rem;
    height: 6.15rem;
    background-color: #fff;
    /*padding-left: %;*/
    /*padding-right: 3%;*/
    div{
      height: 1.2rem;
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
    .calc{
      span{
        &:nth-child(1){
          width: 10rem;
          text-align: right;
          display: inline-block;
        }
      }
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
      font-size: 0.38rem;
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
