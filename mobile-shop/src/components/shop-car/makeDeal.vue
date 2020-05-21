<template>
  <div id="makeDeal">
    <div class="header">
      <div class="topDiv"></div>
      <van-icon name="arrow-left" color="rgba(0,0,0,0.6)" size="0.6rem" style="position: absolute;top: 57%;left: 1%" @click="back()"/>
      <p>订单填写</p>
      <div class="formBody">
        <div class="body">
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
        </div>
        <div class="foot">
          <div><span>总额：</span><span>￥</span><span>{{102.8}}</span></div>
          <van-button type="primary" color="#FA8072" class="makeDealButton" @click="makeDeal()">确认下单</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "makeDeal",
      methods:{
        back(){
          this.$router.go(-1);
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
      height: 89.2%;
      overflow-x: hidden;
      overflow-y: scroll;
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
</style>
