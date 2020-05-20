<template>
    <div id="set">
      <div class="header">
        <div class="topDiv"></div>
        <van-icon name="arrow-left" color="rgba(0,0,0,0.6)" size="0.6rem" style="position: absolute;top: 57%;left: 1%" @click="back()"/>
        <p>设置</p>
      </div>
      <div class="setBody">
        <div class="body1">
          <div>
            <span>账户与安全</span>
            <van-icon class="icon" name="arrow-left" color="rgba(0,0,0,0.5)" size="0.4rem"/>
          </div>
          <div>
            <span>意见与反馈</span>
            <van-icon class="icon" name="arrow-left" color="rgba(0,0,0,0.5)" size="0.4rem"/>
          </div>
          <div>
            <span>欢迎评分</span>
            <van-icon class="icon" name="arrow-left" color="rgba(0,0,0,0.5)" size="0.4rem"/>
          </div>
        </div>
        <div class="body2">
          <div>
            <span>经营执照</span>
            <van-icon class="icon" name="arrow-left" color="rgba(0,0,0,0.5)" size="0.4rem"/>
          </div>
          <div>
            <span>用户协议</span>
            <van-icon class="icon" name="arrow-left" color="rgba(0,0,0,0.5)" size="0.4rem"/>
          </div>
          <div>
            <span>隐私策略</span>
            <van-icon class="icon" name="arrow-left" color="rgba(0,0,0,0.5)" size="0.4rem"/>
          </div>
        </div>
        <div class="body3">
          <div>
            <span>版本检查</span>
            <van-icon class="icon" name="arrow-left" color="rgba(0,0,0,0.5)" size="0.4rem"/>
          </div>
          <div>
            <span>清除缓存</span>
            <van-icon class="icon" name="arrow-left" color="rgba(0,0,0,0.5)" size="0.4rem"/>
          </div>
        </div>
        <van-button v-if="$store.state.isLogin" type="primary" color="#FA8072" class="quitLogin" @click="quitLogin()">退出登录</van-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "set",
      methods: {
          back(){
            this.$router.go(-1);
          },
        quitLogin(){
            window.localStorage.removeItem('token');
            this.$store.commit('setUserInfo', {});
            this.$store.commit('setIsLogin', false);
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
  .setBody{
    width: 10rem;
    height: 88vh;
    position: absolute;
    top: 2.161rem;
    .body1, .body2, .body3{
      background-color: #fff;
      height: 21%;
      margin-top: 0.5%;
      margin-bottom: 3%;
      div{
        border-bottom: 1px solid #f5f5f5;
        height: 32.6%;
        display: flex;
        align-items: center;
        font-size: 0.44rem;
        opacity: 0.8;
        position: relative;
        span{
          margin-left: 3%;
        }
        .icon{
          position: absolute;
          right: 2%;
          transform: rotateY(180deg);
        }
      }
    }
    .body3{
      height: 15%!important;
      div{
        height: 50%!important;
      }
    }
  }
  .quitLogin{
    width: 93%;
    display: block;
    margin: 4% auto;
    height: 6%;
    border-radius: 0.2rem;
  }
</style>
