<template>
    <div id="payResult">
      <div class="header">
        <div class="topDiv"></div>
        <van-icon name="arrow-left" color="rgba(0,0,0,0.6)" size="0.6rem" style="position: absolute;top: 57%;left: 1%" @click="back()"/>
        <p>支付结果</p>
      </div>
      <div class="body">
        <div class="state">
          <div><van-icon name="checked" color="#FA8072" size="1.2rem" />
            <span>支付成功</span>
          </div>
        </div>
        <div class="wordDiv">
          <!--          <p>感谢您对我们的信任，祝您生活愉快</p>-->
          <!--          <p>已收到您的订单信息，我们将尽快为您配送</p>-->
          <div>
            <van-button type="primary" color="#FA8072" class="button" @click="goHome()">继续逛逛</van-button>
            <van-button type="primary" color="#FA8072" class="button" @click="seeDeal()">查看订单</van-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "payResult",
      methods: {
        back(){
          this.$router.go(-2);
        },
        goHome(){
          this.$router.push('/home');
        },
        seeDeal(){
          this.$router.push('/dealResult?id=' + this.$route.query.id);
        },
        updateStatus(){
          if (!this.$route.query.id) {
            return;
          }
          let param = new URLSearchParams();
          param.append('type', '2'); // 1新增2更新3删除
          param.append('id', this.$route.query.id);
          param.append('status', '1'); // 0待付款，1待签收，2已签收,3已评价，4退款中，5已退款，6已取消
          axios.post(this.$url + '/shop/editForm.php',param).then((data) => {
            if (data.data.isSucc) {
            }
          });
        }
      },
      mounted() {
        this.updateStatus();
      },
      watch: {
          $route(to,from){
              this.updateStatus();
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
</style>
