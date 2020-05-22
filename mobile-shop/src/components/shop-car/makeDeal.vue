<template>
  <div id="makeDeal">
    <div class="header">
      <div class="topDiv"></div>
      <van-icon name="arrow-left" color="rgba(0,0,0,0.6)" size="0.6rem" style="position: absolute;top: 57%;left: 1%" @click="back()"/>
      <p>订单填写</p>
      <div class="formBody">
        <div class="body">
<!--          <p>地址选择</p>-->
          <div class="one" @click="$router.push('/myAddress?isChoose=true')">
            <div>
              <strong>{{$store.state.place['small_address']+$store.state.place['door_no']}}</strong>
              &nbsp;
              <van-tag color='#FA8072'>{{$store.state.place['mark']}}</van-tag>
              &nbsp;
              <van-tag v-if="$store.state.place['isDefault']==='true'" color="light-grey">默认</van-tag>
            </div>
            <div>
              <span>{{$store.state.place['name']}}</span>
              <span>{{$store.state.place['phone']}}</span>
            </div>
              <van-icon class="icon" name="arrow-left" color="rgba(0,0,0,0.5)" size="0.6rem"/>
          </div>
<!--          <p>商品清单</p>-->
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
          <div><span>优惠券抵扣</span><span>-￥{{dikou}}<van-icon class="icon" name="arrow" color="rgba(0,0,0,0.5)" size="0.4rem"/></span></div>
          <div><span>配送费</span><span>￥{{postFee}}</span></div>
          <div><span>订单备注</span><span style="opacity: 0.4">去备注<van-icon class="icon" name="arrow" color="rgba(0,0,0,0.5)" size="0.4rem"/></span></div>
            <div><span>合计</span><span>￥{{total}}</span></div>
          </div>
          <p>支付方式</p>
          <div class="payType">
            <van-radio-group checked-color="#FA8072" v-model="radio">
              <van-cell-group>
                <van-cell title="余额" icon="http://192.168.43.218/shop/img/myMoney.png" clickable @click="radio = '1'">
                  <template #right-icon>
                    <van-radio name="1" />
                  </template>
                </van-cell>
                <van-cell title="微信" icon="http://192.168.43.218/shop/img/weChatPay.png" clickable @click="radio = '2'">
                  <template #right-icon>
                    <van-radio name="2" />
                  </template>
                </van-cell>
                <van-cell title="支付宝" icon="http://192.168.43.218/shop/img/zfbPay.png" clickable @click="radio = '3'">
                  <template #right-icon>
                    <van-radio name="3" />
                  </template>
                </van-cell>
              </van-cell-group>
            </van-radio-group>
          </div>
        </div>
        <div class="foot">
          <div><span>待付：</span><span>￥</span><span>{{total}}</span></div>
          <van-button type="primary" color="#FA8072" class="makeDealButton" @click="makeDeal()">确认下单</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "makeDeal",
      data(){
          return{
            radio: '1',
            dikou: 3.6,
            postFee: 4.5
          }
      },
      methods:{
        back(){
          this.$router.go(-1);
        },
        updatePlace(){
          if (this.$store.state.place.small_address) {
            const obj = {
              door_no: '',
              name: this.$store.state.userInfo.user_name,
              phone: this.$store.state.userInfo.tel,
              mark: '新选'
            };
            const item = Object.assign(obj, this.$store.state.place);
            this.$store.commit('setPlace', item);
          }
        },
        makeDeal(){
          this.$router.push('/dealResult?dikou='+this.dikou+'&postFee='+this.postFee+'&total='+this.total);
          const obj = {
            status: '1'
          };
          this.$store.commit('setFormObj',obj);
        }
      },
      beforeMount() {
          this.updatePlace();
      },
      watch:{
          $route(to,from){
            if (from.path==='/shopCar'||from.path==='/shopCar2') {
              this.updatePlace();
            }
          }
      },
      computed: {
          total(){
            const allCharge = parseFloat(this.$store.state.dealObj.allCharge).toFixed(1);
            return parseFloat(allCharge) + this.postFee - this.dikou;
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
  .formBody{
    position: absolute;
    top: 2.192rem;
    width: 10rem;
    height: 89.6vh;
    .body{
      width: 100%;
      height: 89.7%;
      overflow-x: hidden;
      overflow-y: scroll;
      p{
        text-align: left;
        font-size: 0.38rem;
        opacity: 0.6;
        padding-left: 3%;
      }
    }
    .foot{
      width: 100%;
      height: 10%;
      background-color: #fff;
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div{
        width: 60%;
        span:nth-child(1){
          opacity: 0.6;
          font-size: 0.42rem;
          margin-left: 5%;
        }
        span:nth-child(2){
          font-size: 0.42rem;
          color: #FA8072;
        }
        span:nth-child(3){
          font-size: 0.58rem;
          color: #FA8072;
          font-weight: bold;
        }
      }
      .makeDealButton{
        margin-right: 4%;
        width: 35%;
        border-radius: 0.2rem;
        font-size: 0.4rem;
        font-weight: bold;
      }
    }
  }
  .one{
    position: relative;
    width: 10rem;
    height: 12%;
    background-color: #fff;
    padding-left: 3.5%;
    padding-top: 3%;
    font-size: 0.38rem;
    opacity: 0.8;
    border-bottom: 1px solid #f5f5f5;
    div{
      margin-top: 2%;
    }
    .icon{
      position: absolute;
      right: 5%;
      top: 35%;
      transform: rotateY(180deg);
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
    height: 34%;
    background-color: #fff;
    /*padding-left: %;*/
    /*padding-right: 3%;*/
    div{
      height: 20%;
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
      width: 30%;
      float: right;
      text-align: right;
      margin-right: 3%;
    }
  }
  .payType{
    width: 10rem;
    background-color: #fff;
  }
</style>
