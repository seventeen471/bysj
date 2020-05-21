<template>
  <div id="afterSale">
    <div class="header">
      <div class="topDiv"></div>
      <van-icon name="arrow-left" color="rgba(0,0,0,0.6)" size="0.6rem" style="position: absolute;top: 57%;left: 1%" @click="back()"/>
      <p>售后/退款</p>
    </div>
    <div class="saledBody">
      <van-tabs v-model="active" animated swipeable color="#FA8072">
        <van-tab title="我的申请" name="a">
          <van-empty style="margin-top: 35%" description="没有相关记录" />
        </van-tab>
        <van-tab title="全部售后" name="b">
          <van-empty style="margin-top: 35%" description="没有相关记录" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
    export default {
        name: "afterSale",
      data(){
          return{
            active: 'a'
          }
      },
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
  .saledBody{
    width: 10rem;
    height: 89.6vh;
    background-color: #fff;
    position: absolute;
    top: 2.18rem;
  }
</style>
